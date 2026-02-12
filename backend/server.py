from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone, timedelta
from bson import ObjectId
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Supreme Detail Studio API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
DB_NAME = os.environ.get("DB_NAME", "supreme_detail_studio")
client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# JWT Config
JWT_SECRET = os.environ.get("JWT_SECRET", "supreme_detail_admin_secret")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
security = HTTPBearer()

# Admin credentials from env
ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "supremeadmin123")

# ============== Models ==============

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class VehiclePricing(BaseModel):
    sedan: float
    suv_2row: float
    suv_3row: float

class ServiceCreate(BaseModel):
    name: str
    category: str  # interior, exterior, protection, etc.
    description: Optional[str] = ""
    base_price: float
    vehicle_pricing: Optional[VehiclePricing] = None
    duration_minutes: int = 60
    is_active: bool = True
    shop_available: bool = True
    mobile_available: bool = True
    image_url: Optional[str] = ""

class ServiceUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    base_price: Optional[float] = None
    vehicle_pricing: Optional[VehiclePricing] = None
    duration_minutes: Optional[int] = None
    is_active: Optional[bool] = None
    shop_available: Optional[bool] = None
    mobile_available: Optional[bool] = None
    image_url: Optional[str] = None

class BusinessHours(BaseModel):
    day: str  # monday, tuesday, etc.
    is_open: bool = True
    open_time: str = "09:00"
    close_time: str = "18:00"

class ClosedDate(BaseModel):
    date: str  # YYYY-MM-DD
    reason: Optional[str] = "Holiday"

class ScheduleSettings(BaseModel):
    business_hours: List[BusinessHours]
    closed_dates: List[ClosedDate]

class BookingCreate(BaseModel):
    customer_first_name: str
    customer_last_name: str
    customer_phone: str
    customer_email: str
    customer_address: str
    service_location: str  # shop or mobile
    pickup_delivery: Optional[str] = None
    pickup_distance: Optional[str] = None
    vehicle_year: str
    vehicle_make: str
    vehicle_model: str
    vehicle_type: str  # sedan, suv-2row, suv-3row
    vehicle_color: Optional[str] = None
    service_id: str
    service_name: str
    booking_date: str  # YYYY-MM-DD
    booking_time: str  # HH:MM
    total_price: float
    notes: Optional[str] = ""

class BookingStatusUpdate(BaseModel):
    status: str  # pending, in_progress, complete, incomplete

# ============== Customer Models ==============

class CustomerCreate(BaseModel):
    first_name: str
    last_name: str
    phone: str
    email: str
    address: Optional[str] = ""
    notes: Optional[str] = ""
    tags: Optional[List[str]] = []

class CustomerUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    notes: Optional[str] = None
    tags: Optional[List[str]] = None

# ============== Category Models ==============

class CategoryCreate(BaseModel):
    name: str
    label: str
    description: Optional[str] = ""
    sort_order: Optional[int] = 0

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    label: Optional[str] = None
    description: Optional[str] = None
    sort_order: Optional[int] = None

class CategoryReorder(BaseModel):
    category_ids: List[str]  # List of category IDs in new order

# ============== Business Settings Models ==============

class BusinessSettings(BaseModel):
    shop_name: Optional[str] = "Supreme Detail Studio"
    shop_address: Optional[str] = "123 Main St, Marietta, GA 30060"
    shop_phone: Optional[str] = "(502) 417-0690"
    shop_email: Optional[str] = "info@supremedetailstudio.com"
    mobile_service_upcharge: Optional[float] = 50.0
    mobile_service_description: Optional[str] = "We come to you"

# ============== Auth Helpers ==============

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=ALGORITHM)

async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid token")
        return username
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

# ============== Auth Routes ==============

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    if request.username == ADMIN_USERNAME and request.password == ADMIN_PASSWORD:
        token = create_access_token({"sub": request.username})
        return TokenResponse(access_token=token)
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/auth/verify")
async def verify_auth(username: str = Depends(verify_token)):
    return {"valid": True, "username": username}

# ============== Categories Routes ==============

@app.get("/api/categories")
async def get_categories():
    """Get all categories, sorted by sort_order"""
    categories = []
    async for category in db.categories.find().sort("sort_order", 1):
        category["id"] = str(category.pop("_id"))
        categories.append(category)
    
    # If no custom categories exist, seed with defaults
    if len(categories) == 0:
        default_categories = [
            {"name": "interior", "label": "Interior Detail", "description": "Interior cleaning and detailing services", "sort_order": 1},
            {"name": "exterior", "label": "Exterior Detail", "description": "Exterior wash and detailing services", "sort_order": 2},
            {"name": "full", "label": "Full Detail", "description": "Complete interior and exterior detailing", "sort_order": 3},
            {"name": "protection", "label": "Protection Services", "description": "Paint protection, ceramic coating, PPF", "sort_order": 4},
            {"name": "addon", "label": "Add-On Services", "description": "Additional services and upgrades", "sort_order": 5},
        ]
        for cat in default_categories:
            cat["created_at"] = datetime.now(timezone.utc).isoformat()
            result = await db.categories.insert_one(cat)
            cat["id"] = str(result.inserted_id)
            cat.pop("_id", None)
            categories.append(cat)
    
    return categories

@app.post("/api/categories", dependencies=[Depends(verify_token)])
async def create_category(category: CategoryCreate):
    # Check if name already exists
    existing = await db.categories.find_one({"name": category.name.lower().strip().replace(" ", "_")})
    if existing:
        raise HTTPException(status_code=400, detail="Category with this name already exists")
    
    category_dict = category.model_dump()
    category_dict["name"] = category_dict["name"].lower().strip().replace(" ", "_")
    category_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    
    result = await db.categories.insert_one(category_dict)
    category_dict["id"] = str(result.inserted_id)
    category_dict.pop("_id", None)
    return category_dict

@app.put("/api/categories/reorder", dependencies=[Depends(verify_token)])
async def reorder_categories(reorder: CategoryReorder):
    """Reorder categories by updating their sort_order"""
    for index, category_id in enumerate(reorder.category_ids):
        await db.categories.update_one(
            {"_id": ObjectId(category_id)},
            {"$set": {"sort_order": index + 1}}
        )
    return {"message": "Categories reordered successfully"}

@app.put("/api/categories/{category_id}", dependencies=[Depends(verify_token)])
async def update_category(category_id: str, category: CategoryUpdate):
    update_data = {k: v for k, v in category.model_dump().items() if v is not None}
    if "name" in update_data:
        update_data["name"] = update_data["name"].lower().strip().replace(" ", "_")
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    result = await db.categories.update_one(
        {"_id": ObjectId(category_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category updated successfully"}

@app.delete("/api/categories/{category_id}", dependencies=[Depends(verify_token)])
async def delete_category(category_id: str):
    # Check if any services use this category
    category = await db.categories.find_one({"_id": ObjectId(category_id)})
    if not category:
        raise HTTPException(status_code=404, detail="Category not found")
    
    services_count = await db.services.count_documents({"category": category["name"]})
    if services_count > 0:
        raise HTTPException(status_code=400, detail=f"Cannot delete category: {services_count} services are using it")
    
    result = await db.categories.delete_one({"_id": ObjectId(category_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Category not found")
    return {"message": "Category deleted successfully"}

# ============== Business Settings Routes ==============

@app.get("/api/settings/business")
async def get_business_settings():
    """Get business settings (public endpoint for booking page)"""
    settings = await db.settings.find_one({"type": "business"})
    if not settings:
        # Return defaults
        return {
            "shop_name": "Supreme Detail Studio",
            "shop_address": "123 Main St, Marietta, GA 30060",
            "shop_phone": "(502) 417-0690",
            "shop_email": "info@supremedetailstudio.com",
            "mobile_service_upcharge": 50.0,
            "mobile_service_description": "We come to you"
        }
    settings.pop("_id", None)
    settings.pop("type", None)
    return settings

@app.put("/api/settings/business", dependencies=[Depends(verify_token)])
async def update_business_settings(settings: BusinessSettings):
    """Update business settings (admin only)"""
    settings_dict = settings.model_dump()
    settings_dict["type"] = "business"
    settings_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    await db.settings.update_one(
        {"type": "business"},
        {"$set": settings_dict},
        upsert=True
    )
    return {"message": "Business settings updated successfully"}

# ============== Services Routes ==============

@app.get("/api/services")
async def get_services(active_only: bool = False):
    query = {"is_active": True} if active_only else {}
    services = []
    async for service in db.services.find(query):
        service["id"] = str(service.pop("_id"))
        services.append(service)
    return services

@app.get("/api/services/{service_id}")
async def get_service(service_id: str):
    service = await db.services.find_one({"_id": ObjectId(service_id)})
    if not service:
        raise HTTPException(status_code=404, detail="Service not found")
    service["id"] = str(service.pop("_id"))
    return service

@app.post("/api/services", dependencies=[Depends(verify_token)])
async def create_service(service: ServiceCreate):
    service_dict = service.model_dump()
    service_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    service_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
    if service_dict.get("vehicle_pricing"):
        service_dict["vehicle_pricing"] = service_dict["vehicle_pricing"]
    result = await db.services.insert_one(service_dict)
    service_dict["id"] = str(result.inserted_id)
    service_dict.pop("_id", None)
    return service_dict

@app.put("/api/services/{service_id}", dependencies=[Depends(verify_token)])
async def update_service(service_id: str, service: ServiceUpdate):
    update_data = {k: v for k, v in service.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    if "vehicle_pricing" in update_data and update_data["vehicle_pricing"]:
        update_data["vehicle_pricing"] = update_data["vehicle_pricing"]
    result = await db.services.update_one(
        {"_id": ObjectId(service_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service updated successfully"}

@app.delete("/api/services/{service_id}", dependencies=[Depends(verify_token)])
async def delete_service(service_id: str):
    result = await db.services.delete_one({"_id": ObjectId(service_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Service not found")
    return {"message": "Service deleted successfully"}

# ============== Schedule Routes ==============

@app.get("/api/schedule")
async def get_schedule():
    schedule = await db.schedule.find_one({"type": "settings"})
    if not schedule:
        # Return default schedule
        default_hours = [
            {"day": "monday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
            {"day": "tuesday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
            {"day": "wednesday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
            {"day": "thursday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
            {"day": "friday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
            {"day": "saturday", "is_open": True, "open_time": "10:00", "close_time": "16:00"},
            {"day": "sunday", "is_open": False, "open_time": "09:00", "close_time": "18:00"},
        ]
        return {"business_hours": default_hours, "closed_dates": []}
    schedule.pop("_id", None)
    schedule.pop("type", None)
    return schedule

@app.put("/api/schedule", dependencies=[Depends(verify_token)])
async def update_schedule(settings: ScheduleSettings):
    settings_dict = settings.model_dump()
    settings_dict["type"] = "settings"
    settings_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.schedule.update_one(
        {"type": "settings"},
        {"$set": settings_dict},
        upsert=True
    )
    return {"message": "Schedule updated successfully"}

@app.post("/api/schedule/closed-dates", dependencies=[Depends(verify_token)])
async def add_closed_date(closed_date: ClosedDate):
    await db.schedule.update_one(
        {"type": "settings"},
        {"$push": {"closed_dates": closed_date.model_dump()}},
        upsert=True
    )
    return {"message": "Closed date added successfully"}

@app.delete("/api/schedule/closed-dates/{date}", dependencies=[Depends(verify_token)])
async def remove_closed_date(date: str):
    await db.schedule.update_one(
        {"type": "settings"},
        {"$pull": {"closed_dates": {"date": date}}}
    )
    return {"message": "Closed date removed successfully"}

# ============== Availability Routes ==============

@app.get("/api/availability/{date}")
async def get_availability(date: str, service_id: Optional[str] = None):
    """Get available time slots for a specific date"""
    # Get schedule settings
    schedule = await db.schedule.find_one({"type": "settings"})
    
    # Check if date is a closed date
    if schedule and "closed_dates" in schedule:
        for closed in schedule.get("closed_dates", []):
            if closed.get("date") == date:
                return {"available": False, "reason": closed.get("reason", "Closed"), "slots": []}
    
    # Get day of week
    date_obj = datetime.strptime(date, "%Y-%m-%d")
    day_name = date_obj.strftime("%A").lower()
    
    # Check business hours for this day
    business_hours = None
    if schedule and "business_hours" in schedule:
        for hours in schedule.get("business_hours", []):
            if hours.get("day") == day_name:
                business_hours = hours
                break
    
    if not business_hours:
        # Default hours
        business_hours = {"is_open": True, "open_time": "09:00", "close_time": "18:00"}
        if day_name == "sunday":
            business_hours["is_open"] = False
        elif day_name == "saturday":
            business_hours = {"is_open": True, "open_time": "10:00", "close_time": "16:00"}
    
    if not business_hours.get("is_open"):
        return {"available": False, "reason": "Closed", "slots": []}
    
    # Get service duration
    duration = 60  # default
    if service_id:
        try:
            # Only try to lookup if it looks like a valid ObjectId
            if len(service_id) == 24:
                service = await db.services.find_one({"_id": ObjectId(service_id)})
                if service:
                    duration = service.get("duration_minutes", 60)
        except Exception:
            pass  # Use default duration if lookup fails
    
    # Generate time slots
    open_time = datetime.strptime(business_hours.get("open_time", "09:00"), "%H:%M")
    close_time = datetime.strptime(business_hours.get("close_time", "18:00"), "%H:%M")
    
    slots = []
    current_time = open_time
    while current_time < close_time:
        time_str = current_time.strftime("%H:%M")
        slots.append({"time": time_str, "available": True})
        current_time += timedelta(minutes=60)  # 1-hour intervals
    
    # Check existing bookings for this date
    existing_bookings = await db.bookings.find({
        "booking_date": date,
        "status": {"$ne": "cancelled"}
    }).to_list(100)
    
    for booking in existing_bookings:
        booked_time = booking.get("booking_time")
        for slot in slots:
            if slot["time"] == booked_time:
                slot["available"] = False
                break
    
    return {"available": True, "slots": slots, "business_hours": business_hours}

# ============== Bookings Routes ==============

@app.get("/api/bookings", dependencies=[Depends(verify_token)])
async def get_bookings(status: Optional[str] = None, date: Optional[str] = None):
    query = {}
    if status:
        query["status"] = status
    if date:
        query["booking_date"] = date
    
    bookings = []
    async for booking in db.bookings.find(query).sort("created_at", -1):
        booking["id"] = str(booking.pop("_id"))
        bookings.append(booking)
    return bookings

@app.get("/api/bookings/{booking_id}")
async def get_booking(booking_id: str):
    booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking["id"] = str(booking.pop("_id"))
    return booking

@app.post("/api/bookings")
async def create_booking(booking: BookingCreate):
    # Check availability - pass None for service_id if not a valid ObjectId to avoid errors
    service_id_for_check = booking.service_id if booking.service_id and len(booking.service_id) == 24 else None
    try:
        availability = await get_availability(booking.booking_date, service_id_for_check)
        if not availability.get("available"):
            raise HTTPException(status_code=400, detail=f"Date not available: {availability.get('reason')}")
        
        # Check if time slot is available
        slot_available = False
        for slot in availability.get("slots", []):
            if slot["time"] == booking.booking_time and slot["available"]:
                slot_available = True
                break
        
        if not slot_available:
            raise HTTPException(status_code=400, detail="Selected time slot is not available")
    except HTTPException:
        raise
    except Exception:
        pass  # Allow booking if availability check fails
    
    # Find or create customer
    customer_id = await find_or_create_customer(
        email=booking.customer_email,
        phone=booking.customer_phone,
        first_name=booking.customer_first_name,
        last_name=booking.customer_last_name,
        address=booking.customer_address
    )
    
    booking_dict = booking.model_dump()
    booking_dict["customer_id"] = customer_id
    booking_dict["status"] = "pending"
    booking_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    booking_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    result = await db.bookings.insert_one(booking_dict)
    booking_dict["id"] = str(result.inserted_id)
    booking_dict.pop("_id", None)
    return booking_dict

@app.put("/api/bookings/{booking_id}/status", dependencies=[Depends(verify_token)])
async def update_booking_status(booking_id: str, status_update: BookingStatusUpdate):
    valid_statuses = ["pending", "in_progress", "complete", "incomplete", "cancelled"]
    if status_update.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    # Get booking to update customer total_spent if complete
    booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    old_status = booking.get("status")
    
    result = await db.bookings.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": {
            "status": status_update.status,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    
    # Update customer total_spent when marked complete (and wasn't already complete)
    if status_update.status == "complete" and old_status != "complete":
        customer_id = booking.get("customer_id")
        total_price = booking.get("total_price", 0)
        if customer_id:
            await db.customers.update_one(
                {"_id": ObjectId(customer_id)},
                {"$inc": {"total_spent": total_price}}
            )
    # Reverse if was complete and now isn't
    elif old_status == "complete" and status_update.status != "complete":
        customer_id = booking.get("customer_id")
        total_price = booking.get("total_price", 0)
        if customer_id:
            await db.customers.update_one(
                {"_id": ObjectId(customer_id)},
                {"$inc": {"total_spent": -total_price}}
            )
    
    return {"message": "Booking status updated successfully"}

@app.delete("/api/bookings/{booking_id}", dependencies=[Depends(verify_token)])
async def delete_booking(booking_id: str):
    result = await db.bookings.delete_one({"_id": ObjectId(booking_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking deleted successfully"}

# ============== Customer Helper ==============

async def find_or_create_customer(email: str, phone: str, first_name: str, last_name: str, address: str = ""):
    """Find existing customer by email AND phone, or create new one"""
    # Normalize email and phone
    email_normalized = email.lower().strip()
    phone_normalized = phone.strip().replace("-", "").replace(" ", "").replace("(", "").replace(")", "")
    
    # Try to find existing customer by email AND phone
    customer = await db.customers.find_one({
        "email_normalized": email_normalized,
        "phone_normalized": phone_normalized
    })
    
    if customer:
        # Update last seen and address if provided
        update_data = {"last_booking_date": datetime.now(timezone.utc).isoformat()}
        if address and not customer.get("address"):
            update_data["address"] = address
        await db.customers.update_one(
            {"_id": customer["_id"]},
            {"$set": update_data, "$inc": {"total_bookings": 1}}
        )
        return str(customer["_id"])
    
    # Create new customer
    new_customer = {
        "first_name": first_name,
        "last_name": last_name,
        "email": email,
        "email_normalized": email_normalized,
        "phone": phone,
        "phone_normalized": phone_normalized,
        "address": address,
        "notes": "",
        "tags": [],
        "total_bookings": 1,
        "total_spent": 0.0,
        "first_booking_date": datetime.now(timezone.utc).isoformat(),
        "last_booking_date": datetime.now(timezone.utc).isoformat(),
        "created_at": datetime.now(timezone.utc).isoformat(),
        "updated_at": datetime.now(timezone.utc).isoformat()
    }
    result = await db.customers.insert_one(new_customer)
    return str(result.inserted_id)

# ============== Customers Routes ==============

@app.get("/api/customers", dependencies=[Depends(verify_token)])
async def get_customers(search: Optional[str] = None):
    query = {}
    if search:
        search_lower = search.lower().strip()
        query = {
            "$or": [
                {"first_name": {"$regex": search, "$options": "i"}},
                {"last_name": {"$regex": search, "$options": "i"}},
                {"email": {"$regex": search, "$options": "i"}},
                {"phone": {"$regex": search, "$options": "i"}},
                {"phone_normalized": {"$regex": search_lower.replace("-", "").replace(" ", ""), "$options": "i"}}
            ]
        }
    
    customers = []
    async for customer in db.customers.find(query).sort("last_booking_date", -1):
        customer["id"] = str(customer.pop("_id"))
        customer.pop("email_normalized", None)
        customer.pop("phone_normalized", None)
        customers.append(customer)
    return customers

@app.get("/api/customers/{customer_id}", dependencies=[Depends(verify_token)])
async def get_customer(customer_id: str):
    customer = await db.customers.find_one({"_id": ObjectId(customer_id)})
    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")
    customer["id"] = str(customer.pop("_id"))
    customer.pop("email_normalized", None)
    customer.pop("phone_normalized", None)
    return customer

@app.get("/api/customers/{customer_id}/bookings", dependencies=[Depends(verify_token)])
async def get_customer_bookings(customer_id: str):
    """Get all bookings for a specific customer"""
    bookings = []
    async for booking in db.bookings.find({"customer_id": customer_id}).sort("created_at", -1):
        booking["id"] = str(booking.pop("_id"))
        bookings.append(booking)
    return bookings

@app.post("/api/customers", dependencies=[Depends(verify_token)])
async def create_customer(customer: CustomerCreate):
    email_normalized = customer.email.lower().strip()
    phone_normalized = customer.phone.strip().replace("-", "").replace(" ", "").replace("(", "").replace(")", "")
    
    # Check if customer already exists
    existing = await db.customers.find_one({
        "email_normalized": email_normalized,
        "phone_normalized": phone_normalized
    })
    if existing:
        raise HTTPException(status_code=400, detail="Customer with this email and phone already exists")
    
    customer_dict = customer.model_dump()
    customer_dict["email_normalized"] = email_normalized
    customer_dict["phone_normalized"] = phone_normalized
    customer_dict["total_bookings"] = 0
    customer_dict["total_spent"] = 0.0
    customer_dict["first_booking_date"] = None
    customer_dict["last_booking_date"] = None
    customer_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    customer_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    result = await db.customers.insert_one(customer_dict)
    customer_dict["id"] = str(result.inserted_id)
    customer_dict.pop("_id", None)
    customer_dict.pop("email_normalized", None)
    customer_dict.pop("phone_normalized", None)
    return customer_dict

@app.put("/api/customers/{customer_id}", dependencies=[Depends(verify_token)])
async def update_customer(customer_id: str, customer: CustomerUpdate):
    update_data = {k: v for k, v in customer.model_dump().items() if v is not None}
    
    if "email" in update_data:
        update_data["email_normalized"] = update_data["email"].lower().strip()
    if "phone" in update_data:
        update_data["phone_normalized"] = update_data["phone"].strip().replace("-", "").replace(" ", "").replace("(", "").replace(")", "")
    
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    result = await db.customers.update_one(
        {"_id": ObjectId(customer_id)},
        {"$set": update_data}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    return {"message": "Customer updated successfully"}

@app.delete("/api/customers/{customer_id}", dependencies=[Depends(verify_token)])
async def delete_customer(customer_id: str):
    result = await db.customers.delete_one({"_id": ObjectId(customer_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Customer not found")
    return {"message": "Customer deleted successfully"}

@app.get("/api/customers/export/csv", dependencies=[Depends(verify_token)])
async def export_customers():
    """Export all customers as CSV data"""
    from fastapi.responses import Response
    import csv
    import io
    
    customers = []
    async for customer in db.customers.find():
        customers.append(customer)
    
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow(["First Name", "Last Name", "Email", "Phone", "Address", "Notes", "Tags", "Total Bookings", "Total Spent"])
    
    for c in customers:
        writer.writerow([
            c.get("first_name", ""),
            c.get("last_name", ""),
            c.get("email", ""),
            c.get("phone", ""),
            c.get("address", ""),
            c.get("notes", ""),
            ",".join(c.get("tags", [])),
            c.get("total_bookings", 0),
            c.get("total_spent", 0)
        ])
    
    csv_content = output.getvalue()
    return Response(
        content=csv_content,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=customers.csv"}
    )

@app.post("/api/customers/import/csv", dependencies=[Depends(verify_token)])
async def import_customers(file_content: str = ""):
    """Import customers from CSV data (sent as JSON body)"""
    import csv
    import io
    
    # Expect JSON body with csv_data field
    from fastapi import Request
    
class CSVImportRequest(BaseModel):
    csv_data: str

@app.post("/api/customers/import", dependencies=[Depends(verify_token)])
async def import_customers_csv(request: CSVImportRequest):
    """Import customers from CSV data"""
    import csv
    import io
    
    reader = csv.DictReader(io.StringIO(request.csv_data))
    imported = 0
    skipped = 0
    
    for row in reader:
        email = row.get("Email", row.get("email", "")).strip()
        phone = row.get("Phone", row.get("phone", "")).strip()
        
        if not email or not phone:
            skipped += 1
            continue
        
        email_normalized = email.lower()
        phone_normalized = phone.replace("-", "").replace(" ", "").replace("(", "").replace(")", "")
        
        # Check if exists
        existing = await db.customers.find_one({
            "email_normalized": email_normalized,
            "phone_normalized": phone_normalized
        })
        
        if existing:
            skipped += 1
            continue
        
        tags_str = row.get("Tags", row.get("tags", ""))
        tags = [t.strip() for t in tags_str.split(",") if t.strip()] if tags_str else []
        
        new_customer = {
            "first_name": row.get("First Name", row.get("first_name", "")),
            "last_name": row.get("Last Name", row.get("last_name", "")),
            "email": email,
            "email_normalized": email_normalized,
            "phone": phone,
            "phone_normalized": phone_normalized,
            "address": row.get("Address", row.get("address", "")),
            "notes": row.get("Notes", row.get("notes", "")),
            "tags": tags,
            "total_bookings": 0,
            "total_spent": 0.0,
            "first_booking_date": None,
            "last_booking_date": None,
            "created_at": datetime.now(timezone.utc).isoformat(),
            "updated_at": datetime.now(timezone.utc).isoformat()
        }
        await db.customers.insert_one(new_customer)
        imported += 1
    
    return {"imported": imported, "skipped": skipped}

# ============== Dashboard Stats ==============

@app.get("/api/dashboard/stats", dependencies=[Depends(verify_token)])
async def get_dashboard_stats():
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    
    # Total bookings
    total_bookings = await db.bookings.count_documents({})
    
    # Today's bookings
    today_bookings = await db.bookings.count_documents({"booking_date": today})
    
    # Pending bookings
    pending_bookings = await db.bookings.count_documents({"status": "pending"})
    
    # In progress bookings
    in_progress_bookings = await db.bookings.count_documents({"status": "in_progress"})
    
    # Completed bookings
    completed_bookings = await db.bookings.count_documents({"status": "complete"})
    
    # Total services
    total_services = await db.services.count_documents({})
    
    # Active services
    active_services = await db.services.count_documents({"is_active": True})
    
    # Recent bookings
    recent_bookings = []
    async for booking in db.bookings.find().sort("created_at", -1).limit(5):
        booking["id"] = str(booking.pop("_id"))
        recent_bookings.append(booking)
    
    return {
        "total_bookings": total_bookings,
        "today_bookings": today_bookings,
        "pending_bookings": pending_bookings,
        "in_progress_bookings": in_progress_bookings,
        "completed_bookings": completed_bookings,
        "total_services": total_services,
        "active_services": active_services,
        "recent_bookings": recent_bookings
    }

# ============== Health Check ==============

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

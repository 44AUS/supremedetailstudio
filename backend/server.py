from fastapi import FastAPI, HTTPException, Depends, status, BackgroundTasks, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from fastapi.responses import Response
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime, timezone, timedelta
from bson import ObjectId
from jose import JWTError, jwt
from passlib.context import CryptContext
import os
import re
import asyncio
import httpx
from dotenv import load_dotenv
from twilio.rest import Client as TwilioClient

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

# Default admin credentials (used for initial setup only)
DEFAULT_ADMIN_USERNAME = os.environ.get("ADMIN_USERNAME", "admin")
DEFAULT_ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "supremeadmin123")

# Twilio Config
TWILIO_ACCOUNT_SID = os.environ.get("TWILIO_ACCOUNT_SID", "")
TWILIO_AUTH_TOKEN = os.environ.get("TWILIO_AUTH_TOKEN", "")
TWILIO_PHONE_NUMBER = os.environ.get("TWILIO_PHONE_NUMBER", "")
GOOGLE_MAPS_API_KEY = os.environ.get("GOOGLE_MAPS_API_KEY", "")

# ============== Models ==============

class LoginRequest(BaseModel):
    username: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str

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
    requires_utilities: bool = True  # Whether this service requires water/electric for mobile service
    image_url: Optional[str] = ""
    applies_to_categories: Optional[List[str]] = []  # For add-on services: which categories this add-on appears for

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
    requires_utilities: Optional[bool] = None
    image_url: Optional[str] = None
    applies_to_categories: Optional[List[str]] = None

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

class BookingService(BaseModel):
    service_id: str
    service_name: str
    base_price: float
    duration_minutes: int

class BookingVehicle(BaseModel):
    vehicle_year: str
    vehicle_make: str
    vehicle_model: str
    vehicle_type: str  # sedan, suv-2row, suv-3row
    vehicle_color: Optional[str] = None
    vin: Optional[str] = None
    services: Optional[List[BookingService]] = []  # Services for this specific vehicle

class BookingCreate(BaseModel):
    customer_type: Optional[str] = "person"  # "person" or "business"
    business_name: Optional[str] = ""
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
    vehicles: Optional[List[BookingVehicle]] = []  # All vehicles (for multi-vehicle bookings)
    service_id: str  # Primary service (for backward compatibility)
    service_name: str  # Primary service name
    services: Optional[List[BookingService]] = []  # All selected services (for multi-service bookings)
    booking_date: str  # YYYY-MM-DD
    booking_time: str  # HH:MM
    total_price: float
    total_duration: Optional[int] = None  # Total duration in minutes for all services
    notes: Optional[str] = ""

class BookingStatusUpdate(BaseModel):
    status: str  # pending, in_progress, complete, incomplete

class BookingPaidUpdate(BaseModel):
    is_paid: bool

class BookingUpdate(BaseModel):
    customer_type: Optional[str] = None
    business_name: Optional[str] = None
    customer_first_name: Optional[str] = None
    customer_last_name: Optional[str] = None
    customer_phone: Optional[str] = None
    customer_email: Optional[str] = None
    customer_address: Optional[str] = None
    service_location: Optional[str] = None
    pickup_delivery: Optional[str] = None
    pickup_distance: Optional[str] = None
    vehicle_year: Optional[str] = None
    vehicle_make: Optional[str] = None
    vehicle_model: Optional[str] = None
    vehicle_type: Optional[str] = None
    vehicle_color: Optional[str] = None
    vehicles: Optional[List[BookingVehicle]] = None
    service_id: Optional[str] = None
    service_name: Optional[str] = None
    services: Optional[List[BookingService]] = None
    booking_date: Optional[str] = None
    booking_time: Optional[str] = None
    total_price: Optional[float] = None
    total_duration: Optional[int] = None
    notes: Optional[str] = None
    status: Optional[str] = None

# ============== Customer Models ==============

class CustomerCreate(BaseModel):
    customer_type: Optional[str] = "person"  # "person" or "business"
    business_name: Optional[str] = ""
    first_name: str
    last_name: str
    phone: str
    email: str
    address: Optional[str] = ""
    notes: Optional[str] = ""
    tags: Optional[List[str]] = []

class CustomerUpdate(BaseModel):
    customer_type: Optional[str] = None
    business_name: Optional[str] = None
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
    can_combine_with: Optional[List[str]] = []  # List of category names this can be paired with
    is_addon: Optional[bool] = False  # Whether this is an add-on category

class CategoryUpdate(BaseModel):
    name: Optional[str] = None
    label: Optional[str] = None
    description: Optional[str] = None
    sort_order: Optional[int] = None
    can_combine_with: Optional[List[str]] = None
    is_addon: Optional[bool] = None

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
    minimum_booking_notice_days: Optional[int] = 1  # Minimum days in advance for booking
    enable_shop_bookings: Optional[bool] = True  # Enable/disable in-shop bookings
    enable_mobile_bookings: Optional[bool] = True  # Enable/disable mobile bookings

# ============== Quote Request Model ==============

class QuoteRequest(BaseModel):
    service_type: str  # automotive, residential, commercial, security
    first_name: str
    last_name: str
    email: str
    phone: str
    vehicle_year: Optional[str] = ""
    vehicle_make: Optional[str] = ""
    vehicle_model: Optional[str] = ""
    description: str

# ============== SMS Models ==============

class SMSSettings(BaseModel):
    sms_enabled: bool = False
    reminder_enabled: bool = True
    reminder_hours_before: int = 24
    review_request_enabled: bool = True
    review_delay_hours: int = 2
    review_url: str = ""

class SMSTemplateUpdate(BaseModel):
    name: Optional[str] = None
    body: Optional[str] = None
    is_active: Optional[bool] = None

class SendSMSRequest(BaseModel):
    to_phone: str
    message: str
    customer_id: Optional[str] = None
    booking_id: Optional[str] = None

class MassTextRequest(BaseModel):
    message: str
    filter_tags: Optional[List[str]] = []
    filter_min_bookings: Optional[int] = None
    filter_min_spent: Optional[float] = None

class OnMyWayRequest(BaseModel):
    booking_id: str
    custom_eta: Optional[str] = None

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

# ============== SMS Utilities ==============

def format_phone_for_twilio(phone: str) -> str:
    digits = ''.join(c for c in phone if c.isdigit())
    if len(digits) == 10:
        return f"+1{digits}"
    elif len(digits) == 11 and digits.startswith("1"):
        return f"+{digits}"
    return f"+{digits}"

async def build_sms_context(booking: dict) -> dict:
    settings = await db.settings.find_one({"type": "business"})
    sms_settings = await db.settings.find_one({"type": "sms"})
    shop_name = settings.get("shop_name", "Supreme Detail Studio") if settings else "Supreme Detail Studio"
    shop_phone = settings.get("shop_phone", "(502) 417-0690") if settings else "(502) 417-0690"
    shop_address = settings.get("shop_address", "") if settings else ""
    review_url = sms_settings.get("review_url", "") if sms_settings else ""
    vehicle_info = f"{booking.get('vehicle_year', '')} {booking.get('vehicle_make', '')} {booking.get('vehicle_model', '')}".strip()
    date_str = booking.get("booking_date", "")
    time_str = booking.get("booking_time", "")
    try:
        dt = datetime.strptime(f"{date_str} {time_str}", "%Y-%m-%d %H:%M")
        formatted_dt = dt.strftime("%B %d, %Y at %I:%M %p")
    except Exception:
        formatted_dt = f"{date_str} {time_str}"
    return {
        "SHOP_NAME": shop_name,
        "SHOP_NUMBER": shop_phone,
        "SHOP_ADDRESS": shop_address,
        "BOOKING_DATE_TIME": formatted_dt,
        "VEHICLE_INFO": vehicle_info,
        "CUSTOMER_NAME": f"{booking.get('customer_first_name', '')} {booking.get('customer_last_name', '')}".strip(),
        "REVIEW_URL": review_url,
        "ETA": "",
        "SERVICE_NAME": booking.get("service_name", ""),
    }

async def render_sms_template(template_key: str, context: dict) -> Optional[str]:
    template = await db.sms_templates.find_one({"template_key": template_key, "is_active": True})
    if not template:
        return None
    body = template["body"]
    for key, value in context.items():
        body = body.replace(f"{{{key}}}", str(value))
    return body

async def send_sms(to_phone: str, body: str, customer_name: str = "",
                   customer_id: str = None, booking_id: str = None,
                   template_key: str = None) -> dict:
    sms_settings = await db.settings.find_one({"type": "sms"})
    if not sms_settings or not sms_settings.get("sms_enabled", False):
        return {"success": False, "error": "SMS is disabled"}
    if not TWILIO_ACCOUNT_SID or not TWILIO_AUTH_TOKEN or not TWILIO_PHONE_NUMBER:
        return {"success": False, "error": "Twilio credentials not configured"}
    to_formatted = format_phone_for_twilio(to_phone)
    try:
        loop = asyncio.get_event_loop()
        twilio_client = TwilioClient(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN)
        message = await loop.run_in_executor(None, lambda: twilio_client.messages.create(
            body=body, from_=TWILIO_PHONE_NUMBER, to=to_formatted
        ))
        await db.sms_logs.insert_one({
            "customer_phone": to_formatted,
            "customer_name": customer_name,
            "customer_id": customer_id,
            "booking_id": booking_id,
            "direction": "outbound",
            "message_body": body,
            "template_key": template_key,
            "twilio_sid": message.sid,
            "status": "sent",
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        return {"success": True, "sid": message.sid}
    except Exception as e:
        await db.sms_logs.insert_one({
            "customer_phone": to_formatted,
            "customer_name": customer_name,
            "customer_id": customer_id,
            "booking_id": booking_id,
            "direction": "outbound",
            "message_body": body,
            "template_key": template_key,
            "twilio_sid": None,
            "status": "failed",
            "error": str(e),
            "created_at": datetime.now(timezone.utc).isoformat()
        })
        return {"success": False, "error": str(e)}

async def trigger_booking_sms(booking_data: dict, template_key: str, booking_id: str):
    context = await build_sms_context(booking_data)
    body = await render_sms_template(template_key, context)
    if body:
        customer_name = f"{booking_data.get('customer_first_name', '')} {booking_data.get('customer_last_name', '')}".strip()
        await send_sms(
            to_phone=booking_data["customer_phone"],
            body=body,
            customer_name=customer_name,
            customer_id=booking_data.get("customer_id"),
            booking_id=booking_id,
            template_key=template_key
        )

async def schedule_review_request(booking_id: str):
    await db.sms_scheduled.insert_one({
        "booking_id": booking_id,
        "template_key": "review_request",
        "sent": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    })

async def calculate_eta(destination_address: str) -> Optional[str]:
    api_key = GOOGLE_MAPS_API_KEY
    if not api_key or not destination_address:
        return None
    settings = await db.settings.find_one({"type": "business"})
    origin = settings.get("shop_address", "") if settings else ""
    if not origin:
        return None
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                "https://maps.googleapis.com/maps/api/directions/json",
                params={"origin": origin, "destination": destination_address, "key": api_key, "departure_time": "now"},
                timeout=10.0
            )
            data = response.json()
            if data.get("status") == "OK":
                leg = data["routes"][0]["legs"][0]
                duration = leg.get("duration_in_traffic", leg.get("duration", {}))
                duration_text = duration.get("text", "")
                mins_match = re.search(r'(\d+)\s*min', duration_text)
                if mins_match:
                    mins = int(mins_match.group(1))
                    eta_time = datetime.now() + timedelta(minutes=mins)
                    return eta_time.strftime("%I:%M %p")
                return duration_text
    except Exception:
        pass
    return None

# ============== Auth Routes ==============

async def get_admin_credentials():
    """Get admin credentials from DB, or initialize from env defaults."""
    admin = await db.admin.find_one({"type": "admin_credentials"})
    if not admin:
        # First run: store default credentials in DB with hashed password
        hashed = pwd_context.hash(DEFAULT_ADMIN_PASSWORD)
        await db.admin.insert_one({
            "type": "admin_credentials",
            "username": DEFAULT_ADMIN_USERNAME,
            "password_hash": hashed,
        })
        return {"username": DEFAULT_ADMIN_USERNAME, "password_hash": hashed}
    return admin

@app.post("/api/auth/login", response_model=TokenResponse)
async def login(request: LoginRequest):
    admin = await get_admin_credentials()
    if request.username == admin["username"] and pwd_context.verify(request.password, admin["password_hash"]):
        token = create_access_token({"sub": request.username})
        return TokenResponse(access_token=token)
    raise HTTPException(status_code=401, detail="Invalid credentials")

@app.get("/api/auth/verify")
async def verify_auth(username: str = Depends(verify_token)):
    return {"valid": True, "username": username}

@app.put("/api/auth/change-password", dependencies=[Depends(verify_token)])
async def change_password(request: ChangePasswordRequest):
    """Change admin password (admin only)."""
    admin = await get_admin_credentials()
    if not pwd_context.verify(request.current_password, admin["password_hash"]):
        raise HTTPException(status_code=400, detail="Current password is incorrect")
    new_hash = pwd_context.hash(request.new_password)
    await db.admin.update_one(
        {"type": "admin_credentials"},
        {"$set": {"password_hash": new_hash}}
    )
    return {"message": "Password changed successfully"}

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
            {"name": "addon", "label": "Add-On Services", "description": "Additional services and upgrades", "sort_order": 5, "is_addon": True},
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
    defaults = {
        "shop_name": "Supreme Detail Studio",
        "shop_address": "123 Main St, Marietta, GA 30060",
        "shop_phone": "(502) 417-0690",
        "shop_email": "info@supremedetailstudio.com",
        "mobile_service_upcharge": 50.0,
        "mobile_service_description": "We come to you",
        "minimum_booking_notice_days": 1,
        "enable_shop_bookings": True,
        "enable_mobile_bookings": True
    }
    settings = await db.settings.find_one({"type": "business"})
    if not settings:
        return defaults
    settings.pop("_id", None)
    settings.pop("type", None)
    # Merge defaults with saved settings so new fields always have values
    return {**defaults, **settings}

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
    default_hours = [
        {"day": "monday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
        {"day": "tuesday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
        {"day": "wednesday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
        {"day": "thursday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
        {"day": "friday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
        {"day": "saturday", "is_open": True, "open_time": "10:00", "close_time": "16:00"},
        {"day": "sunday", "is_open": False, "open_time": "09:00", "close_time": "18:00"},
    ]
    defaults = {"business_hours": default_hours, "closed_dates": []}
    schedule = await db.schedule.find_one({"type": "settings"})
    if not schedule:
        return defaults
    schedule.pop("_id", None)
    schedule.pop("type", None)
    return {**defaults, **schedule}

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

    # Mark slots as unavailable based on booking duration
    for booking in existing_bookings:
        booked_time_str = booking.get("booking_time")
        booked_service_id = booking.get("service_id")

        # Get the service duration for this booking
        # Use total_duration if available (for multi-service bookings), otherwise lookup service
        booking_duration = booking.get("total_duration")
        if not booking_duration:
            booking_duration = 60  # default
            if booked_service_id:
                try:
                    if len(booked_service_id) == 24:
                        booked_service = await db.services.find_one({"_id": ObjectId(booked_service_id)})
                        if booked_service:
                            booking_duration = booked_service.get("duration_minutes", 60)
                except Exception:
                    pass

        # Parse the booked time
        try:
            booked_time = datetime.strptime(booked_time_str, "%H:%M")
        except:
            continue

        # Calculate end time of this booking + 1 hour buffer for cleanup/restocking
        booking_end_time = booked_time + timedelta(minutes=booking_duration + 60)

        # Mark all slots that overlap with this booking as unavailable
        for slot in slots:
            try:
                slot_time = datetime.strptime(slot["time"], "%H:%M")
                slot_end_time = slot_time + timedelta(minutes=60)  # Each slot is 1 hour

                # Check if this slot overlaps with the booking
                # Block slot if it starts at or before the booking ends (includes buffer time)
                if slot_time <= booking_end_time and slot_end_time > booked_time:
                    slot["available"] = False
            except:
                continue

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

@app.get("/api/bookings/unseen-count", dependencies=[Depends(verify_token)])
async def get_unseen_booking_count():
    count = await db.bookings.count_documents({"seen_by_admin": {"$ne": True}})
    return {"count": count}

@app.get("/api/bookings/unseen", dependencies=[Depends(verify_token)])
async def get_unseen_bookings():
    bookings = await db.bookings.find({"seen_by_admin": {"$ne": True}}).sort("created_at", -1).to_list(10)
    result = []
    for b in bookings:
        result.append({
            "id": str(b["_id"]),
            "customer_first_name": b.get("customer_first_name", ""),
            "customer_last_name": b.get("customer_last_name", ""),
            "service_name": b.get("service_name", ""),
            "booking_date": b.get("booking_date", ""),
            "booking_time": b.get("booking_time", ""),
            "created_at": b.get("created_at", ""),
        })
    return {"bookings": result}

@app.put("/api/bookings/mark-seen", dependencies=[Depends(verify_token)])
async def mark_bookings_seen():
    await db.bookings.update_many(
        {"seen_by_admin": {"$ne": True}},
        {"$set": {"seen_by_admin": True}}
    )
    return {"message": "All bookings marked as seen"}

@app.get("/api/bookings/{booking_id}")
async def get_booking(booking_id: str):
    booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    booking["id"] = str(booking.pop("_id"))
    return booking

@app.post("/api/bookings")
async def create_booking(booking: BookingCreate, background_tasks: BackgroundTasks):
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
    booking_dict["is_paid"] = False
    booking_dict["seen_by_admin"] = False
    booking_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    booking_dict["updated_at"] = datetime.now(timezone.utc).isoformat()

    result = await db.bookings.insert_one(booking_dict)
    booking_dict["id"] = str(result.inserted_id)
    booking_dict.pop("_id", None)

    # SMS: Job Scheduled notification
    background_tasks.add_task(trigger_booking_sms, booking_dict, "job_scheduled", booking_dict["id"])

    return booking_dict

@app.put("/api/bookings/{booking_id}/status", dependencies=[Depends(verify_token)])
async def update_booking_status(booking_id: str, status_update: BookingStatusUpdate, background_tasks: BackgroundTasks):
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

    # SMS triggers on status change
    if status_update.status != old_status:
        booking["status"] = status_update.status
        if status_update.status == "complete":
            template_key = "job_complete_shop" if booking.get("service_location") == "shop" else "job_complete_mobile"
            background_tasks.add_task(trigger_booking_sms, booking, template_key, booking_id)
            background_tasks.add_task(schedule_review_request, booking_id)
        elif status_update.status == "cancelled":
            background_tasks.add_task(trigger_booking_sms, booking, "cancelled", booking_id)

    return {"message": "Booking status updated successfully"}

@app.put("/api/bookings/{booking_id}/paid", dependencies=[Depends(verify_token)])
async def update_booking_paid(booking_id: str, paid_update: BookingPaidUpdate):
    booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")

    await db.bookings.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": {
            "is_paid": paid_update.is_paid,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    return {"message": "Booking payment status updated successfully"}

@app.put("/api/bookings/{booking_id}", dependencies=[Depends(verify_token)])
async def update_booking(booking_id: str, booking_update: BookingUpdate):
    """Update a booking's details"""
    booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    update_data = {k: v for k, v in booking_update.model_dump().items() if v is not None}
    
    if not update_data:
        return {"message": "No changes to update"}
    
    # Handle status change for customer total_spent
    old_status = booking.get("status")
    new_status = update_data.get("status")
    
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    result = await db.bookings.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": update_data}
    )
    
    # Update customer total_spent if status changed to/from complete
    if new_status and new_status != old_status:
        customer_id = booking.get("customer_id")
        total_price = update_data.get("total_price", booking.get("total_price", 0))
        if customer_id:
            if new_status == "complete" and old_status != "complete":
                await db.customers.update_one(
                    {"_id": ObjectId(customer_id)},
                    {"$inc": {"total_spent": total_price}}
                )
            elif old_status == "complete" and new_status != "complete":
                await db.customers.update_one(
                    {"_id": ObjectId(customer_id)},
                    {"$inc": {"total_spent": -booking.get("total_price", 0)}}
                )
    
    # Return updated booking
    updated_booking = await db.bookings.find_one({"_id": ObjectId(booking_id)})
    updated_booking["id"] = str(updated_booking.pop("_id"))
    return updated_booking

@app.post("/api/bookings/admin", dependencies=[Depends(verify_token)])
async def create_booking_admin(booking: BookingCreate, background_tasks: BackgroundTasks):
    """Create a booking from admin dashboard (for phone orders)"""
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
    booking_dict["is_paid"] = False
    booking_dict["seen_by_admin"] = True
    booking_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    booking_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
    booking_dict["created_by"] = "admin"

    result = await db.bookings.insert_one(booking_dict)
    booking_dict["id"] = str(result.inserted_id)
    booking_dict.pop("_id", None)

    # SMS: Job Scheduled notification
    background_tasks.add_task(trigger_booking_sms, booking_dict, "job_scheduled", booking_dict["id"])

    return booking_dict

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

    # Revenue totals (only paid bookings)
    total_revenue = 0
    today_revenue = 0
    pipeline_total = [
        {"$match": {"is_paid": True}},
        {"$group": {"_id": None, "total": {"$sum": "$total_price"}}}
    ]
    async for doc in db.bookings.aggregate(pipeline_total):
        total_revenue = doc.get("total", 0)

    pipeline_today = [
        {"$match": {"is_paid": True, "booking_date": today}},
        {"$group": {"_id": None, "total": {"$sum": "$total_price"}}}
    ]
    async for doc in db.bookings.aggregate(pipeline_today):
        today_revenue = doc.get("total", 0)

    # Monthly revenue (current month)
    monthly_revenue = 0
    now = datetime.now(timezone.utc)
    month_start = now.strftime("%Y-%m-01")
    month_end = f"{now.strftime('%Y-%m')}-31"
    pipeline_monthly = [
        {"$match": {"is_paid": True, "booking_date": {"$gte": month_start, "$lte": month_end}}},
        {"$group": {"_id": None, "total": {"$sum": "$total_price"}}}
    ]
    async for doc in db.bookings.aggregate(pipeline_monthly):
        monthly_revenue = doc.get("total", 0)

    # Yearly revenue (current year)
    yearly_revenue = 0
    year_start = now.strftime("%Y-01-01")
    year_end = now.strftime("%Y-12-31")
    pipeline_yearly = [
        {"$match": {"is_paid": True, "booking_date": {"$gte": year_start, "$lte": year_end}}},
        {"$group": {"_id": None, "total": {"$sum": "$total_price"}}}
    ]
    async for doc in db.bookings.aggregate(pipeline_yearly):
        yearly_revenue = doc.get("total", 0)

    return {
        "total_bookings": total_bookings,
        "today_bookings": today_bookings,
        "pending_bookings": pending_bookings,
        "in_progress_bookings": in_progress_bookings,
        "completed_bookings": completed_bookings,
        "total_services": total_services,
        "active_services": active_services,
        "recent_bookings": recent_bookings,
        "total_revenue": total_revenue,
        "today_revenue": today_revenue,
        "monthly_revenue": monthly_revenue,
        "yearly_revenue": yearly_revenue
    }

# ============== Quote Requests ==============

@app.post("/api/quotes")
async def submit_quote_request(quote: QuoteRequest):
    """Submit a quote request (public endpoint)"""
    quote_data = quote.model_dump()
    quote_data["created_at"] = datetime.now(timezone.utc).isoformat()
    quote_data["seen_by_admin"] = False
    quote_data["status"] = "new"  # new, contacted, closed
    result = await db.quotes.insert_one(quote_data)
    return {"success": True, "message": "Quote request submitted successfully", "id": str(result.inserted_id)}

@app.get("/api/quotes/unseen-count", dependencies=[Depends(verify_token)])
async def get_unseen_quote_count():
    count = await db.quotes.count_documents({"seen_by_admin": {"$ne": True}})
    return {"count": count}

@app.get("/api/quotes/unseen", dependencies=[Depends(verify_token)])
async def get_unseen_quotes():
    quotes = await db.quotes.find({"seen_by_admin": {"$ne": True}}).sort("created_at", -1).to_list(10)
    result = []
    for q in quotes:
        result.append({
            "id": str(q["_id"]),
            "first_name": q.get("first_name", ""),
            "last_name": q.get("last_name", ""),
            "service_type": q.get("service_type", ""),
            "created_at": q.get("created_at", ""),
        })
    return {"quotes": result}

@app.put("/api/quotes/mark-seen", dependencies=[Depends(verify_token)])
async def mark_quotes_seen():
    await db.quotes.update_many(
        {"seen_by_admin": {"$ne": True}},
        {"$set": {"seen_by_admin": True}}
    )
    return {"message": "All quotes marked as seen"}

@app.get("/api/admin/quotes", dependencies=[Depends(verify_token)])
async def get_quotes():
    """Get all quote requests (admin only)"""
    quotes = []
    async for quote in db.quotes.find().sort("created_at", -1):
        quote["_id"] = str(quote["_id"])
        quotes.append(quote)
    return {"quotes": quotes}

@app.patch("/api/admin/quotes/{quote_id}/status", dependencies=[Depends(verify_token)])
async def update_quote_status(quote_id: str, status: str):
    valid = ["new", "contacted", "closed"]
    if status not in valid:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid}")
    result = await db.quotes.update_one(
        {"_id": ObjectId(quote_id)},
        {"$set": {"status": status, "seen_by_admin": True}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Quote not found")
    return {"success": True}

@app.delete("/api/admin/quotes/{quote_id}", dependencies=[Depends(verify_token)])
async def delete_quote(quote_id: str):
    result = await db.quotes.delete_one({"_id": ObjectId(quote_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Quote not found")
    return {"success": True}

# ============== Contact Messages ==============

class ContactMessage(BaseModel):
    name: str
    email: str
    phone: str
    message: str

@app.post("/api/contact")
async def submit_contact_form(contact: ContactMessage):
    """
    Submit a contact form message
    Stores the message in the database for admin review
    """
    try:
        contact_data = {
            "name": contact.name,
            "email": contact.email,
            "phone": contact.phone,
            "message": contact.message,
            "created_at": datetime.now(timezone.utc),
            "read": False
        }

        result = await db.contact_messages.insert_one(contact_data)

        return {
            "success": True,
            "message": "Contact form submitted successfully",
            "id": str(result.inserted_id)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to submit contact form: {str(e)}")

@app.get("/api/admin/contact-messages", dependencies=[Depends(verify_token)])
async def get_contact_messages():
    """
    Get all contact form submissions (admin only)
    Returns list of messages sorted by date
    """
    try:
        messages = await db.contact_messages.find().sort("created_at", -1).to_list(1000)

        for message in messages:
            message["_id"] = str(message["_id"])
            message["created_at"] = message["created_at"].isoformat()

        return {"messages": messages}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch contact messages: {str(e)}")

@app.patch("/api/admin/contact-messages/{message_id}/read", dependencies=[Depends(verify_token)])
async def mark_message_read(
    message_id: str,
    read: bool
):
    """
    Mark a contact message as read/unread (admin only)
    """
    try:
        result = await db.contact_messages.update_one(
            {"_id": ObjectId(message_id)},
            {"$set": {"read": read}}
        )

        if result.matched_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")

        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to update message: {str(e)}")

@app.delete("/api/admin/contact-messages/{message_id}", dependencies=[Depends(verify_token)])
async def delete_contact_message(message_id: str):
    """
    Delete a contact message (admin only)
    """
    try:
        result = await db.contact_messages.delete_one({"_id": ObjectId(message_id)})

        if result.deleted_count == 0:
            raise HTTPException(status_code=404, detail="Message not found")

        return {"success": True}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete message: {str(e)}")

# ============== Google Reviews ==============

@app.get("/api/google-reviews")
async def get_google_reviews():
    """
    Fetch reviews from Google Places API
    Returns formatted review data for the GoogleReviews component
    """
    google_api_key = os.getenv("GOOGLE_PLACES_API_KEY")
    place_id = "ChIJXSKDrJx8bYwRMLUuwiesXPY"  # Supreme Detail Garage - Ceramic Coating Specialists

    if not google_api_key or google_api_key == "YOUR_API_KEY_HERE":
        raise HTTPException(
            status_code=503,
            detail="Google Places API key not configured"
        )

    try:
        # Fetch place details with reviews from Google Places API
        async with httpx.AsyncClient() as client:
            url = "https://maps.googleapis.com/maps/api/place/details/json"
            params = {
                "place_id": place_id,
                "fields": "reviews,rating,user_ratings_total",
                "key": google_api_key
            }

            response = await client.get(url, params=params, timeout=10.0)
            data = response.json()

            if data.get("status") != "OK":
                raise HTTPException(
                    status_code=500,
                    detail=f"Google Places API error: {data.get('status')}"
                )

            result = data.get("result", {})
            reviews_data = result.get("reviews", [])

            # Format reviews for frontend component
            formatted_reviews = []
            for idx, review in enumerate(reviews_data):
                author_name = review.get("author_name", "Anonymous")
                # Get initials from name
                name_parts = author_name.split()
                if len(name_parts) >= 2:
                    initials = (name_parts[0][0] + name_parts[-1][0]).upper()
                else:
                    initials = author_name[:2].upper()

                formatted_reviews.append({
                    "id": idx + 1,
                    "author": author_name,
                    "rating": review.get("rating", 5),
                    "date": review.get("relative_time_description", ""),
                    "text": review.get("text", ""),
                    "avatar": initials
                })

            return {
                "reviews": formatted_reviews,
                "overallRating": result.get("rating", 5.0),
                "totalReviews": result.get("user_ratings_total", len(formatted_reviews))
            }

    except httpx.TimeoutException:
        raise HTTPException(status_code=504, detail="Google Places API timeout")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to fetch reviews: {str(e)}")

# ============== SMS Routes ==============

DEFAULT_SMS_TEMPLATES = [
    {"template_key": "job_scheduled", "name": "Job Scheduled",
     "body": "Your appt. with {SHOP_NAME} for {BOOKING_DATE_TIME} has been scheduled. If you need to reschedule, please call {SHOP_NUMBER}.",
     "is_active": True},
    {"template_key": "job_reminder", "name": "Job Reminder",
     "body": "This is a courtesy reminder that your appointment with {SHOP_NAME} on {BOOKING_DATE_TIME} is approaching. If you have to reschedule, please call {SHOP_NUMBER}. Otherwise, we look forward to working on your {VEHICLE_INFO}.",
     "is_active": True},
    {"template_key": "job_complete_shop", "name": "Job Completed (In-Shop)",
     "body": "We've finished working on your {VEHICLE_INFO}. Please give us a call at {SHOP_NUMBER} to schedule a convenient pick up time.",
     "is_active": True},
    {"template_key": "job_complete_mobile", "name": "Job Completed (Mobile)",
     "body": "We've finished working on your {VEHICLE_INFO}. Thanks for choosing {SHOP_NAME}.",
     "is_active": True},
    {"template_key": "review_request", "name": "Rate/Review Request",
     "body": "Thanks for choosing {SHOP_NAME}. We enjoyed working on your {VEHICLE_INFO}. If you aren't 100% satisfied, please let us know and we'll make it right. Otherwise, we'd appreciate a minute of your time and a review at {REVIEW_URL}. Thank you.",
     "is_active": True},
    {"template_key": "on_my_way", "name": "On My Way",
     "body": "Hi {CUSTOMER_NAME}, this is {SHOP_NAME}. We're on our way to work on your {VEHICLE_INFO}. I should be there around {ETA}. If you have any questions, please call {SHOP_NUMBER}.",
     "is_active": True},
    {"template_key": "cancelled", "name": "Cancelled",
     "body": "Your appointment with {SHOP_NAME} on {BOOKING_DATE_TIME} has been canceled. If you would like to reschedule, please call {SHOP_NUMBER}.",
     "is_active": True},
]

@app.get("/api/settings/sms", dependencies=[Depends(verify_token)])
async def get_sms_settings():
    defaults = {
        "sms_enabled": False,
        "reminder_enabled": True,
        "reminder_hours_before": 24,
        "review_request_enabled": True,
        "review_delay_hours": 2,
        "review_url": "",
        "twilio_phone_number": TWILIO_PHONE_NUMBER,
    }
    settings = await db.settings.find_one({"type": "sms"})
    if not settings:
        return defaults
    settings.pop("_id", None)
    settings.pop("type", None)
    settings["twilio_phone_number"] = TWILIO_PHONE_NUMBER
    return {**defaults, **settings}

@app.put("/api/settings/sms", dependencies=[Depends(verify_token)])
async def update_sms_settings(settings: SMSSettings):
    settings_dict = settings.model_dump()
    settings_dict["type"] = "sms"
    settings_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
    await db.settings.update_one({"type": "sms"}, {"$set": settings_dict}, upsert=True)
    return {"message": "SMS settings updated successfully"}

@app.get("/api/sms/templates", dependencies=[Depends(verify_token)])
async def get_sms_templates():
    templates = []
    async for t in db.sms_templates.find():
        t["id"] = str(t.pop("_id"))
        templates.append(t)
    if not templates:
        for d in DEFAULT_SMS_TEMPLATES:
            d_copy = {**d, "created_at": datetime.now(timezone.utc).isoformat()}
            result = await db.sms_templates.insert_one(d_copy)
            d_copy["id"] = str(result.inserted_id)
            d_copy.pop("_id", None)
            templates.append(d_copy)
    return templates

@app.put("/api/sms/templates/{template_id}", dependencies=[Depends(verify_token)])
async def update_sms_template(template_id: str, update: SMSTemplateUpdate):
    update_data = {k: v for k, v in update.model_dump().items() if v is not None}
    update_data["updated_at"] = datetime.now(timezone.utc).isoformat()
    result = await db.sms_templates.update_one({"_id": ObjectId(template_id)}, {"$set": update_data})
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Template not found")
    return {"message": "Template updated successfully"}

@app.post("/api/sms/send", dependencies=[Depends(verify_token)])
async def send_sms_endpoint(req: SendSMSRequest):
    # Look up customer name if customer_id provided
    customer_name = ""
    if req.customer_id:
        customer = await db.customers.find_one({"_id": ObjectId(req.customer_id)})
        if customer:
            customer_name = f"{customer.get('first_name', '')} {customer.get('last_name', '')}".strip()
    result = await send_sms(
        to_phone=req.to_phone, body=req.message,
        customer_name=customer_name, customer_id=req.customer_id, booking_id=req.booking_id
    )
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result.get("error", "SMS failed"))
    return {"message": "SMS sent successfully", "sid": result.get("sid")}

@app.post("/api/sms/mass-send", dependencies=[Depends(verify_token)])
async def mass_send_sms(req: MassTextRequest, background_tasks: BackgroundTasks):
    query = {}
    if req.filter_tags:
        query["tags"] = {"$in": req.filter_tags}
    if req.filter_min_bookings is not None:
        query["total_bookings"] = {"$gte": req.filter_min_bookings}
    if req.filter_min_spent is not None:
        query["total_spent"] = {"$gte": req.filter_min_spent}
    customers = await db.customers.find(query).to_list(10000)
    customer_count = len(customers)

    async def send_mass():
        sent = 0
        failed = 0
        for customer in customers:
            phone = customer.get("phone", "")
            if not phone:
                failed += 1
                continue
            name = f"{customer.get('first_name', '')} {customer.get('last_name', '')}".strip()
            r = await send_sms(
                to_phone=phone, body=req.message,
                customer_name=name, customer_id=str(customer["_id"]),
                template_key="mass_text"
            )
            if r["success"]:
                sent += 1
            else:
                failed += 1
            await asyncio.sleep(1)  # Twilio rate limit: 1 msg/sec
        await db.sms_mass_logs.insert_one({
            "message": req.message, "total_recipients": customer_count,
            "sent": sent, "failed": failed,
            "filters": req.model_dump(),
            "created_at": datetime.now(timezone.utc).isoformat()
        })

    background_tasks.add_task(send_mass)
    return {"message": f"Mass text queued for {customer_count} recipients", "count": customer_count}

@app.post("/api/sms/on-my-way", dependencies=[Depends(verify_token)])
async def send_on_my_way(req: OnMyWayRequest):
    booking = await db.bookings.find_one({"_id": ObjectId(req.booking_id)})
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    context = await build_sms_context(booking)
    if req.custom_eta:
        context["ETA"] = req.custom_eta
    else:
        eta = await calculate_eta(booking.get("customer_address", ""))
        context["ETA"] = eta or "soon"
    body = await render_sms_template("on_my_way", context)
    if not body:
        raise HTTPException(status_code=404, detail="On My Way template not found or disabled")
    customer_name = f"{booking.get('customer_first_name', '')} {booking.get('customer_last_name', '')}".strip()
    result = await send_sms(
        to_phone=booking["customer_phone"], body=body,
        customer_name=customer_name, customer_id=booking.get("customer_id"),
        booking_id=req.booking_id, template_key="on_my_way"
    )
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result.get("error", "SMS failed"))
    return {"message": "On My Way SMS sent", "eta": context["ETA"]}

@app.get("/api/sms/conversations", dependencies=[Depends(verify_token)])
async def get_sms_conversations():
    pipeline = [
        {"$sort": {"created_at": -1}},
        {"$group": {
            "_id": "$customer_phone",
            "customer_name": {"$first": "$customer_name"},
            "customer_id": {"$first": "$customer_id"},
            "last_message": {"$first": "$message_body"},
            "last_direction": {"$first": "$direction"},
            "last_timestamp": {"$first": "$created_at"},
            "unread_count": {"$sum": {"$cond": [
                {"$and": [{"$eq": ["$direction", "inbound"]}, {"$ne": ["$read", True]}]},
                1, 0
            ]}}
        }},
        {"$sort": {"last_timestamp": -1}}
    ]
    conversations = []
    async for conv in db.sms_logs.aggregate(pipeline):
        conversations.append({
            "phone": conv["_id"],
            "customer_name": conv.get("customer_name", "Unknown"),
            "customer_id": conv.get("customer_id"),
            "last_message": conv.get("last_message", ""),
            "last_direction": conv.get("last_direction", ""),
            "last_timestamp": conv.get("last_timestamp", ""),
            "unread_count": conv.get("unread_count", 0),
        })
    return conversations

@app.get("/api/sms/logs", dependencies=[Depends(verify_token)])
async def get_sms_logs(phone: Optional[str] = None, limit: int = 100):
    query = {}
    if phone:
        normalized = format_phone_for_twilio(phone)
        query["customer_phone"] = normalized
    logs = []
    async for log in db.sms_logs.find(query).sort("created_at", -1).limit(limit):
        log["id"] = str(log.pop("_id"))
        logs.append(log)
    return logs

@app.put("/api/sms/logs/mark-read", dependencies=[Depends(verify_token)])
async def mark_conversation_read(phone: str):
    normalized = format_phone_for_twilio(phone)
    await db.sms_logs.update_many(
        {"customer_phone": normalized, "direction": "inbound", "read": {"$ne": True}},
        {"$set": {"read": True}}
    )
    return {"message": "Conversation marked as read"}

@app.delete("/api/sms/conversations", dependencies=[Depends(verify_token)])
async def delete_sms_conversation(phone: str):
    normalized = format_phone_for_twilio(phone)
    result = await db.sms_logs.delete_many({"customer_phone": normalized})
    return {"message": f"Deleted {result.deleted_count} messages"}

@app.get("/api/sms/customer-count", dependencies=[Depends(verify_token)])
async def get_sms_customer_count(tags: Optional[str] = None, min_bookings: Optional[int] = None, min_spent: Optional[float] = None):
    query = {}
    if tags:
        query["tags"] = {"$in": tags.split(",")}
    if min_bookings is not None:
        query["total_bookings"] = {"$gte": min_bookings}
    if min_spent is not None:
        query["total_spent"] = {"$gte": min_spent}
    count = await db.customers.count_documents(query)
    return {"count": count}

# Twilio incoming webhook
@app.post("/api/sms/webhook")
async def twilio_incoming_webhook(request: Request):
    form_data = await request.form()
    from_number = form_data.get("From", "")
    body = form_data.get("Body", "")
    twilio_sid = form_data.get("MessageSid", "")
    # Match to customer
    digits = ''.join(c for c in from_number if c.isdigit())
    if digits.startswith("1") and len(digits) == 11:
        digits = digits[1:]
    customer = await db.customers.find_one({"phone_normalized": digits})
    customer_name = ""
    customer_id = None
    if customer:
        customer_name = f"{customer.get('first_name', '')} {customer.get('last_name', '')}".strip()
        customer_id = str(customer["_id"])
    await db.sms_logs.insert_one({
        "customer_phone": from_number,
        "customer_name": customer_name,
        "customer_id": customer_id,
        "booking_id": None,
        "direction": "inbound",
        "message_body": body,
        "template_key": None,
        "twilio_sid": twilio_sid,
        "status": "received",
        "read": False,
        "created_at": datetime.now(timezone.utc).isoformat()
    })
    return Response(
        content='<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
        media_type="application/xml"
    )

# ============== Background Tasks ==============

async def reminder_checker_loop():
    while True:
        try:
            sms_settings = await db.settings.find_one({"type": "sms"})
            if sms_settings and sms_settings.get("sms_enabled") and sms_settings.get("reminder_enabled"):
                hours_before = sms_settings.get("reminder_hours_before", 24)
                now = datetime.now(timezone.utc)
                async for booking in db.bookings.find({
                    "status": {"$in": ["pending", "in_progress"]},
                    "reminder_sent": {"$ne": True}
                }):
                    try:
                        booking_dt = datetime.strptime(
                            f"{booking['booking_date']} {booking['booking_time']}", "%Y-%m-%d %H:%M"
                        ).replace(tzinfo=timezone.utc)
                        time_until = (booking_dt - now).total_seconds() / 3600
                        if 0 < time_until <= hours_before:
                            context = await build_sms_context(booking)
                            body = await render_sms_template("job_reminder", context)
                            if body:
                                customer_name = f"{booking.get('customer_first_name', '')} {booking.get('customer_last_name', '')}".strip()
                                await send_sms(
                                    to_phone=booking["customer_phone"], body=body,
                                    customer_name=customer_name, customer_id=booking.get("customer_id"),
                                    booking_id=str(booking["_id"]), template_key="job_reminder"
                                )
                                await db.bookings.update_one(
                                    {"_id": booking["_id"]}, {"$set": {"reminder_sent": True}}
                                )
                    except Exception:
                        pass
        except Exception:
            pass
        await asyncio.sleep(900)

async def review_request_checker_loop():
    while True:
        try:
            sms_settings = await db.settings.find_one({"type": "sms"})
            if sms_settings and sms_settings.get("sms_enabled") and sms_settings.get("review_request_enabled"):
                delay_hours = sms_settings.get("review_delay_hours", 2)
                now = datetime.now(timezone.utc)
                async for scheduled in db.sms_scheduled.find({"template_key": "review_request", "sent": False}):
                    try:
                        created = datetime.fromisoformat(scheduled["created_at"])
                        if created.tzinfo is None:
                            created = created.replace(tzinfo=timezone.utc)
                        send_after = created + timedelta(hours=delay_hours)
                        if now >= send_after:
                            booking = await db.bookings.find_one({"_id": ObjectId(scheduled["booking_id"])})
                            if booking and booking.get("status") == "complete":
                                context = await build_sms_context(booking)
                                body = await render_sms_template("review_request", context)
                                if body:
                                    customer_name = f"{booking.get('customer_first_name', '')} {booking.get('customer_last_name', '')}".strip()
                                    await send_sms(
                                        to_phone=booking["customer_phone"], body=body,
                                        customer_name=customer_name, customer_id=booking.get("customer_id"),
                                        booking_id=scheduled["booking_id"], template_key="review_request"
                                    )
                            await db.sms_scheduled.update_one(
                                {"_id": scheduled["_id"]},
                                {"$set": {"sent": True, "sent_at": now.isoformat()}}
                            )
                    except Exception:
                        pass
        except Exception:
            pass
        await asyncio.sleep(900)

@app.on_event("startup")
async def start_background_tasks():
    asyncio.create_task(reminder_checker_loop())
    asyncio.create_task(review_request_checker_loop())

# ============== Health Check ==============

@app.get("/api/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

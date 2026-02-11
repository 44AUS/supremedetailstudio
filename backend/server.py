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
        service = await db.services.find_one({"_id": ObjectId(service_id)})
        if service:
            duration = service.get("duration_minutes", 60)
    
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
    # Check availability
    availability = await get_availability(booking.booking_date, booking.service_id)
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
    
    booking_dict = booking.model_dump()
    booking_dict["status"] = "pending"
    booking_dict["created_at"] = datetime.now(timezone.utc).isoformat()
    booking_dict["updated_at"] = datetime.now(timezone.utc).isoformat()
    
    result = await db.bookings.insert_one(booking_dict)
    booking_dict["id"] = str(result.inserted_id)
    return booking_dict

@app.put("/api/bookings/{booking_id}/status", dependencies=[Depends(verify_token)])
async def update_booking_status(booking_id: str, status_update: BookingStatusUpdate):
    valid_statuses = ["pending", "in_progress", "complete", "incomplete", "cancelled"]
    if status_update.status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    result = await db.bookings.update_one(
        {"_id": ObjectId(booking_id)},
        {"$set": {
            "status": status_update.status,
            "updated_at": datetime.now(timezone.utc).isoformat()
        }}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking status updated successfully"}

@app.delete("/api/bookings/{booking_id}", dependencies=[Depends(verify_token)])
async def delete_booking(booking_id: str):
    result = await db.bookings.delete_one({"_id": ObjectId(booking_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Booking not found")
    return {"message": "Booking deleted successfully"}

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

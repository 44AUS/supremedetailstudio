"""
NHTSA Vehicle Import Script
Fetches all US vehicle makes/models from 1995-2027 via the NHTSA vPIC API,
classifies them by type (sedan, suv-2row, suv-3row), adds curated trims,
includes aircraft entries, and replaces the vehicles collection in MongoDB.

Usage: python import_vehicles.py
Env vars: MONGO_URL (default: mongodb://localhost:27017), DB_NAME (default: supreme_detail_studio)
"""

import asyncio
import httpx
import os
import sys
import time
from motor.motor_asyncio import AsyncIOMotorClient
from datetime import datetime, timezone

NHTSA_BASE = "https://vpic.nhtsa.dot.gov/api/vehicles"

YEAR_RANGE = range(1995, 2028)

US_MAKES = [
    "Acura", "Alfa Romeo", "Aston Martin", "Audi", "Bentley", "BMW", "Buick",
    "Cadillac", "Chevrolet", "Chrysler", "Dodge", "Ferrari", "Fiat", "Ford",
    "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar", "Jeep", "Kia",
    "Lamborghini", "Land Rover", "Lexus", "Lincoln", "Lotus", "Lucid",
    "Maserati", "Mazda", "McLaren", "Mercedes-Benz", "Mini", "Mitsubishi",
    "Nissan", "Polestar", "Porsche", "RAM", "Rivian", "Rolls-Royce", "Subaru",
    "Tesla", "Toyota", "Volkswagen", "Volvo",
]

# NHTSA vehicle type -> default app vehicle_type
NHTSA_TYPES = {
    "car": "sedan",
    "truck": "suv-2row",
    "multipurpose passenger vehicle (mpv)": "suv-2row",
}

# Models known to be 3-row (overrides suv-2row default for trucks/MPVs)
THREE_ROW_MODELS = {
    # Chevrolet
    "Tahoe", "Suburban", "Traverse",
    # Buick
    "Enclave",
    # Cadillac
    "Escalade", "Escalade ESV", "XT6",
    # Ford
    "Expedition", "Expedition Max", "Explorer", "Flex",
    # GMC
    "Yukon", "Yukon XL", "Acadia",
    # Honda
    "Pilot", "Odyssey",
    # Toyota
    "Highlander", "Grand Highlander", "Sequoia", "Sienna", "Land Cruiser",
    # Hyundai
    "Palisade",
    # Kia
    "Telluride", "Carnival", "Sorento", "Sedona",
    # Volkswagen
    "Atlas", "ID. Buzz",
    # Nissan
    "Pathfinder", "Armada",
    # Infiniti
    "QX80", "QX60", "QX56",
    # Acura
    "MDX",
    # Mazda
    "CX-90", "CX-9",
    # Dodge
    "Durango", "Grand Caravan",
    # Jeep
    "Grand Cherokee L", "Wagoneer", "Grand Wagoneer", "Commander",
    # Mercedes-Benz
    "GLS-Class", "GL-Class", "GLS",
    # BMW
    "X7",
    # Land Rover
    "Range Rover", "Defender 130", "Discovery",
    # Tesla
    "Model X",
    # Subaru
    "Ascent",
    # Volvo
    "XC90",
    # Lincoln
    "Navigator", "Navigator L", "Aviator",
    # Chrysler
    "Pacifica", "Town & Country", "Voyager",
    # Rivian
    "R1S",
    # Lexus
    "LX", "GX", "TX",
    # Mitsubishi
    "Outlander",
}

# Curated performance/notable trims for popular models
TRIM_MAP = {
    ("Dodge", "Charger"): ["SRT", "Hellcat", "Scat Pack", "R/T", "GT", "Daytona"],
    ("Dodge", "Challenger"): ["SRT", "Hellcat", "Scat Pack", "R/T", "GT", "Demon"],
    ("Dodge", "Viper"): ["SRT", "ACR", "GTS"],
    ("Ford", "Mustang"): ["GT", "Shelby GT500", "Shelby GT350", "Mach 1", "EcoBoost", "Bullitt", "Dark Horse"],
    ("Ford", "F-150"): ["Raptor", "Lightning", "Limited", "Platinum", "King Ranch", "Tremor"],
    ("Ford", "Bronco"): ["Raptor", "Wildtrak", "Badlands", "Sasquatch"],
    ("Ford", "Explorer"): ["ST", "Limited", "Platinum", "Timberline"],
    ("Chevrolet", "Camaro"): ["SS", "ZL1", "LT", "RS", "Z/28"],
    ("Chevrolet", "Corvette"): ["Stingray", "Z06", "Z51", "Grand Sport", "ZR1", "E-Ray"],
    ("Chevrolet", "Silverado 1500"): ["Trail Boss", "ZR2", "High Country", "RST", "LT Trail Boss"],
    ("Chevrolet", "Tahoe"): ["Z71", "RST", "High Country"],
    ("GMC", "Sierra 1500"): ["AT4", "AT4X", "Denali", "Denali Ultimate"],
    ("RAM", "1500"): ["TRX", "Laramie", "Limited", "Rebel", "Longhorn"],
    ("RAM", "2500"): ["Power Wagon", "Laramie", "Limited", "Rebel"],
    ("Toyota", "Supra"): ["3.0", "3.0 Premium", "A91"],
    ("Toyota", "Tacoma"): ["TRD Pro", "TRD Off-Road", "TRD Sport", "Trail", "Trailhunter"],
    ("Toyota", "Tundra"): ["TRD Pro", "1794 Edition", "Capstone", "Limited"],
    ("Toyota", "4Runner"): ["TRD Pro", "TRD Off-Road", "Limited", "Trail"],
    ("Toyota", "GR Corolla"): ["Core", "Circuit Edition", "Morizo"],
    ("Toyota", "Land Cruiser"): ["Heritage Edition", "First Edition"],
    ("Jeep", "Wrangler"): ["Rubicon", "Sahara", "Sport", "Willys", "392", "Rubicon 392"],
    ("Jeep", "Grand Cherokee"): ["Trailhawk", "Summit", "Overland", "SRT", "Trackhawk", "Limited"],
    ("Jeep", "Gladiator"): ["Rubicon", "Mojave", "Sport", "Willys"],
    ("Tesla", "Model S"): ["Plaid", "Long Range"],
    ("Tesla", "Model 3"): ["Performance", "Long Range"],
    ("Tesla", "Model Y"): ["Performance", "Long Range"],
    ("Tesla", "Model X"): ["Plaid", "Long Range"],
    ("BMW", "M3"): ["Competition", "CS"],
    ("BMW", "M4"): ["Competition", "CSL", "CS"],
    ("BMW", "M5"): ["Competition", "CS"],
    ("BMW", "M2"): ["Competition"],
    ("BMW", "X5 M"): ["Competition"],
    ("BMW", "X6 M"): ["Competition"],
    ("Mercedes-Benz", "AMG GT"): ["S", "R", "Black Series", "63", "53"],
    ("Mercedes-Benz", "C-Class"): ["AMG C 63", "AMG C 43"],
    ("Mercedes-Benz", "E-Class"): ["AMG E 63 S", "AMG E 53"],
    ("Mercedes-Benz", "G-Class"): ["AMG G 63", "G 550"],
    ("Mercedes-Benz", "S-Class"): ["AMG S 63", "Maybach"],
    ("Porsche", "911"): ["Carrera", "Carrera S", "Turbo", "Turbo S", "GT3", "GT3 RS", "GT2 RS", "Targa"],
    ("Porsche", "Cayenne"): ["S", "GTS", "Turbo", "Turbo GT"],
    ("Porsche", "Macan"): ["S", "GTS", "Turbo"],
    ("Porsche", "Panamera"): ["GTS", "Turbo", "Turbo S"],
    ("Porsche", "Taycan"): ["4S", "GTS", "Turbo", "Turbo S"],
    ("Audi", "RS 3"): ["Performance"],
    ("Audi", "RS 5"): ["Sportback"],
    ("Audi", "RS 6"): ["Avant"],
    ("Audi", "RS 7"): ["Performance"],
    ("Audi", "R8"): ["V10", "V10 Performance"],
    ("Nissan", "GT-R"): ["NISMO", "Premium", "Track Edition"],
    ("Nissan", "Z"): ["Sport", "Performance", "NISMO"],
    ("Nissan", "370Z"): ["NISMO", "Sport", "Touring"],
    ("Subaru", "WRX"): ["STI", "Premium", "Limited"],
    ("Subaru", "BRZ"): ["Premium", "Limited", "tS"],
    ("Honda", "Civic"): ["Type R", "Si", "Sport"],
    ("Honda", "Accord"): ["Sport", "Touring"],
    ("Hyundai", "Elantra N"): ["DCT"],
    ("Hyundai", "Veloster N"): ["DCT"],
    ("Kia", "Stinger"): ["GT", "GT1", "GT2"],
    ("Lexus", "IS"): ["F Sport", "500"],
    ("Lexus", "RC"): ["F", "F Sport"],
    ("Lexus", "LC"): ["500", "500h"],
    ("Lexus", "LFA"): [],
    ("Cadillac", "CT5-V"): ["Blackwing"],
    ("Cadillac", "CT4-V"): ["Blackwing"],
    ("Cadillac", "Escalade"): ["V", "Sport", "Premium Luxury"],
    ("Rivian", "R1T"): ["Adventure", "Explore"],
    ("Rivian", "R1S"): ["Adventure", "Explore"],
    ("Lucid", "Air"): ["Dream Edition", "Grand Touring", "Pure"],
    ("Lamborghini", "Huracan"): ["Performante", "STO", "Tecnica", "EVO"],
    ("Lamborghini", "Aventador"): ["SVJ", "S", "Ultimae"],
    ("Lamborghini", "Urus"): ["Performante", "S"],
    ("Ferrari", "488"): ["Pista", "Spider"],
    ("Ferrari", "F8"): ["Tributo", "Spider"],
    ("Ferrari", "296"): ["GTB", "GTS"],
    ("Ferrari", "SF90"): ["Stradale", "Spider"],
    ("McLaren", "720S"): ["Spider"],
    ("McLaren", "765LT"): ["Spider"],
    ("McLaren", "750S"): ["Spider"],
    ("Maserati", "MC20"): ["Cielo"],
    ("Maserati", "Ghibli"): ["Trofeo"],
    ("Maserati", "Levante"): ["Trofeo", "GTS"],
    ("Rolls-Royce", "Ghost"): ["Black Badge", "Extended"],
    ("Rolls-Royce", "Wraith"): ["Black Badge"],
    ("Rolls-Royce", "Cullinan"): ["Black Badge"],
    ("Bentley", "Continental GT"): ["Speed", "S", "Mulliner"],
    ("Bentley", "Bentayga"): ["Speed", "S", "EWB"],
    ("Aston Martin", "Vantage"): ["AMR", "F1 Edition"],
    ("Aston Martin", "DB11"): ["AMR", "V8"],
    ("Aston Martin", "DBS"): ["Superleggera"],
}

AIRCRAFT = [
    # Single-engine piston
    {"make": "Cessna", "model": "172 Skyhawk", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Cessna", "model": "182 Skylane", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Cessna", "model": "206 Stationair", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Piper", "model": "Cherokee", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Piper", "model": "Archer", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Piper", "model": "Seneca", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Cirrus", "model": "SR20", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Cirrus", "model": "SR22", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Cirrus", "model": "SR22T", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Beechcraft", "model": "Bonanza G36", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Beechcraft", "model": "Baron G58", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Mooney", "model": "M20 Acclaim", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Diamond", "model": "DA40", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Diamond", "model": "DA62", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    # Turboprops
    {"make": "Pilatus", "model": "PC-12 NGX", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Beechcraft", "model": "King Air 260", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Beechcraft", "model": "King Air 360", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Daher", "model": "TBM 960", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Piper", "model": "M600/SLS", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    # Light jets
    {"make": "Cirrus", "model": "Vision Jet SF50", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Cessna", "model": "Citation CJ3+", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Cessna", "model": "Citation CJ4", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Cessna", "model": "Citation M2 Gen2", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Cessna", "model": "Citation Latitude", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Cessna", "model": "Citation Longitude", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Embraer", "model": "Phenom 100EX", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Embraer", "model": "Phenom 300E", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Honda", "model": "HondaJet Elite II", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    # Mid-size jets
    {"make": "Bombardier", "model": "Challenger 350", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Bombardier", "model": "Challenger 3500", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Cessna", "model": "Citation Sovereign+", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Gulfstream", "model": "G280", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Dassault", "model": "Falcon 2000S", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    # Large / long-range jets
    {"make": "Gulfstream", "model": "G650", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Gulfstream", "model": "G700", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Gulfstream", "model": "G500", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Gulfstream", "model": "G600", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Bombardier", "model": "Global 7500", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Bombardier", "model": "Global 6500", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Dassault", "model": "Falcon 8X", "year": "2024", "vehicle_type": "aircraft", "trim": None},
    {"make": "Dassault", "model": "Falcon 6X", "year": "2024", "vehicle_type": "aircraft", "trim": None},
]

# Semaphore for concurrent requests
MAX_CONCURRENT = 3
RATE_LIMIT_DELAY = 0.2  # 200ms between requests


async def fetch_models(client: httpx.AsyncClient, make: str, year: int, nhtsa_type: str, semaphore: asyncio.Semaphore):
    """Fetch models from NHTSA API for a given make/year/vehicle type."""
    url = f"{NHTSA_BASE}/GetModelsForMakeYear/make/{make}/modelyear/{year}/vehicletype/{nhtsa_type}?format=json"
    async with semaphore:
        for attempt in range(3):
            try:
                await asyncio.sleep(RATE_LIMIT_DELAY)
                resp = await client.get(url, timeout=30.0)
                if resp.status_code == 200:
                    data = resp.json()
                    return data.get("Results", [])
                elif resp.status_code == 403:
                    await asyncio.sleep(2.0 * (attempt + 1))
                    continue
            except Exception:
                await asyncio.sleep(1.0)
    return []


def classify_vehicle_type(nhtsa_type: str, model_name: str) -> str:
    """Determine sedan/suv-2row/suv-3row from NHTSA type and model name."""
    if nhtsa_type == "car":
        return "sedan"
    if model_name in THREE_ROW_MODELS:
        return "suv-3row"
    return "suv-2row"


async def main():
    MONGO_URL = os.environ.get("MONGO_URL", "mongodb://localhost:27017")
    DB_NAME = os.environ.get("DB_NAME", "supreme_detail_studio")

    # Support --only flag to import specific makes without wiping DB
    only_makes = None
    if "--only" in sys.argv:
        idx = sys.argv.index("--only")
        only_makes = [m.strip() for m in sys.argv[idx + 1].split(",")]

    makes_to_import = only_makes if only_makes else US_MAKES

    mongo_client = AsyncIOMotorClient(MONGO_URL)
    db = mongo_client[DB_NAME]

    all_vehicles = []
    seen = set()
    semaphore = asyncio.Semaphore(MAX_CONCURRENT)
    start_time = time.time()

    print(f"Starting NHTSA vehicle import ({len(makes_to_import)} makes, {YEAR_RANGE.start}-{YEAR_RANGE.stop - 1})")
    if only_makes:
        print(f"Only importing: {', '.join(only_makes)}")
    print(f"MongoDB: {MONGO_URL} / {DB_NAME}")
    print("=" * 60)

    async with httpx.AsyncClient() as client:
        for i, make in enumerate(makes_to_import):
            make_count = 0
            sys.stdout.write(f"\r[{i+1}/{len(makes_to_import)}] {make}...")
            sys.stdout.flush()

            # Process all years for this make concurrently in batches
            tasks = []
            for year in YEAR_RANGE:
                for nhtsa_type in NHTSA_TYPES.keys():
                    tasks.append((year, nhtsa_type, fetch_models(client, make, year, nhtsa_type, semaphore)))

            # Run in batches to avoid overwhelming
            batch_size = 15
            for batch_start in range(0, len(tasks), batch_size):
                batch = tasks[batch_start:batch_start + batch_size]
                results = await asyncio.gather(*[t[2] for t in batch])

                for idx, result_list in enumerate(results):
                    year = batch[idx][0]
                    nhtsa_type = batch[idx][1]
                    for result in result_list:
                        model_name = result.get("Model_Name", "").strip()
                        if not model_name:
                            continue

                        vtype = classify_vehicle_type(nhtsa_type, model_name)

                        # Base entry (no trim)
                        key = (str(year), make, model_name, None)
                        if key not in seen:
                            seen.add(key)
                            all_vehicles.append({
                                "year": str(year),
                                "make": make,
                                "model": model_name,
                                "trim": None,
                                "vehicle_type": vtype,
                                "is_active": True,
                                "created_at": datetime.now(timezone.utc).isoformat()
                            })
                            make_count += 1

                        # Add curated trims
                        trims = TRIM_MAP.get((make, model_name), [])
                        for trim in trims:
                            tkey = (str(year), make, model_name, trim)
                            if tkey not in seen:
                                seen.add(tkey)
                                all_vehicles.append({
                                    "year": str(year),
                                    "make": make,
                                    "model": model_name,
                                    "trim": trim,
                                    "vehicle_type": vtype,
                                    "is_active": True,
                                    "created_at": datetime.now(timezone.utc).isoformat()
                                })
                                make_count += 1

                await asyncio.sleep(RATE_LIMIT_DELAY)

            sys.stdout.write(f"\r[{i+1}/{len(makes_to_import)}] {make}: {make_count} vehicles\n")

    # Add aircraft
    for aircraft in AIRCRAFT:
        aircraft["is_active"] = True
        aircraft["created_at"] = datetime.now(timezone.utc).isoformat()
        all_vehicles.append(aircraft)

    elapsed = time.time() - start_time
    print("=" * 60)
    print(f"Fetched {len(all_vehicles)} total vehicles in {elapsed:.1f}s")

    # Replace vehicles in DB
    if only_makes:
        print(f"Deleting existing vehicles for: {', '.join(only_makes)}...")
        await db.vehicles.delete_many({"make": {"$in": only_makes}})
    else:
        print("Deleting existing vehicles...")
        await db.vehicles.delete_many({})

    # Insert in batches of 500
    print("Inserting new vehicles...")
    batch_size = 500
    for i in range(0, len(all_vehicles), batch_size):
        batch = all_vehicles[i:i + batch_size]
        await db.vehicles.insert_many(batch)
        sys.stdout.write(f"\r  Inserted {min(i + batch_size, len(all_vehicles))}/{len(all_vehicles)} vehicles")
        sys.stdout.flush()
    print()

    # Create indexes
    print("Creating indexes...")
    await db.vehicles.create_index([("make", 1), ("model", 1), ("year", -1)])
    await db.vehicles.create_index([("make", 1)])
    await db.vehicles.create_index([("is_active", 1)])
    await db.vehicles.create_index([("vehicle_type", 1)])

    print(f"Done! {len(all_vehicles)} vehicles imported successfully.")
    mongo_client.close()


if __name__ == "__main__":
    asyncio.run(main())

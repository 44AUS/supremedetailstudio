#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class SupremeDetailAPITester:
    def __init__(self, base_url="https://friendly-ellis-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.admin_username = "admin"
        self.admin_password = "supremeadmin123"

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        if headers:
            test_headers.update(headers)
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'

        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers, timeout=10)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=test_headers, timeout=10)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    if isinstance(response_data, dict) and len(response_data) < 10:
                        print(f"   Response: {json.dumps(response_data, indent=2)}")
                except:
                    pass
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                try:
                    error_data = response.json()
                    print(f"   Error: {error_data}")
                except:
                    print(f"   Response text: {response.text[:200]}")

            return success, response.json() if response.headers.get('content-type', '').startswith('application/json') else {}

        except requests.exceptions.Timeout:
            print(f"❌ Failed - Request timeout")
            return False, {}
        except requests.exceptions.ConnectionError:
            print(f"❌ Failed - Connection error")
            return False, {}
        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test API health endpoint"""
        success, response = self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )
        return success

    def test_admin_login(self):
        """Test admin login and get token"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "api/auth/login",
            200,
            data={"username": self.admin_username, "password": self.admin_password}
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            print(f"   Token obtained: {self.token[:20]}...")
            return True
        return False

    def test_auth_verify(self):
        """Test token verification"""
        if not self.token:
            print("❌ No token available for verification")
            return False
        
        success, response = self.run_test(
            "Auth Verification",
            "GET",
            "api/auth/verify",
            200
        )
        return success

    def test_dashboard_stats(self):
        """Test dashboard stats endpoint"""
        if not self.token:
            print("❌ No token available for dashboard stats")
            return False
            
        success, response = self.run_test(
            "Dashboard Stats",
            "GET",
            "api/dashboard/stats",
            200
        )
        return success

    def test_services_crud(self):
        """Test services CRUD operations"""
        if not self.token:
            print("❌ No token available for services CRUD")
            return False

        # Get services
        success, services = self.run_test(
            "Get Services",
            "GET",
            "api/services",
            200
        )
        if not success:
            return False

        # Create a test service
        test_service = {
            "name": "Test Interior Detail",
            "category": "interior",
            "description": "Test service for API testing",
            "base_price": 150.0,
            "vehicle_pricing": {
                "sedan": 150.0,
                "suv_2row": 200.0,
                "suv_3row": 250.0
            },
            "duration_minutes": 120,
            "is_active": True,
            "shop_available": True,
            "mobile_available": True
        }

        success, created_service = self.run_test(
            "Create Service",
            "POST",
            "api/services",
            200,
            data=test_service
        )
        
        if not success:
            return False

        service_id = created_service.get('id')
        if not service_id:
            print("❌ No service ID returned from creation")
            return False

        # Update the service
        update_data = {
            "name": "Updated Test Interior Detail",
            "base_price": 175.0
        }

        success, _ = self.run_test(
            "Update Service",
            "PUT",
            f"api/services/{service_id}",
            200,
            data=update_data
        )

        if not success:
            return False

        # Get specific service
        success, _ = self.run_test(
            "Get Specific Service",
            "GET",
            f"api/services/{service_id}",
            200
        )

        if not success:
            return False

        # Delete the service
        success, _ = self.run_test(
            "Delete Service",
            "DELETE",
            f"api/services/{service_id}",
            200
        )

        return success

    def test_utilities_functionality(self):
        """Test utilities-specific functionality"""
        print("\n🔧 Testing Utilities Functionality...")
        
        if not self.token:
            print("❌ No token available for utilities testing")
            return False
        
        # Test creating service with requires_utilities=False
        no_utilities_service = {
            "name": "No Utilities Test Service",
            "category": "interior",
            "description": "Service that doesn't require utilities",
            "base_price": 100,
            "vehicle_pricing": {"sedan": 100, "suv_2row": 150, "suv_3row": 200},
            "duration_minutes": 60,
            "is_active": True,
            "shop_available": True,
            "mobile_available": True,
            "requires_utilities": False,  # Key test: service doesn't require utilities
            "image_url": "",
            "applies_to_categories": []
        }
        
        success, response = self.run_test(
            "Create Service (No Utilities Required)",
            "POST",
            "api/services",
            200,
            data=no_utilities_service
        )
        
        if not success:
            return False
            
        service_id = response.get('id')
        print(f"   Created no-utilities service ID: {service_id}")
        
        # Verify the service was created correctly
        success, service_data = self.run_test(
            "Get No-Utilities Service",
            "GET",
            f"api/services/{service_id}",
            200
        )
        
        if success:
            requires_utilities = service_data.get('requires_utilities')
            if requires_utilities == False:
                print("   ✅ Service correctly created with requires_utilities=False")
            else:
                print(f"   ❌ Service has wrong requires_utilities value: {requires_utilities}")
                
        # Test creating shop-only service
        shop_only_service = {
            "name": "Shop Only Test Service",
            "category": "protection",
            "description": "Service only available in shop",
            "base_price": 500,
            "vehicle_pricing": {"sedan": 500, "suv_2row": 600, "suv_3row": 700},
            "duration_minutes": 180,
            "is_active": True,
            "shop_available": True,
            "mobile_available": False,  # Shop only
            "requires_utilities": True,
            "image_url": "",
            "applies_to_categories": []
        }
        
        success2, response2 = self.run_test(
            "Create Service (Shop Only)",
            "POST",
            "api/services",
            200,
            data=shop_only_service
        )
        
        if success2:
            shop_service_id = response2.get('id')
            print(f"   Created shop-only service ID: {shop_service_id}")
            
            # Clean up both test services
            self.run_test("Delete No-Utilities Service", "DELETE", f"api/services/{service_id}", 200)
            self.run_test("Delete Shop-Only Service", "DELETE", f"api/services/{shop_service_id}", 200)
            
        return success and success2

    def test_schedule_operations(self):
        """Test schedule management"""
        if not self.token:
            print("❌ No token available for schedule operations")
            return False

        # Get current schedule
        success, schedule = self.run_test(
            "Get Schedule",
            "GET",
            "api/schedule",
            200
        )
        
        if not success:
            return False

        # Update schedule
        test_schedule = {
            "business_hours": [
                {"day": "monday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
                {"day": "tuesday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
                {"day": "wednesday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
                {"day": "thursday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
                {"day": "friday", "is_open": True, "open_time": "09:00", "close_time": "18:00"},
                {"day": "saturday", "is_open": True, "open_time": "10:00", "close_time": "16:00"},
                {"day": "sunday", "is_open": False, "open_time": "09:00", "close_time": "18:00"}
            ],
            "closed_dates": [
                {"date": "2024-12-25", "reason": "Christmas Day"},
                {"date": "2024-01-01", "reason": "New Year's Day"}
            ]
        }

        success, _ = self.run_test(
            "Update Schedule",
            "PUT",
            "api/schedule",
            200,
            data=test_schedule
        )

        return success

    def test_availability(self):
        """Test availability endpoint"""
        # Test availability for a future date
        test_date = "2024-12-20"
        success, availability = self.run_test(
            "Get Availability",
            "GET",
            f"api/availability/{test_date}",
            200
        )
        return success

    def test_bookings_operations(self):
        """Test bookings management"""
        if not self.token:
            print("❌ No token available for bookings operations")
            return False

        # Get bookings
        success, bookings = self.run_test(
            "Get Bookings",
            "GET",
            "api/bookings",
            200
        )
        
        if not success:
            return False

        # Create a test booking (public endpoint)
        test_booking = {
            "customer_first_name": "Test",
            "customer_last_name": "Customer",
            "customer_phone": "(555) 123-4567",
            "customer_email": "test@example.com",
            "customer_address": "123 Test St, Marietta, GA 30060",
            "service_location": "shop",
            "vehicle_year": "2020",
            "vehicle_make": "Toyota",
            "vehicle_model": "Camry",
            "vehicle_type": "sedan",
            "vehicle_color": "White",
            "service_id": "test-service",
            "service_name": "Test Interior Detail",
            "booking_date": "2024-12-20",
            "booking_time": "09:00",  # Use 09:00 which should be available
            "total_price": 150.0,
            "notes": "Test booking for API testing"
        }

        # Remove token for public booking creation
        temp_token = self.token
        self.token = None
        
        success, created_booking = self.run_test(
            "Create Booking (Public)",
            "POST",
            "api/bookings",
            200,
            data=test_booking
        )
        
        # Restore token
        self.token = temp_token
        
        if not success:
            return False

        booking_id = created_booking.get('id')
        if not booking_id:
            print("❌ No booking ID returned from creation")
            return False

        # Update booking status (admin only)
        success, _ = self.run_test(
            "Update Booking Status",
            "PUT",
            f"api/bookings/{booking_id}/status",
            200,
            data={"status": "in_progress"}
        )

        if not success:
            return False

        # Get specific booking
        success, _ = self.run_test(
            "Get Specific Booking",
            "GET",
            f"api/bookings/{booking_id}",
            200
        )

        return success

    def test_customers_crud(self):
        """Test customer management operations"""
        if not self.token:
            print("❌ No token available for customer operations")
            return False

        # Get customers (should work even if empty)
        success, customers = self.run_test(
            "Get Customers",
            "GET",
            "api/customers",
            200
        )
        
        if not success:
            return False

        # Create a test customer
        test_customer = {
            "first_name": "John",
            "last_name": "Doe",
            "email": "john.doe@example.com",
            "phone": "(555) 123-4567",
            "address": "123 Main St, Marietta, GA 30060",
            "notes": "Test customer for API testing",
            "tags": ["VIP", "Test"]
        }

        success, created_customer = self.run_test(
            "Create Customer",
            "POST",
            "api/customers",
            200,
            data=test_customer
        )
        
        if not success:
            return False

        customer_id = created_customer.get('id')
        if not customer_id:
            print("❌ No customer ID returned from creation")
            return False

        # Get specific customer
        success, customer_details = self.run_test(
            "Get Specific Customer",
            "GET",
            f"api/customers/{customer_id}",
            200
        )

        if not success:
            return False

        # Update the customer
        update_data = {
            "first_name": "Jane",
            "notes": "Updated test customer",
            "tags": ["VIP", "Updated"]
        }

        success, _ = self.run_test(
            "Update Customer",
            "PUT",
            f"api/customers/{customer_id}",
            200,
            data=update_data
        )

        if not success:
            return False

        # Test customer search
        success, search_results = self.run_test(
            "Search Customers by Email",
            "GET",
            "api/customers?search=john.doe@example.com",
            200
        )

        if not success:
            return False

        # Get customer bookings (should be empty for new customer)
        success, customer_bookings = self.run_test(
            "Get Customer Bookings",
            "GET",
            f"api/customers/{customer_id}/bookings",
            200
        )

        if not success:
            return False

        # Test CSV export
        success, _ = self.run_test(
            "Export Customers CSV",
            "GET",
            "api/customers/export/csv",
            200
        )

        if not success:
            return False

        # Test CSV import
        csv_data = "First Name,Last Name,Email,Phone,Address,Notes,Tags\nBob,Smith,bob@example.com,(555) 987-6543,456 Oak St,Imported customer,Regular"
        
        success, import_result = self.run_test(
            "Import Customers CSV",
            "POST",
            "api/customers/import",
            200,
            data={"csv_data": csv_data}
        )

        if not success:
            return False

        # Delete the test customer
        success, _ = self.run_test(
            "Delete Customer",
            "DELETE",
            f"api/customers/{customer_id}",
            200
        )

        return success

    def test_categories_crud(self):
        """Test category management operations"""
        if not self.token:
            print("❌ No token available for category operations")
            return False

        # Get categories (should return default categories if none exist)
        success, categories = self.run_test(
            "Get Categories",
            "GET",
            "api/categories",
            200
        )
        
        if not success:
            return False

        print(f"   Found {len(categories)} existing categories")

        # Create a test category with unique name
        import time
        timestamp = int(time.time())
        test_category = {
            "name": f"test_category_{timestamp}",
            "label": "Test Category",
            "description": "Test category for API testing",
            "sort_order": 99
        }

        success, created_category = self.run_test(
            "Create Category",
            "POST",
            "api/categories",
            200,
            data=test_category
        )
        
        if not success:
            return False

        category_id = created_category.get('id')
        if not category_id:
            print("❌ No category ID returned from creation")
            return False

        # Update the category
        update_data = {
            "label": "Updated Test Category",
            "description": "Updated test category description",
            "sort_order": 100
        }

        success, _ = self.run_test(
            "Update Category",
            "PUT",
            f"api/categories/{category_id}",
            200,
            data=update_data
        )

        if not success:
            return False

        # Get categories again to verify update
        success, updated_categories = self.run_test(
            "Get Categories After Update",
            "GET",
            "api/categories",
            200
        )

        if not success:
            return False

        # Find our updated category
        updated_category = None
        for cat in updated_categories:
            if cat.get('id') == category_id:
                updated_category = cat
                break

        if not updated_category:
            print("❌ Updated category not found in categories list")
            return False

        if updated_category.get('label') != 'Updated Test Category':
            print("❌ Category update not reflected")
            return False

        # Test creating a service with the new category
        test_service = {
            "name": "Test Service with Custom Category",
            "category": f"test_category_{timestamp}",
            "description": "Service using custom category",
            "base_price": 100.0,
            "duration_minutes": 60,
            "is_active": True,
            "shop_available": True,
            "mobile_available": True
        }

        success, created_service = self.run_test(
            "Create Service with Custom Category",
            "POST",
            "api/services",
            200,
            data=test_service
        )
        
        if not success:
            return False

        service_id = created_service.get('id')

        # Try to delete category while service uses it (should fail)
        success, _ = self.run_test(
            "Delete Category with Services (Should Fail)",
            "DELETE",
            f"api/categories/{category_id}",
            400  # Should return 400 error
        )

        # For this test, success means we got the expected 400 status
        if success:
            print("✅ Category deletion correctly prevented when services use it")
        else:
            print("❌ Category deletion should have failed when services use it")
            return False

        # Delete the service first
        if service_id:
            success, _ = self.run_test(
                "Delete Service Using Custom Category",
                "DELETE",
                f"api/services/{service_id}",
                200
            )
            if not success:
                return False

        # Now delete the category (should succeed)
        success, _ = self.run_test(
            "Delete Category After Removing Services",
            "DELETE",
            f"api/categories/{category_id}",
            200
        )

        return success

    def test_auto_customer_creation(self):
        """Test auto-customer creation when booking is made"""
        # Create a booking with new customer info
        test_booking = {
            "customer_first_name": "Auto",
            "customer_last_name": "Created",
            "customer_phone": "(555) 999-8888",
            "customer_email": "auto.created@example.com",
            "customer_address": "789 Auto St, Marietta, GA 30060",
            "service_location": "shop",
            "vehicle_year": "2021",
            "vehicle_make": "Honda",
            "vehicle_model": "Civic",
            "vehicle_type": "sedan",
            "vehicle_color": "Blue",
            "service_id": "auto-test-service",
            "service_name": "Auto Test Detail",
            "booking_date": "2024-12-21",
            "booking_time": "12:00",  # Use 12:00 which should be available
            "total_price": 200.0,
            "notes": "Test auto customer creation"
        }

        # Remove token for public booking creation
        temp_token = self.token
        self.token = None
        
        success, created_booking = self.run_test(
            "Create Booking (Auto Customer)",
            "POST",
            "api/bookings",
            200,
            data=test_booking
        )
        
        # Restore token
        self.token = temp_token
        
        if not success:
            return False

        customer_id = created_booking.get('customer_id')
        if not customer_id:
            print("❌ No customer_id returned from booking creation")
            return False

        # Verify customer was auto-created
        success, auto_customer = self.run_test(
            "Verify Auto-Created Customer",
            "GET",
            f"api/customers/{customer_id}",
            200
        )

        if not success:
            return False

        # Verify customer details match booking
        if (auto_customer.get('first_name') != 'Auto' or 
            auto_customer.get('last_name') != 'Created' or
            auto_customer.get('email') != 'auto.created@example.com'):
            print("❌ Auto-created customer details don't match booking")
            return False

        print("✅ Auto-customer creation verified")
        return True

def main():
    print("🚀 Starting Supreme Detail Studio API Tests")
    print("=" * 50)
    
    tester = SupremeDetailAPITester()
    
    # Test sequence
    tests = [
        ("Health Check", tester.test_health_check),
        ("Admin Login", tester.test_admin_login),
        ("Auth Verification", tester.test_auth_verify),
        ("Dashboard Stats", tester.test_dashboard_stats),
        ("Categories CRUD", tester.test_categories_crud),
        ("Services CRUD", tester.test_services_crud),
        ("Utilities Functionality", tester.test_utilities_functionality),
        ("Schedule Operations", tester.test_schedule_operations),
        ("Availability Check", tester.test_availability),
        ("Bookings Operations", tester.test_bookings_operations),
        ("Customer CRUD Operations", tester.test_customers_crud),
        ("Auto Customer Creation", tester.test_auto_customer_creation),
    ]
    
    failed_tests = []
    
    for test_name, test_func in tests:
        print(f"\n{'='*20} {test_name} {'='*20}")
        try:
            if not test_func():
                failed_tests.append(test_name)
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {str(e)}")
            failed_tests.append(test_name)
    
    # Print final results
    print(f"\n{'='*50}")
    print(f"📊 FINAL RESULTS")
    print(f"{'='*50}")
    print(f"Tests passed: {tester.tests_passed}/{tester.tests_run}")
    print(f"Success rate: {(tester.tests_passed/tester.tests_run)*100:.1f}%")
    
    if failed_tests:
        print(f"\n❌ Failed tests: {', '.join(failed_tests)}")
        return 1
    else:
        print(f"\n✅ All tests passed!")
        return 0

if __name__ == "__main__":
    sys.exit(main())
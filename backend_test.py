import requests
import sys
from datetime import datetime, timedelta
import json

class BookingSystemTester:
    def __init__(self, base_url="https://friendly-ellis-1.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name}")
        else:
            print(f"❌ {name} - {details}")
        
        self.test_results.append({
            "test": name,
            "success": success,
            "details": details
        })

    def run_test(self, name, method, endpoint, expected_status, data=None, headers=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        test_headers = {'Content-Type': 'application/json'}
        if self.token:
            test_headers['Authorization'] = f'Bearer {self.token}'
        if headers:
            test_headers.update(headers)

        try:
            if method == 'GET':
                response = requests.get(url, headers=test_headers)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=test_headers)
            elif method == 'PUT':
                response = requests.put(url, json=data, headers=test_headers)

            success = response.status_code == expected_status
            response_data = {}
            try:
                response_data = response.json()
            except:
                pass

            details = f"Status: {response.status_code}"
            if not success:
                details += f", Expected: {expected_status}"
                if response_data.get('detail'):
                    details += f", Error: {response_data['detail']}"

            self.log_test(name, success, details)
            return success, response_data

        except Exception as e:
            self.log_test(name, False, f"Exception: {str(e)}")
            return False, {}

    def test_admin_login(self):
        """Test admin login"""
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "api/auth/login",
            200,
            data={"username": "admin", "password": "supremeadmin123"}
        )
        if success and 'access_token' in response:
            self.token = response['access_token']
            return True
        return False

    def test_business_settings_buffer_time(self):
        """Test business settings has buffer time field"""
        success, response = self.run_test(
            "Business Settings - Get Buffer Time",
            "GET",
            "api/settings/business",
            200
        )
        
        if success:
            has_buffer_field = 'booking_buffer_minutes' in response
            buffer_value = response.get('booking_buffer_minutes', 0)
            
            if has_buffer_field and isinstance(buffer_value, (int, float)):
                self.log_test("Buffer Time Field Present", True, f"Value: {buffer_value} minutes")
                return True
            else:
                self.log_test("Buffer Time Field Present", False, "Field missing or invalid type")
                return False
        return False

    def test_update_buffer_time(self):
        """Test updating buffer time in business settings"""
        if not self.token:
            self.log_test("Update Buffer Time", False, "No admin token")
            return False

        # Update buffer time to 90 minutes
        success, response = self.run_test(
            "Update Buffer Time",
            "PUT",
            "api/settings/business",
            200,
            data={
                "booking_buffer_minutes": 90,
                "shop_name": "Supreme Detail Studio",
                "enable_shop_bookings": True,
                "enable_mobile_bookings": True
            }
        )
        
        if success:
            # Verify the update
            verify_success, verify_response = self.run_test(
                "Verify Buffer Time Update",
                "GET",
                "api/settings/business",
                200
            )
            
            if verify_success and verify_response.get('booking_buffer_minutes') == 90:
                self.log_test("Buffer Time Update Verified", True, "Successfully updated to 90 minutes")
                return True
            else:
                self.log_test("Buffer Time Update Verified", False, "Update not reflected")
                return False
        return False

    def test_availability_api_buffer_response(self):
        """Test availability API returns buffer_minutes and available_minutes"""
        # Get tomorrow's date
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        
        success, response = self.run_test(
            "Availability API - Buffer Response",
            "GET",
            f"api/availability/{tomorrow}",
            200
        )
        
        if success:
            has_buffer_minutes = 'buffer_minutes' in response
            has_slots = 'slots' in response and len(response['slots']) > 0
            
            if has_buffer_minutes and has_slots:
                # Check if slots have available_minutes
                first_slot = response['slots'][0]
                has_available_minutes = 'available_minutes' in first_slot
                
                if has_available_minutes:
                    buffer_val = response.get('buffer_minutes', 0)
                    available_val = first_slot.get('available_minutes', 0)
                    self.log_test("Availability Response Format", True, 
                                f"Buffer: {buffer_val}min, Available: {available_val}min")
                    return True
                else:
                    self.log_test("Availability Response Format", False, "Slots missing available_minutes")
            else:
                self.log_test("Availability Response Format", False, "Missing buffer_minutes or slots")
        return False

    def test_availability_with_duration(self):
        """Test availability API with total_duration parameter"""
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        
        success, response = self.run_test(
            "Availability API - With Duration",
            "GET",
            f"api/availability/{tomorrow}?total_duration=120",
            200
        )
        
        if success and 'slots' in response:
            self.log_test("Availability With Duration", True, f"Returned {len(response['slots'])} slots")
            return True
        else:
            self.log_test("Availability With Duration", False, "Failed to get slots with duration")
            return False

    def test_services_api(self):
        """Test services API for active services"""
        success, response = self.run_test(
            "Services API - Active Only",
            "GET",
            "api/services?active_only=true",
            200
        )
        
        if success and isinstance(response, list):
            service_count = len(response)
            has_duration = any('duration_minutes' in service for service in response)
            self.log_test("Services API Response", True, f"Found {service_count} services, has duration: {has_duration}")
            return True
        else:
            self.log_test("Services API Response", False, "Invalid response format")
            return False

    def test_booking_creation_with_time_constraint(self):
        """Test creating a booking and verify time constraints work"""
        if not self.token:
            self.log_test("Booking Creation Test", False, "No admin token")
            return False

        # Create a test booking for tomorrow
        tomorrow = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")
        
        booking_data = {
            "customer_first_name": "Test",
            "customer_last_name": "Customer",
            "customer_phone": "555-0123",
            "customer_email": "test@example.com",
            "customer_address": "123 Test St",
            "service_location": "shop",
            "vehicle_year": "2020",
            "vehicle_make": "Toyota",
            "vehicle_model": "Camry",
            "vehicle_type": "sedan",
            "service_id": "test_service",
            "service_name": "Test Service",
            "booking_date": tomorrow,
            "booking_time": "10:00",
            "total_price": 150.0,
            "total_duration": 120
        }
        
        success, response = self.run_test(
            "Create Test Booking",
            "POST",
            "api/bookings",
            200,
            data=booking_data
        )
        
        if success and 'id' in response:
            booking_id = response['id']
            self.log_test("Booking Creation", True, f"Created booking {booking_id}")
            
            # Now test availability again to see if time slot is blocked
            avail_success, avail_response = self.run_test(
                "Check Availability After Booking",
                "GET",
                f"api/availability/{tomorrow}",
                200
            )
            
            if avail_success and 'slots' in avail_response:
                # Find the 10:00 AM slot
                slot_10am = None
                for slot in avail_response['slots']:
                    if slot['time'] == '10:00':
                        slot_10am = slot
                        break
                
                if slot_10am:
                    is_available = slot_10am.get('available', True)
                    available_minutes = slot_10am.get('available_minutes', 0)
                    
                    # The slot should either be unavailable or have reduced available minutes
                    if not is_available or available_minutes < 540:  # 540 = 9 hours in minutes
                        self.log_test("Time Constraint Working", True, 
                                    f"Slot available: {is_available}, minutes: {available_minutes}")
                        return True
                    else:
                        self.log_test("Time Constraint Working", False, 
                                    f"Slot still fully available: {available_minutes} minutes")
                else:
                    self.log_test("Time Constraint Working", False, "Could not find 10:00 AM slot")
            else:
                self.log_test("Time Constraint Working", False, "Could not check availability")
        else:
            self.log_test("Booking Creation", False, "Failed to create booking")
        
        return False

    def run_all_tests(self):
        """Run all booking system tests"""
        print("🔍 Testing Booking System Features...")
        print("=" * 50)
        
        # Test 1: Admin Login
        if not self.test_admin_login():
            print("❌ Cannot proceed without admin access")
            return False
        
        # Test 2: Business Settings Buffer Time
        self.test_business_settings_buffer_time()
        
        # Test 3: Update Buffer Time
        self.test_update_buffer_time()
        
        # Test 4: Availability API Response Format
        self.test_availability_api_buffer_response()
        
        # Test 5: Availability with Duration
        self.test_availability_with_duration()
        
        # Test 6: Services API
        self.test_services_api()
        
        # Test 7: Booking Creation and Time Constraints
        self.test_booking_creation_with_time_constraint()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Results: {self.tests_passed}/{self.tests_run} passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return True
        else:
            print("⚠️  Some tests failed. Check details above.")
            return False

def main():
    tester = BookingSystemTester()
    success = tester.run_all_tests()
    
    # Save detailed results
    results = {
        "timestamp": datetime.now().isoformat(),
        "total_tests": tester.tests_run,
        "passed_tests": tester.tests_passed,
        "success_rate": (tester.tests_passed / tester.tests_run * 100) if tester.tests_run > 0 else 0,
        "test_details": tester.test_results
    }
    
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())
#!/usr/bin/env python3

import requests
import sys
import json

class BusinessSettingsAPITester:
    def __init__(self, base_url="https://booking-tracker-22.preview.emergentagent.com"):
        self.base_url = base_url
        self.token = None
        self.admin_username = "admin"
        self.admin_password = "supremeadmin123"

    def login(self):
        """Login and get admin token"""
        url = f"{self.base_url}/api/auth/login"
        response = requests.post(url, json={
            "username": self.admin_username,
            "password": self.admin_password
        })
        if response.status_code == 200:
            data = response.json()
            self.token = data.get('access_token')
            print(f"✅ Login successful, token: {self.token[:20]}...")
            return True
        print(f"❌ Login failed: {response.status_code}")
        return False

    def test_get_business_settings(self):
        """Test GET /api/settings/business (public endpoint)"""
        url = f"{self.base_url}/api/settings/business"
        response = requests.get(url)
        
        print(f"\n🔍 Testing GET Business Settings...")
        print(f"   URL: {url}")
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Response: {json.dumps(data, indent=2)}")
            return True, data
        else:
            print(f"   Error: {response.text}")
            return False, {}

    def test_update_business_settings(self):
        """Test PUT /api/settings/business (admin only)"""
        if not self.token:
            print("❌ No token available")
            return False

        test_settings = {
            "shop_name": "Supreme Detail Studio - Updated",
            "shop_address": "456 Updated St, Marietta, GA 30060",
            "shop_phone": "(555) 123-9999",
            "shop_email": "updated@supremedetailstudio.com",
            "mobile_service_upcharge": 75.0,
            "mobile_service_description": "We come to you - Updated"
        }

        url = f"{self.base_url}/api/settings/business"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.token}'
        }
        response = requests.put(url, json=test_settings, headers=headers)
        
        print(f"\n🔍 Testing PUT Business Settings...")
        print(f"   URL: {url}")
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Response: {json.dumps(data, indent=2)}")
            return True, test_settings
        else:
            print(f"   Error: {response.text}")
            return False, {}

    def test_category_reorder(self):
        """Test PUT /api/categories/reorder"""
        if not self.token:
            print("❌ No token available")
            return False

        # First get current categories
        url = f"{self.base_url}/api/categories"
        response = requests.get(url)
        
        if response.status_code != 200:
            print("❌ Failed to get categories")
            return False
            
        categories = response.json()
        print(f"\n🔍 Found {len(categories)} categories")
        
        if len(categories) < 2:
            print("❌ Need at least 2 categories to test reordering")
            return False

        # Reverse the order
        category_ids = [cat['id'] for cat in categories]
        reversed_ids = list(reversed(category_ids))
        
        reorder_data = {"category_ids": reversed_ids}
        
        url = f"{self.base_url}/api/categories/reorder"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {self.token}'
        }
        response = requests.put(url, json=reorder_data, headers=headers)
        
        print(f"\n🔍 Testing Category Reorder...")
        print(f"   URL: {url}")
        print(f"   Original order: {[cat['name'] for cat in categories]}")
        print(f"   New order: {[categories[i]['name'] for i in range(len(categories)-1, -1, -1)]}")
        print(f"   Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"   Response: {json.dumps(data, indent=2)}")
            
            # Verify the reorder worked
            response = requests.get(f"{self.base_url}/api/categories")
            if response.status_code == 200:
                new_categories = response.json()
                new_order = [cat['name'] for cat in new_categories]
                print(f"   Verified new order: {new_order}")
                return True
            
        else:
            print(f"   Error: {response.text}")
            return False

def main():
    print("🚀 Testing Business Settings & Category Reorder APIs")
    print("=" * 60)
    
    tester = BusinessSettingsAPITester()
    
    # Login first
    if not tester.login():
        return 1
    
    # Test business settings
    success1, original_settings = tester.test_get_business_settings()
    if not success1:
        return 1
    
    success2, updated_settings = tester.test_update_business_settings()
    if not success2:
        return 1
    
    # Verify the update worked
    success3, current_settings = tester.test_get_business_settings()
    if success3:
        if current_settings.get('shop_name') == updated_settings.get('shop_name'):
            print("✅ Business settings update verified")
        else:
            print("❌ Business settings update not reflected")
    
    # Test category reordering
    success4 = tester.test_category_reorder()
    
    # Restore original settings
    if original_settings:
        url = f"{tester.base_url}/api/settings/business"
        headers = {
            'Content-Type': 'application/json',
            'Authorization': f'Bearer {tester.token}'
        }
        requests.put(url, json=original_settings, headers=headers)
        print("\n✅ Original settings restored")
    
    print(f"\n{'='*60}")
    if success1 and success2 and success3 and success4:
        print("✅ All business settings tests passed!")
        return 0
    else:
        print("❌ Some tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())
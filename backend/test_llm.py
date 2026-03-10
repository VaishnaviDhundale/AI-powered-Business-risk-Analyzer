import asyncio
import sys
import os
import json

sys.path.append(r"c:\Users\mivai\OneDrive\Desktop\vs code folders\Projects\business risk analysis\backend")
from models import BusinessProfileRequest

def main():
    payload = {
        "business_name": "Testing UI",
        "industry": "FinTech",
        "business_model": "Startup",
        "target_market": "B2B",
        "product_description": "A valid description of the product built for testing",
        "technology_stack": [],
        "data_sensitivity": "Moderate",
        "deployment_region": "Global",
        "regulatory_environment": [],
        "ai_usage_level": "Assistive AI"
    }

    print("Testing payload validation...")
    try:
        req = BusinessProfileRequest(**payload)
        print("Model validation successful!")
        print(req.model_dump())
    except Exception as e:
        import traceback
        traceback.print_exc()

if __name__ == "__main__":
    main()

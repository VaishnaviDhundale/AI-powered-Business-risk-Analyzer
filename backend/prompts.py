"""
LLM Prompting Logic for Risk Assessment
"""


def create_risk_assessment_prompt(business_profile: dict) -> str:
    """
    Create a structured prompt for the LLM to analyze business risks
    Returns a detailed prompt that guides the model to generate structured output
    """
    
    prompt = f"""You are an expert business risk analyst and management consultant. 
Analyze the following business profile and generate a comprehensive, professional business risk assessment.

BUSINESS PROFILE:
- Business Name: {business_profile['business_name']}
- Industry: {business_profile['industry']}
- Business Model: {business_profile['business_model']}
- Target Market: {business_profile['target_market']}
- Product/Service: {business_profile['product_description']}
- Technology Stack: {', '.join(business_profile.get('technology_stack', []))}
- Data Sensitivity Level: {business_profile['data_sensitivity']}
- Deployment Region: {business_profile['deployment_region']}
- Regulatory Compliance: {', '.join(business_profile.get('regulatory_environment', ['None']))}
- AI Usage Level: {business_profile['ai_usage_level']}

Please provide a detailed risk assessment in the following JSON format:

{{
  "executive_summary": "A 2-3 sentence summary of the overall risk posture",
  "overall_risk_score": <number between 0-100>,
  "key_recommendations": [
    "First priority action",
    "Second priority action",
    "Third priority action"
  ],
  "categories": [
    {{
      "category_name": "Strategic Risks",
      "category_description": "Brief description of strategic risk category",
      "total_risk_score": <number between 0-100>,
      "risks": [
        {{
          "risk_title": "Risk Title",
          "risk_description": "Detailed description of the risk specific to this business",
          "business_impact": "Specific impact on the business operations",
          "severity": "Low|Medium|High|Critical",
          "likelihood": "Low|Medium|High",
          "risk_score": <number between 0-100>,
          "mitigation_strategy": "Concrete steps to reduce this risk",
          "monitoring_method": "How to continuously monitor this risk",
          "responsible_area": "Department/Function responsible"
        }}
      ]
    }}
  ]
}}

Generate risks for exactly these 8 categories:
1. Strategic Risks - Market dynamics, competitive threats, direction risks
2. Operational Risks - Process failures, resource constraints, efficiency risks
3. Technology & AI Risks - Technical debt, AI model risks, system failures
4. Data & Privacy Risks - Data governance, privacy, data management
5. Security Risks - Cybersecurity, infrastructure, access control threats
6. Legal & Compliance Risks - Regulatory, contractual, compliance obligations
7. Market & Financial Risks - Revenue, financial viability, market challenges
8. Ethical & Reputational Risks - Brand reputation, ethical considerations, social impact

For each category, provide 2-4 specific, relevant risks based on the business profile.

IMPORTANT REQUIREMENTS:
- Make risks specific and relevant to the business profile provided
- Use realistic, professional language suitable for a business consultant report
- Emphasize and provide strict evaluation on the most critical constraints for this specific industry (e.g. prioritize Ethical Risks for Education, Data Privacy for Healthcare).
- Ensure risk scores are based on both severity and likelihood
- Provide actionable mitigation strategies
- Keep descriptions concise but comprehensive
- Return ONLY valid JSON format
- Do not include markdown formatting, code blocks, or backticks
- Do not add any explanatory text before or after the JSON
- Return an array of exactly 8 categories as specified

Generate the assessment now and return only the JSON response:"""
    
    return prompt


def parse_json_response(response_text: str) -> dict:
    """
    Parse LLM response into structured JSON
    Handles various formatting issues from the model output
    """
    import json
    import re
    
    # Clean the response text
    response_text = response_text.strip()
    
    # Remove markdown code blocks if present
    response_text = re.sub(r'```json\s*', '', response_text)
    response_text = re.sub(r'```\s*$', '', response_text)
    
    try:
        # First attempt: direct JSON parsing
        return json.loads(response_text)
    except json.JSONDecodeError:
        pass
    
    # Try to extract JSON from response (model might add text before/after)
    # Look for the outermost braces
    json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
    if json_match:
        try:
            return json.loads(json_match.group())
        except json.JSONDecodeError:
            pass
    
    # Try to find JSON starting with categories array
    categories_match = re.search(r'"categories"\s*:\s*\[.*\]', response_text, re.DOTALL)
    if categories_match:
        # Try to construct a minimal valid JSON
        try:
            minimal_json = f'{{"categories": {categories_match.group().split(":", 1)[1]}}}'
            parsed = json.loads(minimal_json)
            # Add default values for missing fields
            if 'executive_summary' not in parsed:
                parsed['executive_summary'] = 'Risk assessment completed successfully.'
            if 'overall_risk_score' not in parsed:
                parsed['overall_risk_score'] = 50
            if 'key_recommendations' not in parsed:
                parsed['key_recommendations'] = ['Review and implement recommended mitigation strategies.']
            return parsed
        except json.JSONDecodeError:
            pass
    
    # If all parsing fails, raise error with diagnostic info
    raise ValueError(f"Could not parse response as JSON. Response length: {len(response_text)}. Response preview: {response_text[:300]}...")

# AI-Powered Business Risk Analyzer

## Project Overview
The AI-Powered Business Risk Analyzer is an advanced, enterprise-grade web application designed to evaluate, quantify, and mitigate business vulnerabilities automatically. By unifying Large Language Models (LLMs) with strict deterministic algorithms, the platform replaces months of manual consulting work with instant, personalized risk profile generation.

## Key Features
- **Dynamic Risk Profiling:** Users input business metrics (Industry, Tech Stack, Data Sensitivity, etc.) to immediately generate a comprehensive, context-aware 8-Category Risk Report (including Strategic, Operational, Ethical, and Cyber constraints).
- **Deterministic Industry Weights:** Unlike standard AI wrappers, the backend overrides hallucinated risk totals with fixed, strict mathematical multipliers based on the user's specific industry (e.g., heavily weighting Ethical Risks for the Education sector, and Data Privacy for SaaS).
- **Interactive Reports:** The risk assessment can be exported instantly to PDF, JSON, or CSV for compliance teams and stakeholders. It features an interactive Accordion-style layout so executives can dive into exact Likelihoods and Mitigation steps only when needed.
- **Premium User Interface:** The application features a stunning, multi-page (Home, About Us, Contact, Analyzer) aesthetic with seamless React navigation, built safely to completely insulate the core Risk calculations. 

## Architecture & Technology Stack
- **Frontend:** React, structured as a clean, insulated Single Page Application featuring interactive charts and automated PDF generation (via `html2pdf.js`).
- **Backend:** Python FastAPI and Pydantic, ensuring strictly typed APIs and asynchronous non-blocking traffic to the LLM generation endpoints.
- **AI Core:** Google Gemini Integration, customized through precision-engineered system prompts designed to emulate a top-tier corporate management consultant.

## Purpose
Built to bring clarity and rapid response to executive decision-making, the Business Risk Analyzer provides actionable step-by-step mitigation plans tailored directly to the likelihood and business-impact of every discovered threat in your target market.

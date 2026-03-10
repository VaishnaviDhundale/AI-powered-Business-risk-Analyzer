# AI Business Risk & Mitigation Plan Generator

A research-grade web application that analyzes business profiles and generates professional risk assessments using Google's Gemini AI.

## 🎯 Features

- **8 Risk Categories**: Strategic, Operational, Technology & AI, Data & Privacy, Security, Legal & Compliance, Market & Financial, Ethical & Reputational
- **AI-Powered Analysis**: Uses Google Gemini 2.5 Flash for intelligent risk assessment
- **Professional Reports**: Executive summaries, risk scoring (0-100), mitigation strategies
- **Modern Web UI**: React frontend with responsive design and risk visualization

## 🏗️ Architecture

- **Backend**: FastAPI (Python) with Google Gemini API integration
- **Frontend**: React 18 with modern UI components
- **AI Model**: Google Gemini 2.5 Flash

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google Gemini API key (get from [Google AI Studio](https://aistudio.google.com/apikey))

### Setup

1. **Backend Setup**:
   ```bash
   cd backend
   python -m venv venv
   venv\Scripts\activate  # Windows
   pip install -r requirements.txt
   ```

2. **Frontend Setup**:
   ```bash
   cd frontend
   npm install
   ```

3. **Environment Configuration**:
   - Add your Gemini API key to `backend/.env`

4. **Run the Application**:
   ```bash
   # Terminal 1 - Backend
   cd backend
   python main.py

   # Terminal 2 - Frontend
   cd frontend
   npm start
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
business-risk-analysis/
├── backend/                 # FastAPI server
│   ├── main.py             # API endpoints
│   ├── llm_service.py      # Gemini AI integration
│   ├── config.py           # Configuration
│   ├── models.py           # Data models
│   ├── prompts.py          # AI prompts
│   ├── requirements.txt    # Python dependencies
│   └── .env               # Environment variables
├── frontend/               # React application
│   ├── src/               # React components
│   ├── public/            # Static assets
│   └── package.json       # Node dependencies
└── README.md              # This file
```

## 🎓 Academic Project

This project demonstrates:
- Full-stack web development (React + FastAPI)
- AI/ML integration with modern APIs
- Professional software engineering practices
- Risk assessment methodologies
- Responsive UI/UX design

Built for educational purposes to showcase AI integration in business applications.

## 🎯 Overview

This platform analyzes business profiles and automatically generates professional consulting-style risk reports with:

- **Category-wise Risk Analysis**: 8 distinct risk categories covering strategic, operational, technological, and compliance aspects
- **Impact Assessment**: Business impact, severity levels, and likelihood analysis
- **AI-Generated Mitigation Strategies**: Actionable mitigation strategies and monitoring methods
- **Risk Scoring**: Comprehensive risk scoring system for prioritization
- **Professional Reports**: Research-grade output suitable for publication and presentations

## 🏗️ Architecture

### Backend
- **Framework**: FastAPI (Python)
- **LLM Integration**: Google Gemini API (gemini-2.5-flash)
- **Models Supported**: 
  - Gemini 2.5 Flash (primary)
  - Fallback to local FLAN-T5 model
- **Database**: Optional (currently in-memory)

### Frontend
- **Framework**: React 18
- **Styling**: Pure CSS with responsive design
- **State Management**: React hooks
- **Charts**: Custom SVG visualizations

## 📋 Core Features

### Business Profile Form
Detailed form collecting:
- Business fundamentals (name, industry, model, target market)
- Product/service description
- Technology stack
- Data sensitivity level
- Deployment region
- Regulatory environment
- AI usage level

### Risk Assessment Output
**8 Risk Categories**:
1. Strategic Risks
2. Operational Risks
3. Technology & AI Risks
4. Data & Privacy Risks
5. Security Risks
6. Legal & Compliance Risks
7. Market & Financial Risks
8. Ethical & Reputational Risks

**For Each Risk**:
- Risk title and description
- Business impact analysis
- Severity level (Low/Medium/High/Critical)
- Likelihood assessment
- Risk score (0-100)
- Mitigation strategy
- Monitoring method
- Responsible area

### Professional UI Components
- Dashboard-style layout
- Risk cards with severity color-coding
- Risk distribution charts
- Executive summary section
- Key recommendations
- Export to JSON, CSV
- Copy to clipboard (for docs)
- Mobile responsive design

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 16+
- Google Gemini API key (free account)

### 1. Clone/Download Project
```bash
cd "c:\Users\mivai\OneDrive\Desktop\vs code folders\Projects\business risk analysis"
```

### 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate.bat
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
copy .env.example .env
# OR on macOS/Linux:
cp .env.example .env
```

**Configure `.env`**:
```env
HF_API_KEY=your_hugging_face_api_key_here
PORT=8000
DEBUG=False
```

Get your HF API key from: https://huggingface.co/settings/tokens

### 3. Run Backend
```bash
cd backend
python -m uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at: `http://localhost:8000`
API docs at: `http://localhost:8000/docs`

### 4. Frontend Setup (New Terminal)
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend will open at: `http://localhost:3000`

### 5. Windows Batch Script
Alternatively, use the provided batch script:
```bash
start-dev.bat
```

This will start both servers in separate windows.

## 📊 Usage

1. **Fill Business Profile Form**
   - Enter your business details
   - Select industry, business model, target market
   - Describe your product/service
   - Select technology stack and compliance requirements
   - Click "Generate AI Risk Plan"

2. **Review Generated Report**
   - View overall risk score
   - Read executive summary
   - Check key recommendations
   - Review detailed risk analysis by category
   - View risk distribution chart

3. **Export Results**
   - **Copy**: Copy formatted report to clipboard
   - **JSON**: Download complete assessment as JSON
   - **CSV**: Download risk list as CSV for spreadsheets

## 🔄 API Endpoints

### Health Check
```bash
GET /health
```
Returns API health status and LLM availability.

### Generate Risk Assessment
```bash
POST /api/generate-risk-assessment
Content-Type: application/json

{
  "business_name": "TechFinance Solutions",
  "industry": "FinTech",
  "business_model": "Startup",
  "target_market": "B2B",
  "product_description": "AI-powered fraud detection platform",
  "technology_stack": ["AI", "Cloud", "Web"],
  "data_sensitivity": "High",
  "deployment_region": "Global",
  "regulatory_environment": ["GDPR", "PCI-DSS"],
  "ai_usage_level": "Core AI Product"
}
```

### API Documentation
Interactive docs available at: `http://localhost:8000/docs`

## 🧠 LLM Prompting

The system uses a sophisticated prompt engineering approach:

1. **Structured Input**: Business profile is formatted as detailed context
2. **Clear Instructions**: LLM is guided to generate structured JSON
3. **Validation**: Responses are parsed and validated
4. **Fallback Handling**: Graceful error handling for malformed responses

See [backend/prompts.py](backend/prompts.py) for prompt templates.

## 💾 Data Flow

```
User Input Form
     ↓
Validate & Structure
     ↓
Send to Hugging Face API
     ↓
LLM Analysis
     ↓
Parse JSON Response
     ↓
Render Professional Report
     ↓
Export Options (JSON/CSV)
```

## 🎨 Design Principles

### Research-Grade UI
- Professional SaaS-style dashboard
- Clean typography and spacing
- Color-coded severity levels
- Consistent component design
- Academic-quality appearance

### Responsive Design
- Mobile-first approach
- Tablets and desktop optimized
- Touch-friendly controls
- Flexible layouts

## 🔐 Security & Privacy

- No data persistence (in-memory only)
- CORS enabled for local development
- API key handled via environment variables
- HTTPS ready for production

## 📦 Deployment

### Free Hosting Options

**Frontend**:
- Vercel
- Netlify
- GitHub Pages
- Firebase Hosting

**Backend**:
- Render
- Heroku (free tier deprecated, use Render)
- PythonAnywhere
- Railway

**Example with Render**:
```bash
# Push to GitHub
git push origin main

# Connect to Render dashboard
# Set HF_API_KEY environment variable
# Deploy from Git
```

## 🚨 Troubleshooting

### "Cannot connect to backend"
- Verify FastAPI is running: `http://localhost:8000/health`
- Check port 8000 is not in use
- Review backend logs for errors

### "API key not configured"
- Ensure HF_API_KEY is set in `.env`
- Restart FastAPI server after updating .env
- Verify key is valid at HuggingFace

### "LLM request timeout"
- HuggingFace free tier may be slow
- Increase timeout in config.py
- Consider using a different model
- Try again during off-peak hours

### "JSON parsing error"
- LLM response may be malformed
- Check backend logs for raw response
- Try with different model
- Verify prompt structure in prompts.py

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest test_main.py  # (test files to be created)
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📚 Project Structure

```
business-risk-generator/
├── backend/
│   ├── main.py                 # FastAPI application
│   ├── models.py              # Pydantic models
│   ├── config.py              # Configuration
│   ├── llm_service.py         # LLM integration
│   ├── prompts.py             # Prompt templates
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment template
│   └── venv/                   # Virtual environment
│
├── frontend/
│   ├── public/
│   │   └── index.html         # HTML template
│   ├── src/
│   │   ├── components/        # React components
│   │   │   ├── BusinessProfileForm.jsx
│   │   │   ├── RiskPlanReport.jsx
│   │   │   ├── RiskCard.jsx
│   │   │   └── RiskChart.jsx
│   │   ├── pages/             # Page components
│   │   ├── styles/            # CSS stylesheets
│   │   ├── utils/             # Utilities
│   │   │   ├── api.js        # API client
│   │   │   └── helpers.js    # Helper functions
│   │   ├── App.jsx           # Main app
│   │   └── index.js          # Entry point
│   ├── package.json           # Node dependencies
│   └── node_modules/          # Dependencies
│
├── docs/                      # Documentation
├── start-dev.bat              # Windows startup script
├── start-dev.sh               # Unix startup script
└── README.md                  # This file
```

## 🛠️ Technology Stack

**Backend**:
- FastAPI 0.104.1
- Pydantic 2.5.0
- Python 3.8+
- Hugging Face Inference API

**Frontend**:
- React 18.2.0
- Axios 1.6.0
- React Icons 4.12.0
- Pure CSS3

**Infrastructure**:
- Python CORS middleware
- Async/await for performance
- HTTPX for async HTTP

## 📝 Research Publication

This application is designed for academic research:

### Citation-Ready
```bibtex
@software{ai_risk_assessment_2024,
  title={AI Business Risk & Mitigation Plan Generator},
  author={Your Name},
  year={2024},
  url={https://github.com/yourusername/risk-generator}
}
```

### Reproducibility
- Open-source models only
- No proprietary dependencies
- All code documented
- Clear data flow
- Transparent prompting

## 📄 License

MIT License - See LICENSE file (to be added)

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open pull request

## 📞 Support

For issues and questions:
1. Check troubleshooting section
2. Review API documentation (/docs)
3. Check backend logs
4. Open GitHub issue

## 🎓 Academic Notes

This system is suitable for:
- Research papers on AI-assisted risk assessment
- Studies on generative AI in business analysis
- Comparative analyses of risk models
- Case studies in AI applications
- Exploration of LLM prompt engineering

**Key Features for Publication**:
- Explainable risk taxonomy
- Structured output format
- Traceable decision logic
- Reproducible methodology
- Open-source technology stack

## 🔮 Future Enhancements

- [ ] Multi-language support
- [ ] Real-time collaboration
- [ ] Historical trend analysis
- [ ] Risk monitoring dashboard
- [ ] Integration with risk databases
- [ ] Custom risk templates
- [ ] Team features
- [ ] Advanced analytics
- [ ] PDF export with branding
- [ ] Integration with project management tools

---

**Version**: 1.0.0  
**Last Updated**: February 2024  
**Status**: Production Ready

# 🔧 BuildBuddy – DIY Project Builder with AI Assistance
BuildBuddy is a Flask-based web application that helps users plan and manage DIY projects with ease. It combines traditional component and project management with a smart AI assistant to suggest project ideas and components.

## 🚀 Project Goals
Simplify the DIY project-building process for beginners and hobbyists.

Provide an intelligent assistant that suggests components and project ideas based on user input.

Serve as a tool to manage components, orders, and project details in one place.

## 🧰 Key Features
### 🔍 AI Assistant (BuddyAI)
Takes user input (prompt, difficulty, type, budget).

Returns a list of suggested components and tools.

Helps brainstorm new project ideas.

📦 Component Management
CRUD operations for electronic/mechanical components.

Image support for visual reference.

Price and description for inventory tracking.

📁 Project Management
Add and view project details including:

Title, description, tags.

Linked components (via IDs).

Automatic timestamping for creation date.

📜 Order System
Track and place orders for selected components.

Basic user authentication included for admin-level features.

## 🛠️ Tech Stack
Backend: Flask (Python), SQLAlchemy ORM

Frontend: React, (Bootstrap 5 CDN UI)

Database: MySQL (via Aiven)

Deployment: Render (Flask backend and frontend)


### 🧪 Setup & Run Locally
Clone the repo:
```bash
git clone https://github.com/your-username/buildbuddy.git
cd buildbuddy
```
Set up virtual environment:
```bash
python -m venv venv
source venv/bin/activate
```
Install dependencies:
```bash
pip install -r requirements.txt
flask run
```
🌍 Live Deployment
Frontend: https://buildbuddy-frontend.onrender.com/
Backend API: https://buildbuddy-backend-rjr8.onrender.com/


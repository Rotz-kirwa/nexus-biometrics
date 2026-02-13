# Quick Start Guide - Nexus Biometrics System

## 🚀 Start the Complete System

### Step 1: Start Backend
```bash
cd /home/user/projects/biometrics/Nexus-Biometrics-Backend-Project
python run.py
```
✅ Backend running on: `http://localhost:5001`

### Step 2: Start Frontend
```bash
cd /home/user/projects/biometrics/nexus-core
npm run dev
```
✅ Frontend running on: `http://localhost:8080`

### Step 3: Login
- Open browser: `http://localhost:8080`
- Email: `admin@nexus.com`
- Password: `Admin@123`

---

## 📁 Project Structure

```
biometrics/
├── Nexus-Biometrics-Backend-Project/  # Flask API
│   ├── app/
│   ├── run.py
│   └── setup_admin.py
│
└── nexus-core/                         # React Frontend
    ├── src/
    │   ├── services/      # NEW: API integration
    │   ├── pages/         # UPDATED: Real data
    │   └── contexts/      # UPDATED: Real auth
    ├── .env               # NEW: API config
    └── INTEGRATION.md     # NEW: Full docs
```

---

## ✅ What's Working

### User Features
- ✅ Login/Logout
- ✅ Registration
- ✅ Check-in/Check-out
- ✅ View attendance history
- ✅ View personal dashboard
- ✅ Profile viewing

### Admin Features
- ✅ View all users
- ✅ View system statistics
- ✅ Dashboard analytics
- ✅ User management interface

---

## 🔧 Configuration

**API URL:** Set in `.env`
```env
VITE_API_URL=http://localhost:5001
```

**Backend URL:** Set in `run.py`
```python
app.run(host='0.0.0.0', port=5001)
```

---

## 📊 Test Data

**Admin User:**
- Email: `admin@nexus.com`
- Password: `Admin@123`
- Role: Admin

**Create More Users:**
- Use registration page
- Or use backend `/auth/register` endpoint

---

## 🐛 Common Issues

**"Network Error"**
→ Backend not running. Start with `python run.py`

**"401 Unauthorized"**
→ Logout and login again

**Empty Dashboard**
→ Use check-in page to create attendance records

**"Admin access required"**
→ Login with admin@nexus.com

---

## 📖 Full Documentation

See `INTEGRATION.md` for complete details on:
- API endpoints
- Data flow
- Authentication
- Troubleshooting
- Next steps

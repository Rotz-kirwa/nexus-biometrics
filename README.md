# Nexus Biometrics Frontend

> Professional biometric attendance management system built with React, TypeScript, and Vite.

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
```
App runs on: `http://localhost:8080`

### Production Build
```bash
npm run build
npm run preview
```

---

## 🎯 Demo Mode (No Backend Required)

**Login Credentials:**
- Email: `admin@nexus.com`
- Password: `Admin@123`

The app works in **demo mode** when no backend is configured. All features are functional with mock data.

---

## 🔧 Configuration

### Environment Variables

Create `.env` file:
```env
# Leave empty for demo mode
VITE_API_URL=

# Or set your backend URL
VITE_API_URL=https://your-backend-api.com
```

---

## 📦 Tech Stack

- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **shadcn/ui** - Component library
- **React Query** - Data fetching
- **React Router** - Navigation
- **Axios** - HTTP client
- **Recharts** - Data visualization

---

## 🎨 Features

### User Features
- ✅ Login/Logout
- ✅ Registration
- ✅ Check-in/Check-out
- ✅ Attendance history
- ✅ Personal dashboard
- ✅ Profile management

### Admin Features
- ✅ User management
- ✅ System statistics
- ✅ Dashboard analytics
- ✅ Attendance reports

---

## 🚀 Deploy to Vercel

### Quick Deploy
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Or via GitHub
1. Push to GitHub
2. Import to Vercel
3. Deploy!

**See [VERCEL_DEPLOY.md](./VERCEL_DEPLOY.md) for detailed instructions.**

---

## 📁 Project Structure

```
src/
├── components/     # Reusable components
├── pages/          # Page components
├── services/       # API services
├── contexts/       # React contexts
├── hooks/          # Custom hooks
├── types/          # TypeScript types
└── lib/            # Utilities
```

---

## 🔌 Backend Integration

The app automatically detects if a backend is available:

**With Backend:**
- Set `VITE_API_URL` to your API
- Real data persistence
- Multi-user support

**Without Backend (Demo Mode):**
- Works standalone
- Mock data
- Single user (admin)

**Backend Repository:** [Nexus-Biometrics-Backend-Project](../Nexus-Biometrics-Backend-Project)

---

## 📖 Documentation

- [Integration Guide](./INTEGRATION.md) - Backend integration details
- [Quick Start](./QUICKSTART.md) - Getting started guide
- [Vercel Deploy](./VERCEL_DEPLOY.md) - Deployment instructions

---

## 🧪 Testing

```bash
npm run test        # Run tests
npm run test:watch  # Watch mode
```

---

## 📝 Scripts

```bash
npm run dev         # Start dev server
npm run build       # Production build
npm run preview     # Preview build
npm run lint        # Run linter
npm run test        # Run tests
```

---

## 🎯 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

---

## 📄 License

MIT License - feel free to use for personal or commercial projects.

---

## 🤝 Contributing

Contributions welcome! Please open an issue or submit a PR.

---

## 📞 Support

**Issues?**
- Check [INTEGRATION.md](./INTEGRATION.md) for troubleshooting
- Open a GitHub issue
- Check browser console for errors

---

## ✨ Credits

Built with ❤️ using modern web technologies.

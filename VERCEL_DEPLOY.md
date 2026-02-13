# Deploy to Vercel

## 🚀 Quick Deploy

### Option 1: Vercel CLI (Recommended)

1. **Install Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login to Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
cd /home/user/projects/biometrics/nexus-core
vercel
```

4. **Follow prompts:**
   - Set up and deploy? **Y**
   - Which scope? Select your account
   - Link to existing project? **N**
   - Project name? **nexus-biometrics** (or your choice)
   - Directory? **./** (press Enter)
   - Override settings? **N**

5. **Production Deploy:**
```bash
vercel --prod
```

---

### Option 2: Vercel Dashboard

1. **Push to GitHub:**
```bash
cd /home/user/projects/biometrics/nexus-core
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

2. **Import to Vercel:**
   - Go to https://vercel.com/new
   - Import your GitHub repository
   - Framework Preset: **Vite**
   - Root Directory: **./nexus-core** (if monorepo) or **./** (if separate repo)
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Configure Environment Variables:**
   - Add: `VITE_API_URL` = `https://your-backend-url.com` (or leave empty for demo mode)

4. **Deploy!**

---

## 🔧 Environment Variables

### For Demo Mode (No Backend)
Leave `VITE_API_URL` empty or set to localhost:
```
VITE_API_URL=http://localhost:5001
```

### For Production (With Backend)
Set your backend URL:
```
VITE_API_URL=https://your-backend-api.com
```

**Add in Vercel Dashboard:**
1. Go to Project Settings
2. Environment Variables
3. Add `VITE_API_URL`
4. Redeploy

---

## 🎯 Demo Mode Features

When deployed without backend (or with localhost URL), the app runs in **FALLBACK MODE**:

✅ **Working Features:**
- Login with: `admin@nexus.com` / `Admin@123`
- Registration (creates local user)
- Check-in/Check-out (simulated)
- Attendance history (mock data)
- Dashboard stats (mock data)
- Admin features (mock users)
- All UI components

❌ **Not Working:**
- Real data persistence
- Multi-user support
- Backend synchronization

---

## 📝 Vercel Configuration

**`vercel.json` is already configured:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite"
}
```

---

## 🔒 Security Notes

**For Production:**
1. Set proper `VITE_API_URL` to your backend
2. Enable HTTPS on backend
3. Configure CORS on backend to allow Vercel domain
4. Use environment variables for sensitive data
5. Enable Vercel password protection if needed

---

## 🐛 Troubleshooting

### Build Fails
- Check `package.json` scripts
- Ensure all dependencies are in `dependencies` not `devDependencies`
- Check Node version compatibility

### Blank Page After Deploy
- Check browser console for errors
- Verify `dist` folder is generated
- Check Vercel build logs

### API Errors
- Verify `VITE_API_URL` is set correctly
- Check CORS configuration on backend
- Ensure backend is accessible from Vercel

### Demo Mode Not Working
- Clear browser cache
- Check localStorage is enabled
- Verify credentials: `admin@nexus.com` / `Admin@123`

---

## 📊 Deployment Checklist

- [ ] Code pushed to Git
- [ ] `vercel.json` configured
- [ ] Environment variables set
- [ ] Build succeeds locally (`npm run build`)
- [ ] Preview deployment tested
- [ ] Production deployment successful
- [ ] Demo login works
- [ ] All pages accessible
- [ ] Mobile responsive
- [ ] Performance optimized

---

## 🎉 Post-Deployment

**Your app will be live at:**
```
https://your-project-name.vercel.app
```

**Demo Credentials:**
- Email: `admin@nexus.com`
- Password: `Admin@123`

**Custom Domain:**
1. Go to Project Settings → Domains
2. Add your domain
3. Configure DNS records
4. Wait for SSL certificate

---

## 🔄 Updates

**To deploy updates:**
```bash
git add .
git commit -m "Update message"
git push
```

Vercel auto-deploys on push!

**Or with CLI:**
```bash
vercel --prod
```

---

## 📞 Support

**Vercel Issues:**
- Check build logs in Vercel dashboard
- Visit https://vercel.com/docs
- Check Vercel status page

**App Issues:**
- Check browser console
- Verify environment variables
- Test in demo mode first

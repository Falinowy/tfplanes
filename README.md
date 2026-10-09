<div align="center">
  <img src="https://github.com/Falinowy/tfplanes/blob/MASTER/src/assets/images/2021_06_01_11_33_39_Tfplanes.png" alt="Tfplanes Logo" width="300" />
  <h1>✈️ TF Planes Tracker</h1>
  <p>A modern, premium flight tracking application built with the latest Angular ecosystem and Firebase Realtime Database. Track, manage, and monitor your fleet with a stunning Material Design interface.</p>
</div>

---

## 🚀 Live Demo
Experience the application live: **[https://tfplanes.netlify.app/](https://tfplanes.netlify.app/)**

### 🔑 Test Credentials
You can log in and test the system using the following credentials:
- **Email:** `test@test.pl`
- **Password:** `test123`

---

## 💻 Tech Stack
This project has recently undergone a massive architectural and visual upgrade to leverage the bleeding-edge web technologies:

- **Framework:** Angular 22.2
- **Build Engine:** Vite / esbuild (`@angular-devkit/build-angular:application`)
- **Language:** TypeScript 5+
- **Styling & UI:** Angular Material 22, Custom Premium CSS (Glassmorphism, Flexbox, CSS Variables)
- **Backend & Auth:** Firebase 9.x (AngularFire 7.6)
- **State Management:** RxJS 6/7

---

## ✨ Key Features
- **Premium UI/UX:** A deeply immersive visual experience with a modern dark/blue color scheme, custom typography (Inter font), micro-animations, and glassmorphic overlays.
- **Full CRUD Operations:** Create, Read, Update, and Delete flight records in real-time.
- **Robust Form Engine:** Powered by a deeply customized, reusable `<app-form-input>` component featuring:
  - Smart masking (e.g., auto-uppercase for Flight Codes).
  - Physical character limits and strict reactive validations.
  - Bidirectional Date Parsing (ISO browser format <-> Firebase text format).
- **Responsive Design:** A fully responsive grid that works seamlessly on desktop and mobile devices.
- **Secure Authentication:** Firebase-powered login system protecting the dashboard and flight details.

---

## 🛠️ Local Development

### Prerequisites
- Node.js (v20 or higher recommended)
- Angular CLI (`npm install -g @angular/cli`)

### Installation & Setup
1. **Clone the repository**
   ```bash
   git clone https://github.com/Falinowy/tfplanes.git
   cd tfplanes
   ```

2. **Install dependencies**
   *(Note: The project uses strict peer dependencies. Use the legacy flag if you encounter ERESOLVE errors during initial setup).*
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Run the development server**
   ```bash
   npm start
   ```
   The application will automatically open or be available at `http://localhost:4200/`.

4. **Build for Production**
   ```bash
   npm run build
   ```
   *The compiled artifacts will be stored in the `dist/tfplanes/browser/` directory.*

---

## ☁️ Deployment (Netlify)
This project is configured for automated CI/CD deployments on Netlify.
- The `netlify.toml` file ensures proper SPA routing (preventing 404s on deep links) and points to the correct Angular 22 output directory (`dist/tfplanes/browser`).
- The `.npmrc` configuration ensures seamless cloud builds without peer dependency conflicts.

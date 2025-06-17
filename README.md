# MauGaP's Initiative Tracker for TTRPGs

A modern, real-time initiative tracker for tabletop RPGs (TTRPGs) like Dungeons & Dragons. Built with React and Firebase, this app helps DMs and players manage combat encounters with ease, including initiative order, participant management, and clear DM/player views.

---

## 🚀 Live Demo
[https://maugap-roll-initiative.web.app](https://maugap-roll-initiative.web.app)

---

## ✨ Features
- **Initiative Order Management:** Add, edit, and remove participants with initiative, AC, type/team, and conditions.
- **Downed/Healthy State:** Mark characters as downed (skull icon) or healthy (heart icon) with colorful SVGs. Downed characters are skipped in initiative and hidden from player view.
- **DM vs Player View:** DMs see all participants (including downed); players only see active ones.
- **Real-Time Sync:** All changes update instantly for everyone via Firebase Firestore.
- **Responsive Design:** Works great on desktop and mobile. Add Participants form moves on top at 1024px width.
- **Tooltips & Accessibility:** All action buttons and team icons have tooltips for clarity.
- **Visual Feedback:** Current turn is highlighted; downed participants are visually distinct.
- **Modern UI:** Built with Material-UI and custom SVG icons.

---

## 🛠️ Tech Stack
- **Frontend:** React (Create React App), Material-UI (MUI)
- **Backend/Realtime:** Firebase Firestore, Firebase Hosting
- **Icons:** Custom SVGs for heart (healthy) and skull (downed)
- **Other:** ESLint, Prettier, Jest, React Testing Library

---

## 📦 Project Structure
```
├── public/
│   └── assets/
│       └── icons/
│           ├── heart.svg
│           └── skull.svg
├── src/
│   ├── components/
│   │   ├── AddParticipant.js
│   │   ├── EditParticipantModal.js
│   │   ├── EncounterPage.js
│   │   ├── InitiativeOrder.js
│   │   └── ...
│   ├── assets/
│   ├── styles.css
│   └── ...
├── README.md
└── ...
```

---

## 🏁 Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation
```bash
git clone https://github.com/yourusername/rollinitiative.git
cd rollinitiative
npm install
```

### Running Locally
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production
```bash
npm run build
```

### Deploying to Firebase
```bash
npm run build
npx firebase deploy --only hosting
```

---

## 🧩 Contributing
Pull requests and issues are welcome! Please open an issue to discuss your idea or bug before submitting a PR.

---

## 📄 License
MIT

---

## 🙏 Credits
- Heart and Skull SVGs by [JoyPixels](https://github.com/joypixels/emojione) and others, MIT License.
- Built by MauGaP.

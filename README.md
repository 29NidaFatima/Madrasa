# 🕌 Prayer Times App

A responsive React application that displays Islamic prayer timings based on the user's current location. Built with React, Tailwind CSS, Zustand for state management, and enhanced UI/UX styling for a polished mobile-first experience.

---

## 🌟 Features

- 📍 Detects user's geolocation for accurate prayer times
- 🕰 Displays five daily prayers (Fajr, Dhuhr, Asr, Maghrib, Isha)
- 🎨 Beautiful prayer cards with gradient themes and smooth animations
- 📱 Fully responsive layout with mobile-friendly components
- ⚙️ Persisted timings using Zustand's local storage
- 🗺️ Location labeling (City, Country)
- 🔄 Real-time update of next upcoming prayer and its countdown

---

## 🚀 Technologies Used

| Tool/Library      | Purpose                                |
|-------------------|----------------------------------------|
| React             | UI framework                           |
| Tailwind CSS      | Styling and layout                     |
| Zustand + Persist | Global state management                |
| date-fns          | Time parsing and calculations          |
| Geolocation API   | Detect user's coordinates              |

---

## 📦 Installation

```bash
git clone https://github.com/29NidaFatima/NamazCard
cd prayer-times-app
npm install
npm start
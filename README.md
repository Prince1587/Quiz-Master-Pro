# 📚 Quiz Master Pro

<div align="center">

![Quiz Master Pro](https://img.shields.io/badge/Quiz-Master%20Pro-purple?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A powerful, interactive quiz application built with React and Tailwind CSS**

[✨ Features](#-features) • [🚀 Quick Start](#-quick-start) • [📸 Screenshots](#-screenshots) • [🛠️ Tech Stack](#️-tech-stack) • [📦 Installation](#-installation)

</div>

---

## 🎯 Overview

Quiz Master Pro is a feature-rich, modern quiz application that allows users to create, take, and manage quizzes with an intuitive interface. Built with React and styled with Tailwind CSS, it offers a seamless experience across all devices.

---
## 🌐 Live Demo

[**🚀 View Live App**](https://quiz-master-pro-chi.vercel.app/) 

## 📸 Screenshots

### Desktop View

![Desktop Screenshot](notes.jpg)

## ✨ Features

### 🎓 Core Functionality
- **📝 Create Custom Quizzes** - Build unlimited quizzes with multiple questions
- **⏱️ Smart Timer System** - Countdown timer with pause/resume functionality
- **💡 Hint System** - Get explanations and hints for each question
- **🎮 Interactive Quiz Player** - Smooth, engaging quiz-taking experience
- **📊 Real-time Scoring** - Instant feedback with detailed score breakdowns

### 📈 Analytics & Tracking
- **📊 Statistics Dashboard** - Track total attempts, average scores, and best performances
- **📜 Quiz History** - View all past quiz attempts with timestamps
- **🏆 Score Analytics** - Percentage-based scoring with pass/fail indicators
- **⏰ Time Tracking** - Monitor time spent on each quiz

### 🎨 User Experience
- **🌓 Dark Mode** - Toggle between light and dark themes
- **📱 Fully Responsive** - Perfect on mobile, tablet, and desktop
- **🔍 Search & Filter** - Find quizzes by name, category, or difficulty
- **🎯 Difficulty Levels** - Easy, Medium, and Hard classifications
- **📂 Categories** - General, Science, Programming, Math, and History

### ⚡ Advanced Features
- **❌ Negative Marking** - Optional penalty system for wrong answers
- **🔄 Quiz Duplication** - Clone and modify existing quizzes
- **🎲 Question Shuffling** - Randomized question order for fairness
- **✅ Answer Review** - Detailed post-quiz analysis with correct answers
- **🎨 Custom Categories** - Create your own quiz categories

## 🔧 File Structure
```
quiz-master-pro/
├── public/
│   ├── index.html          # HTML template
│   └── manifest.json       # PWA manifest
├── src/
│   ├── components/
│   │   ├── QuizBuilder.js      # Quiz creation interface
│   │   ├── QuizList.js         # Quiz browsing & filtering
│   │   ├── QuizPlayer.js       # Quiz taking experience
│   │   ├── Statistics.js       # Analytics dashboard
│   │   └── QuizHistory.js      # Past attempts view
│   ├── context/
│   │   └── QuizContext.js      # Global state management
│   ├── data/
│   │   └── initialQuizzes.js   # Pre-loaded quiz data
│   ├── App.js              # Main app wrapper
│   ├── index.js            # React root
│   └── index.css           # Tailwind styles
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind configuration
└── package.json            # Dependencies and scripts
```

## 🚀 Quick Start
```bash
# Clone the repository
git clone https://github.com/yourusername/quiz-master-pro.git

# Navigate to project directory
cd quiz-master-pro

# Install dependencies
npm install

# Start the development server
npm start

## 🤝 Contributing

1. Fork the project
2. Create feature branch
3. Commit changes
4. Push to branch
5. Open Pull Request

## 📄 License

MIT License - feel free to use in your projects!

---

**🎉 Start capturing your brilliant ideas today!** ✨

_Built with ❤️ using React & Tailwind CSS_

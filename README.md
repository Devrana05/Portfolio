# Dev Rana — Portfolio Website

![React](https://img.shields.io/badge/React-18.x-blue?style=flat&logo=react)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat&logo=vite)
![License](https://img.shields.io/badge/License-MIT-green.svg)
![Build Status](https://img.shields.io/badge/build-passing-brightgreen)

A personal portfolio website built with React and Vite, showcasing data science and machine learning projects including Customer Segmentation, Loan Approval Prediction, and Deep Learning models (FNN, RNN, CNN). Features a custom curtain-reveal intro animation, interactive flip-card skills section, custom cursor, and a working contact form integrated with EmailJS.

## 🚀 Live Demo

[View Live Project](https://your-vercel-deployment-url-goes-here.vercel.app)

## ✨ Features

- **Intro Animation:** Custom curtain-reveal intro sequence with a ball-bounce loader
- **Custom Cursor:** Smooth, custom-styled cursor for enhanced UI interactivity
- **Interactive Skills:** 3D flip-card interactions revealing specific technical proficiencies
- **Dynamic Projects:** Tabbed deep learning projects section with dynamically updating GitHub repository links
- **Hover Animations:** Advanced gradient text-fill sweeps and dynamic underlines on project titles
- **Floating Actions:** Persistent, floating resume download button
- **Contact Form:** Fully functional "Get in Touch" form with real-time validation, powered by EmailJS
- **Responsive Design:** Fluid layouts perfectly tailored for mobile, tablet, and desktop viewing

## 🛠️ Tech Stack

- **Framework:** React, Vite
- **Language:** JavaScript
- **Styling:** CSS3, Tailwind CSS
- **Icons:** lucide-react
- **Integrations:** EmailJS

## 📁 Project Structure

```text
├── src/
│   ├── assets/       # Image and icon assets (images/, icons/)
│   ├── components/   # Reusable UI components
│   ├── data/         # Project definitions and static content
│   ├── App.jsx       # Main application component & routing logic
│   ├── index.css     # Global styles and Tailwind configuration
│   └── main.jsx      # React DOM rendering entry point
├── public/           # Public static assets
└── vite.config.js    # Vite bundler configuration
```

## ⚙️ Getting Started

### Prerequisites

Ensure you have Node.js and npm installed on your machine.

### Installation

1. Clone the repository:
```bash
git clone <repo-url>
cd portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Build for Production

To create an optimized production build, run:
```bash
npm run build
```

## 🔐 Environment Setup

To enable the "Get in Touch" contact form functionality, you must configure EmailJS. 

Open `src/App.jsx` and replace the placeholder strings in the `emailjs.send()` function with your actual EmailJS credentials:
- `YOUR_SERVICE_ID`
- `YOUR_TEMPLATE_ID`
- `YOUR_PUBLIC_KEY`

## 📊 Featured Projects

- **[Customer Segmentation](https://github.com/Devrana05/Unsupervised-Learning-Minor-Project):** Unsupervised ML model analyzing transactional data to segment retail customers.
- **[Loan Approval Prediction](https://github.com/Devrana05/Supervised-Learning-Minor-Project):** Supervised ML classification model predicting user loan eligibility based on applicant profiles.
- **[Feedforward Neural Network (FNN)](https://github.com/Devrana05/Deep-Learning/tree/main/ANN):** Foundational deep learning models handling both regression and classification tasks.
- **[IMDB Sentiment Analysis (RNN)](https://github.com/Devrana05/Deep-Learning/tree/main/RNN):** NLP classification model utilizing Recurrent Neural Networks to analyze movie review sentiments.
- **[CIFAR-10 Image Classifier (CNN)](https://github.com/Devrana05/Deep-Learning/tree/main/CNN):** Convolutional Neural Network designed to accurately categorize images into 10 distinct classes.

## 📫 Connect with me

Feel free to reach out or follow my work:

- **LinkedIn:** [linkedin.com/in/your-profile](#)
- **GitHub:** [@Devrana05](https://github.com/Devrana05)
- **X / Twitter:** [@your_handle](#)
- **Instagram:** [@your_handle](#)
- **Email:** your.email@example.com

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

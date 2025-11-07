import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter as Router} from "react-router-dom";
// import "@fontsource/mali"; // defaults to weight 400
// import "@fontsource/mali/600.css"; // optional extra weights


const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <Router>
      <App />
    </Router>
  );
} else {
  console.error("Root element not found");
}
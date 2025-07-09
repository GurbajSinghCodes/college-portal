import { createRoot } from 'react-dom/client'
import App from './app.jsx'
const setViewportHeight = () => {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
};

window.addEventListener('resize', setViewportHeight);
setViewportHeight();

createRoot(document.getElementById('root')).render(
  <App />
)

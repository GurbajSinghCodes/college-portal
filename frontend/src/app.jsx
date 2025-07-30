import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import About from './components/about.jsx'
import Contact from './components/contact.jsx'
import Dashboard from './components/dashboard.jsx';
import Verify from './components/email-verify.jsx'
import FAQ from './components/faq.jsx';
import Footer from './components/footer.jsx';
import Forgot_password from './components/forgot_password.jsx';
import Home from './components/home.jsx';
import Login from './components/login.jsx';
import Navbar from './components/navbar.jsx';
import NotFound from './components/not-found.jsx';
import Notes from './components/notes.jsx';
import Passwordlogin from './components/password-login.jsx'
import Qps from './components/qps.jsx';
import Search from './components/search.jsx';
import StarredFiles from './components/starred.jsx';
import { AuthProvider } from './components/user-context.jsx';
import "./css/about.css"
import './css/contact.css';
import './css/custom-toast.css';
import './css/faq.css';
import './css/footer.css'
import "./css/home.css";
import './css/login.css'
import './css/navbar.css'
import './css/notes.css';
import './css/search.css'
import './css/scrollbar.css'
import './css/starred.css';
import './css/variables.css';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, });
  }, [pathname]);

  return null;
};

const App = () => {


  const alreadyNotified = localStorage.getItem("iosToastDismissed");
  function isIOS() {
    return /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  }

  useEffect(() => {
    const loader = document.getElementById('loadercontainer');
    if (loader) loader.remove();

    if (
      isIOS() &&
      !alreadyNotified) {
      toast.warning("iOS users: To stay logged in, go to Settings → Safari → Privacy & Security and turn OFF 'Prevent Cross-Site Tracking'. Also, avoid using Private or Incognito mode, which can block cookies and session storage.",
        {
          autoClose: false,
          onClose: () => {
            localStorage.setItem("iosToastDismissed", "true");
          }
        })
    }

  }, [])




  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app ">
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
          <ToastContainer position="top-center" autoClose={3000} closeOnClick={true} icon={true} />
          <main className="appcontent" onClick={() => menuOpen && setMenuOpen(false)}>
            <ScrollToTop />


            <div className="routes">
              <Routes >
                <Route path="/" element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/faq' element={<FAQ />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/starred" element={<StarredFiles />} />
                <Route path="/qps" element={<Qps />} />
                <Route path="/login" element={<Login />} >
                  <Route path='signup' element={<Verify />} />
                  <Route path='signin' element={<Passwordlogin />} />
                  <Route path='forgotpassword' element={<Forgot_password />} />
                </Route>
                <Route path='*' element={<NotFound />} />
                <Route path='/search' element={<Search />} />
              </Routes>
            </div>
            <Footer />
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;

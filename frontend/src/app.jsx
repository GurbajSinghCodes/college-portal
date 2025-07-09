import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/navbar.jsx';
import Home from './components/home.jsx';
import About from './components/about.jsx'
import Contact from './components/contact.jsx'
import Notes from './components/notes.jsx';
import Dashboard from './components/dashboard.jsx';
import Qps from './components/qps.jsx';
import Login from './components/login.jsx';
import Verify from './components/email-verify.jsx'
import Passwordlogin from './components/password-login.jsx'
import StarredFiles from './components/starred.jsx';
import NotFound from './components/not-found.jsx';
import Footer from './components/footer.jsx';
import { AuthProvider } from './components/user-context.jsx';
import "./css/about.css"
import './css/contact.css';
import './css/custom-toast.css';
import "./css/email-verify.css";
import './css/footer.css'
import "./css/home.css";
import './css/login.css'
import './css/navbar.css'
import './css/notes.css';
import './css/scrollbar.css'
import './css/starred.css';
import './css/variables.css'


const App = () => {



  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <main className="appcontent" onClick={() => menuOpen && setMenuOpen(false)}>
            <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />


            <ToastContainer position="top-center" autoClose={3000} icon={true} />
            <div className="routes">
              <Routes >
                <Route path="/" element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/starred" element={<StarredFiles />} />
                <Route path="/qps" element={<Qps />} />
                <Route path="/login" element={<Login />} >
                  <Route path="verify-otp" element={<Verify />} />
                  <Route path='passwordlogin' element={<Passwordlogin />} />
                </Route>
                <Route path='*' element={<NotFound />} />
              </Routes>
            </div>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </AuthProvider>

  );
}

export default App;

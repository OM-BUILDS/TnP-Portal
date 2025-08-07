import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";

import Dashboard from "./pages/Dashboard";
import Jobs from "./pages/Jobs";
import TopNiches from "./components/TopNiches";
import Coordinators from "./components/Coordinators";

import VerifyEmail from './components/VerifyEmail';

import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import PostApplication from "./pages/PostApplication";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getUser } from "./store/slices/userSlice";
import Placedform from "./pages/placed";
import Students from "./pages/Students";
import ContactUs from "./pages/ContactUs";
const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, []);

  return (
    <>
      <Router>
        <Navbar />
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/students" element={<Students />} />
          <Route path="/contact" element={<TopNiches />} />
          <Route path="/contacts" element={<ContactUs />} />
          <Route path="/coordinator" element={<Coordinators />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/placed" element={<Placedform/>}/>
          <Route
            path="/post/application/:jobId"
            element={<PostApplication />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" theme="dark" />
      </Router>
    </>
  );
};

export default App;

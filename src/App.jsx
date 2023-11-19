import './App.css';
import React,{useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Form/Login/Login';
import Register from './components/Form/Register/Register';
import Todo from './features/Todo';
import { useDispatch } from 'react-redux';
import { auth } from './util/firebase';
import { setUser } from './slices/userSlice';

import ResetPassword from "./components/Form/Reset/Reset";

import { onAuthStateChanged } from 'firebase/auth';
function App() {
  const [user,setUsers]=useState("")
  const dispatch = useDispatch();
  useEffect(() => {
    // Start listening to authentication state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsers(user)
      dispatch(setUser(user))
    });
    return unsubscribe

  }, [dispatch]);
  return (

    <Router basename="/firebase-todo-app">
      <Routes>
        <Route path="/" element={ user != null ? <Todo /> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<ResetPassword />} />
      </Routes>
    </Router>

  );
}

export default App;

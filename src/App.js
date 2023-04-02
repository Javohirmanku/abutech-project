import logo from './logo.svg';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import Login from "./pages/Login";
import {Main} from "./pages/Main";
import React, {useEffect, useState} from "react";
import LinearProgress from '@mui/material/LinearProgress';

function App() {
    const [loading, setLoading] = useState(false);
    const [isAuth, setIsAuth] = useState(false);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) setIsAuth(true)
    },[])

    return isAuth ? (
        <Routes>
            <Route path="/main" element={<Main/>}/>
            <Route path="*" element={<Main to="/main"/>}/>
        </Routes>
    ) : (<Routes>
        <Route path="/login" element={<Login setLoading={setLoading} loading={loading} setIsAuth={setIsAuth}/>}/>
        <Route path="*" element={<Login to="/login" setLoading={setLoading} loading={loading} setIsAuth={setIsAuth}/>}/>
    </Routes>);
}

export default App;

import React, {useEffect} from 'react';
import '../style/DashboardAdmin.css';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
require('dotenv').config();

const DashboardAdmin =()=>{
    let history = useHistory();

    const logOut=()=>{
        localStorage.clear();
        history.push('/');
    }

    const cekUser=async()=>{
        const email = localStorage.getItem('email')
        console.log(email)
        await Axios.post(process.env.BASE_URL+`/login`, email)
        .then(res=>{
            console.log(res)
        }).catch(err=> console.log(err))
    }

    const timeClearLocalStorage=()=>{
        let hours = 2
        let saved = localStorage.getItem('saved')
        if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
        // if (saved && (new Date().getTime() - saved > 8000)) {
            logOut()
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token === 0 || token === undefined || token === null){
            history.push('/')
        }
        // cekUser()
        timeClearLocalStorage()
        setTimeout(logOut, 7200000)
    }, [history])

    return(
        <div className="containers-dashboard">
            <header className="header">
                <h1 className="header-title">Dashboard Admin</h1>
                <button onClick={()=>{cekUser()}} type="button" className="btn btn-outline-warning logOut">Log Out</button>
            </header>
                <div className="sideBar">
                    <p>sideBar</p>
                </div>
                <div className="rightBar">
                    <p>rightBar</p>
                </div>
            <div className="contents">
                <h3 className="content-title">Content</h3>
            </div>
        </div>
    )
}

export default DashboardAdmin;
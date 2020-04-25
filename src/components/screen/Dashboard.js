import React, {useEffect} from 'react';
import '../style/Dashboard.css'
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
require('dotenv').config();


const Dashboard =()=>{
    let history = useHistory();
    const BASE_URL = 'http://192.168.1.12:4000';

    const logOut=()=>{
        localStorage.clear();
        history.push('/');
    }

    const cekUser=async()=>{
        const emailUser = localStorage.getItem('email')
        // console.log(email)
        if(emailUser !== 0){
            // console.log(email)
            const email = {'email':emailUser}
            await Axios.post(BASE_URL+`/users/detile`, email)
            .then(res=>{
                if(res.data[0].level !== 'user'){
                    history.push('/Dashboard-admin')
                }
                // console.log(res.data[0].level)
            }).catch(err=> console.log(err))
        }
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
        cekUser()
        timeClearLocalStorage()
        return ()=>{
            setTimeout(logOut, 7200000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])

    return(
        <div className="containers-dashboard">
            <header className="header">
                <h1 className="header-title">Dashboard User</h1>
                <button onClick={()=>{logOut()}} type="button" className="btn btn-outline-warning logOut">Log Out</button>
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

export default Dashboard;
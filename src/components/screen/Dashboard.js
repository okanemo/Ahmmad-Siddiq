import React, {useEffect} from 'react';
import '../style/Dashboard.css'
import {useHistory} from 'react-router-dom';


const Dashboard =()=>{
    let history = useHistory();

    const logOut=()=>{
        localStorage.clear();
        history.push('/');
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
        timeClearLocalStorage()
        setTimeout(logOut, 7200000)
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
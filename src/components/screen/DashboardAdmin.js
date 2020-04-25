import React, {useEffect, useState} from 'react';
import '../style/DashboardAdmin.css';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
require('dotenv').config();

const DashboardAdmin =()=>{
    let history = useHistory();
    const BASE_URL = 'http://192.168.1.12:4000';

    const [contentData, setContentData] = useState(false)
    const [dataUsers, setDataUsers] = useState([])

    const getUsers = async ()=>{
        await Axios.get(BASE_URL+'/users')
        .then(res=>{
            const data = res.data
            const email = localStorage.getItem('email')
            const newData=[]
            data.forEach(e => {
                if(e.email !== email){
                    newData.push({...e})
                }
            });
            setDataUsers(newData)
        }).catch(err=>console.log(err))
    }
    
    const logOut=()=>{
        localStorage.clear();
        history.push('/Dashboard');
    }

    const cekUser=async()=>{
        const emailUser = localStorage.getItem('email')
        // console.log(email)
        if(emailUser !== 0){
            // console.log(email)
            const email = {'email':emailUser}
            await Axios.post(BASE_URL+`/users/detile`, email)
            .then(res=>{
                if(res.data[0].level !== 'admin'){
                    history.push('/Dashboard')
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
        getUsers()
        cekUser()
        timeClearLocalStorage()
        setTimeout(logOut, 7200000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])

    return(
        <div className="containers-dashboard">
            <header className="header">
                <h1 className="header-title">Dashboard Admin</h1>
                <button onClick={()=>{logOut()}} type="button" className="btn btn-outline-warning logOut">Log Out</button>
            </header>
            <div className="sideBar">
                <img onClick={()=> setContentData(true)} className="icon-sideBar-admin" src={require('../../asset/img/icons8-bookmark-50.png')} alt=""/>
                <img onClick={()=> setContentData(false)} className="icon-sideBar-admin" src={require('../../asset/img/users.png')} alt=""/>
            </div>
            <div className="rightBar">
                <p>rightBar</p>
            </div>
            <div className="contents">
                {
                    contentData ? (
                        <>
                            <div className="listContent">
                                <img className="imgContent" src={require('../../asset/img/theshackbook2.jpg')} alt=""/>
                                <p className="titleImg">The Shuck</p>
                            </div> 
                            <div className="listContent">
                                <img className="imgContent" src={require('../../asset/img/theshackbook2.jpg')} alt=""/>
                                <p className="titleImg">The Shuck</p>
                            </div> 
                            <div className="listContent">
                                <img className="imgContent" src={require('../../asset/img/theshackbook2.jpg')} alt=""/>
                                <p className="titleImg">The Shuck</p>
                            </div> 
                        </>
                    ):(
                        <div className="contents-user">
                            <h3 className="title-daftar-users">Daftar User</h3>
                                <table class="table1">
                                    <tr>
                                        <th>Id User</th>
                                        <th>Username</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                            {   
                                dataUsers.map(post=>{
                                    return(
                                        <tr key={post.id_user}>
                                            <td>{post.id_user}</td>
                                            <td>{post.username}</td>
                                            <td>{post.email}</td>
                                            <td>{post.level}</td>
                                            <td><span className="action-table">Update </span>| <span className="action-table">Delete</span></td>
                                        </tr>
                                    )
                                })
                            }
                            </table>
                        </div>
                    )
                }
                
            </div>
        </div>
    )
}

export default DashboardAdmin;
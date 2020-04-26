import React, {useState, useEffect} from 'react';
// import {useDispatch} from 'react-redux';
import '../style/Login.css';
import Axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
const Register =()=>{
    const BASE_URL = 'http://192.168.1.12:4000';
    let history = useHistory();

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const dispatch = useDispatch();
    const handelInput = () =>{
        if(email.length > 0 && password.length > 0 && username.length > 0){
            var atps=email.indexOf("@");
            var dots=email.lastIndexOf(".");
            if (atps<1 || dots<atps+2 || dots+2>=email.length) {
                alert("Alamat email tidak valid.");
                return false;
            } else {
                // alert("Alamat email valid.");
                const data = {
                    'username': username,
                    'email': email,
                    'password': password,
                    'level': 'user',
                    'verify': 0,
                }
                Axios.get(BASE_URL+`/users`)
                .then(res=>{
                    const dataUser = res.data
                    let status = false
                    dataUser.forEach(e => {
                        if(e.email === email){
                            status = true
                        }
                    });
                    if(status === false){
                        Axios.post(BASE_URL+`/register`, data)
                        .then(res=>{
                            alert('Register success')
                            history.push('/')
                        }
                        )
                        .catch(err=>console.log(err))
                    }else{
                        setUsername('')
                        setEmail('')
                        setPassword('')
                        alert('Email is already registered')
                    }
                }).catch(err=>console.log(err))
            }
        }else{
            alert('Please enter your data')
        }
    }

    useEffect(()=>{
        const token = localStorage.getItem('token')
        if(token){
            history.push('/Dashboard')
        }
    })
    return(
        <div className="containers">
            {/* <img className="bg" src={require('./../../asset/img/Vector Abstract Blue Background.jpg')} alt=""/> */}
            <div className="background"></div>
            <div className="content">
                <h1 className="title-login">REGISTER</h1>
                <div className="formInput">
                    <div className="boxInput cf">
                        <img className="icon-input icon-email" src={require('../../asset/img/icons8-user-30.png')} alt=""/>
                        <input placeholder="Username" type="text" className="input-email" aria-describedby="emailHelp" value={username} onChange={(e)=> setUsername(e.target.value)} />
                    </div>
                    <div className="boxInput cf">
                        <img className="icon-input icon-email" src={require('../../asset/img/icons8-email-sign-50.png')} alt=""/>
                        <input placeholder="Email" type="email" className="input-email" aria-describedby="emailHelp" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                    <div className="boxInput">
                        <img className="icon-input icon-password" src={require('../../asset/img/icons8-password-24.png')} alt=""/>
                        <input placeholder="Password" type="password" className="input-email" aria-describedby="emailHelp" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    <button onClick={()=> handelInput()} type="button" className="btn btn-primary btn-lg btn-block btn-login">Register</button>
                    <Link className="Link" to="/">
                        <p className="title-new-regis">Back to Login</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register;
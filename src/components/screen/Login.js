import React, {useState, useEffect} from 'react';
// import {useDispatch} from 'react-redux';
import '../style/Login.css';
import Axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
const Login =()=>{
    const BASE_URL = 'http://192.168.1.12:4000';
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const dispatch = useDispatch();
    const handelInput = () =>{
        if(email.length > 0 && password.length > 0){
            var atps=email.indexOf("@");
            var dots=email.lastIndexOf(".");
            if (atps<1 || dots<atps+2 || dots+2>=email.length) {
                alert("Alamat email tidak valid.");
                return false;
            } else {
                // alert("Alamat email valid.");
                const data = {
                    'email': email,
                    'password': password
                }
                Axios.post(BASE_URL+`/login`, data)
                .then(res=>{
                    // console.log('data saya'+res.data)
                    // dispatch(login(res.data))
                    const token = res.data.token
                    const level = res.data.level
                    if(token !== 0){
                        localStorage.setItem('token', token)
                        localStorage.setItem('email', email)
                        localStorage.setItem('saved', new Date().getTime())
                        if(level === 'admin'){
                            history.push('/Dashboard-admin',res.data)
                        }else{
                            history.push('/Dashboard',res.data)
                        }
                    }
                }
                )
                .catch(err=>console.log(err))
                // console.log(input)
            }
        }else{
            alert('Kosong')
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
            <img className="bg" src={require('./../../asset/img/Vector Abstract Blue Background.jpg')} alt=""/>
            <div className="content">
                <h1 className="title-login">LOGIN</h1>
                <div className="formInput">
                    <div className="boxInput cf">
                        <img className="icon-input icon-email" src={require('../../asset/img/icons8-email-sign-50.png')} alt=""/>
                        <input placeholder="Email" type="email" className="input-email" aria-describedby="emailHelp" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                    <div className="boxInput">
                        <img className="icon-input icon-password" src={require('../../asset/img/icons8-password-24.png')} alt=""/>
                        <input placeholder="Password" type="password" className="input-email" aria-describedby="emailHelp" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    <button onClick={()=> handelInput()} type="button" className="btn btn-primary btn-lg btn-block btn-login">Login</button>
                    <Link className="Link" to="/Register">
                        <p className="title-new-regis">New Register</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login;
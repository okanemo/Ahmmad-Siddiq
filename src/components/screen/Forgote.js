import React, {useState, useEffect} from 'react';
// import {useDispatch} from 'react-redux';
import '../style/Login.css';
import Axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
const Register =()=>{
    const BASE_URL = 'http://192.168.1.12:4000';
    let history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    // const dispatch = useDispatch();
    const handelInput = () =>{
        if(email.length > 0 && password.length > 0 && newpassword.length >0){
            var atps=email.indexOf("@");
            var dots=email.lastIndexOf(".");
            if (atps<1 || dots<atps+2 || dots+2>=email.length) {
                alert("Alamat email tidak valid.");
                return false;
            } else {
                // alert("Alamat email valid.");
                const data = {
                    'email': email,
                    'password': password,
                    'newpassword': newpassword,
                    'level': 'user'
                }
                if(data.password === data.newpassword){
                    // Axios.post(BASE_URL+`/users/detile`, data)
                    // .then(res=>{
                    //     console.log(res.data[0])
                        Axios.patch(BASE_URL+`/update/users`, data)
                        .then(res=>{
                            console.log('masuk', res)
                        }
                        )
                        .catch(err=>console.log(err))
                    // }
                    // )
                    // .catch(err=>console.log(err))
                }else{
                    alert('Passwords are not the same')
                }
                // console.log(input)
            }
        }else{
            alert('Empty')
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
                <h1 className="title-login">PASSWORD</h1>
                <div className="formInput">
                    <div className="boxInput cf">
                        <img className="icon-input icon-email" src={require('../../asset/img/icons8-email-sign-50.png')} alt=""/>
                        <input placeholder="Email" type="email" className="input-email" aria-describedby="emailHelp" value={email} onChange={(e)=> setEmail(e.target.value)} />
                    </div>
                    <div className="boxInput">
                        <img className="icon-input icon-password" src={require('../../asset/img/icons8-password-24.png')} alt=""/>
                        <input placeholder="Password" type="password" className="input-email" aria-describedby="emailHelp" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    <div className="boxInput">
                        <img className="icon-input icon-password" src={require('../../asset/img/icons8-password-24.png')} alt=""/>
                        <input placeholder="New Password" type="password" className="input-email" aria-describedby="emailHelp" value={newpassword} onChange={(e)=> setNewPassword(e.target.value)} />
                    </div>
                    <button onClick={()=> handelInput()} type="button" className="btn btn-primary btn-lg btn-block btn-login">SUBMIT</button>
                    <Link className="Link" to="/">
                        <p className="title-new-regis">Back to Login</p>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register;
import React, {useState, useEffect} from 'react';
// import {useDispatch} from 'react-redux';
import '../style/Login.css';
import Axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
const Register =()=>{
    const BASE_URL = 'http://192.168.1.12:4000';
    let history = useHistory();

    const [codes, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [newpassword, setNewPassword] = useState('');
    // const dispatch = useDispatch();
    const handelInput = () =>{
        if(setCode.length > 0 && password.length > 0 && newpassword.length >0){
                const data = {
                    'code': codes,
                    'password': password,
                }
                if(password === newpassword){
                    // console.log(codes)
                    Axios.post(BASE_URL+`/getcode`, data)
                    .then(res=>{
                        if(res.data.length > 0){
                            const email = res.data[0].email
                            const input = {email,password}
                            Axios.patch(BASE_URL+'/update/password', input)
                            .then(res=>{
                                Axios.delete(BASE_URL+`/delete/code/${email}`)
                                .then(res=>{
                                    alert('Success...!!!')
                                    history.push('/')
                                }).catch(err=>console.log(err))
                            }).catch(err=>console.log(err))
                        }else{
                            alert('Code wrong')
                        }
                        
                    }).catch(err=>console.log(err))
                    // console.log(data)
                    // alert('masuk')
                }else{
                    alert('Passwords are not the same')
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
                        <img className="icon-input icon-email" src={require('../../asset/img/icons8-pin-code-50.png')} alt=""/>
                        <input placeholder="Enter your code" type="text" className="input-email" aria-describedby="emailHelp" value={codes} onChange={(e)=> setCode(e.target.value)} />
                    </div>
                    <div className="boxInput">
                        <img className="icon-input icon-password" src={require('../../asset/img/icons8-password-24.png')} alt=""/>
                        <input placeholder="New Password" type="password" className="input-email" aria-describedby="emailHelp" value={password} onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    <div className="boxInput">
                        <img className="icon-input icon-password" src={require('../../asset/img/icons8-password-24.png')} alt=""/>
                        <input placeholder="Repeat password" type="password" className="input-email" aria-describedby="emailHelp" value={newpassword} onChange={(e)=> setNewPassword(e.target.value)} />
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
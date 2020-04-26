import React, {useState, useEffect} from 'react';
// import {useDispatch} from 'react-redux';
import '../style/Login.css';
import Axios from 'axios';
import {useHistory, Link} from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';

const Login =()=>{
    const BASE_URL = 'http://192.168.1.12:4000';
    let history = useHistory();
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState('');
    const [emailModal, setEmailModal] = useState('');
    const [password, setPassword] = useState('');
    const handleClose = () => setShow(false);
    const handleShow = (id_users) => {
        setShow(true);
    }

    const handelInput = () =>{
        if(email.length > 0 && password.length > 0){
            var atps=email.indexOf("@");
            var dots=email.lastIndexOf(".");
            if (atps<1 || dots<atps+2 || dots+2>=email.length) {
                alert("Alamat email tidak valid.");
                return false;
            } else {
                const data = {
                    'email': email,
                    'password': password
                }
                Axios.post(BASE_URL+`/login`, data)
                .then(res=>{
                    const token = res.data.token
                    const level = res.data.level
                    if(res.data !== 0){
                        if(res.data !== 1){
                            if(res.data.verify !== 0){
                                localStorage.setItem('token', token)
                                localStorage.setItem('email', email)
                                localStorage.setItem('saved', new Date().getTime())
                                if(level === 'admin'){
                                    history.push('/Dashboard-admin',res.data)
                                }else{
                                    history.push('/Dashboard',res.data)
                                }
                            }else{
                                alert('Email has not been verified...!')
                            }
                        }else{
                            alert('password wrong...!')
                        }
                    }else{
                        alert('email wrong...!')
                    }
                }
                )
                .catch(err=>console.log(err))
            }
        }else{
            alert('Kosong')
        }
    }

    const cekEmail =async()=>{
        if(emailModal.length > 0){
            var atps=emailModal.indexOf("@");
            var dots=emailModal.lastIndexOf(".");
            if (atps<1 || dots<atps+2 || dots+2>=emailModal.length) {
                alert("Invalid email...!");
                return false;
            }else{
                const data = {'email': emailModal}
                Axios.get(BASE_URL+'/users')
                .then(res=>{
                    const dataUser = res.data
                    let status = false
                    dataUser.forEach(e => {
                        if(e.email === emailModal){
                            status = true
                        }
                    });
                    if(status === false){
                        alert('Email belum terdaftar')
                    }else{
                        Axios.post(BASE_URL+'/forgote', data)
                        .then(res=>{
                            alert('Check email for verification')
                            handleClose()
                            setEmailModal('')
                        }).catch(err=>console.log(err))
                    }
                })
            }
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
                        <span onClick={handleShow} className="title-forgote">Forgote Password</span>
                    <Link className="Link" to="/Register">
                        <p className="title-new-regis">New Register</p>
                    </Link>
                </div>
            </div>
            {/* modal add item */}
            <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>ENTER EMAIL</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Email</Form.Label>
                        <Form.Control value={emailModal} onChange={(e)=>setEmailModal(e.target.value)} type="text" placeholder="Enter email" />
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cencel
                    </Button>
                    <Button variant="primary" onClick={()=>cekEmail()}>
                        SUBMIT
                    </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default Login;
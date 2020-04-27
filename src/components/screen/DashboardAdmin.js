import React, {useEffect, useState} from 'react';
import '../style/DashboardAdmin.css';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
require('dotenv').config();

const DashboardAdmin =()=>{
    let history = useHistory();
    const BASE_URL = 'http://192.168.1.12:4000';

    const [contentData, setContentData] = useState(true);
    const [dataUsers, setDataUsers] = useState([])
    const [nameUser, setNameUser] = useState([])
    const [show, setShow] = useState(false);
    const [modalOk, setModalOk] = useState(false);
    const [ModaldeleteProduct, setDeleteProduct] = useState(false);
    const [modalUpdate, setModalUpdate] = useState(false);
    const [modalAddItem, setModalAddItem] = useState(false);
    const [id_user, setId] = useState(false);
    const [idProduct, setIdProduct] = useState(false);
    const [detileUser, setDetileUser] = useState([]);
    const [dataContent, setDataContent] = useState([]);
    const [reading, setReading] = useState([]);
    const [product, setProduct] = useState('');
    const [inputUsername, setUsername] = useState('');
    const [inputStatus, SetSatus] = useState('');

    const handleModalProduct = (data) => {
        setIdProduct(data.id_product)
        setDeleteProduct(true)
    }
    const handleModalProductClose = () => setDeleteProduct(false)
    const handleModaAddItem = () => setModalAddItem(true)
    const handleModaAddItemClose = () => setModalAddItem(false)
    const handleUpdateClose = () => setModalUpdate(false)
    const handleOk = () => setModalOk(true)
    const handleOkClose = () => {
        setModalOk(false)
        history.push('/')
    }
    const handleClose = () => setShow(false);
    const handleShow = (id_users) => {
        setShow(true);
        setId(id_users)
    }

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
        if(emailUser){
            const email = {'email':emailUser}
            await Axios.post(BASE_URL+`/users/detile`, email,{
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(res=>{
                setNameUser(res.data[0].username)
                if(res.data[0].level !== 'admin'){
                    history.push('/Dashboard')
                }
            }).catch(err=> console.log(err))
        }
    }

    const handleAdd = (e)=>{
        let formProductNew={...product};
        if(e.target.name==='image'){
            formProductNew[e.target.name]=e.target.files[0];
        }else{
            formProductNew[e.target.name]=e.target.value;
        }
        setProduct(formProductNew)
    }

    const addItem = async()=>{
        // const dataProduct = product
        const data = new FormData();
        // console.log(data)
        data.append('image', product.image);
        data.set('product_name', product.product_name);
        data.set('description', product.description);
        Axios.post(BASE_URL+'/insert', data,{
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(res=>{
            if(res.data){
                alert('Add item Success')
                handleModaAddItemClose()
                history.push('/')
            }
        })
        .catch(err=>console.log(err))
    }

    const handleUpdateUser= async()=>{
        const data = {
            username: inputUsername ? inputUsername : detileUser.username,
            email: detileUser.email,
            password: detileUser.password,
            level: inputStatus ? inputStatus : detileUser.level
        }
        Axios.patch(BASE_URL+'/update/users',data,{
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(res=>{
            if(res.data.affectedRows){
                alert('Success')
                handleUpdateClose()
                history.push('/')
            }
        }).catch(err=> console.log(err))
    }

    const updateUser =async(dataDetileUser)=>{
        setModalUpdate(true)
        setDetileUser(dataDetileUser)
    }

    const deleteUser = async ()=>{
        handleClose()
        Axios.delete(BASE_URL+`/delete/users/${id_user}`,{
            headers:{
                token: localStorage.getItem('token')
            }
        }).then(res=>{
            if(res.data.affectedRows){
                handleOk();
            }
        })
    }

    const getContenData = async()=>{
        Axios.get(BASE_URL+'/dasbord',{
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(res=>{
            setDataContent(res.data)
        }).catch(err=>console.log(err))
    }

    const setToReading =(data)=>{
        setReading(data)
    }

    const timeClearLocalStorage=()=>{
        // let hours = 2
        let saved = localStorage.getItem('saved')
        // if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
        if (saved && (new Date().getTime() - saved > 900000)) {
            logOut()
        }
    }

    const deleteContent = async ()=>{
        Axios.delete(BASE_URL+`/delete/${idProduct}`,{
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(res=>{
            alert('Success')
            handleModalProductClose()
            history.push('/')
        }).catch(err=>console.log(err))
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token === 0 || token === undefined || token === null){
            history.push('/')
        }
        getContenData()
        getUsers()
        cekUser()
        timeClearLocalStorage()
        setTimeout(logOut, 900000)
        return ()=>{
            setTimeout(logOut, 900000)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])


    return(
        <div className="containers-dashboard">
            <header className="header">
                <h1 className="header-title">Dashboard Admin</h1>
                <h3 className="nam-user">{nameUser}</h3>
                <button onClick={()=>{logOut()}} type="button" className="btn btn-outline-warning logOut">Log Out</button>
            </header>
            <div className="sideBar">
                <img onClick={()=> setContentData(true)} className="icon-sideBar-admin" src={require('../../asset/img/icons8-bookmark-50.png')} alt=""/>
                <img onClick={()=> setContentData(false)} className="icon-sideBar-admin" src={require('../../asset/img/users.png')} alt=""/>
            </div>
            <div className="rightBar">
                <h4 className="reading">Reading Column</h4>
                <div className="content-reading">
                    {
                        reading.length !== 0 ? (
                            <>
                            <img className='img-reading' src={reading.image} alt=""/>
                            <h5>{reading.product_name}</h5>
                            <p className="text-reading">{reading.description}</p>
                            </>
                        ) : <div className="empty">Empty</div>
                    }
                </div>
            </div>
            <div className="contents">
                {
                    contentData ? (
                        <>
                        <Button onClick={handleModaAddItem} className="btnAdd">Add Item</Button>
                        <h3 className="title-daftar-users">List Content</h3>

                        {
                            dataContent.map(post=>{
                                return(
                                    <div key={post.id_product} className="listContent">
                                        <img onClick={()=>setToReading(post)} className="imgContent" src={post.image} alt=""/>
                                        <p className="titleImg">{post.product_name}</p>
                                        <img onClick={()=>handleModalProduct(post)} className="imgDelet" src={require('../../asset/img/icons8-delete-bin-24.png')} alt=""/>
                                    </div> 
                                )
                            })
                        }
                            
                        </>
                    ):(
                        <div className="contents-user">
                            <h3 className="title-daftar-users">Daftar User</h3>
                                <table className="table1">
                                <tbody>
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
                                            <td><span onClick={()=>updateUser(post)} className="action-table">Update </span>| <span onClick={()=>handleShow(post.id_user)} className="action-table">Delete</span></td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                            </table>
                        </div>
                    )
                }
                </div>
                {/* Modal delete */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>DELETE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cencel
                    </Button>
                    <Button variant="danger" onClick={()=>deleteUser()}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* modal delete ok */}
                <Modal show={modalOk} onHide={handleOkClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>SUCCESS</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Your data has been deleted!</Modal.Body>
                    <Modal.Footer>
                    <Button variant="Success" onClick={handleOkClose}>
                        OK
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* modal update */}
                <Modal show={modalUpdate} onHide={handleUpdateClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>UPDATE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Username</Form.Label>
                        <Form.Control defaultValue={detileUser.username} onChange={(e)=>setUsername(e.target.value)} type="email" placeholder="Enter username" />
                        <Form.Label>Status</Form.Label>
                        <Form.Control as="select" defaultValue={detileUser.level} onChange={(e)=>SetSatus(e.target.value)} custom>
                            <option>Select</option>
                            <option value="user">user</option>
                            <option value="admin">admin</option>
                        </Form.Control>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleUpdateClose}>
                        Cencel
                    </Button>
                    <Button variant="primary" onClick={()=>handleUpdateUser()}>
                        Update
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* modal add item */}
                <Modal show={modalAddItem} onHide={handleModaAddItemClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>ADD ITEM</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control name="product_name" onChange={handleAdd} type="text" placeholder="Enter product name" />
                        <Form.Label>Description</Form.Label>
                        <Form.Control name="description" onChange={handleAdd} type="text" placeholder="Enter description" />
                        <Form.Label>Image</Form.Label>
                        <Form.Control name="image" onChange={handleAdd} type="file"/>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleModaAddItemClose}>
                        Cencel
                    </Button>
                    <Button variant="primary" onClick={()=>addItem()}>
                        ADD
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* modal delete product */}
                <Modal show={ModaldeleteProduct} onHide={handleModalProductClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>DELETE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalProductClose}>
                        Cencel
                    </Button>
                    <Button variant="danger" onClick={()=>deleteContent()}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default DashboardAdmin;
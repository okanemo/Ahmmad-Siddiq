import React, {useEffect, useState} from 'react';
import '../style/Dashboard.css';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
require('dotenv').config();

const Dashboard =()=>{
    let history = useHistory();
    const BASE_URL = 'http://192.168.1.12:4000';

    const [contentData, setContentData] = useState(true);
    const [nameUser, setNameUser] = useState([])
    const [show, setShow] = useState(false);
    const [ModaldeleteProduct, setDeleteProduct] = useState(false);
    const [idProduct, setId] = useState('');
    const [dataFafovorite, setInsertFavorite] = useState(false);
    const [dataContent, setDataContent] = useState([]);
    const [dataFavorite, setDataFavorite] = useState([]);

    const [reading, setReading] = useState([]);


    const handleModalProduct = (data) => {
        setInsertFavorite(data)
        setDeleteProduct(true)
    }
    const handleModalProductClose = () => setDeleteProduct(false)

    const handleClose = () => setShow(false);
    const handleShow = (id_product) => {
        setShow(true);
        // console.log(id_product)
        setId(id_product)
    }

    const logOut=()=>{
        localStorage.clear();
        history.push('/');
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
                if(res.data[0].level !== 'user'){
                    history.push('/Dashboard-admin')
                }
                // console.log(res.data[0].level)
            }).catch(err=> console.log(err))
        }
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
        // let hours = 1
        
        let saved = localStorage.getItem('saved')
        // if (saved && (new Date().getTime() - saved > hours * 60 * 60 * 1000)) {
        if (saved && (new Date().getTime() - saved > 900000)) {
            logOut()
        }
    }

    const insertFavorite = async ()=>{
        const dataInput = {
            product_name:dataFafovorite.product_name,
            description: dataFafovorite.description,
            email: localStorage.getItem('email')
        }
        // console.log(dataInput)
        Axios.post(BASE_URL+`/insert/favorite`,dataInput,{
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(res=>{
            // console.log(res)
            alert('Success')
            handleModalProductClose()
            history.push('/')
        }).catch(err=>console.log(err))
    }

    const getDaftarFavorite = async() =>{
        const data = {email:localStorage.getItem('email')}
        if(data){
            Axios.post(BASE_URL+'/favorite',data,{
                headers:{
                    token: localStorage.getItem('token')
                }
            })
            .then(res=>{
                setDataFavorite(res.data)
            }).catch(err=>console.log(err))
        }
    }

    const deleteFavorite = async()=>{
        const id = idProduct.id_favorite
        // console.log(data)
        Axios.delete(BASE_URL+`/delete/favorite/${id}`,{
            headers:{
                token: localStorage.getItem('token')
            }
        })
        .then(res=>{
            handleClose()
            alert('Delete Success...!');
            history.push('/')
            // setContentData(false)
        })
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token === 0 || token === undefined || token === null){
            history.push('/')
        }
        getContenData()
        getDaftarFavorite()
        cekUser()
        timeClearLocalStorage()
        setTimeout(()=>{logOut()}, 900000)
        return ()=>{
            setTimeout(()=>{logOut()}, 900000)
            timeClearLocalStorage()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return(
        <div className="containers-dashboard">
            <header className="header">
                <h1 className="header-title">Dashboard User</h1>
                <h3 className="nam-user">{nameUser}</h3>
                <button onClick={()=>{logOut()}} type="button" className="btn btn-outline-warning logOut">Log Out</button>
            </header>
            <div className="sideBar">
                <img onClick={()=> setContentData(true)} className="icon-sideBar-admin" src={require('../../asset/img/icons8-bookmark-50.png')} alt=""/>
                <img onClick={()=> setContentData(false)} className="icon-sideBar-admin" src={require('../../asset/img/icons8-favorite-folder-50.png')} alt=""/>
            </div>
            <div className="rightBar">
                <h4 className="reading">Reading Column</h4>
                <div className="content-reading">
                    {
                        reading.length !== 0 ? (
                            <>
                            <img className='img-reading' src={require('../../asset/img/theshackbook2.jpg')} alt=""/>
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
                        <h3 className="title-daftar-users">List Content</h3>

                        {
                            dataContent.map(post=>{
                                return(
                                    <div key={post.id_product} className="listContent">
                                        <img onClick={()=>setToReading(post)} className="imgContent" src={require('../../asset/img/theshackbook2.jpg')} alt=""/>
                                        <p className="titleImg">{post.product_name}</p>
                                        <img onClick={()=>handleModalProduct(post)} className="imgHeart" src={require('../../asset/img/icons8-heart-50.png')} alt=""/>
                                    </div> 
                                )
                            })
                        }
                            
                        </>
                    ):(
                        <div className="contents-user">
                            <h3 className="title-daftar-users">Daftar Favorite</h3>
                            {
                            dataFavorite.map(post=>{
                                return(
                                    <div key={post.id_favorite} className="listContent">
                                        <img onClick={()=>setToReading(post)} className="imgContent" src={require('../../asset/img/theshackbook2.jpg')} alt=""/>
                                        <p className="titleImg">{post.product_name}</p>
                                        <img onClick={()=>handleShow(post)} className="imgDelet" src={require('../../asset/img/icons8-delete-bin-24.png')} alt=""/>
                                    </div> 
                                )
                            })
                        }
                        </div>
                    )
                }
                
                </div>
                {/* Modal delete */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to add this ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cencel
                    </Button>
                    <Button variant="danger" onClick={()=>deleteFavorite()}>
                        Delete
                    </Button>
                    </Modal.Footer>
                </Modal>

                {/* modal delete product */}
                <Modal show={ModaldeleteProduct} onHide={handleModalProductClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>ADD FAVORITE</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to add this ?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={handleModalProductClose}>
                        Cencel
                    </Button>
                    <Button variant="success" onClick={()=>insertFavorite()} >
                        ADD
                    </Button>
                    </Modal.Footer>
                </Modal>
        </div>
    )
}

export default Dashboard;
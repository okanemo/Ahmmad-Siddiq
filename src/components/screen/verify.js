import React, {useState, useEffect} from 'react';
import '../style/verify.css';
import { Button } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';


function AlertDismissible() {
    const [show, setShow] = useState(true);
    let history = useHistory();

    const gotoLogin=()=>{
        history.push('/')
    }
    
    useEffect(()=>{
        setTimeout(()=>{setShow(false)}, 8000)
    },[])
    return (
      <>
      {
          show ? 
          <div className="box-loading">
              <img className="lodaing-verify" src={require('../../asset/img/loading.gif')} alt=""/> 
          </div>
          :
          <div className="container-verify">
            <h2 className="title-verify">Verification Success...!</h2>
            <Button onClick={()=>gotoLogin()} variant="success">Back to Login</Button>
        </div>
      }
        
      </>
    );
  }

export default AlertDismissible;
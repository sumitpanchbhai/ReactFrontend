import React,{useState} from 'react';
import './style/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
    const [userDetail,setDetail] = useState({})
    function handleInput(event){
        console.log(event.target.name,event.target.value)
        setDetail({...userDetail,[event.target.name]:event.target.value})

    }

    function submitForm(event){
        event.preventDefault();
        console.log(userDetail)
        if (userDetail.password==='' || userDetail.username==='' || userDetail.password===undefined || userDetail.username===undefined){
          toast.error("please fill the input",{position:'top-center'})
      }
      if (userDetail.password!=='' && userDetail.username!=='' && userDetail.password!==undefined && userDetail.username!==undefined){

          toast.info(`${userDetail.username} user is loged in`,{position:'top-center'})
      }
    }
  return (
    <div className='main-container'>
      <ToastContainer />
      <div className='loginForm'>
        <h1>Login</h1>
        <form action="" className='Actualogin'>
          <div className='inputField'>
            <input type="text" placeholder='Username' name='username' style={{padding:'10px 25px'}} onChange={handleInput} autoComplete='off'/>
          </div>
          <div className='inputField'>
            <input type="password" placeholder='Password'  name='password' style={{padding:'10px 25px'}} onChange={handleInput} autoComplete='off'/>
          </div>
          <div className='loginButton'>
          <button style={{padding:'10px 25px'}} onClick={submitForm}>
            Login
          </button>
          </div>
          <a href="/">sign up?</a>
        </form>
      </div>
      
    </div>
  );
}

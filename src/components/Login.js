import React,{useState } from 'react';
import './style/Login.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AiFillEye ,AiFillEyeInvisible} from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';
import WebSocketClient from './WebSocketClient';
const {sendMessage} = WebSocketClient();

export default function Login() {
  const [passwordshoIcon,setPasswordshoIcon] = useState(false)
  const location = useNavigate();


    const [userDetail,setDetail] = useState({})
    function handleInput(event){
        // console.log(event.target.name,event.target.value)
        setDetail({...userDetail,[event.target.name]:event.target.value})

    }

    function decodeHAsh(token){
      try {
        const decodedToken = jwt_decode(token, process.env.JWT_SECRET_KEY);
        console.log("decodedToken",decodedToken.userId); // This will print the decoded payload
        sessionStorage.setItem('userID',decodedToken.userId)
      } catch (error) {
        console.error('Error decoding JWT token:', error);
      }
    }

    async function submitForm(event){
        event.preventDefault();
        console.log("userDetail")
        if (userDetail.password==='' || userDetail.username==='' || userDetail.password===undefined || userDetail.username===undefined){
          toast.error("please fill the input",{position:'top-center'})
      }
      if (userDetail.password!=='' && userDetail.username!=='' && userDetail.password!==undefined && userDetail.username!==undefined){

          await  axios.post('http://192.168.2.60:5000/login',userDetail)
              .then(response => {
                console.log('Error fetching data:', response.data.status);
                if (response.data.status===true){
                  toast.success(`${response.data.message}` ,{position:'top-center'} )
                  sessionStorage.setItem('Token', response.data.token);
                  console.log(response.data.token)
                  decodeHAsh(sessionStorage.getItem('Token'))
                  sendMessage({'token':sessionStorage.getItem('Token')})
                  location('/');
                }else{
                  toast.error(`${response.data.message}`,{position:'top-center'})
                }

              })
              .catch(error => {
                console.error('Error fetching data:', error);
                toast.info(`Internal Error of ${error}`,{position:'top-center'})

              });
          }
    }

    function showpassword(){
      var x = document.getElementById('password')
      if (x.type==='text'){
          x.type = 'password'
          setPasswordshoIcon(false)
      }else{
          x.type = 'text'
          setPasswordshoIcon(true)
      }}
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
            <input type="password" id='password' placeholder='Password'  name='password' style={{padding:'10px 25px'}} onChange={handleInput} autoComplete='off'/>
          </div>

          <div>
          <span onClick={showpassword}>
            {
                passwordshoIcon?<AiFillEye size={20} />:<AiFillEyeInvisible size={20} />
            }
            </span>
          </div>

          <div className='loginButton'>
          <button style={{padding:'10px 25px'}} onClick={submitForm}>
            Login
          </button>
          </div>
          <a href='/signup'>sign up?</a>
          
        </form>
      </div>
      
    </div>
  );
}

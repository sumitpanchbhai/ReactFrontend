import React,{useState} from 'react'
import './style/Signup.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AiFillEye ,AiFillEyeInvisible} from "react-icons/ai";
import {useNavigate} from "react-router-dom"
export default function Signup() {
    const location = useNavigate();

    const [userDetail,setDetail] = useState({})
    const [passwordshoIcon,setPasswordshoIcon] = useState(false)
    // let location  = useLocation();
    function handleInput(event){
        console.log(event.target.name,event.target.value)
        setDetail({...userDetail,[event.target.name]:event.target.value})

    }

    function submitForm(event){
        event.preventDefault();
        console.log(userDetail)
        if (userDetail.password===undefined || userDetail.newusername===undefined||  userDetail.confirmpassword===undefined){
            toast.error("please fill the input",{position:'top-center'})
        }
        if (userDetail.password!==userDetail.confirmpassword && userDetail.confirmpassword!=='' && userDetail.password!==''){
            toast.error("password does not match",{position:'top-center'});
        }
        else if (userDetail.password===userDetail.confirmpassword && userDetail.newusername!==undefined){

            toast.info(`${userDetail.newusername} user is created`, {position:'top-center'})
            location('/');
        }
    }

    function showpassword(){
        var x = document.getElementById('password')
        var y = document.getElementById('confirmpassword')
        if (x.type==='text' && y.type==='text'){
            x.type = 'password'
            y.type = 'password'
            setPasswordshoIcon(false)
        }else{
            x.type = 'text'
            y.type = 'text'
            setPasswordshoIcon(true)
        }
        
    }
  return (
    <div className='main-container'>
        <ToastContainer/>
      <div className='loginForm'>
        <h1>Create New User</h1>
        <form action="" className='Actualogin'>
          <div className='inputField'>
            <input type="text" placeholder='create username' name='newusername' style={{padding:'10px 25px'}} onChange={handleInput} autoComplete='off'/>
          </div>

          <div className='inputField'>
            <input type="password" id="password" placeholder='choose password' name='password' style={{padding:'10px 25px'}} onChange={handleInput} autoComplete='off'/>
          </div>

          <div className='inputField'>
            <input type="password" placeholder='confirm password' id='confirmpassword'  name='confirmpassword' style={{padding:'10px 25px'}} onChange={handleInput} autoComplete='off'/>
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
            Sign Up
          </button>
          </div>
          <a href="/">Login Page</a>
        </form>
      </div>
      
    </div>
  )
}

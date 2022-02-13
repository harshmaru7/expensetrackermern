import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import GoogleLogin from 'react-google-login';

import '../styles/login.css'

function App() {
  const navigate = useNavigate();
  const [username,setUsername] = useState('')
  const [password,setPassword] = useState('')
  const [email,setEmail] = useState('')


  async function loginUser(event){
    event.preventDefault()
    const response = await fetch('https://expense-trackermern.herokuapp.com/api/login',{
      method:'POST',
      headers:{
        'Content-Type' : 'application/json',
      },body : JSON.stringify({
        username,
        password
      })
    })

    const data = await response.json()
    if(data.user){
      localStorage.setItem('token',data.user)
      navigate('/dashboard')
    }
    else{
      alert('Please check username and password !')
    }
  }

  async function registerUserGoogle(username,email,password){
    const response = await fetch('https://expense-trackermern.herokuapp.com/api/registergoogle',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify({
        username,
        email,
        password
      })
    })

    const data = await response.json()
    if(data.status === 'ok'){
      localStorage.setItem('token',data.user)
      navigate('/dashboard')
      //navigate('/dashboard')
    }

  }

  const responseGoogle=(response)=>{
    console.log(response);
    console.log(response.profileObj)
    if(response.profileObj){
      let user_name = response.profileObj.name 
      let email_ = response.profileObj.email
      let password_ = response.profileObj.googleId
      //console.log(user_name,password_,email_)
      registerUserGoogle(user_name,email_,password_)
    }
    //navigate('/dashboard')
  }

  return (
    <div className='main'>
      <div class="login-brandname">TrackPay<p className='login-usecase'>We help you track your expenses and save.</p></div>
    <div>
      <form onSubmit={loginUser} className="login-form">
      {/* <div className="form-title">Login</div> */}
      <label>Username</label>
        <input
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className='login-forminput'
        /><br/>
        <label>Password</label>
        <input 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className='login-forminput'
        />
        <br/>
        <input type="submit" className='loginbutton' value="Sign In" />
        <br/>
        
        <GoogleLogin
          clientId="579352757127-c0uejmf35nu7uqdapbe8b5dk40f7ovsg.apps.googleusercontent.com"
          buttonText='Login'
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        /><br/>
        {/* <Link to="/register"><button class="registerb">New User?</button></Link> */}
        <Link to="/register">New User ? </Link>
      </form>
    </div>
    </div>
  );
}

export default App;

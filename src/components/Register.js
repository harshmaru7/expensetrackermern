import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../styles/register.css'

function App() {

  const navigate = useNavigate();

  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('') 

  async function registerUser(event){
    event.preventDefault()

    const response = await fetch('https://expense-trackermern.herokuapp.com/api/register',{
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
      navigate('/login')
    }

  }

  return (
    <div className='main'>
      <div class="register-brandname">TrackPay<p className='login-usecase'>We help you track your expenses and save.</p></div>
    <div>
      <form onSubmit={registerUser} className='register-form'>
      <div className="form-title">
        Create your account !
      </div>
      <label>Username</label>
        <input
          value={username}
          onChange={(e)=>setUsername(e.target.value)}
          type="text"
          placeholder="username"
          className='register-forminput'
        /><br/>
      <label className='email'>Email</label>
        <input
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
          type="text"
          placeholder="email"
          className='register-forminput'
        /><br/>
      <label>Password</label>  
        <input 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          type="password"
          placeholder="password"
          className='register-forminput'
        />
        <br/>
        <input className='registerbutton' type="submit" value="Register" />
        <br/>
        <Link to="/login">Already Registered ? </Link> 
      </form>
    </div>
    </div>
  );
}

export default App;

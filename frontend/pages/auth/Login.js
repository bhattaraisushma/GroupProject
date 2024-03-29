import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import { useCurrentState } from '../../components/CurrentState';

function Login() 
{

  const errorSimpllifier = {
    401: "Invalid Username or Password"
  }

  const router = useRouter();
  const {changeCurrentState} = useCurrentState()

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const [error,changeError] = useState("");

  const handleLogin = async (e)=>{
    const uninterceptedAxiosInstance = axios.create()
    e.preventDefault();
    const data = {
      username: username,
      password: password
    }  
    console.log(username,password);
    try {
      const response = await uninterceptedAxiosInstance.post('/auth/token', data)
      if (typeof window !== 'undefined') {
        localStorage.setItem('refresh-token', response.data.refresh)
        localStorage.setItem('access-token', response.data.access)
      }
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access
      console.log(response.data)
      changeCurrentState("loggedIn")
      router.push('/Dashboard')

    } catch (error) {
      console.log(error)
      changeError(errorSimpllifier[error.response.status])
    }
      
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form className='w-96 p-6 shadow-lg rounded-md bg-white'>
        <h1 className='text-3xl block text-center font-semibold'>
          Login
        </h1>
        <div className={`${!error && "hidden"} text-red-600 `}>{error}</div>
        <hr className='mt-3'></hr>
        <div className='mt-3'>
          <label htmlFor='username' className='block text-base mb-2'>Username</label>
          <input type='text' onChange={(e)=>setUsername(e.target.value)} id='username' className='border w-full text-base px-2 py-1 focus:outline-none focus:rind-0 focus:border-gray-600 bg-white' name='username' placeholder='Enter Username'></input>
        </div>
        <div className='mt-3'>
          <label htmlFor='password'  className='block text-base mb-2'>Password</label>
          <input type='password' onChange={(e)=>setPassword(e.target.value)} id='password' className='border w-full text-base px-2 py-1 focus:outline-none focus:rind-0 focus:border-gray-600 bg-white' name='password' placeholder='Enter Password'></input>
        </div>

        <button className='mt-3 rounded-full w-40 h-10 bg-[#734bf9] mb-2' value="Register" onClick={handleLogin}>Login</button>

      </form>
    </div>
  )
}

export default Login

Login.getLayout = function PageLayout(page){
  return (
    <>
      {page}
    </>
  )
}
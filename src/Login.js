import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const nav=useNavigate();
  return (
<>
      <div className=' grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 min-h-screen py-32 bg-black'>
        <img src="logo.gif" alt="logo" width={700} />
        <div className=" text-center space-y-7 m-10">
             <h1 className="text-white font-bold text-start">CREATE NEW ACCOUNT</h1>
             <input type="email" className="block my-2 p-2 w-full border-fuchsia-800 border-4" placeholder="Email or Username"/>
             <input type="password" className="block my-2 p-2 w-full border-emerald-300 border-4" placeholder="New Password"/>
             <input type="password" className="block my-2 p-2 w-full border-emerald-300 border-4" placeholder="Confirm Password"/>
             <h1 className='text-white text-start float-end'>Forget password?</h1><br/>
             <h1 className='text-white text-center p-2'>Already existing user? <span className='text-violet-500'>Login</span></h1>
             <button className=' bg-teal-400 px-6 py-2 rounded-xl bg-gradient-to-tr from-green-300 hover:animate-bounce' onClick={()=>{nav('/home')}}>SIGN UP</button>
           </div>
        </div>
    </>
  );
}

export default Login;

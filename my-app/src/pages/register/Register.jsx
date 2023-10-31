import React, { useEffect, useReducer, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { reducer, registerInit } from '../../services/RegisterReducer';
import { useRegisterMutation } from '../../slices/appApiSlice';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { ToastContainer, toast } from 'react-toastify';
const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, registerInit);
  const { fName, lName, email, userName, password, image } = state;
  const [register, {error, isError, isSuccess,isLoading }] = useRegisterMutation();
  const RegisterUser = async (e) => {
    e.preventDefault();
    let formDataBody = new FormData();
    formDataBody.append("fName", fName);
    formDataBody.append("lName", lName);
    formDataBody.append("userName", userName);
    formDataBody.append("email", email);
    formDataBody.append("password", password);
    formDataBody.append("image", image);
    register( formDataBody );
  }
  useEffect(() => {
    if (isError) {
    return toast.error(error.data.message, { autoClose: 2000 });
    }
    if (isSuccess) {
      toast.success("Register successfully", { autoClose: 2000 });
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    }
  }, [isSuccess]);
  return (
    <div className='register w-full min-h-screen bg-slate-100 flex items-center justify-center max-sm:px-[50px] sm:px-[30px] lg:px-0'>
      <div className=''>
        <h1 className=' text-center hidden max-sm:block text-3xl font-lobster font-medium'>Welcome To Vacation.</h1>
        <div className="card mt-4 flex lg:w-2/3  mx-auto rounded-md  overflow-hidden max-sm:w-full  max-sm:h-[500px] max-sm:items-center max-sm:justify-center sm:w-full">
          <div className="left flex-1 flex flex-col gap-[30px] justify-between px-[50px] py-[20px] max-sm:hidden">
            <h1 className='text-slate-100 font-lobster lg:text-3xl sm:text-2xl'>Welcome To Vacation.</h1>
            <p className='text-slate-100 font-lobster tracking-widest lg:text-[15px] sm:text-sm'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore placeat sequi quia itaque ipsam, esse voluptates eligendi dolorem dicta reprehenderit sit nulla earum libero consectetur laudantium nam ullam repudiandae. Labore.</p>
            <span className='text-slate-100 font-lobster tracking-widest lg:text-[15px] sm:text-sm'>You have an account ?</span>
            <Link to="/login"><button className='border w-2/3 py-1 text-xl text-slate-100 font-lobster tracking-widest rounded-sm hover:bg-slate-900 hover:border-slate-900 border-b sm:text-sm sm:py-2 lg:text-[20px]'>Login</button></Link>
          </div>
          <div className="right flex-1 flex flex-col bg-white px-[50px] py-[20px] max-sm:h-full ">
            <form encType='multipart/form-data' className='flex flex-1 flex-col justify-between' onSubmit={RegisterUser}>
              <h1 className='text-slate-900 font-lobster text-4xl text-center sm:text-3xl lg:text-4xl mb-6'>Register</h1>
              <input type="text" placeholder='Enter your first name' className='border-b border-slate-300 p-1 outline-none mb-6' onChange={(e) => dispatch({type: 'FNAME', fName:e.target.value})} />
              <input type="text" placeholder='Enter your last name' className='border-b border-slate-300 p-1 outline-none mb-6' onChange={(e) => dispatch({type: 'LNAME', lName:e.target.value})}/>
              <input type="text" placeholder='Enter user name' className='border-b border-slate-300 p-1 outline-none mb-6' onChange={(e) => dispatch({type: 'USERNAME', userName:e.target.value})}/>
              <input type="email" placeholder='Enter your email' className='border-b border-slate-300 p-1 outline-none mb-6' onChange={(e) => dispatch({type: 'EMAIL', email:e.target.value})}/>
              <div className='border-b flex items-center justify-between mb-4'>
                <input type={showPassword ? 'text' : 'password'} placeholder='Create your password' className='p-1 outline-none w-full' onChange={(e) => dispatch({ type: 'PASSWORD', password: e.target.value })} />
                {showPassword ? <VisibilityOutlinedIcon onClick={()=>setShowPassword(false)} className='cursor-pointer text-gray-400'/> : <VisibilityOffOutlinedIcon onClick={()=>setShowPassword(true)} className='cursor-pointer text-gray-400'/>}
              </div>
              <label htmlFor="file" className='flex items-center text-sm gap-1 cursor-pointer w-2/3 mb-2' >
                <div className='w-[40px] h-[40px] rounded-full p-1 border border-purple-800'>
                  <img className='w-full h-full rounded-full' src={`https://cdn-icons-png.flaticon.com/128/149/149071.png`} alt="avatar" />
                </div>
                <h1 className=' font-medium underline'>Upload avatar</h1>
              </label>
              <input type="file" id='file' accept="image/png, image/jpg, image/gif, image/jpeg" className='mb-2 hidden' onChange={e=>dispatch({type:'ADDIMAGE',image:e.target.files[0]})}/>
              <input  type="submit" value="Signup" className={`${isLoading&&'opacity-70'} border border-slate-900 py-1 w-1/2 mx-auto text-xl font-lobster rounded-sm cursor-pointer hover:bg-slate-900 hover:text-slate-100 sm:text-sm sm:py-2 lg:text-[25px]`} disabled={ fName === '' || state.lName === '' || email === '' || password === '' || isLoading}/>
            </form>
            <div className='text-sm text-center hidden max-sm:block mt-5 font-lobster tracking-wider'>
              <span>You have an account ?</span> <Link to="/login">
              <button className=' underline text-blue-600'>Login</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
}

export default Register;

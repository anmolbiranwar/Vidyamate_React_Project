import React from 'react'

const Login = () => {
  return (
    <div className='d-flex justify-content-center align-items-center vh-100 loginPage bg-primary'>
        <div className='p-3 rounded border loginForm bg-white'>
        <h2>LOGIN TO YOUR ACCOUNT</h2>
        <form>
            <div className='input-group '>
                <input type='email' name='email' autoComplete='off' placeholder='Enter Email' className='form-control rounded'/><span className="input-group-text bi bi-person" id="inputGroupPrepend3"></span>
            </div>
            <br/>
            <div className='input-group'>
                <input type='password' name='password' autoComplete='off' placeholder='Enter Password' className='form-control rounded'/><i className="input-group-text bi bi-eye-slash" id="togglePassword"></i>
            </div>
            <br/>
            <button className='btn btn-success w-100 rounded-0 bg-primary'>Sign in</button>
        </form> 
        </div>
    </div>
  )
}

export default Login
import React from 'react'
import { FcGoogle } from 'react-icons/fc'
import instance from '../axios/globalInstance.js'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google';
import { addUser } from '../redux/slices/userSlice.js';
import { useDispatch } from 'react-redux';
import errorMsg from '../utils/functions/errorMsg';
import { useNavigate } from 'react-router-dom';

const GoogleButton = ({ children, path }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const linkStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '0.4rem 1rem',
    // backgroundColor: 'yellow',
    border: '1px solid gray',
    textDecoration: 'none',
    fontSize: '1.1rem',
    fontWeight: '600',
    marginTop: '2rem',
    maxWidth: '100%',
    margin: '1rem auto'
  }
  const spanStyle = {
    marginLeft: '0rem',
    fontSize: '1.2rem',
    flexBasis: '1 1 0',
    width: '80%'
    // textAlign: 'start'
  }

  const signInWithGoogle = async (accessToken) => {

    const res = await instance.post(path, {
      googleAccessToken: accessToken.access_token
    })
    try {
      instance.defaults.headers.common['Authorization'] = `Bearer ${res.data}`
      const getUser = await instance.get('/user')
      dispatch(addUser(getUser.data))
      navigate('/dashboard')
    } catch (error) {
      errorMsg("Une erreur est survenu !")
    }
  }
  const login = useGoogleLogin({
    onSuccess: signInWithGoogle,
  });
  return (
    <p onClick={() => login()} style={{...linkStyle, cursor: 'pointer'}}><FcGoogle className='google-icon' size={30} />{children}</p>
  )
}

export default GoogleButton
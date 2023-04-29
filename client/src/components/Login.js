import React, { useState } from 'react'
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Loader } from '@mantine/core';
import logo from '../assets/img/illustration-2.png'
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from './GoogleButton';
import instance from '../axios/globalInstance'
import {useDispatch} from 'react-redux'
import { addUser } from '../redux/slices/userSlice';
import axios from 'axios';

const Login = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const form = useForm({
        initialValues: { email: '', password: "" },

        // functions will be used to validate values at corresponding key
        validate: {
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
            password: (value) => (value === '' ? 'Les champs ne doivent pas etre vides' : null),
        },
    });

    const dispatch = useDispatch()

    // const url = 'http://localhost:8001/api/login';
    const url = "/login"

    const handleSubmit = form.onSubmit(async (values) => {
        const { email, password } = values
        const data = { email, password }
        // console.log(data)

        setLoading(true)
        try {
            const result = await instance.post(url, data)
            const token = await result.data.token
            instance.defaults.headers.common['Authorization'] = `Bearer ${token}`
            const getUser = await instance.get('/user')
            dispatch(addUser(getUser.data))
            navigate('/dashboard')
        //     await axios.post('http://localhost:5550/api/login', data)
        //     .then(response => {
        //         console.log(response)
        //         navigate('/dashboard')
               
        //     })
        //     .catch(error => {
        //         console.log(error)
        //          });
        // }
        }
        catch (err) {
            form.setErrors({ email: err.response.data.error, password: err.response.data.error })
        }
        setLoading(false)
        // console.log(values);
    })

    return (
        <div className='form-signup--container'>
            <div className='form-left'>
                <h1>Prenez votre rendez-vous</h1>
                <img src={logo} alt="Appointement" />
            </div>
            <div style={{marginTop: '3rem'}} className='form-right'>
                <h1>Connexion</h1>
                <p>Connectez-vous à votre compte</p>
                <span>Vous n'avez pas de compte ? <Link to="/signup">Inscrivez-vous</Link></span>
                <form onSubmit={handleSubmit}>
                    <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                    <PasswordInput
                        mt="md"
                        placeholder="Mot de passe"
                        label="Mot de passe"
                        value=""
                        // withAsterisk
                        {...form.getInputProps('password')}
                    />
                    <button
                        disabled={loading}
                        style={{ width: "100%", marginTop: '1.5rem' }}
                        className='btn-submit'
                        type="submit"
                    >
                        {
                            loading ? <Loader color="white" variant='dots' /> : "Connexion"
                        }
                    </button>
                    {/* <GoogleButton path="/login" >Connexion avec google</GoogleButton> */}
                </form>
            </div>
        </div>
    );
}

export default Login
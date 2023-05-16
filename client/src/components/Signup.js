import React, { useState } from 'react'
import { useForm } from '@mantine/form';
import { TextInput, PasswordInput, Loader } from '@mantine/core';
import logo from '../assets/img/illustration-2.png'
import { Link, useNavigate } from 'react-router-dom';
import GoogleButton from './GoogleButton';
import instance from '../axios/globalInstance'
// import axios from 'axios';

const Signup = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const form = useForm({
        initialValues: { firstname: '', lastname: "", phone: '', email: '', password: "", confirmPassword: '' },

        // functions will be used to validate values at corresponding key
        validate: {
            firstname: (value) => (value === '' ? 'Les champs ne doivent pas etre vides' : null),
            lastname: (value) => (value === '' ? 'Les champs ne doivent pas etre vides' : null),
            phone: (value) => (value === '' ? 'Les champs ne doivent pas etre vides' : null),
            email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Email invalide'),
            password: (value) => (value === '' ? 'Les champs ne doivent pas etre vides' : null),
            confirmPassword: (value) => (value === '' ? 'Les champs ne doivent pas etre vides' : null),
        },
    });

    // const url = 'http://localhost:8001/api/signup';
    const url = "/signup"

    const handleSubmit = form.onSubmit(async (values) => {
        const { firstname, lastname, phone, email, password, confirmPassword } = values
        const data = {
            firstname,
            lastname,
            phone,
            email,
            password,
            role: 'client'
        }

        // if (password.length < 6) return form.setErrors({ password: "Mot de passe court, au moins 6 caractères" })

        // if (password !== confirmPassword) return form.setErrors({ confirmPassword: 'Les mots de passe doivent correspondre' })

        setLoading(true)
        try {
            await instance.post(url, data)
            navigate('/login')
          
        //     await axios.post('http://localhost:5550/api/signup', data)
        //         .then(response => {
        //             console.log(response)
        //             navigate('/login')
        //         })
        //         .catch(error => {
        //             console.log(error)
        //              });
        // }
        }
        catch (err) {
            form.setErrors({ email: err.response.data.error })
        }
        setLoading(false)
    })

    return (
        <div className='form-signup--container'>
            <div className='form-left'>
                <h1>Prenez votre rendez-vous</h1>
                <img src={logo} alt="Appointement" />
            </div>
            <div className='form-right'>
                <h1>Insription</h1>
                <p>Créer votre compte</p>
                <span>Vous avez déjà un compte ? <Link to="/login">Connectez-vous</Link></span>
                <form onSubmit={handleSubmit}>
                    <TextInput label="Prénom" placeholder="Prénom" {...form.getInputProps('firstname')} />
                    <TextInput mt="md" label="Nom" placeholder="Nom" {...form.getInputProps('lastname')} />
                    <TextInput mt="md" label="Téléphone" placeholder="Téléphone" {...form.getInputProps('phone')} />
                    <TextInput mt="md" label="Email" placeholder="Email" {...form.getInputProps('email')} />
                    <PasswordInput
                        mt="md"
                        placeholder="Mot de passe"
                        label="Mot de passe"
                        value=""
                        description="Saisissez au moins 6 caracteres"
                        // withAsterisk
                        {...form.getInputProps('password')}
                    />
                    <PasswordInput
                        mt="md"
                        placeholder="Confirmer mot de passe"
                        label="Confirmer mot de passe"
                        value=""
                        description="Les mots de passes doivent correspondre"
                        // withAsterisk
                        {...form.getInputProps('confirmPassword')}
                    />
                    <button
                        disabled={loading}
                        style={{ width: "100%", marginTop: '1.5rem'
                        , marginBottom: '1.5rem'
                    }}
                        className='btn-submit'
                        type="submit"
                    >
                        {
                            loading ? <Loader color="white" variant='dots' /> : "Inscrivez-vous"
                        }
                    </button>
                    {/* <GoogleButton path="/signup">Inscription avec google</GoogleButton> */}
                </form>
            </div>
        </div>
    );
}

export default Signup
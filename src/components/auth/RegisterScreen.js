import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { useForm } from '../../hooks/useForm';
import { setError, removeError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

export const RegisterScreen = () => {
    
    const dispatch = useDispatch()
    const { msgError } = useSelector( state => state.ui );

    const [ formValues, handleInputChange ] = useForm({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { name, email, password, confirmPassword } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();
        
        if ( isFormValid() ){
            dispatch( startRegisterWithEmailPasswordName(email, password, name) );
        }

    };  
    
    const isFormValid = () => {
        if( name.trim().length === 0 ){
            dispatch( setError('Name is required') );
            return false;
        }
        else if ( !validator.isEmail( email ) ){
            dispatch( setError('Email is not valid') );
            return false;
        }
        else if( password !== confirmPassword ){
            dispatch( setError("Password does not match") );
            return false;
        }
        else if ( password.length <= 5 ){
            dispatch( setError("Password should be at least 6 characters") );
            return false;
        }

        dispatch( removeError() );
        return true;
    };

    return (
        <>
            <h3 className="auth__title mb-5">Register</h3>

            <form
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    msgError &&
                        <div className='auth__alert-error txt-center'>
                            { msgError }
                        </div>
                }

                <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />

                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />    

                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    autoComplete="off"
                    value={ password }
                    onChange={ handleInputChange }
                />    

                <input
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    className="auth__input"
                    autoComplete="off"
                    value={ confirmPassword }
                    onChange={ handleInputChange }
                /> 
                
                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Sign up
                </button>

                <Link
                    to="/auth/login"
                    className="link center"
                >
                    Already registered?
                </Link>
            </form>  
        </>
    )
}

import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import validator from 'validator';

import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formValues, handleInputChange ] = useForm({
        email: '',
        password: ''
    });

    const { msgError, loading } = useSelector( state => state.ui );
    const { email, password } = formValues;

    const handleLogin = (e) => {
        e.preventDefault();
        if ( isFormValid() ){
            dispatch( startLoginEmailPassword(email, password) );
        }
    };

    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    };

    const isFormValid = () => {
        if( email.trim().length === 0 ){
            dispatch( setError('Email is required') );
            return false;
        }
        else if ( !validator.isEmail( email ) ){
            dispatch( setError('Email is not valid') );
            return false;
        }
        else if ( password.trim().length === 0 ){
            dispatch( setError('Password is required') );
            return false;
        }

        dispatch( removeError() );
        return true;
    };

    return (
        <>
            <h3 className="auth__title mb-5">Login</h3>
        
            {
                msgError &&
                    <div className='auth__alert-error txt-center'>
                        { msgError }
                    </div>
            }

            <form 
                onSubmit={ handleLogin }
                className="animate__animated animate__fadeIn animate__faster"
            >
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

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled = { loading }
                >
                    Login
                </button>

                <div
                    className="auth__social-networks"
                    onClick={ loading ? null : handleGoogleLogin }
                >
                    <p>Login with social networks</p>
                    <div 
                        className={"google-btn" + (loading ? ' disabled' : '')}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>
                </div>

                <Link
                    to="/auth/register"
                    className="link center"
                >
                    Create new account
                </Link>
            </form>  
        </>
    )
}

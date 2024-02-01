import React from 'react';
import LoginForm from '../components/Auth/LoginForm';
import Logo from '../assets/logo.png'; // Path to your logo image
import '../styles/LoginPage.css' // Path to your CSS file for LoginPage

const LoginPage = () => {
    return (
        <div className="login-page">
            <img src={Logo} alt="Logo" className="login-logo" /> 
            <div className="login-form-wrapper">
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;

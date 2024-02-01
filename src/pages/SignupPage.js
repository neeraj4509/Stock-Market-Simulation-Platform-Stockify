import React from 'react';
import SignupForm from '../components/Auth/SignupForm';
import Logo from '../assets/logo.png'; 
import '../styles/SignupPage.css'

const SignupPage = () => {
    return (
        <div className="signup-page">
            <img src={Logo} alt="Logo" className="signup-logo" />
            <div className="signup-form-wrapper">
                <SignupForm />
            </div>
        </div>
    );
};

export default SignupPage;

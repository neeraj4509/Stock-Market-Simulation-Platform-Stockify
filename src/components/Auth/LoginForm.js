import React, { useState } from 'react';
import './LoginForm.css'; 
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const LoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(''); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const auth = getAuth();

        if (!formData.email || !formData.password) {
            setError('Please enter both email and password.');
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            navigate('/home');
        } catch (error) {
            if (error.code === 'auth/user-not-found') {
                setError('No user found with this email.');
            } else if (error.code === 'auth/wrong-password') {
                setError('Incorrect password.');
            } else {
                setError('Failed to log in. Please try again.');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            {error && <p className = "error">{error}</p>}
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
            />
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
            />
            <button type="submit">Login</button>
            <p>
                Not Registered? <Link to="/signup">Sign Up</Link>
            </p>
        </form>
    );
};

export default LoginForm;

import React, { useState } from 'react';
import './SignupForm.css';
import { Link , useNavigate} from 'react-router-dom'; 
import { getAuth, createUserWithEmailAndPassword , updateProfile } from "firebase/auth";


const SignupForm = () => {
    const [formData, setFormData] = useState({
        name: '', // Add the name field
        email: '',
        password: '',
        confirmPassword: ''
    });

    const auth = getAuth();
    const navigate = useNavigate();
    

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
            alert('Please fill in all fields.');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Passwords don't match.");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

            await updateProfile(userCredential.user, {
                displayName: formData.name
            });

            console.log(userCredential.user);

            alert('You have successfully registered.');
            navigate('/login');
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('The email address is already registered.');
            } else {
                alert(error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <input
                type="text" 
                name="name" 
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
            />
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
            <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
            />
            <button type="submit" >Sign Up</button>
            <p>
                Already Registered? <Link to="/login">Login</Link>
            </p>
        </form>
    );
};

export default SignupForm;

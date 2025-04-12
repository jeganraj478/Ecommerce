import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser, clearError } from '../../store/slice/authSlice';
import './css/register.css';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const RegisterForm: React.FC = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const [successMessage, setSuccessMessage] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isLoading, error } = useAppSelector((state) => state.auth);

    useEffect(() => {
        dispatch(clearError());
        return () => {
            dispatch(clearError());
        };
    }, [dispatch]);

    const validateForm = (): boolean => {
        let isValid = true;

        // Username validation
        if (!username) {
            setUsernameError('Username is required');
            isValid = false;
        } else if (username.length < 3) {
            setUsernameError('Username must be at least 3 characters');
            isValid = false;
        } else {
            setUsernameError('');
        }

        // Email validation
        if (!email) {
            setEmailError('Email is required');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            setEmailError('Email is invalid');
            isValid = false;
        } else {
            setEmailError('');
        }

        // Password validation
        if (!password) {
            setPasswordError('Password is required');
            isValid = false;
        } else if (password.length < 6) {
            setPasswordError('Password must be at least 6 characters');
            isValid = false;
        } else {
            setPasswordError('');
        }

        // Confirm password validation
        if (!confirmPassword) {
            setConfirmPasswordError('Please confirm your password');
            isValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            isValid = false;
        } else {
            setConfirmPasswordError('');
        }

        return isValid;
    };

    const handleRegister = async () => {
        if (validateForm()) {
            try {
                const resultAction = await dispatch(registerUser({ username, email, password }));
                if (registerUser.fulfilled.match(resultAction)) {
                    setSuccessMessage('Registration successful! You can now login.');

                    // Reset form
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setConfirmPassword('');

                    // Redirect to login after 2 seconds
                    setTimeout(() => {
                        navigate('/');
                    }, 2000);
                }
            } catch (err) {
                console.error('Registration failed:', err);
            }
        }
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h1 className="register-title">Create an Account</h1>

                {error && <div className="alert alert-error">{error}</div>}
                {successMessage && <div className="alert alert-success">{successMessage}</div>}

                <div className="register-form">
                    <div className="form-group">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            id="username"
                            type="text"
                            className={`form-input ${usernameError ? 'input-error' : ''}`}
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={isLoading}
                        />
                        {usernameError && <span className="error-text">{usernameError}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            className={`form-input ${emailError ? 'input-error' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                        />
                        {emailError && <span className="error-text">{emailError}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className={`form-input ${passwordError ? 'input-error' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        {passwordError && <span className="error-text">{passwordError}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            className={`form-input ${confirmPasswordError ? 'input-error' : ''}`}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            disabled={isLoading}
                        />
                        {confirmPasswordError && <span className="error-text">{confirmPasswordError}</span>}
                    </div>
                </div>

                <div className="button-group">
                    <button
                        className="btn btn-outline"
                        onClick={() => navigate('/')}
                        disabled={isLoading}
                    >
                        Back to Home
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={handleRegister}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="spinner">
                                <div className="spinner-circle"></div>
                            </div>
                        ) : 'Register'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
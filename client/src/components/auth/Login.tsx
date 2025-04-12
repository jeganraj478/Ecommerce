import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, clearError } from '../../store/slice/authSlice';
import './css/login.css'; 
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

interface LoginDialogProps {
    open: boolean;
    onClose: () => void;
}

const LoginDialog: React.FC<LoginDialogProps> = ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { isLoading, error, isAuthenticated } = useAppSelector(
        (state) => state.auth
    );

    // Reset form errors when dialog opens/closes
    useEffect(() => {
        if (open) {
            setEmail('');
            setPassword('');
            setEmailError('');
            setPasswordError('');
            dispatch(clearError());
        }
    }, [open, dispatch]);

    // Close dialog if login is successful
    useEffect(() => {
        if (isAuthenticated && open) {
            onClose();
        }
    }, [isAuthenticated, open, onClose]);

    const validateForm = (): boolean => {
        let isValid = true;

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

        return isValid;
    };

    const handleLogin = () => {
        if (validateForm()) {
            dispatch(loginUser({ email, password }));
        }
    };

    const handleRegisterClick = () => {
        onClose();
        navigate('/register');
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    if (!open) return null;

    return (
        <div className="login-dialog-backdrop">
            <div className="login-dialog">
                <div className="login-dialog-header">
                    <h2 className="login-dialog-title">Login to Your Account</h2>
                    <button
                        className="login-dialog-close-btn"
                        onClick={onClose}
                        aria-label="close"
                    >
                        ✕
                    </button>
                </div>

                <div className="login-dialog-content">
                    {error && (
                        <div className="login-error-message">
                            {error}
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            autoFocus
                            id="email"
                            type="email"
                            className={`form-input ${emailError ? 'form-input-error' : ''}`}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={isLoading}
                            onKeyUp={handleKeyPress}
                        />
                        {emailError && <span className="form-error-text">{emailError}</span>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            className={`form-input ${passwordError ? 'form-input-error' : ''}`}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            disabled={isLoading}
                            onKeyUp={handleKeyPress}
                        />
                        {passwordError && <span className="form-error-text">{passwordError}</span>}
                    </div>

                    <div className="login-register-link">
                        <span>Don't have an account? </span>
                        <button
                            className="register-button"
                            onClick={handleRegisterClick}
                            disabled={isLoading}
                        >
                            Register
                        </button>
                    </div>
                </div>

                <div className="login-dialog-actions">
                    <button
                        className="login-button"
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <div className="loading-spinner">
                                <div className="spinner"></div>
                            </div>
                        ) : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginDialog;
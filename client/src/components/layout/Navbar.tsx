import React, { useState, useRef, useEffect } from 'react';
import './css/navbar.css';
import { Outlet, useNavigate } from 'react-router-dom';
import LoginDialog from '../auth/Login';
import { logoutUser } from '../../store/slice/authSlice';
import { useAppDispatch, useAppSelector } from '../../hooks/useRedux';

const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // Get auth state from Redux
    const { isAuthenticated } = useAppSelector((state) => state.auth);

    // State for login dialog
    const [loginDialogOpen, setLoginDialogOpen] = useState(false);

    // State for user menu
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    // Close menu when clicking outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuRef]);

    const handleNavigation = (path: string): void => {
        navigate(path);
    };

    const handleOpenLoginDialog = () => {
        if (!isAuthenticated) {
            setLoginDialogOpen(true);
        } else {
            toggleUserMenu();
        }
    };

    const handleCloseLoginDialog = () => {
        setLoginDialogOpen(false);
    };

    const toggleUserMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const handleLogout = () => {
        dispatch(logoutUser());
        setMenuOpen(false);
    };

    const handleCartClick = () => {
        if (isAuthenticated) {
            navigate('/cart');
        } else {
            setLoginDialogOpen(true);
        }
    };

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <div
                        className="navbar-logo"
                        onClick={() => handleNavigation('/')}
                    >
                        Fashion Store
                    </div>

                    <div className="navbar-icons">
                        {/* <div className="tooltip">
                            <div className="icon-search">
                                <svg className="icon" viewBox="0 0 24 24">
                                    <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                                </svg>
                                <span className="tooltiptext">Search</span>
                            </div>
                        </div> */}

                        <div className="tooltip">
                            <div
                                className="icon-account"
                                onClick={handleOpenLoginDialog}
                            >
                                <svg className={`icon ${isAuthenticated ? 'icon-primary' : ''}`} viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                                </svg>
                                <span className="tooltiptext">{isAuthenticated ? 'Account' : 'Login'}</span>
                            </div>
                        </div>

                        <div className="tooltip">
                            <div
                                className="icon-cart"
                                onClick={handleCartClick}
                            >
                                <svg className="icon" viewBox="0 0 24 24">
                                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                                </svg>
                                <span className="tooltiptext">Cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* User Menu */}
            {menuOpen && isAuthenticated && (
                <div className="user-menu" ref={menuRef}>
                    <div className="menu-content">
                        <div
                            className="menu-item"
                            onClick={() => {
                                setMenuOpen(false);
                                navigate('/account');
                            }}
                        >
                            My Account
                        </div>
                        <div className="menu-item logout-item" onClick={handleLogout}>
                            <svg className="logout-icon" viewBox="0 0 24 24">
                                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
                            </svg>
                            Logout
                        </div>
                    </div>
                </div>
            )}

            {/* Login Dialog - keep this as is since we're not modifying the dialog component */}
            <LoginDialog
                open={loginDialogOpen}
                onClose={handleCloseLoginDialog}
            />

            <div>
                <Outlet />
            </div>
        </>
    );
};

export default Navbar;
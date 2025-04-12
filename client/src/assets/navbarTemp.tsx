import React, { useState } from 'react';
import './navbarTemp.css';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    const toggleDropdown = (menu: string) => {
        if (activeDropdown === menu) {
            setActiveDropdown(null);
        } else {
            setActiveDropdown(menu);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-logo">
                    <Link to="/" >Fashion Store</Link>
                </div>
                <div className="navbar-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>

                <div className={`navbar-wrapper ${mobileMenuOpen ? 'active' : ''}`}>
                    <ul className='navbar-menu'>
                        <li>
                            <Link to="/" className="menu-item active">HOME</Link>
                        </li>

                        <li className={`dropdown ${activeDropdown === 'account' ? 'active' : ''}`}>
                            <div
                                className="menu-item"
                                onClick={() => toggleDropdown('account')}
                            >
                                MY ACCOUNT
                            </div>
                            <div className="dropdown-content">
                                <Link to="/" className="dropdown-item">Profile</Link>
                                <Link to="/" className="dropdown-item">Orders</Link>
                                <Link to="/" className="dropdown-item">Wishlist</Link>
                            </div>
                        </li>

                        <li className={`dropdown ${activeDropdown === 'blog' ? 'active' : ''}`}>
                            <div
                                className="menu-item"
                                onClick={() => toggleDropdown('blog')}
                            >
                                BLOG
                            </div>
                            <div className="dropdown-content">
                                <Link to="/" className="dropdown-item">Fashion</Link>
                                <Link to="/" className="dropdown-item">Trends</Link>
                            </div>
                        </li>
                    </ul>

                    <div className='navbar-icons'>
                        <div className="icon-search">
                            <SearchOutlinedIcon />
                        </div>
                        <div className="icon-account">
                            <AccountCircleOutlinedIcon />
                        </div>
                        <div className="icon-cart">
                            <ShoppingCartOutlinedIcon />
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
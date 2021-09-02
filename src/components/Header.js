import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthContext';

function Header() {
    const { setUser, user } = React.useContext(AuthContext);
    const history = useHistory();

    const handleLogout = async () => {
        setUser({
            authToken: null,
            userId: null,
            username: null,
        });
        history.push('/');
    }

    return (
        <header>
            <nav>
                <Link className="active" to="/">Home</Link>
                <Link to="/all-listings">All Listings</Link>
                <Link to="/by-year">By Year</Link>
                {
                    !user.authToken
                        ? <div id="guest">
                            <Link to="/login">Login</Link>
                            <Link to="/register">Register</Link>
                        </div>
                        : <div id="profile">
                            <a>Welcome {user?.email}</a>
                            <Link to="/my-listings">My Listings</Link>
                            <Link to="/create-car">Create Listing</Link>
                            <Link onClick={handleLogout} to="/">Logout</Link>
                        </div>
                }
            </nav>
        </header>
    );
}

export default Header;
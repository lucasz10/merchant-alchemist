import React from 'react';
// Import React Router Link component for internal hyperlinks
import { Link } from 'react-router-dom';

const Navigation = () => {
    return (
        <header className="nav_header">
            {/* Returns to the Main Menu on click */}
            <Link to="/main">
                <h1 className="nav_heading">
                    Back to Main Menu
                </h1>
            </Link>
        </header>
    );
};

export default Navigation;

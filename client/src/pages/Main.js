import React from 'react';
import background from '../assets/backgrounds/main-menu.png';
import { Link } from 'react-router-dom';

const Main = () => {

  const styles = {
    background: {
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      maxWidth: '100vw',
      height: '100vh',
    },
    card: {
      width: "25rem",
      backgroundColor: "transparent",
      border: "none",
    },
  };

  return (
    <div className="container pt-5" style={styles.background}>
      <div class="d-flex align-items-center justify-content-center">
        <h1 className="landing"> Merchant Alchemist</h1>
      </div>
      <div class="d-flex align-items-center justify-content-center pt-5">
        <div className="card text-center" style={styles.card}>
          <div className="card-body">
            <Link to="/store" className="btn btn-secondary btn-block mb-3">Purchase Ingredients</Link>
            <Link to="/brewing" className="btn btn-danger btn-block mb-3">Arcanium</Link>
            <Link to="/shop" className="btn btn-info btn-block mb-3">Open Shop</Link>
            <Link to="/faq" className="btn btn-primary btn-block mb-3">FAQ</Link>
            <Link to="/" className="btn btn-dark btn-block mb-3">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
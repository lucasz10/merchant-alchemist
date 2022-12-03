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
    },
  };

  return (
    <div className="container pt-5" style={styles.background}>
      <div class="d-flex align-items-center justify-content-center">
        <h1 className="landing"> Merchant Alchemist</h1>
      </div>
      <div class="d-flex align-items-center justify-content-center">
        <div className="card text-center" style={styles.card}>
          <div className="card-body">
            <Link to="/store" class="btn btn-secondary btn-block">Purchase Ingredients</Link>
            <Link to="/brewing" class="btn btn-danger btn-block">Arcanium</Link>
            <Link to="/shop" class="btn btn-info btn-block">Open Shop</Link>
            <Link to="/faq" class="btn btn-primary btn-block">FAQ</Link>
            <Link to="/" class="btn btn-dark btn-block">Logout</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
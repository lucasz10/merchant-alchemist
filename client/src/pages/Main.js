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
            <Link to="/shop" class="btn btn-primary btn-block">Open Shop</Link>
            <Link to="/faq" class="btn btn-primary btn-block">FAQ</Link>
            <Link to="/logout" class="btn btn-primary btn-block">Logout</Link>
          </div>
        </div>
      </div>
      
      
      
      {/* <div className="card text-center" style={styles.card}>
        <div className="card-body">
          <h5 className="card-title">Purchase Ingredients</h5>
            <Link to="/store" class="btn btn-secondary">Purchase Ingredients</Link>
        </div>
      </div>
      <div className="card text-center" style={styles.card}>
        <div className="card-body">
          <h5 className="card-title">Arcanium</h5>
            <Link to="/brewing" class="btn btn-danger">Arcanium</Link>
        </div>
      </div>
      <div className="card text-center" style={styles.card}>
        <div className="card-body">
          <h5 className="card-title">Open Shop</h5>
            <Link to="/shop" class="btn btn-primary">Open Shop</Link>
        </div>
      </div>
      <div className="card text-center" style={styles.card}>
        <div className="card-body">
          <h5 className="card-title">FAQ</h5>
            <Link to="/shop" class="btn btn-primary">FAQ</Link>
        </div>
      </div>
      <div className="card text-center" style={styles.card}>
        <div className="card-body">
          <h5 className="card-title">Logout</h5>
            <Link to="/shop" class="btn btn-primary">Logout</Link>
        </div>
      </div> */}
    </div>
  );
};

export default Main;
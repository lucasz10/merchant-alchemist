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
      width: "18rem",
    },
  };

  return (
    <div className="container pt-5" style={styles.background}>
      <div className="card text-center" style={styles.card}>
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
    </div>
  );
};

export default Main;
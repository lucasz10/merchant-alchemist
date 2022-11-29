import React from 'react';
import { Link } from 'react-router-dom';
import background from '../assets/backgrounds/landing.png';
import MovingComponent from 'react-moving-text'


const Landing = () => {

  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    'max-width': '100vw',
    height: '100vh',
  }

  return (
    <div className="container" style={style}>
      <div class="h-100 d-flex align-items-center justify-content-center">
        <MovingComponent
          type="fadeInFromTop"
          duration="2000ms"
          delay="0s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">
            <h1 className="landing"> Merchant Alchemist</h1>
        <MovingComponent
          type="fadeIn"
          duration="8000ms"
          delay="0s"
          direction="normal"
          timing="ease"
          iteration="1"
          fillMode="none">
            <div className="text-center">
              <Link to="/login"  className="text-center enter">Enter here</Link>
            </div>
        </MovingComponent>
        </MovingComponent>
      </div>
    </div>
  );
};

export default Landing;
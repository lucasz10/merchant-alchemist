import React from 'react';
import background from '../assets/backgrounds/shop.png';
import pepe from '../assets/backgrounds/pepe.png';

const Shop = () => {

  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    'max-width': '100vw',
    height: '100vh',
  };

  return (
    <div class="container" style={style}>
      <div class="row">
          <div class="col-3"/>
          <div class="col-3">
            <img src={pepe} alt="wizard" className="wizard mb-5"/>
          </div>
          <div class="col-3 align-middle">
            <div className="align-middle">
              <button className="btn btn-secondary mt-5" id="tooltip" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
                Pepe want potions
              </button>
            </div>
          </div>
      </div>
    </div>

  )
}

export default Shop;
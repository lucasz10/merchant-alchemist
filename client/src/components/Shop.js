import React, { useState } from 'react';
import background from '../assets/backgrounds/shop.png';
import Potions from './potions-list/Potions';
import Sprites from '../assets/sprites';

const Shop = () => {

  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    'max-width': '100vw',
    height: '100vh',
  };

  const data = [
    {
      _id: '1',
      potionName: 'Awakening',
      desc: 'Increases the available mana',
      owned: 1
    },
    {
      _id: '2',
      potionName: 'Endurance',
      desc: 'Restores Stamina',
      owned: 2
    },
    {
      _id: '3',
      potionName: 'Wisdom',
      desc: 'Restores Mana',
      owned: 3
    },
    {
      _id: '4',
      potionName: 'Vigor',
      desc: 'Restores Health',
      owned: 4
    },
    {
      _id: '5',
      potionName: 'Strength',
      desc: 'Increases physical attack',
      owned: 5
    }
  ];

  // Track selected potion
  const [selectedPotion, setPotion] = useState({ _id: '', potionName: '', desc: '', owned: 0 });
  const handlePotionSelection = (potion) => setPotion(potion);

  return (
    <div className="container" style={style}>
      <div className="row">
          <div className="col-2"/>

          <div className='col-2'>
            <div className="card text-center">
              <h5 className="card-header">Pepe the Adventurer</h5>
              <img src={Sprites['knight'].img} alt={Sprites['knight'].alt} className="knight mx-auto"/>
              <div className="card-body">
                <p className="card-text">Would yer like to sell me some of yer potions?</p>
                <div className='row'>
                  <div className='col'>
                    <button type="button" className="btn btn-primary btn-block">Sell</button>
                  </div>
                  <div className='col'>
                    <button type="button" className="btn btn-danger btn-block">Deny</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='col-6'>
            <div className="card">
              <h5 className="card-header text-center">Your Inventory</h5>
              <Potions handlePotionSelection={handlePotionSelection} potions={data} />
              <div className="card-footer text-center">
                <small className="text-muted">Selected Potion: {selectedPotion.potionName}</small>
                <br />
                <small className="text-muted">Description: {selectedPotion.desc}</small>
              </div>
            </div>
          </div>

          
      </div>
    </div>

  )
}

export default Shop;
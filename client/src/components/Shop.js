import React, { useState } from 'react';
import background from '../assets/backgrounds/shop.png';
import knight from '../assets/backgrounds/knight.png';

import potion from '../assets/sprites/potions/placeholder-potion64x64.png'
import Potions from './potions-list/Potions';

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
      potionName: 'Awakening',
      owned: 1
    },
    {
      potionName: 'Endurance',
      owned: 2
    },
    {
      potionName: 'Wisdom',
      owned: 3
    },
    {
      potionName: 'Vigor',
      owned: 4
    },
    {
      potionName: 'Strength',
      owned: 5
    }
  ]

  return (
    <div className="container" style={style}>
      <div className="row">
          <div className="col-2"/>

          <div className='col-2'>
            <div className="card text-center">
              <h5 className="card-header">Pepe the Adventurer</h5>
              <img src={knight} alt="wizard" className="knight mx-auto"/>
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
              <Potions potions={data} />
              <div className="card-footer text-center">
                <small className="text-muted">1 potion(s) selected</small>
              </div>
            </div>
          </div>

          
      </div>
    </div>

  )
}

export default Shop;
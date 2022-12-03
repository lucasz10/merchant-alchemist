import React from 'react';
import background from '../assets/backgrounds/faq.png';
import Navigation from './nav-header/Navigation';
import { Link } from 'react-router-dom';

const Faq = () => {

  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    'max-width': '100vw',
    height: '100vh',
  };

  return (
    <div className="container" style={style}>
      <Navigation />

      <div className="row pt-5">
        <div className='col-2'/>
        <div className='col-8'>
          <div className="card">
            <div id="accordion">
              <div class="card">
                <div class="card-header" id="headingOne">
                  <h5 class="mb-0">
                    <Link to="/store" class="btn btn-link">Purchase Ingredients</Link> 
                  </h5>
                </div>
                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                  <div class="card-body">
                    Players can choose which alchemical ingredients they would like to purchase on this page. Users will be able to select which ingredients they want as well as the quantity they wish to purchase.
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="headingTwo">
                  <h5 class="mb-0">
                  <Link to="/brewing" class="btn btn-link">Arcanium</Link> 
                  </h5>
                </div>
                <div id="collapseTwo" class="collapse show" aria-labelledby="headingTwo" data-parent="#accordion">
                  <div class="card-body">
                    Once a player is finished selecting their ingredients, they can begin crafting potions using up to three ingredients. Different ingredients will create potions with varying effects, and certain effects will be more demanded by certain characters.
                  </div>
                </div>
              </div>
              <div class="card">
                <div class="card-header" id="headingThree">
                  <h5 class="mb-0">
                    <Link to="/shop" class="btn btn-link">Open Shop</Link> 
                  </h5>
                </div>
                <div id="collapseThree" class="collapse show" aria-labelledby="headingThree" data-parent="#accordion">
                  <div class="card-body">
                    After players are done creating potions, they are able to sell to one of three adventurers. If they choose to sell a potion, it will be deducted from their store inventory and the sale price will be added to their gold balance. Players can also choose to deny selling a potion, and move on to the next adventurer without removing one of their potions.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Faq;
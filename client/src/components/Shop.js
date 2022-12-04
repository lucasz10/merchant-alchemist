import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import background from '../assets/backgrounds/shop.png';
import Potions from './potions-list/Potions';
import Sprites from '../assets/sprites';
import generateScenario from '../utils/scenario_generator';
import Navigation from './nav-header/Navigation';

const Shop = () => {
  // Navigate to set path `/path`
  const navigate = useNavigate();

  const style = {
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    'max-width': '100vw',
    height: '100vh',
  };

  // TODO: Query for all of a user's potions
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

  // Sum total potions owned upon page load and generate scenario based on total potions owned
  const TOTAL_POTIONS_OWNED = data.reduce((num_owned, potion) => num_owned + potion.owned, 0);
  const scenarioPatrons = generateScenario(TOTAL_POTIONS_OWNED);

  // Hold the scenario data and track order of patrons in scenario
  const scenario = React.useRef(scenarioPatrons);
  const [order, setOrder] = useState(0);

  // Track current adventurer, starting at the scenario's first patron
  const [adventurer, setAdventurer] = useState(scenario.current[0]);

  // Track selected potion
  const [selectedPotion, setPotion] = useState({ _id: '', potionName: '', desc: '', owned: 0 });
  const handlePotionSelection = (potion) => setPotion(potion);

  console.log('scenario: ', scenario, '\n', 'order: ', order, '\n', 'adventurer: ', adventurer, '\n');

  // Move to next adventurer in the scenario when the order has been changed
  React.useEffect(() => setAdventurer(scenario.current[order]), [order]);

  const handlePotionSelling = () =>
  {
    // Check that there are sufficient potions to sell
    if (selectedPotion.owned < 1) return;

    // Reset currently selected potion and increment the scenario to the next patron
    setPotion({ _id: '', potionName: '', desc: '', owned: 0 });
    setOrder(order + 1);

    // Exit the shop and return to Main Menu if there are no more patrons left
    if (order >= scenarioPatrons.length - 1) navigate('/main');
  }

  const handlePotionDecline = () =>
  {
    // Reset currently selected potion and increment the scenario to the next patron
    setPotion({ _id: '', potionName: '', desc: '', owned: 0 });
    setOrder(order + 1);

    // Exit the shop and return to Main Menu if there are no more patrons left
    if (order >= scenarioPatrons.length - 1) navigate('/main');
  }

  return (
    <div className="container" style={style}>
      <Navigation />
      <div className="row pt-5">
          <div className="col-2"/>

          <div className='col-2'>
            <div className="card text-center">
              <h5 className="card-header">{adventurer.name} the {adventurer.occupation.charAt(0).toUpperCase() + adventurer.occupation.slice(1)} {`Adventurer #: ${order + 1}`}</h5>
              <img src={Sprites[adventurer.occupation].img} alt={Sprites[adventurer.occupation].alt} className="knight mx-auto"/>
              <div className="card-body">
                <p className="card-text">{adventurer.dialogue}</p>
                <div className='row'>
                  <div className='col'>
                    <button type="button" onClick={handlePotionSelling} className="btn btn-primary btn-block">Sell</button>
                  </div>
                  <div className='col'>
                    <button type="button" onClick={handlePotionDecline} className="btn btn-danger btn-block">Deny</button>
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
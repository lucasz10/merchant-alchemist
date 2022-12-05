import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import background from '../assets/backgrounds/shop.png';
import Potions from './potions-list/Potions';
import Sprites from '../assets/sprites';
import generateScenario from '../utils/scenario_generator';
import Navigation from './nav-header/Navigation';
// Import potion mutations/queries
import { QUERY_INVENTORY } from '../utils/queries';
import { SELL_POTION } from '../utils/mutations';

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

  // Get storeId from localStorage
  const storeId = localStorage.getItem('storeId');

  // POST sell potion request
  const [sellPotion, { error }] = useMutation(SELL_POTION);
  
  // Hold the scenario data and track order of patrons in scenario
  const [scenario, setScenario] = useState([]);
  const [order, setOrder] = useState(0);

  // Track current adventurer, starting at the scenario's first patron
  const [adventurer, setAdventurer] = useState({ occupation: '', name: '', dialogue: '' });

  // Track User's brewed potions and total number of potions
  const [potions, setPotions] = useState([]);

  // Query for all of a user's potions
  const { loading: potionsLoading, data: potionData } = useQuery(QUERY_INVENTORY, { variables: { storeId } });

  // Once potions have been retrieved, set potions and generate scenario
  React.useEffect(() => {
    if (!potionsLoading && scenario.length === 0) {
      const all_potions = potionData.store.potions;
      setPotions(all_potions);
      
      // Sum total potions owned upon page load and generate scenario based on total potions owned
      const TOTAL_POTIONS_OWNED = all_potions.reduce((num_owned, potion) => num_owned + potion.owned, 0);
      // If there are no potions, return to main menu
      if (TOTAL_POTIONS_OWNED === 0) navigate('/main');
      
      const scenarioPatrons = generateScenario(TOTAL_POTIONS_OWNED);
      setScenario(scenarioPatrons);
      setAdventurer(scenarioPatrons[0]);
    }
  }, [potionsLoading, potionData, scenario, setPotions, setScenario, setAdventurer, navigate]);

  // Track selected potion
  const [selectedPotion, setPotion] = useState({ _id: '', potionName: '', desc: '', owned: 0 });
  const handlePotionSelection = (potion) => setPotion(potion);

  console.log('scenario: ', scenario, '\n', 'order: ', order, '\n', 'adventurer: ', adventurer, '\n');

  // Move to next adventurer in the scenario when the order has been changed
  React.useEffect(() => setAdventurer(scenario[order]), [scenario, order]);

  const handlePotionSelling = async () =>
  {
    // Check that there are sufficient potions to sell
    if (selectedPotion.owned < 1) return;

    // Request to sell selected potion
    const { data: updatedInventoryData } = await sellPotion({ variables: { potionName: selectedPotion.potionName, storeId } });

    // Update the owned potions using the response
    const updated_potions = updatedInventoryData.sellPotion.potions;
    setPotions(updated_potions);
    
    // Reset currently selected potion and increment the scenario to the next patron
    setPotion({ _id: '', potionName: '', desc: '', owned: 0 });
    setOrder(order + 1);

    // Exit the shop and return to Main Menu if there are no more patrons left
    if (order >= scenario.length - 1) navigate('/main');
  }

  const handlePotionDecline = () =>
  {
    // Reset currently selected potion and increment the scenario to the next patron
    setPotion({ _id: '', potionName: '', desc: '', owned: 0 });
    setOrder(order + 1);

    // Exit the shop and return to Main Menu if there are no more patrons left
    if (order >= scenario.length - 1) navigate('/main');
  }

  return (
    <div className="container" style={style}>
      <Navigation />
      <div className="row pt-5">
        <div className="col-2"/>
          <div className='col-2'>
            {adventurer === undefined || adventurer.occupation === '' ? <div>Preparing your shop...</div> : (
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
            )}
        </div>

        <div className='col-6'>
          <div className="card">
            <h5 className="card-header text-center">Your Inventory</h5>
            {potions.length === 0 ? <div>Getting your potions ready...</div> : (
              <div>
                <Potions handlePotionSelection={handlePotionSelection} potions={potions} />
                <div className="card-footer text-center">
                  <small className="text-muted">Selected Potion: {selectedPotion.potionName}</small>
                  <br />
                  <small className="text-muted">Description: {selectedPotion.desc}</small>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
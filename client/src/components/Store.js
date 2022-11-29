import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import Item from './item-icons/item';
import Sprites from '../assets/sprites';
// Import Ingredient/Gold Count Queries
import { QUERY_INGREDIENTS, QUERY_GOLDCOUNT } from '../utils/queries'

function Store()
{
    // GET all ingredients in the database
    const { loading, data } = useQuery(QUERY_INGREDIENTS);

    // TESTING: Gold count as a state, replace default value with GET request to database in the future
    const [gold_count, setGoldCount] = useState(600);

    // Verify transaction and make a server request to purchase the item
    const handleItemPurchase = () => {
        // Reject if there are no items to be purchased
        if (quantity <= 0) return;

        const TOTAL_COST = currentIngredient.buyPrice * quantity;

        // Reject if current gold is insufficient
        if (TOTAL_COST > gold_count) return;
        else 
        {
            setGoldCount(gold_count - TOTAL_COST);
        }
    }

    // Track the quantity of items to purchase
    const [quantity, setQuantity] = useState(0);
    // Track currently selected item to purchase
    const [selectedItemID, setItem] = useState('');

    const increment_quantity = () => setQuantity(quantity + 1);
    const decrement_quantity = () => {
        // Do not let quantity be less than 0
        if (quantity <= 0) return;

        setQuantity(quantity - 1);
    }

    // Return currently selected item properties from its id
    const currentIngredient = selectedItemID === '' 
        ? { ingredientName: '', desc: '', buyPrice: 1 } 
        : data.ingredients.filter(ingredient => ingredient._id === selectedItemID)[0];

    return (
        <div id='store_container'>
            <div id='store_display'>
                {/* Top Section (heading and gold count) */}
                <section>
                    <h1>Ingredients</h1>
                    <div className='gold_counter'>{gold_count} gold</div>
                </section>
                {/* Ingredient Selection Screen (purchasable ingredients) */}
                <section>
                    {/* Generate an Item icon for each ingredient for sale */}
                    {loading 
                        ? <div>Rummaging for ingredients...</div>
                        : (data.ingredients.map(({ _id, ingredientName}) => 
                        <div 
                            key={ingredientName} 
                            style={{ display: 'inline-block' }}
                            onClick={() => setItem(_id)}
                        >
                            {/* Generate item sprite accessed by the ingredient's name */}
                            <Item {...Sprites[ingredientName]} />
                        </div>
                    ))}
                </section>
                {/* Purchase Window (item sprite, name, description, quantity selection, and purchase button) */}
                <section>
                    <div className='item_information'>
                        <h3>{currentIngredient.ingredientName}</h3>
                        <p>
                            {currentIngredient.desc}
                        </p>
                    </div>
                    <div className='purchase_menu'>
                        <div>
                            <h4>How many?</h4>
                            <button type='button' onClick={increment_quantity}>+</button>
                            <button type='button' onClick={decrement_quantity}>-</button>
                        </div>
                        <button type='button' onClick={handleItemPurchase}>
                            Purchase{quantity > 0 ? ` (x${quantity}) ${currentIngredient.ingredientName}` : ''}?
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Store;
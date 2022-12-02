import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import Navigation from './nav-header/Navigation';
import Item from './item-icons/item';
import Sprites from '../assets/sprites';
import background from '../assets/backgrounds/ingredients.png';
import '../assets/style/menu.css';
// Import Ingredient/Gold Count Queries
import { QUERY_INGREDIENTS, QUERY_GOLDCOUNT } from '../utils/queries';
import { BUY_INGREDIENT } from '../utils/mutations';

function Store()
{
    // TESTING: Set store ID for testing queries/mutations
    const STORE_ID = '638a5bb28b3e3a3f64b01fcb';

    // GET all ingredients in the database
    const { loading: ingredientsLoading, data: ingredientData } = useQuery(QUERY_INGREDIENTS);
    // GET Gold count for user
    const { loading: storeLoading, data: storeData } = useQuery(QUERY_GOLDCOUNT, { variables: { storeId: STORE_ID } });
    // PUT transaction purchase
    const [buyIngredient, { error }] = useMutation(BUY_INGREDIENT);
    
    // GET gold count, starting with 0
    const [gold_count, setGoldCount] = useState(0);
    React.useEffect(() => storeLoading ? 0 : setGoldCount(storeData.store.goldCount), [storeLoading, storeData]);

    // Tracks selected item
    const [selectedItem, setItem] = useState({ _id: '', quantity: 0, buyPrice: 0, ingredientName: '', desc: '' });

    // Calculate total cost of selected items, starting with 0
    const [totalCost, setTotalCost] = useState(0);
    React.useEffect(() => setTotalCost(selectedItem.quantity * selectedItem.buyPrice), [selectedItem]);
    
    // Verify transaction and make a server request to purchase the item
    const handleItemPurchase = async (event) => {
        event.preventDefault();

        // Reject if there are no items to be purchased or current gold is insufficient
        if (selectedItem.quantity <= 0 || totalCost > gold_count) return;

        // Make the mutation request and update state when successful
        try {
            const { ingredientName } = selectedItem;
            const { data } = await buyIngredient({ variables: { ingredientName, storeId: STORE_ID } });
            console.log(data);
            const new_gold_count = data.buyIngredient.goldCount;

            // Update gold count from response and reset selected item and quantity
            setGoldCount(new_gold_count);
            setItem({ _id: '', quantity: 0, buyPrice: 0, ingredientName: '', desc: '' });
        }
        catch (error) {
            console.log(`There was an error when attempting to purchase x${selectedItem.quantity} ${selectedItem.ingredientName}.`);
            console.error(error);
        }
    }

    const increment_quantity = () => selectedItem._id !== '' ? setItem({ ...selectedItem, quantity: selectedItem.quantity + 1 }) : null;
    const decrement_quantity = () => {
        // Do not let quantity be less than 0 or no ingredient selected
        if (selectedItem.quantity <= 0 || selectedItem._id === '') return;

        setItem({ ...selectedItem, quantity: selectedItem.quantity - 1 });
    }

    const style = {
      backgroundImage: `url(${background})`,
      backgroundPosition: 'center',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      maxWidth: '100vw',
      height: '100vh',
    };

    return (
        <div id='store_container' style={style}>
            <Navigation />
            <div id='store_display'>
                {/* Top Section (heading and gold count) */}
                <section>
                    <h1>Ingredients</h1>
                    <div className='gold_counter'>{gold_count} gold</div>
                </section>
                {/* Ingredient Selection Screen (purchasable ingredients) */}
                <section id='ingredients_for_sale'>
                    {/* Generate an Item icon for each ingredient for sale */}
                    {ingredientsLoading 
                        ? <div>Rummaging for ingredients...</div>
                        : (ingredientData.ingredients.map((ingredient) => 
                        <div 
                            key={ingredient.ingredientName} 
                            // style={{ display: 'inline-block' }}
                            onClick={() => setItem({ ...selectedItem, ...ingredient })}
                            className='ingredient_icon'
                        >
                            {/* Generate item sprite accessed by the ingredient's name */}
                            <Item {...{...Sprites[ingredient.ingredientName], amount: ingredient.buyPrice }} />
                        </div>
                    ))}
                </section>
                {/* Purchase Window (item sprite, name, description, quantity selection, and purchase button) */}
                <section>
                    <div className='item_information'>
                        <h3>{selectedItem.ingredientName} {selectedItem.id !== '' ? `(${selectedItem.buyPrice} gold)` : ''}</h3>
                        <Item {...Sprites[selectedItem.ingredientName]} />
                        <p>
                            {selectedItem.desc}
                        </p>
                    </div>
                    <div className='purchase_menu'>
                        <div id='quantity_selection'>
                            <h4>How many?</h4>
                            <button type='button' onClick={increment_quantity}>+</button>
                            <button type='button' onClick={decrement_quantity}>-</button>
                        </div>
                        <button type='button' id='purchase' onClick={handleItemPurchase}>
                            Purchase{selectedItem.quantity > 0 ? ` (x${selectedItem.quantity}) ${selectedItem.ingredientName}?` : ''}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Store;
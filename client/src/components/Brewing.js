import React, { useState } from 'react';
import Item from './item-icons/item';
import Sprites from '../assets/sprites';
import background from '../assets/backgrounds/brewing.png';
// TESTING: Owned Ingredient Data contained in an array, replace with GET request to database in the future
const INGREDIENTS_OWNED =
[
    {
        _id: '3',
        ingredientName: 'Gyrfalcon Feathers',
        desc: 'Even as it dives, the gyrfalcon never makes a sound.',
        owned: 3
    },
    {
        _id: '4',
        ingredientName: 'Crimson Herb',
        desc: 'Oddly sweet, this herb is often consumed in the wild for a quick burst of energy.',
        owned: 0
    },
    {
        _id: '5',
        ingredientName: 'Opal Stone',
        desc: `Touching this stone to one's head opens the mind, allowing for a greater understanding of the universe.`,
        owned: 1
    }
];

function Brewing()
{
    // Track the quantity of each item owned
    const [owned_ingredients, updateQuantities] = useState(INGREDIENTS_OWNED);

    // Track ingredients to use for brewing potion
    const [ingredients, setIngredients] = useState([]);

    const addIngredient = (ingredientID) => setIngredients([ingredientID]);

    // Verify transaction and make a server request to brew the potion
    const handlePotionBrewing = () => {
        // Reject if there are no ingredients selected
        if (ingredients.length <= 0) return;

        // Verify that the selected ingredients are owned by the user
        const verified_ingredients = ingredients.filter(ingredient => ingredient.owned >= 1);
        
        // Reject if not all ingredients are owned by the user
        if (JSON.stringify(verified_ingredients) !== JSON.stringify(ingredients))
        {
            console.log('Insuffient ingredients...')
            return;
        }
        else 
        {
            console.log('You made a potion!');

            // Clear out the currently selected ingredients
            setIngredients([]);
            
            // TODO: Update the quantities using the response from the server
            // updateQuantities()
        }
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
        <div id='brewing_container' style={style}>
            <div id='brewing_display'>
                {/* Top Section (heading and gold count) */}
                <section>
                    <h1>Brewing</h1>
                </section>
                {/* Ingredient Selection Screen (owned ingredients) */}
                <section>
                    {/* Generate an Item icon for each owned ingredient */}
                    {owned_ingredients.map((ingredient) => 
                        <div 
                            key={ingredient.ingredientName} 
                            style={{ display: 'inline-block' }}
                            onClick={() => addIngredient(ingredient)}
                        >
                            {/* Generate item sprite accessed by the ingredient's name */}
                            <Item {...Sprites[ingredient.ingredientName]} />
                        </div>
                    )}
                </section>
                {/* Brewing Menu (selected ingredient and potion preview) */}
                <section>
                    <div className='ingredient_slot' style={{ border: '1px solid black' }}>
                        {/* Generate an Item icon for each owned ingredient */}
                        {ingredients.map(({ ingredientName }) => 
                            <div 
                                key={`${ingredientName}_slotted`} 
                                style={{ display: 'inline-block' }}
                            >
                                {/* Generate item sprite accessed by the ingredient's name */}
                                <Item {...Sprites[ingredientName]} />
                            </div>
                        )}
                    </div>
                    <div className='potion_preview'>
                        <button type='button' onClick={handlePotionBrewing}>
                            {ingredients.length > 0 ? <Item {...Sprites['potion-temp']} /> : ''}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Brewing;
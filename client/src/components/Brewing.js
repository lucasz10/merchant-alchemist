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
    const addIngredient = (ingredient) => setIngredients([ingredient]);

    // Track potion effect expected from given ingredients
    const [potionEffect, setPotionEffect] = useState(() => <div>No potion yet...</div>);

    // Select a potion preview from the selected ingredients
    React.useEffect(() => {
        // Check that ingredients have been selected
        if (ingredients.length < 1) return;

        switch(ingredients[0].ingredientName) 
        {
            case 'Crimson Herb':        setPotionEffect('Swiftness');   break;
            case 'Gyrfalcon Feathers':  setPotionEffect('Silencing');   break;
            case 'Opal Stone':          setPotionEffect('Insight');     break;
            default:                    setPotionEffect('potion-temp'); break;
        }
    }, [ingredients]);

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

    const styles = 
    {
        brewing_container:
        {
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            maxWidth: '100vw',
            height: '100vh'
        },
        brewing_display:
        {
            // Sizing/placement rules
            minWidth: 'fit-content',
            width: '50%',
            margin: '0 auto',
            padding: 10
        },
        section:
        {
            marginBottom: 10,
            padding: 10,
            background: '#0000007c'
        },
        ingredients:
        {
            display: 'flex',
            justifyContent: 'center'
        },
        ingredient_preview:
        {
            display: 'flex',
            justifyContent: 'space-evenly',
            border: '1px solid black'
        },
        potion_preview:
        {
            textAlign: 'center'
        }
    };

    return (
        <div id='brewing_container' style={styles.brewing_container}>
            <div id='brewing_display' style={styles.brewing_display}>
                {/* Top Section (heading and gold count) */}
                <section style={styles.section}>
                    <h1>Brewing</h1>
                </section>
                {/* Ingredient Selection Screen (owned ingredients) */}
                <section style={styles.section}>
                    {/* Generate an Item icon for each owned ingredient */}
                    <div style={styles.ingredients}>
                        {owned_ingredients.map((ingredient) => 
                            <div 
                                key={ingredient.ingredientName} 
                                style={styles.ingredient}
                                onClick={() => addIngredient(ingredient)}
                            >
                                {/* Generate item sprite accessed by the ingredient's name */}
                                <Item {...Sprites[ingredient.ingredientName]} />
                            </div>
                        )}
                    </div>
                </section>
                {/* Brewing Menu (selected ingredient and potion preview) */}
                <section style={styles.section}>
                    <div className='ingredient_slot' style={styles.ingredient_preview}>
                        {/* Generate an Item icon for each selected ingredient */}
                        {ingredients.length > 0
                            ?   ingredients.map(({ ingredientName }) => 
                                    <div 
                                        key={`${ingredientName}_slotted`} 
                                        style={styles.ingredient}
                                    >
                                        {/* Generate item sprite accessed by the ingredient's name */}
                                        <Item {...Sprites[ingredientName]} />
                                    </div>
                                )
                            :   <div style={styles.ingredient}>
                                    {/* Generate item sprite accessed by the ingredient's name */}
                                    <Item {...Sprites['temp']} />
                                </div>
                        }
                    </div>
                    <div className='potion_preview' style={styles.potion_preview}>
                        <button type='button' onClick={handlePotionBrewing}>
                            {ingredients.length > 0 ? <Item {...Sprites['potion-temp']} /> : <Item {...Sprites['temp']} />}
                        </button>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Brewing;
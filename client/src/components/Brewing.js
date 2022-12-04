import React, { useState } from 'react';
import { useStore } from '../utils/StoreContext';
import Navigation from './nav-header/Navigation';
import Item from './item-icons/item';
import Potions from './potions-list/Potions';
import Sprites from '../assets/sprites';
import background from '../assets/backgrounds/brewing.png';
import '../assets/style/menu.css';
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

// TESTING: Owned Ingredient Data contained in an array, replace with GET request to database in the future
const POTIONS_OWNED =
[
    {
        _id: '3',
        potionName: 'Vigor',
        desc: 'Restores health.',
        owned: 5
    },
    {
        _id: '4',
        potionName: 'Awakening',
        desc: 'Increases the available mana.',
        owned: 2
    },
    {
        _id: '5',
        potionName: 'Silencing',
        desc: `Silences the user's movements.`,
        owned: 1
    }
];

function Brewing()
{
    // Get storeId from StoreContext
    const { storeId } = useStore();

    // Track the quantity of each item owned
    const [owned_ingredients, updateQuantities] = useState(INGREDIENTS_OWNED);

    // Track ingredients to use for brewing potion
    const [ingredients, setIngredients] = useState([]);
    const addIngredient = (ingredient) => setIngredients([ingredient]);

    // Track potion effect expected from given ingredients
    const [potionEffect, setPotionEffect] = useState('');

    // Track User's brewed potions
    const [potions, setPotions] = useState(POTIONS_OWNED);

    // Track selected potion
    const [selectedPotion, setPotion] = useState({ _id: '', potionName: '', desc: '', owned: 0 });
    const handlePotionSelection = (potion) => setPotion(potion);

    // Select a potion preview from the selected ingredients
    React.useEffect(() => {
        // Check that ingredients have been selected
        if (ingredients.length < 1) return;

        switch(ingredients[0].ingredientName) 
        {
            case 'Copper Gel':          setPotionEffect('Endurance');       break;
            case 'Silver Gel':          setPotionEffect('Wisdom');          break;
            case 'Gold Gel':            setPotionEffect('Vigor');           break;
            case 'Crimson Herb':        setPotionEffect('Swiftness');       break;
            case 'Gyrfalcon Feathers':  setPotionEffect('Silencing');       break;
            case 'Moon Pearls':         setPotionEffect('Vanishing');       break;
            case 'Amber Powder':        setPotionEffect('Strength');        break;
            case 'Ironwood Acorn':      setPotionEffect('Resilience');      break;
            case 'Dragon Scale':        setPotionEffect('Belligerence');    break;
            case 'Three-eyed Frog':     setPotionEffect('Awakening');       break;
            case 'Opal Stone':          setPotionEffect('Insight');         break;
            case 'Mandrake Root':       setPotionEffect('Brilliance');      break;
            default:                    setPotionEffect('unknown-potion');  break;
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
            
            // TODO: Update the ingredient quantities and brewed potions using the response from the server
            // updateQuantities()
            // setPotions()
        }
    }

    const styles = 
    {
        brewing_container:
        {
            backgroundImage: `url(${background})`,
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            maxWidth: '100vw',
        }
    };

    return (
        <div id='brewing_container' style={styles.brewing_container}>
            <Navigation />
            <div id='brewing_display'>
                {/* Top Section (heading and gold count) */}
                <section>
                    <h1>Brewing</h1>
                </section>
                {/* Ingredient Selection Screen (owned ingredients) */}
                <section style={styles.section}>
                    {/* Generate an Item icon for each owned ingredient */}
                    <div className='ingredients'>
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
                    <div className='ingredient_slot'>
                        {/* Generate an Item icon for each selected ingredient */}
                        {ingredients.length > 0
                            ?   ingredients.map(({ ingredientName }) => 
                                    <div key={`${ingredientName}_slotted`}>
                                        {/* Generate item sprite accessed by the ingredient's name */}
                                        <Item {...Sprites[ingredientName]} />
                                    </div>
                                )
                            :   <div>
                                    {/* Generate item sprite accessed by the ingredient's name */}
                                    <Item {...Sprites['placeholder-ingredient']} />
                                </div>
                        }
                    </div>
                    <div className='potion_preview'>
                        <button type='button' onClick={handlePotionBrewing} title={potionEffect !== '' ? `Potion of ${potionEffect}` : 'No potion yet...'}>
                            {ingredients.length > 0 ? <Item {...Sprites[potionEffect]} /> : <Item {...Sprites['placeholder-potion']} />}
                        </button>
                    </div>
                </section>
                <section>
                    <Potions handlePotionSelection={handlePotionSelection} potions={potions} />
                    <h1>Potion: {selectedPotion.potionName}</h1>
                    <p>{selectedPotion.desc}</p>
                </section>
            </div>
        </div>
    )
}

export default Brewing;
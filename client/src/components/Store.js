import React, { useState } from 'react';
import Item from './item-icons/item';
// TESTING: Ingredient Data contained in an array, replace with GET request to database in the future
const ingredients =
[
    {
        ingredientName: 'Three-eyed Frog',
        desc: 'For some reason, staring at this frog is oddly calming.',
        buyPrice: 30
    },
    {
        ingredientName: 'Ironwood Acorn',
        desc: 'Originating from the kingdom of Valesia, these nuts are hard to crack!',
        buyPrice: 10
    }
];

function Store()
{
    // Track the quantity of items to purchase
    const [quantity, setQuantity] = useState(0);
    // Track currently selected item to purchase
    const [selectedItem, setItem] = useState('')

    const increment_quantity = () => setQuantity(quantity + 1);
    const decrement_quantity = () => {
        // Do not let quantity be less than 0
        if (quantity <= 0) return;

        setQuantity(quantity - 1);
    }

    return (
        <div id='store_container'>
            <div id='store_display'>
                {/* Top Section (heading and gold count) */}
                <section>
                    <h1>Ingredients</h1>
                    <div className='gold_counter'>{} gold</div>
                </section>
                {/* Ingredient Selection Screen (purchasable ingredients) */}
                <section>
                    <Item />
                    <Item />
                </section>
                {/* Purchase Window (item sprite, name, description, quantity selection, and purchase button) */}
                <section>
                    <div className='item_information'>
                        <h3>[Item Name]</h3>
                        <p>
                            [Item Description]
                        </p>
                    </div>
                    <div className='purchase_menu'>
                        <div>
                            <h4>How many?</h4>
                            <button type='button' onClick={increment_quantity}>+</button>
                            <button type='button' onClick={decrement_quantity}>-</button>
                        </div>
                        <button type='button'>Purchase {quantity} {selectedItem}?</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Store;
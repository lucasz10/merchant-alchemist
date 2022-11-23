import React from 'react';
import Item from './item-icons/item';

function Store()
{
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
                            <button type='button'>+</button>
                            <button type='button'>-</button>
                        </div>
                        <button type='button'>Purchase</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Store;
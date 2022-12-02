import React, { useState } from 'react';
import Item from '../item-icons/item';
import Sprites from '../../assets/sprites';

/**
 * @param {Function} handlePotionSelection - A function which implicitly returns a `setState` function for a state object
 * @param {Array} potions - An array containing potion data: `potionName`, `desc`, and `owned` 
 * @returns Potions component
 */
function Potions({ handlePotionSelection, potions })
{
    const styles =
    {
        potion_list_container: 
        {
            // Sizing rules
            margin: 10,
            width: 'fit-content',
            // Visual rules
            border: '4px solid #a5a5a5',
            backgroundColor: 'white'
        }
    }

    // Tracks potion selected, and returns to Parent component
    const [potionSelected, setPotionSelected] = useState({ _id: '', potionName: '', desc: '', owned: 0 });
    React.useEffect(() => handlePotionSelection(potionSelected), [potionSelected, handlePotionSelection]);

    return (
        <div className='potion_list_container' style={styles.potion_list_container}>
            {potions.map(({ _id, potionName, desc, owned }) => 
                <div 
                    key={potionName} 
                    value={potionName}
                    onClick={() => setPotionSelected({ _id, potionName, desc, owned }) }
                    title={`Potion of ${potionName}`} 
                    style={{ display: 'inline-block' }}
                >
                    <Item {...{ ...Sprites[potionName], amount: owned }} />
                </div>)
            }
        </div>
    );
}

export default Potions;
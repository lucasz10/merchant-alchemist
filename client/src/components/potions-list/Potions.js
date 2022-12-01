import React from 'react';
import Item from '../item-icons/item';
import Sprites from '../../assets/sprites';

/**
 * @param {Array} potions - An array containing potion data: `potionName`, `desc`, and `owned` 
 * @returns Potions component
 */
function Potions({ potions })
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

    return (
        <div className='potion_list_container' style={styles.potion_list_container}>
            {potions.map((potion) => 
                <div key={potion.potionName} title={`Potion of ${potion.potionName}`} style={{ display: 'inline-block' }}>
                    <Item {...{ ...Sprites[potion.potionName], amount: potion.owned }} />
                </div>)
            }
        </div>
    );
}

export default Potions;
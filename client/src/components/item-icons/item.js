import React from 'react';
import Sprites from '../../assets/sprites/index';

function Item()
{
    const styles =
    {
        item_el_container: 
        {
            width: 'fit-content',
            border: '8px solid burlywood',
            borderStyle: 'groove',
            backgroundColor: 'blanchedalmond'
        }
    }

    return (
        // TODO: Make sure the div has a key value!
        <div className='item_el_container' style={styles.item_el_container}>
            <img 
                className='item_img'
                src={Sprites['temp']}
                alt={""}
            >
                {/* TODO: Include information such as quantity of item if viewing in potion making screen */}
            </img>
        </div>
    )
}

export default Item;
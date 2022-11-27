import React from 'react';

function Item({ img, alt })
{
    const styles =
    {
        item_el_container: 
        {
            // Sizing rules
            margin: 10,
            width: 'fit-content',
            // Visual rules
            border: '8px solid burlywood',
            borderStyle: 'groove',
            backgroundColor: 'blanchedalmond'
        },
        item_img:
        {
            padding: 4
        }
    }

    return (
        // TODO: Make sure the div has a key value!
        <div className='item_el_container' style={styles.item_el_container}>
            <img 
                className='item_img'
                style={styles.item_img}
                src={img}
                alt={alt}
            >
                {/* TODO: Include information such as quantity of item if viewing in potion making screen */}
            </img>
        </div>
    )
}

export default Item;
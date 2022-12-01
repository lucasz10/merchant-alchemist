import React from 'react';

/**
 * @param {sprite} sprite - An object containing image data in addition to alt text.
 * @param {number} amount - An integer number indicating either: quantity owned or price of an item
 * @returns Item component
 */
function Item({ img, alt, amount })
{
    // Determines positioning of the given amount
    const BOTTOM_POS_OFFSET = -6;
    const RIGHT_POS_OFFSET = 0;

    const styles =
    {
        item_el_container: 
        {
            // Sizing rules
            margin: 10,
            width: 'fit-content',
            // Visual rules
            border: '8px groove burlywood',
            backgroundColor: '#fff'
        },
        item: { position: 'relative' },
        item_img_container:
        {
            position: 'absolute',
            bottom: BOTTOM_POS_OFFSET,
            right: RIGHT_POS_OFFSET,
            zIndex: 10
        },
        item_img:
        {
            padding: 0
        },
        item_amount:
        {
            // Font rules
            fontWeight: 'bold',
            fontSize: '2rem',
            WebkitTextStroke: '0.1px black',
	        WebkitTextFillColor: 'white',
            textShadow: '-1px 1px black',
            // Position rules
            position: 'absolute',
            bottom: BOTTOM_POS_OFFSET,
            right: RIGHT_POS_OFFSET
        }
    }
    
    return (
        <div className='item_el_container' style={styles.item_el_container}>
            <div className='item' style={styles.item}>
                <div className='item_img_container'>
                    <img 
                        className='item_img'
                        style={styles.item_img}
                        src={img}
                        alt={alt}
                    >
                    </img>
                </div>
                <div className='item_amount' style={styles.item_amount}>{amount ? amount : ''}</div>
            </div>
        </div>
    );
}

export default Item;
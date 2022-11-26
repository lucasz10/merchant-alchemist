import temp from './temp64x64.png';
import ironwoodAcorn from './ironwood-acorn64x64.png';
import threeEyedFrog from './three-eyed-frog64x64.png';

class Sprite
{
    constructor(img = temp, alt = 'This image is a placeholder and should only be visible during testing or if there is missing data. Try reloading the page.')
    {
        this.img = img;
        this.alt = alt;
    }
}

// Initialize Sprites object for holding sprite data
const Sprites = {};

// Define sprite data for each image imported
Sprites['temp'] = new Sprite();
Sprites['Three-eyed Frog'] = new Sprite(threeEyedFrog, 'Strange looking frog with a third eye in the center of its forehead with a celestial aura surrounding it.');
Sprites['Ironwood Acorn'] = new Sprite(ironwoodAcorn, 'Dark gray acorn with a light gray cap and stem.')

export default Sprites;
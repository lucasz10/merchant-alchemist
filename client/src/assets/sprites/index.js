// Importing Ingredient Sprites
import temp from './temp64x64.png';
import ironwoodAcorn from './ironwood-acorn64x64.png';
import threeEyedFrog from './three-eyed-frog64x64.png';
import gyrfalconFeathers from './gyrfalcon-feathers64x64.png';
import crimsonHerb from './crimson-herb64x64.png';
import opalStone from './opal-stone64x64.png';
// Importing Potion Sprites
import potionTemp from './potion-temp64x64.png';

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

// Define sprite data for each ingredient image imported
Sprites['temp'] = new Sprite();
Sprites['Three-eyed Frog'] = new Sprite(threeEyedFrog, 'Strange looking frog with a third eye in the center of its forehead with a celestial aura surrounding it.');
Sprites['Ironwood Acorn'] = new Sprite(ironwoodAcorn, 'Dark blue acorn with a light brown cap and stem.');
Sprites['Gyrfalcon Feathers'] = new Sprite(gyrfalconFeathers, 'Three gyrfalcon feathers with light coloration and dark tips stacked on top of each other.');
Sprites['Crimson Herb'] = new Sprite(crimsonHerb, 'An herb with crimson plant parts and furling petals which turn purple at the tips.');
Sprites['Opal Stone'] = new Sprite(opalStone, 'A dark purple stone containing multicolored flakes which resemble a galaxy, surrounded by a white aura.');

// Define sprite data for each potion image imported
Sprites['potion-temp'] = new Sprite(potionTemp);

export default Sprites;
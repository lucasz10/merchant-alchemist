// Importing Ingredient Sprites
import temp from './temp64x64.png';
import copperGel from './copper-gel64x64.png';
import silverGel from './silver-gel64x64.png';
import goldGel from './gold-gel64x64.png';
import crimsonHerb from './crimson-herb64x64.png';
import gyrfalconFeathers from './gyrfalcon-feathers64x64.png';
import moonPearls from './moon-pearls64x64.png';
import ironwoodAcorn from './ironwood-acorn64x64.png';
import threeEyedFrog from './three-eyed-frog64x64.png';
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
Sprites['Copper Gel'] = new Sprite(copperGel, 'A gelatinous drop with the sheen of copper metal, surrounded by green energy.');
Sprites['Silver Gel'] = new Sprite(silverGel, 'A gelatinous drop with the sheen of silver metal, surrounded by blue energy.');
Sprites['Gold Gel'] = new Sprite(goldGel, 'A gelatinous drop with the sheen of gold metal, surrounded by red energy.');
Sprites['Crimson Herb'] = new Sprite(crimsonHerb, 'An herb with crimson plant parts and furling petals which turn purple at the tips.');
Sprites['Gyrfalcon Feathers'] = new Sprite(gyrfalconFeathers, 'Three gyrfalcon feathers with light coloration and dark tips stacked on top of each other.');
Sprites['Moon Pearls'] = new Sprite(moonPearls, 'Five dark pearls with a purple aura surrounding them.');
Sprites['Ironwood Acorn'] = new Sprite(ironwoodAcorn, 'Dark blue acorn with a light brown cap and stem.');
Sprites['Three-eyed Frog'] = new Sprite(threeEyedFrog, 'Strange looking frog with a third eye in the center of its forehead with a celestial aura surrounding it.');
Sprites['Opal Stone'] = new Sprite(opalStone, 'A dark purple stone containing multicolored flakes which resemble a galaxy, surrounded by a white aura.');

// Define sprite data for each potion image imported
Sprites['potion-temp'] = new Sprite(potionTemp);

export default Sprites;
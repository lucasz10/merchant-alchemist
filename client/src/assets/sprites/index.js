// Importing Ingredient Sprites
import placeholder from './placeholder-ingredient64x64.png';
import unknown from './unknown-ingredient64x64.png';
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
import placeholderPotion from './potions/placeholder-potion64x64.png';
import unknownPotion from './potions/unknown-potion64x64.png';
import potionEndurance from './potions/potion-endurance64x64.png';
import potionWisdom from './potions/potion-wisdom64x64.png';
import potionVigor from './potions/potion-vigor64x64.png';
import potionSwiftness from './potions/potion-swiftness64x64.png';
import potionSilencing from './potions/potion-silencing64x64.png';
import potionVanishing from './potions/potion-vanishing64x64.png';
import potionStrength from './potions/potion-strength64x64.png';
import potionResilience from './potions/potion-resilience64x64.png';
import potionBelligerence from './potions/potion-belligerence64x64.png';
import potionAwakening from './potions/potion-awakening64x64.png';
import potionInsight from './potions/potion-insight64x64.png';
import potionBrilliance from './potions/potion-brilliance64x64.png';

class Sprite
{
    constructor(img = unknown, alt = 'This image indicates that there is missing ingredient data. Try reloading the page.')
    {
        this.img = img;
        this.alt = alt;
    }
}

// Initialize Sprites object for holding sprite data
const Sprites = {};

// Define sprite data for each ingredient image imported
Sprites['placeholder-ingredient'] = new Sprite(placeholder, 'A generic preview of an ingredient to signify that no ingredients have been selected at this moment.');
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
Sprites['placeholder-potion'] = new Sprite(placeholderPotion, 'A generic preview of a potion to signify that no ingredients have been selected at this moment.');
Sprites['unknown-potion'] = new Sprite(unknownPotion, 'If this image is visible, then an unrecognized potion ingredient has been selected. Try reloading the page.');
Sprites['Endurance'] = new Sprite(potionEndurance, 'Glass bottle filled with a bright green liquid.');
Sprites['Wisdom'] = new Sprite(potionWisdom, 'Glass bottle filled with a bright blue liquid.');
Sprites['Vigor'] = new Sprite(potionVigor, 'Glass bottle filled with a bright orange liquid.');
Sprites['Swiftness'] = new Sprite(potionSwiftness, 'Glass bottle filled with a light cyan liquid.');
Sprites['Silencing'] = new Sprite(potionSilencing, 'Glass bottle filled with a white liquid.');
Sprites['Vanishing'] = new Sprite(potionVanishing, 'Glass bottle filled with a purple liquid.');
Sprites['Strength'] = new Sprite(potionStrength, 'Glass bottle filled with a red liquid.');
Sprites['Resilience'] = new Sprite(potionResilience, 'Glass bottle filled with a dark grayish blue liquid.');
Sprites['Belligerence'] = new Sprite(potionBelligerence, 'Glass bottle filled with a yellow orange liquid.');
Sprites['Awakening'] = new Sprite(potionAwakening, 'Glass bottle filled with a magenta liquid.');
Sprites['Insight'] = new Sprite(potionInsight, 'Glass bottle filled with a turquoise liquid.');
Sprites['Brilliance'] = new Sprite(potionBrilliance, 'Glass bottle filled with a light yellow liquid.');

export default Sprites;
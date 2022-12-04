
class Adventurer
{
    constructor(occupation)
    {
        this.occupation = occupation;
    }
}

const knight = new Adventurer('knight');
const mage = new Adventurer('mage');
const rogue = new Adventurer('rogue');

const Adventurers = [knight, mage, rogue];

function generateScenario(potionsOwnedSum)
{
    // Generates random number from 0 to range - 1
    const generateRandomNum = (range) => Math.floor(Math.random() * range);

    var numPatrons;

    if (potionsOwnedSum <= 5) numPatrons = potionsOwnedSum;
    else if (potionsOwnedSum <= 10) numPatrons = 5 + generateRandomNum(5);
    else if (potionsOwnedSum <= 15) numPatrons = 10 + generateRandomNum(4);
    else if (potionsOwnedSum <= 20) numPatrons = 14 + generateRandomNum(3);
    else if (potionsOwnedSum > 20) numPatrons = 17;
    else console.log('Number of potions was not defined for generateScenario().');

    let shopPatrons = [];

    for (let i = 0 ; i < numPatrons ; i++)
    {
        // Generate a random index for adventurer from 0 to 2
        let patron_index = generateRandomNum(3);
        let adventurer = Adventurers[patron_index];
        // Add adventurer to list of patrons
        shopPatrons.push(adventurer);
    }

    return shopPatrons;
}

export default generateScenario;
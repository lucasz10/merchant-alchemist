
class Adventurer
{
    constructor(name, occupation, dialogue)
    {
        this.name = name;
        this.occupation = occupation;
        this.dialogue = dialogue;
    }
}

const occupations = ['knight', 'mage', 'rogue'];

const names =
{
    knight:
    [
        'Hagrid',
        'Aragorn',
        'Zorya'
    ],
    mage:
    [
        'Trinity',
        'Alice',
        'Furiosa'
    ],
    rogue:
    [
        'Han',
        'Leon',
        'Denton'
    ]
};

const dialogue_options =
{
    knight:
    [
        'Would yer like to sell me some of yer potions?',
        'Me strong, but would like to be more strong!',
        'Any potions for a mighty warrior such as myself?'
    ],
    mage:
    [
        'Kind potion seller, would you sell me your strongest potions?',
        'Please! I am in need of potions to boost my wits!',
        `I'd like to cast some more spells, would you happen to have just the right brew?`
    ],
    rogue:
    [
        'Hey, pal. Got any of those potions for sneaky types like me?',
        `I'd like some potions, preferably the stealthy variety...if you catch my drift.`,
        `Psst, any potions for sale there, boss?`
    ]
};

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
        // Generate a random adventurer occupation
        let occupation_index = generateRandomNum(occupations.length);
        let occupation = occupations[occupation_index];

        // Generate a random name and dialogue option from the occupation
        let name_index = generateRandomNum(names[occupation].length);
        let name = names[occupation][name_index];
        let dialogue_index = generateRandomNum(dialogue_options[occupation].length);
        let dialogue = dialogue_options[occupation][dialogue_index];

        const adventurer = new Adventurer(name, occupation, dialogue);

        // Add adventurer to list of patrons
        shopPatrons.push(adventurer);
    }

    return shopPatrons;
}

export default generateScenario;
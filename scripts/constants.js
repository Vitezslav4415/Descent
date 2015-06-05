var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
var MONSTERS_LIST = [
	['Arachyura',2,2,false],
	['Bandit',1,1,true],
	['Bane Spider',2,2,true],
	['Barghest',1,2,false],
	['Beastman',1,1,false],
	['Blood Ape',1,2,false],
	['Carrion Drake',1,1,false],
	['Cave Spider',1,1,false],
	['Changeling',1,1,false],
	['Crypt Dragon',2,3,true],
	['Dark Priest',1,1,true],
	['Deep Elf',1,1,false],
	['Demon Lord',2,2,false],
	['Elemental',2,2,true],
	['Ettin',2,2,false],
	['Ferrox',1,1,false],
	['Fire Imps',1,1,true],
	['Flesh Moulder',1,1,true],
	['Giant',2,2,false],
	['Goblin Archer',1,1,true],
	['Goblin Witcher',1,1,true],
	['Harpy',1,1,false],
	['Hellhound',1,2,false],
	['Hybrid_Sentinel',1,1,false],
	['Ice Wyrm',2,3,false],
	['Ironbound',1,1,false],
	['Kobold',1,1,false],
	['Lava Beetle',1,1,true],
	['Manticore',2,2,true],
	['Medusa',1,1,true],
	['Merriod',2,2,false],
	['Naga',2,2,true],
	['Ogre',2,2,false],
	['Rat Swarm',1,2,false],
	['Razorwing',1,1,false],
	['Shade',1,1,false],
	['Shadow Dragon',2,3,false],
	['Skeleton Archer',1,1,true],
	['Sorcerer',1,1,true],
	['Troll',2,2,false],
	['Volucrix Reaver',1,1,false],
	['Wendigo',2,2,false],
	['Wraith',1,1,true],
	['Ynfernael Hulk',2,2,false],
	['Zombie',1,1,false]
]

var SHOWING_CLASSES = [];
SHOWING_CLASSES[1] = 'showOneCell';
SHOWING_CLASSES[2] = 'showTwoCells';
SHOWING_CLASSES[3] = 'showThreeCells';

var monsterNumber = 1;

var options = {};
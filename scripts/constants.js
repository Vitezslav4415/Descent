var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function listsort(a, b) {
    if(a[0] < b[0]) return -1;
    if(a[0] > b[0]) return 1;
    return 0;
}

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

var MONSTERS_HP = [
	['Arachyura',5,7,7,9],
	['Bandit',4,5,6,7],
	['Bane Spider',4,7,6,9],
	['Barghest',4,6,6,8],
	['Beastman',4,5,5,6],
	['Blood Ape',5,7,7,9],
	['Carrion Drake',6,8,7,10],
	['Cave Spider',3,5,5,7],
	['Changeling',4,6,6,8],
	['Crypt Dragon',5,7,7,10],
	['Dark Priest',2,5,7,9],
	['Deep Elf',7,9,8,10],
	['Demon Lord',6,9,8,12],
	['Elemental',4,6,8,10],
	['Ettin',5,8,7,9],
	['Ferrox',4,5,5,8],
	['Fire Imps',2,4,4,6],
	['Flesh Moulder',4,5,5,7],
	['Giant',10,12,12,15],
	['Goblin Archer',2,4,4,6],
	['Goblin Witcher',3,5,6,8],
	['Harpy',3,5,4,6],
	['Hellhound',3,6,5,8],
	['Hybrid Sentinel',5,8,6,9],
	['Ice Wyrm',7,9,11,14],
	['Ironbound',8,10,10,12],
	['Kobold',2,4,4,6],
	['Lava Beetle',3,5,5,7],
	['Manticore',5,7,7,9],
	['Medusa',4,6,6,9],
	['Merriod',5,7,7,9],
	['Naga',4,5,6,7],
	['Ogre',6,8,9,12],
	['Rat Swarm',4,5,5,6],
	['Razorwing',4,6,7,9],
	['Shade',2,4,4,6],
	['Shadow Dragon',6,9,8,10],
	['Skeleton Archer',2,5,4,8],
	['Sorcerer',3,5,5,8],
	['Troll',8,10,10,13],
	['Volucrix Reaver',3,5,4,6],
	['Wendigo',4,7,7,10],
	['Wraith',5,7,6,8],
	['Ynfernael Hulk',8,9,9,10],
	['Zombie',3,6,5,9]
];

var wiz = 'wizard', war = 'warrior', rog = 'rogue', sup = 'support';

var HEROES_LIST = [
	['Ashrian',10,4,sup],
	['Grisban the thirsty',14,4,war],
	['Jain Fairwood',8,5,rog],
	['Leoric of the book',8,5,wiz],
	['Avric Albright',12,4,sup],
	['Syndrael',12,4,war],
	['Tomble Burrowell',8,5,rog],
	['Widow Tarha',10,4,wiz],
	['Elder Mok',10,4,sup],
	['Laurel of Bloodwood',8,5,rog],
	['Shiver',10,4,wiz],
	['Trenloe the strong',12,3,war],
	['Brother Gherinn',12,4,sup],
	['Corbin',12,5,war],
	['Jaes the exile',12,3,wiz],
	['Lindel',10,5,rog],
	['Andria Runehand',12,4,sup],
	['Astarra',10,5,wiz],
	['Tahlia',14,4,war],
	['Tetherys',10,4,rog],
	['Sahla',10,4,sup],
	['Mordrog',14,4,war],
	['Silhouette',10,4,rog],
	['Lord Howthorne',12,4,war],
	['Ispher',10,4,sup],
	['Master Thorn',8,4,wiz],
	['Nara the Fang',10,4,war],
	['Sir Valadir',12,4,war],
	['Challara',10,4,wiz],
	['High mage Quellen',10,4,wiz],
	['Reynhart the worthy',12,4,war],
	['Alys Raine',12,4,war],
	['Thaiden Mistpeak',10,5,rog],
	['Ulma Grimstone',8,5,sup],
	['Pathfinder Durik',10,4,war],
	['Logan Leshley',10,4,rog],
	['Dezra the Vile',8,4,wiz],
	['Serena',8,6,sup],
	['Rendiel',10,4,sup],
	['Orkell the swift',10,5,war],
	['Tinashi the wanderer',12,4,rog],
	['Ravaella lightfoot',8,5,wiz],
	['Roganna the Shade',10,4,rog],
	['Augur Grisom',12,5,sup]
];

MONSTERS_LIST.sort(listsort);
HEROES_LIST.sort(listsort);

PETS = [
	'brightblaze',
	'reanimated'
];

var SHOWING_CLASSES = [];
SHOWING_CLASSES[1] = 'showOneCell';
SHOWING_CLASSES[2] = 'showTwoCells';
SHOWING_CLASSES[3] = 'showThreeCells';

var monsterNumber = 1;

var config = {};

var defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJsZWFkZXIiOiJ0cnVlIiwieCI6IjgiLCJ5IjoiMTEiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJsZWFkZXIiOiJmYWxzZSIsIngiOiI3IiwieSI6IjEzIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibGVhZGVyIjoiZmFsc2UiLCJ4IjoiOSIsInkiOiIxMiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0In0seyJ0aXRsZSI6IlZvbHVjcml4IFJlYXZlciIsImxlYWRlciI6ImZhbHNlIiwieCI6IjgiLCJ5IjoiMTUiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9XSwiaGVybzEiOnsidGl0bGUiOiJBdWd1ciBHcmlzb20iLCJ4IjoiMTEiLCJ5IjoiMTMiLCJocCI6IjEyIiwic3RhbWluYSI6IjUifSwiaGVybzIiOnsidGl0bGUiOiJTaXIgVmFsYWRpciIsIngiOiIxMSIsInkiOiIxMSIsImhwIjoiMyIsInN0YW1pbmEiOiIwIn0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEwIiwieSI6IjEzIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEifSwiaGVybzQiOnsidGl0bGUiOiJMaW5kZWwiLCJ4IjoiMTAiLCJ5IjoiMTIiLCJocCI6IjEwIiwic3RhbWluYSI6IjMifX0=';
defaultConfig = 'eyJtb25zdGVycyI6W3sidGl0bGUiOiJSYXpvcndpbmciLCJtYXN0ZXIiOiJ0cnVlIiwieCI6IjgiLCJ5IjoiMTEiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiNSJ9LHsidGl0bGUiOiJSYXpvcndpbmciLCJsZWFkZXIiOiJmYWxzZSIsIngiOiI3IiwieSI6IjEzIiwidmVydGljYWwiOmZhbHNlLCJocCI6IjQifSx7InRpdGxlIjoiUmF6b3J3aW5nIiwibGVhZGVyIjoiZmFsc2UiLCJ4IjoiOSIsInkiOiIxMiIsInZlcnRpY2FsIjpmYWxzZSwiaHAiOiI0In0seyJ0aXRsZSI6IlZvbHVjcml4IFJlYXZlciIsImxlYWRlciI6ImZhbHNlIiwieCI6IjgiLCJ5IjoiMTUiLCJ2ZXJ0aWNhbCI6ZmFsc2UsImhwIjoiMyJ9XSwiaGVybzEiOnsidGl0bGUiOiJBdWd1ciBHcmlzb20iLCJ4IjoiMTEiLCJ5IjoiMTMiLCJocCI6IjEyIiwic3RhbWluYSI6IjUifSwiaGVybzIiOnsidGl0bGUiOiJTaXIgVmFsYWRpciIsIngiOiIxMSIsInkiOiIxMSIsImhwIjoiMyIsInN0YW1pbmEiOiIwIn0sImhlcm8zIjp7InRpdGxlIjoiTGVvcmljIG9mIHRoZSBib29rIiwieCI6IjEwIiwieSI6IjEzIiwiaHAiOiI3Iiwic3RhbWluYSI6IjEifSwiaGVybzQiOnsidGl0bGUiOiJMaW5kZWwiLCJ4IjoiMTAiLCJ5IjoiMTIiLCJocCI6IjEwIiwic3RhbWluYSI6IjMifX0=';
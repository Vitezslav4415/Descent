function toggleMenu() {
	$('.menu').toggleClass('active');
}

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
MONSTERS_LIST = [
	['Flesh Moulder',1,1,true],
	['Goblin Archer',1,1,true],
	['Merriod',2,2,false],
	['Zombie',1,1,false],
	['Cave Spider',1,1,false],
	['Barghest',1,2,false],
	['Ettin',2,2,false],
	['Elemental',2,2,true],
	['Shadow Dragon',2,3,false],
	['Blood Ape',1,2,false],
	['Carrion Drake',1,1,false],
	['Changeling',1,1,false],
	['Deep Elf',1,1,false],
	['Demon Lord',2,2,false],
	['Ferrox',1,1,false],
	['Fire Imps',1,1,true],
	['Goblin Witcher',1,1,true],
	['Harpy',1,1,false],
	['Hellhound',1,2,false],
	['Hybrid_Sentinel',1,1,false],
	['Ice Wyrm',2,3,false],
	['Ironbound',1,1,false],
	['Kobold',1,1,false],
	['Manticore',2,2,true],
	['Arachyura',2,2,false],
	['Bandit',1,1,true],
	['Bane Spider',2,2,true],
	['Beastman',1,1,false],
	['Crypt Dragon',2,3,true],
	['Dark Priest',1,1,true],
	['Giant',2,2,false],
	['Lava Beetle',1,1,true],
	['Medusa',1,1,true],
	['Naga',2,2,true],
	['Ogre',2,2,false],
	['Rat Swarm',1,2,false],
	['Razorwing',1,1,false],
	['Shade',1,1,false],
	['Skeleton Archer',1,1,true],
	['Sorcerer',1,1,true],
	['Troll',2,2,false],
	['Volucrix Reaver',1,1,false],
	['Wendigo',2,2,false],
	['Wraith',1,1,true],
	['Ynfernael Hulk',2,2,false]
]

var mapWidth = 26;
var mapHeigth = 26;

function createSelect(title) {
	html = '<div class="btn-group select-x showOneCell showTwoCells"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' + title + ' <span class="caret"></span></button><ul class="dropdown-menu" role="menu"></ul></div>';
	
	return html;
}

function addOptionOld(title, value, optionClass) {
	return '<option class="' + optionClass + '" value="' + value + '">' + title + '</option>';
}

function addOption(title, value, optionClass) {
	return '<li class="' + optionClass + '"><a href="javascript:setOption(\'' + value + '\')">' + title + '</a></li>';
}

function getAlphabetChar(number) {
	result = '';
	if (number > 26) {
		result += ALPHABET.charAt(Math.floor(number/26));
	}
	return result += ALPHABET.charAt(number%26);
}

function createXSelectContent () {
	var html = '';
	for (i = 1; i <= mapWidth; i++) {
		html += addOption(i.toString(), '1' + i.toString(), 'oneCell');
		if (i <= mapWidth-1)
			html += addOption(i.toString() + '-' + (i+1).toString(), '2' + i.toString(), 'twoCells');
		if (i <= mapWidth-2)
			html += addOption(i.toString() + '-' + (i+2).toString(), '3' + i.toString(), 'threeCells');
	}
	return html;
}

function createYSelectContent () {
	var html = '';
	for (i = 1; i <= mapHeigth; i++) {
		html += addOption(getAlphabetChar(i-1), '1' + i.toString(), 'oneCell');
		if (i <= mapHeigth-1)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i), '2' + i.toString(), 'twoCells');
		if (i <= mapHeigth-2)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i+1), '3' + i.toString(), 'threeCells');
	}
	return html;
}


$(function() {
	$('.select-x ul').append(createXSelectContent());
	$('.select-y ul').append(createYSelectContent());
});
function toggleMenu() {
	$('.menu').toggleClass('active');
}

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
MONSTERS_LIST = [
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

SHOWING_CLASSES = [];
SHOWING_CLASSES[1] = 'showOneCell';
SHOWING_CLASSES[2] = 'showTwoCells';
SHOWING_CLASSES[3] = 'showThreeCells';

var monsterWidth = [];
var monsterHeight = [];
var monsterRanged = [];

var mapWidth = 26;
var mapHeight = 26;

function adjustMonsterParams() {
	for (i = 0 ; i < MONSTERS_LIST.length; i++) {
		var monster = MONSTERS_LIST[i];
		monsterWidth[monster[0]] = monster[1];
		monsterHeight[monster[0]] = monster[2];
		monsterRanged[monster[0]] = monster[3];
	}
}

function createSelect(title) {
	html = '<div class="btn-group select-x showOneCell showTwoCells"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' + title + ' <span class="caret"></span></button><ul class="dropdown-menu" role="menu"></ul></div>';
	
	return html;
}

function addOptionOld(title, value, optionClass) {
	return '<option class="' + optionClass + '" value="' + value + '">' + title + '</option>';
}

function addOption(title, value, optionClass) {
	return '<li class="' + optionClass + '"><a href="#" onclick="updateOption(this, \'' + value + '\')">' + title + '</a></li>';
}

function updateOption(element, value) {
	var container = $(element).parents('.select-row');
	if (value == '') { //monster select
		monsterTitle = $(element).html();
		$(container).find('.monster-title').html(monsterTitle);
		var firstClass = SHOWING_CLASSES[monsterWidth[monsterTitle]];
		var secondClass = SHOWING_CLASSES[monsterHeight[monsterTitle]];
		var xYSelects = $(container).find('.select-x, .select-y');
		xYSelects.removeClass(SHOWING_CLASSES[1] + ' ' + SHOWING_CLASSES[2] + ' ' + SHOWING_CLASSES[3]);
		xYSelects.addClass(firstClass);
		if (firstClass == secondClass) {
			xYSelects.addClass('squared');
		} else {
			xYSelects.addClass(secondClass);
		}
	} else { //coordinate select
		var selectedSize = value.charAt(0);
		var selectedCooedinate = value.substr(1);
		if (!$(this).hasClass('squared')) { //FIX!
			if ($(this).parents('.btn-group').hasClass('select-x')) {
				$(container).find('.select-y').removeClass(SHOWING_CLASSES[selectedSize]);
			} else {
				$(container).find('.select-x').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		}
	}
}

function getAlphabetChar(number) {
	result = '';
	if (number > 26) {
		result += ALPHABET.charAt(Math.floor(number/26) - 1);
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
	for (i = 1; i <= mapHeight; i++) {
		html += addOption(getAlphabetChar(i-1), '1' + i.toString(), 'oneCell');
		if (i <= mapHeight-1)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i), '2' + i.toString(), 'twoCells');
		if (i <= mapHeight-2)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i+1), '3' + i.toString(), 'threeCells');
	}
	return html;
}

function createMonsterSelectContent () {
	var html = '';
	for (i = 0; i < MONSTERS_LIST.length; i++) {
		html += addOption(MONSTERS_LIST[i][0], '', '');
	}
	return html;
}

$(function() {
	adjustMonsterParams();
	$('.select-monster ul').append(createMonsterSelectContent());
	$('.select-x ul').append(createXSelectContent());
	$('.select-y ul').append(createYSelectContent());
});
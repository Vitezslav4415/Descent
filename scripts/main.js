function toggleMenu() {
	$('.menu').toggleClass('active');
}

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
	if (value == '' || value == 'Clear') { //monster select or clearing cordinates
		monsterTitle = $(element).html();
		var xYSelects = $(container).find('.select-x, .select-y');
		
		if (value == '') {
			container.find('.monster-title').html(monsterTitle + ' ');
			container.find('input[name="monster-title"]').attr('value',monsterTitle);
		} else {
			var otherElementThanCleared;
			if ($(element).parents('.btn-group').hasClass('select-x')) {
				otherElementThanCleared = container.find('.select-y');
				container.find('.x-title').html('Select X coordinate' + ' ');
			} else {
				otherElementThanCleared = container.find('.select-x');
				container.find('.y-title').html('Select Y coordinate' + ' ');
			}
			xYSelects = otherElementThanCleared;
			monsterTitle = container.find('.monster-title').html();
			monsterTitle = monsterTitle.substring(0, monsterTitle.length - 1);
		}
		
		var firstClass = SHOWING_CLASSES[monsterWidth[monsterTitle]];
		var secondClass = SHOWING_CLASSES[monsterHeight[monsterTitle]];
		xYSelects.removeClass(SHOWING_CLASSES[1] + ' ' + SHOWING_CLASSES[2] + ' ' + SHOWING_CLASSES[3] + ' squared');
		xYSelects.addClass(firstClass);
		if (firstClass == secondClass) {
			xYSelects.addClass('squared');
		} else {
			xYSelects.addClass(secondClass);
		}
	} else { //coordinate select
		var selectedSize = value.charAt(0);
		var selectedCooedinate = value.substr(1);
		var parent = $(element).parents('.btn-group');
		
		if (parent.hasClass('select-x')) {
			container.find('input[name="monster-x"]').attr('value',selectedCooedinate);
			container.find('.x-title').html($(element).html() + ' ');
			if (!parent.hasClass('squared')) {
				container.find('.select-y').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		} else {
			container.find('.y-title').html($(element).html() + ' ');
			container.find('input[name="monster-y"]').attr('value',selectedCooedinate);
			if (!parent.hasClass('squared')) {
				container.find('.select-x').removeClass(SHOWING_CLASSES[selectedSize]);
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
	var html = addOption('Clear', 'Clear', '');
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
	var html = addOption('Clear', 'Clear', '');
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

function addMonsterLine(element) {
	var monsterLine = $('<div>').attr('id','monster' + monsterNumber.toString());
	monsterNumber += 1;
	monsterLine.addClass('select-row');
	monsterLine.append(createInputSelect('Select monster', 'monster-title', 'select-monster'));
	monsterLine.append(createInputSelect('Select X coordinate', 'x-title', 'select-x'));
	monsterLine.append(createInputSelect('Select Y coordinate', 'y-title', 'select-y'));
	monsterLine.append($('<input type="hidden" name="monster-title" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-x" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-y" value=""/>'));
	
	monsterLine.find('.select-monster ul').append(createMonsterSelectContent());
	monsterLine.find('.select-x ul').append(createXSelectContent());
	monsterLine.find('.select-y ul').append(createYSelectContent());
	$(element).append(monsterLine);
}

function createInputSelect(title, titleClass, additionalClass) {
	var select = $('<div>').addClass('btn-group').addClass(additionalClass);
	var button = $('<button>').attr('type','button').addClass('btn btn-default dropdown-toggle').attr('data-toggle','dropdown').attr('aria-expanded','false');
	button.append($('<span>' + title + ' </span>').addClass(titleClass)).append($('<span>').addClass('caret'));
	select.append(button).append($('<ul>').addClass('dropdown-menu').attr('role','menu'));
	return select;
}

$(function() {
	adjustMonsterParams();
	addMonsterLine($('#monsters'));
	/*$('.select-monster ul').append(createMonsterSelectContent());
	$('.select-x ul').append(createXSelectContent());
	$('.select-y ul').append(createYSelectContent());*/
});

$('.nav-tabs a').click(function (e) {
	e.preventDefault()
	$(this).tab('show')
})

function toggleMenu() {
	$('.menu').toggleClass('active');
}

var monsterWidth = [];
var monsterHeight = [];
var monsterRanged = [];
var monsterMinionHpActOne = [];
var monsterLeaderHpActOne = [];
var monsterMinionHpActTwo = [];
var monsterLeaderHpActTwo = [];
var actOne = true;

var mapWidth = 26;
var mapHeight = 26;

function adjustMonsterParams() {
	for (i = 0 ; i < MONSTERS_LIST.length; i++) {
		var monster = MONSTERS_LIST[i];
		monsterWidth[monster[0]] = monster[1];
		monsterHeight[monster[0]] = monster[2];
		monsterRanged[monster[0]] = monster[3];
	}
	for (i = 0 ; i < MONSTERS_HP.length; i++) {
		var monster = MONSTERS_HP[i];
		monsterMinionHpActOne[monster[0]] = monster[1];
		monsterLeaderHpActOne[monster[0]] = monster[2];
		monsterMinionHpActTwo[monster[0]] = monster[3];
		monsterLeaderHpActTwo[monster[0]] = monster[4];
	}
}

function createSelect(title) {
	html = '<div class="btn-group select-x showOneCell showTwoCells"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' + title + ' <span class="caret"></span></button><ul class="dropdown-menu" role="menu"></ul></div>';
	
	return html;
}

function addOptionOld(title, value, optionClass) {
	return '<option class="' + optionClass + '" value="' + value + '">' + title + '</option>';
}

function addOption(title, value, optionClass, functionTitle) {
	return '<li class="' + optionClass + '"><a href="#" onclick="' + functionTitle + '(this, \'' + value + '\')">' + title + '</a></li>';
}

function updateMonster(element, value) {
	updateOption(element, value, true);
}

function updateCoordinate(element, value) {
	updateOption(element, value, false);
}

function updateOption(element, value, isMonster) {
	var container = $(element).parents('.select-row');
	if (isMonster || value == 'Clear') { //monster select or clearing cordinates
		monsterTitle = $(element).html();
		container.find('input[name="leader"]').attr('value', monsterTitle.indexOf('leader') > -1);
		var xYSelects = $(container).find('.select-x, .select-y');
		
		if (isMonster) {
			var monsterHp;
			if (monsterTitle.indexOf('leader') > -1) {
				if (actOne) {
					monsterHp = monsterLeaderHpActOne[value];
				} else {
					monsterHp = monsterLeaderHpActTwo[value];
				}
			} else {
			if (actOne) {
					monsterHp = monsterMinionHpActOne[value];
				} else {
					monsterHp = monsterMinionHpActTwo[value];
				}
			}
			container.find('.monster-title').html(monsterTitle + ' ');
			container.find('input[name="monster-title"]').attr('value',value);
			container.find('.x-title').html('Select X coordinate' + ' ');
			container.find('.y-title').html('Select Y coordinate' + ' ');
			container.find('input[name="monster-x"]').attr('value','');
			container.find('input[name="monster-y"]').attr('value','');
			container.find('input[name="monster-hp"]').val(monsterHp);
		} else {
			var otherElementThanCleared;
			if ($(element).parents('.btn-group').hasClass('select-x')) {
				otherElementThanCleared = container.find('.select-y');
				container.find('.x-title').html('Select X coordinate' + ' ');
				container.find('input[name="monster-x"]').attr('value','');
			} else {
				otherElementThanCleared = container.find('.select-x');
				container.find('.y-title').html('Select Y coordinate' + ' ');
				container.find('input[name="monster-y"]').attr('value','');
			}
			xYSelects = otherElementThanCleared;
			value = container.find('.monster-title').html();
			value = value.substring(0, value.length - 1);
		}
		
		var firstClass = SHOWING_CLASSES[monsterWidth[value]];
		var secondClass = SHOWING_CLASSES[monsterHeight[value]];
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
			container.find('input[name="monster-x-size"]').attr('value',selectedSize);
			container.find('.x-title').html($(element).html() + ' ');
			if (!parent.hasClass('squared')) {
				container.find('.select-y').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		} else {
			container.find('.y-title').html($(element).html() + ' ');
			container.find('input[name="monster-y"]').attr('value',selectedCooedinate);
			container.find('input[name="monster-y-size"]').attr('value',selectedSize);
			if (!parent.hasClass('squared')) {
				container.find('.select-x').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		}
	}
}

function removeRow(element) {
	$(element).parents('.select-row').remove();
}

function getAlphabetChar(number) {
	result = '';
	if (number > 26) {
		result += ALPHABET.charAt(Math.floor(number/26) - 1);
	}
	return result += ALPHABET.charAt(number%26);
}

function createXSelectContent () {
	var html = addOption('Clear', 'Clear', '', 'updateCoordinate');
	for (i = 1; i <= mapWidth; i++) {
		html += addOption(i.toString(), '1' + i.toString(), 'oneCell', 'updateCoordinate');
		if (i <= mapWidth-1)
			html += addOption(i.toString() + '-' + (i+1).toString(), '2' + i.toString(), 'twoCells', 'updateCoordinate');
		if (i <= mapWidth-2)
			html += addOption(i.toString() + '-' + (i+2).toString(), '3' + i.toString(), 'threeCells', 'updateCoordinate');
	}
	return html;
}

function createYSelectContent () {
	var html = addOption('Clear', 'Clear', '', 'updateCoordinate');
	for (i = 1; i <= mapHeight; i++) {
		html += addOption(getAlphabetChar(i-1), '1' + i.toString(), 'oneCell', 'updateCoordinate');
		if (i <= mapHeight-1)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i), '2' + i.toString(), 'twoCells', 'updateCoordinate');
		if (i <= mapHeight-2)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i+1), '3' + i.toString(), 'threeCells', 'updateCoordinate');
	}
	return html;
}

function createMonsterSelectContent () {
	var html = '';
	for (i = 0; i < MONSTERS_LIST.length; i++) {
		html += addOption(MONSTERS_LIST[i][0] + ' leader', MONSTERS_LIST[i][0], '', 'updateMonster');
		html += addOption(MONSTERS_LIST[i][0] + ' minion', MONSTERS_LIST[i][0], '', 'updateMonster');
	}
	return html;
}

function addMonsterLine() {
	var monsterLine = $('<div>').attr('id','monster' + monsterNumber.toString());
	monsterNumber += 1;
	monsterLine.addClass('select-row');
	monsterLine.append(createInputSelect('Select monster', 'monster-title', 'select-monster'));
	monsterLine.append(createInputSelect('Select X coordinate', 'x-title', 'select-x'));
	monsterLine.append(createInputSelect('Select Y coordinate', 'y-title', 'select-y'));
	monsterLine.append($('<input type="text" name="monster-hp" class="form-control" placeholder="Set HP" value=""/>'));
	//monsterLine.append($('<input type="text" name="monster-stamina" class="form-control" placeholder="Set stamina" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-title" value=""/>'));
	monsterLine.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	monsterLine.append($('<input type="hidden" name="monster-x" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-x-size" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-y" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-y-size" value=""/>'));
	monsterLine.append($('<input type="hidden" name="leader" value=""/>'));
	
	monsterLine.find('.select-monster ul').append(createMonsterSelectContent());
	monsterLine.find('.select-x ul').append(createXSelectContent());
	monsterLine.find('.select-y ul').append(createYSelectContent());
	$('#monsters-container').append(monsterLine);
}

function createInputSelect(title, titleClass, additionalClass) {
	var select = $('<div>').addClass('btn-group').addClass(additionalClass);
	var button = $('<button>').attr('type','button').addClass('btn btn-default dropdown-toggle').attr('data-toggle','dropdown').attr('aria-expanded','false');
	button.append($('<span>' + title + ' </span>').addClass(titleClass)).append($('<span>').addClass('caret'));
	select.append(button).append($('<ul>').addClass('dropdown-menu').attr('role','menu'));
	return select;
}

function monster(element) {
	var container = $(element);
	var monster = {};
	monster.title = container.find('[name="monster-title"]').val();
	monster.leader = container.find('[name="leader"]').val();
	monster.x = container.find('[name="monster-x"]').val();
	monster.y = container.find('[name="monster-y"]').val();
	monster.vertical = container.find('[name="monster-x-size"]').val() < container.find('[name="monster-y-size"]').val();
	monster.hp = container.find('[name="monster-hp"]').val();
	monster.stamina = container.find('[name="monster-stamina"]').val();
	return monster;
}

function populate() {
	collectData();
	constructMapFromConfig();
}

function collectData() {
	var monsterRows = $('#monsters .select-row');
	options.monsters = [];
	for (i = 0; i < monsterRows.length; i++) {
		options.monsters.push(monster(monsterRows[i]));
	}
}

function adjustAct() {
	actOne = $('[name="act"]:checked').val() == 'one';
}

$(function() {
	adjustMonsterParams();
	addMonsterLine();
	/*$('.select-monster ul').append(createMonsterSelectContent());
	$('.select-x ul').append(createXSelectContent());
	$('.select-y ul').append(createYSelectContent());*/

	$('.nav-tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})

	$('.nav-tabs #map').click(function (e) {
		e.preventDefault();
		populate();
		$(this).tab('show');
	})
});
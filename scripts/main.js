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
var heroesHp = [];
var heroesStamina = [];
var heroesType = [];

var mapWidth = 26;
var mapHeight = 26;

function adjustMonsterHeroParams() {
	for (var i = 0 ; i < MONSTERS_LIST.length; i++) {
		var monster = MONSTERS_LIST[i];
		monsterWidth[monster[0]] = monster[1];
		monsterHeight[monster[0]] = monster[2];
		monsterRanged[monster[0]] = monster[3];
	}
	for (var i = 0 ; i < MONSTERS_HP.length; i++) {
		var monster = MONSTERS_HP[i];
		monsterMinionHpActOne[monster[0]] = monster[1];
		monsterLeaderHpActOne[monster[0]] = monster[2];
		monsterMinionHpActTwo[monster[0]] = monster[3];
		monsterLeaderHpActTwo[monster[0]] = monster[4];
	}
	for (var i = 0 ; i < HEROES_LIST.length; i++) {
		var hero = HEROES_LIST[i];
		heroesHp[hero[0]] = hero[1];
		heroesStamina[hero[0]] = hero[2];
		heroesType[hero[0]] = hero[3];
	}
}

function createSelect(title) {
	html = '<div class="btn-group select-x showOneCell showTwoCells"><button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-expanded="false">' + title + ' <span class="caret"></span></button><ul class="dropdown-menu" role="menu"></ul></div>';
	
	return html;
}

function addOptionOld(title, value, optionClass) {
	return '<option class="' + optionClass + '" value="' + value + '">' + title + '</option>';
}

function addOption(title, optionClass, functionCallback) {
	return '<li class="' + optionClass + '"><a href="#" onclick="' + functionCallback + '">' + title + '</a></li>';
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
		container.find('input[name="master"]').attr('value', monsterTitle.indexOf('master') > -1);
		var xYSelects = $(container).find('.select-x, .select-y');
		
		if (isMonster) {
			var monsterHp;
			if (monsterTitle.indexOf('master') > -1) {
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
			container.find('input[name="hero-x"]').attr('value',selectedCooedinate);
			container.find('input[name="monster-x-size"]').attr('value',selectedSize);
			container.find('.x-title').html($(element).html() + ' ');
			if (!parent.hasClass('squared')) {
				container.find('.select-y').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		} else {
			container.find('.y-title').html($(element).html() + ' ');
			container.find('input[name="monster-y"]').attr('value',selectedCooedinate);
			container.find('input[name="hero-y"]').attr('value',selectedCooedinate);
			container.find('input[name="monster-y-size"]').attr('value',selectedSize);
			if (!parent.hasClass('squared')) {
				container.find('.select-x').removeClass(SHOWING_CLASSES[selectedSize]);
			}
		}
	}
}

function updateHero(element, value) {
	var container = $(element).parents('.select-row');

	container.find('.hero-title').html(value + ' ');
	container.find('input[name="hero-title"]').attr('value',value);
	container.find('input[name="hero-x"]').attr('value','');
	container.find('input[name="hero-y"]').attr('value','');
	container.find('input[name="hero-hp"]').val(heroesHp[value]);
	container.find('input[name="hero-stamina"]').val(heroesStamina[value]);
	container.find('img').attr('src', 'images/heroes_cards/' + value.replace(new RegExp(" ",'g'), '_') + '.jpg');
	var heroId = container.parent().attr('id');
	$('[href="#' + heroId + '"]').html(value);
}

function updateArchetype(element, value) {
	var container = $(element).parents('.select-row');
	var archetype;
	for (var i = 0; i < ARCHETYPES.length && archetype == undefined; i++) {
		if (value == ARCHETYPES[i].title) {
			archetype = ARCHETYPES[i];
		}
	}
	
	container.find('.archetype-title').html(value + ' ');
	container;
}

function adjustHero(archetype) {

}

function setArchetype(archetype) {

}

function adjustArchetype(archetype) {

}

function updateClass(element, value) {
	var container = $(element).parents('.select-row');
}

function removeRow(element) {
	$(element).parents('.select-row').remove();
}

function removeRows() {
	$('#monsters-container .select-row').remove();
}

function getAlphabetChar(number) {
	result = '';
	if (number > 26) {
		result += ALPHABET.charAt(Math.floor(number/26) - 1);
	}
	return result += ALPHABET.charAt(number%26);
}

function createYSelectContent (oneCellOnly) {
	var html = addOption('Clear', '', 'updateCoordinate(this, \'Clear\');');
	for (var i = 1; i <= mapWidth; i++) {
		html += addOption(i.toString(), 'oneCell', 'updateCoordinate(this, \'1' + i.toString() + '\');');
		if (i <= mapWidth-1 && !oneCellOnly)
			html += addOption(i.toString() + '-' + (i+1).toString(), 'twoCells', 'updateCoordinate(this, \'2' + i.toString() + '\');');
		if (i <= mapWidth-2 && !oneCellOnly)
			html += addOption(i.toString() + '-' + (i+2).toString(), 'threeCells', 'updateCoordinate(this, \'3' + i.toString() + '\');');
	}
	return html;
}

function createXSelectContent (oneCellOnly) {
	var html = addOption('Clear', '', 'updateCoordinate(this, \'Clear\');');
	for (var i = 1; i <= mapHeight; i++) {
		html += addOption(getAlphabetChar(i-1), 'oneCell', 'updateCoordinate(this, \'1' + i.toString() + '\');');
		if (i <= mapHeight-1 && !oneCellOnly)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i), 'twoCells', 'updateCoordinate(this, \'2' + i.toString() + '\');');
		if (i <= mapHeight-2 && !oneCellOnly)
			html += addOption(getAlphabetChar(i-1) + '-' + getAlphabetChar(i+1), 'threeCells', 'updateCoordinate(this, \'3' + i.toString() + '\');');
	}
	return html;
}

function createMonsterSelectContent () {
	var html = '';
	for (var i = 0; i < MONSTERS_LIST.length; i++) {
		html += addOption(MONSTERS_LIST[i][0] + ' master', '', 'updateMonster(this, \'' + MONSTERS_LIST[i][0] + '\');');
		html += addOption(MONSTERS_LIST[i][0] + ' minion', '', 'updateMonster(this, \'' + MONSTERS_LIST[i][0] + '\');');
	}
	return html;
}

function createHeroSelectContent () {
	var html = '';
		for (var i = 0; i < HEROES_LIST.length; i++) {
			html += addOption(HEROES_LIST[i][0] + ' ', '', 'updateHero(this, \'' + HEROES_LIST[i][0] + '\');');
		}
	return html;
}

function createClassSelectContent () {
	var html = '';
		for (var i = 0; i < ARCHETYPES.length; i++) {
			for (var j = 0; j < ARCHETYPES[i].classes.length; j++) {
				var title = ARCHETYPES[i].classes[j].title;
				html += addOption(title + ' ', '', 'updateClass(this, \'' + title + '\');');
			}
		}
	return html;
}

function createArchtypeSelectContent () {
	var html = '';
		for (var i = 0; i < ARCHETYPES.length; i++) {
			var title = ARCHETYPES[i].title;
			html += addOption(title + ' ', '', 'updateArchetype(this, \'' + title + '\');');
		}
	return html;
}

function addUnitLine(line, title) {
	line.addClass('select-row');
	line.append(createInputSelect('Select ' + title, title + '-title', 'select-' + title));
	line.append(createInputSelect('Select X coordinate', 'x-title', 'select-x'));
	line.append(createInputSelect('Select Y coordinate', 'y-title', 'select-y'));
	line.append($('<input type="text" name="' + title + '-hp" class="form-control" placeholder="Set HP" value=""/>'));
	line.append($('<input type="hidden" name="' + title + '-title" value=""/>'));
	line.append($('<input type="hidden" name="' + title + '-x" value=""/>'));
	line.append($('<input type="hidden" name="' + title + '-y" value=""/>'));
}

function addMonsterLine() {
	var monsterLine = $('<div>').attr('id','monster' + monsterNumber.toString());
	monsterNumber += 1;
	addUnitLine(monsterLine, 'monster');
	monsterLine.append($('<button type="button" class="btn btn-danger" aria-expanded="false" onclick="removeRow(this);">Remove row</button>'));
	monsterLine.append($('<input type="hidden" name="master" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-y-size" value=""/>'));
	monsterLine.append($('<input type="hidden" name="monster-x-size" value=""/>'));
	
	monsterLine.find('.select-monster ul').append(createMonsterSelectContent());
	monsterLine.find('.select-x ul').append(createXSelectContent(false));
	monsterLine.find('.select-y ul').append(createYSelectContent(false));
	$('#monsters-container').append(monsterLine);
	return monsterLine;
}

function addHeroLine(number) {
	var heroLine = $('<div>').attr('id','hero' + number.toString() + 'wrapper');
	addUnitLine(heroLine, 'hero');
	heroLine.append($('<input type="text" name="hero-stamina" class="form-control" placeholder="Set stamina" value=""/>'));
	
	heroLine.find('.select-hero ul').append(createHeroSelectContent());
	heroLine.find('.select-hero').after(createInputSelect('Select Archtype', 'hero-archtype', 'select-archtype'));
	heroLine.find('.select-archtype ul').append(createArchtypeSelectContent());
	heroLine.find('.select-archtype').after(createInputSelect('Select Class', 'hero-class', 'select-class'));
	heroLine.find('.select-class ul').append(createClassSelectContent());
	heroLine.find('.select-x ul').append(createXSelectContent(true));
	heroLine.find('.select-x ul').addClass('showOneCell');
	heroLine.find('.select-y ul').addClass('showOneCell').append(createYSelectContent(true));
	heroLine.append($('<img>').attr('src', ''));
	$('#hero' + number.toString()).append(heroLine);
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
	monster.master = container.find('[name="master"]').val();
	monster.x = container.find('[name="monster-x"]').val();
	monster.y = container.find('[name="monster-y"]').val();
	monster.vertical = container.find('[name="monster-x-size"]').val() < container.find('[name="monster-y-size"]').val();
	monster.hp = container.find('[name="monster-hp"]').val();
	monster.stamina = container.find('[name="monster-stamina"]').val();
	return monster;
}

function hero(element) {
	var container = $(element);
	var hero = {};
	hero.title = container.find('[name="hero-title"]').val();
	hero.x = container.find('[name="hero-x"]').val();
	hero.y = container.find('[name="hero-y"]').val();
	hero.hp = container.find('[name="hero-hp"]').val();
	hero.stamina = container.find('[name="hero-stamina"]').val();
	return hero;
}

function populate() {
	collectData();
	updateConfig();
	constructMapFromConfig();
}

function constructMapFromConfig() {
	/*under construction*/;
}

function constructSettingsFromConfig() {
	for (var i=1; i <= 4; i++) {
		var j = i.toString();
		if (config['hero' + j].title != "") {
			updateHero($('#hero' + j + ' .select-hero li')[0],config['hero' + j].title);
			$('#hero' + j + ' [name="hero-hp"]').val(config['hero' + j].hp);
			$('#hero' + j + ' [name="hero-stamina"]').val(config['hero' + j].stamina);
			$('#hero' + j + ' [name="hero-x"]').val(config['hero' + j].x);
			$('#hero' + j + ' .x-title').html(getAlphabetChar(config['hero' + j].x - 1) + ' ');
			$('#hero' + j + ' [name="hero-y"]').val(config['hero' + j].y);
			$('#hero' + j + ' .y-title').html(config['hero' + j].y.toString() + ' ');
		}
	}
	removeRows();
	for (var i = 0; i < config.monsters.length; i++) {
		var monster = config.monsters[i];
		if (monster.title != '') {
			var monsterLine = addMonsterLine();
			var width = monster.vertical ? monsterWidth[monster.title] : monsterHeight[monster.title];
			var height = monster.vertical ? monsterHeight[monster.title] : monsterWidth[monster.title];
			
			var monsterSelectUnit = monsterLine.find('[onclick="updateMonster(this, \'' + monster.title + '\');"]');
			var correctMonsterSelectUnit;
			for (var j = 0; j < 2; j++) {
				if ($(monsterSelectUnit[j]).html().indexOf(monster.master ? 'master' : 'minion') > -1) {
					correctMonsterSelectUnit = monsterSelectUnit[j];
				}
			}
			updateMonster(correctMonsterSelectUnit, monster.title);
			
			var xValue = width.toString() + monster.x.toString();
			updateCoordinate(monsterLine.find('.select-x [onclick="updateCoordinate(this, \'' + xValue + '\');"]'), xValue);
			var yValue = height.toString() + monster.y.toString();
			updateCoordinate(monsterLine.find('.select-y [onclick="updateCoordinate(this, \'' + yValue + '\');"]'), yValue);
			monsterLine.find('input[name="monster-hp"]').val(monster.hp);
		}
	}
	/*under construction*/;
}

function updateConfig() {
	window.location.hash = Base64.encode(JSON.stringify(config));
}

function decodeConfig() {
	config = JSON.parse(Base64.decode(window.location.hash));
}

function collectData() {
	var monsterRows = $('#monsters .select-row');
	config.monsters = [];
	for (var i = 0; i < monsterRows.length; i++) {
		config.monsters.push(monster(monsterRows[i]));
	}
	config.hero1 = hero($('#hero1 .select-row'));
	config.hero2 = hero($('#hero2 .select-row'));
	config.hero3 = hero($('#hero3 .select-row'));
	config.hero4 = hero($('#hero4 .select-row'));
}

function adjustAct() {
	actOne = $('[name="act"]:checked').val() == 'one';
}

$(function() {
	adjustMonsterHeroParams();
	addMonsterLine();
	for (var i = 1; i <= 4; i++) {
		addHeroLine(i);
	}
	if (window.location.hash != "") {
		decodeConfig();
		constructMapFromConfig();
		constructSettingsFromConfig();
	} else {
		//TEST
		config = JSON.parse(Base64.decode(defaultConfig));
		constructMapFromConfig();
		constructSettingsFromConfig();
	}

	$('.nav-tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
	})
});
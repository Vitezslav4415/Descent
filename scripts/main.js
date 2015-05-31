function toggleMenu() {
	$('.menu').toggleClass('active');
}

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var mapWidth = 26;
var mapHeigth = 26;

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
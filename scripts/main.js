function toggleMenu() {
	$('.menu').toggleClass('active');
}

ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var mapWidth = 26;
var mapHeight = 26;

function addOption(title, optionClass) {
	return '<option class="' + optionClass + '">' + title + '</option>';
}

function createXSelectContent () {
	var html = '';
	for (i = 1; i <= mapWidth; i++) {
		html += addOption(i.toString(), 'oneCell');
		if (i <= mapWidth-1)
			html += addOption(i.toString() + '-' + (i+1).toString(), 'twoCells');
		if (i <= mapWidth-2)
			html += addOption(i.toString() + '-' + (i+2).toString(), 'threeCells');
	}
	return html;
}

function createYSelect (height, heightAlt) {
	var html = '';
	for (i = 1; i <= mapHeigth; i++) {
		html += addOption(ALPHABET.charAt(i-1), 'oneCell');
		if (i <= mapHeigth-1)
			html += addOption(ALPHABET.charAt(i-1) + '-' + ALPHABET.charAt(i), 'twoCells');
		if (i <= mapHeigth-2)
			html += addOption(ALPHABET.charAt(i-1) + '-' + ALPHABET.charAt(i+1), 'threeCells');
	}
	return html;
}


$(function() {
	/*$('.menu').click(function() {
		$(this).toggleClass('active');
	});*/
	$('.map-select').append(createXSelectContent(1));
});
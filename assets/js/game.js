startGame();
var typingText;
var currentWord = 0;
var points = 0;

function startGame() {
	var randomText = JSON.parse(texts);
	randomText = randomText[randomInt(0, randomText.length)];
	typingText = randomText;
	document.getElementsByClassName('typing-text')[0].innerHTML = randomText;
	currentWord = 0;
	typingText = typingText.split(" ");
	highlight(typingText[currentWord]);
}

function highlight(text) {
	var inputText = document.getElementsByClassName("typing-text")[0];
	var innerHTML = inputText.innerHTML;
	var index = innerHTML.indexOf(text);
	if (index >= 0) {
		innerHTML = innerHTML.substring(0, index) + "<span class='highlight'>" + innerHTML.substring(index,index+text.length) + "</span>" + innerHTML.substring(index + text.length);
		inputText.innerHTML = innerHTML;
	}
}

function keyPress(e) {
	if (e.keyCode === 32) {
		e.preventDefault();
		if (currentWord+1 == typingText.length) {
			document.getElementsByClassName('input-field')[0].value = '';
			if (points > 0) {
				M.toast({html: 'Tebrikler! Metni '+points+' puan ile bitirdiniz. :)', classes: 'rounded'});
			} else {
				M.toast({html: 'Metni hiç puan alamadan bitirdiniz. :(', classes: 'rounded'});
			}
			startGame();
		} else {
			if (document.getElementsByClassName('input-field')[0].value == typingText[currentWord]) {
				document.getElementsByClassName('input-field')[0].value = '';
				document.getElementsByClassName('typing-text')[0].innerHTML = document.getElementsByClassName('typing-text')[0].innerHTML.replace(typingText[currentWord], '<span class="success">'+typingText[currentWord]+'</span>');
				points++;
				updatePoints();
			} else {
				document.getElementsByClassName('input-field')[0].value = '';
				document.getElementsByClassName('typing-text')[0].innerHTML = document.getElementsByClassName('typing-text')[0].innerHTML.replace(typingText[currentWord], '<span class="fail">'+typingText[currentWord]+'</span>');
				points--;
				updatePoints();
			}
			currentWord++;
			highlight(typingText[currentWord]);
		}
	}
}

function updatePoints() {
	if (points < 0) {
		points = 0;
	}
	document.getElementsByClassName('points')[0].innerHTML = '<strong>Puan:</strong> '+points;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}

let _score = 0;
let zoneQ;
let zoneA1, zoneA2, zoneA3, zoneA4;
let timer = null,
	timeEllipsed = 0;
let _countMusic = 0;
let _countLeft = 0;
let _playedMusic = [];
let _QuestMusic;
let _musicList
const GameStatus = {
	NOTSTART: 0,
	PLAY: 1,
	PAUSE: 2,
	GAMEOVER: 3
}
let gameStatus;
var _audioPlayer = null;
/*
    function allowDrop(event)
    {
        event.preventDefault();
    }
    
    function drag(event)
    {
        event.dataTransfer.setData('id',event.target.id);
        
    }
    
*/
function ClickVariant(data) {
	if(removeExtension(_QuestMusic) == data.value) {
		_score++;
		data.style.background = 'green'
		for(let i = 0; i < elements.length; i++)
			if(elements[i] != data) elements[i].style.background = 'gray';
        enableDisabled()
	} else {
		_score--;
		data.style.background = 'red'
		elements = document.getElementsByClassName('variants')
		for(let i = 0; i < elements.length; i++)
			if(elements[i] != data) elements[i].style.background = 'gray';
        enableDisabled()
	}
	document.querySelector('#td_score').innerHTML = _score;
	/* document.getElementById('variant1').style.disabled = true;
	 document.getElementById('variant2').style.disabled = true;
	 document.getElementById('variant3').style.disabled = true;
	 document.getElementById('variant4').style.disabled = true; */
	document.getElementsByClassName('button_next')[0].style.display = 'inline-block';
	//[0].display='inline-block'
	AudioStop();
}

function AudioStop() {
	if(_audioPlayer != null) _audioPlayer.pause();
}

function Init() {
	gameStatus = GameStatus.NOTSTART;
	LoadMusicList("http://gm.host1865178.hostland.pro/gm.php");
}

function Tick() {
	document.querySelector('#td_ellipsedTime').innerHTML = new Date(++timeEllipsed * 1000).toISOString().slice(11, 19);;;
}


function InitEnableDisabled() {
    Init()
    enableDisabled()
}


function Start(data) {
	_musicList = data;
	_score = 0;
	timeEllipsed = 0;
	NextQuestion();
}

function disableDisabled() {
	document.getElementById('variant1').removeAttribute('disabled');
	document.getElementById('variant2').removeAttribute('disabled');
	document.getElementById('variant3').removeAttribute('disabled');
	document.getElementById('variant4').removeAttribute('disabled');
}

function enableDisabled() {
	document.getElementById('variant1').setAttribute('disabled', '');
	document.getElementById('variant2').setAttribute('disabled', '');
	document.getElementById('variant3').setAttribute('disabled', '');
	document.getElementById('variant4').setAttribute('disabled', '');
}

function PlayButtonClick() {
	if(timer == null) {
		timer = setInterval(Tick, 1000);
		AudioStop()
		_audioPlayer.play()
		disableDisabled()
	} else {
		NextQuestion();
	}
}

function NextQuestion() {
	AudioStop()
	_countLeft = _musicList.length - 3;
	if(_countLeft == 0) Result();
	elements = document.getElementsByClassName('variants')
	for(let i = 0; i < elements.length; i++) {
		//elements[i].style.disabled = false;
        disableDisabled()
		elements[i].style.background = 'goldenrod';
	}
	shuffle(_musicList)
		//console.log(_musicList)     
	var _variants = []
	_countMusic++;
	for(let i = 1; i < 5; i++) {
		//console.log(_musicList[i-1])
		document.querySelector('#variant' + i).value = removeExtension(_musicList[i - 1])
		_variants.push(_musicList[i - 1])
	}
	let i = getRandomInt(0, _variants.length);
	_QuestMusic = _variants[i]
	_musicList.splice(_musicList.indexOf(_QuestMusic), 1)
	document.querySelector('#td_countLeft').innerHTML = _countLeft
		//console.log(_playedMusic)
		//console.log(_QuestMusic)
	url = decodeURI("http://gm.host1865178.hostland.pro/music/" + _QuestMusic)
	_audioPlayer = new Audio(url)
	_audioPlayer.load();
	//console.log('timer:'+timer);
	if(timer != null) //значит еще не нажимали Начать игру
	{
		_audioPlayer.play();
		let memosN = getRandomInt(0, 10);
		document.getElementById("memoImg").src = 'memos/' + memosN + '.jpg';
	}
}

function Result() {
	time2 = document.querySelector('#td_ellipsedTime').innerHTML;
	let yn = confirm('Игра закончена!\nВы прослушали ' + _countMusic + '\nНабрали ' + _score + ' балла\nВремя игры:' + time2 + "\nХотите еще сыграть?");
	if(yn) window.location.href = 'index.html';
	else window.location.href = 'index.html'; //перейти на стартовую страницу
}
//////////////////////////////////////////////////////////////////////////
function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min) + min);
}

function shuffle(array) {
	let currentIndex = array.length,
		randomIndex;
	// While there remain elements to shuffle.
	while(currentIndex > 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;
		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex], array[currentIndex]
		];
	}
	return array;
}

function removeExtension(filename) {
	//console.log(filename.substring(0, filename.lastIndexOf('.')))    
	return(filename.substring(0, filename.lastIndexOf('.')) || filename);
}
//выполняется асинхронно! Поэтому команды после него могут выполняться раньше        
function LoadMusicList(urlPHP) {
	fetch(urlPHP, {
		method: "GET",
	}).then(function(response) {
		//console.log(response.json())
		return response.json();
	}).then(function(data) {
		//console.log(data)
		Start(data)
	}).catch(function(error) {
		console.log("Error:", error);
		alert('Не могу загрузить данные. Попробуйте позже')
	});
}
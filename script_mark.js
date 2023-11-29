let _score=0;
let timer=null,timeEllipsed=0;
let _countMusic=0;
let _countLeft=0;
let _playedMusic=[];
let _QuestMusic;
let _musicList
const GameStatus= {NOTSTART:0,PLAY:1,PAUSE:2,GAMEOVER:3}
let gameStatus;


function AudioStop()
{
    if (_audioPlayer!=null) _audioPlayer.pause();
}


function Tick()
{    
    document.querySelector('#td_ellipsedTime').innerHTML=new Date(++timeEllipsed * 1000).toISOString().slice(11, 19);;;
}



function Start(data)
{
    _musicList=data;
    _score=0;
    timeEllipsed=0;
    NextQuestion();
}

var _audioPlayer=null;

function PlayButtonClick()
{
    const button = document.querySelector('#playMusic');
    if (timer==null)
        timer=setInterval(Tick,1000);        
    AudioStop()
    _audioPlayer.play()
    
    console.log(decodeURI("http://192.168.1.37/music/"+_QuestMusic))
}


function NextQuestion()
{
    AudioStop()
    _countLeft=_musicList.length-3;
    if (_countLeft==0)
        Result();
    shuffle(_musicList)
    //console.log(_musicList)     
    var _variants=[]
    _countMusic++;
    
    let i=getRandomInt(0,_variants.length);
    _QuestMusic=_variants[i]
    _musicList.splice(_musicList.indexOf(_QuestMusic),1)
    document.querySelector('#td_countLeft').innerHTML=_countLeft
    console.log(_playedMusic)
    console.log(_QuestMusic)
    url=decodeURI("http://gm.host1865178.hostland.pro/music/"+_QuestMusic)
    
    _audioPlayer=new Audio(url)
    _audioPlayer.load();
    console.log('timer:'+timer);
    if (timer!=null)//значит еще не нажимали Начать игру
        _audioPlayer.play();
    
}


function Result()
{
    time2=document.querySelector('#td_ellipsedTime').innerHTML;
    let yn=confirm('Игра закончена!\nВы прослушали '+_countMusic+'\nНабрали '+_score+' балла\nВремя игры:'+time2+"\nХотите еще сыграть?");
    if (yn) window.location.href='index.html';
    else window.location.href='index.html';//перейти на стартовую страницу
    
}
//////////////////////////////////////////////////////////////////////////
function getRandomInt(min,max) {
  return Math.floor(Math.random() * (max-min)+min);
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex > 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

function removeExtension(filename) {
  return (
    filename.substring(0, filename.lastIndexOf('.')) || filename
  );
}

//выполняется асинхронно! Поэтому команды после него могут выполняться раньше        

function LoadMusicList(urlPHP)
{    
    fetch(urlPHP, {
      method: "GET",
    })
      .then(function(response) {
        return response.json();
      }).then(function(data){
        Start(data)
    })
      .catch(function(error) {
        console.log("Error:", error);
        alert('Не могу загрузить данные. Попробуйте позже')
      });
}
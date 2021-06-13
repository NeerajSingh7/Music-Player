// these are the buttons
const playBtn = document.querySelector(".play-button");
const nextBtn = document.querySelector(".next-button");
const prevBtn = document.querySelector(".prev-button");
const timeStamp2 = document.querySelector(".time-stamp2");
const timeStamp1 = document.querySelector(".time-stamp1");
const currSong = document.querySelector(".current-song");
const searchBtn = document.querySelector("#search-btn");
const rightPart = document.querySelector("#right-part");
const searchedResults = document.querySelector("#searched-results");
const seekBar = document.querySelector("#myRange");
const volBtn = document.querySelector("#volume");
const songImage = document.querySelector(".song-image");

// song complete data
var SongData = {
    0: { name: "Brown Shortie", duration: "03:26", artist: "Sidhu Moose Wala", src: "songs/Brown Shortie.mp3"},
    1: { name: "So High", duration: "03:36", artist: "Sidhu Moose Wala", src: "songs/So High.mp3"},
    2: { name: "Legend", duration: "04:36", artist: "Sidhu Moose Wala", src: "songs/Legend.mp3"},
    3: { name: "Sohne Lagde", duration: "03:23", artist: "Sidhu Moose Wala", src: "songs/Sohne Lagde.mp3" },
    4: { name: "Moosedrilla", duration: "03:30", artist: "Sidhu Moose Wala", src: "songs/Moosedrilla.mp3" },
    5: { name: "Sin", duration: "03:06", artist: "Sidhu Moose Wala", src: "songs/Sin.mp3" },
    6: { name: "Same Beef", duration: "04:17", artist: "Sidhu Moose Wala", src: "songs/Same Beef.mp3" },
    7: { name: "Dollar", duration: "02:36", artist: "Sidhu Moose Wala", src: "songs/Dollar.mp3" },
    8: { name: "Old Skool", duration: "04:15", artist: "Sidhu Moose Wala", src: "songs/Old Skool.mp3" },
    9: { name: "Badfella", duration: "03:15", artist: "Sidhu Moose Wala", src: "songs/Badfella.mp3" },
    10: { name: "Kalimba", duration: "05:48", artist: "Sidhu Moose Wala", src: "songs/Kalimba.mp3" },
    11: { name: "Sleep Away", duration: "03:20", artist: "Sidhu Moose Wala", src: "songs/Sleep Away.mp3" },
    12: { name: "Sanju", duration: "02:50", artist: "Sidhu Moose Wala", src: "songs/Sanju.mp3" },
  };



// all the variables used
var idx = 0;
var audioSrc = SongData[idx].src;
var audioElement = new Audio(audioSrc);
var isPlaying = false;
var currentlyPlaying;
// clock
var endTime = SongData[idx].duration;
var minutes = 0;
var seconds = 1;


// var songNames = ["Kalimba", "Maid with the Flaxen Hair", "Sleep Away", "maitri", "dgdfgf"];
var songCount = 0;
for(e in SongData){
    songCount++;
}


var songNames = [];
for(var i=0;i<songCount;i++){
    songNames.push(SongData[i].name);
}





// this function will play the song we will click
window.onclick = (e) => {
  var clickedEle = e.target.innerHTML;
  if (songNames.includes(clickedEle)) {
    idx = songNames.indexOf(clickedEle);
    endTime = SongData[idx].duration;
    pauseSong(audioElement);
    isPlaying = false;
    audioSrc = SongData[idx].src;
    audioElement = new Audio(audioSrc);
    if (isPlaying == false) {
      redundantData();
    } 
  }
};



// this will play first song
playBtn.addEventListener("click", function () {
  if (isPlaying == false) {
    playSong(audioElement);
    endTime = SongData[idx].duration;
    timeStamp2.innerHTML = endTime;
    currentlyPlaying = SongData[idx].name;
    currSong.innerHTML = currentlyPlaying;
    isPlaying = true;
  } else {
    pauseSong(audioElement);
    isPlaying = false;
  }
});



// this will play previous song
nextBtn.addEventListener("click", function () {
  idx = idx + 1;
  setIndexZero();
  pauseSong(audioElement);
  audioSrc = SongData[idx].src;
  audioElement = new Audio(audioSrc);
  if (isPlaying == true) {
    isPlaying = false;
  }
  redundantData();
});



// this will play previous song
prevBtn.addEventListener("click", function () {
  idx = idx - 1;
  setIndexZero();
  pauseSong(audioElement);
  audioSrc = SongData[idx].src;
  audioElement = new Audio(audioSrc);
  if (isPlaying == true) {
    isPlaying = false;
  }
  redundantData();
});



// play song function
function playSong(audioElement) {
  audioElement.play();
  change();
  resumeClock();
}


// pause song function
function pauseSong(audioElement) {
  audioElement.pause();
  change();
  pauseClock(minutes, seconds, seekBar.max);
}



// this will change the icon of play/pause
function change() {
  if (!isPlaying) {
    playBtn.innerHTML = "pause";
  } else {
    playBtn.innerHTML = "play_circle_outline";
  }
}



// this will change the photo of the songs
function addImage(ID) {
  var newPath = `images/${ID + 1}.jpg`;
  rightPart.style.backgroundImage = `url(${newPath})`;
  songImage.style.backgroundImage = `url(${newPath})`;
}



// this will set index again back to zero when songs all songs are played
function setIndexZero() {
  if (idx == songNames.length || idx < 0) {
    idx = 0;
  }
}



var foo;
var showTime;
// this function  will change the time
function clock() {
  showTime = "0" + minutes + ":" + seconds;
  foo = setInterval(function () {
    showTime = "0" + minutes + ":" + seconds;
    timeStamp1.innerHTML = showTime;
    console.log(showTime);
    
    if (showTime == endTime) {
      clearInterval(foo);
    }

    if (seconds == 59) {
      minutes++;
      seconds = -1;
    }
    console.log(seekBar.value);
    seekBar.value++;
    
    seconds++;
    
  }, 1000);
}


// pause the clock
function pauseClock(remMin, remSec, maxVal){
    minutes = remMin;
    seconds = remSec;
    seekBar.max = maxVal+"";
    clearInterval(foo);
}


// resume the clock
function resumeClock(){
    clock();
}



// search for songs and play

searchBtn.addEventListener("click", function(){
    var userSearch = document.querySelector("#search-text").value;
    console.log(userSearch);
    searchedResults.style.display = "block";
    if(songNames.includes(userSearch)){
      idx = songNames.indexOf(userSearch);
      
      var btn = document.createElement("button");
      btn.innerHTML = "play";
      btn.id = "btn";
      songName = userSearch;
      
      searchedResults.innerHTML = songName;
      searchedResults.appendChild(btn);
      btn.addEventListener("click", function(){
          searchedResults.innerHTML = "";
          searchedResults.style.display = "none";
          pauseSong(audioElement);
          minutes = 0;
          seconds = 0;

          isPlaying = false;
          audioSrc = SongData[idx].src;
          audioElement = new Audio(audioSrc);
          if (isPlaying == false) {
            redundantData();
          }
      });
      

      
    }
    else{
      songName = "No Song match your results";
      searchedResults.innerHTML = songName;
    }
});



// this code is a part of every function
function redundantData(){
  minutes=0;
  seconds=1;
  seekBar.value = "0";
  playSong(audioElement);
  endTime = SongData[idx].duration;
  timeStamp2.innerHTML = endTime;
  currentlyPlaying = SongData[idx].name;
  currSong.innerHTML = currentlyPlaying;
  addImage(idx + 1);
  isPlaying = true;
  var arr = endTime.split(":");
  totalSec = minutesToSec(parseInt(arr[0]), parseInt(arr[1]));
  seekBar.max = totalSec + "";
}



// function to convert minutes into seconds
function minutesToSec(min, sec){
  return min*60 + sec;
}


var volBar = document.createElement("input");
volBar.min="0";
volBar.max = "100";
volBar.value = "50";
volBar.type = "range";
volBar.style
volBtn.addEventListener("mouseover", function(){
  volBtn.append(volBar);
})

volBtn.addEventListener("mouseleave", function(){
  volBtn.removeChild(volBar);
})



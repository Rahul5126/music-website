import { songsData, artistData } from "./homeSongsDB.js";

// List of Artist Data Fetch
let artists_cover = document.getElementsByClassName('artists_cover')[0];
artistData.forEach(element => {
    const {poster, artistName, url} = element;
    /* console.log(songName);  */
     let artist_items = document.createElement('li');
     artist_items.classList.add('artist_items');

     artist_items.innerHTML = `
        <div class="artist-img">
            <a href="${url}"><img src="${poster}"></a>
        </div>
        <h5>${artistName}</h5>
     `;

     artists_cover.appendChild(artist_items);
})


for (let i = 0; i < songsData.length; i++) {
    const songItem = document.createElement("li");
    songItem.innerHTML = `
        <div class="img-play">
            <img src="${songsData[i].poster}" alt="img">
            <i class="play_button fa-solid fa-circle-play" id="${songsData[i].id}"></i>
        </div>
        <h5>${songsData[i].songName}</h5>
        <h6>${songsData[i].subtitle}</h6>
    `;
    
    // distribute the list items evenly among the three divs
    if (i < 20) {
      document.getElementById("hindi-top-50").appendChild(songItem);
    } else if (i < 40) {
      document.getElementById("trending-english").appendChild(songItem);
    } else if (i < 60) {
      document.getElementById("latest-hindi").appendChild(songItem);
    } else if (i < 80) {
        document.getElementById("latest-english").appendChild(songItem);
    } else if (i < 100) {
        document.getElementById("trending-hindi").appendChild(songItem);
    } else if (i < 120) {
        document.getElementById("top-english-playlist").appendChild(songItem);
    } else {
        document.getElementById("top-hindi-playlist").appendChild(songItem);
      }
  }


// Created a Music Variable which we use throughout to controll our music system
const music = new Audio('audio/1.mp3');


// Play/Pause bottom MasterPlay Section (Bottom)
let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementById('wave');
masterPlay.addEventListener('click', ()=> {
    if (music.paused || music.currentTime <= 0) {
        music.play();
        wave.classList.add('active1');
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause')
    } else {
        music.pause();
        wave.classList.remove('active1');
        masterPlay.classList.remove('fa-circle-pause')
        masterPlay.classList.add('fa-circle-play')
    }
});

/* document.getElementsByClassName('master_play') delivers a "nodeList". 
You should use: document.getElementsByClassName('master_play')[0].style.display 
(if it's the first element from that list you want to change.*/
let master_play = document.getElementsByClassName('master_play')[0];

// Download Music
let download_music = document.getElementById('download-music');

// Playing Music with their respective ids & getting their titles, covers in Bottom Section
let index = 0;
let cover_master_play = document.getElementById('cover_master_play');
Array.from(document.getElementsByClassName('play_button')).forEach((e, i) => {
    e.addEventListener('click', (el)=> {
        index = el.target.id;
        // console.log(index);
        music.src = `audio/${index}.mp3`;
        cover_master_play.src = songsData[i].poster;
        song_title.innerHTML = songsData[i].songName;
        artist_name.innerHTML = songsData[i].subtitle;
        
        music.play();

        // Download Music
        download_music.href = music.src;
        
        // Getting the song name when gets downloaded
        download_music.setAttribute('download', song_title.innerHTML);
        
        wave.classList.add('active1');
        masterPlay.classList.remove('fa-circle-play')
        masterPlay.classList.add('fa-circle-pause');

        //  Making the Bottom Container Visible when Music is being Played
        master_play.style.display = "flex";
    })
});


// TimeStamp & SeekBar
let current_timeStamp = document.getElementById('current_timeStamp');
let end_timeStamp = document.getElementById('end_timeStamp');

let seekBar = document.getElementById('seekBar');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];


music.addEventListener('timeupdate', () => {
    let music_current = music.currentTime;
    let music_duration = music.duration;
    
    // End_TimeStamp
    let min1 = Math.floor(music_duration / 60);
    let sec1 = Math.floor(music_duration % 60);

    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    end_timeStamp.innerHTML = `${min1} : ${sec1}`;

    // Current_TimeStamp
    let min2 = Math.floor(music_current / 60);
    let sec2 = Math.floor(music_current % 60);

    if (sec2 < 10) {
        sec2 = `0${sec2}`;
    }
    current_timeStamp.innerHTML = `${min2} : ${sec2}`;

    // Music SeekBar
    let progress = parseInt((music_current / music_duration) * 100);
    seekBar.value = progress;

    let progressBar = seekBar.value
    bar2.style.width = `${progressBar}%`;
    dot.style.left = `${progressBar}%`;

    seekBar.addEventListener('input', () => {
        music.currentTime = seekBar.value * music.duration / 100;
    })

});

// Volume Functionality
let vol_icon = document.getElementById('vol_icon');
let volume_seekBar = document.getElementById('volume_seekBar');
let volume_bar = document.getElementsByClassName('volume_bar')[0];
let volume_dot = document.getElementById('volume_dot');

volume_dot.style.left = '100%';
// Volume SeekBar 
volume_seekBar.addEventListener('change', () => {
    if (volume_seekBar.value == 0 ) {
        vol_icon.classList.remove('fa-volume-high');
        vol_icon.classList.remove('fa-volume-low');
        vol_icon.classList.add('fa-volume-mute');
    }
    if (volume_seekBar.value > 0) {
        vol_icon.classList.remove('fa-volume-high');
        vol_icon.classList.add('fa-volume-low');
        vol_icon.classList.remove('fa-volume-mute');
    }
    if (volume_seekBar.value > 50) {
        vol_icon.classList.add('fa-volume-high');
        vol_icon.classList.remove('fa-volume-low');
        vol_icon.classList.remove('fa-volume-mute');
    }

// Working of Volume.
    volume_bar.style.width = `${volume_seekBar.value}%`;
    volume_dot.style.left = `${volume_seekBar.value}%`;
    music.volume = (volume_seekBar.value) / 100;
});

function masterPlayDetails() {
    
    let songCover = songsData.filter((els) => {
        return els.id == index;
    });
    songCover.forEach((elss) => {
        let {poster} = elss;
        cover_master_play.src = poster;

    });

    let songTitles = songsData.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach((elss) => {
        let {songName} = elss;
        song_title.innerHTML = songName;

        // Getting the song name when gets downloaded
        download_music.setAttribute('download', song_title.innerHTML);
    });

    let artistTitle = songsData.filter((els) => {
        return els.id == index;
    });
    artistTitle.forEach((elss) => {
        let {subtitle} = elss;
        artist_name.innerHTML = subtitle;

    });
}

// Previous Button
let previous = document.getElementById('previous');
let next = document.getElementById('next');

previous.addEventListener('click', () => {
    index -= 1;

    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }

    music.src = `audio/${index}.mp3`;

    // Download Music
    download_music.href = music.src;

    masterPlayDetails();

    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause');

});

// Next Button
next.addEventListener('click', () => {
    index ++;

    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }

    music.src = `audio/${index}.mp3`;

    // Download Music
    download_music.href = music.src;

    masterPlayDetails();

    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause');
});

// Next Song Plays automatic when the current song ends and when the last song of the List ends then it starts from 1. 
music.addEventListener('ended', () => {
    // index ++;

    if (index == songsData.length) {
        index = 1;
    } else {
        index ++;
    }

    music.src = `audio/${index}.mp3`;

    // Download Music
    download_music.href = music.src;

    masterPlayDetails();

    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause');
});

// Open Other HTML Search Input
document.getElementById("search-input").addEventListener("click", function() {
    window.open("search.html", "_self");
});


/* Popular Songs - Left & Right Arrows for Scrolling    */

// Select all scrollable containers
const popularSongs = document.querySelectorAll('.popular-songs');

// Loop through each container
popularSongs.forEach((container) => {

  // Select the scrollable div within the container
  const popSongs = container.querySelector('.pop_songs');

  // Select the previous and next buttons within the container
  const prevBtn = container.querySelector('.left-arrow');
  const nextBtn = container.querySelector('.right-arrow');

  // Initialize the current scroll position to 0
  let currentScrollPos = 0;

  prevBtn.addEventListener('click', () => {
    currentScrollPos -= 1350;
    popSongs.scrollLeft = currentScrollPos;
  });

  nextBtn.addEventListener('click', () => {
    currentScrollPos += 1350;
    popSongs.scrollLeft = currentScrollPos;
  });
});


// Popular Artists - Left & Right Arrows for Scrolling
let artistsLeftAarrow = document.getElementById("artists_left_arrow");
let artistsRrightAarrow = document.getElementById("artists_right_arrow");
let artistsCover = document.getElementsByClassName("artists_cover")[0];

artistsRrightAarrow.addEventListener('click', () => {
    artistsCover.scrollLeft += 1350;
})
artistsLeftAarrow.addEventListener('click', () => {
    artistsCover.scrollLeft -= 1350;
})  
                

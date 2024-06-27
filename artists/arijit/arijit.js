import { arijitSongs } from "./arijitSongsDb.js";

let songs_container = document.getElementsByClassName('songs-container')[0];

arijitSongs.forEach(element => {
    const {id, indexNum, poster, songName, artistName, album, duration} = element;

    let songItems = document.createElement('div');
    songItems.classList.add('songItems');
    songItems.innerHTML = `
            <div class="index-track">
                <div class="index">
                    <span>${indexNum}</span>
                </div>
                <div class="track">
                    <img src="${poster}" alt="">
                    <span>${songName}</span>
                </div>
            </div>
            <div class="artist-col">
                <span>${artistName}</span>
            </div>
            <div class="album-col">
                <span>${album}</span>
            </div>
            <div class="duration-col">
                <span>${duration}</span>
            </div>
            <div class="download-col">
                <i class="play_button fa-solid fa-circle-play" id="${id}"></i>
            </div>
    `;

    songs_container.appendChild(songItems);
});


// Created a Music Variable which we use throughout to controll our music system
const music = new Audio('arijit-songs/1.mp3');

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

// Playing Music with their respective ids & getting their titles, covers in Bottom Section
// Download Music
let download_music = document.getElementById('download-music');
let index = 0;
let master_play = document.getElementsByClassName('master_play')[0];
let cover_master_play = document.getElementById('cover_master_play');
Array.from(document.getElementsByClassName('play_button')).forEach((e, i) => {
    e.addEventListener('click', (el)=> {
        index = el.target.id;
        console.log(index);
        music.src = `arijit-songs/${index}.mp3`;
        cover_master_play.src = arijitSongs[i].poster;
        song_title.innerHTML = arijitSongs[i].songName;
        artist_name.innerHTML = arijitSongs[i].artistName;

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

// Previous Button
let previous = document.getElementById('previous');
let next = document.getElementById('next');

previous.addEventListener('click', () => {
    index -= 1;

    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItems')).length;
    }

    music.src = `arijit-songs/${index}.mp3`;

    // Download Music
    download_music.href = music.src;

    let songCover = arijitSongs.filter((els) => {
        return els.id == index;
    });
    songCover.forEach((elss) => {
        let {poster} = elss;
        cover_master_play.src = poster;

    });

    let songTitles = arijitSongs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach((elss) => {
        let {songName} = elss;
        song_title.innerHTML = songName;

        // Getting the song name when gets downloaded
        download_music.setAttribute('download', song_title.innerHTML);
    });

    let artistTitle = arijitSongs.filter((els) => {
        return els.id == index;
    });
    artistTitle.forEach((elss) => {
        let {artistName} = elss;
        artist_name.innerHTML = artistName;

    });

    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause');

});

// Next Button
next.addEventListener('click', () => {
    index ++;

    if (index > Array.from(document.getElementsByClassName('songItems')).length) {
        index = 1;
    }

    music.src = `arijit-songs/${index}.mp3`;

    // Download Music
    download_music.href = music.src;

    let songCover = arijitSongs.filter((els) => {
        return els.id == index;
    });
    songCover.forEach((elss) => {
        let {poster} = elss;
        cover_master_play.src = poster;

    });

    let songTitles = arijitSongs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach((elss) => {
        let {songName} = elss;
        song_title.innerHTML = songName;

        // Getting the song name when gets downloaded
        download_music.setAttribute('download', song_title.innerHTML);
    });

    let artistTitle = arijitSongs.filter((els) => {
        return els.id == index;
    });
    artistTitle.forEach((elss) => {
        let {artistName} = elss;
        artist_name.innerHTML = artistName;

    });

    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause');
});

// Next Song Plays automatic when the current song ends and when the last song of the List ends then it starts from 1. 
music.addEventListener('ended', () => {
    // index ++;

    if (index == arijitSongs.length) {
        index = 1;
    } else {
        index ++;
    }

    music.src = `arijit-songs/${index}.mp3`;

    // Download Music
    download_music.href = music.src;

    let songCover = arijitSongs.filter((els) => {
        return els.id == index;
    });
    songCover.forEach((elss) => {
        let {poster} = elss;
        cover_master_play.src = poster;

    });

    let songTitles = arijitSongs.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach((elss) => {
        let {songName} = elss;
        song_title.innerHTML = songName;

        // Getting the song name when gets downloaded
        download_music.setAttribute('download', song_title.innerHTML);
    });

    let artistTitle = arijitSongs.filter((els) => {
        return els.id == index;
    });
    artistTitle.forEach((elss) => {
        let {artistName} = elss;
        artist_name.innerHTML = artistName;

    });

    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause');
});

// Open Other HTML Search Input
document.getElementById("search-input").addEventListener("click", function() {
    window.open("../../search.html", "_self");
});
import { artistData, songList } from "./searchSongsDB.js";

let search_results = document.getElementsByClassName('search_results')[0];
songList.forEach(element => {
    const {id, songName, poster, subtitle} = element;
     let card = document.createElement('li');
     card.classList.add('card');
     card.innerHTML = `
        <img src="${poster}" alt="">
                <div class="content">
                   <h5 class="search-target">${songName} </h5>
                   <h6>${subtitle}</h6>
                </div>
                <span><i class="play_button fa-solid fa-circle-play" id="${id}"></i><span>
     `;
    search_results.appendChild(card);
});

artistData.forEach(element => {
    const {url, poster, artistName} = element;
     let card = document.createElement('li');
     card.classList.add('card');
     card.innerHTML = `
                <a href="${url}"><img src="${poster}" class="artists-img"></a>
                <div class="content">
                   <h5 class="search-target">${artistName} </h5>
                   <h6>Artist</h6>
                </div>
     `;
    search_results.appendChild(card);
});

let input = document.getElementsByTagName('input')[0];
input.addEventListener('keyup', () => {
    let input_value = input.value.toUpperCase();
    let items = search_results.getElementsByTagName('li');

    for (let index = 0; index < items.length; index++) {
        let as = items[index].getElementsByClassName('search-target')[0];
        let text_value = as.textContent || as.innerHTML;
        
        if (text_value.toUpperCase().indexOf(input_value) > -1) {
            items[index].style.display = 'flex';
        } else {
            items[index].style.display = 'none';
        }

        if (input.value == 0) {
            search_results.style.display = 'none';
        } else {
            search_results.style.display = '';
        }
    }
})

const music = new Audio('audio/1.mp3');

// Open this HTML Search Input Onload
window.onload = function() {
    document.getElementById("search-input").focus();
};

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

// Download Music
let download_music = document.getElementById('download-music');
// Playing Music with their respective ids & getting their titles, covers in Bottom Section
let master_play = document.getElementsByClassName('master_play')[0];
let index = 0;
let cover_master_play = document.getElementById('cover_master_play');
Array.from(document.getElementsByClassName('play_button')).forEach((e, i) => {
    e.addEventListener('click', (el)=> {
        index = el.target.id;
        // console.log(index);
        music.src = `audio/${index}.mp3`;
        cover_master_play.src = songList[i].poster;
        song_title.innerHTML = songList[i].songName;
        artist_name.innerHTML = songList[i].subtitle;
        
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
volume_seekBar.addEventListener('input', () => {
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

// Next Song Plays automatic when the current song ends and when the last song of the List ends then it starts from 1. 
music.addEventListener('ended', () => {
    // index ++;

    music.currentTime = 0;

    music.src = `audio/${index}.mp3`;

    // Download Music
    download_music.href = music.src;

    let songCover = songList.filter((els) => {
        return els.id == index;
    });
    songCover.forEach((elss) => {
        let {poster} = elss;
        cover_master_play.src = poster;

    });

    let songTitles = songList.filter((els) => {
        return els.id == index;
    });

    songTitles.forEach((elss) => {
        let {songName} = elss;
        song_title.innerHTML = songName;

        // Getting the song name when gets downloaded
        download_music.setAttribute('download', song_title.innerHTML);
    });

    let artistTitle = songList.filter((els) => {
        return els.id == index;
    });
    artistTitle.forEach((elss) => {
        let {subtitle} = elss;
        artist_name.innerHTML = subtitle;

    });

    music.play();
    wave.classList.add('active1');
    masterPlay.classList.remove('fa-circle-play')
    masterPlay.classList.add('fa-circle-pause');
});
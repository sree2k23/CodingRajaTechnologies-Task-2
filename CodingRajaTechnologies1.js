const audioPlayer = document.getElementById('audioPlayer');
const progressBar = document.getElementById('progressBar');
let currentTrackIndex = 0;
let isPlaying = false;
let isShuffle = false;
let isRepeat = false;

const tracks = [{
        title: 'Track 1',
        artist: 'Artist 1',
        album: 'Album 1',
        cover: 'cover1.jpg',
        src: 'track1.mp3'
    },
    {
        title: 'Track 2',
        artist: 'Artist 2',
        album: 'Album 2',
        cover: 'cover2.jpg',
        src: 'track2.mp3'
    },
    // Add more tracks as needed
];

const playlists = [];

function loadTracks() {
    const musicLibrary = document.getElementById('musicLibrary');
    tracks.forEach((track, index) => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('track', 'col-12', 'd-flex', 'align-items-center');
        trackElement.innerHTML = `
            <img src="${track.cover}" alt="${track.title}">
            <div>
                <strong>${track.title}</strong><br>
                <small>${track.artist} - ${track.album}</small>
            </div>
        `;
        trackElement.onclick = () => playTrack(index);
        musicLibrary.appendChild(trackElement);
    });
}

function addPlaylist() {
    const playlistName = document.getElementById('newPlaylistName').value;
    if (playlistName) {
        playlists.push({ name: playlistName, tracks: [] });
        const playlistElement = document.createElement('li');
        playlistElement.classList.add('list-group-item');
        playlistElement.textContent = playlistName;
        playlistElement.onclick = () => loadPlaylist(playlistName);
        document.getElementById('playlist').appendChild(playlistElement);
        document.getElementById('newPlaylistName').value = '';
    }
}

function loadPlaylist(name) {
    // Load playlist tracks
    console.log('Loading playlist:', name);
}

function playTrack(index) {
    currentTrackIndex = index;
    audioPlayer.src = tracks[index].src;
    audioPlayer.play();
    isPlaying = true;
    updateProgress();
}

function playPauseTrack() {
    if (isPlaying) {
        audioPlayer.pause();
    } else {
        audioPlayer.play();
    }
    isPlaying = !isPlaying;
}

function nextTrack() {
    if (isShuffle) {
        currentTrackIndex = Math.floor(Math.random() * tracks.length);
    } else {
        currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    }
    playTrack(currentTrackIndex);
}

function previousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack(currentTrackIndex);
}

function toggleShuffle() {
    isShuffle = !isShuffle;
    console.log('Shuffle:', isShuffle);
}

function toggleRepeat() {
    isRepeat = !isRepeat;
    console.log('Repeat:', isRepeat);
}

function setVolume(value) {
    audioPlayer.volume = value;
}

function updateProgress() {
    audioPlayer.ontimeupdate = () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.style.width = `${progress}%`;
        progressBar.setAttribute('aria-valuenow', progress);
    };

    audioPlayer.onended = () => {
        if (isRepeat) {
            playTrack(currentTrackIndex);
        } else {
            nextTrack();
        }
    };
}

window.onload = () => {
    loadTracks();
};
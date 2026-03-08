var isPlaying = false;
var bgMusic = document.getElementById('bgMusic');
bgMusic.volume = 0.7;

var musicBtn = document.getElementById('musicToggle');

function autoPlay() {
	bgMusic.play().then(function () {
		isPlaying = true;
		musicBtn.classList.add('playing');
		musicBtn.innerHTML = '<span class="music-note">🎵</span>';
	}).catch(function () {
		document.addEventListener('click', function resumePlay() {
			bgMusic.play().then(function () {
				isPlaying = true;
				musicBtn.classList.add('playing');
				musicBtn.innerHTML = '<span class="music-note">🎵</span>';
			});
			document.removeEventListener('click', resumePlay);
		}, { once: true });
	});
}
autoPlay();

musicBtn.addEventListener('click', function () {
	if (isPlaying) {
		bgMusic.pause();
		musicBtn.classList.remove('playing');
		musicBtn.innerHTML = '<span class="music-note">🔇</span>';
		isPlaying = false;
	} else {
		bgMusic.play();
		musicBtn.classList.add('playing');
		musicBtn.innerHTML = '<span class="music-note">🎵</span>';
		isPlaying = true;
	}
});

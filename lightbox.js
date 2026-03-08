(function () {
	var images = [];
	var currentIndex = 0;

	var gridItems = document.querySelectorAll('.grid__item-img');
	gridItems.forEach(function (item) {
		var bg = item.style.backgroundImage;
		var url = bg.replace(/url\(["']?/, '').replace(/["']?\)/, '');
		images.push(url);
	});

	var lightbox = document.getElementById('lightbox');
	var lightboxImg = document.getElementById('lightboxImg');
	var lightboxClose = document.getElementById('lightboxClose');
	var lightboxPrev = document.getElementById('lightboxPrev');
	var lightboxNext = document.getElementById('lightboxNext');
	var lightboxCounter = document.getElementById('lightboxCounter');
	var overlay = lightbox.querySelector('.lightbox__overlay');

	var thumbsContainer = document.getElementById('lightboxThumbs');
	var isAnimating = false;

	images.forEach(function (src, i) {
		var thumb = document.createElement('img');
		thumb.className = 'lightbox__thumb';
		thumb.src = src;
		thumb.addEventListener('click', function () {
			showImage(i);
		});
		thumbsContainer.appendChild(thumb);
	});
	var thumbs = thumbsContainer.querySelectorAll('.lightbox__thumb');

	function updateThumbs() {
		thumbs.forEach(function (t, i) {
			t.classList.toggle('active', i === currentIndex);
		});
		if (thumbs[currentIndex]) {
			thumbs[currentIndex].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
		}
	}

	function showImage(index) {
		if (isAnimating) return;
		if (index === currentIndex && lightboxImg.src) {
			updateThumbs();
			return;
		}
		isAnimating = true;

		lightboxImg.classList.add('fade-out');
		lightboxImg.classList.remove('fade-in');

		setTimeout(function () {
			currentIndex = index;
			lightboxImg.src = images[index];
			lightboxCounter.textContent = (index + 1) + ' / ' + images.length;
			updateThumbs();

			lightboxImg.classList.remove('fade-out');
			lightboxImg.classList.add('fade-in');

			setTimeout(function () {
				isAnimating = false;
			}, 300);
		}, 250);
	}

	function openLightbox(index) {
		currentIndex = -1;
		lightboxImg.classList.remove('fade-out');
		lightboxImg.classList.add('fade-in');
		lightboxImg.src = images[index];
		currentIndex = index;
		lightboxCounter.textContent = (index + 1) + ' / ' + images.length;
		updateThumbs();
		lightbox.classList.add('active');
	}

	function closeLightbox() {
		lightbox.classList.remove('active');
	}

	function prevImage() {
		var index = (currentIndex - 1 + images.length) % images.length;
		showImage(index);
	}

	function nextImage() {
		var index = (currentIndex + 1) % images.length;
		showImage(index);
	}

	gridItems.forEach(function (item, i) {
		item.addEventListener('click', function () {
			openLightbox(i);
		});
	});

	lightboxClose.addEventListener('click', closeLightbox);
	overlay.addEventListener('click', closeLightbox);

	lightboxPrev.addEventListener('click', prevImage);
	lightboxNext.addEventListener('click', nextImage);

	document.addEventListener('keydown', function (e) {
		if (!lightbox.classList.contains('active')) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowLeft') prevImage();
		if (e.key === 'ArrowRight') nextImage();
	});
})();

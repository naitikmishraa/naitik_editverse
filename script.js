document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const section = document.querySelector(this.getAttribute('href'));
        section.scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate elements when they come into view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.project-card, .about-content, .contact h2').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add background music control
const musicToggle = document.getElementById('music-toggle');
const backgroundMusic = document.getElementById('background-music');
const volumeIcon = musicToggle.querySelector('i');
let isMusicPlaying = false;  // Changed to false initially

// Set initial volume (0.1 = 10% volume)
backgroundMusic.volume = 0.1;

// Try to play music immediately
backgroundMusic.play().catch(() => {
    // Autoplay was prevented, will wait for user interaction
    console.log('Autoplay prevented - waiting for user interaction');
});

// Update initial icon state based on play state
if (backgroundMusic.paused) {
    volumeIcon.classList.remove('fa-volume-up');
    volumeIcon.classList.add('fa-volume-mute');
} else {
    volumeIcon.classList.remove('fa-volume-mute');
    volumeIcon.classList.add('fa-volume-up');
    isMusicPlaying = true;
}

// Add click event listener for music toggle button
musicToggle.addEventListener('click', () => {
    if (isMusicPlaying) {
        backgroundMusic.pause();
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
    } else {
        backgroundMusic.play().then(() => {
            volumeIcon.classList.remove('fa-volume-mute');
            volumeIcon.classList.add('fa-volume-up');
        }).catch(error => console.log('Playback prevented:', error));
    }
    isMusicPlaying = !isMusicPlaying;
});

// Handle user interaction to start music
document.addEventListener('click', () => {
    if (backgroundMusic.paused) {
        backgroundMusic.play().then(() => {
            volumeIcon.classList.remove('fa-volume-mute');
            volumeIcon.classList.add('fa-volume-up');
            isMusicPlaying = true;
        }).catch(error => console.log('Playback prevented:', error));
    }
}, { once: true });

// Auto-pause videos when another starts playing and control background music
const videos = document.querySelectorAll('video');

videos.forEach(video => {
    // Set video volume to full
    video.volume = 1.0;
    
    video.addEventListener('play', () => {
        // Pause other videos
        videos.forEach(v => {
            if (v !== video && !v.paused) {
                v.pause();
            }
        });
        
        // Always pause background music when video plays
        backgroundMusic.pause();
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
        isMusicPlaying = false;
    });

    video.addEventListener('pause', () => {
        // If all videos are paused, resume background music
        const anyVideoPlaying = Array.from(videos).some(v => !v.paused);
        if (!anyVideoPlaying && !isMusicPlaying) {
            backgroundMusic.play();
            volumeIcon.classList.remove('fa-volume-mute');
            volumeIcon.classList.add('fa-volume-up');
            isMusicPlaying = true;
        }
    });

    video.addEventListener('ended', () => {
        // If all videos are ended/paused, resume background music
        const anyVideoPlaying = Array.from(videos).some(v => !v.paused);
        if (!anyVideoPlaying && !isMusicPlaying) {
            backgroundMusic.play();
            volumeIcon.classList.remove('fa-volume-mute');
            volumeIcon.classList.add('fa-volume-up');
            isMusicPlaying = true;
        }
    });
});

// Add hover effect to project cards
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
}); 
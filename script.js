(function () {
  window.onload = function () {
    if ('serviceWorker' in navigator) {
        // Unregister tất cả service worker trước
        navigator.serviceWorker.getRegistrations().then(registrations => {
            for (let reg of registrations) {
                reg.unregister().then(success => {
                    if (success) {
                        console.log('Service Worker unregistered');
                    }
                });
            }

            navigator.serviceWorker.register('/sw.js')
                .then(reg => console.log('Service Worker registered'))
                .catch(err => console.error('Service Worker registration failed:', err));

            navigator.serviceWorker.addEventListener('message', (event) => {
                if (event.data && event.data.type === 'SW_LOG') {
                    alert(`[SW][Remote] ${event.data.payload}`);
                }
            });
        });
    }
    var video = document.getElementById("video");
    var videoSrc =
      "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8?v=" +
      new Date().getTime();
    var progressBar = document.getElementById("progressBar");
    var progressContainer = progressBar.parentElement;
    var playPauseBtn = document.getElementById("playPauseBtn");

    // Check for native browser HLS support
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      alert("here 3");
      video.src = videoSrc;
    } else if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(videoSrc);
      hls.attachMedia(video);
    }

    // Play/Pause button functionality
    playPauseBtn.addEventListener("click", function () {
      if (video.paused) {
        video.play().catch(function (error) {
          console.error("Play error:", error);
        });
        this.textContent = "Pause";
      } else {
        video.pause();
        this.textContent = "Play";
      }
    });

    // Unmute button functionality
    document.getElementById("unmuteBtn").addEventListener("click", function () {
      video.muted = !video.muted;
      this.textContent = video.muted ? "Unmute" : "Mute";
    });

    // Seek backward 10 seconds
    document
      .getElementById("seekBackBtn")
      .addEventListener("click", function () {
        video.currentTime = Math.max(0, video.currentTime - 10);
      });

    // Seek forward 10 seconds
    document
      .getElementById("seekForwardBtn")
      .addEventListener("click", function () {
        video.currentTime = Math.min(video.duration, video.currentTime + 10);
      });

    // Fullscreen button functionality
    document
      .getElementById("fullscreenBtn")
      .addEventListener("click", function () {
        if (!document.fullscreenElement) {
          if (video.requestFullscreen) {
            video.requestFullscreen().catch(function (error) {
              console.error("Fullscreen error:", error);
            });
          } else if (video.webkitRequestFullscreen) {
            /* Safari */
            video.webkitRequestFullscreen();
          } else if (video.msRequestFullscreen) {
            /* IE11 */
            video.msRequestFullscreen();
          }
          this.textContent = "Exit Fullscreen";
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          } else if (document.webkitExitFullscreen) {
            /* Safari */
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            /* IE11 */
            document.msExitFullscreen();
          }
          this.textContent = "Fullscreen";
        }
      });

    // Update progress bar
    video.addEventListener("timeupdate", function () {
      if (video.duration) {
        var progressPercent = (video.currentTime / video.duration) * 100;
        progressBar.style.width = progressPercent + "%";
      }
    });

    // Seek when clicking on progress bar
    progressContainer.addEventListener("click", function (e) {
      var rect = progressContainer.getBoundingClientRect();
      var clickX = e.clientX - rect.left;
      var width = rect.width;
      var seekTime = (clickX / width) * video.duration;
      video.currentTime = seekTime;
    });

    // Update button text when video is played or paused
    video.addEventListener("play", function () {
      playPauseBtn.textContent = "Pause";
    });
    video.addEventListener("pause", function () {
      playPauseBtn.textContent = "Play";
    });
  };
})();

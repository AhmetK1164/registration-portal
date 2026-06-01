(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('select').formSelect();
    var carousel = $('.carousel');
    carousel.carousel({
      fullWidth: true,
      indicators: false,                                                                                                                // Geändert: 9.2.5.1
      duration: 300,
      onCycleTo : function($current_item, dragged) {
        console.log($current_item);
        stopAutoplay();
        startAutoplay(carousel);
      }
    });

var autoplay_id;
function startAutoplay($carousel) {
   autoplay_id = setInterval(function() {
      $carousel.carousel('next');
    }, 5000); // every 5 seconds
  //console.log("starting autoplay");
}

                                                                                                                               // 28 - 86 Neu: 11.8.1 und 11.8.2
function saveImage() {
  const textEl = document.getElementById("form_message");
  if (!textEl) return;

  // create a hidden file input to select images
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.style.display = 'none';

  input.addEventListener('change', function() {
    const file = input.files && input.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
      const container = document.getElementById('output');
      const wrapper = document.createElement('div');
      wrapper.className = 'saved-image';

      const img = document.createElement('img');
      img.src = e.target.result;
      img.style.maxWidth = '100%';
      img.style.height = 'auto';
      img.style.display = 'block';

      const btnReplace = document.createElement('button');
      btnReplace.type = 'button';
      btnReplace.textContent = 'Replace';
      btnReplace.addEventListener('click', function() {
        // trigger input click again to replace image
        input.click();
      });

      const btnDelete = document.createElement('button');
      btnDelete.type = 'button';
      btnDelete.textContent = 'Delete';
      btnDelete.addEventListener('click', function() {
        if (container.contains(wrapper)) container.removeChild(wrapper);
      });

      wrapper.appendChild(img);
      wrapper.appendChild(btnReplace);
      wrapper.appendChild(btnDelete);
      container.appendChild(wrapper);
    };

    reader.readAsDataURL(file);
  });

  // Add input to the DOM, trigger click, then remove it later
  document.body.appendChild(input);
  input.click();
  // remove input after some time to keep DOM clean (after change event runs)
  setTimeout(function() { if (input.parentNode) input.parentNode.removeChild(input); }, 2000);
}

// Expose saveImage to the global scope so inline onclick handlers work
window.saveImage = saveImage;

const link = document.getElementById("autoLink");                                                                                       // 88 - 102 Neu: 9.3.2.1

if (link) {
  link.onfocus = function () {
    window.location = link.href;
  };
}

document.addEventListener("DOMContentLoaded", function () {

  const link = document.getElementById("autoLink");

  link.addEventListener("focus", function () {
    window.location.href = link.href;
  });

});

function stopAutoplay() {
  if(autoplay_id) {
    clearInterval(autoplay_id);
    //console.log("stoping autoplay");
  }
}

  }); // end of document ready
                                                                                                                                        
    (function(){                                                                                                                       // 113 - 138 Neu: 9.1.2.1
      document.addEventListener('DOMContentLoaded', function(){
        const inputFields = document.querySelectorAll('.input-field');
        inputFields.forEach(field => {
          const hint = field.querySelector('.hint');
          if (!hint) return;
          let timer = null;
          const clearTimer = () => { if (timer) { clearTimeout(timer); timer = null; } };
          const hideHint = () => {
            hint.style.display = 'none';
          };
          const restoreHint = () => {
            clearTimer();
            hint.style.display = '';
          };

          const startAutoHide = () => {
            clearTimer();
            timer = setTimeout(hideHint, 2000);
          };

          field.addEventListener('mouseenter', function(){ restoreHint(); startAutoHide(); });
          field.addEventListener('focusin', function(){ restoreHint(); startAutoHide(); });
          field.addEventListener('mouseleave', function(){ restoreHint(); });
          field.addEventListener('focusout', function(){ restoreHint(); });
        });

        const timerStatus = document.getElementById('timer-status');                                                                   // 140 - 163 Neu: 9.2.2.1
        const timerCount = document.getElementById('timer-count');
        const form = document.getElementById('form_test');
        let remaining = 600; 
        if (timerStatus && timerCount && form) {
          timerCount.textContent = '10:00';
          const updateTimer = () => {
            const min = Math.floor(remaining / 60);
            const sec = remaining % 60;
            timerCount.textContent = `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
          };
          const timerId = setInterval(function() {
            remaining -= 1;
            if (remaining < 0) {
              clearInterval(timerId);
              timerStatus.textContent = 'Time is up. The form is no longer available.';
              Array.from(form.elements).forEach(function(el) {
                el.disabled = true;
              });
              return;
            }
            updateTimer();
          }, 1000);
        }

        const msg = document.getElementById('form_message');                                                                           // 165 - 183 Neu: 9.3.2.2
        if (msg && form) {
          let autoSubmitted = false;
          msg.addEventListener('blur', function() {
            if (autoSubmitted) return;
            // don't submit if timer already expired
            if (typeof remaining !== 'undefined' && remaining < 0) return;
            const value = (msg.value || '');
            if (value.trim().length === 0) return; // avoid submitting empty messages
            // submit regardless of built-in validation
            // submit the form
            if (typeof form.requestSubmit === 'function') {
              form.requestSubmit();
            } else {
              form.submit();
            }
            autoSubmitted = true;
          });
        }
      });
    })();
})(jQuery); // end of jQuery name space


(function(){                                                                                                                          // 189 - 206 Neu: 9.2.1.4
  function isEditable(el) {
    return el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
  }

  document.addEventListener('keydown', function(e){
    try {
      if (isEditable(document.activeElement)) return;
      var key = e.key || '';
      if (key === '+') {
        e.preventDefault();
        window.location.href = 'index.html';
      }
    } catch(err) {
      console.error("Error in '+' shortcut", err);
    }
  });
})();

// Persistent sitemap dropdown behaviour for actualites.html. Neu für 9.2.4.11 und 9.4.1.2
document.addEventListener('DOMContentLoaded', function() {
  try {
    var wrappers = document.querySelectorAll('.sitemap-wrapper');
    wrappers.forEach(function(w) {
      var toggle = w.querySelector('.sitemap-toggle');
      var dropdown = w.querySelector('.sitemap-dropdown');
      if (!toggle || !dropdown) return;

      // Open on click or focus and make persistent until page refresh/leave
      var openOnce = function() {
        w.classList.add('sitemap-open');
        dropdown.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-pressed', 'true');
      };

      toggle.addEventListener('click', function(e) { e.preventDefault(); openOnce(); });
      toggle.addEventListener('focus', function() { openOnce(); });

      // ensure it doesn't close on focusout or mouseleave — we rely solely on the class
      w.addEventListener('focusout', function(e) { /* intentionally empty */ });
      w.addEventListener('mouseleave', function(e) { /* intentionally empty */ });
    });
  } catch (err) {
    console.error('Error initializing sitemap persistent dropdown', err);
  }
});

// Drag-only slider: block keyboard and click inputs, only allow drag. Neu: 9.2.5.7
document.addEventListener('DOMContentLoaded', function() {
  var slider = document.getElementById('carLikeSlider');
  if (!slider) return;

  var isDragging = false;

  // Allow only Tab key; block other keyboard input for the slider
  slider.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') {
      e.preventDefault();
    }
  });

  // Use pointer dragging only and prevent native click updates
  slider.addEventListener('pointerdown', function(e) {
    e.preventDefault();
    isDragging = true;
  });

  document.addEventListener('pointermove', function(e) {
    if (isDragging) {
      var rect = slider.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var percentage = (x / rect.width) * 100;
      if (percentage >= 0 && percentage <= 100) {
        slider.value = Math.round((percentage / 100) * (slider.max - slider.min) + parseInt(slider.min));
      }
    }
  });

  document.addEventListener('pointerup', function() {
    isDragging = false;
  });
});

// Night mode only by smartphone tilt
(function() {
  var nightModeEnabled = false;

  function setNightMode(active) {
    if (active && !nightModeEnabled) {
      document.documentElement.classList.add('night-mode');
      nightModeEnabled = true;
    } else if (!active && nightModeEnabled) {
      document.documentElement.classList.remove('night-mode');
      nightModeEnabled = false;
    }
  }

  function handleOrientation(event) {
    if (!event.gamma && !event.beta) return;

    // smartphone tilt activation: tilt device to the right beyond about 40 degrees
    var gamma = event.gamma || 0;
    var beta = event.beta || 0;

    if (Math.abs(gamma) > 40 || Math.abs(beta) > 40) {
      setNightMode(true);
    }
  }

  window.addEventListener('deviceorientation', function(event) {
    if (typeof event.gamma === 'number' || typeof event.beta === 'number') {
      handleOrientation(event);
    }
  });
})();

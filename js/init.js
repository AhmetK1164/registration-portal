(function($){
  $(function(){

    $('.sidenav').sidenav();
    $('.parallax').parallax();
    $('select').formSelect();
    var carousel = $('.carousel');
    carousel.carousel({
      fullWidth: true,
      indicators: true,
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

                                                                                                                               // 28 - 83 Neu: 11.8.1 und 11.8.2
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

const link = document.getElementById("autoLink");

link.onfocus = function () {
  window.location = link.href;
};

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
                                                                                                                                        // 97 - 122 Neu: 9.1.2.1
    (function(){
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

        const timerStatus = document.getElementById('timer-status');                                                                   // 124 - 147 Neu: 9.2.2.1
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

        // Auto-submit form when leaving the message textarea (blur)
        const msg = document.getElementById('form_message');
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

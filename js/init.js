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

// Save image upload and preview
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

function stopAutoplay() {
  if(autoplay_id) {
    clearInterval(autoplay_id);
    //console.log("stoping autoplay");
  }
}

  }); // end of document ready
})(jQuery); // end of jQuery name space

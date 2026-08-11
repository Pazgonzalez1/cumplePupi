import confetti from 'canvas-confetti';

// ==========================================================================
// CONFIGURACIÓN: Poné tu número de WhatsApp aquí (con código de país, ej: "5491112345678")
// Si lo dejás vacío, WhatsApp se abrirá para que selecciones a quién enviarlo.
// ==========================================================================
const NUMERO_WHATSAPP = ""; 

document.addEventListener('DOMContentLoaded', () => {
  // DOM Elements
  const slider = document.getElementById('slider');
  const dots = document.querySelectorAll('.dot');

  // Modal Elements
  const modalNo = document.getElementById('modal-no');
  const modalCustomizer = document.getElementById('modal-customizer');
  
  const btnSiVoy = document.getElementById('btn-si-voy');
  const btnNoVoy = document.getElementById('btn-no-voy');
  const closeModalNo = document.getElementById('close-modal-no');
  const closeBtnNoAck = document.getElementById('close-btn-no-ack');
  const closeCustomizer = document.getElementById('close-customizer');
  const customizerToggle = document.getElementById('customizer-toggle');

  const btnAddCalendar = document.getElementById('btn-add-calendar');
  const btnShareInvite = document.getElementById('btn-share-invite');

  /* ==========================================================================
     1. COUNTDOWN TIMER (Target: 28/08 22:30)
     ========================================================================== */
  function startCountdown() {
    const now = new Date();
    let currentYear = now.getFullYear();
    let targetDate = new Date(currentYear, 7, 28, 22, 30, 0); // Month 7 = August

    if (now > targetDate) {
      targetDate = new Date(currentYear + 1, 7, 28, 22, 30, 0);
    }

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    function updateTimer() {
      const currentTime = new Date();
      const diff = targetDate - currentTime;

      if (diff <= 0) {
        if (daysEl) daysEl.innerText = "00";
        if (hoursEl) hoursEl.innerText = "00";
        if (minutesEl) minutesEl.innerText = "00";
        if (secondsEl) secondsEl.innerText = "00";
        return;
      }

      const d = Math.floor(diff / (1000 * 60 * 60 * 24));
      const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const m = Math.floor((diff / 1000 / 60) % 60);
      const s = Math.floor((diff / 1000) % 60);

      if (daysEl) daysEl.innerText = String(d).padStart(2, '0');
      if (hoursEl) hoursEl.innerText = String(h).padStart(2, '0');
      if (minutesEl) minutesEl.innerText = String(m).padStart(2, '0');
      if (secondsEl) secondsEl.innerText = String(s).padStart(2, '0');
    }

    updateTimer();
    setInterval(updateTimer, 1000);
  }

  startCountdown();

  /* ==========================================================================
     2. SLIDER SCROLL & DOTS SYNC
     ========================================================================== */
  const slides = document.querySelectorAll('.slide');

  const observerOptions = {
    root: slider,
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const slideIndex = Array.from(slides).indexOf(entry.target);
        dots.forEach((dot, idx) => {
          if (idx === slideIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  slides.forEach(slide => observer.observe(slide));

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const idx = parseInt(dot.getAttribute('data-slide'));
      if (slides[idx]) {
        slides[idx].scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  /* ==========================================================================
     3. RSVP ACTIONS
     ========================================================================== */
  function triggerConfetti() {
    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      confetti({
        particleCount: 60,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 60,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  }

  // SI VOY -> Confetti + Direct WhatsApp
  btnSiVoy.addEventListener('click', () => {
    triggerConfetti();

    const text = encodeURIComponent("¡Hola! Confirmo que voy a tu cumple el 28/08 a las 22:30 en Bar Irlanda! 🥳🎉");
    let waUrl = `https://wa.me/?text=${text}`;
    
    if (NUMERO_WHATSAPP && NUMERO_WHATSAPP.trim() !== "") {
      waUrl = `https://wa.me/${NUMERO_WHATSAPP.trim()}?text=${text}`;
    }

    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);
  });

  // NO VOY -> Modal "OK NO TE PERDONO NUNCA MÁS"
  btnNoVoy.addEventListener('click', () => {
    modalNo.classList.add('active');
  });

  if (closeModalNo) {
    closeModalNo.addEventListener('click', () => {
      modalNo.classList.remove('active');
    });
  }

  if (closeBtnNoAck) {
    closeBtnNoAck.addEventListener('click', () => {
      modalNo.classList.remove('active');
    });
  }

  /* ==========================================================================
     4. CALENDAR & SHARE ACTIONS
     ========================================================================== */
  btnAddCalendar.addEventListener('click', () => {
    const currentYear = new Date().getFullYear();
    const gCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('¡Cumple! Te invito a tomar por mi nacimiento 🍻')}&dates=${currentYear}0828T223000/${currentYear}0829T030000&details=${encodeURIComponent('Traer plata y chisme mua. Regalo: que vengan. Vengan todas o lloro 😭')}&location=${encodeURIComponent('Bar Irlanda')}`;
    
    window.open(gCalUrl, '_blank');
  });

  btnShareInvite.addEventListener('click', () => {
    if (navigator.share) {
      navigator.share({
        title: '¡Te invito a mi cumple!',
        text: 'Te invito a tomar por mi nacimiento el 28/08 a las 22:30 hs en Bar Irlanda. ¡Confirmá tu asistencia!',
        url: window.location.href
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('¡Enlace de invitación copiado al portapapeles! 📲');
    }
  });

  /* ==========================================================================
     5. CUSTOMIZER PHOTO SWAPPER
     ========================================================================== */
  customizerToggle.addEventListener('click', () => {
    modalCustomizer.classList.add('active');
  });

  closeCustomizer.addEventListener('click', () => {
    modalCustomizer.classList.remove('active');
  });

  const photoInputs = document.querySelectorAll('.photo-file-input');
  photoInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      const file = e.target.files[0];
      const slotNum = e.target.getAttribute('data-target');
      if (file && slotNum) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const imgSlot = document.getElementById(`img-slot-${slotNum}`);
          if (imgSlot) {
            imgSlot.src = event.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    });
  });

  /* ==========================================================================
     6. IMAGE FALLBACK HANDLER (.jpeg, .png, .jpg)
     ========================================================================== */
  document.querySelectorAll('.character-img').forEach(img => {
    img.addEventListener('error', function errorHandler() {
      const src = this.src;
      if (src.endsWith('.png')) {
        this.src = src.replace('.png', '.jpeg');
      } else if (src.endsWith('.jpeg')) {
        this.src = src.replace('.jpeg', '.jpg');
      } else if (src.endsWith('.jpg')) {
        this.src = src.replace('.jpg', '.png');
      }
      this.removeEventListener('error', errorHandler);
    });
  });
});

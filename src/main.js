document.addEventListener('DOMContentLoaded', () => {

  // --- 1. UTILS & ICONS ---
  if (typeof lucide !== 'undefined') {
      lucide.createIcons();
  }

  // --- 2. MOBILE MENU ---
  const navMenu = document.getElementById('nav-menu');
  const openBtn = document.getElementById('open-menu');
  const closeBtn = document.getElementById('close-menu');
  const navLinks = document.querySelectorAll('.nav__link');

  const toggleMenu = (isOpen) => {
      if (isOpen) {
          navMenu.classList.add('active');
          document.body.style.overflow = 'hidden';
      } else {
          navMenu.classList.remove('active');
          document.body.style.overflow = '';
      }
  };

  if (openBtn) openBtn.addEventListener('click', () => toggleMenu(true));
  if (closeBtn) closeBtn.addEventListener('click', () => toggleMenu(false));
  navLinks.forEach(link => link.addEventListener('click', () => toggleMenu(false)));

  // --- 3. LOTTIE ANIMATION (HERO) ---
  const lottieContainer = document.getElementById('lottie-hero');
  if (lottieContainer && typeof lottie !== 'undefined') {
      lottie.loadAnimation({
          container: lottieContainer,
          renderer: 'svg',
          loop: true,
          autoplay: true,
          path: 'https://assets10.lottiefiles.com/packages/lf20_zrqthn6o.json'
      });
  }

  // --- 4. SWIPER SLIDER INITIALIZATION ---
  if (typeof Swiper !== 'undefined') {
      const swiper = new Swiper('.platform-slider', {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          autoplay: {
              delay: 4000,
              disableOnInteraction: false,
          },
          pagination: {
              el: '.swiper-pagination',
              clickable: true,
          },
          breakpoints: {
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
          }
      });
  }

  // --- 5. GSAP SCROLL ANIMATIONS ---
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Hero Timeline
      const tl = gsap.timeline({ defaults: { ease: "power2.out", duration: 1 } });
      tl.from(".hero__badge", { y: -20, opacity: 0, duration: 0.8, delay: 0.2 })
        .from(".hero__title", { y: 30, opacity: 0, duration: 0.8 }, "-=0.5")
        .from(".hero__desc", { y: 20, opacity: 0, duration: 0.8 }, "-=0.6")
        .from(".hero__actions", { y: 20, opacity: 0, duration: 0.6 }, "-=0.6")
        .from(".hero__visual", { scale: 0.9, opacity: 0, duration: 1.2 }, "-=1.0")
        .from(".hero__stats", { y: 20, opacity: 0, duration: 0.8 }, "-=0.8");

      // General Section Animations
      gsap.utils.toArray('.section').forEach(section => {
          gsap.from(section.children, {
              scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  toggleActions: "play none none reverse"
              },
              y: 50,
              opacity: 0,
              duration: 0.8,
              stagger: 0.2
          });
      });
  }

  // --- 6. CONTACT FORM LOGIC ---
  const form = document.getElementById('lead-form');
  const phoneInput = document.getElementById('phone-input');
  const phoneError = document.getElementById('phone-error');
  const formStatus = document.getElementById('form-status');
  const captchaQuestion = document.getElementById('captcha-question');
  const captchaInput = document.getElementById('captcha-input');

  // Math Captcha Logic
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;
  if (captchaQuestion) {
      captchaQuestion.textContent = `${num1} + ${num2} = ?`;
  }

  // Phone Validation (Only digits)
  if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
          const value = e.target.value;
          // Удаляем все нецифровые символы для проверки
          if (!/^\d*$/.test(value)) {
              phoneError.style.display = 'block';
              e.target.value = value.replace(/\D/g, ''); // Автоудаление букв
          } else {
              phoneError.style.display = 'none';
          }
      });
  }

  if (form) {
      form.addEventListener('submit', (e) => {
          e.preventDefault();

          // Validate Captcha
          const userAnswer = parseInt(captchaInput.value);
          if (userAnswer !== (num1 + num2)) {
              alert('Ошибка в примере (капча). Попробуйте снова.');
              return;
          }

          const formData = new FormData(form);
          const btn = form.querySelector('button');
          const originalText = btn.textContent;

          // Simulate AJAX
          btn.textContent = 'Отправка...';
          btn.disabled = true;

          setTimeout(() => {
              btn.textContent = originalText;
              btn.disabled = false;
              formStatus.innerHTML = '<p style="color: #4ade80; margin-top:10px;">Сообщение успешно отправлено! Мы свяжемся с вами.</p>';
              form.reset();

              // Reset captcha
              num1 = Math.floor(Math.random() * 10) + 1;
              num2 = Math.floor(Math.random() * 10) + 1;
              captchaQuestion.textContent = `${num1} + ${num2} = ?`;

              // Hide success message after 5 seconds
              setTimeout(() => { formStatus.innerHTML = ''; }, 5000);
          }, 1500);
      });
  }

  // --- 7. COOKIE POPUP ---
  const cookiePopup = document.getElementById('cookie-popup');
  const acceptCookieBtn = document.getElementById('accept-cookies');

  if (cookiePopup && !localStorage.getItem('cookiesAccepted')) {
      setTimeout(() => {
          cookiePopup.classList.add('show');
      }, 2000);
  }

  if (acceptCookieBtn) {
      acceptCookieBtn.addEventListener('click', () => {
          localStorage.setItem('cookiesAccepted', 'true');
          cookiePopup.classList.remove('show');
      });
  }
});
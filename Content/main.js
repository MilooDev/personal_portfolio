document.addEventListener("DOMContentLoaded", () => {
  
  // 1. Efecto Scroll del Navbar
  const body = document.body;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      body.classList.add("scrolled");
    } else {
      body.classList.remove("scrolled");
    }
  });

  // 2. Menú Hamburguesa para Móviles
  const menuToggle = document.getElementById('mobile-menu');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-item');

  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('is-active');
    navLinks.classList.toggle('active');
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      menuToggle.classList.remove('is-active');
      navLinks.classList.remove('active');
    });
  });

  // 3. Observer Bidireccional (Aparece y Desaparece fluido)
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      } else {
        entry.target.classList.remove("visible"); 
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll(".fade-up").forEach(el => fadeObserver.observe(el));

  // 4. Lógica de los Sliders Horizontales
  const sliders = document.querySelectorAll('.horizontal-slider');
  
  sliders.forEach(slider => {
    const sliderObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active-slide');
        } else {
          entry.target.classList.remove('active-slide');
        }
      });
    }, { root: slider, threshold: 0.6 }); 

    const cards = slider.querySelectorAll('.slider-card');
    cards.forEach(card => sliderObserver.observe(card));
    
    if(cards.length > 0) cards[0].classList.add('active-slide');
  });

  // 5. Cerrar modal con la tecla ESCAPE
  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});

// 6. Lógica del Modal 
function openModal(title, desc, imgSrc, linkUrl) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = desc;
  document.getElementById('modal-img').src = imgSrc;
  
  const linkTag = document.getElementById('modal-link-btn');
  linkTag.href = linkUrl;

  const modal = document.getElementById('project-modal');
  modal.classList.add('active');
  document.body.style.overflow = 'hidden'; 
}

function closeModal() {
  const modal = document.getElementById('project-modal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto'; 
}
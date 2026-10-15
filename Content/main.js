document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  let isScrolled = window.scrollY > 40;
  body.classList.toggle("scrolled", isScrolled);
  window.addEventListener("scroll", () => {
    const nextIsScrolled = window.scrollY > 40;
    if (nextIsScrolled !== isScrolled) {
      isScrolled = nextIsScrolled;
      body.classList.toggle("scrolled", isScrolled);
    }
  }, { passive: true });

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

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  document.querySelectorAll(".fade-up").forEach(el => fadeObserver.observe(el));

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

  document.addEventListener('keydown', (event) => {
    if (event.key === "Escape") {
      closeModal();
    }
  });
});

function openModal(title, desc, imgSrc, linkUrl) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-desc').textContent = desc;
  const modalImage = document.getElementById('modal-img');
  if (imgSrc) {
    modalImage.src = imgSrc;
    modalImage.hidden = false;
  } else {
    modalImage.removeAttribute('src');
    modalImage.hidden = true;
  }
  
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
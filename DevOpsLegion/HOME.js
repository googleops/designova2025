const imageContainerEl = document.querySelector(".image-container");

const prevEl = document.getElementById("prev");
const nextEl = document.getElementById("next");
let x = 0;
let timer;
prevEl.addEventListener("click", () => {
  x = x + 45;
  clearTimeout(timer);
  updateGallery();
});
nextEl.addEventListener("click", () => {
  x = x - 45;
  clearTimeout(timer);
  updateGallery();
});

function updateGallery() {
  imageContainerEl.style.transform = `perspective(1000px) rotateY(${x}deg)`;
  timer = setTimeout(() => {
    x = x - 45;
    updateGallery();
  }, 3000);
}

updateGallery();

// Animasi hover untuk DJ card
document.addEventListener("DOMContentLoaded", () => {
  const djCard = document.querySelector(".dj-card");
  djCard.addEventListener("mouseenter", () => {
    djCard.style.transform = "translateY(-5px)";
    djCard.style.boxShadow = "0 10px 25px rgba(0,0,0,0.5)";
  });
  djCard.addEventListener("mouseleave", () => {
    djCard.style.transform = "translateY(0)";
    djCard.style.boxShadow = "0 5px 15px rgba(0,0,0,0.4)";
  });
});

// Efek hover kecil untuk tombol
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
});

  const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    // Toggle menu saat hamburger diklik
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close menu saat link diklik
    document.querySelectorAll('.navbar-menu li a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      });
    });

    // Close menu saat klik di luar navbar
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });

    // Prevent menu close saat klik di dalam menu
    navMenu.addEventListener('click', (e) => {
      e.stopPropagation();
    });
/* === TREEVERSE SCRIPT v2.0 === */
/* Created for: Statistik + Katalog Pohon Page */

document.addEventListener("scroll", () => {
  document.querySelectorAll("[data-animate]").forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});
// --- ANIMASI AWAL HALAMAN (hero section) ---
window.addEventListener("load", () => {
  const hero = document.querySelector(".hero-content");
  const heroText = hero.querySelectorAll("h1, p, a");

  heroText.forEach((el, i) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    setTimeout(() => {
      el.style.transition = "all 1s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 400 * i);
  });
});

// --- ANIMASI SAAT SCROLL UNTUK SECTION LAINNYA ---
document.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(
    ".about, .program, .why-section, .update, .partners-section, .lokasi-section, .berita"
  );

  elements.forEach((el) => {
    const top = el.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});

// --- ANIMASI DAUN BERGERAK SAAT SCROLL ---
window.addEventListener("scroll", () => {
  const leaves = document.querySelectorAll(".leaf");
  const scrollY = window.scrollY;

  leaves.forEach((leaf, i) => {
    const speed = (i + 1) * 0.25;
    const x = Math.sin(scrollY * 0.01 + i) * 20; // gerak kanan kiri
    const y = scrollY * speed * 0.2;
    leaf.style.transform = `translate(${x}px, ${y}px) rotate(${scrollY * 0.05}deg)`;
  });
});

/* ===== Scroll Animation (jika ada .hidden) ===== */
const hiddenElements = document.querySelectorAll('.hidden');
if (hiddenElements.length) {
  const observerIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('show');
    });
  }, { threshold: 0.2 });
  hiddenElements.forEach(el => observerIO.observe(el));
}

/* ===== Flip untuk setiap card pohon biasa (selengkapnya/kembali) ===== */
document.querySelectorAll('.selengkapnya').forEach(button => {
  button.addEventListener('click', e => {
    const card = e.target.closest('.flip-card');
    if (card) card.classList.add('flipped');
  });
});
document.querySelectorAll('.kembali').forEach(button => {
  button.addEventListener('click', e => {
    const card = e.target.closest('.flip-card');
    if (card) card.classList.remove('flipped');
  });
});

/* ===== Search Function ===== */
const searchInput = document.getElementById('search');
const cards = document.querySelectorAll('#treeContainer .card');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const text = e.target.value.trim().toUpperCase();
    cards.forEach(card => {
      const titleEl = card.querySelector('.card-title');
      if (!titleEl) return;
      const title = titleEl.textContent.toUpperCase();
      card.parentElement.style.display = title.includes(text) ? '' : 'none';
    });
  });
}

/* ===== Statistik Cards Height Equalizer ===== */
window.addEventListener('load', equalizeStatCards);
window.addEventListener('resize', equalizeStatCards);

function equalizeStatCards() {
  const statCards = document.querySelectorAll('.flip-card-tanam');
  let maxHeight = 0;
  statCards.forEach(card => {
    card.style.height = 'auto';
    const h = card.offsetHeight;
    if (h > maxHeight) maxHeight = h;
  });
  statCards.forEach(card => {
    card.style.height = maxHeight + 'px';
  });
}

/* ===== Card: Pohon yang Kamu Tanam ===== */
let storedMyTrees = 0;          // jumlah yang tersimpan (depan)
let editCount = 0;              // sementara (belakang)
let worldTrees = 3000000000000; // total pohon di dunia (awal)

const flipCard = document.querySelector('.flip-card-tanam-true');
const flipBtnTanam = document.getElementById('flipBtnTanam');
const backBtnTanam = document.getElementById('backBtnTanam');
const submitBtn = document.getElementById('submitBtn');
const myTreesFront = document.getElementById('myTreesFront');
const myTreesBack = document.getElementById('myTreesBack');
const plusBtn = document.getElementById('plusBtn');
const minusBtn = document.getElementById('minusBtn');
const photoInput = document.getElementById('photoInput');
const photoPreview = document.getElementById('photoPreview');
const worldTreesDisplay = document.getElementById('worldTrees');

// helper untuk update UI
function updateFrontAndWorld() {
  if (myTreesFront) myTreesFront.textContent = storedMyTrees;
  if (worldTreesDisplay) worldTreesDisplay.textContent = worldTrees.toLocaleString();
}
function updateBackUI() {
  if (myTreesBack) myTreesBack.textContent = editCount;
}

// hanya jalan kalau semua elemen ada
if (
  flipCard && flipBtnTanam && backBtnTanam && submitBtn &&
  myTreesFront && myTreesBack && plusBtn && minusBtn
) {
  // init awal
  storedMyTrees = 0;
  editCount = storedMyTrees;
  updateFrontAndWorld();
  updateBackUI();

  // animasi flip depan → belakang
  flipBtnTanam.addEventListener('click', () => {
    editCount = storedMyTrees;
    updateBackUI();
    flipCard.classList.add('flipped');
  });

  // tombol kembali (tanpa simpan)
  backBtnTanam.addEventListener('click', () => {
    editCount = storedMyTrees;
    updateBackUI();
    flipCard.classList.remove('flipped');
  });

  // tombol +
  plusBtn.addEventListener('click', () => {
    editCount++;
    updateBackUI();
  });

  // tombol -
  minusBtn.addEventListener('click', () => {
    if (editCount > 0) {
      editCount--;
      updateBackUI();
    }
  });

  // upload foto preview
  photoInput.addEventListener('change', function() {
    const file = this.files && this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(ev) {
        photoPreview.innerHTML = `
          <img src="${ev.target.result}" alt="Bukti Pohon" 
               class="img-fluid rounded mt-2 shadow-sm" 
               style="max-height:130px;">
        `;
      };
      reader.readAsDataURL(file);
    } else {
      photoPreview.innerHTML = '';
    }
  });

  // submit → update data
  submitBtn.addEventListener('click', () => {
    const delta = editCount - storedMyTrees;
    if (delta !== 0) {
      worldTrees += delta;
      storedMyTrees = editCount;
      updateFrontAndWorld();
    }
    flipCard.classList.remove('flipped');

    // Optional: notifikasi sukses
    const toast = document.createElement('div');
    toast.textContent = '✅ Pohon berhasil disimpan!';
    toast.style.cssText = `
      position: fixed; bottom: 20px; right: 20px;
      background: #1c8a43; color: white;
      padding: 10px 16px; border-radius: 10px;
      font-size: 14px; box-shadow: 0 4px 10px rgba(0,0,0,0.3);
      z-index: 9999; opacity: 0; transition: opacity 0.4s;
    `;
    document.body.appendChild(toast);
    setTimeout(() => (toast.style.opacity = 1), 50);
    setTimeout(() => {
      toast.style.opacity = 0;
      setTimeout(() => toast.remove(), 500);
    }, 2000);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userEmail = localStorage.getItem("userEmail");

  console.log("=== DEBUG INFO ===");
  console.log("isLoggedIn:", isLoggedIn);
  console.log("userEmail:", userEmail);
  
  // Cek semua elemen dengan class btn-profile
  const profileButtons = document.querySelectorAll('.btn-profile');
  console.log("All btn-profile elements:", profileButtons);
  
  // Cek struktur navbar
  const navbar = document.querySelector('.navbar');
  console.log("Navbar structure:", navbar ? navbar.outerHTML : "Navbar not found");

  // === GANTI TOMBOL LOGIN JADI DROPDOWN PROFIL ===
  if (isLoggedIn === "true") {
    const contactBtn = document.querySelector(".contact");
    console.log("Contact button found:", contactBtn);
    
    if (contactBtn) {
      const profileHTML = `
        <div class="dropdown">
          <button 
            class="btn-profile dropdown-toggle d-flex align-items-center gap-1" 
            type="button"
            id="profileDropdown" 
          >
            <i class="bi bi-person-circle fs-5"></i>
            <span>${userEmail ? userEmail.split("@")[0] : 'User'}</span>
          </button>
          <ul class="dropdown-menu" id="profileDropdownMenu">
            <li><a class="dropdown-item" href="profile.html"><i class="bi bi-person me-2"></i>My Profile</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="index.html" id="logoutBtn"><i class="bi bi-box-arrow-right me-2"></i>Logout</a></li>
          </ul>
        </div>
      `;

      contactBtn.outerHTML = profileHTML;
      console.log("Profile dropdown created");
      
      // Setup dropdown functionality
      setupDropdown();
    } else {
      console.log("Contact button NOT found - checking if profile already exists");
      // Mungkin sudah login dan profile dropdown sudah ada
      setupDropdown();
    }
  }

  function setupDropdown() {
    const profileBtn = document.querySelector('.btn-profile');
    const dropdownMenu = document.getElementById('profileDropdownMenu');
    const logoutBtn = document.getElementById('logoutBtn');
    
    console.log("Setup Dropdown:");
    console.log("Profile button:", profileBtn);
    console.log("Dropdown menu:", dropdownMenu);
    console.log("Logout button:", logoutBtn);
    
    if (profileBtn && dropdownMenu) {
      profileBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log("Profile button clicked - toggling dropdown");
        dropdownMenu.classList.toggle('show');
      });
      
      // Close dropdown when clicking outside
      document.addEventListener('click', function() {
        console.log("Document clicked - closing dropdown");
        dropdownMenu.classList.remove('show');
      });
      
      // Prevent dropdown from closing when clicking inside it
      dropdownMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        console.log("Dropdown menu clicked");
      });
    }
    
    // Setup logout langsung
    if (logoutBtn) {
      logoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        console.log("Logout button clicked!");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userEmail");
        window.location.href = "index.html";
      });
    }
  }

  // === LOGOUT HANDLER TAMBAHAN ===
  document.addEventListener("click", function (e) {
    if (e.target.id === "logoutBtn") {
      e.preventDefault();
      console.log("Logout via document click handler");
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userEmail");
      window.location.href = "index.html";
    }
  });

});
  window.addEventListener("load", () => {
    const hero = document.querySelector(".hero-content");
    if (hero) {
      const heroText = hero.querySelectorAll("h1, p, a");
      heroText.forEach((el, i) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(40px)";
        setTimeout(() => {
          el.style.transition = "all 1s ease";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
        }, 400 * i);
      });
    }
  });

  document.addEventListener("scroll", () => {
    const sections = document.querySelectorAll(
      ".about, .program, .why-section, .update, .partners-section, .lokasi-section, .berita"
    );
    sections.forEach((el) => {
      const top = el.getBoundingClientRect().top;
      if (top < window.innerHeight - 100) {
        el.classList.add("visible");
      }
    });
  });

  window.addEventListener("scroll", () => {
    const leaves = document.querySelectorAll(".leaf");
    const scrollY = window.scrollY;
    leaves.forEach((leaf, i) => {
      const speed = (i + 1) * 0.25;
      const x = Math.sin(scrollY * 0.01 + i) * 20;
      const y = scrollY * speed * 0.2;
      leaf.style.transform = `translate(${x}px, ${y}px) rotate(${scrollY * 0.05}deg)`;
    });
  });

  const buttons = document.querySelectorAll('.sidebar button[data-target]');
    const sections = document.querySelectorAll('.content-section');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const target = btn.getAttribute('data-target');
        sections.forEach(sec => {
          sec.classList.remove('active');
          if (sec.id === target) sec.classList.add('active');
        });
      });
    });
    
    document.querySelector("form").addEventListener("submit", function(e) {
    e.preventDefault(); // cegah reload form

    // Simulasi login berhasil (bisa disesuaikan nanti)
    const email = document.querySelector('input[type="email"]').value;
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userEmail", email);

    // Redirect ke halaman utama
    window.location.href = "index.html";
  });

const section = document.querySelector('.impact-section');
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !started) {
            started = true;
            animateCounters();
            counters.forEach(c => c.classList.add('visible'));
          }
        });
      }, { threshold: 0.3 });

      observer.observe(section);

const counters = document.querySelectorAll('.counter');
      let started = false;

      function animateCounters() {
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const speed = 50;

          const updateCount = () => {
            const value = +counter.innerText.replace(/\D/g, '');
            const increment = target / 100;

            if (value < target) {
              counter.innerText = Math.ceil(value + increment);
              setTimeout(updateCount, speed);
            } else {
              counter.innerText = target.toLocaleString() + (counter.dataset.target >= 1000 ? '+' : '');
            }
          };

          updateCount();
        });
      }

          // Captcha sederhana
    document.getElementById("submitBtn").addEventListener("click", function(e) {
      e.preventDefault();
      const answer = document.getElementById("captchaAnswer").value;
      if (answer == 22) {
        alert("Terima kasih! Pesan Anda telah dikirim 🌱");
        document.querySelector(".contact-form").reset();
      } else {
        alert("Captcha salah! Coba lagi.");
      }
    });

    // Animasi masuk halus
    window.addEventListener("load", () => {
      document.querySelector(".contact-section").style.opacity = "0";
      setTimeout(() => {
        document.querySelector(".contact-section").style.transition = "all 1s ease";
        document.querySelector(".contact-section").style.opacity = "1";
      }, 300);
    });
/* ===== Safe Log ===== */
console.log('%cTreeVerse v2.0 Loaded 🌳', 'color:green;font-weight:bold;');
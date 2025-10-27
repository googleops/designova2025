// Ambil semua elemen yang diperlukan
const faqItems = document.querySelectorAll('.faq-item');
const searchInput = document.getElementById('searchInput');
const categoryBtns = document.querySelectorAll('.category-btn');
const faqSections = document.querySelectorAll('.faq-section');
const noResults = document.querySelector('.no-results');
const faqContainer = document.getElementById('faqContainer');

// Fungsi untuk toggle accordion FAQ
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Tutup semua FAQ items
        faqItems.forEach(i => i.classList.remove('active'));
        
        // Buka item yang diklik jika sebelumnya tertutup
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Fungsi untuk pencarian FAQ
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    let hasResults = false;

    // Loop through semua FAQ items
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
        
        // Cek apakah search term ada di question atau answer
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
            item.style.display = 'block';
            hasResults = true;
        } else {
            item.style.display = 'none';
        }
    });

    // Tampilkan atau sembunyikan section berdasarkan hasil pencarian
    faqSections.forEach(section => {
        const visibleItems = section.querySelectorAll('.faq-item[style="display: block"]');
        section.style.display = visibleItems.length > 0 ? 'block' : 'none';
    });

    // Tampilkan pesan "tidak ada hasil" jika tidak ada hasil
    if (hasResults) {
        noResults.classList.remove('show');
        faqContainer.style.display = 'block';
    } else {
        noResults.classList.add('show');
        faqContainer.style.display = 'none';
    }
});

// Fungsi untuk filter berdasarkan kategori
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Update active button
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Ambil kategori yang dipilih
        const category = btn.getAttribute('data-category');
        
        // Reset search input
        searchInput.value = '';

        // Filter FAQ sections berdasarkan kategori
        if (category === 'all') {
            faqSections.forEach(section => section.style.display = 'block');
            faqItems.forEach(item => item.style.display = 'block');
        } else {
            faqSections.forEach(section => {
                if (section.getAttribute('data-category') === category) {
                    section.style.display = 'block';
                } else {
                    section.style.display = 'none';
                }
            });
        }

        // Sembunyikan pesan "tidak ada hasil"
        noResults.classList.remove('show');
        faqContainer.style.display = 'block';
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
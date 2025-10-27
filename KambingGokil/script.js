const revealElements = document.querySelectorAll('.reveal');
window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el=>{
        const elementTop = el.getBoundingClientRect().top;
        if(elementTop < windowHeight - 100) el.classList.add('active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const burger = document.querySelector('.js-burger');
    const nav = document.querySelector('.js-nav');
    const overlay = document.querySelector('.js-overlay');
    const modal = document.querySelector('#modal-access');
    const openBtns = document.querySelectorAll('.js-open-modal');
    const closeBtns = document.querySelectorAll('.js-close-modal');
    const accessForm = document.querySelector('.form');
    const emailInput = document.querySelector('.form__input');

    if (!burger || !nav || !overlay || !modal) return;

    const toggleMenu = () => {
        const isActive = nav.classList.contains('is-active');
        burger.classList.toggle('is-active');
        nav.classList.toggle('is-active');
        overlay.classList.toggle('is-active');

        if (!isActive) {
            document.body.classList.add('no-scroll');
        } else if (!modal.classList.contains('is-open')) {
            document.body.classList.remove('no-scroll');
        }
    };

    burger.addEventListener('click', toggleMenu);

    overlay.addEventListener('click', () => {
        if (nav.classList.contains('is-active')) toggleMenu();
    });

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });

    const openModal = () => {
        if (nav.classList.contains('is-active')) toggleMenu();
        modal.classList.add('is-open');
        document.body.classList.add('no-scroll');
        if (emailInput) setTimeout(() => emailInput.focus(), 50);
    };

    const closeModal = () => {
        modal.classList.remove('is-open');
        if (emailInput) {
            emailInput.classList.remove('is-error');
        }
        if (!nav.classList.contains('is-active')) {
            document.body.classList.remove('no-scroll');
        }
    };

    openBtns.forEach(btn => btn.addEventListener('click', openModal));
    closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    if (accessForm && emailInput) {
        const isValidEmail = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

        accessForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const value = emailInput.value.trim();

            if (!isValidEmail(value)) {
                emailInput.classList.add('is-error');
                emailInput.focus();
            } else {
                emailInput.classList.remove('is-error');
                console.log('Success:', value);
                alert('Доступ получен!');
                closeModal();
            }
        });

        emailInput.addEventListener('input', () => {
            emailInput.classList.remove('is-error');
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (modal.classList.contains('is-open')) {
                closeModal();
            } else if (nav.classList.contains('is-active')) {
                toggleMenu();
            }
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && nav.classList.contains('is-active')) {
            burger.classList.remove('is-active');
            nav.classList.remove('is-active');
            overlay.classList.remove('is-active');
            if (!modal.classList.contains('is-open')) {
                document.body.classList.remove('no-scroll');
            }
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {

    // Countdown Timer
    const countdownDate = new Date("June 23, 2025 17:00:00").getTime();

    const timerInterval = setInterval(function() {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById("days").textContent = String(days).padStart(2, '0');
        document.getElementById("hours").textContent = String(hours).padStart(2, '0');
        document.getElementById("minutes").textContent = String(minutes).padStart(2, '0');
        document.getElementById("seconds").textContent = String(seconds).padStart(2, '0');

        if (distance < 0) {
            clearInterval(timerInterval);
            document.getElementById("countdown-timer").innerHTML = "<p>L'atelier a commencé !</p>";
             const countdownSection = document.getElementById("countdown-section");
            if(countdownSection) {
                countdownSection.querySelector("h2").textContent = "🚀 L'atelier est lancé !";
            }
        }
    }, 1000);

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    // EmailJS Form Submission
    const registrationForm = document.getElementById('registration-form');
    const formMessage = document.getElementById('form-message');
    const submitButton = document.getElementById('submit-button');

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault();
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi en cours...';
            formMessage.textContent = '';
            formMessage.className = ''; // Clear previous classes

            emailjs.sendForm('service_g6qpvd7', 'template_mideessi_work', this)
                .then(function(response) {
                    formMessage.textContent = 'Merci ! Votre inscription a été envoyée avec succès.';
                    formMessage.className = 'success-message';
                    registrationForm.reset();
                    submitButton.disabled = false;
                    submitButton.textContent = 'Je m’inscris';
                }, function(error) {
                    formMessage.textContent = 'Oops ! Une erreur s\'est produite. Veuillez vérifier vos informations et réessayer. Détail: ' + JSON.stringify(error);
                    formMessage.className = 'error-message';
                    submitButton.disabled = false;
                    submitButton.textContent = 'Je m’inscris';
                });
        });
    }

    // Footer: Current Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

});


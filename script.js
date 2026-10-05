    const menuButton = document.querySelector('.menu-toggle');
    const navigation = document.querySelector('.nav-links');

    menuButton.addEventListener('click', () => {
      const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', String(!isOpen));
      menuButton.setAttribute('aria-label', isOpen ? 'მენიუს გახსნა' : 'მენიუს დახურვა');
      navigation.classList.toggle('is-open', !isOpen);
    });

    navigation.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navigation.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.setAttribute('aria-label', 'მენიუს გახსნა');
      });
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
    document.querySelector('#year').textContent = new Date().getFullYear();

    document.querySelector('#contact-form').addEventListener('submit', (event) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const subject = encodeURIComponent(`პროექტის შესახებ — ${formData.get('name')}`);
      const body = encodeURIComponent(`${formData.get('message')}\n\nსაკონტაქტო ელფოსტა: ${formData.get('email')}`);
      document.querySelector('#form-note').textContent = 'თქვენი ელფოსტის აპლიკაცია გაიხსნება შეტყობინების გასაგზავნად.';
      window.location.href = `mailto:hello@sivrce.studio?subject=${subject}&body=${body}`;
    });

const body = document.querySelector('body');
const navLinks = document.querySelectorAll(".nav__link");
const modal = document.querySelector(".modal");
const modalChildren = document.querySelector(".modal__children");
const closeModalBtn = document.querySelector(".modal__close");
const videoBtn = document.querySelector('.video__btn');
const team = document.querySelectorAll('.employee');
const sectionHeader = document.getElementById('ico');
const sectionTeam = document.getElementById('team');
const sectionContact = document.getElementById('contact');
const halfWindowHeight = window.innerHeight * 0.5;
const slider = document.querySelector('.team__slider');
const dots = document.querySelectorAll('.slider__dot');
const offsetModifier = -70;

const activateDot1 = () => {
    dots[1].classList.remove('slider__dot--active');
    dots[0].classList.add('slider__dot--active');
}

const activateDot2 = () => {
    dots[0].classList.remove('slider__dot--active');
    dots[1].classList.add('slider__dot--active');
}

const openModal = () => {
    modal.classList.add('modal--active');
    body.style.overflow = 'hidden';
};

const closeModal = () => {
    modal.classList.remove('modal--active');
    body.style.overflow = 'visible';
    modalChildren.innerHTML = '';
}

const action = () => {
    document.querySelectorAll('a[href^="#"]').forEach(navLink => {
        navLink.addEventListener('click', function (e) {
          e.preventDefault();

            const activeLink = document.querySelector('.nav__link--active')
            const targetElement = document.querySelector(this.getAttribute('href'));
            const calculatedOffset = targetElement.offsetTop + offsetModifier;

            activeLink.classList.remove('nav__link--active');
            navLink.classList.add('nav__link--active');

            window.scrollTo({
                top: calculatedOffset,
                behavior: 'smooth'
            });
        });
    });

    window.addEventListener('scroll', () => {
        const scrollWindow = window.scrollY;
        const activeLink = document.querySelector('.nav__link--active')
    
        if(scrollWindow < sectionHeader.offsetHeight - halfWindowHeight && !navLinks[0].classList.contains('nav__link--active')) {
            activeLink.classList.remove('nav__link--active');
            navLinks[0].classList.add('nav__link--active');
        } else if (scrollWindow >= sectionTeam.offsetTop - halfWindowHeight && scrollWindow < sectionContact.offsetTop - halfWindowHeight && !navLinks[1].classList.contains('nav__link--active')) {
            activeLink.classList.remove('nav__link--active');
            navLinks[1].classList.add('nav__link--active');
        } else if (scrollWindow >= sectionContact.offsetTop - halfWindowHeight  && !navLinks[2].classList.contains('nav__link--active')){
            activeLink.classList.remove('nav__link--active');
            navLinks[2].classList.add('nav__link--active');
        };
    });

    videoBtn.addEventListener('click', () => {
        modalChildren.innerHTML += '<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/BHACKCNDMW8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'
        
        openModal();
    });

    for(let employee of team) {
        employee.addEventListener('click', () => {
            const name = document.createElement("h1");
            const position = document.createElement("h4");
            const description = document.createElement("p");
    
            name.classList.add('modal__name');
            position.classList.add('modal__position');
            description.classList.add('modal__description');
    
            name.innerHTML = employee.children[1].textContent;
            position.innerHTML = employee.children[2].textContent;
            description.innerHTML = employee.children[4].textContent;
    
            modalChildren.appendChild(name);
            modalChildren.appendChild(position);
            modalChildren.appendChild(description);

            openModal();
        });
    };

    slider.addEventListener('scroll', () => {
        setTimeout(() => {
            if(slider.scrollLeft === 0 ) {
                activateDot1();
            } else if (slider.scrollLeft >= 10 ) {
                activateDot2();
            };
            }, 500)
        });
        
    dots[0].addEventListener('click', () => {
        slider.scrollLeft = '0';
        activateDot1();
    });
    
    dots[1].addEventListener('click', () => {
        slider.scrollLeft = '350';
        activateDot2();
    });

    closeModalBtn.addEventListener('click', () => {
        closeModal();
    });

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeModal();
        }
    })
};

action();
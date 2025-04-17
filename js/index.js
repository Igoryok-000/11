
document.addEventListener('DOMContentLoaded', function() {


  const preloader = document.querySelector('.preloader');
  if (preloader) {

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('loaded');
      }, 800);
    });
    

    setTimeout(() => {
      preloader.classList.add('loaded');
    }, 2500);
  }


  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false, 
    mirror: true,

    disable: window.innerWidth < 768 ? 'phone' : false
  });


  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {

        target.scrollIntoView({
          behavior: 'smooth'
        });
        

        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        if (menuToggle && menuToggle.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      }
    });
  });
  

  const backToTopButton = document.querySelector('.back-to-top');
  if (backToTopButton) {

    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    });
    

    backToTopButton.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  

  initCounters();
  

  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  
  if(menuToggle && navMenu) {

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      

      if (menuToggle.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
    

    const navButtons = navMenu.querySelectorAll('button');
    navButtons.forEach(button => {
      button.addEventListener('click', () => {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
    

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(e.target) && 
          !menuToggle.contains(e.target)) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  

  window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  

  const homeSection = document.querySelector('.home-section');
  const homeImg = document.querySelector('.home-img');
  
  if (homeSection && homeImg) {

    if (window.innerWidth > 768) {
      homeSection.addEventListener('mousemove', (e) => {
        const xPos = (e.clientX / window.innerWidth - 0.5) * 20;
        const yPos = (e.clientY / window.innerHeight - 0.5) * 20;
        
        homeImg.style.transform = `translate(${xPos}px, ${yPos}px)`;
      });
    } else {

      window.addEventListener('scroll', () => {
        const scrollPos = window.scrollY;
        if (scrollPos < window.innerHeight) {
          homeImg.style.transform = `translateY(${scrollPos * 0.1}px)`;
        }
      });
    }
  }
  

  animateTimeline();
});


function initCounters() {
  const factNumbers = document.querySelectorAll('.fact-number');
  
  if (factNumbers.length > 0) {
    factNumbers.forEach(counter => {
      const target = parseInt(counter.textContent);
      counter.textContent = '0';
      

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            let count = 0;
            const increment = Math.ceil(target / 50);
            
            const timer = setInterval(() => {
              count += increment;
              if (count >= target) {
                counter.textContent = target;
                clearInterval(timer);
              } else {
                counter.textContent = count;
              }
            }, 30);
            
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(counter);
    });
  }
}


function animateTimeline() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (timelineItems.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    
    timelineItems.forEach(item => {
      observer.observe(item);
    });
  }
}


function handleCategorySelected(event) {

  const button = event.target;
  if (button && typeof button.style !== 'undefined') {
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
      button.style.transform = '';
    }, 200);
  }


  let currentCategory;
  
  if (event.target && event.target.id) {

    currentCategory = event.target.id; 
  } else if (event.target && event.target.id === '') {

    currentCategory = 'category1';
  } else if (event.id) {

    currentCategory = event.id;
  }
  

  if (!currentCategory) {
    currentCategory = 'category0';
    console.warn('Категория не определена, используется значение по умолчанию.');
  }
  

  const navButtons = document.querySelectorAll('.nav-menu button');
  navButtons.forEach(btn => {
    if (btn.id === currentCategory) {
      btn.classList.add('active-nav');
    } else {
      btn.classList.remove('active-nav');
    }
  });
  

  const elements = document.getElementsByClassName('content');
  let selected = null;
  
  for(let el of elements) {
    el.classList.remove('active');
    
    if(el.classList.toString().indexOf(currentCategory) !== -1) {
      selected = el;
    }
  }
  

  if(selected) {
    selected.classList.add('active');
    

    window.scrollTo({ top: 0, behavior: 'smooth' });
    

    selected.style.opacity = '0';
    selected.style.transform = 'translateY(20px)';
    

    requestAnimationFrame(() => {
      setTimeout(() => {
        selected.style.opacity = '1';
        selected.style.transform = 'translateY(0)';
        

        if (typeof AOS !== 'undefined') {
          AOS.refresh();
        }
      }, 50);
    });
  }
}


const slider = document.querySelector('.slider');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

if (slider) {
  const slides = Array.from(slider.querySelectorAll('img'));
  const slideCount = slides.length;
  let slideIndex = 0;
  

  prevButton?.addEventListener('click', showPreviousSlide);
  nextButton?.addEventListener('click', showNextSlide);
  

  function showPreviousSlide() {
    slideIndex = (slideIndex - 1 + slideCount) % slideCount;
    updateSlider(true);
  }
  

  function showNextSlide() {
    slideIndex = (slideIndex + 1) % slideCount;
    updateSlider(false);
  } 
  

  function updateSlider(isPrev) {
    slides.forEach((slide, index) => {
      if (index === slideIndex) {
        slide.style.display = 'block';
        slide.style.transform = isPrev ? 'translateX(-50px) scale(1.1)' : 'translateX(50px) scale(1.1)';
        setTimeout(() => {
          slide.style.transform = 'translateX(0) scale(1)';
        }, 50);
      } else {
        slide.style.display = 'none';
      }
    });
  }

  let slideInterval = setInterval(showNextSlide, 5000);
  

  const sliderContainer = document.querySelector('.slider-container');
  if (sliderContainer) {
    sliderContainer.addEventListener('mouseenter', () => {
      clearInterval(slideInterval);
    });
    
    sliderContainer.addEventListener('mouseleave', () => {
      slideInterval = setInterval(showNextSlide, 5000);
    });
    

    sliderContainer.addEventListener('touchstart', () => {
      clearInterval(slideInterval);
    }, { passive: true });
    
    sliderContainer.addEventListener('touchend', () => {
      slideInterval = setInterval(showNextSlide, 5000);
    }, { passive: true });
  }
  

  if (slides.length > 0) {
    updateSlider();
  }
  
  let touchStartX = 0;
  let touchEndX = 0;
  
  slider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true }); 
  
  slider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50; 
    
    if (touchEndX < touchStartX - swipeThreshold) {

      showNextSlide();
    } else if (touchEndX > touchStartX + swipeThreshold) {

      showPreviousSlide();
    }
  }
}


const galleryItems = document.querySelectorAll('.gallery-item');
if (galleryItems.length > 0) {
  galleryItems.forEach((item, index) => {

    item.style.animationDelay = `${index * 0.1}s`;
    

    item.addEventListener('click', () => {
      const imgSrc = item.querySelector('img').src;
      showLightbox(imgSrc);
    });
  });
}


function showLightbox(imgSrc) {

  const lightbox = document.createElement('div');
  lightbox.classList.add('lightbox');
  
  const img = document.createElement('img');
  img.src = imgSrc;
  img.alt = 'Увеличенное изображение';
  
  const closeButton = document.createElement('span');
  closeButton.classList.add('lightbox-close');
  closeButton.innerHTML = '&times;';
  closeButton.setAttribute('aria-label', 'Закрыть');
  

  document.body.style.overflow = 'hidden';
  
  lightbox.appendChild(img);
  lightbox.appendChild(closeButton);
  document.body.appendChild(lightbox);
  

  setTimeout(() => {
    lightbox.classList.add('active');
  }, 10);
  

  closeButton.addEventListener('click', closeLightbox);
  

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
    }
  });
  

  function closeLightbox() {
    lightbox.classList.remove('active');
    setTimeout(() => {
      document.body.removeChild(lightbox);
      document.body.style.overflow = '';
    }, 300);
  }
}


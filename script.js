document.addEventListener('DOMContentLoaded', function() {

  //sticky header
  window.addEventListener('scroll', (event) => {
    
    if (window.scrollY > 0) {
      document.querySelector('.header').classList.add('header--sticky', 'header--gray')
    } else {
      document.querySelector('.header').classList.remove('header--sticky', 'header--gray');
    }

    // Update the active section in the header
    // updateActiveSection();
  });

  document.querySelector('.projects__list').addEventListener('click', (event) => {
    // Prevents the event from bubbling up
    event.stopPropagation();
    let clickedLinkBtn = false;
   
    // // Checks if the clicked element is a button
    if (event.target && event.target.classList.contains('button')) {
      clickedLinkBtn = true
    }

    if (!clickedLinkBtn){
      // Finds the closest .projects__item ancestor to the clicked button
      const projectItem = event.target.closest('.projects__item');
  
      // If the .projects__item element is found, proceed
      if (projectItem) {
          // Finds the .card element inside the .projects__item
          const card = projectItem.querySelector('.card');
  
          // Toggles a class to rotate the card 180 degrees
          card.classList.toggle('flipped');
      }
    }  
});

const menuButton = document.querySelector(".menu-button");
const navbar = document.querySelector(".navbar");
const body = document.body;

let blurNavbar = false
let scrollPosition = 0

menuButton.addEventListener("click", () => {
  console.log("se ejecuto el evento click")

  if (blurNavbar){
    blurNavbar = false
    return
  }
  
  // Open navbar and change menu buttton
  scrollPosition = window.scrollY || window.pageYOffSet
  body.classList.add('body--no-scroll');
  navbar.classList.add("active")
  menuButton.classList.add("active")
  body.style.top = `-${scrollPosition}px`;
  navbar.focus()
});

navbar.addEventListener('blur', (event) => {
  console.log("se ejecuto el evento blur")
  navbar.classList.remove('active');
  menuButton.classList.remove("active")
  body.classList.remove('body--no-scroll');
  body.style.top = ''
  window.scrollTo(0, scrollPosition); // Restore scroll position
  

  blurNavbar = true
});

navbar.setAttribute('tabindex', '0'); // Make it focusable
  
//Initial content revealing js
ScrollReveal({
  distance: "100px",
  duration: 2000,
  delay: 200
});

ScrollReveal().reveal(".profile__picture, .about__container, .education__content", {
  origin: "left"
});
ScrollReveal().reveal(".header ul, .profile__intro, .about__skills, .internship__content", {
  origin: "right"
});
ScrollReveal().reveal(".projects__item .h4, .contact .h2", {
  origin: "top"
});
ScrollReveal().reveal(".projects__list, .contact", {
  origin: "bottom"
});

//contact form
const form = document.getElementById("contactForm")

form.addEventListener('submit', function(e) {
  const formData = new FormData(form);
  e.preventDefault();

  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    if (response.status == 200) {
        Swal.fire({
          title: 'Your email has been sent!',
          icon: 'success',
          confirmButtonText: 'Continue'
        })
    } else {
        console.log(response);
    }
  })
  .catch(error => {
    Swal.fire({
      title: 'Failed to send email',
      icon: 'error',
      confirmButtonText: 'Continue'
    })
  })
});
  
  // function updateActiveSection() {
  //   var scrollPosition = $(window).scrollTop();
  
  //   // Checking if scroll position is at the top of the page
  //   if (scrollPosition === 0) {
  //     $(".header ul li a").removeClass("active");
  //     $(".header ul li a[href='#home']").addClass("active");
  //     return;
  //   }
  
  //   // Iterate through each section and update the active class in the header
  //   $("section").each(function() {
  //     var target = $(this).attr("id");
  //     var offset = $(this).offset().top;
  //     var height = $(this).outerHeight();
  
  //     if (
  //       scrollPosition >= offset - 40 &&
  //       scrollPosition < offset + height - 40
  //     ) {
  //       $(".header ul li a").removeClass("active");
  //       $(".header ul li a[href='#" + target + "']").addClass("active");
  //     }
  //   });
  // }
})
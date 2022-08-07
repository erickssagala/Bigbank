
{
  let navbar = document.querySelector('.navbar');
  let loginForm = document.querySelector('.login-form');
  let messageP = document.getElementById('message-p');


  document.getElementById('login-btn').onclick = () =>{
      loginForm.classList.toggle('active');
      navbar.classList.remove('active');
  }

  document.getElementById('btn-login').onclick = () =>{
    loginForm.classList.toggle('active');
    navbar.classList.remove('active');
  }



  document.querySelector('#menu-btn').onclick = () =>{
      navbar.classList.toggle('active');
      loginForm.classList.remove('active');
  }


  window.onscroll = () =>{
      loginForm.classList.remove('active');
      navbar.classList.remove('active');
  }


  var swiper = new Swiper(".review-slider", {
      loop:true,
      spaceBetween: 20,
      autoplay: {
          delay: 7500,
          disableOnInteraction: false,
      },
      centeredSlides: true,
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        1020: {
          slidesPerView: 3,
        },
      },
  });












}

 // 
const swiper = new Swiper('.swiper', {
    // Autoplay på billederne ( ikke Vladimir)
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },

    loop: true,
  
    // Giver de runde prikker i bunden af slideren
    pagination: {
      el: '.swiper-pagination',
    // gør at du kan klikke på knapperne(Ikke Vladimir)
      clickable: true,
    },
  
    // Navigation arrows
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  
  });
  console.log(swiper)
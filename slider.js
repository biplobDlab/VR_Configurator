let slideIndex = 1;
showSlides(slideIndex);
function plusSlides(n) {
    showSlides(slideIndex += n);
}
function currentSlide(n) {
    showSlides(slideIndex = n);
}
function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > 2 && n <= slides.length) {
   
    }
    else if (n < 3 && n >= 1) {
 
    }
    if (n > slides.length) {
        slideIndex = 1;

    }
    if (n < 1) {
        slideIndex = slides.length;

    }
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.add("hide");
    }
    slides[slideIndex - 1].classList.remove("hide");
}
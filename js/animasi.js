
/* =========================================
   SCROLL PROGRESS
========================================= */

const scrollProgress = document.getElementById("scrollProgress");

window.addEventListener("scroll", function () {

    const scrollTop = window.scrollY;

    const scrollHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        scrollHeight > 0
        ? (scrollTop / scrollHeight) * 100
        : 0;

    scrollProgress.style.width = progress + "%";

});


// =====================================
// MOBILE NAVBAR
// =====================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", function () {

    navMenu.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.classList.replace("fa-bars", "fa-xmark");
    } else {
        icon.classList.replace("fa-xmark", "fa-bars");
    }

});

// Tutup menu setelah memilih link
document.querySelectorAll(".nav-menu a").forEach(link => {

    link.addEventListener("click", function () {

        navMenu.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.replace("fa-xmark", "fa-bars");

    });

});


// =====================================
// NAVBAR ACTIVE LINK
// =====================================

const navLinks = document.querySelectorAll(".nav-menu a");

window.addEventListener("scroll", function () {

    let current = "";

    document.querySelectorAll("section[id]").forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }

    });

});


// =====================================
// GALLERY LIGHTBOX
// =====================================

const galleryItems = document.querySelectorAll(".gallery-item img");

const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");

const lightboxClose = document.getElementById("lightboxClose");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;

const galleryImages = Array.from(galleryItems).map(img => img.src);


function showGalleryImage(index) {

    currentImageIndex =
        (index + galleryImages.length) % galleryImages.length;

    lightboxImage.src = galleryImages[currentImageIndex];

}


// Klik gambar gallery
galleryItems.forEach((img, index) => {

    img.parentElement.addEventListener("click", function () {

        currentImageIndex = index;

        showGalleryImage(currentImageIndex);

        lightbox.classList.add("active");

        document.body.style.overflow = "hidden";

    });

});


// Tutup lightbox
function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

}

lightboxClose.addEventListener("click", closeLightbox);


// Gambar sebelumnya
lightboxPrev.addEventListener("click", function () {

    showGalleryImage(currentImageIndex - 1);

});


// Gambar selanjutnya
lightboxNext.addEventListener("click", function () {

    showGalleryImage(currentImageIndex + 1);

});


// Klik area hitam untuk menutup
lightbox.addEventListener("click", function (e) {

    if (e.target === lightbox) {
        closeLightbox();
    }

});


// Keyboard navigation
document.addEventListener("keydown", function (e) {

    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") {
        closeLightbox();
    }

    if (e.key === "ArrowLeft") {
        showGalleryImage(currentImageIndex - 1);
    }

    if (e.key === "ArrowRight") {
        showGalleryImage(currentImageIndex + 1);
    }

});


// =====================================
// TESTIMONIAL AUTO SLIDE
// =====================================

const testimonialTrack =
    document.getElementById("testimonialTrack");

const testimonialCards =
    document.querySelectorAll(".testimonial-card");

const testimonialDots =
    document.getElementById("testimonialDots");

let testimonialIndex = 0;

let testimonialTimer;

const totalTestimonials = testimonialCards.length;


// Membuat dots otomatis
testimonialCards.forEach((card, index) => {

    const dot = document.createElement("button");

    dot.setAttribute("aria-label", "Testimoni " + (index + 1));

    if (index === 0) {
        dot.classList.add("active");
    }

    dot.addEventListener("click", function () {

        testimonialIndex = index;

        updateTestimonial();

        restartTestimonial();

    });

    testimonialDots.appendChild(dot);

});


const dots = testimonialDots.querySelectorAll("button");


function updateTestimonial() {

    testimonialTrack.style.transform =
        `translateX(-${testimonialIndex * 100}%)`;

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === testimonialIndex
        );

    });

}


function nextTestimonial() {

    testimonialIndex++;

    if (testimonialIndex >= totalTestimonials) {
        testimonialIndex = 0;
    }

    updateTestimonial();

}


function startTestimonial() {

    testimonialTimer = setInterval(nextTestimonial, 4500);

}


function restartTestimonial() {

    clearInterval(testimonialTimer);

    startTestimonial();

}


startTestimonial();


// Pause saat mouse berada di atas testimoni
testimonialTrack.addEventListener("mouseenter", function () {

    clearInterval(testimonialTimer);

});

testimonialTrack.addEventListener("mouseleave", function () {

    startTestimonial();

});


// =====================================
// REVEAL ANIMATION
// =====================================

const revealElements = document.querySelectorAll(
    ".service-card, .package-card, .gallery-item, .why-content, .why-image, .intro-section, .contact-box, .testimonial-container"
);

revealElements.forEach(element => {
    element.style.opacity = "0";
    element.style.transform = "translateY(30px)";
    element.style.transition = "opacity .7s ease, transform .7s ease";
});

const revealObserver = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";

            revealObserver.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.12
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});


// =====================================
// HERO CONTENT ANIMATION
// =====================================

window.addEventListener("load", function () {

    const heroContent = document.querySelector(".hero-content");

    heroContent.animate(
        [
            {
                opacity: 0,
                transform: "translateY(35px)"
            },
            {
                opacity: 1,
                transform: "translateY(0)"
            }
        ],
        {
            duration: 1000,
            easing: "ease-out",
            fill: "forwards"
        }
    );

});

// gsap.registerPlugin(ScrollTrigger);

// // Parallax layer movement
// gsap.to(".layer.clouds", {
//   yPercent: 40,
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".hero",
//     start: "top top",
//     end: "bottom bottom",
//     scrub: true,
//   },
// });

// gsap.to(".layer.mountain", {
//   yPercent: 20,
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".hero",
//     start: "top top",
//     end: "bottom bottom",
//     scrub: true,
//   },
// });

// gsap.to(".layer.rocks", {
//   yPercent: 60,
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".hero",
//     start: "top top",
//     end: "bottom bottom",
//     scrub: true,
//   },
// });

// // Text stays centered (sticky illusion)
// gsap.to(".branding-text h1", {
//   scale: 1.05,
//   ease: "none",
//   scrollTrigger: {
//     trigger: ".hero",
//     start: "top top",
//     end: "bottom top",
//     scrub: true,
//   },
// });

// // Fade out text when rocks appear (like “buried under”)
// ScrollTrigger.create({
//   trigger: ".layer.rocks",
//   start: "top 70%",  // batu mulai nutup
//   end: "top 40%",    // teks ketutupan penuh
//   scrub: true,
//   onEnter: () => gsap.to(".branding-text h1", { opacity: 0, duration: 0.8, ease: "power2.out" }),
//   onLeaveBack: () => gsap.to(".branding-text h1", { opacity: 1, duration: 0.8, ease: "power2.out" }),
// });

window.addEventListener('scroll', () => {
  const brandingText = document.getElementById('brandingText');
  const rocks = document.getElementById('rocks');
  const rocksTop = rocks.getBoundingClientRect().top;

  if (rocksTop <= 100) {
    brandingText.style.position = 'absolute';
    brandingText.style.top = `${window.scrollY + 100}px`;
    brandingText.style.position = 'fixed';
    brandingText.style.top = '100px';
  }
});

gsap.registerPlugin(ScrollTrigger);

gsap.to(".tomodachi .about-text", {
  scrollTrigger: {
    trigger: ".tomodachi",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power2.out"
});

gsap.to(".tomodachi .mission", {
  scrollTrigger: {
    trigger: ".tomodachi",
    start: "top 75%",
    toggleActions: "play none none none"
  },
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.3,
  ease: "power2.out"
});

gsap.registerPlugin(ScrollTrigger);

gsap.to(".merchant .buy", {
  scrollTrigger: {
    trigger: ".merchant",
    start: "top 80%",
    toggleActions: "play none none none"
  },
  opacity: 1,
  y: 0,
  duration: 1,
  ease: "power2.out"
});
const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("loaded"),650));

const menu=document.querySelector(".menu"), nav=document.querySelector("nav");
menu?.addEventListener("click",()=>{nav.style.display=nav.style.display==="flex"?"none":"flex";nav.style.position="absolute";nav.style.top="74px";nav.style.left="0";nav.style.right="0";nav.style.padding="20px";nav.style.background="#080b0e";nav.style.flexDirection="column";nav.style.alignItems="flex-start";nav.style.borderBottom="1px solid #1f2a32";});

const dot=document.querySelector(".cursor-dot"),ring=document.querySelector(".cursor-ring");
window.addEventListener("mousemove",e=>{if(dot){dot.style.left=e.clientX+"px";dot.style.top=e.clientY+"px"}if(ring){ring.animate({left:e.clientX+"px",top:e.clientY+"px"},{duration:250,fill:"forwards"})}});
document.querySelectorAll("a,.project,.tool-card,.portrait-frame").forEach(el=>{
  el.addEventListener("mouseenter",()=>ring?.classList.add("hover"));
  el.addEventListener("mouseleave",()=>ring?.classList.remove("hover"));
});

const reveals=document.querySelectorAll(".section,.project,.tool-card,.timeline-item,.achievement-grid>div");
const io=new IntersectionObserver(entries=>entries.forEach(e=>{
  if(e.isIntersecting){e.target.style.opacity="1";e.target.style.transform="translateY(0)";io.unobserve(e.target)}
}),{threshold:.08});
reveals.forEach(el=>{el.style.opacity="0";el.style.transform="translateY(24px)";el.style.transition="opacity .8s ease, transform .8s ease";io.observe(el)});

document.querySelectorAll("a[href^='#']").forEach(a=>a.addEventListener("click",()=>{if(window.innerWidth<=900)nav.style.display="none"}));


// Cross-fade the two profile photos in the About / Profile card.
(function initProfileSlideshow(){
  const gallery=document.querySelector('.profile-photo-slideshow');
  if(!gallery) return;
  const slides=Array.from(gallery.querySelectorAll('.profile-slide'));
  if(slides.length<2) return;
  const reducedMotion=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let current=0;
  slides.forEach((slide,index)=>{
    slide.classList.toggle('is-active',index===0);
    slide.setAttribute('aria-hidden',index===0?'false':'true');
  });
  if(reducedMotion) return;
  window.setInterval(()=>{
    slides[current].classList.remove('is-active');
    slides[current].setAttribute('aria-hidden','true');
    current=(current+1)%slides.length;
    slides[current].classList.add('is-active');
    slides[current].setAttribute('aria-hidden','false');
  },3600);
})();

// Automatically cross-fade each project's two images, and rotate BAJA images.
// Each gallery advances independently after the page is opened.
(function initAutoSlideshows(){
  const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const galleries = [
    ...document.querySelectorAll('.project-media.dual'),
    ...document.querySelectorAll('.vehicle-gallery')
  ];
  galleries.forEach((gallery, galleryIndex) => {
    const slides = Array.from(gallery.querySelectorAll('figure'));
    if (slides.length < 2) return;
    gallery.classList.add('auto-slideshow');
    let current = 0;
    slides.forEach((slide, index) => {
      slide.classList.toggle('is-active', index === 0);
      slide.setAttribute('aria-hidden', index === 0 ? 'false' : 'true');
    });
    if (reducedMotion) return;
    // Stagger galleries slightly so every project does not change at once.
    window.setTimeout(() => {
      window.setInterval(() => {
        slides[current].classList.remove('is-active');
        slides[current].setAttribute('aria-hidden', 'true');
        current = (current + 1) % slides.length;
        slides[current].classList.add('is-active');
        slides[current].setAttribute('aria-hidden', 'false');
      }, 3200);
    }, galleryIndex * 180);
  });
})();

const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

$("#year").textContent = new Date().getFullYear();

$("#drop-trigger").addEventListener("click", () => {
  $("#the-drop").scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth"});
});

const progress = $("#progress-bar");
const updateProgress = () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  progress.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
};
addEventListener("scroll", updateProgress, {passive:true});
updateProgress();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:.12});
$$(".drop-copy, .route-card, .project").forEach(el => {
  if(el.classList.contains("drop-copy")) el.classList.add("reveal");
  revealObserver.observe(el);
});

// Build the Pirohaa image gallery from the assets shipped in this project.
// Add more files to public/assets/pirohaa and register them here.
const pirohaaAssets = [
  "pirohaa-01.jpg","pirohaa-02.jpg","pirohaa-03.jpg","pirohaa-04.jpg",
  "pirohaa-05.jpg","pirohaa-06.jpg","pirohaa-07.jpg","pirohaa-08.jpg",
  "pirohaa-09.jpg","pirohaa-10.jpg","pirohaa-11.jpg","pirohaa-12.jpg",
  "pirohaa-13.jpg","pirohaa-14.jpg","pirohaa-15.jpg","pirohaa-16.jpg",
  "pirohaa-17.jpg","pirohaa-18.jpg","pirohaa-19.jpg","pirohaa-20.jpg",
  "pirohaa-21.jpg","pirohaa-22.jpg","pirohaa-23.jpg","pirohaa-24.jpg"
];
const gallery = $("#pirohaa-gallery");
const supported = pirohaaAssets.filter(name => {
  // Actual extracted files may use png/jpeg/webp extensions; source is listed below dynamically.
  return false;
});
fetch("/api/assets/pirohaa")
  .then(r => r.ok ? r.json() : [])
  .then(files => {
    if(!files.length) return;
    gallery.innerHTML = "";
    files.forEach((file, index) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = `/assets/pirohaa/${encodeURIComponent(file)}`;
      img.alt = `Pirohaa Jewellery campaign visual ${index + 1}`;
      img.loading = "lazy";
      figure.append(img);
      gallery.append(figure);
    });
    bindLightbox();
  }).catch(() => {});

const lightbox = $("#lightbox");
function bindLightbox(){
  $$(".tilt img, #pirohaa-gallery img").forEach(img => {
    img.addEventListener("click", () => {
      $("#lightbox img").src = img.src;
      $("#lightbox img").alt = img.alt;
      lightbox.classList.add("open");
      lightbox.setAttribute("aria-hidden","false");
      $("#lightbox-close").focus();
    });
  });
}
bindLightbox();
function closeLightbox(){
  lightbox.classList.remove("open");
  lightbox.setAttribute("aria-hidden","true");
}
$("#lightbox-close").addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => { if(e.target === lightbox) closeLightbox(); });
addEventListener("keydown", e => { if(e.key === "Escape") closeLightbox(); });

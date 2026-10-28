const slides = [...document.querySelectorAll('.slide')];
const categories = ['painting', 'sculpture', 'videophotography'];
const names = {painting: 'Painting', sculpture: 'Sculpture', videophotography: 'Video/Photography'};
const positions = {painting: 0, sculpture: 0, videophotography: 0};
const viewer = document.querySelector('#viewer');
const previous = document.querySelector('#previous');
const next = document.querySelector('#next');
let category = 'painting';
const categorySlides = () => slides.filter(slide => slide.dataset.category === category);
function render(announce = true) {
  const list = categorySlides();
  const index = positions[category];
  slides.forEach(slide => { slide.hidden = slide !== list[index]; });
  const image = list[index].querySelector('img');
  if (image) image.loading = 'eager';
  // Preload just the next work rather than downloading the entire collection.
  const nextImage = list[index + 1]?.querySelector('img');
  if (nextImage) nextImage.loading = 'eager';
  document.querySelector('#counter').textContent = `${String(index + 1).padStart(2, '0')} / ${String(list.length).padStart(2, '0')}`;
  previous.disabled = index === 0;
  next.disabled = index === list.length - 1;
  viewer.setAttribute('aria-label', names[category]);
  document.querySelectorAll('[data-category]').forEach(link => {
    if (link.tagName !== 'A') return;
    if (link.dataset.category === category) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  if (announce) document.querySelector('#announcement').textContent = `${names[category]}, ${index + 1} of ${list.length}: ${list[index].getAttribute('aria-label')}`;
}
function changeCategory() {
  const hash = location.hash.slice(1);
  category = categories.includes(hash) ? hash : 'painting';
  render();
}
function move(direction) {
  const proposed = positions[category] + direction;
  if (proposed < 0 || proposed >= categorySlides().length) return;
  positions[category] = proposed;
  render();
}
previous.addEventListener('click', () => move(-1));
next.addEventListener('click', () => move(1));
window.addEventListener('hashchange', changeCategory);
document.addEventListener('keydown', event => {
  if (event.altKey || event.ctrlKey || event.metaKey || /INPUT|TEXTAREA|SELECT/.test(event.target.tagName)) return;
  if (event.key === 'ArrowLeft') { event.preventDefault(); move(-1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); move(1); }
});
let touchStart = null;
viewer.addEventListener('touchstart', event => {
  if (event.touches.length !== 1) { touchStart = null; return; }
  touchStart = {x: event.touches[0].clientX, y: event.touches[0].clientY};
}, {passive: true});
viewer.addEventListener('touchend', event => {
  if (!touchStart) return;
  const dx = event.changedTouches[0].clientX - touchStart.x;
  const dy = event.changedTouches[0].clientY - touchStart.y;
  if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) move(dx < 0 ? 1 : -1);
  touchStart = null;
}, {passive: true});
viewer.addEventListener('touchcancel', () => { touchStart = null; }, {passive: true});
changeCategory();
document.querySelector('#year').textContent = new Date().getFullYear();

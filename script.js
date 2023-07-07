const collapseBtn = document.getElementById('collapseBtn');
const nav = document.querySelector('nav');
const content = document.querySelector('.content');

collapseBtn.addEventListener('click', function() {
  const navDisplayStyle = window.getComputedStyle(nav).display;
  const screenWidth = window.innerWidth;
  const isSmallScreen = screenWidth < 750;

  if (isSmallScreen) {
    if (navDisplayStyle === 'none') {
      nav.style.display = 'block';
      nav.style.zIndex = '2';
      content.style.gridColumn = '1 / 3';
      content.classList.add('overlay');
      console.log('collapse');
    } else {
      nav.style.display = 'none';
      nav.style.zIndex = '';
      content.style.gridColumn = '1 / -1';
      content.classList.remove('overlay');
      console.log('expand');
    }
  } else {
    if (navDisplayStyle === 'none') {
      nav.style.display = '';
      nav.style.zIndex = '';
      content.style.gridColumn = '';
      content.classList.remove('overlay');
      console.log('collapse');
    } else {
      nav.style.display = 'none';
      nav.style.zIndex = '';
      content.style.gridColumn = '1 / -1';
      content.classList.remove('overlay');
      console.log('expand');
    }
  }
});

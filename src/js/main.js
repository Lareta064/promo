import '@/scss/main.scss'
import './header.js'
document.addEventListener('DOMContentLoaded', () => {
  const dynamicItems = document.querySelectorAll('[data-dynamic-move]');

  dynamicItems.forEach((item) => {
    const data = item.dataset.dynamicMove.split(',').map(value => value.trim());

    const targetSelector = data[0];
    const breakpoint = Number(data[1]) || 768;

    const target = document.querySelector(targetSelector);

    if (!target) return;

    // Запоминаем исходное место блока
    const placeholder = document.createComment('dynamic-move-placeholder');
    item.parentNode.insertBefore(placeholder, item.nextSibling);

    const mediaQuery = window.matchMedia(`(max-width: ${breakpoint - 0.02}px)`);

    const moveElement = () => {
      if (mediaQuery.matches) {
        // Мобильная версия: переносим в новый блок
        if (item.parentNode !== target) {
          target.appendChild(item);
        }
      } else {
        // Десктоп: возвращаем обратно
        if (item.parentNode !== placeholder.parentNode) {
          placeholder.parentNode.insertBefore(item, placeholder);
        }
      }
    };

    moveElement();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', moveElement);
    } else {
      mediaQuery.addListener(moveElement);
    }
  });
});

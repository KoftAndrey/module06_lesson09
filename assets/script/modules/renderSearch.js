import renderNews from './renderNews.js';
import preload from './preload.js';
import {getRegionStorage} from './regionControls.js';
import createNewSection from './createSection.js';

const copyShortNews = main => {
  const shortSection = createNewSection(null, null);
  const cardsElems = document.querySelectorAll('.articles__card');
  const cards = Array.from(cardsElems);
  const cardsShort = cards.slice(0, 4);
  shortSection.list.append(...cardsShort);
  return shortSection;
};

const renderSearch = async (searchValue, main, key) => {
  const {lang, country} = getRegionStorage();

  let shortNews;

  if (searchValue) {
    shortNews = copyShortNews();
    main.innerHTML = '';
    preload.show(main);

    await renderNews(searchValue, key, lang, country, 8, main)
        .then(() => {
          main.append(shortNews);
          preload.remove();
        });
  } else {
    main.innerHTML = '';
    preload.show(main);
    await renderNews(false, key, lang, country, 8, main);
    preload.remove();
  }
};

const searchControls = (main, key) => {
  const form = document.querySelector('.header__form');

  form.addEventListener('submit', e => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const searchValue = Object.fromEntries(formData).search;

    renderSearch(searchValue, main, key);
  });
};

export default searchControls;

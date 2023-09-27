import {fetchRequest, renderNews} from './renderNews.js';
import preload from './preload.js';
import {getRegionStorage} from './regionControls.js';

const renderSearch = async (searchValue, main, key) => {
  const {lang, country} = getRegionStorage();
  main.innerHTML = '';
  preload.show(main);

  if (searchValue) {
    Promise.all([
      fetchRequest(searchValue, key, lang, country, 8, renderNews),
      fetchRequest(false, key, lang, country, 4, renderNews),
    ])
        .then(elements => {
          preload.remove();
          main.append(elements[0], elements[1]);
        });
  } else {
    const news = await fetchRequest(false, key, lang, country, 8, renderNews);
    preload.remove();
    main.append(news);
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

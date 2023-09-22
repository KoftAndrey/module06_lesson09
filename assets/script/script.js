import renderHeadlines from './modules/renderHeadlines.js';
import searchControls from './modules/renderSearch.js';
import {regionControls} from './modules/regionControls.js';

const main = document.querySelector('main');
const key = '805c768781f37ed9136d8e9b576f3374';

const init = () => {
  sessionStorage.setItem('region-language', '["ru", "ru"]');

  renderHeadlines(main, key);
  searchControls(main, key);
  regionControls(main, key);
};

window.news = init;

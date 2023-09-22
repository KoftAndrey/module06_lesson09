import renderNews from './renderNews.js';
import preload from './preload.js';
import {getRegionStorage} from './regionControls.js';

const renderHeadlines = async (main, key) => {
  const {lang, country} = getRegionStorage();
  preload.show(main);

  await renderNews(false, key, lang, country, 8, main);
  preload.remove();
};

export default renderHeadlines;

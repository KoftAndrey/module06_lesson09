import {fetchRequest, renderNews} from './renderNews.js';
import preload from './preload.js';
import {getRegionStorage} from './regionControls.js';

const renderHeadlines = async (main, key) => {
  const {lang, country} = getRegionStorage();
  preload.show(main);

  const news = await fetchRequest(false, key, lang, country, 8, renderNews);
  preload.remove();
  main.append(news);
};

export default renderHeadlines;

import {createImagesArr, createCardBlock} from './createCards.js';
import createNewSection from './createSection.js';

const createUrl = (search, key, lang, country, number) => {
  const [urlBody, category] = search ?
    [`search?q=${search}`, ''] :
    ['top-headlines?', 'category=general'];
  return `https://gnews.io/api/v4/${urlBody}${category}&lang=${lang}&country=${country}&max=${number}&apikey=${key}`;
};

const fetchRequest = async (search, key, lang, country, number, callback) => {
  const url = createUrl(search, key, lang, country, number);
  try {
    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      if (callback) return callback(null, data, search);
      return;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    return callback(err);
  }
};

const loadImages = data => Promise.all(createImagesArr(data.articles));

const renderNewsBlock = (search, data, images) => {
  const section = createNewSection(search, data);
  const cardsArr = data.articles.map(article => createCardBlock(article));
  for (let i = 0; i < data.articles.length; i++) {
    cardsArr[i].imageWrapper.append(images[i]);
  }

  section.list.append(...cardsArr);

  return section;
};

const renderNews = async (err, data, search) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const imagesArr = await loadImages(data);
  const res = renderNewsBlock(search, data, imagesArr);
  return res;
};


export {fetchRequest, renderNews};

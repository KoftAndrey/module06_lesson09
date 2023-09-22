import createImagesArr from './createCards.js';
import createNewSection from './createSection.js';

const renderNews = async (search, key, lang, country, number, main) => {
  const [urlBody, category] = search ?
    [`search?q=${search}`, ''] :
    ['top-headlines?', 'category=general'];
  const url = `https://gnews.io/api/v4/${urlBody}${category}&lang=${lang}&country=${country}&max=${number}&apikey=${key}`;

  let newSection;

  await fetch(url)
      .then(response => response.json())
      .then(data => {
        newSection = createNewSection(search, data.totalArticles);
        return Promise.all(createImagesArr(data.articles, number));
      })
      .then((arr) => {
        newSection.list.append(...arr);
        return newSection;
      })
      .then(section => main.append(section))
      .catch(err => console.warn('Ошибка при загрузке статей:', err));
};

export default renderNews;

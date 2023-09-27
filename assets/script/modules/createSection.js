const createNewSection = (search, data) => {
  const newsSection = document.createElement('section');
  newsSection.classList.add('articles');

  const container = document.createElement('div');
  container.classList.add('container', 'articles__container');

  let header;
  if (search) {
    header = document.createElement('h2');
    header.textContent = `По вашему запросу “${search}” найдено ${data.totalArticles} результатов`;
  } else {
    header = document.createElement('h1');
    header.textContent = 'Свежие новости';
  }
  header.classList.add('articles__header');

  const cardsList = document.createElement('ul');
  cardsList.classList.add('articles__list');

  container.append(header, cardsList);
  newsSection.append(container);

  newsSection.list = cardsList;

  return newsSection;
};

export default createNewSection;

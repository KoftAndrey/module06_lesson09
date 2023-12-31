// Содержимое карточки =========================================================
// Сократить слишком длинный текст
const shortText = (text, length) => {
  if (text.length > length) {
    return `${text.slice(0, length + 1)}...`;
  } else {
    return text;
  }
};

// Отформатировать дату
const createDateStrings = publishedAt => {
  const date = publishedAt.slice(0, 10).replaceAll('-', '/');
  const time = publishedAt.slice(11, 16);

  return {date, time};
};

// Создать блок карточки
const createCardBlock = ({
  url,
  title,
  content,
  publishedAt,
  source,
}) => {
  const cardElem = document.createElement('li');
  cardElem.classList.add('articles__card', 'card');

  const cardLink = document.createElement('a');
  cardLink.classList.add('card__link');
  cardLink.setAttribute('href', `${url}`);
  cardLink.setAttribute('target', '_blank');

  const imageWrapper = document.createElement('div');
  imageWrapper.classList.add('card__photo');

  cardLink.append(imageWrapper);

  cardLink.insertAdjacentHTML('beforeend', `
    <h3 class="card__title">${title}</h3>
    <p class="card__text">${shortText(content, 70)}</p>
    <div class="card__info">
      <div class="card__date">
        <p class="card__day">${createDateStrings(publishedAt).date}</p>
        <p class="card__time">${createDateStrings(publishedAt).time}</p>
      </div>
      <p class="card__author">${shortText(source.name, 30)}</p>
    </div>
`);

  cardElem.append(cardLink);
  cardElem.imageWrapper = imageWrapper;

  return cardElem;
};


// Массив загруженный изображений ==============================================
// Загрузить изображение
const loadImage = ({image, title}) => new Promise(resolve => {
  const img = new Image();
  img.classList.add('card__image');
  img.src = image;
  img.alt = title;
  img.addEventListener('load', () => {
    resolve(img);
  });
  img.addEventListener('error', () => {
    img.src = 'assets/style/card/img/no_image.jpg';
    console.warn('Ошибка при загрузке изображения:', image);
    resolve(img);
  });
});

// Создать массив promise изображений
const createImagesArr = data => {
  const promiseArr = [];
  for (let i = 0; i < data.length; i++) {
    promiseArr.push(loadImage(data[i]));
  }

  return promiseArr;
};

export {createImagesArr, createCardBlock};


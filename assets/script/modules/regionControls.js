import renderHeadlines from './renderHeadlines.js';

// Выбор региона
const getRegionStorage = () => {
  const regionStorage = sessionStorage.getItem('region-language');
  const region = JSON.parse(regionStorage);
  const [lang, country] = [region[1], region[0]];
  return {lang, country};
};

const regionParams = value => (value === 'gb' ? ['gb', 'en'] : [value, value]);

const regionControls = (main, key) => {
  const select = document.querySelector('.header__select-region');

  select.addEventListener('change', () => {
    const newRegion = regionParams(select.value);
    sessionStorage.setItem('region-language', JSON.stringify(newRegion));

    main.innerHTML = '';

    renderHeadlines(main, key);
  });
};

export {getRegionStorage, regionControls};

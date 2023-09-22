const showArticles = () => {
  preload.show();
  return Promise.all([
    loadSearch(),
    loadArticles(),
  ]);
};

showArticles().then(data => {
  preload.remove();
  articlesList.append(...data);
});

// fetchRequest = preloader => renderCards

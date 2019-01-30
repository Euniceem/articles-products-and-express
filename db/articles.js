(function () {
  const articlesObj = {
    "articles": []
  };

  const getArticles = () => {
    return articlesObj.articles;
  };

  const addArticle = (title, body, author) => {
    let article = {};

    article.title = title;
    article.body = body;
    article.author = author;
    articlesObj.articles.push(article);
  };

  module.exports = {
    getArticles,
    addArticle,

  };

})();

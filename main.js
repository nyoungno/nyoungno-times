const API_KEY = `d87115fdbe2240cb8187821a25a1fe4b`;
const getLatestNews = () => {
  const url = new URL(
    `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
  );
  const response = fetch(url);
};

getLatestNews();

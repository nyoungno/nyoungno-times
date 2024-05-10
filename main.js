const API_KEY = ``;
const getLatestNews = () => {
  const url = new URL(
    ` =${API_KEY}`
  );
  const response = fetch(url);
};

getLatestNews();

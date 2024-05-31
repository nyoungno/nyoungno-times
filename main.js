const API_KEY = `d87115fdbe2240cb8187821a25a1fe4b`;
let newsList = [];
const menus = document.querySelectorAll(".menus button");

menus.forEach((menus) =>
  menus.addEventListener("click", (event) => getNewsByCategory(event))
);

let url = new URL(
  `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
);

let totalResults = 0;
let page = 1;
const pageSize = 10;
const groupSize = 5;

const getNews = async () => {
  try {
    url.searchParams.set("page", page); // => &page=page
    url.searchParams.set("pageSize", pageSize);
    const response = await fetch(url);
    const data = await response.json();
    if (response.status === 200) {
      if (data.articles.length === 0) {
        throw new Error("No result fot this search");
      }
      newsList = data.articles;
      totalResults = data.totalResults;
      render();
      paginationRender();
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    errorRender(error.message);
  }
};

const getLatestNews = async () => {
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
  );
  getNews();
};

const getNewsByCategory = async (event) => {
  const category = event.target.textContent.toLowerCase();
  console.log("category", category);
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&category=${category}&apiKey=${API_KEY}`
  );
  getNews();
};

const searchNews = async () => {
  const keyword = document.getElementById("search-input").value;
  url = new URL(
    `https://newsapi.org/v2/top-headlines?country=kr&q=${keyword}&apiKey=${API_KEY}`
  );
  getNews();
};

const render = () => {
  const newsHTML = newsList
    .map(
      (news) => `<div class="row news">
  <div class="col-lg-4">
      <img class="news-img-size" src="${news.urlToImage}">
  </div>
  <div class="col-lg-8">
      <h2>${news.title}</h2>
      <P>${news.description}</P>
      <div>${news.source.name} * ${news.publishedAt}</div>
  </div>
</div>`
    )
    .join("");

  document.getElementById("news-board").innerHTML = newsHTML;
};

const errorRender = (errorMessage) => {
  const errorHTML = `<div class="alert alert-danger" role="alert">
  ${errorMessage}
</div>`;

  document.getElementById("news-board").innerHTML = errorHTML;
};

const paginationRender = () => {
  //totalResults
  //page
  //pageSize
  //groupSize
  //totalPages
  const totalPages = Math.ceil(totalResults / pageSize);
  //pageGroup
  const pageGroup = Math.ceil(page / groupSize);
  //lastPage
  let lastPage = pageGroup * groupSize;
  //마지막 페이지그룹이 그룹사이즈보가 작다?
  if (lastPage > totalPages) {
    lastPage = totalPages;
  }

  //firstPage

  const firstPage =
    lastPage - (groupSize - 1) <= 0 ? 1 : lastPage - (groupSize - 1);

  let paginationHTML = `<li class="page-item" onclick="moveToPage(${
    page - 1
  })"><a class="page-link" href="#">Previous</a></li>
  `;

  for (let i = firstPage; i <= lastPage; i++) {
    paginationHTML += ` <li class="page-item ${
      i === page ? "active" : ""
    }" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
  }
  paginationHTML += `<li class="page-item" onclick="moveToPage(${[
    page + 1,
  ]})"><a class="page-link" href="#">Next</a></li>`;
  document.querySelector(".pagination").innerHTML = paginationHTML;
};

const moveToPage = (pageNum) => {
  page = pageNum;
  getNews();
};

getLatestNews();

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};

//1. 버튼들에 클릭이벤트주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기

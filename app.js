let getDiv = document.getElementById('getDiv');

let getNews = () => {
  // read search value at the moment of clicking
  let getSearch = document.querySelector('#News').value;

  getDiv.innerHTML = "";
  fetch(
    (() => {
    // Use last 7 days so searches return results
    const from = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const yyyy = from.getFullYear();
    const mm = String(from.getMonth() + 1).padStart(2, '0');
    const dd = String(from.getDate()).padStart(2, '0');
    const fromDate = `${yyyy}-${mm}-${dd}`;

    return `https://newsapi.org/v2/everything?q=${encodeURIComponent(getSearch)}&from=${fromDate}&sortBy=publishedAt&apiKey=6ddd8c71e08e40ba8d216f93141fc889`;
  })()
  )
    .then((res) => res.json())
    .then((data) => {
      if (!data.articles || data.articles.length === 0) {
        console.log('No articles found:', data);
        return;
      }

      for (let i = 0; i < data.articles.length; i++) {
        let article = data.articles[i];

        getDiv.innerHTML += `
          <div class="card m-3" style="width: 18rem;">
            <img src="${article.urlToImage || ''}" class="card-img-top" alt="${article.title || ''}">
            <div class="card-body">
              <h5 class="card-title">${article.title || ''}</h5>
              <p class="card-text">${article.description || ''}</p>
              <a href="${article.url || '#'}" target="_blank" class="btn btn-primary">Read more</a>
            </div>
          </div> 
        `;
      }
    })
    .catch((err) => console.log(err));
  };
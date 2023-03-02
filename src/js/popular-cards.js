import '/src/images/icons_heart.svg';
import NewsApiService from './NewsApiService';

const newsPopular = new NewsApiService();
const refs = {
  listCards: document.querySelector('.list-card'),
};

const getCard = (urlPhoto, category, title, text, date, url) => {
  return `<li class="card">
            <div class="block-photo">
            <img class="card-photo" src="${urlPhoto}" alt="Сітка користувачів">
            <p class="news-category-text">${category}</p>
            <p class="checked-news visually-hidden">Already read
                <svg class="checked-news-icon" width="18" height="18">
                    <use href="/icons_heart.f4f5aa73.svg#icons_bird"></use>
                </svg>
            </p>
            <button class="card-button add-favorite-btn" type="button">Add to favorite<svg class="card-button-icon" width="16" height="16">
                    <use href="/icons_heart.f4f5aa73.svg#icons_heart"></use>
                </svg>
            </button>
            <button class="card-button remove-favorite-btn visually-hidden" type="button">Remove from favorite<svg class="card-button-icon" width="16" height="16">
                    <use href="/icons_heart.f4f5aa73.svg#icons_heart-checked"></use>
                </svg>
            </button>
        </div>
        <h2 class="card-title">${title}</h2>
        <p class="card-text">${text}</p>
        <div class="card-link">
            <p class="card-data">${date}</p>
            <a href="${url}" target="_blank" class="card-more-news">Read more</a>
        </div>
    </li>`;
};

const getPopularNews = async () => {
  const results = await newsPopular.getPopular();
  const cardNews = results
    .map(result => {
      const card = getCard(
        getUrl(result),
        result.section,
        checkTitleLength(result.title),
        checkTextLength(result.abstract),
        result.published_date,
        result.url
      );
      return card;
    })
    .join('');
  refs.listCards.insertAdjacentHTML('beforeend', cardNews);
};

const getUrl = el => {
  if (el.media.length === 0) {
    return 'https://image-placeholder.com/images/actual-size/200x200.png';
  }
  const photosArray = el.media[0];
  const photos = photosArray['media-metadata'];
  const photosEl = photos[2].url;
  return photosEl;
};

const checkTextLength = text => {
  if (text.length > 150) {
    return text.slice(0, 150) + '...';
  }
  return text;
};

const checkTitleLength = title => {
  if (title.length > 50) {
    return title.slice(0, 50) + '...';
  }
  return title;
};

getPopularNews();

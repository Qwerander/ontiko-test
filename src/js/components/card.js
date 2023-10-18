function createCard(card) {
  const wrapper = document.createElement('div');
  const date = document.createElement('span');
  const logo = document.createElement('img');
  const title = document.createElement('h2');
  const description = document.createElement('p');
  const location = document.createElement('span');
  const mail = document.createElement('span');
  const btnWrapper = document.createElement('div');
  const btn = document.createElement('button');
  const link = document.createElement('a');

  wrapper.classList.add('card');
  date.classList.add('card__date');
  logo.classList.add('card__logo');
  title.classList.add('card__title');
  description.classList.add('card__descr');
  location.classList.add('card__info');
  mail.classList.add('card__info', 'card__info--mail');
  btnWrapper.classList.add('card__btns');
  btn.classList.add('card__btn');
  link.classList.add('card__link');

  date.innerHTML = card.date_range;
  location.innerHTML = `<svg width="13" height="18" viewBox="0 0 13 18" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M12.2372 6.3871C12.2997 2.90323 9.55254 1.68889e-06 6.18105 1.41465e-06C2.80956 1.14041e-06 -1.76429e-05 2.77419 -1.79702e-05 6.25806C-1.81339e-05 8 0.749202 10.2581 2.31008 12.9677C3.55878 15.0323 5.80643 18 5.99374 18C6.11861 18 8.49114 15.0968 9.73984 13.0323C11.3631 10.3226 12.2372 8.06452 12.2372 6.3871Z" fill="black" fill-opacity="0.29"/>
  <ellipse cx="6.11862" cy="6.0937" rx="3.67118" ry="3.69501" fill="white"/>
  </svg>
   ${card.location}`;
  mail.innerHTML = `<svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
  <g clip-path="url(#clip0_1_280)">
  <path d="M8.12499 11.375H1.62499V1.62499H8.12499V2.43748H9.74997V0H0V13H9.75V10.5625H8.12501V11.375H8.12499Z" fill="#B5B5B5"/>
  <path d="M10.3006 3L9.15164 4.14892L10.2022 5.19944H6V6.82445H10.2022L9.15164 7.87498L10.3006 9.0239L13.3125 6.01194L10.3006 3Z" fill="#B5B5B5"/>
  </g>
  <defs>
  <clipPath id="clip0_1_280">
  <rect width="13" height="13" fill="white"/>
  </clipPath>
  </defs>
  </svg>
  highload.ru`;
  logo.src = `https:${card.logo}`;
  description.textContent = card.brief;
  title.textContent = card.name;
  link.href = card.uri;
  link.textContent = 'Подробнее';
  btn.textContent = 'Купить билет';

  btnWrapper.append(btn, link);
  wrapper.append(date, logo, title, description, location, mail, btnWrapper);

  return wrapper;
}

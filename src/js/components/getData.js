const urlAdress = 'https://conf.ontico.ru/api/conferences/forCalendar.json';

async function getData() {
  const response = await fetch(urlAdress);
  const data = await response.json();

  return data.result;
}

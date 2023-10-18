
const grid = document.getElementById('grid');
const data = getData().then((res) => {
  res.forEach((element) => {
    grid.append(createCard(element));
  });
});

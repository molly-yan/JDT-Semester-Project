const axios = require("axios");
const express = require("express");
const app = express();

app.get('/', (reg, res) => {
  res.send("Hello. JDT");
});

async function getCalories(food){
  const options = {
    method: 'GET',
    url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
    params: {query: food},
    headers: {
      'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com',
      'X-RapidAPI-Key': 'ad974d2964mshbfeb20e2e0404e7p141d4cjsn240aee5ac17f'
    },
  };

  return new Promise ((resolve, reject) => {
    axios
    .request(options)
    .then(res => {
      let calories = res.data.items[0].calories;
      resolve(calories);
    })
    .catch(error => {
      reject(error);
    });
  });
}

const options = {
  method: 'GET',
  url: 'https://calorieninjas.p.rapidapi.com/v1/nutrition',
  params: {query: 'tomato'},
  headers: {
    'X-RapidAPI-Host': 'calorieninjas.p.rapidapi.com',
    'X-RapidAPI-Key': 'ad974d2964mshbfeb20e2e0404e7p141d4cjsn240aee5ac17f'
  }
};

app.get('/calories/:food', (req, res) => {
  let calories;
  const food = req.params.food;

  getCalories(food)
  .then(data => calories = data)
  .catch(err => console.log(err));

  setTimeout(() => {
    res.send(`${food} has ${calories} calories`)
  }, 1500)
})

axios.request(options).then(function (response) {
	console.log(response.data);
}).catch(function (error) {
	console.error(error);
});

app.listen((3001), () => {
  console.log('App is listening on port 3001');
})
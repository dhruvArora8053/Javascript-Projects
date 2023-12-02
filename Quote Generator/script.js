"use strict";

let apiQuotes = [];

// Show new Quote
function newQuote(quotes) {
  const randomNumber = function (last) {
    return Math.floor(Math.random() * last);
  };

  const { text: quote, author } = quotes[randomNumber(quotes.length)];
  console.log(quote, author);
}

async function getQuotes() {
  const apiURL = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    console.log(apiQuotes);
    newQuote(apiQuotes);
  } catch (error) {
    // Catch erorr here
  }
}

// On load
getQuotes();

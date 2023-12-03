"use strict";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show loading
function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Hide loading
function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show new Quote
function newQuote(quotes) {
  loading();
  const randomNumber = function (last) {
    return Math.floor(Math.random() * last);
  };

  let { text: quote, author } = quotes[randomNumber(quotes.length)];

  //   Check if author field is blank and replace it with 'Unknown'
  author = author || "Unknown";

  //   Check quote length to determine styling
  if (quote.length > 50) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  authorText.textContent = author.slice(0, author.indexOf(","));

  //   Set quote, hide loader
  quoteText.textContent = quote;
  complete();
}

async function getQuotes() {
  loading();
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

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();

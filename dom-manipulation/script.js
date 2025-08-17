const generateNewCode = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuote");
let quotes = [
  {
    text: "The best way to get started is to quit talking and begin doing.",
    category: "motivation",
  },
  {
    text: "Don’t let yesterday take up too much of today.",
    category: "Wisdom",
  },
  {
    text: "Success is not in what you have, but who you are.",
    category: "Success",
  },
];
function showRandomQuotes() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const displayQuotes = document.getElementById("quoteDisplay");
  displayQuotes.innerHTML = `${randomQuote.text} - ${randomQuote.category}`;
}

generateNewCode.addEventListener("click", showRandomQuotes);

function addQuote() {
  let newQuoteText = document.getElementById("newQuoteText");
  let newQuoteCategory = document.getElementById("newQuoteCategory");

  newQuoteText.value.trim();
  newQuoteCategory.value.trim();
  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    newQuoteText.value = "";
    newQuoteCategory.value = "";
  }
}

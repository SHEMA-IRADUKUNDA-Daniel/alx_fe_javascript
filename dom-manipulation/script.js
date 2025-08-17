const generateNewCode = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuote");
const exportBtn = document.getElementById("exportQuotes");
const importInput = document.getElementById("importFile");

let quotes = [];

function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  } else {
    quotes = [
      {
        text: "The best way to get started is to quit talking and begin doing.",
        category: "Motivation",
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
    saveQuotes();
  }
}

function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function showRandomQuotes() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  const displayQuotes = document.getElementById("quoteDisplay");

  displayQuotes.innerHTML = `${randomQuote.text} - ${randomQuote.category}`;

  sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
}

generateNewCode.addEventListener("click", showRandomQuotes);

function createAddQuoteForm() {
  let newQuoteText = document.getElementById("newQuoteText").value.trim();
  let newQuoteCategory = document
    .getElementById("newQuoteCategory")
    .value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    saveQuotes();

    const displayQuotes = document.getElementById("quoteDisplay");
    const newQuoteEl = document.createElement("p");
    newQuoteEl.textContent = `${newQuoteText} - ${newQuoteCategory}`;
    displayQuotes.appendChild(newQuoteEl);

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  } else {
    alert("⚠️ Please enter both a quote and a category.");
  }
}

addQuoteBtn.addEventListener("click", createAddQuoteForm);

function exportToJsonFile() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();

  URL.revokeObjectURL(url);
}

exportBtn.addEventListener("click", exportToJsonFile);

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (event) {
    try {
      const importedQuotes = JSON.parse(event.target.result);

      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes();
        alert("✅ Quotes imported successfully!");
      } else {
        alert("⚠️ Invalid JSON format. Expected an array of quotes.");
      }
    } catch (err) {
      alert("⚠️ Error parsing JSON file.");
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

importInput.addEventListener("change", importFromJsonFile);

window.onload = function () {
  loadQuotes();

  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  if (lastViewed) {
    const displayQuotes = document.getElementById("quoteDisplay");
    const parsedQuote = JSON.parse(lastViewed);
    displayQuotes.textContent = `${parsedQuote.text} - ${parsedQuote.category}`;
  }
};

function notify(message) {
  if (notificationDiv) {
    notificationDiv.textContent = message;
    setTimeout(() => (notificationDiv.textContent = ""), 3000);
  }
}

// --- Simulate server fetch & sync ---
const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

async function fetchServerQuotes() {
  try {
    const response = await fetch(SERVER_URL);
    const serverData = await response.json();
    return serverData
      .slice(0, 3)
      .map((item) => ({ text: item.title, category: item.body }));
  } catch (error) {
    console.error("Error fetching server data:", error);
    return [];
  }
}

async function syncWithServer() {
  const serverQuotes = await fetchServerQuotes();
  const localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

  // Merge server data with local, server takes precedence
  const mergedQuotes = [...serverQuotes];
  localQuotes.forEach((localQuote) => {
    const exists = serverQuotes.some(
      (sq) => sq.text === localQuote.text && sq.category === localQuote.category
    );
    if (!exists) mergedQuotes.push(localQuote);
  });

  quotes = mergedQuotes;
  saveQuotes();
  displayQuotes();
  notify("🔄 Quotes synced with server!");
}

// --- Event Listeners ---
generateNewCode.addEventListener("click", showRandomQuotes);
addQuoteBtn.addEventListener("click", createAddQuoteForm);
exportBtn.addEventListener("click", exportToJsonFile);
importInput.addEventListener("change", importFromJsonFile);

// --- Initialize on load ---
window.onload = function () {
  loadQuotes();
  displayQuotes();

  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  if (lastViewed) {
    const parsedQuote = JSON.parse(lastViewed);
    quoteDisplay.textContent = `"${parsedQuote.text}" - ${parsedQuote.category}`;
  }

  // Periodic sync every 30s
  syncWithServer();
  setInterval(syncWithServer, 30000);
};

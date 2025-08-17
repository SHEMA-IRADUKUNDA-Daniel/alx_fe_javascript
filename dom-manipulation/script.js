// document.addEventListener("DOMContentLoaded", () => {
//   const generateNewCode = document.getElementById("newQuote");
//   const addQuoteBtn = document.getElementById("addQuote");
//   const displayQuotes = document.getElementById("quoteDisplay");

//   let quotes = [
//     {
//       text: "The best way to get started is to quit talking and begin doing.",
//       category: "Motivation",
//     },
//     {
//       text: "Don’t let yesterday take up too much of today.",
//       category: "Wisdom",
//     },
//     {
//       text: "Success is not in what you have, but who you are.",
//       category: "Success",
//     },
//   ];

//   function showRandomQuotes() {
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const randomQuote = quotes[randomIndex];
//     displayQuotes.textContent = `${randomQuote.text} - ${randomQuote.category}`;
//   }

//   function createAddQuoteForm() {
//     const newQuoteText = document.getElementById("newQuoteText").value.trim();
//     const newQuoteCategory = document
//       .getElementById("newQuoteCategory")
//       .value.trim();

//     if (newQuoteText && newQuoteCategory) {
//       quotes.push({ text: newQuoteText, category: newQuoteCategory });

//       const newQuoteEl = document.createElement("p");
//       newQuoteEl.textContent = `${newQuoteText} - ${newQuoteCategory}`;
//       displayQuotes.appendChild(newQuoteEl);

//       document.getElementById("newQuoteText").value = "";
//       document.getElementById("newQuoteCategory").value = "";
//     } else {
//       alert("⚠️ Please enter both a quote and a category.");
//     }
//   }

//   generateNewCode.addEventListener("click", showRandomQuotes);
//   addQuoteBtn.addEventListener("click", createAddQuoteForm);
// });
document.addEventListener("DOMContentLoaded", () => {
  const generateNewCode = document.getElementById("newQuote");
  const addQuoteBtn = document.getElementById("addQuote");
  const exportBtn = document.getElementById("exportQuotes");
  const importInput = document.getElementById("importFile");
  const displayQuotes = document.getElementById("quoteDisplay");

  // Load quotes from localStorage or initialize default quotes
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

  // Show a random quote
  function showRandomQuotes() {
    if (!quotes.length) return;
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    displayQuotes.innerHTML = `${randomQuote.text} - ${randomQuote.category}`;
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
  }

  // Add a new quote
  function createAddQuoteForm() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document
      .getElementById("newQuoteCategory")
      .value.trim();

    if (newQuoteText && newQuoteCategory) {
      quotes.push({ text: newQuoteText, category: newQuoteCategory });
      saveQuotes();

      // Update display
      const newQuoteEl = document.createElement("p");
      newQuoteEl.textContent = `${newQuoteText} - ${newQuoteCategory}`;
      displayQuotes.appendChild(newQuoteEl);

      // Clear input fields
      document.getElementById("newQuoteText").value = "";
      document.getElementById("newQuoteCategory").value = "";
    } else {
      alert("⚠️ Please enter both a quote and a category.");
    }
  }

  // Export quotes to JSON file
  function exportToJsonFile() {
    const blob = new Blob([JSON.stringify(quotes, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "quotes.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  // Import quotes from JSON file
  function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function (e) {
      try {
        const importedQuotes = JSON.parse(e.target.result);
        if (Array.isArray(importedQuotes)) {
          quotes.push(...importedQuotes);
          saveQuotes();
          alert("✅ Quotes imported successfully!");
        } else {
          alert("⚠️ Invalid JSON format. Must be an array of quotes.");
        }
      } catch {
        alert("⚠️ Error parsing JSON file.");
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }

  // Load quotes and last viewed quote on page load
  loadQuotes();
  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  if (lastViewed) {
    const parsedQuote = JSON.parse(lastViewed);
    displayQuotes.textContent = `${parsedQuote.text} - ${parsedQuote.category}`;
  }

  // Event listeners
  generateNewCode.addEventListener("click", showRandomQuotes);
  addQuoteBtn.addEventListener("click", createAddQuoteForm);
  exportBtn.addEventListener("click", exportToJsonFile);
  importInput.addEventListener("change", importFromJsonFile);
});

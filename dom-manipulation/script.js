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

// document.addEventListener("DOMContentLoaded", () => {
//   const generateNewCode = document.getElementById("newQuote");
//   const addQuoteBtn = document.getElementById("addQuote");
//   const exportBtn = document.getElementById("exportQuotes");
//   const importInput = document.getElementById("importFile");
//   const displayQuotes = document.getElementById("quoteDisplay");

//   // Load quotes from localStorage or initialize default quotes
//   let quotes = [];

//   function loadQuotes() {
//     const storedQuotes = localStorage.getItem("quotes");
//     if (storedQuotes) {
//       quotes = JSON.parse(storedQuotes);
//     } else {
//       quotes = [
//         {
//           text: "The best way to get started is to quit talking and begin doing.",
//           category: "Motivation",
//         },
//         {
//           text: "Don’t let yesterday take up too much of today.",
//           category: "Wisdom",
//         },
//         {
//           text: "Success is not in what you have, but who you are.",
//           category: "Success",
//         },
//       ];
//       saveQuotes();
//     }
//   }

//   function saveQuotes() {
//     localStorage.setItem("quotes", JSON.stringify(quotes));
//   }

//   // Show a random quote
//   function showRandomQuotes() {
//     if (!quotes.length) return;
//     const randomIndex = Math.floor(Math.random() * quotes.length);
//     const randomQuote = quotes[randomIndex];
//     displayQuotes.innerHTML = `${randomQuote.text} - ${randomQuote.category}`;
//     sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
//   }

//   // Add a new quote
//   function createAddQuoteForm() {
//     const newQuoteText = document.getElementById("newQuoteText").value.trim();
//     const newQuoteCategory = document
//       .getElementById("newQuoteCategory")
//       .value.trim();

//     if (newQuoteText && newQuoteCategory) {
//       quotes.push({ text: newQuoteText, category: newQuoteCategory });
//       saveQuotes();

//       // Update display
//       const newQuoteEl = document.createElement("p");
//       newQuoteEl.textContent = `${newQuoteText} - ${newQuoteCategory}`;
//       displayQuotes.appendChild(newQuoteEl);

//       // Clear input fields
//       document.getElementById("newQuoteText").value = "";
//       document.getElementById("newQuoteCategory").value = "";
//     } else {
//       alert("⚠️ Please enter both a quote and a category.");
//     }
//   }

//   // Export quotes to JSON file
//   function exportToJsonFile() {
//     const blob = new Blob([JSON.stringify(quotes, null, 2)], {
//       type: "application/json",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "quotes.json";
//     a.click();
//     URL.revokeObjectURL(url);
//   }

//   // Import quotes from JSON file
//   function importFromJsonFile(event) {
//     const fileReader = new FileReader();
//     fileReader.onload = function (e) {
//       try {
//         const importedQuotes = JSON.parse(e.target.result);
//         if (Array.isArray(importedQuotes)) {
//           quotes.push(...importedQuotes);
//           saveQuotes();
//           alert("✅ Quotes imported successfully!");
//         } else {
//           alert("⚠️ Invalid JSON format. Must be an array of quotes.");
//         }
//       } catch {
//         alert("⚠️ Error parsing JSON file.");
//       }
//     };
//     fileReader.readAsText(event.target.files[0]);
//   }

//   // Load quotes and last viewed quote on page load
//   loadQuotes();
//   const lastViewed = sessionStorage.getItem("lastViewedQuote");
//   if (lastViewed) {
//     const parsedQuote = JSON.parse(lastViewed);
//     displayQuotes.textContent = `${parsedQuote.text} - ${parsedQuote.category}`;
//   }

//   // Event listeners
//   generateNewCode.addEventListener("click", showRandomQuotes);
//   addQuoteBtn.addEventListener("click", createAddQuoteForm);
//   exportBtn.addEventListener("click", exportToJsonFile);
//   importInput.addEventListener("change", importFromJsonFile);
// });

// document.addEventListener("DOMContentLoaded", () => {
//   const generateNewCode = document.getElementById("newQuote");
//   const addQuoteBtn = document.getElementById("addQuote");
//   const exportBtn = document.getElementById("exportQuotes");
//   const importInput = document.getElementById("importFile");
//   const displayQuotes = document.getElementById("quoteDisplay");
//   const categoryFilter = document.getElementById("categoryFilter");

//   let quotes = [];

//   // Load quotes from localStorage or default
//   function loadQuotes() {
//     const storedQuotes = localStorage.getItem("quotes");
//     if (storedQuotes) {
//       quotes = JSON.parse(storedQuotes);
//     } else {
//       quotes = [
//         {
//           text: "The best way to get started is to quit talking and begin doing.",
//           category: "Motivation",
//         },
//         {
//           text: "Don’t let yesterday take up too much of today.",
//           category: "Wisdom",
//         },
//         {
//           text: "Success is not in what you have, but who you are.",
//           category: "Success",
//         },
//       ];
//       saveQuotes();
//     }
//   }

//   // Save quotes
//   function saveQuotes() {
//     localStorage.setItem("quotes", JSON.stringify(quotes));
//     populateCategories(); // Update categories whenever quotes change
//   }

//   // Populate category dropdown dynamically
//   function populateCategories() {
//     const uniqueCategories = [...new Set(quotes.map((q) => q.category))];
//     categoryFilter.innerHTML = '<option value="all">All Categories</option>';
//     uniqueCategories.forEach((cat) => {
//       const option = document.createElement("option");
//       option.value = cat;
//       option.textContent = cat;
//       categoryFilter.appendChild(option);
//     });

//     // Restore last selected category
//     const lastFilter = localStorage.getItem("lastSelectedCategory");
//     if (lastFilter && uniqueCategories.includes(lastFilter)) {
//       categoryFilter.value = lastFilter;
//     }
//   }

//   // Show a random quote (respecting filter)
//   function showRandomQuotes() {
//     const selectedCategory = categoryFilter.value;
//     let filteredQuotes =
//       selectedCategory === "all"
//         ? quotes
//         : quotes.filter((q) => q.category === selectedCategory);

//     if (!filteredQuotes.length) {
//       displayQuotes.textContent = "No quotes in this category.";
//       return;
//     }

//     const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
//     const randomQuote = filteredQuotes[randomIndex];
//     displayQuotes.textContent = `${randomQuote.text} - ${randomQuote.category}`;
//     sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
//   }

//   // Filter quotes when category changes
//   function filterQuotes() {
//     localStorage.setItem("lastSelectedCategory", categoryFilter.value);
//     const selectedCategory = categoryFilter.value;
//     let filteredQuotes =
//       selectedCategory === "all"
//         ? quotes
//         : quotes.filter((q) => q.category === selectedCategory);
//     displayQuotes.textContent = filteredQuotes.length
//       ? `${filteredQuotes[0].text} - ${filteredQuotes[0].category}`
//       : "No quotes in this category.";
//   }

//   // Add new quote
//   function createAddQuoteForm() {
//     const newQuoteText = document.getElementById("newQuoteText").value.trim();
//     const newQuoteCategory = document
//       .getElementById("newQuoteCategory")
//       .value.trim();

//     if (!newQuoteText || !newQuoteCategory) {
//       alert("⚠️ Please enter both a quote and a category.");
//       return;
//     }

//     quotes.push({ text: newQuoteText, category: newQuoteCategory });
//     saveQuotes();

//     const newQuoteEl = document.createElement("p");
//     newQuoteEl.textContent = `${newQuoteText} - ${newQuoteCategory}`;
//     displayQuotes.appendChild(newQuoteEl);

//     document.getElementById("newQuoteText").value = "";
//     document.getElementById("newQuoteCategory").value = "";
//   }

//   // Export quotes to JSON
//   function exportToJsonFile() {
//     const blob = new Blob([JSON.stringify(quotes, null, 2)], {
//       type: "application/json",
//     });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "quotes.json";
//     a.click();
//     URL.revokeObjectURL(url);
//   }

//   // Import quotes from JSON
//   function importFromJsonFile(event) {
//     const fileReader = new FileReader();
//     fileReader.onload = function (e) {
//       try {
//         const importedQuotes = JSON.parse(e.target.result);
//         if (Array.isArray(importedQuotes)) {
//           quotes.push(...importedQuotes);
//           saveQuotes();
//           alert("✅ Quotes imported successfully!");
//         } else {
//           alert("⚠️ Invalid JSON format.");
//         }
//       } catch {
//         alert("⚠️ Error parsing JSON file.");
//       }
//     };
//     fileReader.readAsText(event.target.files[0]);
//   }

//   // Event listeners
//   generateNewCode.addEventListener("click", showRandomQuotes);
//   addQuoteBtn.addEventListener("click", createAddQuoteForm);
//   exportBtn.addEventListener("click", exportToJsonFile);
//   importInput.addEventListener("change", importFromJsonFile);
//   categoryFilter.addEventListener("change", filterQuotes);

//   // Initialize
//   loadQuotes();
//   populateCategories();

//   // Restore last viewed quote
//   const lastViewed = sessionStorage.getItem("lastViewedQuote");
//   if (lastViewed) {
//     const parsedQuote = JSON.parse(lastViewed);
//     displayQuotes.textContent = `${parsedQuote.text} - ${parsedQuote.category}`;
//   }
// });

document.addEventListener("DOMContentLoaded", () => {
  const generateNewCode = document.getElementById("newQuote");
  const addQuoteBtn = document.getElementById("addQuote");
  const exportBtn = document.getElementById("exportQuotes");
  const importInput = document.getElementById("importFile");
  const displayQuotes = document.getElementById("quoteDisplay");
  const categoryFilter = document.getElementById("categoryFilter");
  const syncNotification = document.getElementById("syncNotification");

  let quotes = [];

  // Load quotes from localStorage or default
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
    populateCategories();
  }

  function populateCategories() {
    const uniqueCategories = [...new Set(quotes.map((q) => q.category))];
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    uniqueCategories.forEach((cat) => {
      const option = document.createElement("option");
      option.value = cat;
      option.textContent = cat;
      categoryFilter.appendChild(option);
    });

    const lastFilter = localStorage.getItem("lastSelectedCategory");
    if (lastFilter && uniqueCategories.includes(lastFilter)) {
      categoryFilter.value = lastFilter;
    }
  }

  function showRandomQuotes() {
    const selectedCategory = categoryFilter.value;
    let filteredQuotes =
      selectedCategory === "all"
        ? quotes
        : quotes.filter((q) => q.category === selectedCategory);
    if (!filteredQuotes.length) {
      displayQuotes.textContent = "No quotes in this category.";
      return;
    }
    const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
    const randomQuote = filteredQuotes[randomIndex];
    displayQuotes.textContent = `${randomQuote.text} - ${randomQuote.category}`;
    sessionStorage.setItem("lastViewedQuote", JSON.stringify(randomQuote));
  }

  function filterQuotes() {
    localStorage.setItem("lastSelectedCategory", categoryFilter.value);
    const selectedCategory = categoryFilter.value;
    let filteredQuotes =
      selectedCategory === "all"
        ? quotes
        : quotes.filter((q) => q.category === selectedCategory);
    displayQuotes.textContent = filteredQuotes.length
      ? `${filteredQuotes[0].text} - ${filteredQuotes[0].category}`
      : "No quotes in this category.";
  }

  function createAddQuoteForm() {
    const newQuoteText = document.getElementById("newQuoteText").value.trim();
    const newQuoteCategory = document
      .getElementById("newQuoteCategory")
      .value.trim();
    if (!newQuoteText || !newQuoteCategory) {
      alert("⚠️ Please enter both a quote and a category.");
      return;
    }

    const newQuote = { text: newQuoteText, category: newQuoteCategory };
    quotes.push(newQuote);
    saveQuotes();
    postQuoteToServer(newQuote); // send to server

    const newQuoteEl = document.createElement("p");
    newQuoteEl.textContent = `${newQuoteText} - ${newQuoteCategory}`;
    displayQuotes.appendChild(newQuoteEl);

    document.getElementById("newQuoteText").value = "";
    document.getElementById("newQuoteCategory").value = "";
  }

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
          alert("⚠️ Invalid JSON format.");
        }
      } catch {
        alert("⚠️ Error parsing JSON file.");
      }
    };
    fileReader.readAsText(event.target.files[0]);
  }

  // --- Server sync simulation ---
  const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";

  // Fetch quotes from server periodically
  async function fetchQuotesFromServer() {
    try {
      const response = await fetch(SERVER_URL);
      const serverData = await response.json();

      // Simulate conflict resolution: only unique quotes based on text
      let newQuotes = serverData.map((item) => ({
        text: item.title,
        category: "Server",
      }));
      let updated = false;

      newQuotes.forEach((q) => {
        if (!quotes.find((local) => local.text === q.text)) {
          quotes.push(q);
          updated = true;
        }
      });

      if (updated) {
        saveQuotes();
        syncNotification.textContent = "🔄 Quotes updated from server!";
        setTimeout(() => (syncNotification.textContent = ""), 3000);
      }
    } catch (err) {
      console.error("Error fetching server quotes:", err);
    }
  }

  // Post a new quote to server (simulation)
  async function postQuoteToServer(quote) {
    try {
      await fetch(SERVER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: quote.text }),
      });
    } catch (err) {
      console.error("Error posting quote to server:", err);
    }
  }

  async function syncQuotes() {
    await fetchQuotesFromServer();
  }

  setInterval(fetchQuotesFromServer, 15000);

  // --- Event listeners ---
  generateNewCode.addEventListener("click", showRandomQuotes);
  addQuoteBtn.addEventListener("click", createAddQuoteForm);
  exportBtn.addEventListener("click", exportToJsonFile);
  importInput.addEventListener("change", importFromJsonFile);
  categoryFilter.addEventListener("change", filterQuotes);

  // --- Initialization ---
  loadQuotes();
  populateCategories();
  const lastViewed = sessionStorage.getItem("lastViewedQuote");
  if (lastViewed) {
    const parsedQuote = JSON.parse(lastViewed);
    displayQuotes.textContent = `${parsedQuote.text} - ${parsedQuote.category}`;
  }
});

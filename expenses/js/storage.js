// Load saved expenses, or return an empty list when none exist.
function loadExpenses() {
  var savedExpenses = localStorage.getItem("expenses");
  return savedExpenses ? JSON.parse(savedExpenses) : [];
}

// Save the current expenses in the browser.
function saveExpenses(expenses) {
  localStorage.setItem("expenses", JSON.stringify(expenses));
}


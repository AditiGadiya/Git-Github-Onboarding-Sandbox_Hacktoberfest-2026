var expenses = loadExpenses();
var expenseForm = document.getElementById("expense-form");
var descriptionInput = document.getElementById("expense-description");
var amountInput = document.getElementById("expense-amount");
var amountError = document.getElementById("amount-error");
var expenseList = document.getElementById("expense-list");
var expenseTotal = document.getElementById("expense-total");
var expenseCount = document.getElementById("expense-count");
var emptyMessage = document.getElementById("empty-message");

// Build one list item for an expense.
function createExpenseElement(expense, index) {
  var item = document.createElement("li");
  item.className = "expense-item";
  item.append(createExpenseDetails(expense), createDeleteButton(index));
  return item;
}

// Build the description and amount for an expense.
function createExpenseDetails(expense) {
  var details = document.createElement("span");
  var amount = document.createElement("strong");
  details.className = "expense-description";
  amount.className = "expense-amount";
  details.textContent = expense.description + " ";
  amount.textContent = formatAmount(expense.amount);
  details.appendChild(amount);
  return details;
}

// Build a delete button for an expense.
function createDeleteButton(index) {
  var button = document.createElement("button");
  button.className = "delete-button";
  button.dataset.index = index;
  button.textContent = "Delete";
  return button;
}

// Format a number as a rupee amount.
function formatAmount(amount) {
  return "₹" + Number(amount).toFixed(2);
}

// Calculate the running total of all expenses.
function calculateTotal() {
  return expenses.reduce(function (total, expense) {
    return total + Number(expense.amount);
  }, 0);
}

// Draw expenses, total, count and the empty state.
function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach(function (expense, index) {
    expenseList.appendChild(createExpenseElement(expense, index));
  });
  expenseTotal.textContent = formatAmount(calculateTotal());
  var count= expenses.length;
  expenseCount.textContent=
  count+(count===1?" expense":" expenses");
  emptyMessage.hidden = expenses.length > 0;
}

// Add a new expense from the form inputs.
function addExpense(event) {
  event.preventDefault();
  var description = descriptionInput.value.trim();
  var amountValue = amountInput.value.trim();
  var amount = Number(amountValue);
  // Validate the amount before adding or saving an expense.
    // Validate the amount before adding or saving an expense.
    if (!description) {
        amountError.textContent = "Please enter an expense description.";
        amountError.hidden = false;
        return; }
    if (amountValue === "") {
        amountError.textContent = "Please enter an amount.";
        amountError.hidden = false;
        return;}
    if (!/^\d+(\.\d+)?$/.test(amountValue)) {
        amountError.textContent = "Please enter a valid number (e.g. 49.50).";
        amountError.hidden = false;
        return;}
    if (!Number.isFinite(amount)) {
        amountError.textContent = "The amount must be a valid number.";
        amountError.hidden = false;
        return;}
    if (amount < 0) {
        amountError.textContent = "Negative amounts are not allowed.";
        amountError.hidden = false;
        return;}
    if (amount === 0) {
        amountError.textContent = "The amount must be greater than zero.";
        amountError.hidden = false;
        return;}
    amountInput.removeAttribute("aria-invalid");
    expenses.push({
        description: description,
        amount: amount
    });
    saveExpenses(expenses);
    // Clear the error only after a successful addition.
    amountError.hidden = true;
    amountInput.removeAttribute("aria-invalid");
  expenseForm.reset();
  renderExpenses();
  descriptionInput.focus();
}

// Delete one expense and save the updated list.
function deleteExpense(index) {
  expenses.splice(index, 1);
  saveExpenses(expenses);
  renderExpenses();
}

// Handle delete clicks from the expense list.
function handleExpenseListClick(event) {
  if (event.target.className !== "delete-button") { return; }
  deleteExpense(Number(event.target.dataset.index));
}

// Connect controls and render saved expenses on page load.
function initializeApp() {
  expenseForm.addEventListener("submit", addExpense);
  expenseList.addEventListener("click", handleExpenseListClick);
  renderExpenses();
}

initializeApp();
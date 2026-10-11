var expenses = loadExpenses();
var expenseForm = document.getElementById("expense-form");
var descriptionInput = document.getElementById("expense-description");
var amountInput = document.getElementById("expense-amount");
var expenseList = document.getElementById("expense-list");
var expenseTotal = document.getElementById("expense-total");
var emptyMessage = document.getElementById("empty-message");
var deleteAllBtn=document.getElementById("delete-all");
// Build one list item for an expense.
function createExpenseElement(expense, index){
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

// Draw expenses, total, and the empty state.
function renderExpenses() {
  expenseList.innerHTML = "";
  expenses.forEach(function (expense, index) {
    expenseList.appendChild(createExpenseElement(expense, index));
  });
  expenseTotal.textContent = formatAmount(calculateTotal());
  emptyMessage.hidden = expenses.length > 0;
  deleteAllBtn.hidden = expenses.length === 0;
}

// Add a new expense from the form inputs.
function addExpense(event) {
  event.preventDefault();
  var description = descriptionInput.value.trim();
  var amount = Number(amountInput.value);
  if (!description || amount <= 0) { return; }
  expenses.push({ description: description, amount: amount });
  saveExpenses(expenses);
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

//delete all expenses and set total to 0.0
function deleteAll(){
  expenses = [];
   localStorage.removeItem("expenses");
   renderExpenses();
}
// Connect controls and render saved expenses on page load.
function initializeApp() {
  expenseForm.addEventListener("submit", addExpense);
  expenseList.addEventListener("click", handleExpenseListClick);
  deleteAllBtn.addEventListener("click",deleteAll);
  renderExpenses();
}

initializeApp();
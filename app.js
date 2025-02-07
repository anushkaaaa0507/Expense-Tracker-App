const form = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const expenseList = document.getElementById('expense-list');

window.onload = function () {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.forEach(expense => displayExpense(expense));
};

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const description = descriptionInput.value;
  const amount = amountInput.value;
  const category = categoryInput.value;

  if (description && amount && category) {
    const expense = {
      id: Date.now(),
      description,
      amount,
      category
    };
    saveExpenseToLocalStorage(expense);
    displayExpense(expense);
    form.reset();
  }
});

function saveExpenseToLocalStorage(expense) {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expense);
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

function displayExpense(expense) {
  const li = document.createElement('li');
  li.className = 'list-group-item d-flex justify-content-between align-items-center';
  li.dataset.id = expense.id;
  li.innerHTML = `
    ${expense.description} - $${expense.amount} [${expense.category}]
    <div>
      <button class="btn btn-warning btn-sm me-2 edit-btn">Edit</button>
      <button class="btn btn-danger btn-sm delete-btn">Delete</button>
    </div>
  `;
  expenseList.appendChild(li);

  li.querySelector('.delete-btn').addEventListener('click', () => deleteExpense(expense.id, li));
  li.querySelector('.edit-btn').addEventListener('click', () => editExpense(expense.id));
}

function deleteExpense(id, listItem) {
  listItem.remove();
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const updatedExpenses = expenses.filter(expense => expense.id !== id);
  localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
}

function editExpense(id) {
  const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  const expenseToEdit = expenses.find(expense => expense.id === id);

  if (expenseToEdit) {
    descriptionInput.value = expenseToEdit.description;
    amountInput.value = expenseToEdit.amount;
    categoryInput.value = expenseToEdit.category;
    deleteExpense(id, document.querySelector([data-id='${id}']));
  }
}

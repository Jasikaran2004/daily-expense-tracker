document.getElementById('expense-form').addEventListener('submit', addExpense);

function addExpense(e) {
    e.preventDefault();
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const date = document.getElementById('date').value;

    const expense = { amount, description, date };

    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    displayExpenses();
    document.getElementById('expense-form').reset();
}

function displayExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const today = new Date().toISOString().split('T')[0];

    const list = document.getElementById('expense-list');
    list.innerHTML = '';

    let total = 0;
    expenses.forEach(exp => {
        if (exp.date === today) {
            const li = document.createElement('li');
            li.textContent = `${exp.description} : ₹${exp.amount}`;
            list.appendChild(li);
            total += parseFloat(exp.amount);
        }
    });

    document.getElementById('total').textContent = total.toFixed(2);
}

// Initial load
displayExpenses();

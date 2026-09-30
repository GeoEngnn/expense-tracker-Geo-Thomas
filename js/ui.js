function renderTransactions(transactions) {
    const transactionList = document.getElementById("transaction-list");
    const emptyState = document.getElementById("empty-state");

    transactionList.innerHTML = "";

    if (transactions.length === 0) {
        emptyState.hidden = false;
        return;
    }

    emptyState.hidden = true;

    transactions.forEach(transaction => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${transaction.type}</td>
            <td>${transaction.category}</td>
            <td>₹${transaction.amount.toFixed(2)}</td>
            <td>${transaction.date}</td>
            <td>${transaction.description}</td>
            <td>
                <button type="button" class="edit-button" data-id="${transaction.id}">
                    Edit
                </button>
                <button type="button" class="delete-button" data-id="${transaction.id}">
                    Delete
                </button>
            </td>
        `;

        transactionList.appendChild(row);
    });
}


function updateSummary(income, expenses, balance) {
    document.getElementById("total-income").textContent =
        `₹${income.toFixed(2)}`;

    document.getElementById("total-expenses").textContent =
        `₹${expenses.toFixed(2)}`;

    document.getElementById("current-balance").textContent =
        `₹${balance.toFixed(2)}`;
}


function clearForm() {
    const form = document.getElementById("transaction-form");

    form.reset();

    clearValidationErrors();

    document.getElementById("form-title").textContent =
        "Add Transaction";

    document.getElementById("submit-button").textContent =
        "Add Transaction";

    document.getElementById("cancel-edit-button").hidden = true;
}


function populateForm(transaction) {
    document.getElementById("transaction-type").value =
        transaction.type;

    document.getElementById("amount").value =
        transaction.amount;

    document.getElementById("category").value =
        transaction.category;

    document.getElementById("date").value =
        transaction.date;

    document.getElementById("description").value =
        transaction.description;

    document.getElementById("form-title").textContent =
        "Edit Transaction";

    document.getElementById("submit-button").textContent =
        "Update Transaction";

    document.getElementById("cancel-edit-button").hidden = false;

    clearValidationErrors();
}


function displayValidationErrors(errors) {
    clearValidationErrors();

    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}-error`);

        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    });
}


function clearValidationErrors() {
    const errorElements =
        document.querySelectorAll(".error-message");

    errorElements.forEach(element => {
        element.textContent = "";
    });
}


function updateMonthlySummary(income, expenses, balance) {
    document.getElementById("monthly-income").textContent =
        `₹${income.toFixed(2)}`;

    document.getElementById("monthly-expenses").textContent =
        `₹${expenses.toFixed(2)}`;

    document.getElementById("monthly-balance").textContent =
        `₹${balance.toFixed(2)}`;
}
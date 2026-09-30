export function renderTransactions(transactions) {

    const transactionList =
        document.getElementById("transaction-list");

    const emptyState =
        document.getElementById("empty-state");


    transactionList.innerHTML = "";


    if (transactions.length === 0) {

        emptyState.hidden = false;

        return;
    }


    emptyState.hidden = true;


    transactions.forEach(transaction => {

        const row =
            document.createElement("tr");


        const typeCell =
            document.createElement("td");

        typeCell.textContent =
            transaction.type;


        const categoryCell =
            document.createElement("td");

        categoryCell.textContent =
            transaction.category;


        const amountCell =
            document.createElement("td");

        amountCell.textContent =
            `₹${transaction.amount.toFixed(2)}`;


        const dateCell =
            document.createElement("td");

        dateCell.textContent =
            transaction.date;


        const descriptionCell =
            document.createElement("td");

        descriptionCell.textContent =
            transaction.description;


        const actionsCell =
            document.createElement("td");


        const editButton =
            document.createElement("button");

        editButton.type = "button";
        editButton.className = "edit-button";
        editButton.dataset.id = transaction.id;
        editButton.textContent = "Edit";


        const deleteButton =
            document.createElement("button");

        deleteButton.type = "button";
        deleteButton.className = "delete-button";
        deleteButton.dataset.id = transaction.id;
        deleteButton.textContent = "Delete";


        actionsCell.appendChild(editButton);

        actionsCell.appendChild(deleteButton);


        row.appendChild(typeCell);
        row.appendChild(categoryCell);
        row.appendChild(amountCell);
        row.appendChild(dateCell);
        row.appendChild(descriptionCell);
        row.appendChild(actionsCell);


        transactionList.appendChild(row);
    });
}


export function updateSummary(income, expenses, balance) {
    document.getElementById("total-income").textContent =
        `₹${income.toFixed(2)}`;

    document.getElementById("total-expenses").textContent =
        `₹${expenses.toFixed(2)}`;

    document.getElementById("current-balance").textContent =
        `₹${balance.toFixed(2)}`;
}


export function clearForm() {
    const form = document.getElementById("transaction-form");

    form.reset();

    clearValidationErrors();

    document.getElementById("form-title").textContent =
        "Add Transaction";

    document.getElementById("submit-button").textContent =
        "Add Transaction";

    document.getElementById("cancel-edit-button").hidden = true;
}


export function populateForm(transaction) {
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


export function displayValidationErrors(errors) {
    clearValidationErrors();

    Object.keys(errors).forEach(field => {
        const errorElement = document.getElementById(`${field}-error`);

        if (errorElement) {
            errorElement.textContent = errors[field];
        }
    });
}


export function clearValidationErrors() {
    const errorElements =
        document.querySelectorAll(".error-message");

    errorElements.forEach(element => {
        element.textContent = "";
    });
}


export function updateMonthlySummary(income, expenses, balance) {
    document.getElementById("monthly-income").textContent =
        `₹${income.toFixed(2)}`;

    document.getElementById("monthly-expenses").textContent =
        `₹${expenses.toFixed(2)}`;

    document.getElementById("monthly-balance").textContent =
        `₹${balance.toFixed(2)}`;
}

let expenseChart = null;


export function renderExpenseChart(categoryTotals) {

    const canvas =
        document.getElementById("expense-chart");

    if (!canvas) {
        return;
    }


    const labels =
        Object.keys(categoryTotals);

    const values =
        Object.values(categoryTotals);


    if (expenseChart) {
        expenseChart.destroy();
    }


    expenseChart = new Chart(canvas, {
        type: "doughnut",

        data: {
            labels: labels,

            datasets: [
                {
                    label: "Expenses",
                    data: values
                }
            ]
        },

        options: {
            responsive: true,

            maintainAspectRatio: false,

            plugins: {
                legend: {
                    position: "bottom"
                }
            }
        }
    });
}
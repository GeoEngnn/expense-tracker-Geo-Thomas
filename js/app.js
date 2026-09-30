import {
    transactions,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    getFilteredTransactions,
    calculateTotalIncome,
    calculateTotalExpenses,
    calculateBalance
} from "./transactions.js";


import {
    getTransactions as getStoredTransactions,
    saveTransactions
} from "./storage.js";


import {
    validateTransaction
} from "./validation.js";


import {
    renderTransactions,
    updateSummary,
    clearForm,
    populateForm,
    displayValidationErrors,
    updateMonthlySummary,
    renderExpenseChart
} from "./ui.js";


let editingTransactionId = null;

const transactionForm =
    document.getElementById("transaction-form");

const typeFilter =
    document.getElementById("type-filter");

const categoryFilter =
    document.getElementById("category-filter");

const cancelEditButton =
    document.getElementById("cancel-edit-button");

const summaryMonth =
    document.getElementById("summary-month");

function initializeApp() {

    const storedTransactions = getStoredTransactions();

    transactions.push(...storedTransactions);

    setDefaultMonth();

    refreshUI();
}

function handleFormSubmit(event) {

    event.preventDefault();

    const formData = new FormData(transactionForm);

    const transactionData = {
        type: formData.get("type"),
        amount: formData.get("amount"),
        category: formData.get("category"),
        date: formData.get("date"),
        description: formData.get("description").trim()
    };


    const validationResult =
        validateTransaction(transactionData);


    if (!validationResult.isValid) {

        displayValidationErrors(
            validationResult.errors
        );

        return;
    }


    transactionData.amount =
        Number(transactionData.amount);


    if (editingTransactionId !== null) {

        updateTransaction(
            editingTransactionId,
            transactionData
        );

        editingTransactionId = null;

    } else {

        const newTransaction = {
            id: Date.now(),
            ...transactionData
        };

        addTransaction(newTransaction);
    }


    saveTransactions(transactions);

    clearForm();

    refreshUI();
}

function handleEdit(event) {

    const editButton =
        event.target.closest(".edit-button");

    if (!editButton) {
        return;
    }


    const id =
        Number(editButton.dataset.id);


    const transaction =
        transactions.find(
            transaction => transaction.id === id
        );


    if (!transaction) {
        return;
    }


    editingTransactionId = id;

    populateForm(transaction);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function handleDelete(event) {

    const deleteButton =
        event.target.closest(".delete-button");

    if (!deleteButton) {
        return;
    }


    const id =
        Number(deleteButton.dataset.id);


    const confirmed =
        window.confirm(
            "Are you sure you want to delete this transaction?"
        );


    if (!confirmed) {
        return;
    }


    const deleted =
        deleteTransaction(id);


    if (deleted) {

        saveTransactions(transactions);

        refreshUI();
    }
}

function handleFilterChange() {

    const filteredTransactions =
        getFilteredTransactions(
            typeFilter.value,
            categoryFilter.value
        );


    renderTransactions(filteredTransactions);
}

function updateMonthlyData() {

    const selectedMonth =
        summaryMonth.value;


    if (!selectedMonth) {

        updateMonthlySummary(0, 0, 0);

        renderExpenseChart({});

        return;
    }


    const monthlyTransactions =
        transactions.filter(transaction =>
            transaction.date.startsWith(selectedMonth)
        );


    const monthlyIncome =
        monthlyTransactions
            .filter(transaction =>
                transaction.type === "income"
            )
            .reduce(
                (total, transaction) =>
                    total + transaction.amount,
                0
            );


    const monthlyExpenses =
        monthlyTransactions
            .filter(transaction =>
                transaction.type === "expense"
            )
            .reduce(
                (total, transaction) =>
                    total + transaction.amount,
                0
            );


    const monthlyBalance =
        monthlyIncome - monthlyExpenses;


    const categoryTotals = {};


    monthlyTransactions
        .filter(transaction =>
            transaction.type === "expense"
        )
        .forEach(transaction => {

            if (!categoryTotals[transaction.category]) {
                categoryTotals[transaction.category] = 0;
            }

            categoryTotals[transaction.category] +=
                transaction.amount;
        });


    updateMonthlySummary(
        monthlyIncome,
        monthlyExpenses,
        monthlyBalance
    );


    renderExpenseChart(categoryTotals);
}

function setDefaultMonth() {

    const today = new Date();

    const year =
        today.getFullYear();

    const month =
        String(today.getMonth() + 1)
            .padStart(2, "0");


    summaryMonth.value =
        `${year}-${month}`;
}

function refreshUI() {

    const filteredTransactions =
        getFilteredTransactions(
            typeFilter.value,
            categoryFilter.value
        );


    renderTransactions(
        filteredTransactions
    );


    const totalIncome =
        calculateTotalIncome();


    const totalExpenses =
        calculateTotalExpenses();


    const balance =
        calculateBalance();


    updateSummary(
        totalIncome,
        totalExpenses,
        balance
    );


    updateMonthlyData();
}

transactionForm.addEventListener(
    "submit",
    handleFormSubmit
);


typeFilter.addEventListener(
    "change",
    handleFilterChange
);


categoryFilter.addEventListener(
    "change",
    handleFilterChange
);


cancelEditButton.addEventListener(
    "click",
    () => {

        editingTransactionId = null;

        clearForm();
    }
);


document
    .getElementById("transaction-list")
    .addEventListener(
        "click",
        event => {

            handleEdit(event);
            handleDelete(event);
        }
    );


summaryMonth.addEventListener(
    "change",
    updateMonthlyData
);

initializeApp();
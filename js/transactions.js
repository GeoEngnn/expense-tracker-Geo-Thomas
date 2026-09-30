let transactions = [];


function addTransaction(transaction) {
    transactions.push(transaction);

    return transaction;
}


function updateTransaction(id, updatedData) {
    const transactionIndex = transactions.findIndex(
        transaction => transaction.id === id
    );

    if (transactionIndex === -1) {
        return null;
    }

    transactions[transactionIndex] = {
        ...transactions[transactionIndex],
        ...updatedData
    };

    return transactions[transactionIndex];
}


function deleteTransaction(id) {
    const transactionIndex = transactions.findIndex(
        transaction => transaction.id === id
    );

    if (transactionIndex === -1) {
        return false;
    }

    transactions.splice(transactionIndex, 1);

    return true;
}


function getTransactions() {
    return transactions;
}


function getFilteredTransactions(type = "all", category = "all") {
    return transactions.filter(transaction => {

        const matchesType =
            type === "all" || transaction.type === type;

        const matchesCategory =
            category === "all" || transaction.category === category;

        return matchesType && matchesCategory;
    });
}


function calculateTotalIncome() {
    return transactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);
}


function calculateTotalExpenses() {
    return transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);
}


function calculateBalance() {
    return calculateTotalIncome() - calculateTotalExpenses();
}
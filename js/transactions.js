export let transactions = [];


export function addTransaction(transaction) {
    transactions.push(transaction);

    return transaction;
}


export function updateTransaction(id, updatedData) {
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


export function deleteTransaction(id) {
    const transactionIndex = transactions.findIndex(
        transaction => transaction.id === id
    );

    if (transactionIndex === -1) {
        return false;
    }

    transactions.splice(transactionIndex, 1);

    return true;
}


export function getTransactions() {
    return transactions;
}


export function getFilteredTransactions(type = "all", category = "all") {
    return transactions.filter(transaction => {

        const matchesType =
            type === "all" || transaction.type === type;

        const matchesCategory =
            category === "all" || transaction.category === category;

        return matchesType && matchesCategory;
    });
}


export function calculateTotalIncome() {
    return transactions
        .filter(transaction => transaction.type === "income")
        .reduce((total, transaction) => total + transaction.amount, 0);
}


export function calculateTotalExpenses() {
    return transactions
        .filter(transaction => transaction.type === "expense")
        .reduce((total, transaction) => total + transaction.amount, 0);
}


export function calculateBalance() {
    return calculateTotalIncome() - calculateTotalExpenses();
}
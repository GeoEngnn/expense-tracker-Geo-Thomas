const STORAGE_KEY = "expenseTrackerTransactions";


function getTransactions() {
    const storedTransactions = localStorage.getItem(STORAGE_KEY);

    if (!storedTransactions) {
        return [];
    }

    try {
        return JSON.parse(storedTransactions);
    } catch (error) {
        console.error("Unable to read transactions from Local Storage:", error);
        return [];
    }
}


function saveTransactions(transactions) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
    );
}


function clearTransactions() {
    localStorage.removeItem(STORAGE_KEY);
}
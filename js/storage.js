const STORAGE_KEY = "expenseTrackerTransactions";


export function getTransactions() {
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


export function saveTransactions(transactions) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(transactions)
    );
}


export function clearTransactions() {
    localStorage.removeItem(STORAGE_KEY);
}
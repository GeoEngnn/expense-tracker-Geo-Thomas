export function validateTransaction(data) {

    const errors = {};

    if (data.type !== "income" && data.type !== "expense") {
        errors.type = "Please select a valid transaction type.";
    }

    if (data.amount === "" || data.amount === null || data.amount === undefined) {

        errors.amount = "Amount is required.";

    } else if (isNaN(data.amount)) {

        errors.amount = "Amount must be a valid number.";

    } else if (Number(data.amount) < 0.5) {

    errors.amount = "Amount must be at least ₹0.50.";

    } else if (Number(data.amount) % 0.5 !== 0) {

    errors.amount = "Amount must be in increments of ₹0.50.";

    }

    if (!data.category || data.category.trim() === "") {
        errors.category = "Please select a category.";
    }

    if (!data.date || data.date.trim() === "") {
        errors.date = "Date is required.";
    }

    if (!data.description || data.description.trim() === "") {
        errors.description = "Description is required.";
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}
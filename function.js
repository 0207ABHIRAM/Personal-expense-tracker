document.addEventListener("DOMContentLoaded", function () {
    updateExpenseList();
});
let expenses = [];
let currency = "₹";

// Function to update total amount
function updateTotal() {
    let total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    document.getElementById("totalAmount").textContent = `${currency}${total.toFixed(2)}`;
}

// Function to display expenses
function displayExpenses() {
    const expenseList = document.getElementById("expenseList");
    expenseList.innerHTML = "";

    expenses.forEach((expense, index) => {
        const listItem = document.createElement("li");
        listItem.classList.add("expense-item");

        // Expense details
        listItem.innerHTML = `
            <span>${expense.date} | ${expense.category} | ${currency}${expense.amount.toFixed(2)}</span>
            <button class="edit-btn" onclick="editExpense(${index})">Edit</button>
            <button class="delete-btn" onclick="deleteExpense(${index})">Delete</button>
        `;

        expenseList.appendChild(listItem);
    });

    updateTotal();
}
function addExpense() {
    let date = document.getElementById("date").value;
    let category = document.getElementById("category").value;
    let amount = document.getElementById("amount").value;

    if (!date || !category || !amount) {
        alert("Please fill all fields!");
        return;
    }

    amount = parseFloat(amount);
    if (amount > 1000000) {
        alert("Amount entered is high. Just for recheck.");
    }

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    expenses.unshift({ date, category, amount }); // Reverse order (latest first)
    localStorage.setItem("expenses", JSON.stringify(expenses));

    document.getElementById("date").value = "";
    document.getElementById("category").value = "";
    document.getElementById("amount").value = "";

    updateExpenseList();
    alert("Expense added successfully!");
}

function updateExpenseList() {
    let list = document.getElementById("expenseList");
    list.innerHTML = "";

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = 0;

    expenses.forEach((expense, index) => {
        let li = document.createElement("li");
        li.className = "expense-item";

        li.innerHTML = `
            <div id="expense-view-${index}" class="expense-view">
                <span>${expense.date} | ${expense.category} | ₹${parseFloat(expense.amount).toFixed(2)}</span>
                <button class="edit" onclick="toggleEdit(${index})">Edit</button>
                <button class="delete" onclick="deleteExpense(${index})">Delete</button>
            </div>

            <div id="expense-edit-${index}" class="hidden">
                <input type="date" id="edit-date-${index}" value="${expense.date}">
                <input type="text" id="edit-category-${index}" value="${expense.category}">
                <input type="number" id="edit-amount-${index}" value="${expense.amount}" min="1" max="1000000">
                <br>
                <button class="save" onclick="saveExpense(${index})">Save</button>
                <button class="cancel" onclick="cancelEdit(${index})">Cancel</button>
            </div>
        `;

        list.appendChild(li);
        total += parseFloat(expense.amount);
    });

    document.getElementById("totalAmount").textContent = `₹${total.toFixed(2)}`;
}

// Function to toggle between view and edit mode
function toggleEdit(index) {
    document.getElementById(`expense-view-${index}`).style.display = "none";
    document.getElementById(`expense-edit-${index}`).style.display = "block";
}

// Function to save edited expense
function saveExpense(index) {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    let newDate = document.getElementById(`edit-date-${index}`).value;
    let newCategory = document.getElementById(`edit-category-${index}`).value;
    let newAmount = parseFloat(document.getElementById(`edit-amount-${index}`).value);

    if (!newDate || !newCategory || isNaN(newAmount) || newAmount <= 0) {
        alert("Please enter valid values!");
        return;
    }

    expenses[index] = { date: newDate, category: newCategory, amount: newAmount };
    localStorage.setItem("expenses", JSON.stringify(expenses));

    updateExpenseList();
}

// Function to cancel editing
function cancelEdit(index) {
    document.getElementById(`expense-view-${index}`).style.display = "block";
    document.getElementById(`expense-edit-${index}`).style.display = "none";
}

// Function to delete an expense
function deleteExpense(index) {
    if (confirm("Are you sure you want to delete this expense?")) {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateExpenseList();
    }
}


function downloadCSV() {
    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

    if (expenses.length === 0) {
        alert("No expenses recorded yet!");
        return;
    }

    let csvContent = "Date,Category,Amount\n";
    expenses.forEach(exp => {
        csvContent += `${exp.date},${exp.category},${exp.amount}\n`;
    });

    let blob = new Blob([csvContent], { type: "text/csv" });
    let link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "expenses.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showSection(sectionId) {
    document.querySelectorAll(".section").forEach(section => section.style.display = "none");
    document.getElementById(sectionId).style.display = "block";
}






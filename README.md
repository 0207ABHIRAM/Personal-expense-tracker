📌 Expense Tracker - README 

📖 Overview
The EXPENSE TRACKER is a web-based application that helps users efficiently ADD,EDIT AND DELETE their daily expenses. It features a user-friendly interface, real-time data storage in LOCALSTORAGE, and CSV export functionality.  

🚀 Features
✅ Add Expenses – Users can input date, category, and amount of expenses.  
✅ Edit/Delete Expenses – Modify or remove previously added expenses.  
✅ Live Total Calculation – Automatically updates the total expense.  
✅ Persistent Storage – Uses localStorage to retain expenses even after refreshing.  
✅ CSV Export – Download expenses as a CSV file for record-keeping.  
✅ Custom Styling – Modern, responsive UI for better usability.  

📂 Project Structure*

Expense-Tracker/ │── index.html         # Main HTML file 
                 │── styles.css         # Custom CSS styling 
                 │── script.js          # Core JavaScript logic 

🛠 Installation & Setup

 1. Clone the Repository: git clone https://github.com/your-repo/expense-tracker.git
                          cd expense-tracker
 2. Open in Browser
 
 Simply open index.html in a browser. No additional setup required.


📜 Usage Guide

1️⃣ Adding an Expense
1. Click on "Add Expense"
2. Enter the date, category, and amount
3. Click "Save"

2️⃣ Editing an Expense
1. Click on "Edit" next to an expense
2. Modify the details and click "Save"

3️⃣ Deleting an Expense
Click the "Delete" button next to any expense to remove it permanently.

4️⃣ Exporting to CSV
Click "Download CSV" to save all expenses in a spreadsheet-compatible format.


💻 Technologies Used : HTML, CSS, JAVASCRIPT


🎨 UI Design Overview

📌 Styling Highlights
✅ Inputs are stacked for better readability
✅ Buttons are responsive and color-coded
✅ Simple yet effective layout for all screen sizes

⚡ Code Snippets

🔹JavaScript - Update Expense List
  function updateExpenseList() {
    let list = document.getElementById("expenseList");
    list.innerHTML = "";

    let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
    let total = 0;

    expenses.forEach((expense, index) => {
        let li = document.createElement("li");
        li.innerHTML = `
            <span>${expense.date} | ${expense.category} | ₹${expense.amount.toFixed(2)}</span>
            <button onclick="editExpense(${index})">Edit</button>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
        list.appendChild(li);
        total += expense.amount;
    });

    document.getElementById("totalAmount").textContent = ₹${total.toFixed(2)};
}

📌 Future Enhancements
✅ Multi-Currency Support (₹, $, €)
✅ Cloud Database Integration (Firebase, MongoDB)
✅ User Authentication (Login/Register)
✅ Advanced Analytics & Graphs

📞 Contact & Support
For issues or feature requests, open a GitHub issue or contact:
🌍 GitHub: https://github.com//expense-tracker

📜 License
This project is open-source under the MIT License. Feel free to modify and distribute it. 🚀

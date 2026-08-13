# 💰 ExpenseFlow

A modern, bilingual personal finance tracker with **dark mode, calendar view, analytics, and multi-currency support**.

**🌐 Live Demo:** [ExpenseFlow](https://jimmy001bro.github.io/ExpenseFlow/)

---

## ✨ Features

### 🎯 Core Features

* **Dashboard** — Overview of balance, income, expenses, and savings rate
* **Transaction Management** — Add, view, search, filter, edit, and delete transactions
* **Charts** — Visual spending breakdown and income vs. expenses
* **Analytics** — Monthly summaries and top spending categories
* **Local Storage** — Data persists after browser refresh
* **Responsive Design** — Works across desktop, tablet, and mobile devices

### 🌟 Version 3.0

#### 🌐 Bilingual Support

* Switch between **English** and **Persian (Farsi)**
* Full **RTL (Right-to-Left)** layout support
* Translated labels, categories, messages, and interface elements

#### 🌙 Dark Mode

* Toggle between light and dark themes
* Optimized contrast for readability
* Consistent styling across the application
* System preference detection

#### 📅 Calendar View

* Monthly calendar displaying transaction indicators
* Click a date to view that day's transactions
* Navigate between months
* View transaction totals for individual days

#### 💰 Multi-Currency Support

* **USD ($)** — US Dollar
* **EUR (€)** — Euro
* **IRR (﷼)** — Iranian Rial
* Each transaction stores its own currency
* Smart default currency detection

#### 📊 Advanced Features

* **Edit Transactions** — Modify existing transactions
* **Number Formatting** — Supports English and Persian number formatting
* **Import CSV** — Import multiple transactions from CSV files
* **Export CSV** — Download transaction data as CSV
* **Export PDF** — Generate print-ready PDF reports

#### 🎨 UI/UX Improvements

* Modern fintech-inspired interface
* Smooth animations and transitions
* Accessible color palette
* Clear visual hierarchy

---
## 🔒 Privacy & Data Security

### How Your Data is Handled
- ✅ **100% Local Storage** - All data stays in your browser
- ✅ **No Cloud Sync** - Data never leaves your device
- ✅ **No Tracking** - No analytics, no cookies, no tracking pixels
- ✅ **No Data Collection** - We don't collect, store, or sell anything

### User Responsibility
- You are responsible for backing up your data
- Clearing browser data will delete your transactions
- Export your data regularly using CSV/PDF export

### Disclaimer
This application is provided for informational and organizational purposes only. 
It is not financial advice. Always consult a qualified financial professional for 
financial decisions.

### Third-Party Services
This app uses these external resources (no data is sent to them):
- Chart.js (CDN) - For charts
- Font Awesome (CDN) - For icons
- Google Fonts (CDN) - For typography


## 🚀 Getting Started

### Option 1: Live Demo

You can use ExpenseFlow directly in your browser:

**[Open ExpenseFlow →](https://jimmy001bro.github.io/ExpenseFlow/)**

### Option 2: Run Locally

#### 1. Clone the repository

```bash
git clone https://github.com/Jimmy001bro/ExpenseFlow.git
cd ExpenseFlow
```

#### 2. Open the application

Open `index.html` directly in your browser.

No server, package manager, or additional dependencies are required.

#### 3. Start tracking your finances

Your data is stored locally in your browser using Local Storage.

---

## 🛠️ Technologies

* **HTML5** — Semantic markup
* **CSS3** — Custom properties, Flexbox, Grid, and RTL support
* **Vanilla JavaScript** — ES6+ application logic
* **Chart.js** — Responsive charts and data visualization
* **Font Awesome** — Interface icons
* **Google Fonts**

  * Inter for English
  * Vazirmatn for Persian

---

## 🎯 Usage Guide

### Adding a Transaction

1. Click **Add Transaction**
2. Select **Income** or **Expense**
3. Enter:

   * Description
   * Amount
   * Currency
   * Category
   * Date
4. Click **Add Transaction**

### Editing a Transaction

1. Find the transaction you want to modify
2. Click the **✏️ Edit** button
3. Modify the required fields
4. Click **Edit Transaction** to save

### Searching & Filtering

Use the search and filter controls to find specific transactions.

You can filter by:

* Description
* Category
* Transaction type
* Income or expense

### Calendar View

1. Open **Calendar** from the navigation
2. Navigate between months using the arrow buttons
3. Select a date with a transaction indicator
4. View the transactions for that day

### Dark Mode

Click the **🌙 / ☀️** button in the sidebar to switch between light and dark themes.

Your preference is saved in your browser.

### Switching Languages

Click the **🌐** button in the sidebar to switch between English and Persian.

The interface updates automatically and supports RTL layout when Persian is selected.

### Import & Export

* **Import CSV** — Import transactions from a CSV file
* **Export CSV** — Download your transaction data as CSV
* **Export PDF** — Generate a print-ready financial report

---

## 📄 CSV Format

ExpenseFlow accepts CSV files using the following structure:

```csv
Type,Description,Amount,Currency,Category,Date
income,Salary,4850.00,$,salary,2024-01-15
expense,Groceries,234.67,$,food,2024-01-14
```

---

## 📁 Project Structure

```text
ExpenseFlow/
├── .github/
│   └── workflows/
│       └── static.yml          # GitHub Pages deployment workflow
├── index.html                  # Main HTML file
├── style.css                   # Application stylesheet
├── script.js                   # Application logic
└── README.md                   # Project documentation
```

---

## 🎨 Design Philosophy

ExpenseFlow focuses on keeping personal finance management **simple, clear, and accessible**.

* **Clean & Modern** — Fintech-inspired interface
* **Accessible** — Designed with readable contrast and clear hierarchy
* **Responsive** — Works across different screen sizes
* **Bilingual** — Full English and Persian support
* **Lightweight** — Built with vanilla JavaScript without heavy frameworks

---


## 📜 License

This project is open source and available under the **MIT License**.

See the [`LICENSE`](LICENSE) file for details.

---

## 🙏 Acknowledgments

* [Chart.js](https://www.chartjs.org/) — Data visualization
* [Font Awesome](https://fontawesome.com/) — Icons
* [Inter](https://fonts.google.com/specimen/Inter) — English typography
* [Vazirmatn](https://github.com/rastikerdar/vazirmatn) — Persian typography
* GitHub Pages — Hosting
* GitHub Actions — Deployment automation

---

## 📧 Contact

**Nima Ebrahimi**

* Email: [nima80ir@gmail.com](mailto:nima80ir@gmail.com)
* GitHub: [@Jimmy001bro](https://github.com/Jimmy001bro)

**Project Repository:**
[github.com/Jimmy001bro/ExpenseFlow](https://github.com/Jimmy001bro/ExpenseFlow)

---

Made with ❤️ by **Jimmy**

⭐ If you find ExpenseFlow useful, consider giving the repository a star!

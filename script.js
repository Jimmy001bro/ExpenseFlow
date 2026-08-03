// ============================================
// EXPENSE FLOW - Main Application
// ============================================

class ExpenseFlow {
    constructor() {
        this.transactions = [];
        this.currentView = 'dashboard';
        this.categoryChart = null;
        this.incomeExpenseChart = null;
        
        this.init();
    }
    
    // ==========================================
    // INITIALIZATION
    // ==========================================
    init() {
        this.loadFromStorage();
        this.setupEventListeners();
        this.setupDateDefault();
        this.renderAll();
        this.setupCharts();
        this.updateUI();
    }
    
    // ==========================================
    // LOCAL STORAGE
    // ==========================================
    loadFromStorage() {
        const data = localStorage.getItem('expenseFlowData');
        if (data) {
            try {
                this.transactions = JSON.parse(data);
            } catch {
                this.transactions = [];
            }
        } else {
            // Sample data for demo
            this.transactions = this.getSampleData();
        }
    }
    
    saveToStorage() {
        localStorage.setItem('expenseFlowData', JSON.stringify(this.transactions));
    }
    
    getSampleData() {
        const today = new Date();
        const getDate = (daysAgo) => {
            const d = new Date(today);
            d.setDate(d.getDate() - daysAgo);
            return d.toISOString().split('T')[0];
        };
        
        return [
            { id: Date.now() + 1, type: 'income', description: 'Salary', amount: 3500, category: 'other', date: getDate(0) },
            { id: Date.now() + 2, type: 'expense', description: 'Grocery shopping', amount: 156.72, category: 'food', date: getDate(1) },
            { id: Date.now() + 3, type: 'expense', description: 'Uber ride', amount: 24.50, category: 'transport', date: getDate(2) },
            { id: Date.now() + 4, type: 'expense', description: 'Netflix subscription', amount: 15.99, category: 'entertainment', date: getDate(3) },
            { id: Date.now() + 5, type: 'expense', description: 'New headphones', amount: 89.99, category: 'shopping', date: getDate(4) },
            { id: Date.now() + 6, type: 'income', description: 'Freelance project', amount: 450, category: 'other', date: getDate(5) },
            { id: Date.now() + 7, type: 'expense', description: 'Electric bill', amount: 78.34, category: 'bills', date: getDate(6) },
        ];
    }
    
    // ==========================================
    // EVENT LISTENERS
    // ==========================================
    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const view = item.dataset.view;
                this.switchView(view);
            });
        });
        
        // View all link
        document.querySelector('.view-all')?.addEventListener('click', (e) => {
            e.preventDefault();
            this.switchView('transactions');
        });
        
        // Modal
        document.getElementById('openAddModal')?.addEventListener('click', () => {
            this.openModal();
        });
        document.getElementById('closeModal')?.addEventListener('click', () => {
            this.closeModal();
        });
        document.querySelector('.modal')?.addEventListener('click', (e) => {
            if (e.target === e.currentTarget) this.closeModal();
        });
        
        // Type toggle
        document.querySelectorAll('.type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                document.getElementById('transactionType').value = btn.dataset.type;
            });
        });
        
        // Form submit
        document.getElementById('transactionForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });
        
        // Clear all data
        document.getElementById('clearAllData')?.addEventListener('click', () => {
            if (confirm('Delete all transaction data?')) {
                this.transactions = [];
                this.saveToStorage();
                this.renderAll();
                this.updateUI();
                this.setupCharts();
            }
        });
        
        // Search & filters
        document.getElementById('searchInput')?.addEventListener('input', () => this.renderTransactions());
        document.getElementById('categoryFilter')?.addEventListener('change', () => this.renderTransactions());
        document.getElementById('typeFilter')?.addEventListener('change', () => this.renderTransactions());
        
        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.closeModal();
            if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
                e.preventDefault();
                this.openModal();
            }
        });
    }
    
    // ==========================================
    // VIEW NAVIGATION
    // ==========================================
    switchView(view) {
        this.currentView = view;
        
        // Update nav
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === view);
        });
        
        // Update sections
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${view}View`)?.classList.add('active');
        
        // Update header
        const titles = {
            dashboard: { title: 'Dashboard', subtitle: 'Overview of your finances' },
            transactions: { title: 'Transactions', subtitle: 'Manage your transactions' },
            analytics: { title: 'Analytics', subtitle: 'Deep dive into your spending' }
        };
        const info = titles[view] || titles.dashboard;
        document.getElementById('pageTitle').textContent = info.title;
        document.getElementById('pageSubtitle').textContent = info.subtitle;
        
        // Refresh charts if switching to dashboard
        if (view === 'dashboard') {
            setTimeout(() => this.setupCharts(), 100);
        }
        if (view === 'analytics') {
            this.renderAnalytics();
        }
    }
    
    // ==========================================
    // MODAL
    // ==========================================
    openModal() {
        document.getElementById('addModal').classList.add('open');
        document.getElementById('transactionForm').reset();
        document.getElementById('transactionDate').value = new Date().toISOString().split('T')[0];
        document.querySelector('.type-btn[data-type="expense"]')?.click();
    }
    
    closeModal() {
        document.getElementById('addModal').classList.remove('open');
    }
    
    setupDateDefault() {
        const dateInput = document.getElementById('transactionDate');
        if (dateInput) {
            dateInput.value = new Date().toISOString().split('T')[0];
        }
    }
    
    // ==========================================
    // CRUD OPERATIONS
    // ==========================================
    addTransaction() {
        const type = document.getElementById('transactionType').value;
        const description = document.getElementById('transactionDescription').value.trim();
        const amount = parseFloat(document.getElementById('transactionAmount').value);
        const category = document.getElementById('transactionCategory').value;
        const date = document.getElementById('transactionDate').value;
        
        if (!description || !amount || !category || !date) {
            alert('Please fill in all fields.');
            return;
        }
        
        const transaction = {
            id: Date.now(),
            type,
            description,
            amount,
            category,
            date
        };
        
        this.transactions.unshift(transaction);
        this.saveToStorage();
        this.closeModal();
        this.renderAll();
        this.updateUI();
        this.setupCharts();
    }
    
    deleteTransaction(id) {
        if (!confirm('Delete this transaction?')) return;
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveToStorage();
        this.renderAll();
        this.updateUI();
        this.setupCharts();
    }
    
    // ==========================================
    // RENDER FUNCTIONS
    // ==========================================
    renderAll() {
        this.renderStats();
        this.renderRecentTransactions();
        this.renderTransactions();
        this.renderAnalytics();
    }
    
    renderStats() {
        const totalIncome = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const totalExpense = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        
        const balance = totalIncome - totalExpense;
        const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpense) / totalIncome * 100) : 0;
        
        document.getElementById('balanceDisplay').textContent = `$${balance.toFixed(2)}`;
        document.getElementById('incomeDisplay').textContent = `$${totalIncome.toFixed(2)}`;
        document.getElementById('expenseDisplay').textContent = `$${totalExpense.toFixed(2)}`;
        document.getElementById('savingsRateDisplay').textContent = `${savingsRate.toFixed(0)}%`;
    }
    
    renderRecentTransactions() {
        const container = document.getElementById('recentTransactionList');
        const recent = this.transactions.slice(0, 5);
        
        if (recent.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #9ca3af; padding: 40px 0;">No transactions yet.</p>';
            return;
        }
        
        container.innerHTML = recent.map(t => this.createTransactionHTML(t)).join('');
        
        // Attach delete events
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.deleteTransaction(parseInt(btn.dataset.id));
            });
        });
    }
    
    renderTransactions() {
        const container = document.getElementById('fullTransactionList');
        const search = document.getElementById('searchInput')?.value.toLowerCase() || '';
        const category = document.getElementById('categoryFilter')?.value || 'all';
        const type = document.getElementById('typeFilter')?.value || 'all';
        
        let filtered = this.transactions;
        
        if (search) {
            filtered = filtered.filter(t => 
                t.description.toLowerCase().includes(search)
            );
        }
        if (category !== 'all') {
            filtered = filtered.filter(t => t.category === category);
        }
        if (type !== 'all') {
            filtered = filtered.filter(t => t.type === type);
        }
        
        if (filtered.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #9ca3af; padding: 40px 0;">No transactions found.</p>';
            return;
        }
        
        container.innerHTML = filtered.map(t => this.createTransactionHTML(t)).join('');
        
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.deleteTransaction(parseInt(btn.dataset.id));
            });
        });
    }
    
    createTransactionHTML(transaction) {
        const isIncome = transaction.type === 'income';
        const icon = isIncome ? 'fa-arrow-up' : 'fa-arrow-down';
        const amountClass = isIncome ? 'income' : 'expense';
        const sign = isIncome ? '+' : '-';
        
        const categoryMap = {
            food: '🍔 Food',
            transport: '🚗 Transport',
            entertainment: '🎬 Entertainment',
            shopping: '🛍️ Shopping',
            bills: '📄 Bills',
            health: '💊 Health',
            education: '📚 Education',
            other: '📌 Other'
        };
        
        const date = new Date(transaction.date);
        const formattedDate = date.toLocaleDateString('en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        return `
            <div class="transaction-item">
                <div class="transaction-left">
                    <div class="transaction-icon ${transaction.type}">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="transaction-info">
                        <div class="transaction-description">${this.escapeHtml(transaction.description)}</div>
                        <div class="transaction-meta">
                            <span>${formattedDate}</span>
                            <span class="transaction-category">${categoryMap[transaction.category] || transaction.category}</span>
                        </div>
                    </div>
                </div>
                <div class="transaction-right">
                    <span class="transaction-amount ${amountClass}">${sign}$${transaction.amount.toFixed(2)}</span>
                    <button class="delete-btn" data-id="${transaction.id}">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // ==========================================
    // CHARTS
    // ==========================================
    setupCharts() {
        this.setupCategoryChart();
        this.setupIncomeExpenseChart();
    }
    
    setupCategoryChart() {
        const canvas = document.getElementById('categoryChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        const expenses = this.transactions.filter(t => t.type === 'expense');
        
        const categoryMap = {
            food: 'Food',
            transport: 'Transport',
            entertainment: 'Entertainment',
            shopping: 'Shopping',
            bills: 'Bills',
            health: 'Health',
            education: 'Education',
            other: 'Other'
        };
        
        const categories = {};
        expenses.forEach(t => {
            const cat = categoryMap[t.category] || t.category;
            categories[cat] = (categories[cat] || 0) + t.amount;
        });
        
        const labels = Object.keys(categories);
        const data = Object.values(categories);
        const colors = [
            '#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', 
            '#f59e0b', '#10b981', '#06b6d4', '#6b7280'
        ];
        
        if (this.categoryChart) {
            this.categoryChart.destroy();
        }
        
        if (data.length === 0) {
            this.categoryChart = new Chart(ctx, {
                type: 'doughnut',
                data: {
                    labels: ['No Data'],
                    datasets: [{
                        data: [1],
                        backgroundColor: ['#e5e7eb'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    }
                }
            });
            return;
        }
        
        this.categoryChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: colors.slice(0, labels.length),
                    borderWidth: 2,
                    borderColor: 'white'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            padding: 12,
                            font: {
                                size: 12,
                                family: 'Inter'
                            }
                        }
                    }
                },
                cutout: '65%'
            }
        });
    }
    
    setupIncomeExpenseChart() {
        const canvas = document.getElementById('incomeExpenseChart');
        if (!canvas) return;
        
        const ctx = canvas.getContext('2d');
        
        // Group by date (last 7 days)
        const today = new Date();
        const dates = [];
        const incomeData = [];
        const expenseData = [];
        
        for (let i = 6; i >= 0; i--) {
            const d = new Date(today);
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split('T')[0];
            dates.push(dateStr);
            
            const dayIncome = this.transactions
                .filter(t => t.type === 'income' && t.date === dateStr)
                .reduce((sum, t) => sum + t.amount, 0);
            const dayExpense = this.transactions
                .filter(t => t.type === 'expense' && t.date === dateStr)
                .reduce((sum, t) => sum + t.amount, 0);
            
            incomeData.push(dayIncome);
            expenseData.push(dayExpense);
        }
        
        const labels = dates.map(d => {
            const date = new Date(d);
            return date.toLocaleDateString('en-US', { weekday: 'short' });
        });
        
        if (this.incomeExpenseChart) {
            this.incomeExpenseChart.destroy();
        }
        
        this.incomeExpenseChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [
                    {
                        label: 'Income',
                        data: incomeData,
                        backgroundColor: '#10b981',
                        borderRadius: 6,
                        barPercentage: 0.35
                    },
                    {
                        label: 'Expenses',
                        data: expenseData,
                        backgroundColor: '#ef4444',
                        borderRadius: 6,
                        barPercentage: 0.35
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: true,
                        position: 'top',
                        labels: {
                            boxWidth: 12,
                            padding: 16,
                            font: {
                                size: 12,
                                family: 'Inter'
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        grid: {
                            color: 'rgba(0,0,0,0.05)'
                        },
                        ticks: {
                            callback: (value) => `$${value}`
                        }
                    },
                    x: {
                        grid: {
                            display: false
                        }
                    }
                }
            }
        });
    }
    
    // ==========================================
    // ANALYTICS
    // ==========================================
    renderAnalytics() {
        const totalIncome = this.transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0);
        const totalExpense = this.transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0);
        const net = totalIncome - totalExpense;
        
        // Average daily expense (last 30 days)
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        const thirtyDaysStr = thirtyDaysAgo.toISOString().split('T')[0];
        
        const recentExpenses = this.transactions
            .filter(t => t.type === 'expense' && t.date >= thirtyDaysStr)
            .reduce((sum, t) => sum + t.amount, 0);
        const dailyAvg = recentExpenses / 30;
        
        document.getElementById('analyticsIncome').textContent = `$${totalIncome.toFixed(2)}`;
        document.getElementById('analyticsExpense').textContent = `$${totalExpense.toFixed(2)}`;
        document.getElementById('analyticsNet').textContent = `$${net.toFixed(2)}`;
        document.getElementById('analyticsDaily').textContent = `$${dailyAvg.toFixed(2)}`;
        
        // Top categories
        this.renderTopCategories();
    }
    
    renderTopCategories() {
        const container = document.getElementById('topCategoriesList');
        const expenses = this.transactions.filter(t => t.type === 'expense');
        
        const categoryMap = {
            food: 'Food',
            transport: 'Transport',
            entertainment: 'Entertainment',
            shopping: 'Shopping',
            bills: 'Bills',
            health: 'Health',
            education: 'Education',
            other: 'Other'
        };
        
        const categories = {};
        expenses.forEach(t => {
            const cat = categoryMap[t.category] || t.category;
            categories[cat] = (categories[cat] || 0) + t.amount;
        });
        
        const sorted = Object.entries(categories)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        const total = sorted.reduce((sum, [, amount]) => sum + amount, 0);
        
        if (sorted.length === 0) {
            container.innerHTML = '<p style="color: #9ca3af;">No expense data available</p>';
            return;
        }
        
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];
        
        container.innerHTML = sorted.map(([name, amount], index) => {
            const percentage = total > 0 ? (amount / total * 100) : 0;
            return `
                <div class="category-row">
                    <span class="cat-name">${name}</span>
                    <div class="cat-bar">
                        <div class="cat-bar-fill" style="width: ${percentage}%; background: ${colors[index % colors.length]};"></div>
                    </div>
                    <span class="cat-amount">$${amount.toFixed(2)}</span>
                </div>
            `;
        }).join('');
    }
    
    // ==========================================
    // UI HELPERS
    // ==========================================
    updateUI() {
        // Update transaction count in nav
        const count = this.transactions.length;
        // Could add badge here if desired
    }
}

// ==========================================
// BOOTSTRAP
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const app = new ExpenseFlow();
    // Make it accessible for debugging
    window.expenseFlow = app;
});
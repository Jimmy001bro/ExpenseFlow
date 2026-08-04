// ============================================
// EXPENSE FLOW 2.0 - Main Application
// ============================================

class ExpenseFlow {
    constructor() {
        this.transactions = [];
        this.currentView = 'dashboard';
        this.categoryChart = null;
        this.incomeExpenseChart = null;
        this.currentLanguage = this.getStoredLanguage() || 'en';
        this.translations = {};
        
        this.init();
    }
    
    // ==========================================
    // TRANSLATIONS
    // ==========================================
    getStoredLanguage() {
        return localStorage.getItem('expenseFlowLanguage') || 'en';
    }
    
    setStoredLanguage(lang) {
        localStorage.setItem('expenseFlowLanguage', lang);
    }
    
    getTranslations() {
        return {
            en: {
                appName: 'ExpenseFlow',
                navDashboard: 'Dashboard',
                navTransactions: 'Transactions',
                navAnalytics: 'Analytics',
                clearData: 'Clear All Data',
                dashboardTitle: 'Dashboard',
                dashboardSubtitle: 'Overview of your finances',
                addTransaction: 'Add Transaction',
                balance: 'Balance',
                totalIncome: 'Income',
                totalExpenses: 'Expenses',
                savingsRate: 'Savings Rate',
                spendingByCategory: 'Spending by Category',
                incomeVsExpenses: 'Income vs Expenses',
                recentTransactions: 'Recent Transactions',
                viewAll: 'View All',
                noTransactions: 'No transactions yet. Add your first one!',
                searchTransactions: 'Search transactions...',
                allCategories: 'All Categories',
                allTypes: 'All Types',
                income: 'Income',
                expense: 'Expense',
                monthlySummary: 'Monthly Summary',
                netSavings: 'Net Savings',
                averageDaily: 'Average Daily',
                topSpending: 'Top Spending Categories',
                noData: 'No data available',
                type: 'Type',
                description: 'Description',
                amount: 'Amount',
                category: 'Category',
                date: 'Date',
                enterDescription: 'e.g., Coffee shop',
                selectCategory: 'Select a category',
                incomeCategories: 'Income',
                expenseCategories: 'Expenses',
                salary: '💼 Salary',
                freelance: '💻 Freelance',
                investment: '📈 Investment',
                gift: '🎁 Gift',
                otherIncome: '📌 Other Income',
                food: '🍔 Food',
                transport: '🚗 Transport',
                entertainment: '🎬 Entertainment',
                shopping: '🛍️ Shopping',
                bills: '📄 Bills',
                health: '💊 Health',
                education: '📚 Education',
                otherExpense: '📌 Other Expense'
            },
            fa: {
                appName: '💰 مدیریت مالی',
                navDashboard: 'داشبورد',
                navTransactions: 'تراکنش‌ها',
                navAnalytics: 'تحلیل‌ها',
                clearData: 'حذف تمام داده‌ها',
                dashboardTitle: 'داشبورد',
                dashboardSubtitle: 'نمای کلی از وضعیت مالی شما',
                addTransaction: 'افزودن تراکنش',
                balance: 'موجودی',
                totalIncome: 'درآمد',
                totalExpenses: 'هزینه‌ها',
                savingsRate: 'نرخ پس‌انداز',
                spendingByCategory: 'هزینه بر اساس دسته‌بندی',
                incomeVsExpenses: 'درآمد در مقابل هزینه',
                recentTransactions: 'تراکنش‌های اخیر',
                viewAll: 'مشاهده همه',
                noTransactions: 'هیچ تراکنشی وجود ندارد. اولین تراکنش خود را اضافه کنید!',
                searchTransactions: 'جستجوی تراکنش‌ها...',
                allCategories: 'همه دسته‌بندی‌ها',
                allTypes: 'همه انواع',
                income: 'درآمد',
                expense: 'هزینه',
                monthlySummary: 'خلاصه ماهانه',
                netSavings: 'پس‌انداز خالص',
                averageDaily: 'میانگین روزانه',
                topSpending: 'بیشترین دسته‌بندی‌های هزینه',
                noData: 'داده‌ای موجود نیست',
                type: 'نوع',
                description: 'توضیحات',
                amount: 'مبلغ',
                category: 'دسته‌بندی',
                date: 'تاریخ',
                enterDescription: 'مثال: خرید از فروشگاه',
                selectCategory: 'یک دسته‌بندی انتخاب کنید',
                incomeCategories: 'درآمد',
                expenseCategories: 'هزینه‌ها',
                salary: '💼 حقوق',
                freelance: '💻 فریلنسری',
                investment: '📈 سرمایه‌گذاری',
                gift: '🎁 هدیه',
                otherIncome: '📌 سایر درآمدها',
                food: '🍔 خوراک',
                transport: '🚗 حمل و نقل',
                entertainment: '🎬 سرگرمی',
                shopping: '🛍️ خرید',
                bills: '📄 قبوض',
                health: '💊 سلامت',
                education: '📚 آموزش',
                otherExpense: '📌 سایر هزینه‌ها'
            }
        };
    }
    
    getText(key) {
        if (!this.translations[key]) {
            this.translations = this.getTranslations();
        }
        return this.translations[this.currentLanguage]?.[key] || this.translations['en']?.[key] || key;
    }
    
    translatePage() {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            el.textContent = this.getText(key);
        });
        
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            el.placeholder = this.getText(key);
        });
        
        // Update document direction
        if (this.currentLanguage === 'fa') {
            document.body.classList.add('rtl');
            document.documentElement.lang = 'fa';
            document.documentElement.dir = 'rtl';
        } else {
            document.body.classList.remove('rtl');
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
        }
        
        // Update chart legend if charts exist
        this.setupCharts();
    }
    
    toggleLanguage() {
        this.currentLanguage = this.currentLanguage === 'en' ? 'fa' : 'en';
        this.setStoredLanguage(this.currentLanguage);
        this.translations = this.getTranslations();
        this.translatePage();
        this.renderAll();
        this.setupCharts();
    }
    
    // ==========================================
    // INITIALIZATION
    // ==========================================
    init() {
        this.translations = this.getTranslations();
        this.loadFromStorage();
        this.setupEventListeners();
        this.setupDateDefault();
        this.translatePage();
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
                if (this.transactions.length === 0) {
                    this.transactions = this.getSampleData();
                }
            } catch {
                this.transactions = this.getSampleData();
            }
        } else {
            this.transactions = this.getSampleData();
        }
        this.saveToStorage();
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
            { id: Date.now() + 1, type: 'income', description: 'Salary - TechCorp Inc.', amount: 4850.00, category: 'salary', date: getDate(0) },
            { id: Date.now() + 2, type: 'expense', description: 'Whole Foods Market', amount: 234.67, category: 'food', date: getDate(1) },
            { id: Date.now() + 3, type: 'expense', description: 'Uber Ride to Airport', amount: 42.50, category: 'transport', date: getDate(1) },
            { id: Date.now() + 4, type: 'expense', description: 'Netflix Subscription', amount: 15.99, category: 'entertainment', date: getDate(2) },
            { id: Date.now() + 5, type: 'expense', description: 'Apple AirPods Pro', amount: 249.00, category: 'shopping', date: getDate(3) },
            { id: Date.now() + 6, type: 'income', description: 'Freelance Website Project', amount: 750.00, category: 'freelance', date: getDate(4) },
            { id: Date.now() + 7, type: 'expense', description: 'Electricity Bill - PGE', amount: 134.28, category: 'bills', date: getDate(4) },
            { id: Date.now() + 8, type: 'expense', description: 'Gym Membership - FitnessFirst', amount: 89.99, category: 'health', date: getDate(5) },
            { id: Date.now() + 9, type: 'expense', description: 'Amazon - Home Supplies', amount: 76.43, category: 'shopping', date: getDate(6) },
            { id: Date.now() + 10, type: 'expense', description: 'Pizza Night - Domino\'s', amount: 32.50, category: 'food', date: getDate(7) },
            { id: Date.now() + 11, type: 'income', description: 'Dividend Payment - VTI', amount: 185.40, category: 'investment', date: getDate(8) },
            { id: Date.now() + 12, type: 'expense', description: 'Spotify Premium', amount: 11.99, category: 'entertainment', date: getDate(9) },
            { id: Date.now() + 13, type: 'expense', description: 'Gas - Shell Station', amount: 54.20, category: 'transport', date: getDate(10) },
            { id: Date.now() + 14, type: 'expense', description: 'Udemy Course - JavaScript', amount: 89.99, category: 'education', date: getDate(11) },
            { id: Date.now() + 15, type: 'income', description: 'Bonus - Performance Q4', amount: 1200.00, category: 'salary', date: getDate(12) },
            { id: Date.now() + 16, type: 'expense', description: 'Internet Bill - Comcast', amount: 79.99, category: 'bills', date: getDate(13) },
            { id: Date.now() + 17, type: 'expense', description: 'Starbucks - Weekly Coffee', amount: 18.75, category: 'food', date: getDate(14) },
            { id: Date.now() + 18, type: 'expense', description: 'New Running Shoes - Nike', amount: 129.99, category: 'shopping', date: getDate(15) },
            { id: Date.now() + 19, type: 'expense', description: 'Dentist Appointment', amount: 165.00, category: 'health', date: getDate(16) },
            { id: Date.now() + 20, type: 'income', description: 'Birthday Gift from Family', amount: 200.00, category: 'gift', date: getDate(17) }
        ];
    }
    
    // ==========================================
    // CATEGORY HELPERS
    // ==========================================
    getCategoryDisplay(category, type) {
        if (type === 'income') {
            const map = {
                salary: this.getText('salary'),
                freelance: this.getText('freelance'),
                investment: this.getText('investment'),
                gift: this.getText('gift'),
                other_income: this.getText('otherIncome')
            };
            return map[category] || category;
        } else {
            const map = {
                food: this.getText('food'),
                transport: this.getText('transport'),
                entertainment: this.getText('entertainment'),
                shopping: this.getText('shopping'),
                bills: this.getText('bills'),
                health: this.getText('health'),
                education: this.getText('education'),
                other_expense: this.getText('otherExpense')
            };
            return map[category] || category;
        }
    }
    
    getCategoryIcon(category) {
        const map = {
            salary: '💼',
            freelance: '💻',
            investment: '📈',
            gift: '🎁',
            other_income: '📌',
            food: '🍔',
            transport: '🚗',
            entertainment: '🎬',
            shopping: '🛍️',
            bills: '📄',
            health: '💊',
            education: '📚',
            other_expense: '📌'
        };
        return map[category] || '📌';
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
                this.updateCategoryOptions(btn.dataset.type);
            });
        });
        
        // Form submit
        document.getElementById('transactionForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addTransaction();
        });
        
        // Clear all data
        document.getElementById('clearAllData')?.addEventListener('click', () => {
            if (confirm(this.getText('clearData') + '?')) {
                this.transactions = [];
                this.saveToStorage();
                this.renderAll();
                this.updateUI();
                this.setupCharts();
            }
        });
        
        // Language toggle
        document.getElementById('toggleLanguage')?.addEventListener('click', () => {
            this.toggleLanguage();
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
    
    updateCategoryOptions(type) {
        const select = document.getElementById('transactionCategory');
        const options = select.querySelectorAll('option');
        const isIncome = type === 'income';
        
        // Show/hide optgroups based on type
        select.querySelectorAll('optgroup').forEach(group => {
            const label = group.label;
            if ((isIncome && label === 'Expense') || (!isIncome && label === 'Income')) {
                group.style.display = 'none';
                group.querySelectorAll('option').forEach(opt => opt.disabled = true);
            } else {
                group.style.display = '';
                group.querySelectorAll('option').forEach(opt => opt.disabled = false);
            }
        });
        
        // Reset selection
        select.value = '';
    }
    
    // ==========================================
    // VIEW NAVIGATION
    // ==========================================
    switchView(view) {
        this.currentView = view;
        
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.toggle('active', item.dataset.view === view);
        });
        
        document.querySelectorAll('.view-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${view}View`)?.classList.add('active');
        
        const titles = {
            dashboard: { title: 'navDashboard', subtitle: 'dashboardSubtitle' },
            transactions: { title: 'navTransactions', subtitle: 'transactionsSubtitle' },
            analytics: { title: 'navAnalytics', subtitle: 'analyticsSubtitle' }
        };
        const info = titles[view] || titles.dashboard;
        document.getElementById('pageTitle').textContent = this.getText(info.title);
        document.getElementById('pageSubtitle').textContent = this.getText(info.subtitle);
        
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
        this.updateCategoryOptions('expense');
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
            container.innerHTML = `<p style="text-align: center; color: #9ca3af; padding: 40px 0;">${this.getText('noTransactions')}</p>`;
            return;
        }
        
        container.innerHTML = recent.map(t => this.createTransactionHTML(t)).join('');
        
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
            container.innerHTML = `<p style="text-align: center; color: #9ca3af; padding: 40px 0;">${this.getText('noTransactions')}</p>`;
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
        
        const categoryDisplay = this.getCategoryDisplay(transaction.category, transaction.type);
        const categoryIcon = this.getCategoryIcon(transaction.category);
        
        const date = new Date(transaction.date);
        const formattedDate = date.toLocaleDateString(this.currentLanguage === 'fa' ? 'fa-IR' : 'en-US', { 
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
                            <span class="transaction-category">${categoryIcon} ${categoryDisplay}</span>
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
        
        const categories = {};
        expenses.forEach(t => {
            const cat = this.getCategoryDisplay(t.category, 'expense');
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
                                family: this.currentLanguage === 'fa' ? 'Vazirmatn' : 'Inter'
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
            return date.toLocaleDateString(this.currentLanguage === 'fa' ? 'fa-IR' : 'en-US', { weekday: 'short' });
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
                        label: this.getText('income'),
                        data: incomeData,
                        backgroundColor: '#10b981',
                        borderRadius: 6,
                        barPercentage: 0.35
                    },
                    {
                        label: this.getText('expense'),
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
                                family: this.currentLanguage === 'fa' ? 'Vazirmatn' : 'Inter'
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
        
        this.renderTopCategories();
    }
    
    renderTopCategories() {
        const container = document.getElementById('topCategoriesList');
        const expenses = this.transactions.filter(t => t.type === 'expense');
        
        const categories = {};
        expenses.forEach(t => {
            const cat = this.getCategoryDisplay(t.category, 'expense');
            categories[cat] = (categories[cat] || 0) + t.amount;
        });
        
        const sorted = Object.entries(categories)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5);
        
        const total = sorted.reduce((sum, [, amount]) => sum + amount, 0);
        
        if (sorted.length === 0) {
            container.innerHTML = `<p style="color: #9ca3af;">${this.getText('noData')}</p>`;
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
    window.expenseFlow = app;
});
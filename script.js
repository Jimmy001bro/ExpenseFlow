// ============================================
// EXPENSE FLOW 3.0 - Main Application
// ============================================

class ExpenseFlow {
    constructor() {
        this.transactions = [];
        this.currentView = 'dashboard';
        this.categoryChart = null;
        this.incomeExpenseChart = null;
        this.currentLanguage = this.getStoredLanguage() || 'en';
        this.translations = {};
        this.currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();
        this.selectedDate = null;
        this.editingId = null;
        this.darkMode = localStorage.getItem('darkMode') === 'true';
        
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
                navCalendar: 'Calendar',
                navAnalytics: 'Analytics',
                clearData: 'Clear All Data',
                darkMode: 'Dark Mode',
                dashboardTitle: 'Dashboard',
                dashboardSubtitle: 'Overview of your finances',
                addTransaction: 'Add Transaction',
                editTransaction: 'Edit Transaction',
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
                currency: 'Currency',
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
                otherExpense: '📌 Other Expense',
                transactionsForDay: 'Transactions for this day',
                january: 'January', february: 'February', march: 'March', april: 'April',
                may: 'May', june: 'June', july: 'July', august: 'August',
                september: 'September', october: 'October', november: 'November', december: 'December',
                disclaimerText: 'For informational purposes only. Not financial advice. All data is stored locally in your browser.',
                learnMore: 'Learn more'
            },
            fa: {
                appName: '💰 مدیریت مالی',
                navDashboard: 'داشبورد',
                navTransactions: 'تراکنش‌ها',
                navCalendar: 'تقویم',
                navAnalytics: 'تحلیل‌ها',
                clearData: 'حذف تمام داده‌ها',
                darkMode: 'حالت شب',
                dashboardTitle: 'داشبورد',
                dashboardSubtitle: 'نمای کلی از وضعیت مالی شما',
                addTransaction: 'افزودن تراکنش',
                editTransaction: 'ویرایش تراکنش',
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
                currency: 'واحد پول',
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
                otherExpense: '📌 سایر هزینه‌ها',
                transactionsForDay: 'تراکنش‌های این روز',
                january: 'ژانویه', february: 'فوریه', march: 'مارس', april: 'آوریل',
                may: 'مه', june: 'ژوئن', july: 'ژوئیه', august: 'اوت',
                september: 'سپتامبر', october: 'اکتبر', november: 'نوامبر', december: 'دسامبر',
                disclaimerText: 'فقط برای اهداف اطلاع‌رسانی. توصیه مالی نیست. تمام داده‌ها به صورت محلی در مرورگر شما ذخیره می‌شوند.',
                learnMore: 'بیشتر بدانید'
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
        
        if (this.currentLanguage === 'fa') {
            document.body.classList.add('rtl');
            document.documentElement.lang = 'fa';
            document.documentElement.dir = 'rtl';
        } else {
            document.body.classList.remove('rtl');
            document.documentElement.lang = 'en';
            document.documentElement.dir = 'ltr';
        }
        
        this.setupCharts();
        this.renderCalendar();
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
    // DARK MODE
    // ==========================================
    toggleDarkMode() {
        this.darkMode = !this.darkMode;
        localStorage.setItem('darkMode', this.darkMode);
        document.documentElement.setAttribute('data-theme', this.darkMode ? 'dark' : 'light');
        const btn = document.getElementById('toggleDarkMode');
        btn.innerHTML = this.darkMode ? 
            `<i class="fas fa-sun"></i> ${this.getText('darkMode')}` : 
            `<i class="fas fa-moon"></i> ${this.getText('darkMode')}`;
    }
    
    // ==========================================
    // PRIVACY INFO
    // ==========================================
    showPrivacyInfo() {
        alert(
            '🔒 Privacy & Data Security\n\n' +
            '✅ All data is stored locally in your browser\n' +
            '✅ No data is sent to any server\n' +
            '✅ No tracking or analytics\n' +
            '✅ No cookies used\n\n' +
            '⚠️ You are responsible for backing up your data.\n' +
            'This app is for informational purposes only.\n' +
            'Not financial advice.\n\n' +
            '📧 Contact: nima80ir@gmail.com'
        );
    }
    
    // ==========================================
    // INITIALIZATION
    // ==========================================
    init() {
        this.translations = this.getTranslations();
        this.loadFromStorage();
        this.setupEventListeners();
        this.setupDateDefault();
        
        if (this.darkMode) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
        
        this.translatePage();
        this.renderAll();
        this.setupCharts();
        this.renderCalendar();
        this.updateUI();
        
        // Make showPrivacyInfo globally accessible for the footer link
        window.showPrivacyInfo = () => this.showPrivacyInfo();
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
            { id: Date.now() + 1, type: 'income', description: 'Salary - TechCorp Inc.', amount: 4850.00, category: 'salary', currency: '$', date: getDate(0) },
            { id: Date.now() + 2, type: 'expense', description: 'Whole Foods Market', amount: 234.67, category: 'food', currency: '$', date: getDate(1) },
            { id: Date.now() + 3, type: 'expense', description: 'Uber Ride to Airport', amount: 42.50, category: 'transport', currency: '$', date: getDate(1) },
            { id: Date.now() + 4, type: 'expense', description: 'Netflix Subscription', amount: 15.99, category: 'entertainment', currency: '$', date: getDate(2) },
            { id: Date.now() + 5, type: 'expense', description: 'Apple AirPods Pro', amount: 249.00, category: 'shopping', currency: '$', date: getDate(3) },
            { id: Date.now() + 6, type: 'income', description: 'Freelance Website Project', amount: 750.00, category: 'freelance', currency: '€', date: getDate(4) },
            { id: Date.now() + 7, type: 'expense', description: 'Electricity Bill - PGE', amount: 134.28, category: 'bills', currency: '$', date: getDate(4) },
            { id: Date.now() + 8, type: 'expense', description: 'Gym Membership', amount: 89.99, category: 'health', currency: '$', date: getDate(5) },
            { id: Date.now() + 9, type: 'expense', description: 'Amazon - Home Supplies', amount: 76.43, category: 'shopping', currency: '$', date: getDate(6) },
            { id: Date.now() + 10, type: 'expense', description: 'Pizza Night - Domino\'s', amount: 32.50, category: 'food', currency: '€', date: getDate(7) }
        ];
    }
    
    // ==========================================
    // CATEGORY HELPERS
    // ==========================================
    getCategoryDisplay(category, type) {
        const map = {
            salary: this.getText('salary'),
            freelance: this.getText('freelance'),
            investment: this.getText('investment'),
            gift: this.getText('gift'),
            other_income: this.getText('otherIncome'),
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
    // FORMAT NUMBER WITH COMMAS
    // ==========================================
    formatNumber(num) {
        if (this.currentLanguage === 'fa') {
            return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, '،');
        }
        return num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
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
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const type = btn.dataset.type;
                document.getElementById('transactionType').value = type;
                this.updateCategoryOptions(type);
            });
        });
        
        // Form submit
        document.getElementById('transactionForm')?.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.editingId) {
                this.updateTransaction();
            } else {
                this.addTransaction();
            }
        });
        
        // Clear all data
        document.getElementById('clearAllData')?.addEventListener('click', () => {
            if (confirm(this.getText('clearData') + '?')) {
                this.transactions = [];
                this.saveToStorage();
                this.renderAll();
                this.updateUI();
                this.setupCharts();
                this.renderCalendar();
            }
        });
        
        // Language toggle
        document.getElementById('toggleLanguage')?.addEventListener('click', () => {
            this.toggleLanguage();
        });
        
        // Dark mode toggle
        document.getElementById('toggleDarkMode')?.addEventListener('click', () => {
            this.toggleDarkMode();
        });
        
        // Search & filters
        document.getElementById('searchInput')?.addEventListener('input', () => this.renderTransactions());
        document.getElementById('categoryFilter')?.addEventListener('change', () => this.renderTransactions());
        document.getElementById('typeFilter')?.addEventListener('change', () => this.renderTransactions());
        
        // Calendar navigation
        document.getElementById('prevMonth')?.addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 0) {
                this.currentMonth = 11;
                this.currentYear--;
            }
            this.renderCalendar();
        });
        document.getElementById('nextMonth')?.addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 11) {
                this.currentMonth = 0;
                this.currentYear++;
            }
            this.renderCalendar();
        });
        
        // Import CSV
        document.getElementById('importCSV')?.addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });
        document.getElementById('fileInput')?.addEventListener('change', (e) => {
            this.importCSV(e);
        });
        
        // Export CSV
        document.getElementById('exportCSV')?.addEventListener('click', () => {
            this.exportCSV();
        });
        
        // Export PDF
        document.getElementById('exportPDF')?.addEventListener('click', () => {
            this.exportPDF();
        });
        
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
        const isIncome = type === 'income';
        
        select.querySelectorAll('optgroup').forEach(group => {
            const label = group.getAttribute('label');
            if ((isIncome && label === 'Income') || (!isIncome && label === 'Expenses')) {
                group.style.display = '';
                group.querySelectorAll('option').forEach(opt => opt.disabled = false);
            } else {
                group.style.display = 'none';
                group.querySelectorAll('option').forEach(opt => opt.disabled = true);
            }
        });
        
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
            calendar: { title: 'navCalendar', subtitle: 'calendarSubtitle' },
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
        if (view === 'calendar') {
            this.renderCalendar();
        }
    }
    
    // ==========================================
    // MODAL
    // ==========================================
    openModal(transaction = null) {
        this.editingId = null;
        const modal = document.getElementById('addModal');
        const form = document.getElementById('transactionForm');
        const title = document.getElementById('modalTitle');
        const submitBtn = document.getElementById('submitBtn');
        
        form.reset();
        document.getElementById('transactionDate').value = new Date().toISOString().split('T')[0];
        document.getElementById('transactionCurrency').value = '$';
        
        if (transaction) {
            this.editingId = transaction.id;
            title.textContent = this.getText('editTransaction');
            submitBtn.innerHTML = `<i class="fas fa-save"></i> ${this.getText('editTransaction')}`;
            
            document.getElementById('transactionType').value = transaction.type;
            document.getElementById('transactionDescription').value = transaction.description;
            document.getElementById('transactionAmount').value = transaction.amount;
            document.getElementById('transactionCurrency').value = transaction.currency || '$';
            document.getElementById('transactionCategory').value = transaction.category;
            document.getElementById('transactionDate').value = transaction.date;
            
            // Set active type button
            document.querySelectorAll('.type-btn').forEach(btn => {
                btn.classList.toggle('active', btn.dataset.type === transaction.type);
            });
            
            this.updateCategoryOptions(transaction.type);
        } else {
            title.textContent = this.getText('addTransaction');
            submitBtn.innerHTML = `<i class="fas fa-plus"></i> ${this.getText('addTransaction')}`;
            document.querySelector('.type-btn[data-type="expense"]')?.click();
        }
        
        modal.classList.add('open');
    }
    
    closeModal() {
        document.getElementById('addModal').classList.remove('open');
        this.editingId = null;
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
        const currency = document.getElementById('transactionCurrency').value;
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
            currency,
            category,
            date
        };
        
        this.transactions.unshift(transaction);
        this.saveToStorage();
        this.closeModal();
        this.renderAll();
        this.updateUI();
        this.setupCharts();
        this.renderCalendar();
    }
    
    updateTransaction() {
        const type = document.getElementById('transactionType').value;
        const description = document.getElementById('transactionDescription').value.trim();
        const amount = parseFloat(document.getElementById('transactionAmount').value);
        const currency = document.getElementById('transactionCurrency').value;
        const category = document.getElementById('transactionCategory').value;
        const date = document.getElementById('transactionDate').value;
        
        if (!description || !amount || !category || !date) {
            alert('Please fill in all fields.');
            return;
        }
        
        const index = this.transactions.findIndex(t => t.id === this.editingId);
        if (index !== -1) {
            this.transactions[index] = {
                ...this.transactions[index],
                type,
                description,
                amount,
                currency,
                category,
                date
            };
            this.saveToStorage();
            this.closeModal();
            this.renderAll();
            this.updateUI();
            this.setupCharts();
            this.renderCalendar();
        }
    }
    
    deleteTransaction(id) {
        if (!confirm('Delete this transaction?')) return;
        this.transactions = this.transactions.filter(t => t.id !== id);
        this.saveToStorage();
        this.renderAll();
        this.updateUI();
        this.setupCharts();
        this.renderCalendar();
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
        
        const currency = this.getDefaultCurrency();
        document.getElementById('balanceDisplay').textContent = `${currency}${this.formatNumber(balance)}`;
        document.getElementById('incomeDisplay').textContent = `${currency}${this.formatNumber(totalIncome)}`;
        document.getElementById('expenseDisplay').textContent = `${currency}${this.formatNumber(totalExpense)}`;
        document.getElementById('savingsRateDisplay').textContent = `${savingsRate.toFixed(0)}%`;
    }
    
    getDefaultCurrency() {
        if (this.transactions.length === 0) return '$';
        const currencyCount = {};
        this.transactions.forEach(t => {
            const c = t.currency || '$';
            currencyCount[c] = (currencyCount[c] || 0) + 1;
        });
        let maxCount = 0;
        let defaultCurrency = '$';
        for (const [cur, count] of Object.entries(currencyCount)) {
            if (count > maxCount) {
                maxCount = count;
                defaultCurrency = cur;
            }
        }
        return defaultCurrency;
    }
    
    renderRecentTransactions() {
        const container = document.getElementById('recentTransactionList');
        const recent = this.transactions.slice(0, 5);
        
        if (recent.length === 0) {
            container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 40px 0;">${this.getText('noTransactions')}</p>`;
            return;
        }
        
        container.innerHTML = recent.map(t => this.createTransactionHTML(t)).join('');
        this.attachTransactionEvents(container);
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
            container.innerHTML = `<p style="text-align: center; color: var(--text-muted); padding: 40px 0;">${this.getText('noTransactions')}</p>`;
            return;
        }
        
        container.innerHTML = filtered.map(t => this.createTransactionHTML(t)).join('');
        this.attachTransactionEvents(container);
    }
    
    createTransactionHTML(transaction) {
        const isIncome = transaction.type === 'income';
        const icon = isIncome ? 'fa-arrow-up' : 'fa-arrow-down';
        const amountClass = isIncome ? 'income' : 'expense';
        const sign = isIncome ? '+' : '-';
        
        const categoryDisplay = this.getCategoryDisplay(transaction.category, transaction.type);
        const categoryIcon = this.getCategoryIcon(transaction.category);
        const currency = transaction.currency || '$';
        
        const date = new Date(transaction.date);
        const formattedDate = date.toLocaleDateString(this.currentLanguage === 'fa' ? 'fa-IR' : 'en-US', { 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        return `
            <div class="transaction-item" data-id="${transaction.id}">
                <div class="transaction-left">
                    <div class="transaction-icon ${transaction.type}">
                        <i class="fas ${icon}"></i>
                    </div>
                    <div class="transaction-info">
                        <div class="transaction-description">${this.escapeHtml(transaction.description)}</div>
                        <div class="transaction-meta">
                            <span>${formattedDate}</span>
                            <span class="transaction-category">${categoryIcon} ${categoryDisplay}</span>
                            <span class="transaction-category">${currency}</span>
                        </div>
                    </div>
                </div>
                <div class="transaction-right">
                    <span class="transaction-amount ${amountClass}">${sign}${currency}${this.formatNumber(transaction.amount)}</span>
                    <button class="edit-btn" data-id="${transaction.id}" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" data-id="${transaction.id}" title="Delete">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        `;
    }
    
    attachTransactionEvents(container) {
        container.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                this.deleteTransaction(parseInt(btn.dataset.id));
            });
        });
        
        container.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = parseInt(btn.dataset.id);
                const transaction = this.transactions.find(t => t.id === id);
                if (transaction) {
                    this.openModal(transaction);
                }
            });
        });
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    // ==========================================
    // CALENDAR
    // ==========================================
    renderCalendar() {
        const grid = document.getElementById('calendarGrid');
        const title = document.getElementById('calendarTitle');
        
        const monthNames = [
            this.getText('january'), this.getText('february'), this.getText('march'),
            this.getText('april'), this.getText('may'), this.getText('june'),
            this.getText('july'), this.getText('august'), this.getText('september'),
            this.getText('october'), this.getText('november'), this.getText('december')
        ];
        
        title.textContent = `${monthNames[this.currentMonth]} ${this.currentYear}`;
        
        const firstDay = new Date(this.currentYear, this.currentMonth, 1).getDay();
        const daysInMonth = new Date(this.currentYear, this.currentMonth + 1, 0).getDate();
        const today = new Date();
        
        let html = '';
        
        // Day headers
        const dayHeaders = this.currentLanguage === 'fa' ? ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'] : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        if (this.currentLanguage === 'fa') {
            // Persian calendar starts on Saturday
            const faHeaders = ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'];
            faHeaders.forEach(day => {
                html += `<div class="calendar-day-header">${day}</div>`;
            });
        } else {
            dayHeaders.forEach(day => {
                html += `<div class="calendar-day-header">${day}</div>`;
            });
        }
        
        // Empty days before first day
        const startOffset = this.currentLanguage === 'fa' ? (firstDay + 1) % 7 : firstDay;
        for (let i = 0; i < startOffset; i++) {
            html += `<div class="calendar-day other-month"></div>`;
        }
        
        // Days of month
        for (let day = 1; day <= daysInMonth; day++) {
            const dateStr = `${this.currentYear}-${String(this.currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
            const hasTransaction = this.transactions.some(t => t.date === dateStr);
            const isToday = dateStr === today.toISOString().split('T')[0];
            const isSelected = dateStr === this.selectedDate;
            
            const dayTransactions = this.transactions.filter(t => t.date === dateStr);
            const totalAmount = dayTransactions.reduce((sum, t) => sum + t.amount, 0);
            
            html += `
                <div class="calendar-day ${isToday ? 'today' : ''} ${hasTransaction ? 'has-transaction' : ''} ${isSelected ? 'selected' : ''}" 
                     data-date="${dateStr}">
                    ${day}
                    ${totalAmount > 0 ? `<span class="day-amount">${this.getDefaultCurrency()}${this.formatNumber(totalAmount)}</span>` : ''}
                </div>
            `;
        }
        
        grid.innerHTML = html;
        
        // Add click events to days
        grid.querySelectorAll('.calendar-day:not(.other-month)').forEach(el => {
            el.addEventListener('click', () => {
                const date = el.dataset.date;
                this.selectedDate = date;
                this.renderCalendar();
                this.showDayTransactions(date);
            });
        });
        
        // If a date was selected, show its transactions
        if (this.selectedDate) {
            this.showDayTransactions(this.selectedDate);
        }
    }
    
    showDayTransactions(date) {
        const container = document.getElementById('calendarDayTransactions');
        const transactions = this.transactions.filter(t => t.date === date);
        
        if (transactions.length === 0) {
            container.innerHTML = `<p style="color: var(--text-muted); text-align: center; padding: 20px;">No transactions for this day</p>`;
            return;
        }
        
        container.innerHTML = transactions.map(t => this.createTransactionHTML(t)).join('');
        this.attachTransactionEvents(container);
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
                            callback: (value) => `${this.getDefaultCurrency()}${value}`
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
        
        const currency = this.getDefaultCurrency();
        document.getElementById('analyticsIncome').textContent = `${currency}${this.formatNumber(totalIncome)}`;
        document.getElementById('analyticsExpense').textContent = `${currency}${this.formatNumber(totalExpense)}`;
        document.getElementById('analyticsNet').textContent = `${currency}${this.formatNumber(net)}`;
        document.getElementById('analyticsDaily').textContent = `${currency}${this.formatNumber(dailyAvg)}`;
        
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
            container.innerHTML = `<p style="color: var(--text-muted);">${this.getText('noData')}</p>`;
            return;
        }
        
        const colors = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];
        const currency = this.getDefaultCurrency();
        
        container.innerHTML = sorted.map(([name, amount], index) => {
            const percentage = total > 0 ? (amount / total * 100) : 0;
            return `
                <div class="category-row">
                    <span class="cat-name">${name}</span>
                    <div class="cat-bar">
                        <div class="cat-bar-fill" style="width: ${percentage}%; background: ${colors[index % colors.length]};"></div>
                    </div>
                    <span class="cat-amount">${currency}${this.formatNumber(amount)}</span>
                </div>
            `;
        }).join('');
    }
    
    // ==========================================
    // IMPORT / EXPORT
    // ==========================================
    importCSV(event) {
        const file = event.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target.result;
                const lines = text.split('\n').filter(line => line.trim());
                const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
                
                for (let i = 1; i < lines.length; i++) {
                    const values = lines[i].split(',').map(v => v.trim());
                    if (values.length < 5) continue;
                    
                    const transaction = {
                        id: Date.now() + i,
                        type: values[headers.indexOf('type')] || 'expense',
                        description: values[headers.indexOf('description')] || 'Imported',
                        amount: parseFloat(values[headers.indexOf('amount')]) || 0,
                        currency: values[headers.indexOf('currency')] || '$',
                        category: values[headers.indexOf('category')] || 'other_expense',
                        date: values[headers.indexOf('date')] || new Date().toISOString().split('T')[0]
                    };
                    
                    if (transaction.amount > 0) {
                        this.transactions.push(transaction);
                    }
                }
                
                this.saveToStorage();
                this.renderAll();
                this.setupCharts();
                this.renderCalendar();
                alert(`Imported ${lines.length - 1} transactions successfully!`);
            } catch (error) {
                alert('Error importing CSV. Please check the format.');
            }
        };
        reader.readAsText(file);
        event.target.value = '';
    }
    
    exportCSV() {
        if (this.transactions.length === 0) {
            alert('No transactions to export.');
            return;
        }
        
        const headers = ['Type', 'Description', 'Amount', 'Currency', 'Category', 'Date'];
        const rows = this.transactions.map(t => [
            t.type,
            `"${t.description}"`,
            t.amount,
            t.currency || '$',
            t.category,
            t.date
        ]);
        
        const csv = [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const blob = new Blob([csv], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `transactions_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        URL.revokeObjectURL(url);
    }
    
    exportPDF() {
        if (this.transactions.length === 0) {
            alert('No transactions to export.');
            return;
        }
        
        const printWindow = window.open('', '_blank');
        const currency = this.getDefaultCurrency();
        const totalIncome = this.transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0);
        const totalExpense = this.transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
        const balance = totalIncome - totalExpense;
        
        printWindow.document.write(`
            <html>
            <head>
                <title>ExpenseFlow Report</title>
                <style>
                    body { font-family: Arial, sans-serif; padding: 40px; }
                    h1 { color: #6366f1; }
                    .summary { display: flex; gap: 20px; margin: 20px 0; padding: 20px; background: #f3f4f6; border-radius: 8px; }
                    .summary-item { flex: 1; }
                    .summary-item .label { color: #6b7280; font-size: 12px; text-transform: uppercase; }
                    .summary-item .value { font-size: 20px; font-weight: bold; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { padding: 10px; text-align: left; border-bottom: 1px solid #e5e7eb; }
                    th { background: #f9fafb; font-weight: 600; }
                    .income { color: #10b981; }
                    .expense { color: #ef4444; }
                    @media print { .no-print { display: none; } }
                </style>
            </head>
            <body>
                <h1>💰 ExpenseFlow Report</h1>
                <p>Generated: ${new Date().toLocaleString()}</p>
                
                <div class="summary">
                    <div class="summary-item">
                        <div class="label">Total Income</div>
                        <div class="value income">${currency}${this.formatNumber(totalIncome)}</div>
                    </div>
                    <div class="summary-item">
                        <div class="label">Total Expenses</div>
                        <div class="value expense">${currency}${this.formatNumber(totalExpense)}</div>
                    </div>
                    <div class="summary-item">
                        <div class="label">Balance</div>
                        <div class="value">${currency}${this.formatNumber(balance)}</div>
                    </div>
                    <div class="summary-item">
                        <div class="label">Transactions</div>
                        <div class="value">${this.transactions.length}</div>
                    </div>
                </div>
                
                <h2>Transactions</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Category</th>
                            <th>Currency</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${this.transactions.map(t => `
                            <tr>
                                <td>${t.date}</td>
                                <td>${t.description}</td>
                                <td>${this.getCategoryDisplay(t.category, t.type)}</td>
                                <td>${t.currency || '$'}</td>
                                <td class="${t.type}">${t.type === 'income' ? '+' : '-'}${t.currency || '$'}${this.formatNumber(t.amount)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                <p style="margin-top: 30px; color: #9ca3af; font-size: 12px; text-align: center;">
                    Generated by ExpenseFlow - Personal Finance Tracker
                </p>
                
                <script>
                    window.onload = function() { window.print(); }
                <\/script>
            </body>
            </html>
        `);
        printWindow.document.close();
    }
    
    // ==========================================
    // UI HELPERS
    // ==========================================
    updateUI() {
        const btn = document.getElementById('toggleDarkMode');
        if (btn) {
            btn.innerHTML = this.darkMode ? 
                `<i class="fas fa-sun"></i> ${this.getText('darkMode')}` : 
                `<i class="fas fa-moon"></i> ${this.getText('darkMode')}`;
        }
    }
}

// ==========================================
// BOOTSTRAP
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const app = new ExpenseFlow();
    window.expenseFlow = app;
});
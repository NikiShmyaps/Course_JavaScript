'use strict';

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
    btnPlus = document.getElementsByTagName('button'),
    incomePlus = btnPlus[0],
    expensesPlus = btnPlus[1],
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    depositCheck = document.querySelector('#deposit-check'),
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
    accumulatedMonthValue = document.getElementsByClassName('accumulated_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
    incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    inputLock = document.querySelectorAll('.data input[type=text]'),

    appData = {
        income: {},
        incomeMonth: 0,
        addIncome: [],
        expenses: {},
        addExpenses: [],
        deposit: false,
        budget: 0,
        budgetDay: 0,
        budgetMonth: 0,
        expensesMonth: 0,
        start: function () {
            this.budget = +salaryAmount.value;

            this.getDis();
            this.getExpenses();
            this.getIncome();
            this.getExpensesMonth();
            this.getIncomeMonth();

            this.getAddExpenses();
            this.getAddIncome();
            this.getBudget();
            this.calcPeriod();

            this.showResult();
        },
        prohibition: function () {
            if (salaryAmount.value.length > 0) {
                start.disabled = false;
            }
        },
        showResult: function () {
            budgetMonthValue.value = this.budgetMonth;
            budgetDayValue.value = Math.ceil(this.budgetDay);
            expensesMonthValue.value = this.expensesMonth;
            additionalExpensesValue.value = this.addExpenses.join(', ');
            additionalIncomeValue.value = this.addIncome.join(', ');
            targetMonthValue.value = Math.ceil(this.getTargetMonth());
        },
        addExpensesBlock: function () {
            let cloneExpensesItem = expensesItems[0].cloneNode(true);
            expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
            expensesItems = document.querySelectorAll('.expenses-items');
            if (expensesItems.length === 3) {
                expensesPlus.style.display = 'none';
            }
        },
        addIncomeBlock: function () {
            let cloneIncomeItem = incomeItems[0].cloneNode(true);
            incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
            incomeItems = document.querySelectorAll('.income-items');
            if (incomeItems.length === 3) {
                incomePlus.style.display = 'none';
            }
        },
        getExpenses: function () {
            expensesItems.forEach(function (item) {
                let itemExpenses = item.querySelector('.expenses-title').value;
                let cashExpenses = item.querySelector('.expenses-amount').value;
                if (itemExpenses !== '' && cashExpenses !== '') {
                    appData.expenses[itemExpenses] = cashExpenses;
                }
            });
        },
        getIncome: function () {
            incomeItems.forEach(function (item) {
                let itemIncome = item.querySelector('.income-title').value;
                let cashIncome = item.querySelector('.income-amount').value;
                if (itemIncome !== '' && cashIncome !== '') {
                    appData.income[itemIncome] = cashIncome;
                }
            });
        },
        getAddExpenses: function () {
            let addExpenses = additionalExpensesItem.value.split(',');
            addExpenses.forEach(function (item) {
                item = item.trim();
                if (item !== '') {
                    appData.addExpenses.push(item);
                }
            });
        },
        getAddIncome: function () {
            additionalIncomeItem.forEach(function (item) {
                let itemValue = item.value.trim();
                if (itemValue !== '') {
                    appData.addIncome.push(itemValue);
                }
            });
        },
        getExpensesMonth: function () {
            for (let key in this.expenses) {
                this.expensesMonth += +this.expenses[key];
            }
        },
        getIncomeMonth: function () {
            for (let key in this.income) {
                this.incomeMonth += +this.income[key];
            }
        },
        getBudget: function () {
            this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
            this.budgetDay = this.budgetMonth / 30;
        },
        getTargetMonth: function () {
            return targetAmount.value / this.budgetMonth;
        },
        getStatusIncome: function () {
            if (appData.budgetDay >= 800) {
                return ("Высокий уровень дохода");
            } else if (300 <= appData.budgetDay && appData.budgetDay < 800) {
                return ("Средний уровень дохода");
            } else if (0 <= appData.budgetDay && appData.budgetDay < 300) {
                return ("Низкий уровень дохода");
            } else if (appData.budgetDay < 0) {
                return ("Что то пошло не так");
            }
        },
        getPeriod: function () {

            periodAmount.textContent = periodSelect.value;
        },
        calcPeriod: function () {
            incomePeriodValue.value = appData.budgetMonth * periodSelect.value;
            return incomePeriodValue.value;
        },
        getDis: function () {
            let inputLock = document.querySelectorAll('.data input[type=text]');
            inputLock.forEach(function (item) {
                item.disabled = true;
            });
            start.style.display = 'none';
            cancel.style.display = 'block';
            incomePlus.style.display = 'none';
            expensesPlus.style.display = 'none';
        },
        getReset: function () {
            let incomeItems = document.querySelectorAll('.income-items'),
                expensesItems = document.querySelectorAll('.expenses-items');
            if (incomeItems.length === 2) {
                incomeItems[0].parentNode.removeChild(incomeItems[1]);
            } else if (incomeItems.length === 3) {
                incomeItems[0].parentNode.removeChild(incomeItems[1]);
                incomeItems[0].parentNode.removeChild(incomeItems[2]);
            }

            if (expensesItems.length === 2) {
                expensesItems[0].parentNode.removeChild(expensesItems[1]);
            } else if (expensesItems.length === 3) {
                expensesItems[0].parentNode.removeChild(expensesItems[1]);
                expensesItems[0].parentNode.removeChild(expensesItems[2]);
            }
            // incomeItems[0].parentNode.removeChild(incomeItems[1]);
            // incomeItems[0].parentNode.removeChild(incomeItems[2]);
            // expensesItems[0].parentNode.removeChild(expensesItems[1]);
            // expensesItems[0].parentNode.removeChild(expensesItems[2]);

            let allLeft = document.querySelectorAll('.data input[type=text]'),
                allRight = document.querySelectorAll('.result input[type=text]');
            allLeft.forEach(function (key) {
                key.disabled = false;
                key.value = '';
            });
            allRight.forEach(function (key) {
                key.disabled = false;
                key.value = '';
            });
            start.style.display = 'block';
            start.disabled = true;
            cancel.style.display = 'none';
            this.budget = 0;
            this.income = {};
            this.incomeMonth = 0;
            this.addIncome = [];
            this.expenses = {};
            this.addExpenses = [];
            this.deposit = false;
            this.budgetDay = 0;
            this.budgetMonth = 0;
            this.expensesMonth = 0;
            incomePlus.style.display = 'block';
            expensesPlus.style.display = 'block';

        }
    };


start.disabled = true;
salaryAmount.addEventListener('keyup', appData.prohibition);

start.addEventListener('click', appData.start.bind(appData));
cancel.addEventListener('click', appData.getReset.bind(appData));

expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.setAttribute('oninput', "appData.getPeriod()");
periodSelect.addEventListener('click', appData.calcPeriod);

// console.log('Через: ', appData.getTargetMonth(appData.mission, appData.budgetMonth) + ' месяца');


// appData.own();
// console.log('appData.expenses: ', appData.expenses);
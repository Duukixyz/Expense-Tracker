document.addEventListener('DOMContentLoaded', () => {
    const expenseForm = document.getElementById('expense-form');
    const monthSelect = document.getElementById('month');
    const yearSelect = document.getElementById('year');
    const amountInput = document.getElementById('amount');
    const expenseChart = document.getElementById('expense-chart')

    let selectedMonth;
    let selectedYear;
    let myChart;
    // Generating year
    for(let year = 2020; year <= 2040; year++){
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearSelect.appendChild(option);
    }
    //  Initializing expenses object with categories
    const expenses = {
        January: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0},
        February: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0},
        March: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0},
        April: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0},
        May: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0},
        June: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0},
        July: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0},
        August: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0},
        September: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0},
        October: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0},
        November: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0},
        December: { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0}
    };
    // loading a process
    function gettingExpensesFromStorage(month, year){
        const key = `${month}-${year}`;
        return JSON.parse(localStorage.getItem(key)) || {};
    }
    // saving a process
    function saveExpensesFromStorage(month, year){
        const key = `${month}-${year}`;
        localStorage.setItem(key, JSON.stringify(expenses[month]));
    }
    // Selecting Month and Year
    function getSelectedMonthYear() {
         selectedMonth = monthSelect.value;
         selectedYear = yearSelect.value;
        if(!selectedMonth || !selectedYear) {
            alert('Month or year not selected');
            return;
        }
        
        if(!expenses[selectedMonth]) {
            expenses[selectedMonth] = { Housing: 0, Food: 0, Transportation: 0, Bills: 0, Hobby: 0};
        }
    }

    // Chart from 
    function uChart(){
        getSelectedMonthYear();

        const expenseData = gettingExpensesFromStorage(selectedMonth, selectedYear);
        Object.assign(expenses[selectedMonth], expenseData);

        const ctx = expenseChart.getContext('2d');
        if(myChart){
            myChart.destroy();
        }
        myChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
              labels: Object.keys(expenses[selectedMonth]),
              datasets: [{
                data: Object.values(expenses[selectedMonth]),
                backgroundColor: [
                    '#ff6384',
                    '#4caf50',
                    '#ffce56',
                    '#36a2eb',
                    '#ff9f40',
                ]
              }]
            },
            options: {
              responsive: true,
              plugins: {
                legend: {
                    display: true,
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: function(tooltipItem) {
                            return `${tooltipItem.label}: $${tooltipItem.raw}`
                        }
                    }
                }
              }
            }
        });
    }
    
    
    // making a form
    function handleSubmit(event) {
        event.preventDefault();
        getSelectedMonthYear();
        
        const category = event.target.category.value;
        const amount = parseFloat(event.target.amount.value);  
        const currentAmount = expenses[selectedMonth][category] || 0;

        if(amount > 0) {
            expenses[selectedMonth][category] = currentAmount + amount;
        } else if (amount < 0 && currentAmount >= Math.abs(amount)){
            expenses[selectedMonth][category] = currentAmount + amount;
        } else {
            alert('Unvalid amount: Error')
        }
  
        saveExpensesFromStorage(selectedMonth, selectedYear);
        uChart();
        amountInput.value = '';
    
    }
    expenseForm.addEventListener('submit', handleSubmit);
    monthSelect.addEventListener('change', uChart);
    yearSelect.addEventListener('change', uChart);
    // Setting a Month
    function setDefaultMonthYear() {
        const now = new Date();
        const initialMonth = now.toLocaleString('default', {month: 'long'});
        const initialYear = now.getFullYear();
        monthSelect.value = initialMonth;
        yearSelect.value = initialYear;
    }
    setDefaultMonthYear();
    uChart();
})
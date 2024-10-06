import { expense_categories } from "./constants";


export const monthlyChartData = {
    labels: [] as string[],
    datasets: [{
        label: 'Monthly Breakdown',
        data: [] as number[],
        backgroundColor: [] as string[],
        hoverOffset: 4
    }]
};

export const incomeVsExpensesData = {
    labels: [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December'
    ],
    datasets: [
        {
            label: 'Monthly Income',
            data: [], // Income values
            backgroundColor: 'rgba(75, 192, 192, 0.6)', // Light teal color for income
            borderColor: 'rgba(75, 192, 192, 1)', // Darker teal for border
            borderWidth: 1
        },
        {
            label: 'Total Expenses',
            data: [], // Expenses values
            backgroundColor: 'rgba(255, 99, 132, 0.6)', // Light red color for expenses
            borderColor: 'rgba(255, 99, 132, 1)', // Darker red for border
            borderWidth: 1
        }
    ]
};


export const savingsProgressData = {
    labels: [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September', 'October',
        'November', 'December'
    ],
    datasets: [
        {
            label: 'Current Savings',
            data: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 7500, 7800, 8000, 8500, 9000], // Monthly savings amounts
            borderColor: 'rgba(75, 192, 192, 1)', // Line color for current savings
            backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color
            fill: true, // Fill the area under the line
            tension: 0.1 // Smoothness of the line
        },
        {
            label: 'Savings Goal',
            data: [1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000, 10000, 10000, 10000], // Fixed goal amount
            borderColor: 'rgba(255, 99, 132, 1)', // Line color for goal
            backgroundColor: 'rgba(255, 99, 132, 0.2)', // Fill color
            fill: false, // Do not fill the area under the line
            tension: 0.1 // Smoothness of the line
        }
    ]
};

export const topSpendingCategories = {
    labels: expense_categories, // Categories
    datasets: [{
        label: 'Total Amount Spent ($)', // Dataset label
        data: [] as number[], // Amounts corresponding to the categories
        backgroundColor: [
            'rgba(75, 192, 192, 0.2)',  // Groceries
            'rgba(54, 162, 235, 0.2)',  // Rent
            'rgba(255, 206, 86, 0.2)',  // Dining Out
            'rgba(153, 102, 255, 0.2)', // Entertainment
            'rgba(255, 159, 64, 0.2)'   // Transportation
        ],
        borderColor: [
            'rgba(75, 192, 192, 1)',    // Groceries
            'rgba(54, 162, 235, 1)',    // Rent
            'rgba(255, 206, 86, 1)',    // Dining Out
            'rgba(153, 102, 255, 1)',   // Entertainment
            'rgba(255, 159, 64, 1)'     // Transportation
        ],
        borderWidth: 1 // Border thickness
    }]
};


export const generateColors = (length: number) => {
    const colors = [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(153, 102, 255)',
        'rgb(255, 159, 64)',
        'rgb(201, 203, 207)',
        'rgb(255, 206, 86)',
        'rgb(255, 99, 71)',
        'rgb(60, 179, 113)',
        'rgb(255, 215, 0)',
    ];

    return colors.slice(0, length);
};


import { Chart } from "chart.js";
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

export interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
    }[];
}

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
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        },
        {
            label: 'Monthly Expenses',
            data: [], // Expenses values
            backgroundColor: 'rgba(255, 99, 132, 0.6)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        },
        {
            label: 'Monthly Savings',
            data: [], // Savings values
            backgroundColor: 'rgb(54, 162, 235, 1)',
            borderColor: 'rgb(54, 162, 235, 0.6)',
            borderWidth: 1
        }
    ]
};

export const topSpendingCategories = {
    labels: expense_categories,
    datasets: [{
        label: 'Total Amount Spent ($)',
        data: [] as number[],
        backgroundColor: [] as string[],
        borderWidth: 1
    }]
};

export const radarChartData = {
    labels: expense_categories,
    datasets: [
        {
            data: [] as number[], // Actual spending
            label: 'Actual Spending',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            pointBackgroundColor: 'rgba(255, 99, 132, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7
        },
        {
            data: [] as number[], // Budgeted spending
            label: 'Budgeted Spending',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            pointBackgroundColor: 'rgba(54, 162, 235, 1)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
            pointStyle: 'circle',
            pointRadius: 5,
            pointHoverRadius: 7
        }
    ]
};

export const noDataPlugin = {
    id: 'noDataPlugin',
    beforeDraw: (chart: Chart) => {
        const { datasets } = chart.data;
        if (datasets.length === 0 || datasets.every(dataset => dataset.data.length === 0)) {
            // Get the chart context and its dimensions
            const ctx = chart.ctx;
            const { width, height } = chart;

            ctx.save();
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.font = '16px Arial';
            ctx.fillStyle = '#999';

            ctx.fillText('No data available to display', width / 2, height / 2);
            ctx.restore();
        }
    }
};



export const generateColors = (length: number) => {
    const colorToGenerate = colors;

    return colorToGenerate.slice(0, length);
};

export const colors = [
    'rgb(255, 99, 132)',  // Red
    'rgb(54, 162, 235)',  // Blue
    'rgb(255, 205, 86)',  // Yellow
    'rgb(75, 192, 192)',  // Teal
    'rgb(153, 102, 255)', // Purple
    'rgb(255, 159, 64)',  // Orange
    'rgb(201, 203, 207)', // Grey
    'rgb(255, 206, 86)',  // Light Yellow
    'rgb(255, 99, 71)',   // Tomato
    'rgb(60, 179, 113)',  // Medium Sea Green
    'rgb(255, 215, 0)',   // Gold
    'rgb(255, 127, 80)',  // Coral
    'rgb(70, 130, 180)',  // Steel Blue
    'rgb(186, 85, 211)',  // Medium Orchid
    'rgb(0, 191, 255)',   // Deep Sky Blue
    'rgb(0, 128, 0)',     // Green
    'rgb(255, 165, 0)',   // Orange
    'rgb(240, 128, 128)', // Light Coral
    'rgb(138, 43, 226)',  // Blue Violet
    'rgb(255, 0, 255)',   // Magenta
    'rgb(100, 149, 237)',  // Cornflower Blue
    'rgb(255, 99, 132)',  // Red
    'rgb(0, 255, 255)',   // Cyan
    'rgb(255, 0, 0)',     // Bright Red
    'rgb(255, 182, 193)', // Light Pink
    'rgb(255, 20, 147)',  // Deep Pink
    'rgb(135, 206, 250)', // Light Sky Blue
    'rgb(60, 179, 113)',  // Medium Sea Green
    'rgb(0, 0, 255)',     // Blue
    'rgb(0, 255, 0)',     // Green
    'rgb(128, 0, 128)',   // Purple
    'rgb(255, 140, 0)',   // Dark Orange
    'rgb(139, 69, 19)',   // Saddle Brown
    'rgb(218, 112, 214)', // Orchid
    'rgb(64, 224, 208)',  // Turquoise
    'rgb(0, 100, 0)',     // Dark Green
    'rgb(173, 216, 230)', // Light Blue
    'rgb(255, 228, 196)', // Bisque
    'rgb(188, 143, 143)', // Rosy Brown
    'rgb(240, 230, 140)', // Khaki
    'rgb(255, 69, 0)',    // Red-Orange
    'rgb(244, 164, 96)',  // Sandy Brown
    'rgb(210, 105, 30)',  // Chocolate
    'rgb(255, 228, 225)', // Misty Rose
    'rgb(255, 228, 181)', // Papaya Whip
    'rgb(186, 85, 211)',  // Medium Orchid
    'rgb(107, 142, 35)',  // Olive Drab
    'rgb(244, 164, 96)',  // Sandy Brown
    'rgb(255, 228, 196)', // Bisque
    'rgb(135, 206, 235)', // Sky Blue
    'rgb(255, 215, 0)',   // Gold
    'rgb(0, 206, 209)',   // Dark Turquoise
    'rgb(255, 0, 0)',     // Red
    'rgb(255, 20, 147)',  // Deep Pink
    'rgb(160, 32, 240)',  // Purple
    'rgb(255, 105, 180)', // Hot Pink
    'rgb(173, 255, 47)',  // Green Yellow
    'rgb(240, 255, 240)', // Honeydew
    'rgb(255, 246, 143)', // Light Yellow
    'rgb(70, 130, 180)',  // Steel Blue
    'rgb(102, 205, 170)',  // Medium Aquamarine
    'rgb(250, 235, 215)', // Antique White
    'rgb(0, 128, 128)',   // Teal
    'rgb(240, 128, 128)', // Light Coral
    'rgb(135, 206, 235)', // Sky Blue
    'rgb(147, 112, 219)', // Medium Purple
    'rgb(184, 134, 11)',  // Dark Goldenrod
    'rgb(255, 20, 147)',  // Deep Pink
    'rgb(221, 160, 221)', // Plum
    'rgb(102, 205, 170)',  // Medium Aquamarine
    'rgb(176, 224, 230)', // Powder Blue
    'rgb(255, 0, 255)',   // Magenta
    'rgb(255, 160, 122)', // Light Salmon
    'rgb(255, 127, 80)',  // Coral
    'rgb(245, 222, 179)', // Wheat
    'rgb(255, 228, 225)', // Misty Rose
    'rgb(250, 250, 210)', // Light Goldenrod Yellow
    'rgb(255, 228, 196)', // Bisque
    'rgb(64, 224, 208)',  // Turquoise
    'rgb(255, 105, 180)', // Hot Pink
    'rgb(30, 144, 255)',  // Dodger Blue
    'rgb(240, 230, 140)', // Khaki
    'rgb(255, 140, 0)',   // Dark Orange
    'rgb(34, 139, 34)',   // Forest Green
    'rgb(189, 183, 107)', // Dark Khaki
];


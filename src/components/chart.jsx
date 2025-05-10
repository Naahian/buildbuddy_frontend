import React, { Component } from 'react';
import Chart from 'chart.js/auto';

class OrderChart extends Component {
    chartRef = React.createRef();
    chart = null;

    componentDidMount() {
        this.createChart();
    }

    componentDidUpdate(prevProps) {
        // Recreate chart if orders change
        if (prevProps.orders !== this.props.orders) {
            if (this.chart) {
                this.chart.destroy();
            }
            this.createChart();
        }
    }

    // Helper function for more consistent date formatting
    formatDate(dateString) {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;

        // Format as YYYY-MM-DD for consistent grouping
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    createChart() {
        const { orders } = this.props;

        // Check if orders exist and is an array
        if (!orders || !Array.isArray(orders) || orders.length === 0) {
            console.log("No orders data available for chart");
            return;
        }

        console.log("Creating chart with orders:", orders);
        console.log("Total number of orders:", orders.length);

        // Group by date and sum total_price with detailed logging
        const grouped = {};
        let skippedOrders = 0;

        orders.forEach((order, index) => {
            console.log(`Processing order ${index}:`, order);

            // Check if order is null or undefined
            if (!order) {
                console.warn(`Order ${index} is null or undefined`);
                skippedOrders++;
                return; // Skip this order
            }

            // Check if order has required properties
            if (!order.created_at) {
                console.warn(`Order ${index} is missing created_at:`, order);
                skippedOrders++;
                return; // Skip this order
            }

            // Check if total_price exists and is a valid number
            const price = parseFloat(order.total_price);
            if (isNaN(price)) {
                console.warn(`Order ${index} has invalid total_price:`, order.total_price);
                skippedOrders++;
                return; // Skip this order
            }

            // Format the date consistently
            const dateStr = this.formatDate(order.created_at);
            if (!dateStr) {
                console.warn(`Order ${index} has invalid date:`, order.created_at);
                skippedOrders++;
                return; // Skip this order
            }
            console.log(`Order ${index} date parsed as:`, dateStr);

            // Update the grouped object
            grouped[dateStr] = (grouped[dateStr] || 0) + price;
            console.log(`Updated grouped[${dateStr}] to:`, grouped[dateStr]);
        });

        console.log("Final grouped data:", grouped);
        console.log(`Processed ${orders.length} orders, skipped ${skippedOrders}`);

        // Check if we have any valid data points
        if (Object.keys(grouped).length === 0) {
            console.log("No valid order data points to display");
            return;
        }

        // Sort dates chronologically 
        const labels = Object.keys(grouped).sort();
        const data = labels.map(date => grouped[date]);

        console.log("Chart labels (dates):", labels);
        console.log("Chart data (values):", data);

        // Make sure canvas exists in the DOM
        const canvas = this.chartRef.current;
        if (!canvas) {
            console.error("Canvas reference is not available");
            return;
        }

        // Create the chart
        this.chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Total Sales ($)',
                    data: data,
                    fill: true,
                    borderColor: 'rgba(54, 162, 235, 1)',
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    tension: 0.3,
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: { display: true },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return `$${context.raw.toFixed(2)}`;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Total ($)'
                        },
                        ticks: {
                            callback: function (value) {
                                return '$' + value;
                            }
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Date'
                        }
                    }
                }
            }
        });
    }

    componentWillUnmount() {
        if (this.chart) {
            this.chart.destroy();
        }
    }

    render() {
        const { orders } = this.props;

        return (
            <div className="container my-5">
                <h5 className="card-title">Order Totals Over Time</h5>

                {(!orders || orders.length === 0) ? (
                    <div className="alert alert-info">
                        No order data available to display chart
                    </div>
                ) : (
                    <div style={{ width: '100%', height: '300px' }}>
                        <canvas ref={this.chartRef} />
                    </div>
                )}
            </div>
        );
    }
}

export default OrderChart;
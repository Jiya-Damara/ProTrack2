document.addEventListener("DOMContentLoaded", function () {
    // Check if the canvas elements exist before initializing the charts
    const performanceCanvas = document.getElementById('performanceChart');
    const taskCanvas = document.getElementById('taskChart');
    const timeCanvas = document.getElementById('timeChart');

    if (performanceCanvas) {
        const performanceCtx = performanceCanvas.getContext('2d');
        const performanceChart = new Chart(performanceCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Current Period',
                    data: [65, 78, 80, 82, 85, 88],
                    borderColor: '#8a70D6',
                    backgroundColor: 'rgba(138, 112, 214, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2
                }, {
                    label: 'Previous Period',
                    data: [60, 70, 72, 75, 77, 79],
                    borderColor: '#ddd',
                    backgroundColor: 'rgba(200, 200, 200, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 2,
                    borderDash: [5, 5]
                }]
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
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 13
                        },
                        bodyFont: {
                            size: 12
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            stepSize: 20
                        },
                        grid: {
                            display: true,
                            drawBorder: false
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

    if (taskCanvas) {
        const taskCtx = taskCanvas.getContext('2d');
        const taskChart = new Chart(taskCtx, {
            type: 'bar',
            data: {
                labels: ['Projects', 'Meetings', 'Tasks', 'Goals'],
                datasets: [{
                    label: 'Completed',
                    data: [85, 90, 78, 92],
                    backgroundColor: 'rgba(138, 112, 214, 0.8)',
                    borderRadius: 5
                }, {
                    label: 'Target',
                    data: [95, 85, 85, 90],
                    backgroundColor: 'rgba(200, 200, 200, 0.2)',
                    borderRadius: 5
                }]
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
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 13
                        },
                        bodyFont: {
                            size: 12
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,
                        ticks: {
                            callback: function (value) {
                                return value + '%';
                            }
                        },
                        grid: {
                            display: true,
                            drawBorder: false
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

    if (timeCanvas) {
        const timeCtx = timeCanvas.getContext('2d');
        const timeChart = new Chart(timeCtx, {
            type: 'doughnut',
            data: {
                labels: ['Development', 'Meetings', 'Planning', 'Learning'],
                datasets: [{
                    data: [40, 20, 25, 15],
                    backgroundColor: [
                        'rgba(138, 112, 214, 0.8)',
                        'rgba(65, 241, 182, 0.8)',
                        'rgba(255, 187, 85, 0.8)',
                        'rgba(255, 119, 130, 0.8)'
                    ],
                    borderWidth: 0,
                    borderRadius: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: {
                        position: 'right',
                        labels: {
                            boxWidth: 12,
                            padding: 15,
                            font: {
                                size: 11
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        padding: 12,
                        titleFont: {
                            size: 13
                        },
                        bodyFont: {
                            size: 12
                        }
                    }
                }
            }
        });
    }

    // Optional: Theme Change Handler
    function updateChartsTheme(isDark) {
        const textColor = isDark ? '#edeffd' : '#363949';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';

        [performanceChart, taskChart, timeChart].forEach(chart => {
            // Update text colors
            chart.options.plugins.legend.labels.color = textColor;
            chart.options.scales?.x?.ticks && (chart.options.scales.x.ticks.color = textColor);
            chart.options.scales?.y?.ticks && (chart.options.scales.y.ticks.color = textColor);

            // Update grid colors
            if (chart.options.scales) {
                chart.options.scales.x.grid.color = gridColor;
                chart.options.scales.y.grid.color = gridColor;
            }
        });

        performanceChart.update();
        taskChart.update();
        timeChart.update();
    }

    // Event Listeners for Chart Interactivity
    [performanceChart, taskChart, timeChart].forEach(chart => {
        chart.canvas.addEventListener('mouseover', () => {
            chart.canvas.style.cursor = 'pointer';
        });
    });

    // Optional: Add Window Resize Handler
    window.addEventListener('resize', () => {
        performanceChart.resize();
        taskChart.resize();
        timeChart.resize();
    });
});
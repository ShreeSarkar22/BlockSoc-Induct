document.addEventListener("DOMContentLoaded", function () {
    let cryptoChart;

    function updateChart() {
        const bitcoinBalance = parseFloat(document.getElementById("inr-Bitscoin").textContent);
        const ethereumBalance = parseFloat(document.getElementById("inr-Ethereum").textContent);
        const binanceBalance = parseFloat(document.getElementById("inr-Binance").textContent);

        const data = {
            labels: ['Bitcoin', 'Ethereum', 'Binance Coin'],
            datasets: [{
                label: 'Crypto Portfolio Distribution',
                data: [bitcoinBalance, ethereumBalance, binanceBalance],
                backgroundColor: ['#f39c12', '#8e44ad', '#2980b9'],
                borderColor: ['#f39c12', '#8e44ad', '#2980b9'],
                borderWidth: 1
            }]
        };

        const config = {
            type: 'pie',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        callbacks: {
                            label: function (tooltipItem) {
                                return tooltipItem.label + ': ' + tooltipItem.raw;
                            }
                        }
                    }
                }
            }
        };

        if (cryptoChart) {
            cryptoChart.data.datasets[0].data = [bitcoinBalance, ethereumBalance, binanceBalance];
            cryptoChart.update();
        } else {
            const ctx = document.getElementById('cryptoChart').getContext('2d');
            cryptoChart = new Chart(ctx, config);
        }
    }

    function updateBalance(token, operation) {
        let balanceElement = document.getElementById(`balance-${token}`);
        let inrBalanceElement = document.getElementById(`inr-${token}`);
        let valueElement = document.getElementById(`value-${token}`);
        let inputElement = document.getElementById(`${operation}-${token}`);

        let balance = parseFloat(balanceElement.textContent);
        let inputAmount = parseFloat(inputElement.value);
        let tokenValue = parseFloat(valueElement.textContent);

        if (isNaN(inputAmount) || inputAmount <= 0) {
            alert("Please enter a valid number.");
            return;
        }

        if (operation === "buy") {
            balance += inputAmount;
        } else if (operation === "sell") {
            if (inputAmount > balance) {
                alert("Insufficient balance to sell.");
                return;
            }
            balance -= inputAmount;
        }

        balanceElement.textContent = balance.toFixed(2);
        inrBalanceElement.textContent = (balance * tokenValue).toFixed(2);

        inputElement.value = '';

        updateChart();
    }

    document.getElementById("buy-Bitscoin-btn").addEventListener("click", function () {
        updateBalance("Bitscoin", "buy");
    });

    document.getElementById("buy-Ethereum-btn").addEventListener("click", function () {
        updateBalance("Ethereum", "buy");
    });

    document.getElementById("buy-Binance-btn").addEventListener("click", function () {
        updateBalance("Binance", "buy");
    });

    document.getElementById("sell-Bitscoin-btn").addEventListener("click", function () {
        updateBalance("Bitscoin", "sell");
    });

    document.getElementById("sell-Ethereum-btn").addEventListener("click", function () {
        updateBalance("Ethereum", "sell");
    });

    document.getElementById("sell-Binance-btn").addEventListener("click", function () {
        updateBalance("Binance", "sell");
    });

    updateChart();
});

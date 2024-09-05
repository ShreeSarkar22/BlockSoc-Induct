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
                backgroundColor: ['#08D9D6', '#252A34', '#FF2E63'],
                borderColor: ['#08D9D6', '#252A34', '#FF2E63'],
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


    document.getElementById("buy-Bitscoin").addEventListener("keydown",function(event){
        if(event.key==="Enter") {
            document.getElementById('buy-Bitscoin-btn').click();
        }
    });
    document.getElementById("sell-Bitscoin").addEventListener("keydown",function(event){
        if(event.key==="Enter") {
            document.getElementById('sell-Bitscoin-btn').click();
        }
    });
    document.getElementById("buy-Ethereum").addEventListener("keydown",function(event){
        if(event.key==="Enter") {
            document.getElementById('buy-Ethereum-btn').click();
        }
    });
    document.getElementById("sell-Ethereum").addEventListener("keydown",function(event){
        if(event.key==="Enter") {
            document.getElementById('sell-Ethereum-btn').click();
        }
    });
    document.getElementById("buy-Binance").addEventListener("keydown",function(event){
        if(event.key==="Enter") {
            document.getElementById('buy-Binance-btn').click();
        }
    });
    document.getElementById("sell-Binance").addEventListener("keydown",function(event){
        if(event.key==="Enter") {
            document.getElementById('sell-Binance-btn').click();
        }
    });

    updateChart();
});

async function fetchBitcoinPriceInINR() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr';

    try {
        const response = await fetch(url);
        const data = await response.json();
        const bitcoinPriceINR = data.bitcoin.inr.toFixed(2); 

        document.getElementById('bitcoin-price').innerHTML = `${bitcoinPriceINR}`;
    } catch (error) {
        console.error('Error fetching Bitcoin price in INR:', error);
        document.getElementById('bitcoin-price').innerHTML = 'Error fetching price';
    }
}

async function fetchEthereumPriceInINR() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=inr';

    try {
        const response = await fetch(url);
        const data = await response.json();
        const ethereumPriceINR = data.ethereum.inr.toFixed(2);

        document.getElementById('ethereum-price').innerHTML = `${ethereumPriceINR}`;
    } catch (error) {
        console.error('Error fetching Ethereum price in INR:', error);
        document.getElementById('ethereum-price').innerHTML = 'Error fetching price';
    }
}

async function fetchBinanceCoinPriceInINR() {
    const url = 'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=inr';

    try {
        const response = await fetch(url);
        const data = await response.json();
        const binanceCoinPriceINR = data.binancecoin.inr.toFixed(2);

        document.getElementById('binancecoin-price').innerHTML = `${binanceCoinPriceINR}`;
    } catch (error) {
        console.error('Error fetching Binance Coin price in INR:', error);
        document.getElementById('binancecoin-price').innerHTML = 'Error fetching price';
    }
}

function fetchAllPrices() {
    fetchBitcoinPriceInINR();
    fetchEthereumPriceInINR();
    fetchBinanceCoinPriceInINR();
}

function initializePriceFetching() {
    fetchAllPrices();
    setInterval(fetchAllPrices, 900000);
}

window.onload = () => {
    initializePriceFetching();
};

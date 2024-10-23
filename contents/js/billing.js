document.addEventListener('DOMContentLoaded', function() {
    const planOptions = document.querySelectorAll('.plan-option');
    const monthly = document.querySelector('.monthly');
    const annually = document.querySelector('.annual');
    const planDetails = document.querySelector('.plan-details');
    const paymentForm = document.getElementById('payment-form');
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('card-name');
    const payButton = document.querySelector('.btn-pay');
    const successModal = document.getElementById('successModal');

    let selectedPlan = 'monthly';
    const taxRate = 0.18; // 18% GST rate for India

    const plans = {
        monthly: { name: 'Monthly Plan', price: 599 },    // ₹599
        annual: { name: 'Annual Plan', price: 5999 }      // ₹5,999
    };

    async function generateOrderId() {
        // Simulate an API call to generate a unique order ID
        await new Promise(resolve => setTimeout(resolve, 500));
        return 'ORD-' + Date.now();
    }

    async function calculateTax(amount) {
        // Simulate an API call to calculate tax
        await new Promise(resolve => setTimeout(resolve, 300));
        return amount * taxRate;
    }

    // Function to format price in Indian Rupee format
    function formatIndianPrice(price) {
        const priceStr = price.toString();
        const lastThree = priceStr.substring(priceStr.length - 3);
        const otherNums = priceStr.substring(0, priceStr.length - 3);
        const res = otherNums.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + lastThree;
        return '₹' + res;
    }

    async function updateOrderDetails() {
        const plan = plans[selectedPlan];
        const orderId = await generateOrderId();
        const totalBeforeTax = plan.price;
        const tax = await calculateTax(totalBeforeTax);
        const orderTotal = totalBeforeTax + tax;

        document.getElementById('plan-name').textContent = plan.name;
        document.getElementById('order-id').textContent = orderId;
        document.getElementById('total-before-tax').textContent = formatIndianPrice(totalBeforeTax);
        document.getElementById('tax-amount').textContent = formatIndianPrice(Math.round(tax));
        document.getElementById('order-total').textContent = formatIndianPrice(Math.round(orderTotal));
        
        // Update pay button text
        const payButtonText = payButton.querySelector('span');
        if (payButtonText) {
            payButtonText.textContent = `Pay ${formatIndianPrice(Math.round(orderTotal))}`;
        }
    }

    function selectPlan(planType) {
        selectedPlan = planType;
        planOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.plan === planType);
        });
        updateOrderDetails();
    }

    function updateModalDetails() {
        const planName = document.getElementById('plan-name').textContent;
        const orderId = document.getElementById('order-id').textContent;
        const amount = document.getElementById('total-before-tax').textContent;
        const tax = document.getElementById('tax-amount').textContent;
        const total = document.getElementById('order-total').textContent;
        
        document.getElementById('modal-plan').textContent = planName;
        document.getElementById('modal-order-id').textContent = orderId;
        document.getElementById('modal-amount').textContent = amount;
        document.getElementById('modal-tax').textContent = tax;
        document.getElementById('modal-total').textContent = total;
    }

    function validateForm() {
        let isValid = true;
        
        if (!validateCardNumber(cardNumber.value)) {
            cardNumber.setCustomValidity('Invalid card number');
            isValid = false;
        } else {
            cardNumber.setCustomValidity('');
        }

        if (!validateExpiryDate(expiryDate.value)) {
            expiryDate.setCustomValidity('Invalid expiry date');
            isValid = false;
        } else {
            expiryDate.setCustomValidity('');
        }

        if (!validateCVV(cvv.value)) {
            cvv.setCustomValidity('Invalid CVV');
            isValid = false;
        } else {
            cvv.setCustomValidity('');
        }

        if (cardName.value.trim() === '') {
            cardName.setCustomValidity('Name on card is required');
            isValid = false;
        } else {
            cardName.setCustomValidity('');
        }

        return isValid;
    }

    function validateCardNumber(number) {
        return /^[0-9]{16,19}$/.test(number.replace(/\s/g, ''));
    }

    function validateExpiryDate(date) {
        if (!date.includes('/')) return false;
        const [month, year] = date.split('/');
        if (!month || !year) return false;
        
        const now = new Date();
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        return expiry > now && month >= 1 && month <= 12;
    }

    function validateCVV(cvv) {
        return /^[0-9]{3,4}$/.test(cvv);
    }

    function formatCardNumber(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
        e.target.value = value;
    }

    function formatExpiryDate(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        e.target.value = value;
    }

    function formatCVV(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) value = value.slice(0, 4);
        e.target.value = value;
    }

    function simulatePayment() {
        payButton.classList.add('loading');
        payButton.disabled = true;
        
        setTimeout(() => {
            payButton.classList.remove('loading');
            payButton.disabled = false;
            updateModalDetails();
            successModal.style.display = 'block';
        }, 2000);
    }

    // Event Listeners
    monthly.addEventListener('click', () => selectPlan('monthly'));
    annually.addEventListener('click', () => selectPlan('annual'));

    planOptions.forEach(option => {
        option.addEventListener('click', function() {
            planOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            selectPlan(this.dataset.plan);
        });
    });

    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            simulatePayment();
        }
    });

    cardNumber.addEventListener('input', formatCardNumber);
    expiryDate.addEventListener('input', formatExpiryDate);
    cvv.addEventListener('input', formatCVV);

    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });

    // Initialize the form with default plan
    updateOrderDetails();
});
<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', function() {
    const planOptions = document.querySelectorAll('.plan-option');
=======
const monthly = document.querySelector('.monthly');
const annually = document.querySelector('.annual');
const planDetails = document.querySelector('.plan-details');

let selectedPlan = 'monthly';
const taxRate = 0.1; // 10% tax rate

const plans = {
    monthly: { name: 'Monthly', price: 9.99 },
    annual: { name: 'Annual', price: 99.99 }
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

async function updateOrderDetails() {
    const plan = plans[selectedPlan];
    const orderId = await generateOrderId();
    const totalBeforeTax = plan.price;
    const tax = await calculateTax(totalBeforeTax);
    const orderTotal = totalBeforeTax + tax;

    document.getElementById('plan-name').textContent = plan.name;
    document.getElementById('order-id').textContent = orderId;
    document.getElementById('total-before-tax').textContent = `$${totalBeforeTax.toFixed(2)}`;
    document.getElementById('tax-amount').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('order-total').textContent = `$${orderTotal.toFixed(2)}`;
}

function selectPlan(planType) {
    selectedPlan = planType;
    document.querySelectorAll('.plan-option').forEach(option => {
        option.classList.toggle('active', option.dataset.plan === planType);
    });
    updateOrderDetails();
}

monthly.addEventListener('click', () => selectPlan('monthly'));
annually.addEventListener('click', () => selectPlan('annual'));

document.addEventListener('DOMContentLoaded', () => {
>>>>>>> 192334d9e41ef3f3e31ab9f8a657a2c82d41374c
    const paymentForm = document.getElementById('payment-form');
    const cardNumber = document.getElementById('card-number');
    const expiryDate = document.getElementById('expiry-date');
    const cvv = document.getElementById('cvv');
    const cardName = document.getElementById('card-name');
    const payButton = document.querySelector('.btn-pay');
    const successModal = document.getElementById('successModal');

    // Plan selection
    planOptions.forEach(option => {
        option.addEventListener('click', function() {
            planOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            updateOrderDetails(this.dataset.plan);
        });
    });
<<<<<<< HEAD

    // Form validation
    paymentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            simulatePayment();
        }
    });

    // Input formatting
    cardNumber.addEventListener('input', formatCardNumber);
    expiryDate.addEventListener('input', formatExpiryDate);
    cvv.addEventListener('input', formatCVV);

    // Close modal when clicking outside
    successModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });

    function updateOrderDetails(plan) {
        const planName = document.getElementById('plan-name');
        const totalBeforeTax = document.getElementById('total-before-tax');
        const taxAmount = document.getElementById('tax-amount');
        const orderTotal = document.getElementById('order-total');
        const payButtonText = payButton.querySelector('span');

        if (plan === 'monthly') {
            planName.textContent = 'Monthly Plan';
            totalBeforeTax.textContent = '$9.99';
            taxAmount.textContent = '$1.00';
            orderTotal.textContent = '$10.99';
            payButtonText.textContent = 'Pay $10.99';
        } else {
            planName.textContent = 'Annual Plan';
            totalBeforeTax.textContent = '$99.99';
            taxAmount.textContent = '$10.00';
            orderTotal.textContent = '$109.99';
            payButtonText.textContent = 'Pay $109.99';
        }
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

    function simulatePayment() {
        payButton.classList.add('loading');
        payButton.disabled = true;
        
        setTimeout(() => {
            payButton.classList.remove('loading');
            payButton.disabled = false;
            
            // Update modal details and show it
            updateModalDetails();
            successModal.style.display = 'block';
        }, 2000);
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
        const [month, year] = date.split('/');
        const now = new Date();
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        return expiry > now;
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
        if (value.length > 2) {
            value = value.slice(0, 2) + '/' + value.slice(2);
        }
        e.target.value = value;
    }

    function formatCVV(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    }
});
=======
});
>>>>>>> 192334d9e41ef3f3e31ab9f8a657a2c82d41374c

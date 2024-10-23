// Update your existing settings.js file with these changes

document.addEventListener('DOMContentLoaded', () => {
    const proBanner = document.querySelector(".proBanner");
    const popupContainer = document.querySelector(".popup-container");
    const closePopup = document.querySelector(".close-popup");
    const btnUpgrade = document.querySelector(".btn-upgrade");
    const btnSubscribe = document.querySelector(".btn-subscribe");

    function openPopup() {
        popupContainer.style.display = "flex";
    }

    function closePopupFunc() {
        popupContainer.style.display = "none";
    }

    function openBillingGateway() {
        window.location.href = "billing-gateway.html";
    }

    if (proBanner) proBanner.addEventListener("click", openPopup);
    if (btnUpgrade) btnUpgrade.addEventListener("click", openPopup);
    if (closePopup) closePopup.addEventListener("click", closePopupFunc);
    if (btnSubscribe) btnSubscribe.addEventListener("click", openBillingGateway);

    // Close popup when clicking outside
    if (popupContainer) {
        popupContainer.addEventListener("click", (e) => {
            if (e.target === popupContainer) {
                closePopupFunc();
            }
        });
    }
});
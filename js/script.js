document.querySelector("#submit-btn").addEventListener("click", function (e) {
    e.preventDefault();
});

const seats = document.querySelectorAll(".seat");
let selectedSeats = [];

for (seat of seats) {
    seat.addEventListener("click", function (event) {
        const seatName = event.target.innerText;
        if (selectedSeats.length < 4 && !selectedSeats.includes(event.target)) {
            event.target.classList.remove("bg-[#f7f8f8]");
            event.target.classList.add("bg-[#1dd100]", "text-white");
            selectedSeats.push(event.target);
            decreaseSeatCount();
            increaseSelectedSeatNumber();
            addSeatToTheList(seatName);
            getAElementById("total-price-amount").innerText =
                totalPriceCalculate().join(" ");
            granTotalCalculate();
        } else if (selectedSeats.includes(event.target)) {
            alert("you have already selected the seat.");
        } else {
            alert("You can not buy more than 4 tickets.");
        }

        const couponInput = getAElementById("coupon-input-field");
        const couponApplyBtn = getAElementById("coupon-apply-btn");
        if (selectedSeats.length === 4) {
            couponInput.disabled = false;
            couponApplyBtn.disabled = false;
        }
    });
}

function openModal() {
    const phoneNumber = getAElementById("phone-input-field").value;
    if (phoneNumber && selectedSeats.length >= 1) {
        getAElementById("my_modal_1").showModal();
    } else {
        alert(
            "Please select at least one seat and add your phone number to proceed."
        );
    }
}

function getAElementById(id) {
    const element = document.getElementById(id);
    return element;
}

function getTheNumberById(id) {
    const number = parseInt(document.getElementById(id).innerText);
    return number;
}

function addSeatToTheList(seatName) {
    const tableSingleRow = document.createElement("div");
    tableSingleRow.classList.add("flex", "justify-between");
    const nameOfSeat = document.createElement("h4");
    nameOfSeat.innerText = seatName;
    nameOfSeat.classList.add("text-[#03071299]");
    tableSingleRow.appendChild(nameOfSeat);
    const seatType = document.createElement("h4");
    seatType.innerText = "Economy";
    seatType.classList.add("text-[#03071299]");
    tableSingleRow.appendChild(seatType);
    const seatPrice = document.createElement("h4");
    seatPrice.innerText = "550";
    seatPrice.classList.add("text-[#03071299]");
    tableSingleRow.appendChild(seatPrice);
    const listContainer = getAElementById("seat-list-container");
    listContainer.appendChild(tableSingleRow);
}

let seatLeft = getTheNumberById("seat-left-count");
function decreaseSeatCount() {
    seatLeft = seatLeft - 1;
    getAElementById("seat-left-count").innerText = seatLeft;
}

let selectedSeatCount = 0;
function increaseSelectedSeatNumber() {
    selectedSeatCount = selectedSeatCount + 1;
    getAElementById("selected-seat-count").innerText = selectedSeatCount;
}

let totalPrice = 0;
function totalPriceCalculate() {
    totalPrice = totalPrice + 550;
    const totalPriceArr =
        getAElementById("total-price-amount").innerText.split(" ");
    totalPriceArr[1] = totalPrice;
    return totalPriceArr;
}

let grandTotalPrice = 0;
function granTotalCalculate() {
    grandTotalPrice = grandTotalPrice + 550;
    getAElementById("grand-total-price").innerText = grandTotalPrice;
}

function applyCoupon() {
    const coupon = getAElementById("coupon-input-field").value;
    const discountDetails = getAElementById("discount-details");
    if (coupon === "NEW15") {
        const discount = grandTotalPrice * 0.15;
        discountDetails.classList.remove("hidden");
        getAElementById("discount-amount").innerText = discount;
        getAElementById("grand-total-price").innerText = grandTotalPrice - discount;
        getAElementById("coupon-area").classList.add("hidden");
    } else if (coupon === "Couple 20") {
        const discount = grandTotalPrice * 0.2;
        discountDetails.classList.remove("hidden");
        getAElementById("discount-amount").innerText = discount;
        getAElementById("grand-total-price").innerText = grandTotalPrice - discount;
        getAElementById("coupon-area").classList.add("hidden");
    } else {
        alert("Your coupon is not valid!!");
    }
}

var swiper = new Swiper(".mySwiper", {
    slidesPerView: 3,
    spaceBetween: 30,  // Tăng khoảng cách giữa các slide
    slidesPerGroup: 1,
    loop: true, // Cho phép vòng lặp vô hạn
    centeredSlides: false, // Không cần căn giữa slide
    speed: 600, // Tăng tốc độ chuyển slide
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    breakpoints: {
        1200: {
            slidesPerView: 3,
            spaceBetween: 30
        },
        1024: {
            slidesPerView: 2,
            spaceBetween: 20
        },
        768: {
            slidesPerView: 1,
            spaceBetween: 10
        }
    },
});

function updateCheckoutDate() {
    let checkin = document.getElementById('checkin');
    let nights = document.getElementById('nights');
    let checkout = document.getElementById('checkout');

    checkin.addEventListener('change', function () {
        calculateCheckout();
    });
    nights.addEventListener('change', function () {
        calculateCheckout();
    });

    function calculateCheckout() {
        if (checkin.value) {
            let checkinDate = new Date(checkin.value);
            let numberOfNights = parseInt(nights.value, 10);
            checkinDate.setDate(checkinDate.getDate() + numberOfNights);
            checkout.value = checkinDate.toISOString().split('T')[0];
        }
    }
}
window.onload = updateCheckoutDate;

function calculateCheckout() {
    if (!checkin.value || !nights.value || isNaN(parseInt(nights.value, 10))) return;

    let checkinDate = new Date(checkin.value);
    let numberOfNights = parseInt(nights.value, 10);

    checkinDate.setDate(checkinDate.getDate() + numberOfNights);
    checkout.value = checkinDate.toISOString().split('T')[0];
}

//phần room

let currentIndex = 0;
const cardContainer = document.getElementById("promoSlider");
const totalCards = document.querySelectorAll(".promo-card-1").length;
const cardsPerView = 1; // Hiển thị 3 ảnh mỗi lần
const cardWidth = document.querySelector(".promo-card-1").offsetWidth + 30; // Độ rộng của mỗi ảnh + khoảng cách

document.getElementById("nextBtn").addEventListener("click", function () {
    if (currentIndex < totalCards - cardsPerView) {
        currentIndex++;
    } else {
        currentIndex = 0; // Quay lại ảnh đầu tiên
    }
    updateSlider();
});

document.getElementById("prevBtn").addEventListener("click", function () {
    if (currentIndex > 0) {
        currentIndex--;
    } else {
        currentIndex = totalCards - cardsPerView; // Quay lại ảnh cuối cùng
    }
    updateSlider();
});

function updateSlider() {
    const offset = -currentIndex * cardWidth;
    cardContainer.style.transform = `translateX(${offset}px)`;
}


document.addEventListener("DOMContentLoaded", function () {
    const selector = document.querySelector(".guest-room-selector");
    const popup = document.querySelector(".guest-room-popup");

    // Bấm vào selector sẽ hiện popup
    selector.addEventListener("click", function (event) {
        popup.style.display = popup.style.display === "block" ? "none" : "block";
        event.stopPropagation(); // Ngăn chặn event lan ra ngoài
    });

    // Bấm ra ngoài popup sẽ ẩn popup
    document.addEventListener("click", function (event) {
        if (!popup.contains(event.target) && !selector.contains(event.target)) {
            popup.style.display = "none";
        }
    });

    // Cập nhật số lượng
    window.changeCount = function (type, change) {
        const countElement = document.getElementById(type + "-count");
        let count = parseInt(countElement.textContent);
        count = Math.max(0, count + change);
        countElement.textContent = count;
    };

    // Áp dụng lựa chọn vào text
    window.applySelection = function () {
        const adults = document.getElementById("adults-count").textContent;
        const children = document.getElementById("children-count").textContent;
        const rooms = document.getElementById("rooms-count").textContent;
        selector.textContent = `${adults} người lớn, ${children} trẻ em, ${rooms} phòng`;
        popup.style.display = "none";
    };
});

document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel-content");
    const cards = document.querySelectorAll(".card");
    const cardWidth = cards[0].offsetWidth + 10; // Lấy kích thước card + khoảng cách
    let currentIndex = 0;
    const visibleCards = 4; // Số ảnh hiển thị cùng lúc

    function scrollLeft() {
        if (currentIndex > 0) {
            currentIndex--;
            carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    }

    function scrollRight() {
        if (currentIndex < cards.length - visibleCards) {
            currentIndex++;
            carousel.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }
    }

    document.querySelector(".prev-btn").addEventListener("click", scrollLeft);
    document.querySelector(".next-btn").addEventListener("click", scrollRight);
});

document.addEventListener("DOMContentLoaded", function () {
    flatpickr("#date-picker", {
        mode: "range",  // Chọn khoảng ngày
        dateFormat: "d/m/Y",  // Hiển thị định dạng ngày
        minDate: "today",  // Chỉ cho chọn từ hôm nay trở đi
        showMonths: 2,  // Hiển thị 2 tháng cùng lúc
        locale: "vn",  // Dịch ngôn ngữ (nếu có)
        onClose: function (selectedDates) {
            if (selectedDates.length === 2) {
                let nights = Math.round((selectedDates[1] - selectedDates[0]) / (1000 * 60 * 60 * 24));
                document.getElementById("date-picker").value += `, ${nights} đêm`;
            }
        }
    });
});

function toggleGuestRoomPopup() {
    const popup = document.getElementById("guest-room-popup");
    popup.style.display = (popup.style.display === "block") ? "none" : "block";
}

function changeCount(type, amount) {
    const countElement = document.getElementById(`${type}-count`);
    let count = parseInt(countElement.innerText);
    count = Math.max(0, count + amount);
    countElement.innerText = count;
}

function applySelection() {
    const adults = document.getElementById("adults-count").innerText;
    const children = document.getElementById("children-count").innerText;
    const rooms = document.getElementById("rooms-count").innerText;
    document.getElementById("guest-room-text").value = `${adults} người lớn, ${children} trẻ em, ${rooms} phòng`;
    document.getElementById("guest-room-popup").style.display = "none";
}
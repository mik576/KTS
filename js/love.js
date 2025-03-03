//chỉnh thời gian nghỉ dưởng 
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
//chọn sô lượng phòng
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

/*phân trang khách sạn*/

document.addEventListener("DOMContentLoaded", function () {
    const hotels = document.querySelectorAll(".hotel-item");
    const prevBtn = document.querySelector(".prev-page");
    const nextBtn = document.querySelector(".next-page");
    const pageSelect = document.querySelector(".page-select");
    const totalHotels = hotels.length;
    const hotelsPerPage = 5;
    let currentPage = 1;
    const totalPages = Math.ceil(totalHotels / hotelsPerPage);

    function updatePagination() {
        hotels.forEach((hotel, index) => {
            hotel.style.display = index >= (currentPage - 1) * hotelsPerPage && index < currentPage * hotelsPerPage ? "flex" : "none";
        });

        // Cập nhật trạng thái của prev và next button
        prevBtn.disabled = currentPage === 1;
        nextBtn.disabled = currentPage === totalPages;

        // Áp dụng hiệu ứng làm mờ khi bị vô hiệu hóa
        prevBtn.style.opacity = currentPage === 1 ? "0.5" : "1";
        nextBtn.style.opacity = currentPage === totalPages ? "0.5" : "1";

        // Cập nhật dropdown chọn trang
        pageSelect.value = currentPage;
    }

    nextBtn.addEventListener("click", function () {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });

    prevBtn.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    pageSelect.addEventListener("change", function () {
        currentPage = parseInt(pageSelect.value);
        updatePagination();
    });

    updatePagination();
});

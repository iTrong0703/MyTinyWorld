document.addEventListener("DOMContentLoaded", function() {
    const roomCards = document.querySelectorAll('.roomCard'); // Lấy tất cả các thẻ div có class 'roomCard'

    roomCards.forEach(roomCard => {
        roomCard.addEventListener('click', function() {
            const buildingName = roomCard.getAttribute('buildingname'); // Lấy giá trị của thuộc tính 'buildingname'
            window.location.href = `http://localhost:3000/rooms?buildingname=${buildingName}`;
            // Gọi API với buildingName
            fetch(`http://localhost:8080/rooms/getall?buildingname=${buildingName}`)
                .then(response => response.json())
                .then(data => {
                    // Xử lý dữ liệu trả về từ API (nếu cần)
                    console.log("lấy dữ liệu phòng thành công");
                })
                .catch(error => console.error('Error:', error));
        });
    });
});

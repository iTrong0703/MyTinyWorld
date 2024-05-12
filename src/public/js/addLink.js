document.addEventListener("DOMContentLoaded", function() {
    const roomCards = document.querySelectorAll('.roomCard'); // Lấy tất cả các thẻ div có class 'roomCard'

    roomCards.forEach(roomCard => {
        roomCard.addEventListener('click', function() {
            const buildingName = roomCard.getAttribute('buildingname'); // Lấy giá trị của thuộc tính 'buildingname'
            window.location.href = `http://localhost:3000/rooms?buildingname=${buildingName}`;
            
           
        });
    });
});

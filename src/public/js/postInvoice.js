const form = document.getElementById('f-building-crud');


form.addEventListener('submit', async function (event) {
    // Ngăn chặn hành vi mặc định của nút submit
    event.preventDefault();
    const buildingname = document.getElementById('house-name').value;
    const idRoom = form.getAttribute('id-room');
    // Thu thập dữ liệu từ form
    const formData = new FormData(this);
    console.log(buildingname);
    // Chuyển đổi formData thành một đối tượng JSON
    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });
    jsonData['roomId'] = idRoom;

    console.log(JSON.stringify(jsonData));
    // Gửi form đi
    await fetch('http://localhost:8080/invoices/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Có lỗi xảy ra khi gửi dữ liệu lên server');
            }
            return response.json();
        })
        .then((data) => {
            // Xử lý kết quả từ server nếu cần
            console.log('Dữ liệu được gửi thành công:', data);

            Swal.fire({
                title: data.message,
                text: 'Bấm ok để tiếp tục',
                icon: 'success',
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log(result);
                    window.location.href = `/rooms?buildingname=${buildingname}`; // Chuyển hướng về trang chủ
                }
            });
        })
        .catch((error) => {
            console.error('Lỗi:', error);
            alert('Đã xảy ra lỗi khi gửi dữ liệu lên server');
        });
});

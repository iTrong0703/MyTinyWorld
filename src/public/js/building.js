document.getElementById("f-building-crud").addEventListener("submit", function (event) {
    console.log("123123213123213123");
    // Ngăn chặn hành vi mặc định của form
    event.preventDefault();

    // Thu thập dữ liệu từ form
    const formData = new FormData(this);

    fetch("http://localhost:8080/buildings/create", {
        method: "POST",
        body: formData
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Có lỗi xảy ra khi gửi dữ liệu lên server");
            }
            return response.json();
        })
        .then(data => {
            // Xử lý kết quả từ server nếu cần
            console.log("Dữ liệu được gửi thành công:", data);
        })
        .catch(error => {
            console.error("Lỗi:", error);
        });
});
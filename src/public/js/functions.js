const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var App = function () {
    "use strict";
    function togglePasswordVisibility(passwordType, iconShowHide) {
        const passwordInput = $(`#${passwordType}`);

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            iconShowHide.innerHTML = '<i class="fa-regular fa-eye-slash"></i>';
        } else {
            passwordInput.type = 'password';
            iconShowHide.innerHTML = '<i class="fa-regular fa-eye"></i>';
        }
    }

    function togglePageSidebar() {
        var navbarToggle = $('.navbar-toggle');
        var pageContainer = $('#page-container');
        var sidebarContainer = $('#sidebar'); 
        navbarToggle.addEventListener('click', function (event) {
            event.stopPropagation(); // Ngăn sự kiện click từ navbarToggle lan sang document
            // Kiểm tra kích thước màn hình
            if (window.innerWidth <= 767) {
                if(pageContainer.classList.contains('page-sidebar-minified')) {
                    pageContainer.classList.remove('page-sidebar-minified');
                }
                var sidebarContainer = $('.page-with-wide-sidebar .sidebar');
                sidebarContainer.style.left = '0px';
               
               

                // Kiểm tra xem phần tử được nhấp vào có phải là navbarToggle hay không
               
                if (!navbarToggle.contains(event.target)) {
                    sidebarContainer.style.left = '-250px';
                    console.log('test');
                }
            } else {
                pageContainer.classList.toggle('page-sidebar-minified');
                var isMinified = pageContainer.classList.contains('page-sidebar-minified');
                var hasSubItems = document.querySelectorAll('.has-sub');
                if (isMinified) {
                    // Thêm event listener khi page-sidebar-minified được thêm vào
                    hasSubItems.forEach(function (item) {
                        item.addEventListener('mouseover', mouseoverHandler);
                        item.addEventListener('mouseleave', mouseleaveHandler);
                    });
                    
                } else {
                    // Loại bỏ event listener khi page-sidebar-minified được xóa đi
                    hasSubItems.forEach(function (item) {
                        item.removeEventListener('mouseover', mouseoverHandler);
                        item.removeEventListener('mouseleave', mouseleaveHandler);
                    });
                }
            }
                
            
           

        });

        if (window.innerWidth <= 767) {
            document.addEventListener('click', function(event) {
                var isClickOutsideSidebar = !sidebarContainer.contains(event.target);
                if (isClickOutsideSidebar) {
                    sidebarContainer.style.left = '-250px'; // Đặt css cho sidebarContainer
                }
            });
        }
        
         
        // Định nghĩa hàm xử lý sự kiện mouseover
        function mouseoverHandler() {
            this.querySelector('.float-sub-menu-container').style.display = 'block';
        }

        // Định nghĩa hàm xử lý sự kiện mouseleave
        function mouseleaveHandler() {
            this.querySelector('.float-sub-menu-container').style.display = 'none';
        }
    }

    function handleSidebarMenu() {
        // Thêm .active vào object tương ứng với đường dẫn
        // Lấy đường dẫn URL hiện tại
        var currentURL = window.location.pathname;
        // Lặp qua từng phần tử li trong menu
        var menuItems = document.querySelectorAll('.sidebar .nav > li');
        menuItems.forEach(function (item) {
            // Lấy đường dẫn của liên kết nếu phần tử con tồn tại
            var linkElement = item.querySelector('a');
            if (linkElement) {
                var link = linkElement.getAttribute('href');

                // So sánh đường dẫn URL hiện tại với đường dẫn của liên kết
                if (currentURL === link) {
                    // Nếu trùng khớp, thêm lớp "active" vào phần tử li
                    item.classList.add('active');
                } else {
                    // Nếu không trùng khớp, loại bỏ lớp "active" khỏi phần tử li
                    item.classList.remove('active');
                }
            }
        });

        // Menu con của slidebar
        var sidebar = $(".sidebar");
        var sidebarItemsHasSub = sidebar.querySelectorAll(".nav > .has-sub > a");
        var sidebarItemsSub = sidebar.querySelectorAll(".nav > .has-sub .sub-menu li.has-sub > a");


        var disableSlideAnimation = sidebar.getAttribute("data-disable-slide-animation");
        var e = disableSlideAnimation ? 0 : 250;


        sidebarItemsHasSub.forEach(function (item) {
            item.addEventListener("click", function () {
                var subMenu = this.nextElementSibling;
                var otherSubMenus = sidebar.querySelectorAll(".nav > li.has-sub > .sub-menu:not(" + subMenu.tagName + ")");

                if ($$(".page-sidebar-minified").length === 0) {
                    otherSubMenus.forEach(function (menu) {
                        menu.closest("li").classList.add("closing");
                        menu.style.display = "none";
                        menu.closest("li").classList.remove("expand", "closing");
                    });

                    if (subMenu.style.display === "block") {
                        subMenu.closest("li").classList.add("closing");
                        subMenu.style.display = "none";
                        subMenu.closest("li").classList.remove("expand");
                    } else {
                        subMenu.closest("li").classList.add("expanding");
                        subMenu.style.display = "block";
                        subMenu.closest("li").classList.remove("closed");
                    }

                    setTimeout(function () {
                        var closestLi = subMenu.closest("li");
                        if (subMenu.style.display === "block") {
                            closestLi.classList.add("expand");
                            closestLi.classList.remove("closed");
                        } else {
                            closestLi.classList.add("closed");
                            closestLi.classList.remove("expand");
                        }
                        closestLi.classList.remove("expanding", "closing");
                    }, e);
                }
            });
        });

        sidebarItemsSub.forEach(function (item) {
            item.addEventListener("click", function () {
                if ($$(".page-sidebar-minified").length === 0) {
                    var subMenu = this.nextElementSibling;
                    if (subMenu.style.display === "block") {
                        subMenu.closest("li").classList.add("closing");
                        subMenu.style.display = "none";
                        subMenu.closest("li").classList.remove("expand");
                    } else {
                        subMenu.closest("li").classList.add("expanding");
                        subMenu.style.display = "block";
                        subMenu.closest("li").classList.remove("closed");
                    }

                    setTimeout(function () {
                        var closestLi = subMenu.closest("li");
                        if (subMenu.style.display === "block") {
                            closestLi.classList.add("expand");
                            closestLi.classList.remove("closed");
                        } else {
                            closestLi.classList.add("closed");
                            closestLi.classList.remove("expand");
                        }
                        closestLi.classList.remove("expanding", "closing");
                    }, e);
                }
            });
        });


    };

    return {
        togglePasswordVisibility: togglePasswordVisibility,
        togglePageSidebar: togglePageSidebar,
        handleSidebarMenu: handleSidebarMenu
    };




}();

document.addEventListener('DOMContentLoaded', function () {
    var isPasswordToggle = $('#passwordToggle');
    if (isPasswordToggle) {
        isPasswordToggle.addEventListener('click', function () {
            // Gọi hàm togglePasswordVisibility với tham số 'password' và 'this'
            App.togglePasswordVisibility('password', this);
        });
    }

    // Kiểm tra xem phần tử 'page-container' có tồn tại không
    var pageContainer = $('#page-container');
    if (pageContainer) {
        // Nếu phần tử tồn tại, thì gọi hàm togglePageSidebar()
        App.togglePageSidebar();
    }

    // Gọi hàm handleSidebarMenu
    App.handleSidebarMenu();


});


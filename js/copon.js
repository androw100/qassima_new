let allCategories = [];
let allCoupons = [];
let filteredCoupons = [];

// عرض بيانات الفئات
function displayCategories() {
  let box = "";
  if (Array.isArray(allCategories)) {
    allCategories.forEach((category) => {
      box += `
                <div class="item" data-id="${category.id}" data-name="${category.name}">
                    <img id="cat-img" src="${category.photo}" alt="${category.name}">
                    <p>${category.name}</p>
                </div>
            `;
    });
  } else {
    console.error("Expected an array for allCategories");
  }
  const rowDataElement = document.getElementById("row_data");
  if (rowDataElement) {
    rowDataElement.innerHTML = box;
    initializeOwlCarousel();
    addEventListeners();
  } else {
    console.error('Element with id "row_data" not found');
  }
}

// إضافة مستمعات الأحداث للعناصر
function addEventListeners() {
  document.querySelectorAll(".item").forEach((item) => {
    item.addEventListener("click", function () {
      document
        .querySelectorAll(".item")
        .forEach((el) => el.classList.remove("all-cat"));
      this.classList.add("all-cat");
      const categoryId = this.getAttribute("data-id");
      fetchCouponsByCategory(categoryId);
    });
  });
}

// جلب بيانات الفئات
async function fetchCategories() {
  try {
    const response = await fetch("https://qasimahapp.com/api/categories", {
      headers: {
        "Accept-Language": "ar",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data && data.data) {
      allCategories = data.data;
      displayCategories();
    } else {
      console.error("No data found in response");
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
}

// جلب بيانات الكوبونات لجميع الفئات

// جلب بيانات الكوبونات حسب الفئة
async function fetchCouponsByCategory(categoryId) {
  try {
    const response = await fetch(
      `https://qasimahapp.com/api/home/${categoryId}`,
      {
        headers: {
          "Accept-Language": "ar",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    if (data && data.data) {
      displayCoupons(data.data);
    } else {
      console.error("No data found in response");
    }
  } catch (error) {
    console.error(`Error fetching coupons for category ${categoryId}:`, error);
  }
}

async function fetchCoupons() {
  try {
    const response = await fetch("https://qasimahapp.com/api/home/0", {
      headers: {
        "Accept-Language": "ar", // هنا يمكنك تحديد اللغة التي تريد إرسالها، مثل "ar" للعربية أو "en" للإنجليزية
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    if (data && data.data) {
      allCoupons = data.data;
      displayCoupons(allCoupons); // عرض جميع الكوبونات مبدئيًا
    } else {
      console.error("No data found in response");
    }
  } catch (error) {
    console.error("Error fetching coupons:", error);
  }
}
// عرض بيانات الكوبونات
function displayCoupons(coupons) {
  let box = "";
  if (Array.isArray(coupons)) {
    coupons.forEach((coupon, i) => {
      box += `
            
            <div data-aos="zoom-in" class="col-12 mt-lg-5 mt-sm-1 my_copon_desk ">
            <div class="copon-card d-flex justify-content-between align-items-center">
            <div class="name-copon d-flex">
                            <div class="copon-img">
                                <a href="javascript:void(0);" onclick="handleCouponClick(${coupon.id})">
                                    <img class="img-fluid" src="${coupon.image}" alt="${coupon.title}">
                                </a>
                            </div>
                            <div class="main-name-copon">
                                <a href="javascript:void(0);" onclick="handleCouponClick(${coupon.id})">
                                    <h3>${coupon.title}</h3>
                                </a>
                                <p>${coupon.discount_percent}</p>
                            </div>
                        </div>
                        <div class="option p-3 mt-3">
                            <ul class="d-flex text-center align-items-center justify-content-center">
                                <li class="text-center">
                                    <button id="toggle-button-${i}" onclick="toggleDetails(${i})">
                                        <img id="toggle-icon-${i}" src="./images/down.svg" alt="عرض المزيد">
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div id="details-${i}" class="details" style="display: none;">
                        <div class="container text-center">
                            <p class="pt-3">${coupon.description}</p>
                            <div class="container text-center">
                                <div class="row align-items-center justify-content-center">
                                    <div class="col-5 m-3 copy">
                                        <img class="img-fluid m-3" src="./images/teckit.svg" alt="">
                                        انسخ الكود من التطبيق
                                    </div>
                                    <div class="col-5 m-3 copy"><a href="${coupon.url}">
                                      <i class="fa-solid fa-cart-shopping m-3"></i>
                                        تسوق الان
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
              <div class="container my_copon_phone">
                            <div class="copon-card d-flex justify-content-between align-items-center">
                                <div class="name-copon">
                                    <div class="copon-img">
                                        <a href="javascript:void(0);" onclick="handleCouponClick(${coupon.id})">
                                            <img class="img-fluid" src="${coupon.image}" alt="${coupon.title}">
                                        </a>
                                    </div>
                                    <div class="main-name-copon">
                                        <a href="javascript:void(0);" onclick="handleCouponClick(${coupon.id})">
                                            <h3>${coupon.title}</h3>
                                        </a>
                                        <p>${coupon.discount_percent}</p>
                                    </div>
                                </div>
                                <div class="option p-3 mt-3">
                                    <ul class="d-flex text-center align-items-center justify-content-center">
                                        <li class="text-center">
                                            <button class="btn" id="toggle-button-${coupon.id}" onclick="toggleDetails(${coupon.id})">
                                                <img id="toggle-icon-${coupon.id}" src="./images/down.svg" alt="عرض المزيد">
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div id="details-${coupon.id}" class="details" style="display: none;">
                                <div class="container text-center">
                                    <p class="pt-3">${coupon.description}</p>
                                    <div class="container text-center">
                                        <div class="row align-items-center d-flex">
                                            <div class="col-8 m-1 mb-3 copy">
 <a href="http://Onelink.to/qasimahapp">
                <img class="img-fluid m-1" src="./images/teckit.svg" alt="">
                انسخ الكود من التطبيق</a>                                                
                                            </div>
                                            <div class="col-3 m-1 mb-3 copy">
                                            <a href="${coupon.url}">
                                                <i class="fa-solid fa-cart-shopping m-3"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
            `;
    });
  } else {
    console.error("Expected an array for coupons");
  }
  const rowDataElement = document.getElementById("category-container");
  if (rowDataElement) {
    rowDataElement.innerHTML = box;
  } else {
    console.error('Element with id "category-container" not found');
  }
}

// عند الضغط على الكوبون
function handleCouponClick(couponId) {
  localStorage.setItem("selectedCouponId", couponId);
  window.location.href = "coupon-details.html";
}

function toggleDetails(index) {
  const details = document.getElementById(`details-${index}`);
  const icon = document.getElementById(`toggle-icon-${index}`);
  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block";
    icon.src = "./images/up.svg"; // استبدال السهم إلى أعلى
    icon.alt = "عرض أقل";
  } else {
    details.style.display = "none";
    icon.src = "./images/down.svg"; // استبدال السهم إلى أسفل
    icon.alt = "عرض المزيد";
  }
}

// تهيئة Owl Carousel
function initializeOwlCarousel() {
  $("#row_data").owlCarousel({
    rtl: true,
    loop: true,
    margin: 10,
    nav: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: {
        items: 2,
      },
      600: {
        items: 4,
      },
      1000: {
        items: 6,
      },
    },
  });
}

// فتح القائمة الجانبية
function openNav() {
  const mySidenav = document.getElementById("mySidenav");
  const main = document.getElementById("main");
  if (mySidenav && main) {
    mySidenav.style.width = "100%";
    main.style.marginLeft = "250px";
  } else {
    console.error('Elements with id "mySidenav" or "main" not found');
  }
}

// غلق القائمة الجانبية
function closeNav() {
  const mySidenav = document.getElementById("mySidenav");
  const main = document.getElementById("main");
  if (mySidenav && main) {
    mySidenav.style.width = "0";
    main.style.marginLeft = "0";
  } else {
    console.error('Elements with id "mySidenav" or "main" not found');
  }
}

// تهيئة AOS
AOS.init();

// عرض المزيد من العناصر
document
  .getElementById("show-more-btn")
  ?.addEventListener("click", function () {
    document
      .querySelectorAll(".more")
      .forEach((el) => (el.style.display = "block"));
    this.style.display = "none";
  });

// جلب بيانات الفئات وكوبونات
fetchCategories();
fetchCoupons();

// document.addEventListener("DOMContentLoaded", function() {
//     const apiUrl = "https://qasimahapp.com/api/home/0";

//     async function fetchApi() {
//         try {
//             const data = await fetch(apiUrl, {
//                 mode: 'no-cors'
//             });

//             console.log(data);
//         } catch (error) {
//             console.error("Error fetching API:", error);
//         }
//     }

//     fetchApi();
// });

// document.addEventListener("DOMContentLoaded", function() {
//     const apiUrl = "https://qasimahapp.com/api/home/0";

//     async function fetchApi() {
//         try {
//             const response = await fetch(apiUrl);
//             const data = await response.json();

//             console.log(data);
//         } catch (error) {
//             console.error("Error fetching API:", error);
//         }
//     }

//     fetchApi();
// });

// document.addEventListener("DOMContentLoaded", function() {
//     const apiUrl = "https://qasimahapp.com/api/banners";

//     async function fetchApi() {
//         try {
//             const response = await fetch(apiUrl); // إزالة 'no-cors'

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             const data = await response.json(); // تحويل الاستجابة إلى JSON
//             console.log(data); // عرض البيانات في الكونسل
//         } catch (error) {
//             console.error("Error fetching API:", error);
//         }
//     }

//     fetchApi();
// });
// WARNING: For GET requests, body is set to null by browsers.

// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;

// xhr.addEventListener("readystatechange", function() {
//   if(this.readyState === 4) {
//     console.log(this.responseText);
//   }
// });

// xhr.open("GET", "https://qasimahapp.com/api/categories");
// xhr.setRequestHeader("", "");

// xhr.send();

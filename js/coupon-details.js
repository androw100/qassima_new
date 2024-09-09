// فتح القائمة الجانبية
async function openNav() {
  try {
    const mySidenav = document.getElementById("mySidenav");
    const main = document.getElementById("main");
    if (mySidenav && main) {
      mySidenav.style.width = "100%";
      main.style.marginLeft = "250px";
    } else {
      console.error('Elements with id "mySidenav" or "main" not found');
    }
  } catch (error) {
    console.error("Error opening nav:", error);
  }
}

async function closeNav() {
  try {
    const mySidenav = document.getElementById("mySidenav");
    const main = document.getElementById("main");
    if (mySidenav && main) {
      mySidenav.style.width = "0";
      main.style.marginLeft = "0";
    } else {
      console.error('Elements with id "mySidenav" or "main" not found');
    }
  } catch (error) {
    console.error("Error closing nav:", error);
  }
}

AOS.init();

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const couponId = localStorage.getItem("selectedCouponId");
    if (couponId) {
      const apiUrl = "https://qasimahapp.com/api/home/0";
      const response = await fetch(apiUrl, {
        headers: { "Accept-Language": "ar" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const container = document.getElementById("coupontitle");
      const coupon = data.data.find((coupon) => coupon.id == couponId);
      if (coupon) {
        const couponHTML = `<li>${coupon.title}</li>`;
        container.innerHTML = couponHTML;
      } else {
        container.innerHTML = "<p>لم يتم العثور على تفاصيل الكوبون.</p>";
      }
    } else {
      document.getElementById("coupontitle").innerHTML =
        "<p>لم يتم العثور على تفاصيل الكوبون.</p>";
    }
  } catch (error) {
    console.error("Error fetching coupon title:", error);
    document.getElementById("coupontitle").innerHTML =
      "<p>حدث خطأ أثناء جلب البيانات.</p>";
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const couponId = localStorage.getItem("selectedCouponId");
    if (couponId) {
      const apiUrl = "https://qasimahapp.com/api/home/0";
      const response = await fetch(apiUrl, {
        headers: { "Accept-Language": "ar" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const container = document.getElementById("coupon-details");
      const coupon = data.data.find((coupon) => coupon.id == couponId);
      if (coupon) {
        const couponHTML = `
          <div class="container">
            <div class="first">
              <div class="card" id="cardy">
                <div class="row align-items-center">
                  <div class="col-lg-2 col-md-12 col-sm-12">
                    <img src="${coupon.image_coupon}" class="card-img-top" alt="${coupon.title}">
                  </div>
                  <div class="col-lg-10 col-md-12 col-sm-12">
                    <div class="card-body">
                      <h2>${coupon.title}</h2>
                      <p class="card-text">${coupon.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `;
        container.innerHTML = couponHTML;
        triggerImageCapture(); // استدعاء الجزء الثاني لالتقاط الصورة
      } else {
        container.innerHTML = "<p>لم يتم العثور على تفاصيل الكوبون.</p>";
      }
    } else {
      document.getElementById("coupon-details").innerHTML =
        "<p>لم يتم العثور على تفاصيل الكوبون.</p>";
    }
  } catch (error) {
    console.error("Error fetching coupon details:", error);
    document.getElementById("coupon-details").innerHTML =
      "<p>حدث خطأ أثناء جلب البيانات.</p>";
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const couponId = localStorage.getItem("selectedCouponId");
    if (couponId) {
      const apiUrl = "https://qasimahapp.com/api/home/0";
      const response = await fetch(apiUrl, {
        headers: { "Accept-Language": "ar" },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      const container = document.getElementById("coupon-detail");
      const coupon = data.data.find((coupon) => coupon.id == couponId);
      if (coupon) {
        const couponHTML = `
          <div class="container">
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
 <button class="btn" id="toggle-button-${coupon.id}" onclick="toggleDetails(${coupon.id})">
  <img id="toggle-icon-${coupon.id}" src="./images/up.svg" alt="عرض أقل">
</button>

                  </li>
                </ul>
              </div>
            </div>
            <div id="details-${coupon.id}" class="details" >
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
            <div class="row mt-3 justify-content-center">
              <div class="col-auto">
                <button class="btn" id="show-more-btn">
                  <a href="./copon.html">عرض المزيد</a>
                </button>
              </div>
            </div>
               <div id="capture" style="padding: 10px; background:white">
            <div class="my_border text-center" id="border">
                <h3 class="pt-5 p-2">خصم رهيب من ${coupon.title}</h3>
                <div class="container text-center">
                    <div class="row align-items-center justify-content-center mt-5 mb-5">
                        <div class="my_border_img">
                            <img src="${coupon.image}" alt="">
                        </div>
                        <h3 class="m-3"><i class="fa-solid fa-xmark"></i></h3>
                        <div class="my_border_img_qass">
                            <img src="./images/logo.png" alt="">
                        </div>
                    </div>
                    <h4>متوفر الحين في قسيمة</h4>
                    <h6 class="mt-5">الحصريات لعبتنا حمّل تطبيقنا وخليك مميز!</h6>
                    <div class="container justify-content-center mt-3 mb-5">
                        <div class="row justify-content-center">

                            <a class="ml-1" href="http://Onelink.to/qasimahapp">
                                <img class="img-fluid section-two-img-one" src="./images/app-store.png" alt="">
                                <img class="img-fluid section-two-img-two" src="./images/app-store-mobile.svg" alt="">
                            </a>


                            <a class="mr-1" href="http://Onelink.to/qasimahapp">
                                <img class="img-fluid section-two-img-one" src="./images/google-play.png" alt="">
                                <img class="img-fluid section-two-img-two" src="./images/google-play-mobile.svg" alt="">
                            </a>

                        </div>
                    </div>
                </div>
            </div>
        </div>
            <div class="text-start editor_section mt-5 mb-5">
              ${coupon.items_description_pages.editor_section.ar}
            </div>
          </div>
        `;
        container.innerHTML = couponHTML;
        triggerImageCapture(); // استدعاء الجزء الثاني لالتقاط الصورة
      } else {
        container.innerHTML = "<p>لم يتم العثور على تفاصيل الكوبون.</p>";
      }
    } else {
      document.getElementById("coupon-detail").innerHTML =
        "<p>لم يتم العثور على تفاصيل الكوبون.</p>";
    }
  } catch (error) {
    console.error("Error fetching coupon detail:", error);
    document.getElementById("coupon-detail").innerHTML =
      "<p>حدث خطأ أثناء جلب البيانات.</p>";
  }
});

function copyCode(code) {
  navigator.clipboard
    .writeText(code)
    .then(() => {
      alert("تم نسخ الكود!");
    })
    .catch((err) => {
      console.error("Failed to copy code: ", err);
    });
}

function shopNow(url) {
  window.open(url, "_blank");
}

let allCategories = [];
let allCoupons = [];
let filteredCoupons = [];

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

function triggerImageCapture() {
  const images = document.querySelectorAll("#coupon-detail img");
  const totalImages = images.length;
  let imagesLoaded = 0;

  images.forEach((img) => {
    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === totalImages) {
        html2canvas(document.querySelector("#capture"))
          .then((canvas) => {
            document.body.appendChild(canvas);
            postCaptureActions(); // استدعاء الجزء الثالث بعد التقاط الصورة
          })
          .catch((error) => {
            console.error("Error capturing image:", error);
          });
      }
    };
  });
}

function postCaptureActions() {
  console.log("Image captured successfully and added to the document.");
}

function toggleDetails(id) {
  const details = document.getElementById(`details-${id}`);
  const toggleIcon = document.getElementById(`toggle-icon-${id}`);

  if (details.style.display === "block") {
    details.style.display = "none";
    toggleIcon.src = "./images/up.svg"; // استبدال السهم إلى أعلى
    toggleIcon.alt = "عرض أقل";
  } else {
    details.style.display = "block";
    toggleIcon.src = "./images/down.svg"; // استبدال السهم إلى أسفل
    toggleIcon.alt = "عرض المزيد";
  }
}

function handleCouponClick(id) {
  console.log(`Coupon ${id} clicked`);
}

document
  .getElementById("show-more-btn")
  ?.addEventListener("click", function () {
    document
      .querySelectorAll(".more")
      .forEach((el) => (el.style.display = "block"));
    this.style.display = "none";
  });

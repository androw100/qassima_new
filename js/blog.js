function openNav() {
  document.getElementById("mySidenav").style.width = "100%";
  document.getElementById("main").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

AOS.init();

// async function fetchBlogs() {
//   try {
//     const response = await fetch("https://qasimahapp.com/api/blogs", {
//       headers: {
//         "Accept-Language": "ar", // هنا يمكنك تحديد اللغة التي تريد إرسالها، مثل "ar" للعربية أو "en" للإنجليزية
//       },
//     });

//     if (!response.ok) {
//       throw new Error("حدث خطأ في الاتصال بالشبكة: " + response.statusText);
//     }

//     const data = await response.json();
//     if (data && data.data) {
//       allBlogs = data.data;
//       displayBlogs(allBlogs); // عرض جميع المدونات مبدئيًا
//     } else {
//       console.error("لم يتم العثور على بيانات في الاستجابة");
//     }
//   } catch (error) {
//     console.error("حدث خطأ أثناء جلب المدونات:", error);
//   }
// }
async function fetchBlogs() {
  try {
    // إنشاء URL مع المعلمة all_langs في params
    const url = new URL("https://qasimahapp.com/api/blogs");
    url.searchParams.append("all_langs", "ar"); // إضافة المعلمة all_langs بالقيمة ar

    const response = await fetch(url, {
      headers: {
        "Accept-Language": "ar", // هنا يمكنك تحديد اللغة التي تريد إرسالها
      },
    });

    if (!response.ok) {
      throw new Error("حدث خطأ في الاتصال بالشبكة: " + response.statusText);
    }

    const data = await response.json();
    if (data && data.data) {
      allBlogs = data.data;
      displayBlogs(allBlogs); // عرض جميع المدونات مبدئيًا
    } else {
      console.error("لم يتم العثور على بيانات في الاستجابة");
    }
  } catch (error) {
    console.error("حدث خطأ أثناء جلب المدونات:", error);
  }
}

// عرض بيانات المدونات
function displayBlogs(blogs) {
  let box = "";
  if (Array.isArray(blogs)) {
    blogs.forEach((blog, i) => {
      box += `
              <div class="col-lg-4 col-sm-12 mt-5">
                  <a href="javascript:void(0);" onclick="handleBlogClick(${blog.id})">
                      <img src="${blog.image}" class="img-fluid" alt="${blog.title_ar}" />
                      <p class="date">${blog.description_ar}</p>
                      <div class="discond">
                          <p>${blog.title_ar}</p>
                      </div>
                    
                  </a>
              </div>
          `;
    });
  } else {
    console.error("Expected an array for blogs");
  }
  const rowDataElement = document.getElementById("category-container");
  if (rowDataElement) {
    rowDataElement.innerHTML = box;
  } else {
    console.error('Element with id "category-container" not found');
  }
}

// عند الضغط على المدونة
function handleBlogClick(blogId) {
  localStorage.setItem("selectedBlogId", blogId);
  window.location.href = "blog_details.html";
}

fetchBlogs();

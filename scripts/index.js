// START MODAL WINDOW
const modalWindowTheme = document.getElementById("myModal");
const btnAddTheme = document.getElementById("myBtn");
const btnClose = document.getElementsByClassName("modal__close")[0];

const bntPOSTTheme = document.getElementById("submitTheme");

btnAddTheme.onclick = function () {
  modalWindowTheme.style.display = "flex";
};

btnClose.onclick = function () {
  modalWindowTheme.style.display = "none";
};

//вызов окна по кнопке signup
function openSignUp() {
  let signupButton = document.getElementById("signUp");
  let signupBack = document.getElementById("signupOverlay");
  let displayButton = getComputedStyle(signupButton).display;
  let displayBack = getComputedStyle(signupBack).display;

  if (displayButton == "none") {
    signupButton.style.display = "block";
  }
  if (displayBack == "none") {
    signupBack.style.display = "block";
  }
}

//закрытие окна по крестику sign up

function closeSignUp() {
  let signupButton = document.getElementById("signUp");
  let signupBack = document.getElementById("signupOverlay");
  let displayButton = getComputedStyle(signupButton).display;
  let displayBack = getComputedStyle(signupBack).display;

  if (displayButton == "block") {
    signupButton.style.display = "none";
  }
  if (displayBack == "block") {
    signupBack.style.display = "none";
  }
}

//вызов окна по кнопке login
function openLogIn() {
  let loginButton = document.getElementById("logIn");
  let loginBack = document.getElementById("signupOverlay");
  let displayButton = getComputedStyle(loginButton).display;
  let displayBack = getComputedStyle(loginBack).display;

  if (displayButton == "none") {
    loginButton.style.display = "block";
  }

  if (displayBack == "none") {
    loginBack.style.display = "block";
  }
}

//закрытие окна по крестику log in

function closeLogIn() {
  let loginButton = document.getElementById("logIn");
  let loginBack = document.getElementById("signupOverlay");
  let displayButton = getComputedStyle(loginButton).display;
  let displayBack = getComputedStyle(loginBack).display;

  if (displayButton == "block") {
    loginButton.style.display = "none";
  }

  if (displayBack == "block") {
    loginBack.style.display = "none";
  }
}

// Функция для новой темы

bntPOSTTheme.onclick = function (e) {
  e.preventDefault();

  const nameTheme = document.querySelector("#nameTheme").value;

  if (nameTheme == "") {
    alert("Как будет называться новая тема?");
    return;
  }
  const newTheme = {
    name: `${nameTheme}`,
  };

  fetch("https://inlaid-backbone-404620.oa.r.appspot.com:443/theme", {
    method: "POST",
    headers: { "Content-Type": "application/json;charset=utf-8" },
    body: JSON.stringify(newTheme),
  })
    .then((response) => response.json())

    .catch(error => console.log(error))
      
    .finally(modalWindowTheme.style.display = "none");

  document.querySelector('#nameTheme').value = '';

  getTheme(); //Обновление списка тем
};

// END MODAL WINDOW

// для строки поиска

// для списка всех тем

const themeList = document.querySelectorAll(".box");
const error = document.querySelector(".error");
const loader = document.querySelector(".loader");

window.setTimeout(() => {
  getTheme();
}, 1000); // Задержка 1 секунды, крутится лоадер

function getTheme() {
  fetch("https://inlaid-backbone-404620.oa.r.appspot.com:443/themes")
    .then((response) => {
      return response.json();
    })

    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        const item = new Object(data[i]);
        themeList[i].innerHTML = item["name"];
      }
      document.querySelector(".home").classList.remove("none");
    })

    .catch((e) => {
      console.error(e);
      error.classList.remove("none");
    })

    .finally(() => {
      loader.classList.add("none");
    });
}

const btnUp = {
  // Кнопка прокрутки вверх
  el: document.querySelector(".btn-up"),
  scrolling: false,
  show() {
    if (
      this.el.classList.contains("btn-up_hide") &&
      !this.el.classList.contains("btn-up_hiding")
    ) {
      this.el.classList.remove("btn-up_hide");
      this.el.classList.add("btn-up_hiding");
      window.setTimeout(() => {
        this.el.classList.remove("btn-up_hiding");
      }, 300);
    }
  },
  hide() {
    if (
      !this.el.classList.contains("btn-up_hide") &&
      !this.el.classList.contains("btn-up_hiding")
    ) {
      this.el.classList.add("btn-up_hiding");
      window.setTimeout(() => {
        this.el.classList.add("btn-up_hide");
        this.el.classList.remove("btn-up_hiding");
      }, 300);
    }
  },
  addEventListener() {
    // при прокрутке окна (window)
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      if (this.scrolling && scrollY > 0) {
        return;
      }
      this.scrolling = false;
      // если пользователь прокрутил страницу более чем на 200px
      if (scrollY > 400) {
        // сделаем кнопку .btn-up видимой
        this.show();
      } else {
        // иначе скроем кнопку .btn-up
        this.hide();
      }
    });
    // при нажатии на кнопку .btn-up
    document.querySelector(".btn-up").onclick = () => {
      this.scrolling = true;
      this.hide();
      // переместиться в верхнюю часть страницы
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    };
  },
};

btnUp.addEventListener();


// START MODAL WINDOW
let modalWindowTheme = document.getElementById('myModal');
let btnAddTheme = document.getElementById("myBtn");
let btnClose = document.getElementsByClassName("modal__close")[0];

const bntPOST = document.getElementById('submitTheme');
let nameTheme = document.querySelector('#nameTheme');

btnAddTheme.onclick = function() {
    modalWindowTheme.style.display = "block";
}

btnClose.onclick = function() {
    modalWindowTheme.style.display = "none";
}

bntPOST.onclick = function (e) {
  e.preventDefault();

  let newTheme = {
    // id: '123',
    name: `${nameTheme.value}`,
  };
  // let d = toString(newCard);
  console.log(newTheme);
  // console.log(newCard.name);
  // console.log(newCard.discriptional);

  fetch("http://localhost:8080/theme",
      {
          method: 'POST',
          headers: { "Content-Type": "application/json;charset=utf-8" },
          body: JSON.stringify(newTheme),
      })
      .then(response => response.json())
      .then(theme => {
          console.log(theme);
      })
      .catch(error => console.log(error));
}


// END MODAL WINDOW

// для строки поиска

// для тем 

const themeList = document.querySelectorAll('.box');


function getTheme () {
  fetch ("http://localhost:8080/themes")

  .then((response) => {
    return response.json();
  })

  .then((data) => {
    
    for (let i = 0; i < data.length; i++) {
      const item = new Object(data[i]);
    themeList[i].innerHTML = item['name'];
    }
  })
  
  .catch ((e) => {
    console.error(e);
    // alert('Возникла ошибка при подключении к серверу!')
  })

  .finally(() => {
    // loader.classList.add("none");
  });
  }


  getTheme ();



const btnUp = {
  el: document.querySelector('.btn-up'),
  scrolling: false,
  show() {
    if (this.el.classList.contains('btn-up_hide') && !this.el.classList.contains('btn-up_hiding')) {
      this.el.classList.remove('btn-up_hide');
      this.el.classList.add('btn-up_hiding');
      window.setTimeout(() => {
        this.el.classList.remove('btn-up_hiding');
      }, 300);
    }
  },
  hide() {
    if (!this.el.classList.contains('btn-up_hide') && !this.el.classList.contains('btn-up_hiding')) {
      this.el.classList.add('btn-up_hiding');
      window.setTimeout(() => {
        this.el.classList.add('btn-up_hide');
        this.el.classList.remove('btn-up_hiding');
      }, 300);
    }
  },
  addEventListener() {
    // при прокрутке окна (window)
    window.addEventListener('scroll', () => {
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
    document.querySelector('.btn-up').onclick = () => {
      this.scrolling = true;
      this.hide();
      // переместиться в верхнюю часть страницы
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();
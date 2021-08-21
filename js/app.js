// 252122F310

const isReturnCartRef = (config) => {
  galleryRef.insertAdjacentHTML(
    'beforeend',
    `<div class = "card"><div class = "image__box"><img class="image" src= ${config.img} alt =${config.name}></div> <div class= "data"><h2 class="title">${config.article}</h2><h2 class="text__manufacture">${config.manufacture}</h2> <p class="text__name">${config.name}</p> </div></div>`
  );
  console.log(galleryRef);

  return galleryRef;
};
const mainFunction = (artFind) => {
  const request = new XMLHttpRequest();

  request.open(
    'GET',
    `https://autodoka-srv.com/Meric/hs/tecdoc/oemget?token=XZyPxz4lC3e8AcO2qwkxDgGxd5D1vmOr&VendorCode=${artFind}&SearchType=10`
  );

  request.responseType = 'json';

  request.onload = function () {
    request.response.data.map((elem) => {
      elem.articles.map((position, array) => {
        let img = '';
        let name = '';
        let article = '';
        let manufacture = '';
        const { articleNumber, mfrName, genericArticles, images } = position;
        article = articleNumber;
        manufacture = mfrName;
        name = genericArticles[0].genericArticleDescription;
        img = isImages(images);
        const config = { article, manufacture, name, img };
        console.log(config);
        isReturnCartRef(config);

        // вызов функции вывода в таблицу
      });
    });
  };
  const isImages = (images) => {
    let img = '';

    if (images.length === 0) {
      img = 'https://autodoka-srv.com/web/nofoto.png';
    } else {
      images.map((image) => {
        if (image.hasOwnProperty('imageURL800')) {
          img = image.imageURL800;
        } else {
          img = 'https://autodoka-srv.com/web/nofoto.png';
        }
      });
    }
    return img;
  };
  request.send();
};

const configRef = {
  inputRef: document.querySelector('.input'),
  btnFindRef: document.querySelector('[data-action = "find"]'),
  galleryRef: document.querySelector('#gallery'),
};

const { inputRef, btnFindRef, galleryRef } = configRef;
// inputRef.value = '252122F310';
const inputValueRef = () => {
  if (inputRef.value === '') {
    alert('Артикул не должен быть пустой');
  } else {
    mainFunction(inputRef.value);
  }
};
btnFindRef.addEventListener('click', inputValueRef);

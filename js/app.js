const mainFunction = (artFind) => {
  const request = new XMLHttpRequest();

  request.open(
    'GET',
    `https://autodoka-srv.com/Meric/hs/tecdoc/oemget?token=XZyPxz4lC3e8AcO2qwkxDgGxd5D1vmOr&VendorCode=${artFind}&SearchType=10`
  );

  request.responseType = 'json';
  console.log(request);

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
        img = isImages(array, images);
        console.log(article);
        // вызов функции вывода в таблицу
      });
    });
  };
  const isImages = (array, images) => {
    let img = '';
    if (array.length === 0) {
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
// 252122F310

const configRef = {
  inputRef: document.querySelector('.input'),
  btnFindRef: document.querySelector('[data-action = "find"]'),
};

const { inputRef, btnFindRef } = configRef;

const inputValueRef = () => {
  if (inputRef.value === '') {
    alert('Артикул не должен быть пустой');
  } else {
    mainFunction(inputRef.value);
  }
};
btnFindRef.addEventListener('click', inputValueRef);

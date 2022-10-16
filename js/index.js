//Variables that store the chosen options.
let mainCourse = null;
let drink = null;
let dessert = null;

//Variables that store the user's info
let username = null;
let address = null;

//Receives a string containing the price and converts it to a number
function formatPrice(strPrice) {
  let price = strPrice.split(" ");
  price = Number(price[1].replace(",", "."));
  price = Number(price.toFixed(2));
  return price;
}

//Receives an order and calculates its total price.
function totalPrice(order) {
  let totalPrice = 0;

  for (choice in order) {
    totalPrice += order[choice].price;
  }

  return totalPrice;
}

//Returns an object containing the order.
function getOrder() {
  const order = {
    mainCourse: {
      title: mainCourse.querySelector(".card__title").innerHTML,
      price: formatPrice(mainCourse.querySelector(".card__price").innerHTML),
    },

    drink: {
      title: drink.querySelector(".card__title").innerHTML,
      price: formatPrice(drink.querySelector(".card__price").innerHTML),
    },

    dessert: {
      title: dessert.querySelector(".card__title").innerHTML,
      price: formatPrice(dessert.querySelector(".card__price").innerHTML),
    },
  };
  return structuredClone(order);
}

//Function that enables/disables the close order button.
function buttonEnableToggle() {
  //Closing order is enabled only if mainCourse, drink and dessert exist
  if (mainCourse && drink && dessert) {
    const closeOrder = document.querySelector(".close-order");
    closeOrder.classList.add("close-order--enabled");

    //Changes the text of the button. It is assumed that the only element in 'close order' is a button.
    closeOrder.lastElementChild.innerHTML = "Fechar pedido";
  }
}

//Main course section pick handler.
function handlingMainCourseClick(clicked) {
  if (!mainCourse) {
    mainCourse = clicked;
  } else {
    mainCourse.classList.remove("card--selected");
    mainCourse = clicked;
  }

  clicked.classList.add("card--selected");
  buttonEnableToggle();
}

//Drink section pick handler.
function handlingDrinkClick(clicked) {
  if (!drink) {
    drink = clicked;
  } else {
    drink.classList.remove("card--selected");
    drink = clicked;
  }

  clicked.classList.add("card--selected");
  buttonEnableToggle();
}

//Dessert section pick handler.
function handlingDessertClick(clicked) {
  if (!dessert) {
    dessert = clicked;
  } else {
    dessert.classList.remove("card--selected");
    dessert = clicked;
  }

  clicked.classList.add("card--selected");
  buttonEnableToggle();
}

function handlingCloseOrderBtnClick(btn) {
  username = null;
  address = null;
  //The action of button is done only if mainCourse, drink and dessert exist
  if (mainCourse && drink && dessert) {
    //Request customer name and address
    username = prompt("Qual é o seu nome?");
    address = prompt("Digite seu endereço:");

  //Username and address are required
    if (username && address) {
      const confirmOrder = document.querySelector(".confirm-order");
      const order = getOrder();
      const items = confirmOrder.querySelectorAll(
        ".confirm-order-card .order-item"
      );
      const ENUM_CATEGORIA = {
        0: "mainCourse",
        1: "drink",
        2: "dessert",
      };

      //Fills 'confirm-order-card' with the chosen items
      items.forEach((item, index) => {
        const title = order[ENUM_CATEGORIA[index]].title;
        const price = order[ENUM_CATEGORIA[index]].price;
        const priceFormated = "R$ " + price.toFixed(2).replace(".", ",");

        item.querySelector(".title").innerHTML = title;
        item.querySelector(".price").innerHTML = priceFormated;
      });

      //Fills the total price
      const price = confirmOrder.querySelector(".total-price .price");
      const priceFormated =
        "R$" + totalPrice(order).toFixed(2).replace(".", ",");
      price.innerHTML = priceFormated;

      //Shows the 'confirm-order' on screen
      confirmOrder.classList.add("confirm-order--show");
    } else {
      alert(
        "Desculpe... Você precisa preencher os campos de nome e endereço para continuar."
      );
    }
  }
}

function handlingConfirmOrderBtnClick() {
  const order = getOrder();
  
  //Genarates the msg
  const whatsappMsg =
    "Olá, gostaria de fazer o pedido:" +
    `\n- Prato: ${order.mainCourse.title}` +
    `\n- Bebida: ${order.drink.title}` +
    `\n- Sobremesa: ${order.dessert.title}` +
    `\nTotal: R$ ${totalPrice(order).toFixed(2)}` +
    `\n\n Nome: ${username}` +
    `\n Endereço: ${address}`;

  //Generates the URL for whatsapp
  const whatsappMsgUrl = `https://wa.me/5521975807969?text=${encodeURI(
    whatsappMsg
  )}`;

  //Redirects the user to whatsapp
  window.open(whatsappMsgUrl, "_blank");

  document.querySelector(".confirm-order").classList.remove("confirm-order--show");
}

function handlingCancelOrderBtnClick() {
  document
    .querySelector(".confirm-order")
    .classList.remove("confirm-order--show");
}
import "./css/index.css"
import IMask from "imask";

const ccBgColor01 = document.querySelector('.cc-bg svg > g g:nth-child(1) path');
const ccBgColor02 = document.querySelector('.cc-bg svg > g g:nth-child(2) path');
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img");


function setCardType(type) {
  const colors = {
    "visa": ["#436D99", "#2D57F2"],
    "mastercard": ["#C69347", "#DF6F29"],
    "default": ["#24242a", "#0009"],
  };

  ccBgColor01.setAttribute('fill', colors[type][0]);
  ccBgColor02.setAttribute('fill', colors[type][1]);
  ccLogo.setAttribute("src", `cc-${type}.svg`);
};

setCardType("default");

globalThis.setCardType = setCardType;

const securityCode = document.querySelector('#security-code');
const securityCodePattern = {
  mask: "0000",
};
const securityCodeMasked = IMask(securityCode, securityCodePattern);

const expirationDate = document.querySelector('#expiration-date');
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    }
  }
};
const expirationDateMasked = IMask(expirationDate, expirationDatePattern);

const cardNumber = document.querySelector('#card-number');
const cardNumberPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/, 
      cardtype: "visa",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
      cardtype: "mastercard",
    },
    {
      mask: "0000 0000 0000 0000",
      cardtype: "default",
    },
  ],
  dispatch: function(appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, '');
    const foundMask = dynamicMasked.compiledMasks.find(function(item) {
      return number.match(item.regex);
    });

    return foundMask;
  },
};
const cardNumberMasked = IMask(cardNumber, cardNumberPattern);

const addButton = document.querySelector("#add-card");
addButton.addEventListener("click", () => {
  if (cardNumber.value == "" || cardHolder.value == '' || expirationDate.value == '' || securityCode.value == '') {
    alert("[ERRO] Faltam preencher dados!");
  } else {
    alert("Seu cartão foi adicionado!");
    location.reload();
  }
});

document.querySelector("form").addEventListener('submit', event => {
  event.preventDefault();
});

const cardHolder = document.querySelector('#card-holder');
cardHolder.addEventListener('input', () => {
  const ccHolder = document.querySelector('.cc-holder .value');

  ccHolder.innerText = cardHolder.value.length === 0 ? "FULANO" : cardHolder.value;
});

securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value);
});

function updateSecurityCode(code) {
  const ccSecurity = document.querySelector(".cc-security .value");

  ccSecurity.innerText = code.length === 0 ? "123" : code;
};

cardNumberMasked.on('accept', () => {
  const cardType = cardNumberMasked.masked.currentMask.cardtype;
  setCardType(cardType);
  updateCardNumber(cardNumberMasked.value);
});

function updateCardNumber(number) {
  const ccNumber = document.querySelector('.cc-number');

  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" :  number;
};

expirationDateMasked.on('accept', () => {
  updateExpirationDate(expirationDateMasked.value);
});

function updateExpirationDate(date) {
  const ccExpiration = document.querySelector(".cc-extra .value");
};
  ccExpiration.innerText = date.length === 0 ? "02/32" : date;

/* Fala Devs! 



Venho aqui para agradecer aos gigantes Mayk Brito, Rodrigo Gonçalves Santana e Jakeliny Gracielly pelo grande evento da Rocketseat (Explorer Lab).



Nas aulas, foram abordados assuntos como Expressões Regulares, manipulação do DOM, e até trabalhado com alguns Frameworks.



O intuito do evento era demonstrar princípios de manipulação da DOM, com JavaScript.



Link do Deploy: https://rocketpay-indol.vercel.app/

Link do Repositório: https://github.com/cristian-sbardelotto/rocketpay

#javascript #dom #explorerlab #html #css 



-------------------------------------------------------------------------------------
634 / 5.000
Resultados de tradução
Speak Devs!



I come here to thank the giants Mayk Brito, Rodrigo Gonçalves Santana and Jakeliny Gracielly for the great event at Rocketseat (Explorer Lab).



In the classes, subjects such as Regular Expressions, DOM manipulation, and even worked with some Frameworks were addressed.



The purpose of the event was to demonstrate principles of DOM manipulation, with JavaScript.



Deploy link: https://rocketpay-indol.vercel.app/

Repository Link: https://github.com/cristian-sbardelotto/rocketpay

#javascript #dom #explorerlab #html #css



-------------------------------------------------- -----------------------------------
Mais sobre o texto originalÉ necessário fornecer o texto original para ver mais informações sobre a tradução
Enviar feedback
Painéis laterais */
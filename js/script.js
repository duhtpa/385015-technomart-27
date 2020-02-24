var 	
// Элементы вызова всплывающих окон
feedbackBtn			= document.querySelector(".contacts_feedback-btn"), 	// кнопка "Заблудились? Напишите нам!"
mapPreview			= document.querySelector(".contacts_map-link"), 			// превью карты
goodsBuy				= document.querySelector(".goods_item_popup a"), 			// кнопка "Купить" в попапе карточки товара
// Форма обратной связи
feedbackPopup		= document.querySelector(".feedback_popup"), 					// попап
feedbackForm		= feedbackPopup.querySelector("form"), 								// форма с заполняемыми данными
feedbackSend		= feedbackForm.querySelector(".feedback_send"), 					// кнопка "Отправить сообщение"
userName				= feedbackForm.querySelector("#user_name"),								// поле "Имя пользователя"
userEMail				= feedbackForm.querySelector("#user_email"),							// поле "Ваш e-mail"
userMessage			= feedbackForm.querySelector("#user_message"),						// поле "Текст письма:"
// Карта
mapPopup				= document.querySelector(".map_popup"), 							// попап
// Уведомление о добавлении товара в корзину - пусть будет!!!
// purchasePopup		= document.querySelector(".purchase_popup"), 					// попап
// purchaseCart		= document.querySelector(".purchase_cart"), 					// кнопка "Оформить заказ"
// purchaseNext		= document.querySelector(".purchase_next"), 					// кнопка "Продолжить покупки"
// Кнопка ЗАКРЫТЬ у всплывающих окон
feedbackClose		= feedbackPopup.querySelector(".popup_close"),				// закрыть окно обратной связи
mapClose				= mapPopup.querySelector(".popup_close"),							// закрыть развёрнутую карту
// LocalStorage
isStorageSupport = true;
storage		= "";

try {
	storage = localStorage.getItem("userName");
} catch (err) {
	isStorageSupport = false;
}

// var purchaseClose		= purchasePopup.querySelector(".popup_close");				// закрыть уведомление о покупке
// а вот тут не знаю как выцепить клик по кнопке карточек

//ФОРМА ОБРАТНОЙ СВЯЗИ
feedbackBtn.addEventListener("click", function (evt) {
	evt.preventDefault();
	feedbackPopup.classList.add("popup-show");
	if (storage) {
		userName.value = storage;
		userEMail.focus();
	} else userName.focus();
});

// валидация формы
feedbackForm.addEventListener("submit", function (evt) {
	if (!userName.value || !userMessage.value) {
		evt.preventDefault();
		userName.style.borderColor = "#f15f5f";			// немного красоты
		userMessage.style.borderColor = "#f15f5f";	// 
		console.log("Не заполнены обязательные поля!");
	} else {
		if (isStorageSupport) {
			localStorage.setItem("userName", userName.value);
		}
	}
});

// закрытие окна по кнопке
feedbackClose.addEventListener("click", function (evt) {
	evt.preventDefault();
	feedbackPopup.classList.remove("popup-show");
});

// закрытие окна по Esc
window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		if (feedbackPopup.classList.contains("popup-show")) {
			evt.preventDefault();
			feedbackPopup.classList.remove("popup-show");
		}
	}
});

//КАРТА
mapPreview.addEventListener("click", function (evt) {
	evt.preventDefault();
	mapPopup.classList.add("popup-show");
});

// закрытие карты по кнопке
mapClose.addEventListener("click", function (evt) {
	evt.preventDefault();
	mapPopup.classList.remove("popup-show");
});

// закрытие карты по Esc
window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		if (mapPopup.classList.contains("popup-show")) {
			evt.preventDefault();
			mapPopup.classList.remove("popup-show");
		}
	}
});

// localStorage.setItem("name", "value");


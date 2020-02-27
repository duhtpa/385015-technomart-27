var 	
// Элементы вызова всплывающих окон
feedbackBtn			= document.querySelector(".contacts_feedback-btn"), // кнопка "Заблудились? Напишите нам!"
mapPreview			= document.querySelector(".contacts_map-link"), 	// превью карты
goodsBuy			= document.querySelector(".goods_item_popup a"), 	// кнопка "Купить" в попапе карточки товара
// Форма обратной связи
feedbackPopup		= document.querySelector(".feedback_popup"), 		// попап
feedbackForm		= feedbackPopup.querySelector("form"), 				// форма с заполняемыми данными
feedbackSend		= feedbackForm.querySelector(".feedback_send"), 	// кнопка "Отправить сообщение"
userName			= feedbackForm.querySelector("#user_name"),			// поле "Имя пользователя"
userEMail			= feedbackForm.querySelector("#user_email"),		// поле "Ваш e-mail"
userMessage			= feedbackForm.querySelector("#user_message"),		// поле "Текст письма:"
// Карта
mapPopup			= document.querySelector(".map_popup"), 			// попап
mapStatic			= document.querySelector(".map_popup-static");		// картинка-заглушка
// Кнопка ЗАКРЫТЬ у всплывающих окон
feedbackClose		= feedbackPopup.querySelector(".popup_close"),		// закрыть окно обратной связи
mapClose			= mapPopup.querySelector(".popup_close"),			// закрыть развёрнутую карту
// LocalStorage
isStorageSupport 	= true;												// дефолтное значение поддержки LocalStorage
storage				= "";												// дефолтное значение сохраняемого параметра	

try {																	// проверка (поддержки LocalStorage)...
	storage = localStorage.getItem("userName");							// если данная инструкция выполнима - выполняем её...
} catch (err) {															// иначе...
	isStorageSupport = false;											// поддержки LocalStorage нет 
}

//------------------------------------------------------
//--------------ФОРМА ОБРАТНОЙ СВЯЗИ--------------------
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
		feedbackPopup.classList.remove("popup-error");
		feedbackPopup.offsetWidth = feedbackPopup.offsetWidth;
		feedbackPopup.classList.add("popup-error");
		if (!userName.value) {
			userName.classList.add("form-error");
		} else {
			userName.classList.remove("form-error");
		}
		if (!userMessage.value) {
			userMessage.classList.add("form-error");
		} else {
			userMessage.classList.remove("form-error");
		}
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
	feedbackPopup.classList.remove("popup-error");
	userName.classList.remove("form-error");
	userMessage.classList.remove("form-error");
});

// закрытие окна по Esc
window.addEventListener("keydown", function (evt) {
	if (evt.keyCode === 27) {
		evt.preventDefault();
		if (feedbackPopup.classList.contains("popup-show")) {
			feedbackPopup.classList.remove("popup-show");
			feedbackPopup.classList.remove("popup-error");
			userName.classList.remove("form-error");
			userMessage.classList.remove("form-error");
		}
	}
});

//-----------------------------------------------------------
//-------------------------КАРТА-----------------------------
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
		evt.preventDefault();
		if (mapPopup.classList.contains("popup-show")) {
			mapPopup.classList.remove("popup-show");
		}
	}
});

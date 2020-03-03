window.addEventListener('load', function () {

  //---------------------------------------------------------
  // -----------ЭЛЕМЕНТЫ ВЫЗОВА ВСПЛЫВАЮЩИХ ОКОН-------------
  var
    feedbackBtn = document.querySelector(".contacts_feedback-btn"),
    mapPreview = document.querySelector(".contacts_map-link"),
    goodsBuy = document.querySelectorAll(".goods_item_popup a");
    
  //-----------------------------------------------------------
  //-----------------ФОРМА ОБРАТНОЙ СВЯЗИ----------------------
  if (feedbackBtn) {
    var
      feedbackPopup = document.querySelector(".feedback_popup"),
      feedbackForm = feedbackPopup.querySelector("form"),
      feedbackSend = feedbackForm.querySelector(".feedback_send"),
      userName = feedbackForm.querySelector("#user_name"),
      userEMail = feedbackForm.querySelector("#user_email"),
      userMessage = feedbackForm.querySelector("#user_message"),
      feedbackClose = feedbackPopup.querySelector(".popup_close");

    // отображение окна
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

    // закрытие окна по кнопке Х
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
  }

  //-----------------------------------------------------------
  //-------------------------КАРТА-----------------------------
  if (mapPreview) {
    var
      mapPopup = document.querySelector(".map_popup"), // попап
      mapStatic = document.querySelector(".map_popup-static"), // картинка-
      mapClose = mapPopup.querySelector(".popup_close"); // закрыть развёрнутую карту

    // отображение окна
    mapPreview.addEventListener("click", function (evt) {
      evt.preventDefault();
      mapPopup.classList.add("popup-show");

    });

    // закрытие карты по кнопке Х
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
  }

  //-----------------------------------------------------------
  //--------УВЕДОМЛЕНИЕ О ДОБАВЛЕНИИ ТОВАРА В КОРЗИНУ----------
  if (goodsBuy) {
    var
      purchasePopup = document.querySelector(".purchase_popup"), // попап
      purchaseNext = document.querySelector(".purchase_next"), // кнопка "Продолжить покупки"
      purchaseClose = purchasePopup.querySelector(".popup_close"); // закрыть окно обратной связи

    // отображение окна
    goodsBuy.forEach(function (item, i, goodsBuy) {
      item.onclick = function (evt) {
        evt.preventDefault();
        purchasePopup.classList.add("popup-show");
      };
    });

    // закрытие окна по кнопке Х
    purchaseClose.addEventListener("click", function (evt) {
      evt.preventDefault();
      purchasePopup.classList.remove("popup-show");
    });

    // закрытие окна по Esc
    window.addEventListener("keydown", function (evt) {
      if (evt.keyCode === 27) {
        evt.preventDefault();
        if (purchasePopup.classList.contains("popup-show")) {
          purchasePopup.classList.remove("popup-show");
        }
      }
    });

    // закрытие окна по кнопке ПРОДОЛЖИТЬ ПОКУПКИ
    purchaseNext.addEventListener("click", function (evt) {
      evt.preventDefault();
      purchasePopup.classList.remove("popup-show");
    });
  }

  //-----------------------------------------------------------
  // -----------------------LocalStorage-----------------------
  isStorageSupport = true; // дефолтное значение поддержки LocalStorage
  storage = ""; // дефолтное значение сохраняемого параметра	

  try { // проверка (поддержки LocalStorage)...
    storage = localStorage.getItem("userName"); // если данная инструкция выполнима - выполняем её...
  } catch (err) { // иначе...
    isStorageSupport = false; // поддержки LocalStorage нет 
  }

});

/*export const popupEditForm = document.forms.editform;
export const nameResult = popupEditForm.elements.profileName;
export const jobResult = popupEditForm.elements.job;
export const popupNewForm = document.forms.newplaceform;
export const popupAvatarForm = document.forms.updateavatar;
export const buttonEditPopup = document.querySelector(".profile__edit-btn");
export const buttonNewPopup = document.querySelector(".profile__add-btn");
export const newAvatarButton = document.querySelector('.profile__av-overlay');
export const avatarOnPage = document.querySelector('.profile__avatar');*/

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_invalid",
  inputErrorClass: "popup__input_state_invalid",
};

export default validationConfig;
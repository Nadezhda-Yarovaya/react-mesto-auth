import React from "react";
import PopupWithForm from "./PopupWithForm";

const DeleteCardPopup = (props) => {
  function handleSubmit(e) {
    e.preventDefault();
    props.onDeletePopup(props.currentCard);
  }

  return (
    <PopupWithForm
      name="delete"
      title="Вы уверены?"
      isOpen={props.isOpen}
      onClose={props.onClose}
      buttonText="Да"
      onSubmit={handleSubmit}
      isValid
      isLoading={props.isLoading}
      pendingText="Удаление..."
    >
      <label className="popup__label"></label>
    </PopupWithForm>
  );
};

export default DeleteCardPopup;

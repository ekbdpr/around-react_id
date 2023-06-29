import { useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

function DeleteConfirmationPopup(props) {
  const { isOpen, onClose, card, onCardDelete } = props;

  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (!isOpen) {
      setIsLoading(false);
    }
  }, [isOpen]);

  const handleCardClick = (e) => {
    e.preventDefault();

    setIsLoading(true);

    onCardDelete(card);
  };

  return (
    <>
      <PopupWithForm
        name="del-confirm"
        title="Apakah Anda yakin?"
        isOpen={isOpen}
        onClose={onClose}
      >
        <button
          type="submit"
          className="btn btn__submit"
          onClick={handleCardClick}
        >
          {isLoading ? "Menghapus..." : "Ya"}
        </button>
      </PopupWithForm>
    </>
  );
}

export default DeleteConfirmationPopup;

import PopupWithForm from "./PopupWithForm";

function DeleteConfirmationPopup(props) {
  const { isOpen, onClose } = props;
  return (
    <>
      <PopupWithForm
        name="del-confirm"
        title="Apakah Anda yakin?"
        isOpen={isOpen}
        onClose={onClose}
      >
        <button type="submit" className="btn btn__submit">
          Ya
        </button>
      </PopupWithForm>
    </>
  );
}

export default DeleteConfirmationPopup;

function Modal({ dispatch }) {
  return (
    <div className="modal-container">
      <section className="modal">
        <h2 className="modal-header">Confirm Quit</h2>
        <hr></hr>
        <p className="modal-message">
          Are you sure you want to quit?
          <br />
          You will lose all your progress.
        </p>
        <div className="modalButtons">
          <button
            className="btn"
            onClick={() => dispatch({ type: "toggleModal" })}
          >
            No, return to quiz
          </button>
          <button
            className="btn btn-quit"
            onClick={() => dispatch({ type: "restart" })}
          >
            Yes, quit
          </button>
        </div>
      </section>
    </div>
  );
}

export default Modal;

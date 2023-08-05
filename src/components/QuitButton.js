function QuitButton({ dispatch }) {
  return (
    <button
      className="btn btn-quit btn-quit-main"
      onClick={() => dispatch({ type: "toggleModal" })}
    >
      Quit
    </button>
  );
}

export default QuitButton;

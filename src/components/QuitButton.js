function QuitButton({ dispatch }) {
  return (
    <button
      className="btn btn-cancel"
      onClick={() => dispatch({ type: "restart" })}
    >
      Quit
    </button>
  );
}

export default QuitButton;

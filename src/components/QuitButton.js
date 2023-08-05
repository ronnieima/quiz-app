function QuitButton({ dispatch }) {
  return (
    <button
      className="btn btn-quit"
      onClick={() => dispatch({ type: "restart" })}
    >
      Quit
    </button>
  );
}

export default QuitButton;

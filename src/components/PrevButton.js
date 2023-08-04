function PrevButton({ dispatch, index }) {
  return (
    <button
      disabled={index === 0}
      className={`btn btn-navigate ${index === 0 ? "hidden" : ""}`}
      onClick={() => dispatch({ type: "navigateLeft", payload: index })}
    >
      &larr;
    </button>
  );
}

export default PrevButton;

import { useQuiz } from "../contexts/QuizContext";

function PrevButton() {
  const { dispatch, index } = useQuiz();
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

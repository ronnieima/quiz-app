import { useQuiz } from "../contexts/QuizContext";

function QuitButton() {
  const { dispatch } = useQuiz();
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

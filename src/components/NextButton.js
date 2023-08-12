import { useQuiz } from "../contexts/QuizContext";

function NextButton() {
  const { dispatch, hasAnswered, index, numQuestions } = useQuiz();
  return (
    <button
      disabled={!hasAnswered}
      className={`btn btn-navigate `}
      onClick={() => {
        index < numQuestions - 1
          ? dispatch({ type: "navigateRight", payload: index })
          : dispatch({ type: "finish", payload: index });
      }}
    >
      &rarr;
    </button>
  );
}

export default NextButton;

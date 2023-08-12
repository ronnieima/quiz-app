import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { currentQuestion, dispatch, answer, hasAnswered, selectedAnswer } =
    useQuiz();
  return (
    <div className="options">
      {currentQuestion.options.map((option, index) => (
        <button
          className={`btn btn-option ${index === answer ? "answer" : ""} 
          ${
            hasAnswered
              ? index === currentQuestion.correctOption
                ? "correct"
                : "wrong"
              : ""
          }
        ${
          hasAnswered
            ? selectedAnswer === index
              ? "selected-answer"
              : "faded"
            : ""
        }`}
          disabled={hasAnswered}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  );
}

export default Options;

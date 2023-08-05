function StartScreen({ questions, questionAmount, dispatch, quizTopic }) {
  return (
    <div className="start">
      <h2>Ready to test your {quizTopic} knowledge? </h2>
      <h3>
        <select
          onChange={(e) =>
            dispatch({ type: "updateQuestionAmount", payload: e.target.value })
          }
          value={questionAmount}
        >
          {questions.map((_, index) => (
            <option value={`${index + 1}`} key={index + 1}>
              {index + 1}
            </option>
          ))}
        </select>{" "}
        randomized {questionAmount === 1 ? "question" : "questions"} to test
        your {quizTopic} mastery 🧙‍♂️
      </h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;

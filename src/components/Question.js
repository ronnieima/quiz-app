import NextButton from "./NextButton";
import Options from "./Options";
import PrevButton from "./PrevButton";

function Question({ question, dispatch, answer, index, numQuestions }) {
  const hasAnswered = answer.length > index;
  return (
    <div className="question">
      <PrevButton
        question={question}
        dispatch={dispatch}
        answer={answer}
        index={index}
        hasAnswered={hasAnswered}
      />
      <main>
        <h4>{question.question}</h4>
        <Options
          question={question}
          dispatch={dispatch}
          answer={answer}
          index={index}
          hasAnswered={hasAnswered}
        />
      </main>
      <NextButton
        question={question}
        dispatch={dispatch}
        answer={answer}
        index={index}
        hasAnswered={hasAnswered}
        numQuestions={numQuestions}
      />
    </div>
  );
}

export default Question;

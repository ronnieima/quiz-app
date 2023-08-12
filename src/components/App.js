import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import Progress from "./Progress";
import Finished from "./Finished";
import Footer from "./Footer";
import Timer from "./Timer";
import QuitButton from "./QuitButton";
import Modal from "./Modal";
import { useQuiz } from "../contexts/QuizContext";

export default function App() {
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
    quizTopic,
    questionAmount,
    activeQuestions,
    modalIsOpen,
    selectedAnswer,
    numQuestions,
    maxPossiblePoints,
    currentQuestion,
    dispatch,
  } = useQuiz();

  return (
    <div className="app">
      {modalIsOpen && <Modal dispatch={dispatch} />}
      <Header dispatch={dispatch} quizTopic={quizTopic} status={status} />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            questionAmount={questionAmount}
            questions={questions}
            dispatch={dispatch}
            quizTopic={quizTopic}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
              answer={answer}
            />
            <Question
              question={currentQuestion}
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
              selectedAnswer={selectedAnswer}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <QuitButton dispatch={dispatch} />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <Finished
            dispatch={dispatch}
            highscore={highscore}
            points={points}
            maxPossiblePoints={maxPossiblePoints}
          />
        )}
      </Main>
    </div>
  );
}

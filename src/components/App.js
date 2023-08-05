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

const SECONDS_PER_QUESTION = 20;

const initialState = {
  questions: [],

  //'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: [],
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  questionAmount: null,
  quizTopic: "React",
  activeQuestions: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        questionAmount: action.payload.length,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        activeQuestions: state.questions.slice(0, state.questionAmount),
        secondsRemaining: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: [...state.answer, action.payload],
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return {
        ...initialState,
        status: "ready",
        questions: state.questions,
        highscore: state.highscore,
        quizTopic: state.quizTopic,
        questionAmount: state.questionAmount,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    case "navigateLeft":
      return {
        ...state,
        index: action.payload - 1,
      };
    case "navigateRight":
      return {
        ...state,
        index: action.payload + 1,
      };
    case "changeTopic":
      return {
        ...state,
        quizTopic: action.payload,
      };
    case "updateQuestionAmount":
      return {
        ...state,
        questionAmount: Number(action.payload),
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [
    {
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
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = activeQuestions.length;
  const maxPossiblePoints = activeQuestions.reduce((total, question) => {
    return total + question.points;
  }, 0);

  useEffect(
    function () {
      fetch(`http://localhost:9000/${quizTopic.toLowerCase()}`)
        .then((res) => res.json())
        .then((data) => dispatch({ type: "dataReceived", payload: data }))

        .catch((err) => dispatch({ type: "dataFailed" }));
    },
    [quizTopic]
  );

  useEffect(
    function () {
      document.title = `The ${quizTopic} Quiz`;
    },
    [quizTopic]
  );

  return (
    <div className="app">
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
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
              index={index}
              numQuestions={numQuestions}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <QuitButton dispatch={dispatch} />
              {/* <NextButton
                dispatch={dispatch}
                answer={answer}
                index={index}
                numQuestions={numQuestions}
              /> */}
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

import { createContext, useContext, useEffect, useReducer } from "react";
const SECONDS_PER_QUESTION = 20;
const QuizContext = createContext();

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
  modalIsOpen: false,
  selectedAnswer: null,
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
        selectedAnswer: action.payload,
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
        selectedAnswer: state.answer[action.payload - 1],
      };
    case "navigateRight":
      return {
        ...state,
        index: action.payload + 1,
        selectedAnswer:
          state.answer[action.payload + 1] != null
            ? state.answer[action.payload + 1]
            : null,
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
    case "toggleModal":
      return {
        ...state,
        modalIsOpen: !state.modalIsOpen,
      };
    default:
      throw new Error("Action unknown");
  }
}

function QuizProvider({ children }) {
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
      modalIsOpen,
      selectedAnswer,
    },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = activeQuestions.length;
  const maxPossiblePoints = activeQuestions.reduce((total, question) => {
    return total + question.points;
  }, 0);
  const currentQuestion = questions.at(index);

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
    <QuizContext.Provider
      value={{
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
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("QuizContext was used outside of QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };

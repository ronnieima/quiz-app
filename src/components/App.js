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
  const { status, modalIsOpen } = useQuiz();

  return (
    <div className="app">
      {modalIsOpen && <Modal />}
      <Header />

      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen />}
        {status === "active" && (
          <>
            <Progress />
            <Question />
            <Footer>
              <Timer />
              <QuitButton />
            </Footer>
          </>
        )}
        {status === "finished" && <Finished />}
      </Main>
    </div>
  );
}

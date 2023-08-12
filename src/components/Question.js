import { useQuiz } from "../contexts/QuizContext";
import NextButton from "./NextButton";
import Options from "./Options";
import PrevButton from "./PrevButton";

function Question() {
  const { currentQuestion } = useQuiz();

  return (
    <div className="question">
      <PrevButton />
      <main>
        <h4>{currentQuestion.question}</h4>
        <Options />
      </main>
      <NextButton />
    </div>
  );
}

export default Question;

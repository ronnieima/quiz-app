import { createContext } from "react";

const QuizContext = createContext();

function QuizProvider({ children }) {
  return <QuizContext.Provider value={{}}>{children}</QuizContext.Provider>;
}

function useContext() {
  const context = useContext(QuizContext);
  if (!context) throw new Error("QuizContext was used outside of QuizProvider");
  return context;
}

export { QuizProvider, useContext };

function Header({ dispatch, quizTopic, status }) {
  return (
    <header className="app-header">
      <img src="logo512.png" alt="React logo" />
      <h1>
        The{" "}
        {status === "ready" && (
          <select
            onChange={(e) =>
              dispatch({ type: "changeTopic", payload: e.target.value })
            }
            value={quizTopic}
          >
            <option value="React">React</option>
            <option value="JavaScript">JavaScript</option>
            <option value="CSS">CSS</option>
            <option value="HTML">HTML</option>
            <option value="Guam">Guam</option>
          </select>
        )}
        {status === "active" && quizTopic} Quiz
      </h1>
    </header>
  );
}

export default Header;

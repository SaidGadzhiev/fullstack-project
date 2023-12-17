import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./admin/Dashboard";

function App() {
  useEffect(() => {
    fetch('/bacon')
      .then((res) => res.json())
      .then((data) => console.log(data.data));
  }, []);
  return (
    <Router>
      <Routes>
      <Route path="/" ></Route>
      <Route path="/admin" element={<Dashboard/>}/>
      </Routes>
    </Router>
  );
}

export default App;

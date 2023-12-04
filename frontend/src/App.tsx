import { Route, Routes } from "react-router-dom";
import NavBar from "./navbar/navbar";
import CrimeData from "./pageLayout/crimeData";
import DAnalysis from "./pageLayout/DAnalysis";
import './App.css'

function App() {

  return (
    <>
      <NavBar></NavBar>
      <div className="canvas-container">
        <Routes>
          <Route path="/" element={<CrimeData />}> </Route>
          <Route path="/demographic_analysis" element={<DAnalysis />}> </Route>
        </Routes>
      </div>
    </>
  )
}

export default App

import { Routes, Route, Link } from "react-router-dom";

/* Layout */
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Container from "./components/Container.jsx";

/* Styles */
import "./styles/global.css";

/* Pages */
import Questions from "./pages/Questions.jsx";
import Results from "./pages/Results.jsx";
import FAQ from "./pages/FAQ.jsx";

export default function App() {
  return (
    <div className="app-container">
      <Header />
      <main id="main" className="main-container">
        <Container>
          <Routes>
            <Route
              path="/"
              element={<Questions />}
            />
            <Route
              path="/results"
              element={<Results />}
            />
            <Route 
              path="/faq" 
              element={<FAQ />} 
            />
            <Route
              path="*"
              element={
                <div className="measure-6">
                  <h1 className="margin-top-2">Page not found</h1>
                  <p>Try going back to the screening questions.</p>
                  <Link className="usa-button" to="/">Start Over</Link>
                </div>
              }
            />
          </Routes>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
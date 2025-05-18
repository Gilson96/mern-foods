import { BrowserRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Home from "./components/Home/Home";
import Restaurant from "./components/Restaurant/Restaurant";
import StartingPage from "./components/Login/StartingPage";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/Login/SignUpPage";
import UserOrders from "./components/UserFeatures/UserOrders";
import UserFavourites from "./components/UserFeatures/UserFavourites";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/startingPage" element={<StartingPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/restaurant/:_id" element={<Restaurant />} />
          <Route path="/userOrders" element={<UserOrders />} />
          <Route path="/UserFavourites" element={<UserFavourites />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;

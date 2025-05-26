import { HashRouter as Router, Routes, Route } from "react-router";
import "./App.css";
import Home from "./components/Home/Home";
import Restaurant from "./components/Restaurant/Restaurant";
import StartingPage from "./components/Login/StartingPage";
import LoginPage from "./components/Login/LoginPage";
import SignUpPage from "./components/Login/SignUpPage";
import UserOrders from "./components/UserFeatures/UserOrders";
import UserFavourites from "./components/UserFeatures/UserFavourites";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { emptyCart } from "./features/cartSlice";
import { persistor } from "./store";

const App = () => {
  const dispatch = useDispatch();

  // logout after 1h
  useEffect(() => {
    setTimeout(() => {
      dispatch(emptyCart());
      persistor.purge();
    }, 1 * 60 * 60 * 1000);
  });

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

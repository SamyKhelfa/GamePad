import { Navigate } from "react-router-dom";
import "../css/mycollection.css";
import axios from "axios";

const favorites = localStorage.getItem("favorites");

const token = localStorage.getItem("token");

const MyCollection = () => {
  return (
    <>
      {token ? (
        <div className="mycollection_container">
          <h1>My Collection</h1>
        </div>
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default MyCollection;

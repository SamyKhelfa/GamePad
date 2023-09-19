import { useNavigate } from "react-router-dom";
import "../css/mycollection.css";

const token = localStorage.getItem("token");

const MyCollection = () => {
  const navigate = useNavigate();

  return (
    <>
      {token ? (
        <div className="mycollection_container">
          <h1>My Collection</h1>
        </div>
      ) : (
        navigate("/login")
      )}
    </>
  );
};

export default MyCollection;

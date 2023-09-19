import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });

      // Traitez la réponse ici pour gérer l'authentification réussie
      console.log("Authentification réussie :", response.data);

      // Enregistrez le token dans le stockage local
      localStorage.setItem("token", response.data.token);

      // Redirigez l'utilisateur vers la page d'accueil ou une autre page protégée
      navigate("/");
    } catch (error) {
      // Gérez les erreurs ici (par exemple, affichez un message d'erreur)
      console.log(error);
    }
  };

  return (
    <div>
      <div className="login_container">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input className="submit" type="submit" value="Login" />
        </form>
        <Link to="/signup">
          <p className="hover-color-change">{"Don't have an account yet ?"}</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;

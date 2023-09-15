import { useState } from "react";
import "../css/login.css";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
    console.log(email, password);
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
          <p class="hover-color-change">Don't have an account yet ?</p>
        </Link>
      </div>
    </div>
  );
};

export default Login;

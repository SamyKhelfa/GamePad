import { useState } from "react";
import "../css/signup.css";
import { Link } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handlePseudoChange = (event) => {
    const value = event.target.value;
    setPseudo(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Pour empêcher le navigateur de changer de page lors de la soumission du formulaire
    console.log(email, password, pseudo);
  };

  return (
    <div>
      <div className="signup_container">
        <h1>Signup</h1>
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Username"
            type="text"
            name="pseudo"
            value={pseudo}
            onChange={handlePseudoChange}
          />
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
          <input
            placeholder="Confirm Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input placeholder="Add a photo" type="file" name="file" />

          <input className="submit" type="submit" value="Signup" />
        </form>
        <Link to="/login">
          <p class="hover-color-change">Already have an account ?</p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;

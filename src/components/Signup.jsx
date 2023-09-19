import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();

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

  const handleFileChange = (event) => {
    const value = event.target.value;
    setFile(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/signup", {
        email,
        username: pseudo,
        password,
        file,
      });

      // Traitez la réponse ici (par exemple, affichez un message de succès)
      console.log("Inscription réussie :", response.data);

      // Enregistrez le token dans le stockage local
      localStorage.setItem("token", response.data.token);

      alert(`Signup successful !! Welcome ${pseudo} !!`);
      navigate("/");
      // Rediriger vers la page d'accueil
    } catch (error) {
      // Gérez les erreurs ici (par exemple, affichez un message d'erreur)
      console.log(error);
    }
  };

  return (
    <div>
      <div className="signup_container">
        <h1>Sign up</h1>

        <form onSubmit={handleSubmit}>
          <input
            placeholder="Email"
            type="text"
            name="email"
            value={email}
            onChange={handleEmailChange}
          />
          <input
            placeholder="Username"
            type="text"
            name="pseudo"
            value={pseudo}
            onChange={handlePseudoChange}
          />

          <input
            placeholder="Password"
            type="password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <input
            placeholder="Add a photo"
            type="file"
            name="file"
            value={file}
            onChange={handleFileChange}
          />

          <input className="submit" type="submit" value="Signup" />
        </form>
        <Link to="/login">
          <p className="hover-color-change">Already have an account ?</p>
        </Link>
      </div>
    </div>
  );
};

export default Signup;

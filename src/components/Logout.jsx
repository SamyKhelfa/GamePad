import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprimez le token du stockage local lors du chargement de la page de déconnexion
    localStorage.removeItem("token");

    // Redirigez l'utilisateur vers la page de connexion ou une autre page appropriée
    navigate("/"); // Remplacez "/login" par l'URL de la page de connexion
    window.location.reload();
  }, [navigate]);

  return (
    <div>
      <p>Vous êtes déconnecté.</p>
    </div>
  );
};

export default Logout;

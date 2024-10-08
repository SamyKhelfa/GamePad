import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../css/game.css";
import ReactLoading from "react-loading";

const Game = () => {
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [data3, setData3] = useState({});
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const [isLoading3, setIsLoading3] = useState(true);
  const [isLoading4, setIsLoading4] = useState(true);
  const [favorites] = useState([]);
  const [videoUrl, setVideoUrl] = useState("");
  const API_KEY = "7c556f0fa4154bad8da30ff7dfa39d11";
  const token = localStorage.getItem("token");

  const { id } = useParams();

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );

        setData1(response.data);
        setIsLoading1(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    const fetchData2 = async () => {
      try {
        const response2 = await axios.get(
          `https://api.rawg.io/api/games/${id}/game-series?key=${API_KEY}`
        );

        setData2(response2.data);
        setIsLoading2(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    const fetchData3 = async () => {
      try {
        const response3 = await axios.get(
          `https://api.rawg.io/api/games/${id}/screenshots?key=${API_KEY}`
        );

        setData3(response3.data);
        setIsLoading3(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    const fetchData4 = async () => {
      try {
        const response4 = await axios.get(
          `https://api.rawg.io/api/games/${id}/movies?key=${API_KEY}`
        );
        const videoUrl = response4.data.results[0]?.data["480"] || "";
        setVideoUrl(videoUrl); // Mettez à jour la variable d'URL vidéo
        setIsLoading4(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData1();
    fetchData2();
    fetchData3();
    fetchData4();
  }, [API_KEY, id]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToFavorites = async () => {
    try {
      // Préparez les données du jeu que vous souhaitez ajouter en favori
      const gameData = {
        name: data1.name,
        description: data1.description_raw,
        url: `https://api.rawg.io/api/games/${id}`, // Remplacez par l'URL du jeu
        image: data1.background_image,
      };

      // Envoyez une requête POST à la route /favorites
      const response = await axios.post(
        "http://localhost:3000/favorites",
        gameData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data.message); // Affichez le message de confirmation
    } catch (error) {
      console.error(error);
      // Gérez les erreurs ici, par exemple en affichant un message à l'utilisateur
    }
  };

  const removeToFavorites = async () => {
    try {
      // Envoyez une requête DELETE à la route /favorites
      const response = await axios.delete(
        `http://localhost:3000/favorites/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      console.log(response.data.message); // Affichez le message de confirmation
    } catch (error) {
      console.error(error);
      // Gérez les erreurs ici, par exemple en affichant un message à l'utilisateur
    }
  };

  return isLoading1 || isLoading2 || isLoading3 || isLoading4 ? (
    <div className="loading-container">
      <ReactLoading type={"spin"} color={"#ff4655"} height={100} width={100} />
    </div>
  ) : (
    <div className="container">
      <div className="game-details">
        <h1>{data1.name}</h1>
        <div className="details-container">
          <div className="image-container">
            <img
              src={data1.background_image}
              alt={data1.name}
              className="image"
            />
          </div>

          <div className="details-right">
            <div className="details-column">
              {favorites && favorites.includes(id) ? (
                <button
                  className="add-to-collection"
                  onClick={removeToFavorites}
                >
                  Remove from collection
                </button>
              ) : (
                <button className="add-to-collection" onClick={addToFavorites}>
                  Add to collection
                </button>
              )}
              <p>
                <span className="release-date">Released date:</span>{" "}
                {data1.released}
              </p>
              <p>
                <span className="platforms">Platforms:</span>
                {data1.platforms.map((platform) => (
                  <span key={platform.platform.id}>
                    {platform.platform.name}&ensp;
                  </span>
                ))}
              </p>
              <p>
                <span className="genres">Genres:</span>
                {data1.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}&ensp;</span>
                ))}
              </p>
            </div>
            <div className="details-column">
              <p>
                <span className="developers">Developers:</span>
                {data1.developers.map((developer) => (
                  <span key={developer.id}>{developer.name}&ensp;</span>
                ))}
              </p>
              <p>
                <span className="publishers">Publishers:</span>
                {data1.publishers.map((publisher) => (
                  <span key={publisher.id}>{publisher.name}&ensp;</span>
                ))}
              </p>
              <p>
                <span className="age">Age rating:</span>{" "}
                {data1.esrb_rating ? data1.esrb_rating.name : "Not rated"}
              </p>
            </div>
          </div>
        </div>
        <div className="screenshots-container">
          <p className="screenshots-title">Screenshots :</p>
          <div className="games-screenshot">
            {data3.results.map((screenshot) => (
              <img
                src={screenshot.image}
                alt={screenshot.id}
                key={screenshot.id}
                className="screenshot"
              />
            ))}
          </div>

          {videoUrl && (
            <video
              className="custom-video"
              controls
              width="640"
              height="360"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video{" "}
            </video>
          )}

          <div className="about-container">
            <p>
              <span className="about">About:</span>
              <br />
              <p className="description">{data1.description_raw}</p>
            </p>
          </div>
          {data2.results.length > 0 && (
            <div>
              <p>
                <span className="games-like">Games like {data1.name}</span>
              </p>
              <div className="games-like__container">
                {data2.results.map((game) => (
                  <Link
                    to={`/games/${game.id}`}
                    key={game.id}
                    onClick={scrollToTop}
                  >
                    <div key={game.id} className="game-like">
                      <img
                        src={game.background_image}
                        alt={game.name}
                        className="games-like-img"
                      />
                      <p className="game-name-overlay">{game.name}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;

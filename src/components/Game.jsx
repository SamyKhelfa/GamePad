import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/game.css";

const Game = () => {
  const [data1, setData1] = useState({});
  const [data2, setData2] = useState({});
  const [isLoading1, setIsLoading1] = useState(true);
  const [isLoading2, setIsLoading2] = useState(true);
  const API_KEY = "7c556f0fa4154bad8da30ff7dfa39d11";

  const { id } = useParams();

  useEffect(() => {
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );

        console.log(response.data);
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

        console.log(response2.data);
        setData2(response2.data);
        setIsLoading2(false);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData1();
    fetchData2();
  }, [API_KEY, id]);

  return isLoading1 || isLoading2 ? (
    <span>Loading...</span>
  ) : (
    <div className="container">
      <div className="game-details">
        <h1>{data1.name}</h1>
        <img src={data1.background_image} alt={data1.name} className="image" />
        <div className="game-details__container">
          <p>
            <span className="release-date">Released date:</span>{" "}
            {data1.released}
          </p>
          <p>
            <span className="platforms">Platforms:</span>
            {data1.platforms.map((platform) => (
              <p key={platform.platform.id}>{platform.platform.name}&ensp;</p>
            ))}
          </p>
          <p>
            <span className="genres">Genres:</span>
            {data1.genres.map((genre) => (
              <p key={genre.id}>{genre.name}&ensp;</p>
            ))}
          </p>
          <p>
            <span className="developers">Developers:</span>
            {data1.developers.map((developer) => (
              <p key={developer.id}>{developer.name}&ensp;</p>
            ))}
          </p>
          <p>
            <span className="publishers">Publishers:</span>
            {data1.publishers.map((publisher) => (
              <p key={publisher.id}>{publisher.name}</p>
            ))}
          </p>
          <p>
            <span className="age">Age rating:</span>
            {data1.esrb_rating ? data1.esrb_rating.name : "Not rated"}
          </p>
          <p>
            <span className="about">About:</span> {data1.description_raw}
          </p>
        </div>

        <p>
          <span className="games-like">Games like {data1.name}</span>
        </p>
        <div className="games-like__container">
          {data2.results.map((game) => (
            <div key={game.id} className="game-like">
              <img
                src={game.background_image}
                alt={game.name}
                className="games-like-img"
              />
              <p className="game-name-overlay">{game.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;

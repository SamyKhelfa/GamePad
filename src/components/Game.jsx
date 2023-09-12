import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/game.css";

const Game = () => {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const API_KEY = "7c556f0fa4154bad8da30ff7dfa39d11";

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games/${id}?key=${API_KEY}`
        );

        const parser = new DOMParser();
        const parsedDescription = parser.parseFromString(
          response.data.description,
          "text/html"
        );

        const descriptionText = parsedDescription.body.textContent;

        setData({ ...response.data, description: descriptionText });
        setIsLoading(false);

        console.log(response.data);
        console.log(id);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [API_KEY, id]);

  return isLoading ? (
    <span>Loading...</span>
  ) : (
    <div className="game-details">
      <h1>{data.name}</h1>
      <img src={data.background_image} alt={data.name} className="image" />
      <div className="game-details__container">
        <p>
          <span className="about">About:</span> {data.description_raw}
        </p>
        <p>
          <span className="release-date">Released date:</span> {data.released}
        </p>
        <p>
          <span className="platforms">Platforms:</span>
          {data.platforms.map((platform) => (
            <p>{platform.platform.name}</p>
          ))}
        </p>
        <p>
          <span className="genres">Genres:</span>
          {data.genres.map((genre) => (
            <p>{genre.name}</p>
          ))}
        </p>
        <p>
          <span className="developers">Developers:</span>
          {data.developers.map((developer) => (
            <p>{developer.name}</p>
          ))}
        </p>
        <p>
          <span className="publishers">Publishers:</span>
          {data.publishers.map((publisher) => (
            <p>{publisher.name}</p>
          ))}
        </p>
        <p>
          <span className="age">Age rating:</span>
          {data.esrb_rating ? data.esrb_rating.name : "Not rated"}
        </p>
        <p>
          <span className="games-like">Games like {data.name}</span>
        </p>
      </div>
    </div>
  );
};

export default Game;

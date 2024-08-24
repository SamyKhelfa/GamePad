import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import logo from "../img/image.png";
import "../css/home.css";
import axios from "axios";
import ReactPaginate from "react-paginate";
import ReactLoading from "react-loading";
import lodash from 'lodash';

const Home = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const page_size = 45;
  const API_KEY = "7c556f0fa4154bad8da30ff7dfa39d11";
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${page_size}&page=${page}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, [page, page_size, API_KEY]);

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearch(value);
  };

  const fetchData = async (page, page_size, API_KEY, searchTerm) => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page_size=${page_size}&page=${page}&search=${searchTerm}`
      );
      console.log(response.data);
      setData(response.data);
    } catch (error) {
      console.error(error.response);
    } finally {
      setIsLoading(false);
    }
  };

  const debouncedSearch = useCallback(
    lodash.debounce((page, page_size, API_KEY, searchTerm) => {
      fetchData(page, page_size, API_KEY, searchTerm);
    }, 1000),
    []
  );

  useEffect(() => {
    debouncedSearch(page, page_size, API_KEY, search);
  }, [page, page_size, API_KEY, search, debouncedSearch]);
  

  const handlePageChange = (selectedPage) => {
    setPage(selectedPage.selected + 1);
  };

  if(isLoading) {
    return (
      <div className="loading-container">
        <ReactLoading type={"spin"} color={"#ff4655"} height={100} width={100} />
      </div>
    )
  }

  return (
    <div className="home">
      <div className="home__container">
        <img src={logo} alt="Logo" className="image-home" />
        <div className="searchbar">
          <input
            type="text"
            placeholder="Search for a game..."
            onChange={handleSearch}
            value={search}
          />
          <span className="search-icon">&#128269;</span>
        </div>
        <div className="games">
          {data.results.map((game) => (
            <Link to={`/games/${game.id}`} key={game.id}>
              <div className="game">
                <div className="game-wrapper">
                  <img
                    src={game.background_image}
                    alt={game.name}
                    className="game-image"
                  />
                  <h2 className="game-title">{game.name}</h2>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="pagination-container">
          <ReactPaginate
            previousLabel={"<"}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={Math.ceil(data.count / page_size)}
            marginPagesDisplayed={1}
            pageRangeDisplayed={2}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

import { useEffect, useState } from "react";
import { getMovies } from "../operations/axios";

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    getMovies().then(res => setList(res));
  }, []);

  return (
    <div className="list">
      <div className="row">
        <h2 className="text-white title"></h2>
        <div className="col">
          <div className="row__posters">
            {
              list.map(item => (
                <div key={item.id}>
                  <p>{item.original_title}</p>
                  <img
                    className="row__poster row__posterLarge"
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                    alt={item.title}
                  />
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default List;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Btn,
  Dowenload,
  Filter,
  HeaderIC,
  LikeICActive,
  LikeICThrer,
  Pausebtn,
  Playbtn,
} from "../constants";
import "../sass/playlist.scss";
import likeIMg from "../assets/Screenshot 2022-06-04 at 20 1.png";
const LikeComponent = () => {
  const { id } = useParams();
  const url = window.location.href;
  const urlApi = url?.split("?type=")[1];
  const [data, setData] = useState(null);

  // Unlike function
  const unlike = (id) => {
    let playlistLike = JSON.parse(localStorage.getItem("like")) || [];
    let updatedData = playlistLike.filter((item) => item.id !== id);
    setData(updatedData);
    localStorage.setItem("like", JSON.stringify(updatedData));
  };

  useEffect(() => {
    const like = JSON.parse(localStorage.getItem("like")) || [];
    setData(like);
  }, [id, urlApi]);

  return (
    <>
      <div className="container">
        <div
          className="playlist_w"
          style={{
            background: `linear-gradient(180deg, #3333a3 5.09%, #121212 33.4%) `,
          }}
        >
          <>
            <div
              className="playlist_header"
              style={{
                background: `linear-gradient(180deg, #3333a3 100%, #12121200 0%) `,
              }}
            >
              <button className="btn">
                <Btn />
              </button>
              <button className="btn">
                <Btn />
              </button>
            </div>

            <div className="playlist_carts">
              <div className="play_left">
                <img src={likeIMg} alt="" />
              </div>
              <div className="play_right">
                <p>PUBLIC PLAYLIST</p>
              </div>
            </div>
            <div className="play_btns">
              <div className="buttons">
                <button
                  className={`play_btn ${true === true ? "active" : ""}`}
                  // onClick={(e) => handleClick(el?.id, e.stopPropagation())}
                >
                  {false && false ? <Pausebtn /> : <Playbtn />}
                </button>
                <button className="likeIC liked">
                  <LikeICThrer />
                </button>
                <button className="Dowenload">
                  <Dowenload />
                </button>
                <button className="nuqta">...</button>
              </div>
              <span className="filter">
                <Filter />
              </span>
            </div>
            <div className="albums">
              <HeaderIC />
              <div className="albumCars">
                {data?.map((el, i) => (
                  <div className="albumCart" key={i}>
                    <span style={{ color: "#B3B3B3" }}>
                      {i + 1}
                      <img src={el?.images[0].url} alt="" />
                      <p>
                        <p key={i}>{el?.name}</p>
                      </p>
                    </span>
                    <p className="p1">{el?.name}</p>
                    <p className="p2">
                      <span onClick={() => unlike(el?.id)}>
                        <LikeICActive />
                      </span>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default LikeComponent;

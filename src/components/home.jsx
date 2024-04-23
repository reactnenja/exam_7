import React, { useEffect, useState } from "react";
import "../sass/home.scss";
import { Btn } from "../constants";
import ProductCard from "./card";
import { getPlaylists, getToken } from "../api";
import {
  FEATURED,
  JUMP_BACKIN,
  MADE_FOR_YOU,
  RECENTPLAYED,
  Tracks,
  UNIQUELYYOURS,
  YOUR_TOP_MIXES,
} from "../api/api.service";

const HomeComponent = () => {
  const tokenURl = "https://accounts.spotify.com/api/token";
  const [FEATURED_playlistsData, setFEATURED_playlists] = useState(null);
  const [YOUR_TOP_MIXESData, setYOUR_TOP_MIXES] = useState(null);
  const [RECENTPLAYEDData, setRECENTPLAYED] = useState(null);
  const [MADE_FOR_YOUData, setMADE_FOR_YOU] = useState(null);
  const [JUMP_BACKINData, setJUMP_BACKIN] = useState(null);
  const [UNIQUELYYOURSData, setUNIQUELYYOURS] = useState(null);
  const [TracksData, setTracks] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await getToken(tokenURl);
        await getPlaylists(FEATURED).then((res) => {
          setFEATURED_playlists(res?.playlists?.items);
        });
        await getPlaylists(YOUR_TOP_MIXES).then((res) => {
          setYOUR_TOP_MIXES(res?.playlists?.items);
        });
        await getPlaylists(RECENTPLAYED).then((res) => {
          setRECENTPLAYED(res?.playlists?.items);
        });
        await getPlaylists(MADE_FOR_YOU).then((res) => {
          setMADE_FOR_YOU(res?.playlists?.items);
        });
        await getPlaylists(JUMP_BACKIN).then((res) => {
          setJUMP_BACKIN(res?.playlists?.items);
        });
        await getPlaylists(UNIQUELYYOURS).then((res) => {
          setUNIQUELYYOURS(res?.playlists?.items);
        });
        await getPlaylists(Tracks).then((res) => {
          setTracks(res);
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="home">
        <>
          <div className="home_header">
            <button className="btn">
              <Btn />
            </button>
            <button className="btn">
              <Btn />
            </button>
          </div>
          <h3 className="h3_good">Good afternoon</h3>
          <div className="home_carts">
            {FEATURED_playlistsData?.length > 0 &&
              FEATURED_playlistsData.slice(0, 6).map((el, i) => (
                <div className="cart" key={i}>
                  <img src={el?.images?.map((el, i) => el?.url)} alt="" />
                  <h3>{el.name}</h3>
                </div>
              ))}
          </div>
          <div className="products" style={{ marginTop: "30px" }}>
            <div className="product_title">
              <h4>Your top mixes</h4>
              <p>SEE ALL</p>
            </div>
            <div className="product_cards">
              {YOUR_TOP_MIXESData?.length > 0 && (
                <ProductCard
                  data={{
                    data: YOUR_TOP_MIXESData,
                    TracksData,
                    type: "playlists",
                  }}
                />
              )}
            </div>
          </div>
          <div className="products" style={{ marginTop: "30px" }}>
            <div className="product_title">
              <h4>Made for you</h4>
              <p>SEE ALL</p>
            </div>
            <div className="product_cards">
              {MADE_FOR_YOUData?.length > 0 && (
                <ProductCard
                  data={{
                    data: MADE_FOR_YOUData,
                    TracksData,
                    type: "MADE_FOR_YOU_playlists",
                  }}
                />
              )}
            </div>
          </div>
          <div className="products" style={{ marginTop: "30px" }}>
            <div className="product_title">
              <h4>Recently played</h4>
              <p>SEE ALL</p>
            </div>
            <div className="product_cards">
              {RECENTPLAYEDData?.length > 0 && (
                <ProductCard
                  data={{
                    data: RECENTPLAYEDData,
                    TracksData,
                    type: "RECENTPLAYED_playlists",
                  }}
                />
              )}
            </div>
          </div>
          <div className="products" style={{ marginTop: "30px" }}>
            <div className="product_title">
              <h4>Jump back in</h4>
              <p>SEE ALL</p>
            </div>
            <div className="product_cards">
              {JUMP_BACKINData?.length > 0 && (
                <ProductCard
                  data={{
                    data: JUMP_BACKINData,
                    TracksData,
                    type: "JUMP_BACKIN_playlists",
                  }}
                />
              )}
            </div>
          </div>
          <div
            className="products"
            style={{ marginTop: "30px", paddingBottom: "110px" }}
          >
            <div className="product_title">
              <h4>Uniquely yours</h4>
              <p>SEE ALL</p>
            </div>
            <div className="product_cards">
              {UNIQUELYYOURSData?.length > 0 && (
                <ProductCard
                  data={{
                    data: UNIQUELYYOURSData,
                    TracksData,
                    type: "UNIQUELYYOURS_playlists",
                  }}
                />
              )}
            </div>
          </div>
        </>
      </div>
    </div>
  );
};

export default HomeComponent;

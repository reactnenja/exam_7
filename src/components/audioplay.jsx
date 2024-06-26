import {
  Audio__,
  LikeICActive,
  Next,
  Play,
  PlayerBtnIC,
  Prev,
  Reload,
  Volume,
} from "../constants";
import "../sass/audio.scss";
import { useContext, useEffect, useRef, useState } from "react";
import { Audioprovider } from "../context";
const AudioPlay = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const [volume, setVolume] = useState(0.5);
  const [currentTime, setCurrentTime] = useState(0);
  const { audio } = useContext(Audioprovider);
  const [audioUrl, setaudioUrl] = useState("");

  const handelPlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Vulume
  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
  };

  const handleAudioEnded = () => {
    setIsPlaying(false);
  };

  const handleTimeChange = (event) => {
    const time = event.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  useEffect(() => {
    const audioUrl = JSON.parse(localStorage.getItem("audioUrl")) || "";
    setaudioUrl(audioUrl);
    setCurrentTime(0);
    if (audioRef.current.paused) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [audio]);

  return (
    <div className="audio_play">
      <div className="audio_one">
        {audioUrl ? (
          <>
            <img src={audioUrl?.track?.album?.images[0].url} alt="" />
            <div>
              <h4>{audioUrl.track?.name}</h4>
              <p>{audioUrl.track?.artists[0].name}</p>
            </div>
            <div className="like">
              {audioUrl?.track?.explicit ? (
                <span>
                  <LikeICActive />
                </span>
              ) : (
                <span></span>
              )}
            </div>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="audio_two">
        <div className="audio_top_plays">
          <Audio__ />
          <span className="audio_play_contrlo_btns">
            <Prev />
            <span onClick={handelPlay}>
              {isPlaying ? <Play /> : <PlayerBtnIC />}
            </span>
            <Next />
          </span>
          <span>
            <Reload />
          </span>
        </div>
        <div>
          <audio
            src={audioUrl?.track?.preview_url}
            type="audio/mp3"
            ref={audioRef}
            className="audioEL"
            controls
            onEnded={handleAudioEnded}
            onTimeUpdate={() => setCurrentTime(audioRef.current.currentTime)}
          ></audio>
          <span className="play_control">
            <input
              type="range"
              min="0"
              className="audio_play_control"
              id="play"
              max={audioRef.current ? audioRef.current.duration : 0}
              step="1"
              value={currentTime}
              onChange={handleTimeChange}
            />
          </span>
        </div>
      </div>
      <div className="audio_thre">
        <Volume />
        <input
          type="range"
          id="play"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default AudioPlay;

import {FC} from "react";

import Play from '../icon/play.svg'
import Pause from "../icon/pause.svg";
import Prev from "../icon/prev.svg";
import Next from "../icon/prev.svg";
import VolumeUp from "../icon/volumeup.svg";
import VolumeOff from "../icon/volumeoff.svg";
import Loop from "../icon/loop.svg";
import Shuffle from "../icon/shuffle.svg";
import {ControlBarProps} from "./control-bar.types";
import cn from "classnames";
import "./mini-control-bar.css";

export const MiniControlBar: FC<ControlBarProps> = ({
  isPlaying,
  isLoop,
  isShuffle,
  play,
  pause,
  next,
  prev,
  theme,
  volume,
  handleVolumeChange,
  handleVolumeUp,
  handleVolumeOff,
  handleLoop,
  handleShuffle,
}) => {
  let fillButton = theme === "dark" ? "#fff" : "#000";

  return (
    <div className="control-bar">
      <div id="volume" className="volume">
        <VolumeOff
          width="20px"
          height="20px"
          fill={fillButton}
          className="icon"
          onClick={handleVolumeOff}
        />
        <input
          className={cn(
            "volume-bar",
            theme === "dark" ? "" : "volume-bar-dark"
          )}
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />

        <VolumeUp
          width="20px"
          height="20px"
          fill={fillButton}
          className="icon"
          onClick={handleVolumeUp}
        />
      </div>

      <div className="control_btn">
        <Shuffle
          width="20px"
          height="20px"
          className="icon"
          fill={isShuffle ? "#800000" : fillButton}
          onClick={handleShuffle}
        />
        <Prev
          onClick={prev}
          width="40px"
          height="40px"
          fill={fillButton}
          className="icon"
        />
        <div className="play_pause">
          {isPlaying ? (
            <Pause
              onClick={pause}
              className="icon"
              width="35px"
              height="35px"
              fill={fillButton}
            />
          ) : (
            <Play
              onClick={play}
              className="icon"
              width="40px"
              height="40px"
              fill={fillButton}
            />
          )}
        </div>

        <Next
          onClick={next}
          width="40px"
          height="40px"
          className="next icon"
          fill={fillButton}
        />

        <Loop
          onClick={handleLoop}
          width="20px"
          height="20px"
          className="icon"
          fill={isLoop ? "#800000" : fillButton}
        />
      </div>
    </div>
  );
};

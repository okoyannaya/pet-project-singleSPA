import React, {FC, useRef, useState, useEffect} from "react";
import cn from "classnames";

import {ProgressBarProps} from "../types.ts/progress-bar.types";
import "./mini-progress-bar.css";
import { playImages, stopImages } from "./constants";

const currentImgIndex = Number(localStorage.getItem("imgIndex")) || 0;

export const ProgressBar: FC<ProgressBarProps> = ({
  player,
  isLoop,
  next,
  isPlaying,
  play,
}) => {
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<number | null>(null);
  const [songLength, setSongLength] = useState("0:00");
  const [currentSongTime, setCurrentSongTime] = useState("0:00");
  const [currentImageIndex, setCurrentImageIndex] = useState(currentImgIndex);
  const svgRef = useRef<SVGSVGElement>(null);

  const radius = 45;
  const dashArray = radius * Math.PI * 2;
  const dashOffset = dashArray - (dashArray * progress) / 100;

  function formatTime(seconds: number) {
    let totalSeconds = Math.floor(seconds);
    let minutes = Math.floor(totalSeconds / 60);
    let remainingSeconds = totalSeconds % 60;
    let formattedSeconds =
      remainingSeconds < 10 ? "0" + remainingSeconds : remainingSeconds;
    return `${minutes}:${formattedSeconds}`;
  }

  const handleProgressClickCircle = (
    e: React.MouseEvent<SVGCircleElement, MouseEvent>
  ) => {
    if (!svgRef.current || !player) return;

    const rect = svgRef.current.getBoundingClientRect();
    const svgX = rect.left + rect.width / 2;
    const svgY = rect.top + rect.height / 2;
    const clickX = e.clientX;
    const clickY = e.clientY;
    const deltaX = clickX - svgX;
    const deltaY = clickY - svgY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI) + 90;
    const normalizedAngle = (angle < 0 ? angle + 360 : angle) % 360;
    const newProgress = (normalizedAngle / 360) * 100;
    setProgress(newProgress);
    const newTime = player.duration() * (newProgress / 100);
    player.seek(newTime);
  };

  const handleProgressInterval = () => {
    player?.on("play", () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      intervalRef.current = window.setInterval(() => {
        const seek = player.seek() as number;
        const duration = player.duration() as number;
        const lengthSong = formatTime(duration);
        const currentTime = formatTime(seek);
        setSongLength(lengthSong);
        setCurrentSongTime(currentTime);
        setProgress((seek / duration) * 100);
      }, 1000);
    });
  };

  const handleImageClick = () => {
    if (isPlaying) {
      setCurrentImageIndex((currentImageIndex + 1) % playImages.length);
    } else {
      setCurrentImageIndex((currentImageIndex + 1) % stopImages.length);
    }
  };

  const currentImage = isPlaying
    ? playImages[currentImageIndex]
    : stopImages[currentImageIndex];

  localStorage.setItem("imgIndex", `${currentImageIndex}`);

  useEffect(
    () => () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }
    },
    []
  );

  useEffect(() => {
    handleProgressInterval();
  }, [player]);

  useEffect(() => {
    const fullProgress = Math.floor(progress);
    if (isLoop && fullProgress > 98.9) {
      play();
    } else if (fullProgress > 98.9) next();
  }, [progress]);

  return (
    <div className="progress_wrapper">
      <svg ref={svgRef} className="svg_progress" width={"100"} height={"100"}>
        <circle
          className={cn("circle-progress")}
          stroke="#fff"
          strokeWidth={"8"}
          cx={"50"}
          cy={"50"}
          r={`${radius}`}
          onClick={handleProgressClickCircle}
        />
        <circle
          className={cn("circle-bacground")}
          stroke="#fff"
          strokeWidth={"7"}
          cx={"50"}
          cy={"50"}
          r={`${radius}`}
          style={{
            strokeDasharray: dashArray,
            strokeDashoffset: dashOffset,
          }}
          onClick={handleProgressClickCircle}
          transform={`rotate(-90 50 50)`}
        />
      </svg>

      <div className="time_song">
        <div className="time">{currentSongTime}</div> /
        <div className="time">{songLength}</div>
      </div>

      <div
        className="gif_container"
        title="Нажать чтобы изменить картинку"
        onClick={handleImageClick}
      >
        <div
          className={isPlaying ? "vinil-play" : "vinil-stop"}
          style={{backgroundImage: `url(${currentImage})`}}
        ></div>
      </div>
    </div>
  );
};

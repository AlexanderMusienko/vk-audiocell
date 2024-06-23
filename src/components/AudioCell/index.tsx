import { FC, RefObject, useEffect, useMemo, useState } from "react";
import {
  Icon16MoreVertical,
  Icon20GraphOutline,
  Icon20Play,
} from "@vkontakte/icons";
import {
  IconButton,
  Image,
  SimpleCell,
  Text,
  VisuallyHidden,
} from "@vkontakte/vkui";
import defaultCover from "@/assets/images/audio-cover.png";
import { formatDuration } from "@/shared/utils/duration";
import { s } from "./styles";
import cn from "./styles/audiocell.module.css";

export type TAudioCellEvent = {
  id: string | number;
  audioSrc: string;
};

type TAudioCellProps = {
  coverSrc?: string | null;
  songName: string;
  authorName: string;
  duration: number; // ms
  id: string | number;
  src: string;
  onClick?: (event: TAudioCellEvent) => void;
  isActive: boolean;
  audioRef: RefObject<HTMLAudioElement>;
};

export const AudioCell: FC<TAudioCellProps> = ({
  coverSrc,
  songName,
  authorName,
  duration,
  id,
  isActive,
  src,
  onClick,
  audioRef,
}) => {
  const [currentDurationOfActiveTrack, setCurrentDurationOfActiveTrack] =
    useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleOnEnd = () => {
    console.log("ended");
  };

  const handleClick = () => {
    setIsPaused(false);
    if (isActive) {
      setIsPaused(!isPaused);
    }
    onClick && onClick({ id: id, audioSrc: src });
  };

  const durationText = useMemo(
    () =>
      isActive
        ? formatDuration(currentDurationOfActiveTrack * 1000)
        : formatDuration(duration),
    [duration, isActive, currentDurationOfActiveTrack]
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentDurationOfActiveTrack(Math.floor(audio.currentTime));
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleOnEnd);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleOnEnd);
    };
  }, [audioRef]);

  return (
    <SimpleCell
      onClickCapture={handleClick}
      key={id}
      before={
        <Image size={40} src={coverSrc || defaultCover}>
          {isActive && (
            <Image.Overlay visibility="always" className={cn.imageOverlay}>
              {isPaused ? (
                <Icon20Play color="var(--vkui--color_icon_contrast)" />
              ) : (
                <Icon20GraphOutline color="var(--vkui--color_icon_contrast)" />
              )}
            </Image.Overlay>
          )}
        </Image>
      }
      after={
        <>
          <Text style={s.durationStyle}>{durationText}</Text>
          <IconButton>
            <VisuallyHidden>Дополнительные действия</VisuallyHidden>
            <Icon16MoreVertical color="var(--vkui--color_button_icon)" />
          </IconButton>
        </>
      }
      subtitle={
        <Text normalize style={s.authorNameStyle}>
          {authorName}
        </Text>
      }
      children={
        <Text normalize style={s.songNameStyle}>
          {songName}
        </Text>
      }
    />
  );
};

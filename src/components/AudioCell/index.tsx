import { CSSProperties, FC, useMemo, useState, useEffect, useRef } from "react";
import { Icon16MoreVertical, Icon20GraphOutline } from "@vkontakte/icons";
import {
  IconButton,
  Image,
  SimpleCell,
  Text,
  VisuallyHidden,
} from "@vkontakte/vkui";
import defaultCover from "@/assets/images/audio-cover.png";
import { formatDuration } from "@/shared/utils/duration";
import { observer } from "mobx-react-lite";
import { s } from "./styles";
import { useStores } from "@/stores/root.store";

export type TAudioCellProps = {
  coverSrc?: string | null;
  songName: string;
  authorName: string;
  duration: number; // ms
  id: string | number;
  src: string;
};

export const AudioCell: FC<TAudioCellProps> = observer(
  ({ coverSrc, songName, authorName, duration, id, src }) => {
    const {
      audioStore: { activeTrackID, setActiveTrack },
    } = useStores();
    const [isPlaying, setIsPlaying] = useState(false);
    const [playbackTime, setPlaybackTime] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null); // Reference for the audio element
    const noop = () => {};

    const isActive = useMemo(
      () => !!id && activeTrackID === id,
      [activeTrackID, id]
    );

    useEffect(() => {
      if (isActive && audioRef.current) {
        audioRef.current.play();
      } else {
        audioRef.current?.pause();
      }
    }, [isActive]);

    useEffect(() => {
      const audio = audioRef.current;
      const updatePlaybackTime = () => {
        if (audio) {
          setPlaybackTime(audio.currentTime * 1000); // Update playback time in state
        }
      };

      audio?.addEventListener("timeupdate", updatePlaybackTime);

      return () => {
        audio?.removeEventListener("timeupdate", updatePlaybackTime);
      };
    }, []);

    const durationText = formatDuration(duration);

    const handleClick = () => {
      setActiveTrack(id, src);
    };

    return (
      <SimpleCell
        onClickCapture={handleClick}
        key={id}
        before={
          <Image size={40} src={coverSrc || defaultCover}>
            {isActive && (
              <Image.Overlay visibility="always">
                <Icon20GraphOutline color="var(--vkui--color_icon_contrast)" />
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
        onClick={noop}
        children={
          <Text normalize style={s.songNameStyle}>
            <audio ref={audioRef} src={src} preload="none" hidden />
            {songName}
          </Text>
        }
      ></SimpleCell>
    );
  }
);

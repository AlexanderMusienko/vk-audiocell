import { MUSIC_MOCK } from "@/shared/mocks/music";
import { Div, Spacing, Title } from "@vkontakte/vkui";
import { FC, useRef } from "react";
import { AudioCell, TAudioCellEvent } from "../AudioCell";
import { observer } from "mobx-react-lite";
import { useStores } from "@/stores/root.store";

export const AudioPlayer: FC = observer(() => {
  const {
    audioStore: { activeTrackID, setActiveTrack },
  } = useStores();

  const audioRef = useRef<HTMLAudioElement>(null);

  const handleAudioCellClick = ({ id, audioSrc }: TAudioCellEvent) => {
    if (!audioRef.current) {
      return;
    }

    if (id === activeTrackID && !audioRef.current.paused) {
      audioRef.current.pause();
    } else if (id === activeTrackID && audioRef.current.paused) {
      audioRef.current.play();
    } else {
      setActiveTrack(id, audioSrc);
      audioRef.current.src = audioSrc;
      audioRef.current.play();
    }
  };

  const duplicateMock = (uniqPart: string) => {
    return MUSIC_MOCK.map(({ id, ...rest }) => {
      const localId = id + uniqPart;
      const isActive = activeTrackID === localId;
      return (
        <AudioCell
          onClick={handleAudioCellClick}
          key={localId}
          id={localId}
          isActive={isActive}
          audioRef={audioRef}
          {...rest}
        />
      );
    });
  };

  return (
    <Div>
      <Div
        style={{
          backgroundColor: "var(--vkui--color_background_content)",
          borderRadius: 12,
          padding: 12,
        }}
      >
        <Title level="3">Ограниченная ширина (360px, макет)</Title>
        <Spacing />
        <div style={{ maxWidth: 360 }}>{duplicateMock("static")}</div>
      </Div>
      <Spacing />
      <Div
        style={{
          backgroundColor: "var(--vkui--color_background_content)",
          borderRadius: 12,
          padding: 12,
        }}
      >
        <Title level="3">Резина</Title>
        <Spacing />
        {duplicateMock("responsive")}
      </Div>
      <audio ref={audioRef} preload="none" hidden />
    </Div>
  );
});

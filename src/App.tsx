import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Div,
  Panel,
  PanelHeader,
  View,
} from "@vkontakte/vkui";
import { AudioCell } from "./components/AudioCell";
import "./stores/root.store";
import { MUSIC_MOCK } from "./shared/mocks/music";

function App() {
  return (
    <ConfigProvider appearance="light">
      <AdaptivityProvider>
        <AppRoot>
          <View id="main-view" activePanel="main-panel">
            <Panel id="main-panel">
              <PanelHeader>AudioCell Showcase</PanelHeader>
              <Div>
                {MUSIC_MOCK.map(
                  ({ id, src, coverSrc, songName, authorName, duration }) => (
                    <AudioCell
                      key={id}
                      id={id}
                      src={src}
                      coverSrc={coverSrc}
                      songName={songName}
                      authorName={authorName}
                      duration={duration}
                    />
                  )
                )}
              </Div>
            </Panel>
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;

import {
  AdaptivityProvider,
  AppRoot,
  ConfigProvider,
  Panel,
  PanelHeader,
  View,
} from "@vkontakte/vkui";
import { AudioPlayer } from "./components/Player";

function App() {
  return (
    <ConfigProvider appearance="light">
      <AdaptivityProvider>
        <AppRoot>
          <View id="main-view" activePanel="main-panel">
            <Panel id="main-panel">
              <PanelHeader>AudioCell Showcase</PanelHeader>
              <AudioPlayer />
            </Panel>
          </View>
        </AppRoot>
      </AdaptivityProvider>
    </ConfigProvider>
  );
}

export default App;

import { makeAutoObservable } from "mobx";
import { RootStore } from "./root.store";

export class AudioStore {
  _root: RootStore;

  constructor(root: RootStore) {
    this._root = root;
    makeAutoObservable(this);
  }

  activeTrackID?: string | number = undefined;

  activeTrackSrc?: string = undefined;

  setActiveTrack = (id: string | number, src: string) => {
    this.activeTrackID = id;
    this.activeTrackSrc = src;
  };
}

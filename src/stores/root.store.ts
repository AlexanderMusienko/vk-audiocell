import { makeAutoObservable } from "mobx";
import { AudioStore } from "./audio.store";

export class RootStore {
  audioStore: AudioStore;
  constructor() {
    makeAutoObservable(this);
    this.audioStore = new AudioStore(this);
  }
}

export const rootStore = new RootStore();

export const useStores = () => {
  return rootStore;
};

import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";

export const playersState = atom({
  key: "Players",
  default: [
    { name: "player1", symbol: 0 },
    { name: "player2", symbol: 1 }
  ]
});

export const gameState = atom({
  key: "Game",
  default: false
});

export const sizeState = atom({
  key: "Size",
  default: [3]
});

export const ratioState = atom({
  key: "Ratio",
  default: [3]
});

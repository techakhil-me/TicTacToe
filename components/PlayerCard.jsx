import React, { useState } from "react";
import Link from "next/link";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";
import { playersState } from "../assets/GameSettings";

const PlayerCard = ({ edit = true, id, curr = null }) => {
  const [players, setPlayers] = useRecoilState(playersState);
  const setPlayer = (e) => {
    let temp = [...players];
    temp[id] = { name: e.target.value, symbol: players[id].symbol };
    setPlayers(temp);
  };
  return (
    <div
      className={
        curr == id
          ? "inline-flex bg-blue-600  my-auto w-full max-w-xs flex-col items-center justify-start space-y-4 rounded-lg px-5 py-5 shadow"
          : "inline-flex my-auto w-full max-w-xs flex-col items-center justify-start space-y-4 rounded-lg px-5 py-5 shadow"
      }
    >
      {edit && (
        <p className="text-sm md:text-2xl leading-9 text-gray-800">
          Type a username
        </p>
      )}
      <img
        alt=""
        className="h-24 w-24 rounded-full"
        src={`https://avatars.dicebear.com/api/male/${players[id].name}.svg`}
      />
      {edit && (
        <input
          className="focus:shadow-outline text-center w-full appearance-none rounded border py-2 px-3 text-2xl font-semibold leading-tight t shadow focus:outline-none"
          id="username"
          type="text"
          value={players[id].name}
          onChange={setPlayer}
          placeholder="Username"
        />
      )}
      {!edit && (
        <p className={id==curr ? "text-white font-semibold text-2xl leading-9 text-gray-800":"text-2xl leading-9 text-gray-800"}>{players[id].name}</p>
      )}
      {edit && (
        <p className="pb-8 text-xl leading-9 text-gray-800">Player {id + 1}</p>
      )}
    </div>
  );
};

export default PlayerCard;

import React, { useEffect } from "react";
import Link from "next/link";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";
import { playersState, gameState } from "../../assets/GameSettings";
import PlayerCard from "../../components/PlayerCard";
import Add from "../../assets/add.svg";
import { useRouter } from "next/router";

const Multiplayer = () => {
  const router = useRouter();
  const [players, setPlayers] = useRecoilState(playersState);
  const game = useRecoilValue(gameState);

  useEffect(() => {
    if (!game) {
      router.push("/");
    }
  }, []);

  const addPlayer = () => {
    if (players.length < 6) {
      let temp = [...players];
      temp.push({ name: "player", symbol: players.length });
      setPlayers(temp);
    }
  };
  return (
    <section className="flex-col flex w-full my-auto gap-8 items-center pb-24">
      <p className="text-5xl font-bold leading-10 text-gray-800">
        Add players to the game
      </p>
      <div className="grid grid-cols-2 md:grid-cols-4  gap-2 md:gap-4">
        {players.map((el, i) => (
          <PlayerCard id={i} />
        ))}
        <div
          onClick={addPlayer}
          className="cursor-pointer  flex  flex-col items-center justify-center h-full rounded-lg px-5 py-10 border-4 border-dashed"
        >
          <Add className="hover:scale-105" />
          <p className="text-xl md:text-2xl leading-9 text-gray-800">
            Click to Add
          </p>
        </div>
      </div>
      <Link href="/settings">
        <div className="max-w-72 inline-flex h-14 w-full max-w-sm cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 shadow-xl shadow-blue-300 hover:shadow-md hover:shadow-blue-300">
          <p className="text-2xl font-semibold leading-9 text-gray-50">Next</p>
        </div>
      </Link>
    </section>
  );
};

export default Multiplayer;

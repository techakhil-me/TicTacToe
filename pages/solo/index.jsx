import React, { useEffect } from "react";
import Link from "next/link";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";
import { playersState } from "../../assets/GameSettings";
import X from "../../assets/x.svg";
import O from "../../assets/o.svg";
import PlayerCard from "../../components/PlayerCard";
const Solo = () => {
  const [players, setPlayers] = useRecoilState(playersState);

  const setSymbol = (symbol) => {
    let temp = [...players];
    temp[0] = { name: players[0].name, symbol: symbol };
    setPlayers(temp);
  };

  return (
    <section className="w-full my-auto flex flex-col items-center justify-center gap-8">
      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8">
        <PlayerCard id={0} />
        <form className="inline-flex flex-col my-auto  items-center justify-center gap-20 rounded-lg px-10 py-20 shadow">
          <div className="flex gap-20 items-center justify-center">
            <label
              onClick={() => setSymbol("x")}
              className="cursor-pointer hover:scale-105 transform flex flex-col items-center"
            >
              <X />
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="symbol"
                value="x"
                defaultChecked={players[0].symbol == "x"}
              />
            </label>
            <label
              onClick={() => setSymbol("o")}
              className="cursor-pointer hover:scale-105 transform flex flex-col items-center"
            >
              <O />
              <input
                className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                type="radio"
                name="symbol"
                value="o"
                defaultChecked={players[0].symbol == "o"}
              />
            </label>
          </div>
          <p className="text-2xl leading-9 text-gray-800">Pick your side</p>
        </form>
      </div>
      <Link href="/settings">
        <div className="max-w-72 inline-flex h-14 w-full max-w-sm cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 shadow-xl shadow-blue-300 hover:shadow-md hover:shadow-blue-300">
          <p className="text-2xl font-semibold leading-9 text-gray-50">Next</p>
        </div>
      </Link>
    </section>
  );
};

export default Solo;

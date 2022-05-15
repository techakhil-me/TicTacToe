import { useEffect, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { playersState, gameState } from "../assets/GameSettings";
import LeaderboardCard from "../components/LeaderboardCard";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useResetRecoilState
} from "recoil";

export default function Home() {
  const resetPlayers = useResetRecoilState(playersState);
  const [game, setGame] = useRecoilState(gameState);
  const [leaderboard, setLeaderboard] = useState(null);
  useEffect(() => {
    resetPlayers();
    setGame(true);

    const url = "https://api.tableful.online/table/627299b8d72f0eb94c09ce02";

    fetch(url, {
      method: "GET"
    })
      .then((response) => response.json())
      .then((data) => {
        data.sort((a, b) => (a.score > b.score ? 1 : -1));
        setLeaderboard(data);
      });
  }, []);

  return (
    <>
      <Head>
        <title>TicTacToe</title>
        <link rel="icon" href="/icon.svg" />
      </Head>
      {console.log(leaderboard)}
      <section className="flex flex-col md:flex-row gap-16 md:gap-8 items-center w-full h-full md:text-left text-center pt-10 md:pt-0">
        <div className="flex justify-center flex-col gap-4">
          <div className="flex flex-col gap-4">
            <p className="text-3xl md:text-6xl font-bold text-gray-900">
              Lets Play TicTacToe
            </p>
            <p className="text-lg md:text-2xl font-medium text-gray-700 md:max-w-3xl">
              Play the classic game of eX and Oes not with just 2 but play with
              upto 6 players and brag about your ranks in the leaderboard
            </p>
          </div>

          <div className="flex gap-8 flex-wrap justify-center md:justify-start">
            <Link href="/solo">
              <div className="cursor-pointer hover:shadow-md inline-flex items-center justify-center w-72 px-5 py-2.5 bg-gray-50 shadow-xl rounded-lg">
                <p className="text-2xl font-semibold leading-9 text-gray-900">
                  Vs Computer
                </p>
              </div>
            </Link>
            <Link href="/multiplayer">
              <div className="cursor-pointer hover:shadow-md hover:shadow-blue-300 inline-flex items-center justify-center w-72 h-14 px-5 py-2.5 bg-blue-600 shadow-blue-300 shadow-xl rounded-lg">
                <p className="text-2xl font-semibold leading-9 text-gray-50">
                  with Friends
                </p>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-4 h-full grow">
          <p className="text-2xl md:text-5xl font-bold leading-10 text-gray-800">
            Leaderboard
          </p>
          <div className="flex flex-col gap-2 w-full overflow-y-scroll p-2">
            {leaderboard &&
              leaderboard.map((data, i) => (
                <LeaderboardCard
                  name={data.name}
                  rank={i + 1}
                  imgSrc={`https://avatars.dicebear.com/api/male/${data.name}.svg`}
                  wins={data.score}
                />
              ))}
            <LeaderboardCard
              name="Jon Snow"
              rank="1"
              imgSrc="https://avatars.dicebear.com/api/male/xaya.svg"
              wins="3"
            />
            <LeaderboardCard
              name="Jon Snow"
              rank="2"
              imgSrc="https://avatars.dicebear.com/api/male/xaasya.svg"
              wins="3"
            />
            <LeaderboardCard
              name="Jon Snow"
              rank="3"
              imgSrc="https://avatars.dicebear.com/api/male/xsdaya.svg"
              wins="3"
            />

            <LeaderboardCard
              name="Jon Snow"
              rank="4"
              imgSrc="https://avatars.dicebear.com/api/male/xaerya.svg"
              wins="3"
            />
          </div>
        </div>
      </section>
    </>
  );
}

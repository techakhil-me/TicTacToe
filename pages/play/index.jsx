import React, { useState, useEffect } from "react";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";
import {
  sizeState,
  playersState,
  ratioState,
  gameState
} from "../../assets/GameSettings";
import PlayerCard from "../../components/PlayerCard";
import Link from "next/link";
import { useRouter } from "next/router";

const Play = () => {
  const router = useRouter();
  const game = useRecoilValue(gameState);
  const players = useRecoilValue(playersState);
  const size = useRecoilValue(sizeState)[0];
  const ratio = useRecoilValue(ratioState)[0];
  const symbol = {
    0: "https://cdn.discordapp.com/attachments/765973145852575746/975064641782837278/unknown.png",
    1: "https://cdn.discordapp.com/attachments/765973145852575746/975080946443382794/unknown.png",
    2: "https://cdn.discordapp.com/attachments/765973145852575746/975085574601998397/unknown.png",
    3: "https://cdn.discordapp.com/attachments/765973145852575746/975085636547645460/unknown.png",
    4: "https://cdn.discordapp.com/attachments/765973145852575746/975085666775998595/unknown.png",
    5: "https://cdn.discordapp.com/attachments/765973145852575746/975085680264896542/unknown.png"
  };
  const [board, setBoard] = useState(
    [...Array(size)].map((e) => Array(size).fill(false))
  );
  const [currPlayer, setCurrPlayer] = useState(0);
  const [history, setHistory] = useState([]);
  const [currMove, setCurrMove] = useState(0);
  const [winner, setWinner] = useState(null);
  const [leaderboard, setLeaderboard] = useState(null);
  const clone = (items) =>
    items.map((item) => (Array.isArray(item) ? clone(item) : item));

  useEffect(() => {
    if (!game) {
      router.push("/");
    }
  }, []);

  const playMove = (r, c) => {
    let temp = clone(board);
    if (temp[r][c] !== false) {
      return;
    }
    temp[r][c] = currPlayer;
    setBoard(temp);

    // check winner and draw
    checkWinner(r, c, temp);

    // set history
    setHistory([...history.slice(0, currMove), [temp]]);
    setCurrMove(currMove + 1);

    // next player
    setCurrPlayer((currPlayer + 1) % players.length);
  };

  const changeHistory = (id) => {
    setCurrPlayer((id + 1) % players.length);
    let temp = clone(history[id][0]);
    console.log(temp);
    setBoard(temp);
    setCurrMove(id + 1);
  };
  const getRow = (r, c, temp) => {
    return temp[r].join("");
  };
  const getCol = (r, c, temp) => {
    let col = [];
    for (let i = 0; i < size; i++) {
      col.push(temp[i][c]);
    }
    return col.join("");
  };
  const getLeft = (r, c, temp) => {
    let left = [];
    let x = r,
      y = c;
    while (x < size && y < size) {
      left.push(temp[x][y]);
      x++;
      y++;
    }
    x = r - 1;
    y = c - 1;
    while (-1 < x && -1 < y) {
      left.unshift(temp[x][y]);
      x--;
      y--;
    }
    return left.join("");
  };

  const getRight = (r, c, temp) => {
    let right = [];
    let x = r,
      y = c;
    while (x < size && -1 < y) {
      right.push(temp[x][y]);
      x++;
      y--;
    }
    x = r - 1;
    y = c + 1;
    while (-1 < x && y < size) {
      right.unshift(temp[x][y]);
      x--;
      y++;
    }
    return right.join("");
  };

  const checkWinner = (r, c, temp) => {
    let playerStreak = `${temp[r][c]}`.repeat(ratio);
    let rcd = `${getRow(r, c, temp)}-${getCol(r, c, temp)}-${getLeft(
      r,
      c,
      temp
    )}-${getRight(r, c, temp)}`;
    if (rcd.includes(playerStreak)) {
      setWinner(players[currPlayer].name);

      const url = "https://api.tableful.online/table/628101b22f1ddf878d23b7bc";

      fetch(url, {
        method: "GET"
      })
        .then((response) => response.json())
        .then((data) => {
          let exist = data.findIndex(
            (object) => object.name === players[currPlayer].name
          );
          if (exist !== -1) {
            let url = `https://api.tableful.online/table/628101b22f1ddf878d23b7bc/${exist}`;

            let newdata = {
              name: data[exist].name,
              score: parseInt(data[exist].score) + 1
            };

            fetch(url, {
              method: "PATCH",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(newdata)
            });
          } else {
            let url =
              "https://api.tableful.online/table/628101b22f1ddf878d23b7bc";

            let newdata = {
              name: players[currPlayer].name,
              score: 1
            };

            fetch(url, {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(newdata)
            });
          }
        });
    }
  };

  return (
    <section className="w-full h-full flex flex-col md:flex-row gap-8  justify-center">
      {winner && (
        <div className="fixed top-0 backdrop-blur z-10 left-0 w-screen h-screen flex items-center justify-center">
          <div className="flex-col flex items-center justify-center p-8 px-20 bg-gray-50 gap-12 shadow rounded-lg">
            <img
              className="w-52"
              src="https://cdn.discordapp.com/attachments/765973145852575746/975318722447298570/unknown.png"
              alt=""
            />
            <div className="flex flex-col gap-2 items-center">
              <p className="sticky top-0 text-2xl md:text-3xl font-bold leading-10 text-gray-800">
                {winner}
              </p>
              <p className="text-xl leading-9 text-gray-800">is the winner</p>
            </div>
            <Link href="/">
              <div className="max-w-72 inline-flex h-14 w-full max-w-sm cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 shadow-xl shadow-blue-300 hover:shadow-md hover:shadow-blue-300">
                <p className="text-2xl font-semibold leading-9 text-gray-50">
                  Play Again
                </p>
              </div>
            </Link>
          </div>
        </div>
      )}
      <div className="grid overflow-y-scroll grid grid-cols-2 md:grid-cols-1 items-center my-auto h-full gap-8">
        {players.map((el, i) => (
          <PlayerCard key={`p${i}`} id={i} edit={false} curr={currPlayer} />
        ))}
      </div>

      {/* board */}
      <div
        style={{ height: "95%" }}
        className="relative flex flex-wrap aspect-square flex rounded-lg shadow"
      >
        {board.map((row, r) => (
          <>
            {row.map((col, c) => (
              <div
                key={`${r}${c}`}
                r={r}
                c={c}
                onClick={() => playMove(r, c)}
                style={{ width: `${100 / size}%` }}
                className="flex shrink-0 aspect-square items-center justify-center border border-black aspect-sqaure grow"
              >
                {col + 1 && <img src={symbol[col]} alt="" />}
              </div>
            ))}
          </>
        ))}

        <div
          style={{ border: "2px solid #f8f8f8" }}
          className="absolute w-full h-full pointer-events-none"
        ></div>
      </div>

      <div className="flex overflow-y-scroll flex-col h-full gap-2">
        <p className="sticky top-0 text-2xl md:text-3xl font-bold leading-10 text-gray-800">
          History
        </p>
        {history.map((el, i) => (
          <div
            onClick={() => changeHistory(i)}
            key={`h${i}`}
            className={
              i == currMove - 1
                ? "cursor-pointer inline-flex flex-col space-y-1 items-center justify-start p-1 px-3 bg-yellow-500 shadow rounded-lg"
                : "cursor-pointer inline-flex flex-col space-y-1 items-center justify-start p-1 px-3 bg-gray-50 shadow rounded-lg"
            }
          >
            <p key={`ah${i}`} className="text-xl leading-9 text-gray-800">
              {i + 1}. {players[i % players.length].name} played
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Play;

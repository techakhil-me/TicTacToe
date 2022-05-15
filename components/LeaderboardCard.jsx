import React from "react";

const LeaderboardCard = ({ imgSrc, name, wins, rank }) => {
  return (
    <div className="inline-flex space-x-4 items-center justify-start px-5 py-3 shadow-lg rounded-lg w-full">
      <p className="text-2xl font-semibold leading-9 text-gray-900">{rank}</p>
      <img alt="" className="w-14 h-full rounded-full" src={imgSrc} />
      <div className="inline-flex flex-col items-start justify-start">
        <p className="text-2xl font-bold leading-relaxed text-gray-800">
          {name}
        </p>
        <p className="text-lg leading-normal">
          won {wins} matches among his friends
        </p>
      </div>
    </div>
  );
};

export default LeaderboardCard;

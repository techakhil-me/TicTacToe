import React, { useEffect } from "react";
import Link from "next/link";
import Slider from "../../components/Slider";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue
} from "recoil";
import { useRouter } from "next/router";
import { sizeState, ratioState, gameState } from "../../assets/GameSettings";

const Settings = () => {
  const router = useRouter();
  const [rMax, setRMax] = useRecoilState(sizeState);
  const [ratio, setRatio] = useRecoilState(ratioState);
  const game = useRecoilValue(gameState);

  useEffect(() => {
    setRatio(rMax);
  }, [rMax]);

  useEffect(() => {
    if (!game) {
      router.push("/");
    }
  }, []);
  return (
    <section className="w-full my-auto py-8 items-center flex gap-16 flex-col">
      <div className="flex-col gap-4 flex w-full items-center">
        <p className="text-2xl md:text-5xl font-bold leading-10 text-gray-800">
          Size of the board
        </p>
        <Slider
          Min={3}
          Max={21}
          Step={1}
          valueState={sizeState}
          // values={size} setValues={setSize}
        />
      </div>
      <div className="flex-col gap-4 flex w-full items-center">
        <p className="text-2xl md:text-5xl font-bold leading-10 text-gray-800">
          Winner ratio
        </p>
        <Slider
          Min={2}
          Max={rMax}
          Step={1}
          valueState={ratioState}
          // values={size} setValues={setSize}
        />
      </div>
      <Link href="/play">
        <div className="max-w-72 inline-flex h-14 w-full max-w-sm cursor-pointer items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 shadow-xl shadow-blue-300 hover:shadow-md hover:shadow-blue-300">
          <p className="text-2xl font-semibold leading-9 text-gray-50">Play</p>
        </div>
      </Link>
    </section>
  );
};

export default Settings;

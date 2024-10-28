import { Fragment, useState } from "react";

type Thing = {
  id: number;
  name: string;
  cover: string;
}

const things: Thing[] = [
  {
    id: 1,
    name: "iphone",
    cover: "/assets/iphone16.png",
  },
  {
    id: 2,
    name: "watch",
    cover: "/assets/iphone16.png",
  },
];

const luckyAction = () => {
  const luckyNumber = parseInt((Math.random() * things.length).toFixed(0));
  return things[luckyNumber] || null;
};

export const LuckyCard = () => {
  const [luckyThing, setLuckyThing] = useState<Thing | null>(null);

  return <>
    <div className={"rounded-lg p-4 flex gap-4 items-center bg-gradient-to-r from-cyan-500 to-blue-500 text-white"}>
      {
        things.map(thing => {
          return <Fragment key={thing.id}>
            <div
              className={`px-2 py-1 rounded-lg border-white ${luckyThing?.id === thing.id ? "border" : ""}`}>{thing.name}</div>
          </Fragment>;
        })
      }
    </div>
    <div className={"flex-1 rounded-lg bg-gradient-to-r from-sky-200 to-pink-200 flex items-center justify-center"}>
      <img className={"flex-1"} src={luckyThing?.cover} alt="" />
    </div>
    <div
      className={"border rounded-lg p-2 flex justify-center bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl"}>
      <div onClick={() => {
        const lucky = luckyAction();
        setLuckyThing(lucky);
      }}>{"GO"}</div>
    </div>

  </>;
};
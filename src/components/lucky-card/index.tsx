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
  return new Promise<Thing>(resolve => {
    setTimeout(() => {
      const luckyNumber = parseInt((Math.random() * things.length).toFixed(0));
      resolve(things[luckyNumber]);
    }, 3000);
  });

};

export const LuckyCard = () => {
  const [luckyThing, setLuckyThing] = useState<Thing | null>(null);
  const [loading, setLoading] = useState(false);

  return <>
    <div className={"rounded-lg p-4 flex gap-4 items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white"}>
      {
        things.map(thing => {
          return <Fragment key={thing.id}>
            <div
              className={`select-none px-2 py-1 rounded-lg border-white ${luckyThing?.id === thing.id ? "border" : ""}`}>{thing.name}</div>
          </Fragment>;
        })
      }
    </div>
    <div className={"flex-1 rounded-lg bg-gradient-to-r from-sky-200 to-pink-200 flex items-center justify-center"}>
      {
        loading ? <div>Loading</div> :
          !luckyThing ? <>Pity</> :
            <img className={"flex-1"} src={luckyThing.cover} alt="" />
      }

    </div>
    <div
      className={"select-none border rounded-lg p-2 flex justify-center bg-blue-400 active:bg-ring-gradient from-cyan-500 to-blue-500 text-white text-xl"}
      onClick={async () => {
        setLuckyThing(null);
        setLoading(true);
        const lucky = await luckyAction();
        setLoading(false);
        if (lucky) {
          setLuckyThing(lucky);
        }
      }}
    >
      <div>{"GO"}</div>
    </div>

  </>;
};
import { Fragment, useEffect, useRef, useState } from "react";

type Thing = {
  id: number;
  name: string;
  cover: string;
};

const things: Thing[] = [
  {
    id: 1,
    name: "iphone16",
    cover: "/assets/iphone16.png",
  },
  {
    id: 2,
    name: "watch",
    cover: "/assets/watch.jpg",
  },
  {
    id: 3,
    name: "macbook",
    cover: "/assets/iphone16.png",
  },
  {
    id: 4,
    name: "ipad",
    cover: "/assets/ipad.png",
  },
  {
    id: 5,
    name: "iphone16",
    cover: "/assets/iphone16.png",
  },
  {
    id: 6,
    name: "ipad",
    cover: "/assets/ipad.png",
  },
  {
    id: 7,
    name: "iphone16",
    cover: "/assets/iphone16.png",
  },
  {
    id: 8,
    name: "ipad",
    cover: "/assets/ipad.png",
  },
  {
    id: 9,
    name: "watch",
    cover: "/assets/watch.jpg",
  },
  {
    id: 10,
    name: "ipad",
    cover: "/assets/ipad.png",
  },
];

const luckyAction = () => {
  return new Promise<Thing>((resolve) => {
    setTimeout(() => {
      const luckyNumber = parseInt((Math.random() * things.length).toFixed(0));
      resolve(things[luckyNumber]);
    }, 3000);
  });
};

export const LuckyCard = () => {
  const [luckyThing, setLuckyThing] = useState<Thing | null>(null);
  const [loading, setLoading] = useState(false);
  const thingsContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (luckyThing) {
      const current = thingsContainerRef.current;
      if (current) {
        for (const child of current.children) {
          if (child.id === `thing_${luckyThing.id}`) {
            child.scrollIntoView({
              behavior: "smooth",
              inline: "center",
            });
          }
        }
      }
    }
  }, [luckyThing]);

  return (
    <>
      <div
        ref={thingsContainerRef}
        className={
          "flex-shrink-0 rounded-lg p-4 flex gap-4 items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white overflow-x-scroll"
        }
      >
        {things.map((thing) => {
          return (
            <Fragment key={thing.id}>
              <div
                id={`thing_${thing.id}`}
                className={`flex-shrink-0 flex items-center
              select-none w-20 h-20 px-2 py-1 rounded-lg border-white ${luckyThing?.id === thing.id ? "border" : ""}`}
                onClick={() => {
                  setLuckyThing(thing);
                }}
              >
                <img src={thing.cover} alt="" />
              </div>
            </Fragment>
          );
        })}
      </div>
      <div
        className={
          "flex-grow rounded-lg bg-gradient-to-bl from-pink-400 to-blue-500 flex flex-col items-center justify-center p-[2px]"
        }
      >
        {loading ? (
          <div>Loading</div>
        ) : !luckyThing ? (
          <>Pity</>
        ) : (
          <>
            <div className={"h-2/3 w-full overflow-scroll flex items-center justify-center rounded-t-[6px]"}>
              <img width={260} height={260} src={luckyThing.cover} alt="" />
            </div>
            <div
              className={
                "rounded-b-[6px] bg-white h-1/3 px-4 py-6 w-full"
              }
            >
              <div className={"mb-2"}>
                <span className={"font-bold"}>{'奖品名称:'}</span>
                <span className={"ml-2"}>{luckyThing.name}</span>
              </div>
              <div className={"mb-2"}>
                <span className={"font-bold"}>{"奖品价值:"}</span>
                <span className={"ml-2 italic"}>{"$999"}</span>
              </div>
            </div>
          </>
        )}
      </div>
      <div
        className={
          "select-none border rounded-lg p-2 flex justify-center bg-blue-400 active:bg-ring-gradient from-cyan-500 to-blue-500 text-white text-xl"
        }
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
    </>
  );
};

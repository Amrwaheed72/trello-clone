import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-cols-5 gap-4">
  
      <div className="space-y-1">
        <p>Gray</p>
        <div className="w-20 h-10 bg-gray-500"></div>
      </div>

      <div className="space-y-1">
        <p>Zinc</p>
        <div className="w-20 h-10 bg-zinc-500"></div>
      </div>

      <div className="space-y-1">
        <p>Stone</p>
        <div className="w-20 h-10 bg-stone-500"></div>
      </div>

      <div className="space-y-1">
        <p>Slate</p>
        <div className="w-20 h-10 bg-slate-500"></div>
      </div>

      <div className="space-y-1">
        <p>Neutral</p>
        <div className="w-20 h-10 bg-neutral-500"></div>
      </div>
    </div>
  );
}

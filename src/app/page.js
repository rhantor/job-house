import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-wrap justify-center items-center container mx-auto">
      <div className="lg:w-1/2 lg:min-h-[90vh] order-2 lg:order-1 px-10 py-5 lg:p-10 flex flex-col justify-center items-start ">
        <h1 className="font-extrabold text-5xl md:text-6xl tracking-wider mb-10 text-green-500">
          <span className="block md:mb-5">How work</span>{" "}
          <span className="text-4xl"> should work</span>
        </h1>
        <h2 className="text-xl">
          The Market place where you can found client or contractor easily
        </h2>
        <br />
        <p className="text-base">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro alias
          accusantium dolor vel nisi consequatur, exercitationem excepturi culpa
          omnis voluptates tenetur autem eos, aliquam dolorum tempora quae eum
          at facilis? Dolores quam optio maxime officia cupiditate reiciendis
          exercitationem aspernatur magni quae iste. Quod, libero accusamus!
        </p>
        <br />
        <br />
        <Link
          href={"/job"}
          className="bg-green-500 text-white px-5 py-2 rounded-lg text-xl"
        >
          Go For Your Need
        </Link>
      </div>
      <div className="lg:w-1/2 lg:h-[90vh] flex justify-center items-center order-1 lg:order-1 mt-10 lg:mt-0 ">
        <h1 className="font-extrabold text-5xl md:text-7xl lg:text-9xl tracking-[10px] mb-10">
          JO
          <span className="text-red-600 inline-block duration-500 animate-bounce-slow">
            B
          </span>
          <span className="text-red-600 inline-block animate-bounce">B</span>Y
        </h1>
      </div>
    </main>
  );
}

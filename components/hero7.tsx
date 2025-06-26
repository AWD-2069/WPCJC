import React from "react";

interface Hero7Props {
  heading?: string;
  description?: string;
  join_us?: string;
}

const Hero7 = ({
  heading = "Welcome to Westminster Presbyterian Church",
  description = `Westminster Presbyterian Church isn’t a building—we are a family of faith, drawn together as  children of God and heirs of His salvation in Christ.`,
  join_us = "Join us for worship at 8:30 or 11:00 am each Sunday."
}: Hero7Props) => {
  return (
    <section className="relative rounded-3xl overflow-hidden mx-2 sm:mx-8 mt-6">
      <div className="pt-8 bg-transparent" />
      <div
        className="relative bg-cover bg-center pt-24 pb-32 rounded-3xl overflow-hidden"
        style={{ backgroundImage: "url('/uploads/hero-bg.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40 rounded-3xl" aria-hidden="true" />
        <div className="container text-center relative z-10">
          <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-4">
            <h1 className="text-3xl font-extrabold lg:text-6xl text-white drop-shadow-lg">{heading}</h1>
            <p className="text-lg lg:text-3xl text-white/90 drop-shadow">{description}</p>
            <p className="text-lg lg:text-3xl text-white/90 drop-shadow">{join_us}</p>
          </div>
        </div>
      </div>
      <div className="pb-8 bg-transparent" />
    </section>
  );
};

export { Hero7 };

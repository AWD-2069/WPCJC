import { join } from "path";
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
    <section className="py-16">
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl">{heading}</h1>
          <p className="text-muted-foreground text-balance lg:text-3xl">
            {description}
          </p>
          <p className="text-muted-foreground text-balance lg:text-3xl">
            {join_us}
          </p>
        </div>
      </div>
    </section>
  );
};

export { Hero7 };

import React from "react";

interface Hero7Props {
  heading?: string;
  description?: string;
}

const Hero7 = ({
  heading = "Welcome to Westminster Presbyterian Church",
  description = "Westminster Presbyterian Church isn\’t a building—we are a family of faith, drawn together as  children of God and heirs of His salvation in Christ. <br /> Join us for worship at 8:30 or 11:00 am each Sunday."
}: Hero7Props) => {
  return (
    <section className="py-16">
      <div className="container text-center">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <h1 className="text-3xl font-extrabold lg:text-6xl">{heading}</h1>
          <p
            className="text-muted-foreground text-balance lg:text-3xl"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
    </section>
  );
};

export { Hero7 };

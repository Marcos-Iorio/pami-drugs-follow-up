import React from "react";
import Link from "next/link";

type Patient = {
  id: bigint;
  name: string;
};

const Card = ({ id, name }: Patient) => {
  return (
    <Link href={`/profile/${name}/${id}`}>
      <section className="h-[15em] w-[30em] border-2 border-solid rounded-2xl border-[#18283A] bg-[#040F16] hover:bg-[#0f1c24] grid place-content-center">
        <p className="font-bold text-3xl text-[#C3C9E9]">{name}</p>
      </section>
    </Link>
  );
};

export default Card;

import { prisma } from "@/lib/prisma";
import Card from "./_components/Card/Card";

/* const getPatients = async () => {
  return patients;
}; */

export default async function Home() {
  const patients = await prisma.patients.findMany();
  return (
    <main className="h-screen w-screen grid place-content-center bg-[#030C11]">
      <section className="flex sm:flex-row flex-col w-full h-full gap-6">
        {patients.map((patient, index) => (
          <Card key={index} {...patient} />
        ))}
        <div className=" h-[15em] w-[5em] border-[#c2c2c2] border-dashed border-4 rounded-2xl flex justify-center items-center cursor-pointer">
          <p className="text-[#c2c2c2] text-6xl font-ligth">+</p>
        </div>
      </section>
    </main>
  );
}

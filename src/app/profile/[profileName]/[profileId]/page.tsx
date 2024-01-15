import Drugs from "@/app/_components/Drugs/Drugs";
import Orders from "@/app/_components/Orders/Orders";
import { getDrugsByPatient } from "@/lib/getDrugsByPatients";
import { formatText } from "@/utils/formatSpaces";
import Link from "next/link";

const Profile = async ({
  params,
}: {
  params: { profileName: string; profileId: string };
}) => {
  const drugs = await getDrugsByPatient(params.profileId);
  return (
    <main className="h-full min-h-[100vh] w-full bg-[#030C11] flex flex-col items-center gap-10 relative">
      <div className="flex items-center justify-center w-full relative mt-28">
        <div className="absolute left-20">
          <Link
            href="/"
            className="underline text-[#BBD1EA] text-lg flex flex-row-reverse items-center"
          >
            volver al inicio
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                />
              </svg>
            </span>
          </Link>
        </div>
        <h2 className="text-[#BBD1EA] text-6xl font-bold ">
          {formatText(params.profileName)}
        </h2>
      </div>

      <Drugs drugs={drugs} isSelectable={false} />
      <Orders id={params.profileId} drugs={drugs} />
    </main>
  );
};

export default Profile;

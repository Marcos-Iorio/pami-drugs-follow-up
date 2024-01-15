-- CreateTable
CREATE TABLE "Drugs" (
    "id" BIGSERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "patiendId" BIGINT NOT NULL,

    CONSTRAINT "Drugs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Orders" (
    "id" BIGSERIAL NOT NULL,
    "givenAt" TIMESTAMP(3) NOT NULL,
    "retiredAt" TIMESTAMP(3) NOT NULL,
    "buyedAt" TIMESTAMP(3) NOT NULL,
    "patientId" BIGINT NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Drugs" ADD CONSTRAINT "Drugs_patiendId_fkey" FOREIGN KEY ("patiendId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patients"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

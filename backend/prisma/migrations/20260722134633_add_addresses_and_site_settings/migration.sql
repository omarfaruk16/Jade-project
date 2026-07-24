-- AlterTable
ALTER TABLE "ContactSettings" ADD COLUMN     "siteDescription" TEXT NOT NULL DEFAULT 'Leading Malaysian manufacturer of custom kitchen cabinets, wardrobes, bespoke furniture, interior fit-out products, and worldwide export & import services.',
ADD COLUMN     "siteTitle" TEXT NOT NULL DEFAULT 'Jade Kitchen Design | Interior Products Manufacturer Malaysia';

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "label" TEXT,
    "address" TEXT NOT NULL,
    "order" INTEGER NOT NULL DEFAULT 0,
    "contactSettingsId" TEXT NOT NULL,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_contactSettingsId_fkey" FOREIGN KEY ("contactSettingsId") REFERENCES "ContactSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

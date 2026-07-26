-- AlterTable: add ON DELETE CASCADE to SocialLink foreign key
ALTER TABLE "SocialLink" DROP CONSTRAINT "SocialLink_contactSettingsId_fkey";
ALTER TABLE "SocialLink" ADD CONSTRAINT "SocialLink_contactSettingsId_fkey" FOREIGN KEY ("contactSettingsId") REFERENCES "ContactSettings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AlterTable: Add page column to Partner with default 'about'
ALTER TABLE "Partner" ADD COLUMN IF NOT EXISTS "page" TEXT NOT NULL DEFAULT 'about';

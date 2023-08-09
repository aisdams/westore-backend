/*
  Warnings:

  - You are about to drop the column `fasilitas_hotel_code` on the `fasilitas_kamar_detail` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `fasilitas_kamar_detail` DROP FOREIGN KEY `fasilitas_kamar_detail_fasilitas_hotel_code_fkey`;

-- AlterTable
ALTER TABLE `fasilitas_kamar_detail` DROP COLUMN `fasilitas_hotel_code`;

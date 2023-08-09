-- CreateTable
CREATE TABLE `fasilitas_hotel` (
    `fasilitas_hotel_code` VARCHAR(191) NOT NULL,
    `nama_hotel` VARCHAR(191) NOT NULL,
    `alamat` TEXT NULL,
    `keterangan` TEXT NULL,
    `photo` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`fasilitas_hotel_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fasilitas_kamar` (
    `fasilitas_kamar_code` VARCHAR(191) NOT NULL,
    `tipe_kamar` VARCHAR(191) NOT NULL,
    `fasilitas_kamar` VARCHAR(255) NOT NULL,
    `jumlah_kamar_tersedia` VARCHAR(191) NOT NULL,
    `jumlah_kamar_tekterpakai` VARCHAR(191) NOT NULL,
    `jumlah_pinjam` VARCHAR(191) NOT NULL,
    `tarif` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`fasilitas_kamar_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `fasilitas_kamar_detail` (
    `fasilitas_kamar_detail_code` VARCHAR(191) NOT NULL,
    `fasilitas_kamar_code` VARCHAR(255) NOT NULL,
    `fasilitas_hotel_code` VARCHAR(255) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`fasilitas_kamar_detail_code`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `fasilitas_kamar_detail` ADD CONSTRAINT `fasilitas_kamar_detail_fasilitas_kamar_code_fkey` FOREIGN KEY (`fasilitas_kamar_code`) REFERENCES `fasilitas_kamar`(`fasilitas_kamar_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `fasilitas_kamar_detail` ADD CONSTRAINT `fasilitas_kamar_detail_fasilitas_hotel_code_fkey` FOREIGN KEY (`fasilitas_hotel_code`) REFERENCES `fasilitas_hotel`(`fasilitas_hotel_code`) ON DELETE RESTRICT ON UPDATE CASCADE;

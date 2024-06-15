-- CreateTable
CREATE TABLE `users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `password` VARCHAR(255) NOT NULL,
    `refresh_token` TEXT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `users_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `diabetesprediction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `ffpg` DOUBLE NULL,
    `fpg` DOUBLE NULL,
    `age` INTEGER NULL,
    `hdl` DOUBLE NULL,
    `ldl` DOUBLE NULL,
    `sbp` DOUBLE NULL,
    `diabetes_risk` DOUBLE NULL,
    `label` VARCHAR(255) NULL,
    `suggestion` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `heartdiseaseprediction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `age` INTEGER NULL,
    `troponin` DOUBLE NULL,
    `kcm` DOUBLE NULL,
    `glucose` INTEGER NULL,
    `pressureheight` INTEGER NULL,
    `presurelow` INTEGER NULL,
    `heart_disease_risk` DOUBLE NULL,
    `label` VARCHAR(255) NULL,
    `suggestion` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `strokeprediction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idUser` INTEGER NOT NULL,
    `age` INTEGER NULL,
    `avg_glucose_level` DOUBLE NULL,
    `bmi` DOUBLE NULL,
    `hypertension` INTEGER NULL,
    `heart_disease` INTEGER NULL,
    `smoking_status` INTEGER NULL,
    `label` VARCHAR(255) NULL,
    `stroke_risk` DOUBLE NULL,
    `suggestion` VARCHAR(255) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `diabetesprediction` ADD CONSTRAINT `diabetesprediction_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `heartdiseaseprediction` ADD CONSTRAINT `heartdiseaseprediction_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `strokeprediction` ADD CONSTRAINT `strokeprediction_idUser_fkey` FOREIGN KEY (`idUser`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

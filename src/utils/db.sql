/*
Este script incluye claves foráneas, pero al trabajar
con PlanetScale, estas deben removerse.
*/

-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema colegio_mallorca
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Table `colegio_mallorca`.`docente`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`docente` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `rut` INT NOT NULL,
  `dv` CHAR(1) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `nombres` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contrasena` VARBINARY(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE,
  UNIQUE INDEX `rut_UNIQUE` (`rut` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`curso` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nivel` INT NOT NULL,
  `letra` CHAR(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`alumno`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`alumno` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `rut` INT NOT NULL,
  `dv` CHAR(1) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `nombres` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contrasena` VARBINARY(60) NOT NULL,
  `id_curso` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE,
  UNIQUE INDEX `rut_UNIQUE` (`rut` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_alumno_curso_idx` (`id_curso` ASC) VISIBLE,
  CONSTRAINT `fk_alumno_curso`
    FOREIGN KEY (`id_curso`)
    REFERENCES `colegio_mallorca`.`curso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`asignatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`asignatura` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`clase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`clase` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_curso` INT UNSIGNED NOT NULL,
  `id_asignatura` INT UNSIGNED NOT NULL,
  `id_docente` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  INDEX `fk_clase_curso1_idx` (`id_curso` ASC) VISIBLE,
  INDEX `fk_clase_asignatura1_idx` (`id_asignatura` ASC) VISIBLE,
  INDEX `fk_clase_docente1_idx` (`id_docente` ASC) VISIBLE,
  CONSTRAINT `fk_clase_curso1`
    FOREIGN KEY (`id_curso`)
    REFERENCES `colegio_mallorca`.`curso` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_clase_asignatura1`
    FOREIGN KEY (`id_asignatura`)
    REFERENCES `colegio_mallorca`.`asignatura` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_clase_docente1`
    FOREIGN KEY (`id_docente`)
    REFERENCES `colegio_mallorca`.`docente` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`recurso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`recurso` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NOT NULL,
  `ubicacion` VARCHAR(45) NOT NULL,
  `id_clase` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `ubicacion_UNIQUE` (`ubicacion` ASC) VISIBLE,
  UNIQUE INDEX `titulo_UNIQUE` (`titulo` ASC) VISIBLE,
  INDEX `fk_recurso_clase1_idx` (`id_clase` ASC) VISIBLE,
  CONSTRAINT `fk_recurso_clase1`
    FOREIGN KEY (`id_clase`)
    REFERENCES `colegio_mallorca`.`clase` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`nota`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`nota` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `numero` VARCHAR(45) NOT NULL,
  `porcentaje` VARCHAR(45) NOT NULL,
  `calificacion` VARCHAR(45) NOT NULL,
  `id_alumno` INT UNSIGNED NOT NULL,
  `id_clase` INT UNSIGNED NOT NULL,
  `semestre` INT NOT NULL CHECK (semestre IN (1, 2))
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `numero_UNIQUE` (`numero` ASC) VISIBLE,
  INDEX `fk_nota_alumno1_idx` (`id_alumno` ASC) VISIBLE,
  INDEX `fk_nota_clase1_idx` (`id_clase` ASC) VISIBLE,
  CONSTRAINT `fk_nota_alumno1`
    FOREIGN KEY (`id_alumno`)
    REFERENCES `colegio_mallorca`.`alumno` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_nota_clase1`
    FOREIGN KEY (`id_clase`)
    REFERENCES `colegio_mallorca`.`clase` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`admin`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`admin` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `rut` INT NOT NULL,
  `dv` CHAR(1) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `nombres` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(100) NOT NULL,
  `contrasena` VARBINARY(60) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE,
  UNIQUE INDEX `rut_UNIQUE` (`rut` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;


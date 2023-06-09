CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`alumno` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `rut` INT NOT NULL,
  `dv` CHAR(1) NOT NULL,
  `apellidos` VARCHAR(45) NOT NULL,
  `nombres` VARCHAR(45) NOT NULL,
  `correo` VARCHAR(100) NULL,
  `contrasena` VARBINARY(60) NOT NULL,
  `telefono` VARCHAR(15) NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `foto_ubicacion` VARCHAR(1024) NULL,
  `direccion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `rut_UNIQUE` (`rut` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`asignatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`asignatura` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nombre` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `nombre_UNIQUE` (`nombre` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`curso` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nivel` INT NOT NULL,
  `letra` CHAR(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


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
  `telefono` VARCHAR(15) NULL,
  `fecha_nacimiento` DATE NOT NULL,
  `foto_ubicacion` VARCHAR(1024) NULL,
  `direccion` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `correo_UNIQUE` (`correo` ASC) VISIBLE,
  UNIQUE INDEX `rut_UNIQUE` (`rut` ASC) VISIBLE,
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
AUTO_INCREMENT = 2
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`clase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`clase` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_curso` INT UNSIGNED NOT NULL,
  `id_asignatura` INT UNSIGNED NOT NULL,
  `id_docente` INT UNSIGNED NOT NULL,
  `ano` YEAR NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`nota`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`nota` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `numero` INT NOT NULL,
  `porcentaje` INT NOT NULL,
  `calificacion` DECIMAL(2,1) NOT NULL,
  `ano` YEAR NOT NULL,
  `semestre` INT UNSIGNED NOT NULL,
  `id_alumno` INT UNSIGNED NOT NULL,
  `id_asignatura` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `numero_UNIQUE` (`numero` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`recurso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`recurso` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `titulo` VARCHAR(45) NOT NULL,
  `ubicacion` VARCHAR(1024) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `titulo_UNIQUE` (`titulo` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`alumno_curso`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`alumno_curso` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_alumno` INT UNSIGNED NOT NULL,
  `id_curso` INT UNSIGNED NOT NULL,
  `ano` YEAR NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `ano_UNIQUE` (`ano` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`bloque`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`bloque` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `dia` VARCHAR(10) NOT NULL,
  `hora_inicio` TIME NOT NULL,
  `hora_termino` TIME NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`sala` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `codigo` VARCHAR(15) NOT NULL,
  `capacidad` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE,
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`clase_bloque_sala`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`clase_bloque_sala` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_bloque` INT UNSIGNED NOT NULL,
  `id_sala` INT UNSIGNED NOT NULL,
  `id_clase` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`recurso_clase`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`recurso_clase` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_recurso` INT UNSIGNED NOT NULL,
  `id_clase` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `colegio_mallorca`.`recurso_asignatura`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `colegio_mallorca`.`recurso_asignatura` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_recurso` INT UNSIGNED NOT NULL,
  `id_asignatura` INT UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;

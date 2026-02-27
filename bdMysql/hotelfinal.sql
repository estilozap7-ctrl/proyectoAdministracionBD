CREATE DATABASE IF NOT EXISTS hotel_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE hotel_db;

CREATE TABLE IF NOT EXISTS huespedes (
    id_huesped       INT             NOT NULL AUTO_INCREMENT,
    nombre           VARCHAR(100)    NOT NULL,
    apellido         VARCHAR(100)    NOT NULL,
    email            VARCHAR(150)    NOT NULL,
    telefono         VARCHAR(20)     DEFAULT NULL,
    documento        VARCHAR(50)     DEFAULT NULL,
    nacionalidad     VARCHAR(80)     DEFAULT NULL,
    creado_en        TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    actualizado_en   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                     ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY  (id_huesped),
    UNIQUE  KEY  uq_email     (email),
    UNIQUE  KEY  uq_documento (documento)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS habitaciones (
    id_habitacion    INT             NOT NULL AUTO_INCREMENT,
    numero           VARCHAR(10)     NOT NULL,
    tipo             ENUM(
                       'individual',
                       'doble',
                       'suite',
                       'penthouse'
                     )               NOT NULL DEFAULT 'individual',
    capacidad        INT             NOT NULL DEFAULT 2,
    precio_noche     DECIMAL(10,2)   NOT NULL,
    piso             INT             DEFAULT NULL,
    disponible       BOOLEAN         NOT NULL DEFAULT TRUE,
    descripcion      TEXT            DEFAULT NULL,
    creado_en        TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    actualizado_en   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                     ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY  (id_habitacion),
    UNIQUE  KEY  uq_numero (numero)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE IF NOT EXISTS reservaciones (
    id_reservacion   INT             NOT NULL AUTO_INCREMENT,
    id_huesped       INT             NOT NULL,
    id_habitacion    INT             NOT NULL,
    fecha_entrada    DATE            NOT NULL,
    fecha_salida     DATE            NOT NULL,
    estado           ENUM(
                       'activa',
                       'cancelada',
                       'completada'
                     )               NOT NULL DEFAULT 'activa',
    precio_total     DECIMAL(10,2)   DEFAULT NULL,
    notas            TEXT            DEFAULT NULL,
    creado_en        TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP,
    actualizado_en   TIMESTAMP       NOT NULL DEFAULT CURRENT_TIMESTAMP
                                     ON UPDATE CURRENT_TIMESTAMP,

    PRIMARY KEY  (id_reservacion),
    INDEX  idx_huesped    (id_huesped),
    INDEX  idx_habitacion (id_habitacion),
    INDEX  idx_fechas     (fecha_entrada, fecha_salida),

    CONSTRAINT fk_reservacion_huesped
        FOREIGN KEY (id_huesped)
        REFERENCES  huespedes (id_huesped)
        ON UPDATE CASCADE
        ON DELETE RESTRICT,

    CONSTRAINT fk_reservacion_habitacion
        FOREIGN KEY (id_habitacion)
        REFERENCES  habitaciones (id_habitacion)
        ON UPDATE CASCADE
        ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

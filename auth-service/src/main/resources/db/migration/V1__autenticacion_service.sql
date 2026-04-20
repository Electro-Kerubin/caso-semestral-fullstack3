-- =======================================================
-- Migración V1: Esquema completo del microservicio Auth
-- =======================================================

-- Tabla: status
CREATE TABLE IF NOT EXISTS status (
    id_status   SERIAL PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);
INSERT INTO status (descripcion) VALUES ('ACTIVO'), ('INACTIVO'), ('BLOQUEADO') ON CONFLICT DO NOTHING;

-- Tabla: rol
CREATE TABLE IF NOT EXISTS rol (
    id_rol      SERIAL PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);
INSERT INTO rol (descripcion) VALUES ('USER'), ('ADMIN') ON CONFLICT DO NOTHING;

-- Tabla: usuario
CREATE TABLE IF NOT EXISTS usuario (
    id_usuario       SERIAL PRIMARY KEY,
    email            VARCHAR(150) NOT NULL UNIQUE,
    nombre_completo  VARCHAR(150),
    id_rol           INT,
    id_status        INT,
    contrasena       VARCHAR(255) NOT NULL,
    email_verificado BOOLEAN      DEFAULT FALSE,
    created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    last_login_at    TIMESTAMP,
    CONSTRAINT fk_usuario_rol    FOREIGN KEY (id_rol)    REFERENCES rol(id_rol),
    CONSTRAINT fk_usuario_status FOREIGN KEY (id_status) REFERENCES status(id_status)
);
CREATE INDEX IF NOT EXISTS idx_usuario_email     ON usuario(email);
CREATE INDEX IF NOT EXISTS idx_usuario_id_rol    ON usuario(id_rol);
CREATE INDEX IF NOT EXISTS idx_usuario_id_status ON usuario(id_status);

-- Tabla: usuario_rol (N:M)
CREATE TABLE IF NOT EXISTS usuario_rol (
    id_usuario INT,
    id_rol     INT,
    PRIMARY KEY (id_usuario, id_rol),
    CONSTRAINT fk_usuario_rol_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE,
    CONSTRAINT fk_usuario_rol_rol     FOREIGN KEY (id_rol)     REFERENCES rol(id_rol)          ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_usuario_rol_id_usuario ON usuario_rol(id_usuario);
CREATE INDEX IF NOT EXISTS idx_usuario_rol_id_rol     ON usuario_rol(id_rol);

-- Tabla: refresh_token
CREATE TABLE IF NOT EXISTS refresh_token (
    id_refresh_token SERIAL PRIMARY KEY,
    id_usuario       INT          NOT NULL,
    token_hash       VARCHAR(255) NOT NULL,
    expires_at       TIMESTAMP    NOT NULL,
    revoked          BOOLEAN      DEFAULT FALSE,
    created_at       TIMESTAMP    DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_refresh_token_usuario FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario) ON DELETE CASCADE
);
CREATE INDEX IF NOT EXISTS idx_refresh_token_id_usuario ON refresh_token(id_usuario);
CREATE INDEX IF NOT EXISTS idx_refresh_token_token_hash ON refresh_token(token_hash);
CREATE INDEX IF NOT EXISTS idx_refresh_token_expires_at ON refresh_token(expires_at);


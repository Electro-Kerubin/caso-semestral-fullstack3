# ── Etapa 1: Compilación ──────────────────────────────────────────────────────
FROM maven:3.9.6-eclipse-temurin-21 AS builder

WORKDIR /app

# Copiamos el pom primero para aprovechar la caché de capas de Docker
COPY pom.xml .
RUN mvn dependency:go-offline -q

# Copiamos el código fuente y compilamos
COPY src ./src
RUN mvn package -DskipTests -q

# ── Etapa 2: Imagen de producción (más liviana) ───────────────────────────────
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

# Copiamos solo el JAR generado
COPY --from=builder /app/target/*.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]


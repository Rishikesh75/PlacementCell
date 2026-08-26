# Backend image only. Build from this folder:
#   docker build -t placementics-backend .
# Run with secrets from .env (never copy .env into the image):
#   docker run --rm -p 8080:8080 --env-file .env placementics-backend

FROM maven:3.9.11-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn -B -q dependency:go-offline

COPY src ./src
RUN mvn -B -q -DskipTests package && \
    cp target/PlacementicsBackend-*.jar /app/app.jar

FROM eclipse-temurin:17-jre-jammy
WORKDIR /app

RUN groupadd --system spring && useradd --system --gid spring spring
COPY --from=build /app/app.jar app.jar
USER spring

EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]

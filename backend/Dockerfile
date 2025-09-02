# backend/Dockerfile
FROM gradle:8.14.3-jdk21 AS build
WORKDIR /src
COPY . .
RUN gradle clean bootJar -x test --no-daemon

FROM eclipse-temurin:21-jre
WORKDIR /app
COPY --from=build /src/build/libs/*.jar app.jar
ENV PORT=8080
EXPOSE 8080
CMD ["sh","-c","java -Dserver.port=${PORT:-8080} -jar /app/app.jar"]

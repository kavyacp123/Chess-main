FROM openjdk:17-jdk-slim AS base

WORKDIR /app

# Copy Maven files
COPY pom.xml .
COPY mvnw .
COPY .mvn .mvn

# Download dependencies
RUN ./mvnw dependency:go-offline -B

# Copy source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Production image
FROM openjdk:17-jre-slim AS runner

WORKDIR /app

# Create non-root user
RUN addgroup --system --gid 1001 spring
RUN adduser --system --uid 1001 spring

# Copy the built jar
COPY --from=base /app/target/*.jar app.jar

USER spring

EXPOSE 8080

ENV JAVA_OPTS="-Xmx512m -Xms256m"

CMD ["java", "-jar", "app.jar"]

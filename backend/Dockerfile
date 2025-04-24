# ===== BUILD STAGE =====
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src

# Copy ONLY the backend project files (for efficient caching)
COPY ./backend/*.sln .
COPY ./backend/*.csproj .
RUN dotnet restore  # Now works because files are in context

# Copy everything else and build
COPY ./backend/. .
RUN dotnet publish -c Release -o /app --no-restore

# ===== RUNTIME STAGE =====
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 5000
ENTRYPOINT ["dotnet", "backend.dll"]
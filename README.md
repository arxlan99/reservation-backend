# Reservation Backend

A NestJS-based reservation system backend with authentication, products, and reservations management.

## Quick Start

### Option 1: Using Docker (Recommended)

```bash
# Start with Docker Compose
docker-compose -f docker-compose.dev.yml up --build

# The API will be available at http://localhost:3000
```

### Option 2: Local Development

```bash
# Install dependencies
pnpm install

# Start PostgreSQL (if not running)
# Make sure PostgreSQL is running on localhost:5432

# Start the development server
pnpm start:dev

# The API will be available at http://localhost:3000
```

## Environment Variables

The following environment variables are configured:

- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: JWT secret key
- `DATABASE_HOST`: PostgreSQL host
- `DATABASE_PORT`: PostgreSQL port (default: 5432)
- `DATABASE_USERNAME`: Database username
- `DATABASE_PASSWORD`: Database password
- `DATABASE_NAME`: Database name

## Available Scripts

- `pnpm start:dev` - Start development server with hot reload
- `pnpm build` - Build the application
- `pnpm start:prod` - Start production server
- `pnpm test` - Run tests
- `pnpm test:e2e` - Run end-to-end tests

## API Documentation

Once the server is running, visit `http://localhost:3000/api` for Swagger documentation.

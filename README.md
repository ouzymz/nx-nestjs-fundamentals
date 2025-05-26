# NestJS Fundamentals Boilerplate

A modern, production-ready NestJS boilerplate built with Nx workspace. This template provides a solid foundation for building scalable and maintainable NestJS applications.

## Features

- **NestJS Framework**: Latest version with best practices
- **Nx Workspace**: Monorepo support with powerful build tools
- **TypeORM**: Database ORM with PostgreSQL support
- **Configuration Management**: Environment-based configuration
- **Docker Support**: Containerized development and deployment
- **Testing**: Jest setup for unit and e2e testing
- **Code Quality**: ESLint and Prettier for consistent code style
- **TypeScript**: Latest version with strict type checking
- **API Documentation**: Swagger/OpenAPI integration

## Prerequisites

- Node.js (v18 or later)
- PostgreSQL
- Docker (optional)

## Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd nestjs-fundamentals-boiler-temple
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp apps/api/.env.example apps/api/.env
```

4. Update the `.env` file with your database credentials and other configurations.

## Development

To start the development server:

```bash
npx nx serve api
```

The API will be available at `http://localhost:3000`.

### API Documentation

The API documentation is available through Swagger UI. Once the development server is running, you can access it at:

```
http://localhost:3000/api
```

The Swagger documentation provides:

- Interactive API documentation
- Request/response schemas
- Authentication requirements
- API testing interface

## Testing

Run unit tests:

```bash
npx nx test api
```

Run e2e tests:

```bash
npx nx e2e api-e2e
```

## Docker Support

Build and run with Docker:

```bash
docker-compose up --build
```

## Project Structure

```
├── apps/
│   ├── api/           # Main NestJS application
│   └── api-e2e/       # End-to-end tests
├── libs/              # Shared libraries  
│   ├── user/          
│   ├── common/             
│   ├── user-rating/          
│   └── database/         
├── docker/           # Docker configuration
```

## Available Scripts

- `npx nx serve api` - Start development server
- `npx nx build api` - Build for production
- `npx nx test api` - Run unit tests
- `npx nx e2e api-e2e` - Run e2e tests
- `npx nx lint api` - Lint the codebase

## Documentation

- [NestJS Documentation](https://docs.nestjs.com/)
- [Nx Documentation](https://nx.dev/)
- [TypeORM Documentation](https://typeorm.io/)
- [Swagger/OpenAPI Documentation](https://docs.nestjs.com/openapi/introduction)

## Contributing

Feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

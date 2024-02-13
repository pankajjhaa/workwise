ARG NODE_VERSION=20.7.0
FROM node:${NODE_VERSION}-slim as base

# Next.js/Prisma app lives here
WORKDIR /app

# Set production environment
ENV NODE_ENV="production"

FROM base as build

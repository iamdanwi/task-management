#!/bin/bash

# Create main directory structure
mkdir -p src/{config,controllers,middleware,models,routes,services,utils,types,validators}

# Create subdirectories for specific features
mkdir -p src/models/{entities,interfaces}
mkdir -p src/services/{email,storage}
mkdir -p src/utils/{decorators,helpers}

# Create test directory structure
mkdir -p tests/{unit,integration,e2e}

# Create necessary base files (touch only creates if they don't exist)
touch src/config/{database.ts,email.ts,storage.ts}
touch src/middleware/{auth.ts,errorHandler.ts,validate.ts}
touch src/utils/logger.ts
touch .env
touch .gitignore
touch jest.config.js

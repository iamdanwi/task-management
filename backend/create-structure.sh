
mkdir -p src/{config,controllers,middleware,models,routes,services,utils,types,validators}

mkdir -p src/models/{entities,interfaces}
mkdir -p src/services/{email,storage}
mkdir -p src/utils/{decorators,helpers}
touch src/config/{database.ts,email.ts,storage.ts}
touch src/middleware/{auth.ts,errorHandler.ts,validate.ts}
touch src/utils/logger.ts
touch .env
touch .gitignore


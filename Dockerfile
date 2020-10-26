FROM node:12.19.0-alpine
WORKDIR /app
COPY ["package.json", "package-lock.json*", "tsconfig.json", "./"]
RUN npm install 
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]
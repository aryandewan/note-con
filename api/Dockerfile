# use an offical node.js runtime as a parent image

FROM node:22-alpine

# set the working directory in the container
WORKDIR /app

# copy package.json and package-lock.json to the container
COPY package*.json .

# install dependencies
RUN npm install

# copy the rest of the application code to the container
COPY . .
RUN npx prisma generate

# expose the port the app runs on
EXPOSE 5001

# define the command to run the application
CMD ["node", "./src/index.js"]
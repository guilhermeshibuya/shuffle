FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# RUN npm install -g expo-cli

COPY src ./
COPY .gitignore ./
COPY App.js ./
COPY PlayerContext.js ./
COPY babel.config.js ./
COPY app.json ./
COPY assets ./

EXPOSE 8081

CMD ["npm", "start"]
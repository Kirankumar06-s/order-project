
FROM node:24-alpine
WORKDIR /app
COPY app.js .
EXPOSE 3003
CMD ["node", "app.js"]

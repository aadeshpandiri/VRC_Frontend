FROM node:14-alpine

RUN mkdir -p /usr/vrcapp
WORKDIR /usr/vrcapp

COPY ./ ./

RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm","start"]
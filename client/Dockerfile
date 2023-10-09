FROM node:16.14.2

WORKDIR /client

COPY package.json .

RUN npm i
# RUN npm install formik --save
# RUN npm install yup --save
# RUN npm install react-router-dom@6

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
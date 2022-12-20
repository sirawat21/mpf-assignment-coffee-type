import express from 'express';
// import messageRouter from "./controller/message.controller";

/* API Config */
const api = express();
const port = 3030;
api.use(express.json());

/* API Router */
api.use('/ratings', () => {});

/* API Listening */
api.listen(port, () => {
   console.log(`API listening on port ${port}`);
});

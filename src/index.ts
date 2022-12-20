import express from 'express';
import controller from "./controller";

/* API Config */
const api = express();
const port = 3000;
api.use(express.json());

/* API Router */
api.use('/', controller);

/* API Listening */
api.listen(port, () => {
   console.log(`API listening on port ${port}`);
});

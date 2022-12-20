import { Request, Response, Router } from 'express';

const router = Router();

/* -------------------- [*] Model [*] -------------------- */
interface RatedCoffeeType {
   id: number,
   coffeeType: string,
   starRating: string,
}
// Model for storing rating of coffee type
const model: RatedCoffeeType[] = [];

/* ------------------ [*] Controllers [*] ------------------ */

// [POST] - Creat a new rating coffee type 
router.post('/ratings', (req: Request, res: Response) => {
   let { coffeeType, starRating } = req.body;
   // Set inital response message
   let responseMessage = { code: 0, message: '' };
   // Validation
   // Regular expression for starRating format
   const regex = /^[1-5]\/[1-5]$/;
   if (coffeeType in req.body && starRating in req.body && regex.test(starRating)) {
      // Valid request
      // Creating a new rated coffee type
      const ratedCoffeeType: RatedCoffeeType = {
         // Set id for an item
         id: (model.length > 0) ? model.slice(-1)[0].id + 1 : 1,
         coffeeType: coffeeType,
         starRating: starRating
      }
      model.push(ratedCoffeeType);
      // Set response message
      responseMessage.code = 201;
      responseMessage.message = 'Created';
      res.status(201).send(JSON.stringify(responseMessage));
   } else {
      // Invalid request
      // Set response message
      responseMessage.code = 400;
      responseMessage.message = 'Baf Request';
   }
});

// // [GET] - Get a message by id
// router.get('/ratings/:coffeeType', (req: Request, res: Response) => {
//    const coffeeType = req.params.coffeeType;
//    res.status(200).send('');
// });

// [GET] - List all rating coffee types 
router.get('/ratings/coffee-types', (req: Request, res: Response) => {
   const resource = model;
   res.status(200).send(resource);
});


// // [GET] - Recommendation
// router.get('/recommendation', (req: Request, res: Response) => {
//    res.status(200).send('');
// });

export default router;
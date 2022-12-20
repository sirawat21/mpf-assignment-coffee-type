import { Request, Response, Router } from 'express';

const router = Router();

/* -------------------- [*] Model [*] -------------------- */
interface RatedCoffeeType {
   coffeeType: string,
   starRating: string
}
// Model for storing rating of coffee type
const model: RatedCoffeeType[] = [];

/* ------------------ [*] Controllers [*] ------------------ */

// [POST] - Creat a new rating coffee type 
router.post('/ratings', (req: Request, res: Response): void => {
   let { coffeeType, starRating } = req.body;
   // Set inital response
   let responseMessage = { code: 400, message: 'Bad Request' };
   // Validating the request
   if ('coffeeType' in req.body && 'starRating' in req.body) {
      // Regular expression for starRating format
      const regex = /^[1-5]\/[1-5]$/;
      if (regex.test(starRating)) {
         // Valid request; then creating a new rated coffee type
         const ratedCoffeeType: RatedCoffeeType = {
            coffeeType: coffeeType,
            starRating: starRating
         }
         model.push(ratedCoffeeType);
         // Set response message
         responseMessage.code = 201;
         responseMessage.message = 'Created';
      }
   }
   res.status(responseMessage.code).send(responseMessage);
});

// // [GET] - Get a message by id
// router.get('/ratings/:coffeeType', (req: Request, res: Response) => {
//    const coffeeType = req.params.coffeeType;
//    res.status(200).send('');
// });

// [GET] - List all rating coffee types 
router.get('/ratings/coffee-types', (req: Request, res: Response) => {
   // Get unique object of RatedCoffeeType
   const uniqueModelOfRatedCoffeeType = [... new Set(model)];

   res.status(200).send(uniqueModelOfRatedCoffeeType);
});


// // [GET] - Recommendation
// router.get('/recommendation', (req: Request, res: Response) => {
//    res.status(200).send('');
// });

export default router;
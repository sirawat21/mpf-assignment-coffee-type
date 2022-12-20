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
   let responseMessage = { code: 400, message: '400 Bad Request' };
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
         responseMessage.message = '201 Created';
      }
   }
   res.status(responseMessage.code).send(responseMessage);
});

// [GET] - Get a message by coffee type
router.get('/ratings', (req: Request, res: Response) => {
   // Get query param of coffeeType
   const coffeeType = req.query.coffeeType
   // Set inital response
   let responseMessage = { code: 400, message: '' };
   // Validating the request
   if (model.length > 0) {
      // Get previous rated coffee type; access from the tail of array model
      const previousRatedCoffeeType = model.slice(-1)[0];
      // Check the matched value of coffee type between model and query param
      if (coffeeType === previousRatedCoffeeType.coffeeType) {
         // Set response message
         responseMessage.code = 200;
         responseMessage.message = '';
      }
   } else {
      // When query param is not found from model
      // Set spone message detail for not rating yet; coffeeType is from query param
      const detailResponseMessage = { coffeeType: `${coffeeType} is not rated yet coffee type` };
      responseMessage.message = JSON.stringify(detailResponseMessage);
   }
   res.status(responseMessage.code).send(responseMessage.message);
});

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
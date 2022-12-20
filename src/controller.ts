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

// [POST] - Endpoint to rate coffee type
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

// [GET] - Endpoint to list rated coffee types
router.get('/ratings/coffee-types', (req: Request, res: Response) => {
   // Get unique object of RatedCoffeeType
   const uniqueModelOfRatedCoffeeType = [... new Set(model)];

   res.status(200).send(uniqueModelOfRatedCoffeeType);
});

// [GET] - Endpoint to obtain rating of previously rated coffee type
router.get('/ratings', (req: Request, res: Response) => {
   // Get query param of coffeeType
   const coffeeTypeQueryParam = req.query.coffeeType
   // Set inital response
   let responseMessage = { code: 400, message: '' };
   // Check is array empty
   if (model.length > 0) {
      // Search for a coffeeType taht match with query param; reverse array to get the lastest obj
      const previousRatedCoffeeType = model.reverse().find((ratedCoffeeType) => ratedCoffeeType.coffeeType === coffeeTypeQueryParam);
      // When query param is found
      if (previousRatedCoffeeType) {
         // Set response message
         responseMessage.code = 200;
         // Set spone message detail for not rating yet; coffeeType is from query param
         const detailResponseMessage = {...previousRatedCoffeeType};
         responseMessage.message = JSON.stringify(detailResponseMessage);
      }
   } else {
      // When query param is not found from model
      // Set spone message detail for not rating yet; coffeeType is from query param
      const detailResponseMessage = { coffeeType: `${coffeeTypeQueryParam} is not rated yet coffee type` };
      responseMessage.message = JSON.stringify(detailResponseMessage);
   }
   res.status(responseMessage.code).send(responseMessage.message);
});



// // [GET] Endpoint to recommend a coffee type for today
// router.get('/recommendation', (req: Request, res: Response) => {
//    res.status(200).send('');
// });

export default router;
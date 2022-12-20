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

/* [POST] TASK 1  - Endpoint to rate coffee type */
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

/* [GET] TASK 2  - Endpoint to list rated coffee types */
router.get('/ratings/coffee-types', (req: Request, res: Response) => {
   // Get unique object of RatedCoffeeType
   const uniqueModelOfRatedCoffeeType = [... new Set(model)]; // fix

   res.status(200).send(uniqueModelOfRatedCoffeeType);
});

/* [GET] TASK 3  - Endpoint to obtain rating of previously rated coffee type */
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
         const detailResponseMessage = { ...previousRatedCoffeeType };
         responseMessage.message = JSON.stringify(detailResponseMessage);
      }
   } else {
      // When query param is not found from model
      // Set spone message detail for not rating yet; coffeeType is from query param
      const detailResponseMessage = { coffeeType: `${coffeeTypeQueryParam} is not rated yet coffee type.` };
      responseMessage.message = JSON.stringify(detailResponseMessage);
   }
   res.status(responseMessage.code).send(responseMessage.message);
});


/* [GET] TASK 4 - Endpoint to recommend a coffee type for today */
router.get('/recommendation', (req: Request, res: Response) => {
   // Set inital response
   let responseMessage = { code: 200, message: '' };

   // Get the most recent coffee type with 4+ star
   const recentCoffeeTypeWithAcceptedRate = model.reverse().map((coffeeTypeObj) => {
      // Make copy coffee type object for yielding
      const yieldObj = coffeeTypeObj;
      // Check rating must be in between 4 to 5 star
      const [min, max] = coffeeTypeObj.starRating.split('/');
      // Yield coffee type that has 4 star up
      if (Number(min) > 3) return yieldObj;
   });
   // Get the recommend lists; by finding the most star for each coffee type
   const recommend = recentCoffeeTypeWithAcceptedRate.map((coffeeTypeObj) => {
      // Set a list note that obj alread added for recommening
      const recommendCoffeeTypeList: RatedCoffeeType[] = [];

   });


   if (recommend.length > 0) {

   } else {
      // When doesn't have any recommendation
      const detailResponseMessage = { message: 'NO_RECOMMENDATIONS_AVAILABLE' };
      responseMessage.message = JSON.stringify(detailResponseMessage);
   }
   res.status(responseMessage.code).send(responseMessage.message);
});

export default router;

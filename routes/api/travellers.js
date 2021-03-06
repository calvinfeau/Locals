// We require the router
const router = require("express").Router();
// We require the object inside of index.js (we have to specifiy which controller we want to use by using the property name)
const controller = require("../../controller");

// Setup the routes for the  api's to hit
router
  .route("/")
  .get(controller.travellerController.findAll)
  .post(controller.travellerController.create);

router
  .route("/:id")
  .get(controller.travellerController.findById)
  .put(controller.travellerController.update)
  .delete(controller.travellerController.delete);

router
  .route("/removeBooking/:id")
  .post(controller.travellerController.deleteBooking);

router
  .route("/login")
  .post(controller.travellerController.findByUsernameAndPassword);

router.route("/booking/:id").post(controller.travellerController.addBooking);

// We export the entire document
module.exports = router;

const express= require('express');
const tourController = require('./../controller/tourController');

const router = express.Router();

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);

router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);
//router.param('id',tourController.checkID);

router
.route('/')
.get(tourController.getAllTours)
.post(tourController.createTour);

//get specific tours 

router
.route('/:id')
.get(tourController.getTour)
.patch(tourController.updateTour)
.delete(tourController.deleteTour);

module.exports = router
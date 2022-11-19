const fs = require('fs');

const tours = JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );

  exports.getAllTours = (req, res) => {
    res.status(200).json({
      status: 'succcess',
      requestedAt: req.requestTime,
      result: tours.length,
      data: {
        tours,
      },
    });
  };
  
 exports.getTour = (req, res) => {
    console.log(req.params);
    const id = req.params.id * 1;
    const tour = tours.find((el) => el.id === id);
  
    if (!tour) {
      return res.status(404).json({
        status: 'error',
        message: 'No such tour',
      });
    }
  
    res.status(200).json({
      status: 'succcess',
      result: tours.length,
      data: {
        tour,
      },
    });
  };
  
  exports.createTour = (req, res) => {
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({ id: newId }, req.body);
    tours.push(newTour);
    fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
        res.status(201).json({
          status: 'succcess',
          data: {
            tour: newTour,
          },
        });
      }
    );
  };
  
  exports.updateTour = (req, res) => {
    const id = req.params.id * 1;
  
    if (id > tours.length - 1) {
      return res.status(404).json({
        status: 'error',
        message: 'No such tour',
      });
    }
  
    res.status(200).json({
      status: 'succcess',
      data: {
        tour: '<update tour here>',
      },
    });
  };
  
  exports.deleteTour = (req, res) => {
    const id = req.params.id * 1;
  
    if (id > tours.length - 1) {
      return res.status(404).json({
        status: 'error',
        message: 'No such tour',
      });
    }
  
    res.status(204).json({
      status: 'succcess',
      data: null,
    });
  };
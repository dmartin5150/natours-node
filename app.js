const express = require('express');
const fs = require('fs');

const app = express();
app.use(express.json());

const port = 3000;

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side!', app: 'natours' });
// });

// app.post('/', (req, res) => {
//     res.send('You can pose from this URL');
// }
// );

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'succcess',
    result: tours.length,
    data: {
      tours
    },
  });
});


app.get('/api/v1/tours/:id', (req, res) => {
    console.log(req.params);
    const id = req.params.id*1;
    const tour = tours.find(el=> el.id === id);

    if(!tour) {
    // if (id > tours.length -1) {
        return res.status(404).json({
            status: 'error',
            message: 'No such tour',
        });
    }
 

    res.status(200).json({
      status: 'succcess',
      result: tours.length,
      data: {
        tour
      },
    });
  });


app.post('/api/v1/tours', (req, res) => {
    const newId = tours[tours.length - 1].id +1;
    const newTour = Object.assign({id:newId}, req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, 
    JSON.stringify(tours),
     err => {
        res.status(201).json({
            status:'succcess',
            data: {
                tour:newTour
            }
        });
    });

});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});

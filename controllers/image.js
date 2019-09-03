const Clarifai = require('clarifai');

const app = new Clarifai.App({
  apiKey: '8f35d1025a0c423fb27f64a273e26798'
});

const handleApiCall = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(400).json({'message': 'Invalid image Url',
                                      'status': {'code': '400'}}));
}

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
  .increment('entries', 1)
  .returning('entries')
  .then(entries => {
    res.json(entries[0]);;
  })
  .catch(err => res.status(400).json('Unable to get entries'))
};

module.exports = {
  handleImage: handleImage,
  handleApiCall: handleApiCall
}


// const handleApiCall = (req, res) => {
//   app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
//   .then(data => {
//     res.json(data);
//   })
//   .catch(err => res.status(400).json('unable to work with API'));
// }
//
// const handleImage = (req, res, db) => {
//   const { id } = req.body;
//   db('users').where('id', '=', id)
//   .increment('entries', 1)
//   .returning('entries')
//   .then(entries => {
//     res.json(entries[0]);;
//   })
//   .catch(err => res.status(400).json('Unable to get entries'))
// };

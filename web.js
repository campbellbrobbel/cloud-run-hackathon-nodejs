const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Let the battle begin!');
});

const MAX_SEARCH_DEPTH = 5
const MY_URL = 'https://cloud-run-hackathon-nodejs-u6gyykqrha-uc.a.run.app'
app.post('/', function (req, res) {
  console.log(req.body);
  const {arena} = req.body
  const moves = ['F', 'T', 'L', 'R'];

  // TODO add your implementation here to replace the random response

  const moveValues = moves.map((m) => {
    return calculateValueForMove(m, arena)
  })

  let bestMove = -1
  let bestValue = null
  moveValues.forEach((m, index) => {
    if(!bestValue) {
      bestValue = m
      bestMove = index
    } else {
      if(bestValue < m) {
        bestValue = m
        bestMove = index
      }
    }
  })
  res.send(moves[bestMove]);
});

app.listen(process.env.PORT || 8080);


const calculateValueForMove = (move, arena) => {
  let {dims, state} = arena
  let myState = state[MY_URL]
  return 100
}

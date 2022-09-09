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

const _ = require('lodash');

const calculateValueForMove = (move, arena) => {
  let {dims, state} = arena
  let newState = _.cloneDeep(state)
  applyMove(newState, move)
  let player = state[MY_URL]
  let nearestEnemy = null
  let nearestEnemyDistance = null
  let numberOfHitEnemies = 0
  let enemyDetails = {

  }
  for(let enemy in newState) {
    if(enemy !== MY_URL) {
      let enemyDistance = calculateDistanceBetweenPlayers(player, newState[enemy])
      let enemyDirection = calculateDirectionToEnemy(player, newState[enemy])
      if(!nearestEnemyDistance || nearestEnemyDistance > enemyDistance) {
        nearestEnemyDistance = enemyDistance
      }
      if(newState[enemy].wasHit) {
        numberOfHitEnemies++
      }
    }
  }

  console.log(`Nearest enemy distance: ${nearestEnemyDistance}`)
  console.log(`Number of hit enemy: ${numberOfHitEnemies}`)
  return (-nearestEnemyDistance ) + (numberOfHitEnemies * 10)
}


const calculateDistanceBetweenPlayers = (player, enemy) => {
  let {x:playerX, y:playerY } = player
  let {x: enemyX, y: enemyY } = enemy
  return Math.abs(playerX - enemyX) + Math.abs(playerY - enemyY)
}

const calculateDirectionToEnemy = (player, enemy) => {
  let {x:playerX, y:playerY } = player
  let {x: enemyX, y: enemyY } = enemy
  let verticalDirection = null
  if(playerY < enemyY) {
    verticalDirection = ' N'
  } else if(playerY > enemyY) {
    verticalDirection = ' S'
  }
  let horizontalDirection = playerX < enemyX ? 'E' : 'W'
  if(playerX < enemyX) {
    horizontalDirection = 'E'
  } else if(playerX > enemyX) {
    horizontalDirection = 'W'
  }

  let directionString = ''
  if(verticalDirection)
    directionString += verticalDirection
  if(horizontalDirection)
    directionString += horizontalDirection

  return directionString

}

const applyMove = (state, move) => {
  let player = state[MY_URL]

  switch(move) {
    case 'F':
      let x = 0
      let y = 0
      if(player.direction === Directions.N)
        y += 1
      else if(player.direction === Directions.S)
        y -= 1
      else if(player.direction === Directions.E)
        x += 1
      else if(player.direction === Directions.W)
        x -= 1
      state[MY_URL].x += x
      state[MY_URL].y += y
      break
    case 'T':
      // if(player.direction === Directions.N)
      //   state[MY_URL].direction = Directions.W
      // else if(player.direction === Directions.W)
      //   state[MY_URL].direction = Directions.S
      // else if(player.direction === Directions.S)
      //   state[MY_URL].direction = Directions.E
      // else if(player.direction === Directions.E)
      //   state[MY_URL].direction = Directions.N
      break
    case 'L':
      if(player.direction === Directions.N)
        state[MY_URL].direction = Directions.W
      else if(player.direction === Directions.W)
        state[MY_URL].direction = Directions.S
      else if(player.direction === Directions.S)
        state[MY_URL].direction = Directions.E
      else if(player.direction === Directions.E)
        state[MY_URL].direction = Directions.N
      break
    case 'R':
      if(player.direction === Directions.N)
        state[MY_URL].direction = Directions.E
      else if(player.direction === Directions.W)
        state[MY_URL].direction = Directions.N
      else if(player.direction === Directions.S)
        state[MY_URL].direction = Directions.W
      else if(player.direction === Directions.E)
        state[MY_URL].direction = Directions.S
      break
  }
}

const Directions = {
  N: 'N',
  S: 'S',
  E: 'E',
  W: 'W',
  NW: 'NW',
  NE: 'NE',
  SW: 'SW',
  SE: 'SE'
}

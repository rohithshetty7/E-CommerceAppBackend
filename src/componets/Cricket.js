/*
Cricket
Cricket is a PC game which is similar to real cricket but has little different rules
There will be N number of players , Y number of overs, here one over means each player will hit one ball each let's say if you have 5 players one over will have 5 balls.
When a player hit a ball, that player will score some random number.
There will be 3 teams playing with the same number of players which team has the highest random number wins that over, similarly second highest will get second place
And since it's a game, team needs to awarded
1st place will get, 10000rs
2nd place will get, 5000rs

3rd place will get, 500rs

Question:

Find who is the winner and how much money they have.
Ex :

Number of players = 3

Number of overs = 2

1st over
P1 = 40, P2= 70, P3 = 100 — >P3 wins and has 10000 rs P2 second place and has 5000 P1 has 500


2nd Over

P1 = 200, P2= 100, P3= 50 —> P1 wins and has 10500 , P2 second place and has 10000rs, P3 3rd place and has 10500


Final P1 and P3 has 10500, P2 has 10000 winners is P1 and P3
*/

// set the game parameters
const numPlayers = 5;
const numOvers = 4;

// initialize the scores for each team
const teamScores = [0, 0, 0];

// play the game for each over
for (let i = 1; i <= numOvers; i++) {
  // initialize the scores for each player
  const playerScores = Array(numPlayers).fill(0);

  // generate a random score for each player
  for (let j = 0; j < numPlayers; j++) {
    playerScores[j] = Math.floor(Math.random() * 100) + 1;
  }

  // sort the scores in descending order
  playerScores.sort((a, b) => b - a);

  // award the players based on their positions
  teamScores[0] += playerScores[0];
  teamScores[1] += playerScores[1];
  teamScores[2] += playerScores[2];

  // award the prize money for the current over
  if (playerScores[0] === teamScores[0]) {
    teamScores[0] += 10000;
  } else if (playerScores[0] === teamScores[1]) {
    teamScores[1] += 10000;
  } else {
    teamScores[2] += 10000;
  }
  if (playerScores[1] === teamScores[0]) {
    teamScores[0] += 5000;
  } else if (playerScores[1] === teamScores[1]) {
    teamScores[1] += 5000;
  } else {
    teamScores[2] += 5000;
  }
  if (playerScores[2] === teamScores[0]) {
    teamScores[0] += 500;
  } else if (playerScores[2] === teamScores[1]) {
    teamScores[1] += 500;
  } else {
    teamScores[2] += 500;
  }
}

// determine the winner and prize money distribution
let maxScore = 0;
let winners = [];
for (let i = 0; i < teamScores.length; i++) {
  if (teamScores[i] > maxScore) {
    maxScore = teamScores[i];
    winners = [i + 1];
  } else if (teamScores[i] === maxScore) {
    winners.push(i + 1);
  }
}

// display the results
console.log(`Team ${winners.join(" and ")} win with a score of ${maxScore}.`);
console.log(`Team 1 wins Rs.${teamScores[0]}`);
console.log(`Team 2 wins Rs.${teamScores[1]}`);
console.log(`Team 3 wins Rs.${teamScores[2]}`);

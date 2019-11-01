import React, { Component } from "react";
import {
  Segment,
  Grid,
  Card,
  Message,
  Header,
  Button,
  Icon
} from "semantic-ui-react";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOnProgress: false,
      timeLeft: 5,
      computersThrow: -1,
      usersThrow: -1,
      userPaperIcon: "hand paper outline",
      userRockIcon: "hand rock outline",
      userScissorsIcon: "hand scissors outline",
      computerPaperIcon: "hand paper outline",
      computeRrockIcon: "hand rock outline",
      computerScissorsIcon: "hand scissors outline",
      userScore: 0,
      computerScore: 0,
      winner: ""
    };
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    console.log(
      "Component will updated: ",
      nextState.gameOnProgress + " - " + nextState.timeLeft
    );
    if (this.state.timeLeft === 1 && nextState.timeLeft === 0) {
      if (nextState.gameOnProgress) {
        console.log(
          "Component will updated in cond: ",
          nextState.gameOnProgress + " - " + nextState.timeLeft
        );
        let randomNum = Math.floor(Math.random() * 3);

        // Computer throwing alogrithm
        this.computerThrowingAlgorithm(randomNum);
      }
    }
  }

  handleStart = () => {
    // Reset state
    this.setState({
      gameOnProgress: true,
      computersThrow: -1,
      usersThrow: -1,
      userPaperIcon: "hand paper outline",
      userRockIcon: "hand rock outline",
      userScissorsIcon: "hand scissors outline",
      computerPaperIcon: "hand paper outline",
      computeRrockIcon: "hand rock outline",
      computerScissorsIcon: "hand scissors outline",
      winner: ""
    });

    // Countdown
    this.countdownTimeLeft();
  };

  handleReset = () => {
    const { gameOnProgress } = this.state;

    if (!gameOnProgress) {
      // Reset state
      this.setState({
        gameOnProgress: false,
        timeLeft: 5,
        computersThrow: -1,
        usersThrow: -1,
        userPaperIcon: "hand paper outline",
        userRockIcon: "hand rock outline",
        userScissorsIcon: "hand scissors outline",
        computerPaperIcon: "hand paper outline",
        computeRrockIcon: "hand rock outline",
        computerScissorsIcon: "hand scissors outline",
        userScore: 0,
        computerScore: 0,
        winner: ""
      });
    }
  };

  handleUserThrow = (throwedNum, event) => {
    console.log("User's throw: ", throwedNum);

    if (throwedNum === 0) {
      this.setState({
        userPaperIcon: "hand paper",
        usersThrow: throwedNum,
        gameOnProgress: false
      });
    } else if (throwedNum === 1) {
      this.setState({
        userRockIcon: "hand rock",
        usersThrow: throwedNum,
        gameOnProgress: false
      });
    } else if (throwedNum === 2) {
      this.setState({
        userScissorsIcon: "hand scissors",
        usersThrow: throwedNum,
        gameOnProgress: false
      });
    }

    // If user throws before 5 sec is up, of course the computre should know what the winning throw shuold be
    const { timeLeft } = this.state;

    if (timeLeft !== 0) {
      if (throwedNum === 0) {
        this.setState({
          computerScissorsIcon: "hand scissors",
          computersThrow: 2,
          timeLeft: 0,
          gameOnProgress: false
        });
      } else if (throwedNum === 1) {
        this.setState({
          computerPaperIcon: "hand paper",
          computersThrow: 0,
          timeLeft: 0,
          gameOnProgress: false
        });
      } else if (throwedNum === 2) {
        this.setState({
          computeRrockIcon: "hand rock",
          computersThrow: 1,
          timeLeft: 0,
          gameOnProgress: false
        });
      }
    }
  };

  countdownTimeLeft = () => {
    const self = this;

    let timeLeft = 5;
    const { gameOnProgress } = self.state;

    let timeLeftCounter = setInterval(function() {
      // Decrement time left and set progress to true
      self.setState({
        timeLeft: (timeLeft -= 1)
      });

      const { gameOnProgress } = self.state;

      // Continue deceiving if the game is still on
      //if (timeLeft > 1 && gameOnProgress) {
      //  self.computerDeceivingAlgorithm(timeLeft);
      //}

      if (timeLeft < 0 || !gameOnProgress) {
        // Clear interval
        clearInterval(timeLeftCounter);

        // Reset time left and game state
        self.setState({
          timeLeft: 5,
          gameOnProgress: false
        });

        // Calculate result
        self.calculateResultAlgorithm();
      }
    }, 1000);
  };

  computerThrowingAlgorithm = randomNum => {
    console.log("Computers' random: ", randomNum);
    if (randomNum === 0) {
      this.setState({
        computerPaperIcon: "hand paper",
        computersThrow: randomNum
      });
    } else if (randomNum === 1) {
      this.setState({
        computeRrockIcon: "hand rock",
        computersThrow: randomNum
      });
    } else if (randomNum === 2) {
      this.setState({
        computerScissorsIcon: "hand scissors",
        computersThrow: randomNum
      });
    }
  };

  // Deceive user by flash throwing
  computerDeceivingAlgorithm = randomNum => {
    if (randomNum % 2 === 1) {
      this.setState({
        computerPaperIcon: "hand paper",
        computeRrockIcon: "hand rock",
        computerScissorsIcon: "hand scissors"
      });
    } else if (randomNum % 2 === 0) {
      this.setState({
        computerPaperIcon: "hand paper outline",
        computeRrockIcon: "hand rock outline",
        computerScissorsIcon: "hand scissors outline"
      });
    }
  };

  calculateResultAlgorithm = () => {
    const { computersThrow, usersThrow, userScore, computerScore } = this.state;

    let userScoreUpdated = Object.assign(userScore);
    let computerScoreUpdated = Object.assign(computerScore);

    if (computersThrow === 0 && usersThrow === 1) {
      this.setState({
        winner: "computer",
        computerScore: (computerScoreUpdated += 1)
      });
    } else if (computersThrow === 1 && usersThrow === 2) {
      this.setState({
        winner: "computer",
        computerScore: (computerScoreUpdated += 1)
      });
    } else if (computersThrow === 2 && usersThrow === 0) {
      this.setState({
        winner: "computer",
        computerScore: (computerScoreUpdated += 1)
      });
    } else if (usersThrow === -1) {
      this.setState({
        winner: "computer",
        computerScore: (computerScoreUpdated += 1)
      });
    } else if (usersThrow === -1 && computersThrow === -1) {
      this.setState({
        winner: "draw"
      });
    } else if (computersThrow === usersThrow) {
      this.setState({
        winner: "draw"
      });
    } else {
      this.setState({
        winner: "user",
        userScore: (userScoreUpdated += 1)
      });
    }
    console.log("----------------------------------");
  };

  render() {
    const {
      timeLeft,
      gameOnProgress,
      userPaperIcon,
      userRockIcon,
      userScissorsIcon,
      computerPaperIcon,
      computeRrockIcon,
      computerScissorsIcon,
      userScore,
      computerScore,
      winner
    } = this.state;

    // Update header info conditionally
    const TimeLeftWinnderHeader = () => {
      if (winner === "") {
        return (
          <Header
            as="h1"
            color={timeLeft < 1 ? "red" : "green"}
            textAlign="center"
          >
            <Header.Content>{timeLeft}</Header.Content>
          </Header>
        );
      } else if (winner === "user") {
        return (
          <Header as="h1" color="green" textAlign="center">
            <Header.Content>You have won!</Header.Content>
          </Header>
        );
      } else if (winner === "computer") {
        return (
          <Header as="h1" color="red" textAlign="center">
            <Header.Content>You have lost</Header.Content>
          </Header>
        );
      } else if (winner === "draw") {
        return (
          <Header as="h1" color="blue" textAlign="center">
            <Header.Content>It's a draw</Header.Content>
          </Header>
        );
      }
    };

    return (
      <Segment vertical className="game">
        <Grid.Row>
          <Grid columns={1} centered className="instructions">
            <Grid.Column className="button-info" textAlign="center">
              <Message info>
                <Message.Header as="h2" style={{ letterSpacing: "1px" }}>
                  Clicking Start button to play. Throw your supposedly winner
                  hand shape from "You" quadrant SIMULTANEOUSLY when the
                  countdown hits 0.
                </Message.Header>
                <Message.Header as="h1" style={{ letterSpacing: "1px" }}>
                  Good luck!
                </Message.Header>
                {/* <p>Did you know it's been a while?</p> */}
              </Message>
              <Segment padded basic vertical className="actions">
                <Button
                  size="huge"
                  color="green"
                  disabled={gameOnProgress}
                  onClick={this.handleStart}
                >
                  Play
                </Button>
                <TimeLeftWinnderHeader />
                <Button
                  size="huge"
                  basic
                  color="grey"
                  disabled={gameOnProgress}
                  onClick={this.handleReset}
                >
                  Reset game
                </Button>
              </Segment>
            </Grid.Column>
          </Grid>
        </Grid.Row>
        <Grid.Row>
          <Grid columns={2} centered className="players">
            <Grid.Column className="user">
              <Card>
                <Card.Content>
                  <Card.Header>You</Card.Header>
                  <div className="score">
                    <Header as="h2" style={{ marginBottom: "0" }}>
                      <Header.Content>{userScore}</Header.Content>
                    </Header>
                    <Card.Meta>Score</Card.Meta>
                  </div>
                </Card.Content>
                <Card.Content>
                  <Card.Group itemsPerRow={1} textAlign="center">
                    <Segment padded basic vertical>
                      <Icon
                        color="teal"
                        disabled={!gameOnProgress}
                        name={userPaperIcon}
                        size="huge"
                        onClick={this.handleUserThrow.bind(this, 0)}
                      />
                    </Segment>
                    <Segment padded basic vertical>
                      <Icon
                        color="teal"
                        disabled={!gameOnProgress}
                        name={userRockIcon}
                        size="huge"
                        onClick={this.handleUserThrow.bind(this, 1)}
                      />
                    </Segment>
                    <Segment padded basic vertical>
                      <Icon
                        color="teal"
                        disabled={!gameOnProgress}
                        name={userScissorsIcon}
                        size="huge"
                        onClick={this.handleUserThrow.bind(this, 2)}
                      />
                    </Segment>
                  </Card.Group>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column className="computer">
              <Card>
                <Card.Content>
                  <Card.Header>Computer</Card.Header>
                  <div className="score">
                    <Header as="h2" style={{ marginBottom: "0" }}>
                      <Header.Content>{computerScore}</Header.Content>
                    </Header>
                    <Card.Meta>Score</Card.Meta>
                  </div>
                </Card.Content>
                <Card.Content>
                  <Card.Group itemsPerRow={1} textAlign="center">
                    <Segment padded basic vertical>
                      <Icon color="teal" name={computerPaperIcon} size="huge" />
                    </Segment>
                    <Segment padded basic vertical>
                      <Icon color="teal" name={computeRrockIcon} size="huge" />
                    </Segment>
                    <Segment padded basic vertical>
                      <Icon
                        color="teal"
                        name={computerScissorsIcon}
                        size="huge"
                      />
                    </Segment>
                  </Card.Group>
                </Card.Content>
              </Card>
            </Grid.Column>
          </Grid>
        </Grid.Row>
      </Segment>
    );
  }
}

export default Game;

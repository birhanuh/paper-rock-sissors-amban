import React, { PureComponent } from "react";
import {
  Segment,
  Grid,
  Card,
  Message,
  Header,
  Button,
  Icon
} from "semantic-ui-react";

class Game extends PureComponent {
  state = {
    gameOnProgress: false,
    timeLeft: 5,
    computerThrew: -1,
    userThrew: -1,
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

  handleStart = () => {
    // Reset state
    this.setState({
      computerThrew: -1,
      userThrew: -1,
      userPaperIcon: "hand paper outline",
      userRockIcon: "hand rock outline",
      userScissorsIcon: "hand scissors outline",
      computerPaperIcon: "hand paper outline",
      computeRrockIcon: "hand rock outline",
      computerScissorsIcon: "hand scissors outline",
      winner: ""
    });

    // Countdown
    this.timeLeftCountdown();

    // Computer starts playing
    //this.computerPlayingAlgorith();
  };

  handleReset = () => {
    // Reset state
    this.setState({
      gameOnProgress: false,
      timeLeft: 5,
      computerThrew: -1,
      userThrew: -1,
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
  };

  timeLeftCountdown = () => {
    const self = this;

    const { timeLeft } = this.state;

    let timeLeftUpdated = Object.assign(timeLeft);

    let randomNum = Math.floor(Math.random() * 3);

    let timeLeftCounter = setInterval(function() {
      // Decrement time left and set progress to true
      self.setState({
        timeLeft: (timeLeftUpdated -= 1),
        gameOnProgress: true
      });

      // Computer throwing alogrithm
      self.computerThrowingingAlgorithm(timeLeftUpdated, randomNum);

      if (timeLeftUpdated < 0) {
        // Clear interval
        clearInterval(timeLeftCounter);

        // Reset time left and game state
        self.setState({
          timeLeft: 5,
          gameOnProgress: false
        });

        // Calculate result
        self.resultAlgorithm();
      }
    }, 1000);
  };

  handleUserThrow = (throwedNum, event) => {
    console.log("User threw: ", throwedNum);

    if (throwedNum === 0) {
      this.setState({
        userPaperIcon: "hand paper",
        userThrew: throwedNum
      });
    } else if (throwedNum === 1) {
      this.setState({
        userRockIcon: "hand rock",
        userThrew: throwedNum
      });
    } else if (throwedNum === 2) {
      this.setState({
        userScissorsIcon: "hand scissors",
        userThrew: throwedNum
      });
    }
  };

  computerThrowingingAlgorithm = (timeLeft, randomNum) => {
    if (timeLeft === 0) {
      if (randomNum === 0) {
        this.setState({
          computerPaperIcon: "hand paper",
          computerThrew: randomNum
        });
      } else if (randomNum === 1) {
        this.setState({
          computeRrockIcon: "hand rock",
          computerThrew: randomNum
        });
      } else if (randomNum === 2) {
        this.setState({
          computerScissorsIcon: "hand scissors",
          computerThrew: randomNum
        });
      }
    }
  };

  resultAlgorithm = () => {
    const { computerThrew, userThrew, userScore, computerScore } = this.state;

    let userScoreUpdated = Object.assign(userScore);
    let computerScoreUpdated = Object.assign(computerScore);

    if (computerThrew === 0 && userThrew === 1) {
      this.setState({
        winner: "computer",
        computerScore: (computerScoreUpdated += 1)
      });
    } else if (computerThrew === 1 && userThrew === 2) {
      this.setState({
        winner: "computer",
        computerScore: (computerScoreUpdated += 1)
      });
    } else if (computerThrew === 2 && userThrew === 0) {
      this.setState({
        winner: "computer",
        computerScore: (computerScoreUpdated += 1)
      });
    } else if (userThrew === -1) {
      this.setState({
        winner: "computer",
        computerScore: (computerScoreUpdated += 1)
      });
    } else if (computerThrew === userThrew) {
      this.setState({
        winner: "draw"
      });
    } else {
      this.setState({
        winner: "user",
        userScore: (userScoreUpdated += 1)
      });
    }
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
                  Clicking Start button to play. Throw your hand desired hand
                  from "You" section simultaneously when the countdown hits 0.
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
                        color="grey"
                        disabled={!gameOnProgress}
                        name={userPaperIcon}
                        size="huge"
                        onClick={this.handleUserThrow.bind(this, 0)}
                      />
                    </Segment>
                    <Segment padded basic vertical>
                      <Icon
                        color="grey"
                        disabled={!gameOnProgress}
                        name={userRockIcon}
                        size="huge"
                        onClick={this.handleUserThrow.bind(this, 1)}
                      />
                    </Segment>
                    <Segment padded basic vertical>
                      <Icon
                        color="grey"
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
                      <Icon color="grey" name={computerPaperIcon} size="huge" />
                    </Segment>
                    <Segment padded basic vertical>
                      <Icon color="grey" name={computeRrockIcon} size="huge" />
                    </Segment>
                    <Segment padded basic vertical>
                      <Icon
                        color="grey"
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

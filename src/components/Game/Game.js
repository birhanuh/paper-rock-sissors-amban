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
    timeLeft: 0,
    computerThrew: -1,
    userThrew: -1,
    userPaperIcon: "hand paper outline",
    userRockIcon: "hand rock outline",
    userScissorsIcon: "hand scissors outline",
    computerPaperIcon: "hand paper outline",
    computeRrockIcon: "hand rock outline",
    computerScissorsIcon: "hand scissors outline"
  };

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    if (nextState.userThrew !== -1) {
      console.log("Will update: ", nextState.userThrew);
    }
    // if (
    //   nextState.gameOnProgress &&
    //   nextState.selections.computer &&
    //   nextState.timeLeft === 0
    // ) {
    //   // Computer starts playing
    //   this.computerPlayingAlgorith();
    // }
  }

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
      computerScissorsIcon: "hand scissors outline"
    });

    // Countdown
    this.timeLeftCountdown();

    // Computer starts playing
    //this.computerPlayingAlgorith();
  };

  timeLeftCountdown = () => {
    const self = this;

    let timeLeft = 5;

    self.setState({
      timeLeft
    });

    let randomNum = Math.floor(Math.random() * 3);

    let timeLeftCounter = setInterval(function() {
      // Decrement time left and set progress to true
      self.setState({
        timeLeft: (timeLeft -= 1),
        gameOnProgress: true
      });

      // Computer throwing alogrithm
      self.computerThrowingingAlgorithm(timeLeft, randomNum);

      if (timeLeft < 1) {
        // Clear interval
        clearInterval(timeLeftCounter);

        // Reset time left and game state
        self.setState({
          gameOnProgress: false
        });
      }
    }, 1000);
  };

  handleUserThrow = (throwedNum, event) => {
    console.log("Handle user throw", throwedNum);

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
    const self = this;

    console.log("XXX: ", self.state);
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
      computerScissorsIcon
    } = this.state;

    return (
      <Segment vertical className="game">
        <Grid.Row>
          <Grid columns={1} centered className="instructions">
            <Grid.Column className="button-info" textAlign="center">
              <Message info>
                <Message.Header>
                  Clicking the Start button to start plyaing. Go for one of the
                  options on "User" section before the countdown ends.
                </Message.Header>
                <Message.Header>Good luck!</Message.Header>
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
                <Header
                  as="h1"
                  color={timeLeft < 1 ? "red" : "grey"}
                  textAlign="center"
                >
                  <Header.Content>{timeLeft}</Header.Content>
                </Header>
                <Button size="huge" basic color="grey">
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
                      <Header.Content>0</Header.Content>
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
                      <Header.Content>0</Header.Content>
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

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
    timeLeft: 10
  };

  UNSAFE_componentWillMount() {}

  handleStart = () => {
    console.log("Start button clicked.");
    this.timeLeftCountdown();
  };

  timeLeftCountdown = () => {
    const self = this;
    let timeLeft = Object.assign(this.state.timeLeft);

    var timeLeftCounter = setInterval(function() {
      // Decrement time left
      self.setState({
        timeLeft: (timeLeft -= 1)
      });

      // Set progress to true
      self.setState({
        gameOnProgress: true
      });

      if (timeLeft <= 0) {
        // Clear interval
        clearInterval(timeLeftCounter);

        // Reset time left and game state
        self.setState({
          timeLeft: 10
        });
        self.setState({
          gameOnProgress: false
        });
      }
    }, 1000);
  };

  render() {
    const { timeLeft, gameOnProgress } = this.state;

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
              <Segment padded basic vertical>
                <Button
                  size="huge"
                  color="green"
                  disabled={gameOnProgress}
                  onClick={this.handleStart}
                >
                  Start
                </Button>
                <Header
                  as="h1"
                  color={timeLeft < 4 ? "red" : "grey"}
                  textAlign="center"
                >
                  <Header.Content>{timeLeft}</Header.Content>
                </Header>
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
                  <Header as="h2" textAlign="center">
                    <Header.Content>0</Header.Content>
                  </Header>
                </Card.Content>
                <Card.Content>
                  <Card.Group itemsPerRow={1} textAlign="center">
                    <Card color="red">
                      <Card.Content>
                        <Icon color="grey" name="hand paper" size="huge" />
                      </Card.Content>
                    </Card>
                    <Card color="red">
                      <Card.Content>
                        <Icon color="grey" name="hand rock" size="huge" />
                      </Card.Content>
                    </Card>
                    <Card color="red">
                      <Card.Content>
                        <Icon color="grey" name="hand scissors" size="huge" />
                      </Card.Content>
                    </Card>
                  </Card.Group>
                </Card.Content>
              </Card>
            </Grid.Column>
            <Grid.Column className="computer" textAlign="center">
              <Card>
                <Card.Content>
                  <Card.Header textAlign="left">Computer</Card.Header>
                  <Header as="h2" textAlign="center">
                    <Header.Content>0</Header.Content>
                  </Header>
                </Card.Content>
                <Card.Content>
                  <Card.Group itemsPerRow={1} textAlign="center">
                    <Card color="red">
                      <Card.Content>
                        <Icon color="grey" name="hand paper" size="huge" />
                      </Card.Content>
                    </Card>
                    <Card color="red">
                      <Card.Content>
                        <Icon color="grey" name="hand rock" size="huge" />
                      </Card.Content>
                    </Card>
                    <Card color="red">
                      <Card.Content>
                        <Icon color="grey" name="hand scissors" size="huge" />
                      </Card.Content>
                    </Card>
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

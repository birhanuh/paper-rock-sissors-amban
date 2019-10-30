import React, { PureComponent } from "react";
import { Header, Icon, Container } from "semantic-ui-react";
import Game from "./Game";

class Page extends PureComponent {
  render() {
    return (
      <section className="ui container stackable" style={{ marginTop: "6em" }}>
        <header className="haeder">
          <Container textAlign="center">
            <Header as="h1" icon color="teal" textAlign="center">
              <Icon name="game" circular />
              <Header.Content>Paper rock sissors</Header.Content>
            </Header>
          </Container>
        </header>
        <main className="main">
          <Game />
        </main>
        <footer>
          <small>Copyright © Birhanu Hailemariam (developer). 2019</small>
        </footer>
      </section>
    );
  }
}

export default Page;

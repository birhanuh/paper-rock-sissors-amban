import React, { PureComponent } from "react";
import { Header, Icon, Container, Segment } from "semantic-ui-react";
import Action from "./Action";

class Page extends PureComponent {
  render() {
    return (
      <section className="ui container stackable" style={{ marginTop: "3em" }}>
        <header className="haeder">
          <Container textAlign="center">
            <Header as="h1" icon color="teal" textAlign="center">
              <Icon name="game" circular />
              <Header.Content>Paper rock sicssors</Header.Content>
            </Header>
          </Container>
        </header>
        <main className="main">
          <Action />
        </main>
        <footer>
          <Segment padded basic vertical textAlign="center">
            <small>Copyright © Birhanu Hailemariam [developer]. 2019</small>
          </Segment>
        </footer>
      </section>
    );
  }
}

export default Page;

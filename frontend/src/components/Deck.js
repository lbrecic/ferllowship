import { Component } from "react";
import { Card, CardGroup } from "react-bootstrap";
import "../styles/Deck.css";

class Deck extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  render() {
    return (
      <>
        <div className="deck">
          <CardGroup>
            <div className="">
              <Card>
                <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/9/99/Beli%C5%A1%C4%87e_1.jpg" />
                <Card.Body>
                  <Card.Title>Belisce 1</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </div>

            <div className="">
              <Card>
                <Card.Img variant="top" src="https://belisce.hr/wp-content/uploads/2020/09/fotka-grad-belisce-1500x635.jpg" />
                <Card.Body>
                  <Card.Title>Belisce 2</Card.Title>
                  <Card.Text>
                    This card has supporting text below as a natural lead-in to
                    additional content.{" "}
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </div>

            <div className="">
              <Card>
                <Card.Img variant="top" src="https://lokalni.vecernji.hr/media/daguerre/3d/c6/33958519e178b534d305.png" />
                <Card.Body>
                  <Card.Title>Belisce 3</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This card has even longer
                    content than the first to show that equal height action.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </div>

            <div className="">
              <Card>
                <Card.Img variant="top" src="https://static.gradonacelnik.hr/uploads/2019/10/01-R-SOL-E-GradskaUprava-Small-1.jpg" />
                <Card.Body>
                  <Card.Title>Belisce 4</Card.Title>
                  <Card.Text>
                    This is a wider card with supporting text below as a natural
                    lead-in to additional content. This content is a little bit
                    longer.
                  </Card.Text>
                </Card.Body>
                <Card.Footer>
                  <small className="text-muted">Last updated 3 mins ago</small>
                </Card.Footer>
              </Card>
            </div>

          </CardGroup>
        </div>
      </>
    );
  }
}

export default Deck;

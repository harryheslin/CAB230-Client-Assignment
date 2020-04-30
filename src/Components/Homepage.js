import React from 'react';
import "./Homepage.css";
import {
  Jumbotron, Container, Card, CardImg, CardBody,
  CardTitle
} from 'reactstrap';
import {
  Link
} from "react-router-dom";

const icons = [
  {
    title: "View All",
    image: "logos/bar-chart.png",
    link: "/viewAll"
  },
  {
    title: "Search",
    image: "logos/loupe.png",
    link: "/search"
  },
  {
    title: "Compare",
    image: "logos/calendar.png",
    link: "/compare"
  }
]

// function CardContent(props) {
//   let { title, image, link } = props
//   return (
//     <Card className="optionCard mx-auto">
//       <Link to={link}>
//         <CardImg top width="1%" height="180" src={image} className="Card-image" alt="Card image cap" />
//         </Link>
//       <CardBody>
//         <CardTitle>{title}</CardTitle>
//       </CardBody>
//     </Card>
//   )
// }

const Homepage = (props) => {
  return (
    <div>
    {/* <p>
    <div className="title">
        Bulls Trading Exchange Portal
        </div>
      </p> */}
      <div className="jumbo">
      <div class="transbox">
            <div className="transMessage">
              <p>
                <div className="title">
                  Bulls Trading Exchange Portal
                </div>
              </p>
            </div>
          </div>
      {/* <Jumbotron className="jumbo" fluid>
        <Container fluid>
          <div class="transbox">
            <div className="transMessage">
              <p>
                <div className="title">
                  Bulls Trading Exchange Portal
                </div>
                <li>View a list of available companies</li>
                <li>Search for companies by stock code</li>
                <li>Compare a companies previous prices</li>
              </p>
            </div>
          </div>
        </Container>
      </Jumbotron> */}

      {/* <div className="row">
        {icons.map(icon => (
          <CardContent {...icon} />
        ))}
      </div> */}
      </div>
      </div>
  );
};

export default Homepage;
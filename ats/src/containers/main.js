import React from "react";
import Header from "../components/header";
import { Switch, Route, Redirect } from "react-router-dom";
import Footer from "../components/footer";
import Home from "./home";
import Detail from "./details";
import axios from "axios";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      reviews: []
    };
  }
  componentDidMount() {
    this.getProducts();
  }
  getProducts = () => {
    axios.get("http://localhost:3000/api/products").then(response => {
      this.setState({ products: response.data });
      console.log(this.state.products);
    });
  };
  getReviews = () => {
    axios.get("http://localhost:3000/api/reviews").then(response => {
      this.setState({ reviews: response.data });
      console.log(this.state.reviews);
    });
  };
  sumRating(reviews) {
    let sum = 0;
    reviews.forEach(function(obj) {
      sum += obj["rating"];
    });

    console.log(reviews);
    console.log(sum);
    return sum / reviews.length;
  }
  render() {
    const detailProduct = ({ match }) => {
      console.log(this.state.products);
      return (
        <Detail
          name={match.params.name} //product name passed as props to Detail component
          id={match.params.id} //product id passed as props to Detail component
          products={this.state.products} //all products passed as props to Detail component
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/details/:name/:id" component={detailProduct} />
          <Redirect from="*" to="/" />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default Main;

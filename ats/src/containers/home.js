import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import axios from "axios";
import Rating from "@material-ui/lab/Rating";

import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";

const styles = () => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden"
  },
  filter: {
    marginTop: "100px",
    display: "center"
  },
  card: {
    maxWidth: 300,
    marginTop: "50px",
    marginBottom: "10px"
  },
  media: {
    height: 5,
    paddingTop: "56.25%" // 16:9
  },

  avatar: {
    backgroundColor: red[500]
  },
  button: {
    marginTop: "10px"
  },
  formControl: {
    margin: "10px",
    minWidth: 120
  }
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      reviews: [],
      category: "Movies"
    };
  }
  componentDidMount() {
    this.getProducts();
    this.getReviews();
  }
  getProducts = () => {
    axios.get("http://localhost:3000/api/products").then(response => {
      this.setState({ products: response.data });
    });
  };
  getReviews = () => {
    axios.get("http://localhost:3000/api/reviews/").then(response => {
      this.setState({ reviews: response.data });
    });
  };
  sumRating(reviews, productName) {
    let sum = 0;
    let aa = reviews.filter(review => review.productName === productName);
    if (aa.length !== 0) {
      console.log(aa);
      aa.forEach(function(obj) {
        sum += obj["rating"];
      });
      console.log(sum / aa.length);
      return sum / aa.length;
    }
  }

  render() {
    const { classes } = this.props;

    const handleChange = event => {
      this.setState({ category: event.target.value });
    };

    return this.state.products.length !== 0 ||
      this.state.reviews.length !== 0 ? (
      <div>
        <center>
          <div className={classes.filter}>
            <Button>Select category : </Button>
            <Select
              labelId="label"
              id="select"
              value={this.state.category}
              onChange={handleChange}
            >
              <MenuItem value="Movies">Movies</MenuItem>
              <MenuItem value="Computers">Computers</MenuItem>
              <MenuItem value="Jewelery">Jewelery</MenuItem>
              <MenuItem value="Industrial">Industrial</MenuItem>
              <MenuItem value="Tools">Tools</MenuItem>
              <MenuItem value="Automotive">Automotive</MenuItem>
              <MenuItem value="Electronics">Electronics</MenuItem>
              <MenuItem value="Outdoors">Outdoors</MenuItem>
              <MenuItem value="Kids">Kids</MenuItem>
              <MenuItem value="Grocery">Grocery</MenuItem>
              <MenuItem value="Computers">Computers</MenuItem>
              <MenuItem value="Toys">Toys</MenuItem>
              <MenuItem value="Shoes">Shoes</MenuItem>
              <MenuItem value="Baby">Baby</MenuItem>
              <MenuItem value="Beauty">Beauty</MenuItem>
              <MenuItem value="Games">Games</MenuItem>
              <MenuItem value="Sports">Sports</MenuItem>
              <MenuItem value="Health">Health</MenuItem>
              <MenuItem value="Clothing">Clothing</MenuItem>
              <MenuItem value="Home">Home</MenuItem>
              <MenuItem value="Garden">Garden</MenuItem>
            </Select>
          </div>
        </center>
        <div container className={classes.root}>
          {this.state.products.map(product =>
            product.category === this.state.category ? (
              <Card className={classes.card} key={product.productId}>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      {product.productName[0]}
                    </Avatar>
                  }
                  title={product.productName}
                  subheader="September 14, 2016"
                />
                <Link
                  to={`/details/${product.productName.split(" ").join("")}/${
                    product.productId
                  }`}
                >
                  <CardMedia
                    className={classes.media}
                    image={product.imageUrl}
                    title={product.productName}
                  />
                </Link>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    description : {product.description}
                  </Typography>
                  <Rating
                    name="customized-10"
                    value={this.sumRating(
                      this.state.reviews,
                      product.productName
                    )}
                    max={10}
                    size="samll"
                  />{" "}
                </CardContent>
                <CardActions disableSpacing></CardActions>
              </Card>
            ) : null
          )}
        </div>
      </div>
    ) : (
      <div></div>
    );
  }
}
Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);

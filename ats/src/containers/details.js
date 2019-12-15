import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Rating from "@material-ui/lab/Rating";
import VisibilityIcon from "@material-ui/icons/Visibility";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import Fab from "@material-ui/core/Fab";
import axios from "axios";

const styles = theme => ({
  root: {
    marginTop: "60px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "#e5dfdf"
  },
  card: {
    width: "80%",
    height: "80%",
    margin: "20px",
    marginTop: "60px",
    backgroundColor: "#F7F7F7"
  },
  media: {
    height: 0,
    paddingTop: "60.25%" // 16:9
  },
  avatar: {
    backgroundColor: red[500]
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)"
  },
  title: {
    fontSize: 50
  },
  pos: {
    marginBottom: 12
  },
  cardDetail: {
    height: "auto",
    width: "auto",
    margin: "10px",
    marginTop: "40px",
    backgroundColor: "#F7F7F7"
  },
  summary: {
    margin: "10px",
    marginTop: "90px"
  },
  Previous: { marginTop: "20px" }
});

class Detail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
      products: [] //selected products
    };
  }

  componentDidMount() {
    this.getReviews();
  }
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
    const { classes } = this.props;
    var products = [];
    var reviews = [];
    if (this.props.products.length != null) {
      //get the selected products from the list of productss
      products = this.props.products.filter(
        product => product.productId == this.props.id
      );

      reviews = this.state.reviews.filter(
        review => review.productName === products[0].productName
      );
    }

    if (products.length)
      // if products is found we return more informations
      return (
        <Grid container className={classes.root}>
          <Grid item xs={7}>
            <Card className={classes.card}>
              <CardHeader
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={products[0].productName}
                subheader={products[0].category}
              />
              <CardMedia>
                <center>
                  <img
                    src={
                      products[0].imageUrl
                        ? products[0].imageUrl
                        : require("../assets/no-img.png")
                    }
                    alt="recipe thumbnail"
                  />
                </center>
              </CardMedia>
              <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                  category :{products[0].category}
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={5}>
            <Link to="/">
              <Fab variant="extended" className={classes.Previous}>
                <SkipPreviousIcon />
                Previous
              </Fab>
            </Link>
            <Card className={classes.cardDetail}>
              <CardContent>
                <h2>
                  <b>product Info</b>
                </h2>
                <h3>
                  <b>description :</b> {products[0].description}
                </h3>
                <h3>
                  <b>category :</b>
                  {products[0].category}
                </h3>
                <h3>
                  <b>color : </b>
                  {products[0].color}
                </h3>
                <h3>
                  <b>price :</b> {products[0].price} $
                </h3>
                <h3>
                  <b>tag :</b> {products[0].tag}
                </h3>
                <h3>
                  <b>product Material :</b> {products[0].productMaterial}
                </h3>

                <Rating
                  name="customized-10"
                  value={this.sumRating(reviews)}
                  max={10}
                  size="large"
                />
                <CardActions>
                  <IconButton aria-label="add to favorites">
                    <FavoriteIcon />
                  </IconButton>
                  <IconButton aria-label="share">
                    <ShareIcon />
                  </IconButton>
                  <IconButton aria-label="visibility">
                    <VisibilityIcon />
                  </IconButton>
                </CardActions>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      );
    else return <div></div>; //if products not foun we return nothing
  }
}
Detail.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Detail);

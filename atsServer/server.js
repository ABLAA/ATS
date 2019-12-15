const express = require("express");
const app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
var axios = require("axios");

app.use(bodyParser.json());

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "ats",
  port: 3002
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM reviews", function(err, result, fields) {
    if (err) throw err;
    let selectResult = result;
    console.log(selectResult.length == 0);
    console.log(JSON.stringify(result));
  });
});
app.get("/api/products", (req, res) => {
  const query = "select * from products ";

  con.query(query, [], function(err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
app.get("/api/reviews", (req, res) => {
  const query = "select * from reviews ";

  con.query(query, [], function(err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

axios
  .get("http://test.ats-digital.com:3000/products?size=500")
  .then(data => {
    let jsonData = data.data;
    console.log(jsonData.products);
    // setTimeout(() => {
    //   jsonData.products.map(product => {
    //     product.reviews.map(review => {
    //       let query =
    //         "INSERT INTO reviews(rating,content,productName) VALUES (?,?,?)";
    //       con.query(
    //         query,
    //         [review.rating, review.content, product.productName],
    //         function(err, result, fields) {
    //           if (err) throw err;

    //           console.log(JSON.stringify(result));
    //         }
    //       );
    //     });
    //   });
    // }, 3000);
    // setTimeout(() => {
    //   jsonData.products.map(product => {
    //     let query =
    //       "INSERT INTO `products` (`color`, `category`, `productName`, `price`, `description`, `tag`, `productMaterial`, `imageUrl`, `createdAt`) VALUES (?,?,?,?,?,?,?,?,?);";
    //     con.query(
    //       query,
    //       [
    //         product.color,
    //         product.category,
    //         product.productName,
    //         product.price,
    //         product.description,
    //         product.tag,
    //         product.productMaterial,
    //         product.imageUrl,
    //         product.createdAt
    //       ],
    //       function(err, result, fields) {
    //         if (err) throw err;

    //         console.log(JSON.stringify(result));
    //       }
    //     );
    //   });
    // }, 3000);
  })
  .catch(err => {
    console.log(err);
    return null;
  });

var port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`listening on ${port}`));

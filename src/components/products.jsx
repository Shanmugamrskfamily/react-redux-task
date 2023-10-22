import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { add, remove } from "../store/cartSlice";
import { useSelector } from "react-redux/es/hooks/useSelector";

const Products = () => {
  const CartProducts = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const isProductInCart = (productId) => {
    for (let x of CartProducts) {
      if (x.id === productId) {
        return true;
      }
    }
    return false;
  };
  console.log(CartProducts);
  const toggleCart = (product) => {
    if (isProductInCart(product.id)) {
      dispatch(remove(product.id));
    } else {
      dispatch(add(product));
    }
  };

  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("/mocks/products.json")
      .then((response) => response.json())
      .then((result) => setProducts(result.products))
      .catch((e) => console.log(e));
  }, []);

  const cards = products.map((product) => (
    <div className="card-container" key={product.id}>
      <div className="card-products">
        <Card style={{ width: "18rem" }} className="cards">
          <Card.Img
            variant="top"
            src={product.images}
            style={{ width: "250px", height: "200px" }}
          />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              Current Price: <i className="fa fa-inr"></i>
              {product.price}
            </Card.Text>
            <Button
              variant="primary"
              className="add"
              onClick={() => {
                toggleCart(product);
              }}
            >
              {isProductInCart(product.id) ? "Remove from Cart" : "Add to Cart"}
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  ));

  return (
    <>
      <h1 className="text-white">Shopping Cart Using React-Redux</h1>
      <div className="card-products">{cards}</div>
    </>
  );
};

export default Products;

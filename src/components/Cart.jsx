import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { remove } from "../store/cartSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.cart);

  const [productCount, setProductCount] = useState(
    products.reduce((counts, product) => {
      counts[product.id] = 1; // Default count for each product is 1
      return counts;
    }, {})
  );

  const increaseCount = (productId) => {
    setProductCount((prevCounts) => ({
      ...prevCounts,
      [productId]: prevCounts[productId] + 1,
    }));
  };

  const decreaseCount = (productId) => {
    setProductCount((prevCounts) => ({
      ...prevCounts,
      [productId]: Math.max(prevCounts[productId] - 1, 0), // Ensure count doesn't go below 0
    }));
  };

  const calculateTotalPrice = () => {
    let total = 0;
    products.forEach((product) => {
      total += product.price * productCount[product.id];
    });
    return total;
  };

  const removetoCart = (id) => {
    dispatch(remove(id));
  };

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
              Current Price: <i class="fa fa-inr"></i>
              {product.price}
            </Card.Text>
            <div className="InDe">
              <div className="price-total">
                <Card.Text className="card-text">
                  Subtotal of product price:<i class="fa fa-inr"></i>{" "}
                  {product.price * productCount[product.id] || product.price}
                </Card.Text>
              </div>
              <div className="price-total">
              <Button
                  variant="primary"
                  className="increament"
                  style={{ borderRadius: "50%" }}
                  onClick={() => {
                    if (productCount[product.id] > 0) {
                      decreaseCount(product.id);
                    } 
                    
                  }}
                >-</Button>
                <Card.Text className="text">
                  {productCount[product.id] || 1}
                </Card.Text>
                <Button
                  variant="primary"
                  className="increament"
                  style={{ borderRadius: "50%" }}
                  onClick={() => increaseCount(product.id)}
                >+</Button>
              </div>
            </div>
            <Button
              variant="danger"
              className="add mt-2"
              onClick={() => removetoCart(product.id)}
            >
              Remove Item
            </Button>
          </Card.Body>
        </Card>
      </div>
    </div>
  ));

  return (
    <>
      <div className="text-white">
        <span style={{ fontSize: 30 }}>My Cart</span> <br />
        <span style={{ fontSize: 30 }}>Grand Total:<i class="fa fa-inr"></i> {calculateTotalPrice()}</span>
        {products.length === 0 && (
          <div className="NoItems">
            <img
              src="https://img.freepik.com/free-photo/funny-illustration-3d-cartoon-backpacker_183364-80424.jpg?w=1380&t=st=1690967265~exp=1690967865~hmac=3a953df10987b13a88915a21662843501208169d499267818c9ff582e45e1ca6://cdni.iconscout.com/illustration/premium/thumb/before-login-no-product-in-cart-4006356-3309942.png"
              alt="Cart Empty image"
            />
          </div>
        )}
        <div className="card-products mb-4">{cards}</div>
      </div>
    </>
  );
};

export default Cart;

import React, { useEffect, useState } from "react";
import { Cookies } from "react-cookie";
import { useParams, useLocation } from "react-router-dom";
import "../style/Drink.css";
import LoadingSpinner from "./LoadingSpinner";
import Modal2 from "./Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

export default function Drink(props) {
  //    const {categoty}  = useParams();
  //    const {drinkName} = useParams();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { drinkId } = useParams();
  const location = useLocation();

  const cookies = new Cookies();

  const [isLoading, setisLoading] = useState(false);

  const [data, setData] = useState([]);
  useEffect(() => {
    setisLoading(true);

    const fetcher = async () => {
      const requestOption = {
        method: "GET",
        credentials: "same-origin",
        headers: {
          Authorization: "Bearer " + cookies.get("userToken"),
          "Content-Type": "application/json",
        },
      };
      const response = await fetch(
        `https://localhost:7090/drink/${drinkId}`,
        requestOption
      );
      const responseData = await response.json();
      setData(responseData);
      setisLoading(false);
    };
    fetcher();
  }, []);

  return (
    <>
      <div className="drinkContainer">
        <br />

        <div className="imageContainer">
          <img className="image" src={data.strDrinkThumb} alt=""></img>
        </div>

        <div className="textContainer">
          <h1 className="nameContainer"> Name : {data.strDrink}</h1>
          <h3 className="glassContainer">Glass Type : {data.strGlass}</h3>
          <h3 className="instructionsContainer">
            Instructions : {data.strInstructions}
          </h3>
          <div className="ingredientsContainer">
            {" "}
            Ingredients:
            <li>
              <ul> {data.strIngredient1} </ul>
              <ul> {data.strIngredient2} </ul>
              <ul> {data.strIngredient3} </ul>
              <ul> {data.strIngredient4} </ul>
            </li>
          </div>
          <h3 className="likesContainer">Likes : {location.state.likes}</h3>
          <h3 className="dislikesContainer">
            Dislikes : {location.state.dislikes}
          </h3>
        </div>
      </div>

      <button style={{ position: "absolute", bottom: "50%", color: "wheat" }}>
        {" "}
        <Modal2 />{" "}
          </button>
          

          <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

import React, { useState, useEffect } from "react";
import Card from "../../components/Card/Card";
import "./Home.css";
import Cart from "../../components/Cart/Cart";
import { getAuth } from "firebase/auth";
import Button from "react-bootstrap/Button";
import { getDatabase, ref, child, push, update, set } from "firebase/database";
import { v4 as uuidv4 } from "uuid";

const Home = () => {
  const [loadedProducts, setLoadedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedProducts, setAddedProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");

  const auth = getAuth();
  const currentUser = auth.currentUser;

  const addProduct = (product) => {
    setAddedProducts((prevProducts) => [...prevProducts, product]);
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch(
          "https://ecommerceapp-7ff10-default-rtdb.europe-west1.firebasedatabase.app/Products.json"
        );

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        data.splice(0, 1);

        if (data) {
          setLoadedProducts(data);
          console.log("Data fetched:", data);
        } else {
          throw new Error("Invalid data structure");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setOrderStatus("");
  };

  const countElements = (obj) => Object.keys(obj).length;

  const getUniqueProducts = () => {
    const uniqueProducts = {};
    addedProducts.forEach((product) => {
      const key = `${product.title}-${product.price}`;
      if (key in uniqueProducts) {
        uniqueProducts[key].count += 1;
      } else {
        uniqueProducts[key] = { ...product, count: 1 };
      }
    });
    return Object.values(uniqueProducts);
  };

  const handleOrderClick = async () => {
    if (currentUser) {
      console.log(currentUser);
      const uniqueProducts = getUniqueProducts();
      const total = uniqueProducts.reduce(
        (acc, product) => acc + product.price * product.count,
        0
      );

      const orderId = uuidv4();

      const order = {
        orderId: orderId,
        user: currentUser.email,
        products: uniqueProducts.map((product) => ({
          id: product.id || "",
          title: product.title,
          price: product.price,
          count: product.count,
        })),
        total: total,
        timestamp: new Date().toISOString(),
      };

      console.log("Order to be sent:", order);

      const apiEndpoint =
        "https://ecommerceapp-7ff10-default-rtdb.europe-west1.firebasedatabase.app/Orders.json";

      try {
        const response = await fetch(apiEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(order),
        });

        if (!response.ok) {
          throw new Error("Failed to send order to the API");
          setOrderStatus("Failed to send order!");
        } else {
          setOrderStatus("Order sent successfully!");
          setAddedProducts([]);
        }

        const db = getDatabase();
        const ordersRef = ref(db, "Orders");

        await set(child(ordersRef, orderId), order);

        console.log("Order sent successfully to both API and Firebase!");
      } catch (error) {
        console.error("Error sending order:", error);
        setOrderStatus("Failed to send order!");
      }
    } else {
      setOrderStatus("You need to log in");
    }
  };

  const paragraphStyle =
    orderStatus === "Order sent successfully!"
      ? { color: "green" }
      : orderStatus === "Failed to send order!"
      ? { color: "red" }
      : { color: "black" };

  return (
    <>
      <Cart itemCount={countElements(addedProducts)} onClick={openModal} />

      <div className="main-container">
        {loading ? (
          <p style={{ textAlign: "center", color: "black" }}>Loading...</p>
        ) : error ? (
          <p style={{ textAlign: "center", color: "red" }}>{error}</p>
        ) : (
          loadedProducts.map((product) => (
            <Card
              key={product.id}
              title={product.title}
              price={product.price}
              img={product.img}
              className="card"
              addProduct={addProduct}
            />
          ))
        )}
      </div>

      <div>
        {modalOpen && (
          <div className="overlay" onClick={closeModal}>
            <div
              className="modal-container"
              onClick={(e) => e.stopPropagation()}
            >
              <p>
                {getUniqueProducts().map((product) => (
                  <p key={product.id}>
                    {product.count}x {product.title} ${product.price}
                  </p>
                ))}
              </p>
              <p>
                Total price $
                {getUniqueProducts().reduce(
                  (acc, product) => acc + product.price * product.count,
                  0
                )}
              </p>
              <div>
                <p style={paragraphStyle}>{orderStatus}</p>
              </div>
              <div style={{ alignContent: "center" }}>
                <Button
                  style={{ marginRight: "2.5px" }}
                  variant="primary"
                  size="md"
                  active
                  onClick={handleOrderClick}
                >
                  Order
                </Button>

                <Button
                  style={{ marginLeft: "2.5px" }}
                  onClick={closeModal}
                  variant="danger"
                  size="md"
                  active
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;

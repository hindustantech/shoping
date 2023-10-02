import React, { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useCart } from "../context/Cart";
import { useAuth } from "../context/auth";
import { useNavigate } from "react-router-dom";
import DropIn from "braintree-web-drop-in-react";
import axios from "axios";
import toast from "react-hot-toast";

const CartPage = () => {
  const [Cart, SetCart] = useCart();
  const [auth, setAuth] = useAuth();
  const [clientToken, setClientToken] = useState("");
  const [instance, Setinstance] = useState("");
  const [loading, setLodaing] = useState(false);
  const navigate = useNavigate();
  // Total Amount
  const totalPrice = () => {
    try {
      let total = 0;
      Cart.map((item) => {
        total = total + item.price;
      });
      return total.toLocaleString("en-IN", {
        style: "currency",
        currency: "INR",
      });
    } catch (error) {}
  };
  //  DeletItem
  const removeCartItem = (pid) => {
    try {
      let myCart = [...Cart];
      let index = myCart.findIndex((item) => item._id === pid);
      myCart.splice(index, 1);
      SetCart(myCart);
      localStorage.setItem("cart", JSON.stringify(myCart));
    } catch (error) {
      console.log(error);
    }
  };
  // PaymentGetway

  const getToken = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/token`
      );
      setClientToken(data?.clientToken);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getToken();
  }, [auth?.token]);

  const handlePayment = async () => {
    try {
      setLodaing(true);
      const { nonce } = await instance.requestPaymentMethod();
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/product/braintree/payment`,
        { Cart, nonce }
      );
      localStorage.removeItem("cart");
      navigate("/dashboard/user/Orders");
      toast.success("Payment Completated Successfully");
      setLodaing(false);
    } catch (error) {
      console.log(error);
      setLodaing(false);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <p className="text-center">
            {" "}
            {`USER ${auth?.token && auth?.user?.name}`}{" "}
          </p>
          <h4 className="text-center mb-3">
            {Cart?.length > 0
              ? `You Have ${Cart.length} items in Your Cart${
                  auth?.token ? "" : "  Please Login to CheckOut"
                }`
              : "Your Cart Is Empty"}
          </h4>
        </div>
        <div className="row">
          <div className="col-md-8 ">
            {Cart?.map((p) => (
              <div className="row mb-2 card p-3  flex-row w-100">
                <div className="col-md-4 mt-3 ">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/product/photo-product/${p._id}`}
                    className="card-img-top"
                    style={{ height: "10rem" }}
                    alt={p.name}
                    height={"100px"}
                    width="100px"
                  />
                </div>
                <div className="col-md-8">
                  <p className="">Name : {p.name}</p>
                  <p className=""> Decsribse : {p.decs.substring(0, 30)}</p>
                  <p className="">Price : {p.price}</p>
                  <button
                    type="button"
                    class="btn btn-danger"
                    onClick={() => removeCartItem(p._id)}
                  >
                    Remove Item
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 text-center">
            <h3>Cart Summary</h3>
            <p>Total|CheckOut|Payment</p>
            <hr />
            <h4>Total : {totalPrice()} </h4>
            {auth?.user?.address ? (
              <>
                <div className="mb-3">
                  <h4>Current Address</h4>
                  <h5>{auth?.user?.address}</h5>
                  <button
                    className="btn btn-outline-warning"
                    onClick={() => {
                      navigate("/dashboard/user/Profile");
                    }}
                  >
                    Update Address
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="mb-3">
                  {auth?.token ? (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() => navigate("/dashboard/user/Profile")}
                    >
                      Update Profile
                    </button>
                  ) : (
                    <button
                      className="btn btn-outline-warning"
                      onClick={() =>
                        navigate("/Login", {
                          state: "/Cart",
                        })
                      }
                    >
                      PlZ Login
                    </button>
                  )}
                </div>
              </>
            )}
            <div className="mt-3">
              {!clientToken || !Cart?.length ? (
                ""
              ) : (
                <>
                  <DropIn
                    options={{
                      authorization: clientToken,
                      paypal: {
                        flow: "vault",
                      },
                    }}
                    onInstance={(instance) => Setinstance(instance)}
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handlePayment}
                    disabled={!loading || !instance || !auth?.user?.address}
                  >
                    {loading ? "processing...." : "Make Payment"}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CartPage;

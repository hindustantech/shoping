import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout/Layout";
import UserMenu from "../../components/Layout/UserMenu";
import { useAuth } from "../../context/auth";
import axios from "axios";
import moment from "moment";

const Order = () => {
  const [Order, setOrder] = useState([]);
  const [auth] = useAuth();
  const getOrder = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/order`
      );
      setOrder(data);
    } catch (error) {}
  };
  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);
  return (
    <Layout title={"Order"}>
      <div className="container m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1> Order</h1>
            {/* <p> {JSON.stringify(Order,null,4)}</p> */}
            {Order?.map((o, i) => {
              return (
                <div className="border shadow ">
                  <table className="table w-75">
                    <thead>
                      <tr>
                        <th scope="col">#</th>
                        <th scope="col">Status</th>
                        <th scope="col"> Byers</th>
                        <th scope="col">date</th>
                        <th scope="col">Payment</th>
                        <th scope="col">Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>{i + 1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyers?.name}</td>
                        <td>{moment(o?.createAt).format("YYYY-MM-DD")}</td>
                        <td>{o?.payment?.success ? "success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="contanier">
                    <div className="col-md-8 ">
                      {o?.products?.map((p,i) => (
                        <div className="row mb-2 card p-3  flex-row w-100">
                          <div className="col-md-4 mt-3  mr-3">
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
                            <p className="">
                              {" "}
                              Decsribse : {p.decs.substring(0, 30)}
                            </p>
                            <p className="">Price : {p.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Order;

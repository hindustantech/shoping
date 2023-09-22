import React, { useEffect, useState } from "react";

import Layout from "../../components/Layout/Layout";
import AdminMenu from "../../components/Layout/AdminMenu";
import toast from "react-hot-toast";
import axios from "axios";
import FromCategory from "../../components/from/FromCategory";
import Modal from "react-bootstrap/Modal";

function CreateCategory() {
  const [categories, setCategories] = useState([]);
  // handel From
  const [name, setName] = useState("");

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleShow = (name) => {
    setShow(true);
    setUpdatedName(name);
  };
  const handleClose = () => setShow(false);

  //Add Category
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        {
          name,
        }
      );
      if (data?.success) {
        toast.success(`${name} Category is Created`);
        getAllCategory();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Somthing Went Wrong Careating category");
    }
  };

  //get All Category
  const getAllCategory = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/get-category`
      );
      if (data?.success) {
        setCategories(data?.category);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong in getting Category");
    }
  };

  useEffect(() => {
    getAllCategory();
  }, []);

  //Update category  Function

  const handelUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is Update`);
        setSelected(null);
        setUpdatedName("");
        setShow(false);
        getAllCategory();
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };
  const handelDelet = async (cid) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${cid}`,
        { name: updatedName }
      );
      if (data.success) {
        toast.success(`${updatedName} is Deleted`);
        setSelected(null);
        setUpdatedName("");
        setShow(false);
        getAllCategory();
      } else {
        toast.success(data.message);
      }
    } catch (error) {
      toast.error("something went wrong");
    }
  };

  return (
    <Layout title={" Create Category"}>
      <div className="container-fluid ">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>

          <div className="col-md-9 ">
            <FromCategory
              handleSubmit={handleSubmit}
              value={name}
              setValue={setName}
            />
            <table className="table w-50">
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Action</th>
              </tr>

              {categories.map((c) => (
                <>
                  <tr key={c._id}>
                    <td>{c.name}</td>
                    <td>
                      <button
                        className="btn btn-success m-2"
                        onClick={() => {
                          handleShow(c.name);
                          setSelected(c);
                        }}
                      >
                        Edit
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          handelDelet(c._id);
                        }}
                      >
                        Delet
                      </button>
                    </td>
                  </tr>
                </>
              ))}
            </table>
          </div>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Category Updated</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <FromCategory
                value={updatedName}
                setValue={setUpdatedName}
                handleSubmit={handelUpdate}
              />
            </Modal.Body>

          </Modal>
        </div>
      </div>
    </Layout>
  );
}

export default CreateCategory;

import { hashPassword, comparePassword } from "../helper/authHelper.js";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, question } = req.body;

    if (!name) {
      return res.send({ message: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "email is Required" });
    }
    if (!password) {
      return res.send({ message: "password is Required" });
    }
    if (!phone) {
      return res.send({ message: "phone is Required" });
    }
    if (!address) {
      return res.send({ message: "address is Required" });
    }
    if (!question) {
      return res.send({ message: "question is Required" });
    }
    //check User
    const exisitinguser = await userModel.findOne({ email });
    //exisiting user
    if (exisitinguser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }

    //hashed password
    //const hashPassword = await hashPassword(password);
    //hashed password
    const hashedPassword = await hashPassword(password);

    //resiteruser
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      question,
      password: hashedPassword,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in register",
      error,
    });
  }
};

export const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invaild email or password",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email is not Regester",
      });
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(200).send({
        success: false,
        message: "Invalid password",
      });
    }
    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.status(200).send({
      success: true,
      message: "Login Successfuly",
      user: {
        _id:user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        role:user.role,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login ",
      error,
    });
  }
};

//forgot  password
// export const forgotPasswordController = async (req, res) => {
//   try {
//     const { email, question, newPassword } = req.body;

//     if (!email) {
//       res.status(400).send({ message: "Email is required" });
//     }
//     if (!question) {
//       res.status(400).send({ message: "question is required" });
//     }
//     if (!newPassword) {
//       res.status(400).send({ message: "newPassword is required" });
//     }
//     //check
//     const user = await userModel.findOne(email, question);
//     if (!user) {

//       return res.status(404).send({
//         success: false,
//         message: "worng Email answer ",
//       });
//     }
//     const hashed = await hashPassword(newPassword);

//     await userModel.findByIdAndUpdate(user._id, { password: hashed });
//     res.status(200).send({
//       success: true,
//       message: "Password Reset Succesfully",
//     });

//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       success: false,
//       message: "Something went worng ",
//     });
//   }
// };
export const forgotPasswordController = async (req, res) => {
  try {
    const {email, question, newPassword }= req.body;
    if (!email) {
      res.status(400).send({ message: "Email is Required" });
    }
    if (!question) {
      res.status(400).send({ message: "Question is Required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "Newpassword is Required" });
    }
    
    //cheeck
    const user = await userModel.findOne({ email, question });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Somethig Went wrong",
      });
    }
    const hashed = await hashPassword(newPassword);
    
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "PassWord Reset SuccessFully ",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};
//test
export const testControler = (req, res) => {
  console.log("procteed rout");
  res.send("procteed rout");
};

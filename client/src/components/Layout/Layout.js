import React from "react";
import Footer from "./Footer";
import Headers from "./Header";
import { Helmet } from "react-helmet";
import  { Toaster } from 'react-hot-toast';
import "react-toastify/dist/ReactToastify.css";
const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
      </Helmet>
      <Headers />

      <main style={{ minHeight: "70vh" }}>
        {children}
        < Toaster/>
      </main>
      <Footer />
    </div>
  );
};
Layout.defaultProps = {
  title: "",
  description: "",
  keywords: "",
  author: "",
};
export default Layout;

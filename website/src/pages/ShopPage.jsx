import React from "react";

import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";
import ShippingTwo from "../components/ShippingTwo";

import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import HeaderOne from "../components/HeaderOne";
import FooterOne from "../components/FooterOne";
import { useParams } from "react-router-dom";

const ShopPage = ({ searchProductData }) => {
  const subcategoryId = useParams();

  return (
    <>
      {/* ColorInit */}
      <ColorInit color={false} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      {/* <Preloader /> */}

      {/* HeaderOne */}
      <HeaderOne category={false} />

      {/* Breadcrumb */}
      <Breadcrumb title={"Shop"} />

      {/* ShopSection */}
      <ShopSection
        subcategoryId={subcategoryId}
        searchProductData={searchProductData}
      />

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* FooterTwo */}
      <FooterOne />
    </>
  );
};

export default ShopPage;

/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";

// @mui material components
import { Card } from "@mui/material";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import SoftInput from "components/SoftInput";
import SoftTextArea from "components/SoftTextArea";
import SoftTypography from "components/SoftTypography";

// Custom styles for the Configurator
import ConfiguratorRoot from "examples/Configurator/ConfiguratorRoot";

// Soft UI Dashboard React context
import {
  setFixedNavbar,
  setOpenConfigurator,
  setTransparentSidenav,
  useSoftUIController,
} from "context";
import { useLocation } from "react-router-dom";

function Configurator({ onRefresh, editData }) {
  // Add onRefresh prop
  const { pathname } = useLocation();

  const [controller, dispatch] = useSoftUIController();
  const { openConfigurator, transparentSidenav, fixedNavbar, sidenavColor } = controller;
  const [disabled, setDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name_merchandise: "",
    stock_merchandise: "",
    price_merchandise: "",
    merchandiseFile: null,
    deskripsi_merchandise: "",
  });

  useEffect(() => {
    if (editData) {
      setFormData({
        name_merchandise: editData.name,
        stock_merchandise: editData.stock,
        price_merchandise: editData.price,
        merchandiseFile: null, // This should handle file input differently
        deskripsi_merchandise: editData.deskripsi,
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      const apiUrl = process.env.REACT_APP_TEDX_API_URL;
      const access_api = process.env.REACT_APP_ACCESS_API;
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0YWFmNjc1LWYxZDktNDYyZi05NDIyLTc2ZDc2Yzk2OTBkNCIsInVzZXJuYW1lIjoiQWRtaW4gVEVEWCBVSUkiLCJlbWFpbCI6ImFkbWluQHRlZHh1aWkuY29tIiwiaWF0IjoxNzE3MDA1NjYxLCJleHAiOjE3MTcwMDYyNjF9.djoqpfrWIK4_tPsuikQVHKVyMCPW09ejtsnypIEH_uY";

      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const method = editData ? "patch" : "post";
      const url = editData ? `${apiUrl}/merchandise/${editData?.id}` : `${apiUrl}/merchandise`;

      const response = await axios[method](url, formDataToSend, {
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
          access_api: access_api,
        },
      });

      setFormData({
        name_merchandise: "",
        stock_merchandise: "",
        price_merchandise: "",
        merchandiseFile: null,
        deskripsi_merchandise: "",
      });

      setOpenConfigurator(dispatch, false);
      onRefresh(); // Call onRefresh to fetch updated data
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set loading state to false after request is complete
    }
  };

  useEffect(() => {
    function handleDisabled() {
      return window.innerWidth > 1200 ? setDisabled(false) : setDisabled(true);
    }

    window.addEventListener("resize", handleDisabled);
    handleDisabled();

    return () => window.removeEventListener("resize", handleDisabled);
  }, []);

  const handleCloseConfigurator = () => setOpenConfigurator(dispatch, false);
  const handleTransparentSidenav = () => setTransparentSidenav(dispatch, true);
  const handleWhiteSidenav = () => setTransparentSidenav(dispatch, false);
  const handleFixedNavbar = () => setFixedNavbar(dispatch, !fixedNavbar);

  const sidenavTypeButtonsStyles = ({
    functions: { pxToRem },
    boxShadows: { buttonBoxShadow },
  }) => ({
    height: pxToRem(42),
    boxShadow: buttonBoxShadow.main,

    "&:hover, &:focus": {
      opacity: 1,
    },
  });

  return (
    <ConfiguratorRoot variant="permanent" ownerState={{ openConfigurator }}>
      <SoftBox
        display="flex"
        justifyContent="space-between"
        alignItems="baseline"
        pt={3}
        pb={0.8}
        px={3}
      >
        <SoftBox>
          <SoftTypography variant="h5">
            {editData ? "Update" : "Add"} Merchandise Card
          </SoftTypography>
          <SoftTypography variant="body2" color="text">
            See our merchandise
          </SoftTypography>
        </SoftBox>

        <Icon
          sx={({ typography: { size, fontWeightBold }, palette: { dark } }) => ({
            fontSize: `${size.md} !important`,
            fontWeight: `${fontWeightBold} !important`,
            stroke: dark.main,
            strokeWidth: "2px",
            cursor: "pointer",
            mt: 2,
          })}
          onClick={handleCloseConfigurator}
        >
          close
        </Icon>
      </SoftBox>
      <Card sx={{ height: "100vh" }}>
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form" onSubmit={handleSubmit}>
            <SoftBox mb={1}>
              <SoftTypography variant="caption" color="black" fontWeight="medium">
                Name
              </SoftTypography>
              <SoftInput
                name="name_merchandise"
                value={formData.name_merchandise}
                onChange={handleChange}
                placeholder="Name"
                required
              />
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="caption" color="black" fontWeight="medium">
                Stock
              </SoftTypography>
              <SoftInput
                type="number"
                name="stock_merchandise"
                value={formData.stock_merchandise}
                onChange={handleChange}
                placeholder="Stock"
                required
              />
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="caption" color="black" fontWeight="medium">
                Price
              </SoftTypography>
              <SoftInput
                type="number"
                name="price_merchandise"
                value={formData.price_merchandise}
                onChange={handleChange}
                placeholder="Price"
                required
              />
            </SoftBox>
            <SoftBox mb={1}>
              <SoftTypography variant="caption" color="black" fontWeight="medium">
                Image Merchandise
              </SoftTypography>
              <SoftInput
                type="file"
                name="merchandiseFile"
                onChange={handleChange}
                placeholder="Image"
                required={!editData}
              />
            </SoftBox>
            <SoftBox display="flex" flexDirection="column" mb={2}>
              <SoftTypography mb={1} variant="caption" color="black" fontWeight="medium">
                Merchandise Description
              </SoftTypography>
              <SoftTextArea
                name="deskripsi_merchandise"
                minRows={3}
                value={formData.deskripsi_merchandise}
                onChange={handleChange}
                placeholder="Merchandise Description"
              />
            </SoftBox>
            <SoftBox mt={4} mb={1}>
              <SoftButton
                variant="gradient"
                color="dark"
                fullWidth
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : editData ? "Update Merchandise" : "Add Merchandise"}
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </SoftBox>
      </Card>
    </ConfiguratorRoot>
  );
}

export default Configurator;

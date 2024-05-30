import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Custom styles for DashboardNavbar
import Icon from "@mui/material/Icon";
import IconButton from "@mui/material/IconButton";
import { navbarMobileMenu, navbarIconButton } from "examples/Navbars/DashboardNavbar/styles";
import {
  setMiniSidenav,
  useSoftUIController,
  setOpenConfigurator,
  setTransparentNavbar,
} from "context";

import fetchData from "utils";
import Configurator from "examples/Configurator";


function Billing() {
  const [navbarType, setNavbarType] = useState();
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, transparentNavbar, fixedNavbar, openConfigurator } = controller;
  const [openMenu, setOpenMenu] = useState(false);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    // Setting the navbar type
    if (fixedNavbar) {
      setNavbarType("sticky");
    } else {
      setNavbarType("static");
    }

    function handleTransparentNavbar() {
      setTransparentNavbar(dispatch, (fixedNavbar && window.scrollY === 0) || !fixedNavbar);
    }

    window.addEventListener("scroll", handleTransparentNavbar);
    handleTransparentNavbar();
    return () => window.removeEventListener("scroll", handleTransparentNavbar);
  }, [dispatch, fixedNavbar]);

  const handleMiniSidenav = () => setMiniSidenav(dispatch, !miniSidenav);
  const handleConfiguratorOpen = () => {
    setOpenConfigurator(dispatch, !openConfigurator);
    setEditData(null)
  };
  const handleOpenMenu = (event) => setOpenMenu(event.currentTarget);
  const handleCloseMenu = () => setOpenMenu(false);
  
  const handleDelete = async (id) => {
    try {
      const apiUrl = process.env.REACT_APP_TEDX_API_URL;
      const access_api = process.env.REACT_APP_ACCESS_API;
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4ZTcwM2Q1LTJiZWUtNDUxYy1hYWVkLTQ2ZjkyMTQyMmRlNCIsInVzZXJuYW1lIjoiZHJhZGFwIiwiZW1haWwiOiI5QGdtYWlsLmNvbSIsImlhdCI6MTcxNjY3MjY5NSwiZXhwIjoxNzE2NjczMjk1fQ.ZAu98KiyZr4GbsvB2oIDaenJCeIqhLAuLvczUGeZTwU";

      await axios.delete(`${apiUrl}/merchandise/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
          access_api: access_api,
        },
      });

      fetchData(setData, setLoading, setError);
    } catch (error) {
      console.log("Error deleting merchandise", error);
    }
  };
  const handleEdit = (item) => {
    setEditData(item);
    setOpenConfigurator(dispatch, true);
  };


  useEffect(() => {
    fetchData(setData, setLoading, setError);
  }, []);

  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  }

  function numberWithCommas(number) {
    return number.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ".");
  }

  const columns = [
    { name: "image", align: "center" },
    { name: "name", align: "left" },
    { name: "deskripsi", align: "left" },
    { name: "stock", align: "center" },
    { name: "price", align: "left" },
    { name: "action", align: "center" },
  ];

  const rows = data.map((item) => ({
    image: <SoftAvatar src={item.image_merchandiseURL} alt="" size="sm" variant="rounded" />,
    name: (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {item.name}
      </SoftTypography>
    ),
    deskripsi: (
      <SoftBox display="flex" flexDirection="column" maxWidth={700}>
        <SoftTypography variant="caption" fontWeight="medium" color="secondary">
          {item.deskripsi}
        </SoftTypography>
      </SoftBox>
    ),
    stock: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {numberWithCommas(item.stock)}
      </SoftTypography>
    ),
    price: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {formatRupiah(item.price)}
      </SoftTypography>
    ),
    action: (
      <SoftBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
        <SoftBox mr={1}>
          <SoftButton variant="text" color="error" onClick={() => handleDelete(item.id)}>
            <Icon>delete</Icon>&nbsp;delete
          </SoftButton>
        </SoftBox>
        <SoftButton variant="text" color="dark" onClick={() => handleEdit(item)}>
          <Icon>edit</Icon>&nbsp;edit
        </SoftButton>
      </SoftBox>
    ),
  }));

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Merchandise Table</SoftTypography>
              <SoftBox>
                <IconButton
                  size="small"
                  color="inherit"
                  sx={navbarIconButton}
                  onClick={handleConfiguratorOpen}
                >
                  <SoftButton variant="gradient" color="error">
                    Add Merchandise
                  </SoftButton>
                </IconButton>
              </SoftBox>
            </SoftBox>
            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={rows} />
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
      {openConfigurator && (
        <Configurator onRefresh={() => fetchData(setData, setLoading, setError)} editData={editData} />
      )}{" "}
    </DashboardLayout>
  );
}

export default Billing;

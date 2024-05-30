/* eslint-disable react/prop-types */
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";
import Icon from "@mui/material/Icon";

// Data
import { useEffect, useState } from "react";
import axios from "axios";
import SoftAvatar from "components/SoftAvatar";
import SoftButton from "components/SoftButton";

function TransactionMerchandise() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiUrl =
        process.env.REACT_APP_TEDX_API_URL;
      const access_api = process.env.REACT_APP_ACCESS_API;
      const response = await axios.get(`${apiUrl}/transaction/merchandise`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          access_api: access_api,
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0YWFmNjc1LWYxZDktNDYyZi05NDIyLTc2ZDc2Yzk2OTBkNCIsInVzZXJuYW1lIjoiQWRtaW4gVEVEWCBVSUkiLCJlbWFpbCI6ImFkbWluQHRlZHh1aWkuY29tIiwiaWF0IjoxNzE3MDAyMjg4LCJleHAiOjE3MTcwMDI4ODh9.Ae4ZXm55Iun718jj4pU60zB9Sy5JIhQxhPHKPr-3ljg`,
        },
      });
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching posts");
      setLoading(false);
      console.log(error)
    }
  };



  useEffect(() => {
    fetchData();
  }, []);

  function formatRupiah(number) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  }

  const columns = [
    { name: "name", align: "left" },
    { name: "email", align: "left" },
    { name: "address", align: "left" },
    { name: "phone", align: "center" },
    { name: "size", align: "center" },
  ];
  const rows = data.map((item) => {
    const buyerDetails = item.buyer_details[0]; // Mengakses detail pembeli pertama
    return {
      name: (
        <SoftTypography variant="caption" fontWeight="medium" color="text">
          {buyerDetails.username}
        </SoftTypography>
      ),
      email: (
        <SoftBox display="flex" flexDirection="column" maxWidth={500}>
          <SoftTypography variant="caption" fontWeight="medium" color="secondary">
            {buyerDetails.email}
          </SoftTypography>
        </SoftBox>
      ),
      address: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {buyerDetails.address}
        </SoftTypography>
      ),
      phone: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {buyerDetails.phone_number}
        </SoftTypography>
      ),
      size: (
        <SoftTypography variant="caption" color="secondary" fontWeight="medium">
          {item.size ? item.size : null }
        </SoftTypography>
      ),
    };
  });


  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
              <SoftTypography variant="h6">Transactions Merchandise Success</SoftTypography>
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
  );
}

export default TransactionMerchandise;

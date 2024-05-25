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

function Tables() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const apiUrl =
        process.env.REACT_APP_TEDX_API_URL || "https://tedxuiibackend-production.up.railway.app";
      const access_api = process.env.REACT_APP_ACCESS_API || "TEDXUII2024";
      const response = await axios.get(`${apiUrl}/events?sort=desc`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          access_api: access_api,
        },
      });
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      setError("Error fetching posts");
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      const apiUrl = process.env.REACT_APP_TEDX_API_URL;
      const access_api = process.env.REACT_APP_ACCESS_API;
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4ZTcwM2Q1LTJiZWUtNDUxYy1hYWVkLTQ2ZjkyMTQyMmRlNCIsInVzZXJuYW1lIjoiZHJhZGFwIiwiZW1haWwiOiI5QGdtYWlsLmNvbSIsImlhdCI6MTcxNjY3MjY5NSwiZXhwIjoxNzE2NjczMjk1fQ.ZAu98KiyZr4GbsvB2oIDaenJCeIqhLAuLvczUGeZTwU";

      await axios.delete(`${apiUrl}/event/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
          access_api: access_api,
        },
      });

      setData((prevData) => prevData.filter((item) => item.id !== id)); // Update state to remove deleted item
    } catch (error) {
      console.log("Error deleting merchandise", error);
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
    { name: "image", align: "center" },
    { name: "name", align: "left" },
    { name: "deskripsi", align: "left" },
    { name: "price", align: "left" },
    { name: "venue", align: "center" },
    { name: "date", align: "center" },
    { name: "start", align: "center" },
    { name: "end", align: "center" },
    { name: "action", align: "center" },
  ];

  const rows = data.map((item) => ({
    image: <SoftAvatar src={item.imageURL} alt={item.name} size="sm" variant="rounded" />,
    name: (
      <SoftTypography variant="caption" fontWeight="medium" color="text">
        {item.name}
      </SoftTypography>
    ),
    deskripsi: (
      <SoftBox display="flex" flexDirection="column" maxWidth={500}>
        <SoftTypography variant="caption" fontWeight="medium" color="secondary">
          {item.deskripsi}
        </SoftTypography>
      </SoftBox>
    ),
    price: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {formatRupiah(item.price)}
      </SoftTypography>
    ),
    venue: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.venue}
      </SoftTypography>
    ),
    date: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.held_at}
      </SoftTypography>
    ),
    start: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.time_start}
      </SoftTypography>
    ),
    end: (
      <SoftTypography variant="caption" color="secondary" fontWeight="medium">
        {item.time_end}
      </SoftTypography>
    ),
    action: (
      <SoftBox display="flex" alignItems="center" mt={{ xs: 2, sm: 0 }} ml={{ xs: -1.5, sm: 0 }}>
        <SoftButton variant="text" color="dark">
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
              <SoftTypography variant="h6">Events Table</SoftTypography>
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
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;

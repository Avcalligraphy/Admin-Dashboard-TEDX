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



import { Backdrop, CircularProgress } from "@mui/material";
import SoftInput from "components/SoftInput";

function Tables() {

  const [data, setData] = useState([]);
  const [edit, setEdit] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = (item) => {
    setOpen(true);
    setEdit(item)
  };
 const [formData, setFormData] = useState({
   name: "",
   price: "",
   year: "",  
   stock: "",
   venue: "",
   held_at: "",
   eventFile: null,
 });

 useEffect(() => {
   if (open) {
     setFormData({
       name: edit.name || "",
       price: edit.price || "",
       year: edit.year || "",
       stock: edit.stock || "",
       venue: edit.venue || "",
       held_at: edit.held_at || "",
       eventFile: null,
     });
   }
 }, [edit, open]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };


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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Set loading state to true
    try {
      const apiUrl = process.env.REACT_APP_TEDX_API_URL;
      const access_api = process.env.REACT_APP_ACCESS_API;
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijc0YWFmNjc1LWYxZDktNDYyZi05NDIyLTc2ZDc2Yzk2OTBkNCIsInVzZXJuYW1lIjoiQWRtaW4gVEVEWCBVSUkiLCJlbWFpbCI6ImFkbWluQHRlZHh1aWkuY29tIiwiaWF0IjoxNzE3MDExOTE2LCJleHAiOjE3MTcwMTI1MTZ9.EezblIbRWT0dSepH1HVOd1rVi5P4d2RzzDFskCt_fPU";

      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const url = `${apiUrl}/event/150d21c8-5db1-41b6-8eee-dc8febcdab83`;

      const response = await axios.patch(url, formDataToSend, {
        headers: {
          Accept: "*/*",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${access_token}`,
          access_api: access_api,
        },
      });
      

      setFormData({
        name: "",
        price: "",
        year: "",
        stock: "",
        venue: "",
        held_at: "",
        image: null,
      });

      setOpen(false)
      window.location.reload(); 
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Set loading state to false after request is complete
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
        <SoftButton variant="text" color="dark" onClick={() => handleOpen(item)}>
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
      <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open}>
        <Card sx={{ height: "95vh" }}>
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems="baseline"
            pt={3}
            pb={0.8}
            px={3}
          >
            <SoftBox>
              <SoftTypography variant="h5">Update Events</SoftTypography>
              <SoftTypography variant="body2" color="text">
                See our Events
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
              onClick={handleClose}
            >
              close
            </Icon>
          </SoftBox>
          <SoftBox pt={2} pb={3} px={3}>
            <SoftBox component="form" role="form" onSubmit={handleSubmit}>
              <SoftBox mb={1}>
                <SoftTypography variant="caption" color="black" fontWeight="medium">
                  Name
                </SoftTypography>
                <SoftInput
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name"
                  required
                />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftTypography variant="caption" color="black" fontWeight="medium">
                  Price
                </SoftTypography>
                <SoftInput
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  required
                />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftTypography variant="caption" color="black" fontWeight="medium">
                  Stock
                </SoftTypography>
                <SoftInput
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Stock"
                  required
                />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftTypography variant="caption" color="black" fontWeight="medium">
                  Year
                </SoftTypography>
                <SoftInput
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  placeholder="Year"
                  required
                />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftTypography variant="caption" color="black" fontWeight="medium">
                  Venue
                </SoftTypography>
                <SoftInput
                  type="text"
                  name="venue"
                  value={formData.venue}
                  onChange={handleChange}
                  placeholder="Venue"
                  required
                />
              </SoftBox>
              <SoftBox mb={1}>
                <SoftTypography variant="caption" color="black" fontWeight="medium">
                  Date
                </SoftTypography>
                <SoftInput
                  type="text"
                  name="held_at"
                  value={formData.held_at}
                  onChange={handleChange}
                  placeholder="Date"
                  required
                />
              </SoftBox>

              <SoftBox mb={1}>
                <SoftTypography variant="caption" color="black" fontWeight="medium">
                  Image Events
                </SoftTypography>
                <SoftInput
                  type="file"
                  name="eventFile"
                  onChange={handleChange}
                  placeholder="Image"
                  required={!edit}
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
                  {isLoading ? "Loading..." : "Edit Events"}
                </SoftButton>
              </SoftBox>
            </SoftBox>
          </SoftBox>
        </Card>
      </Backdrop>
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
    </DashboardLayout>
  );
}

export default Tables;

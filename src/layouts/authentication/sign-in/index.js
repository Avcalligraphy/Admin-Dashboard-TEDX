import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Switch from "@mui/material/Switch";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import curved9 from "assets/images/curved-images/curved-6.jpg";
import { useSignIn } from "react-auth-kit";
import axios from "axios";
import Cookies from "js-cookie";

function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const signIn = useSignIn();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const apiUrl = process.env.REACT_APP_TEDX_API_URL;
      const access_api = process.env.REACT_APP_ACCESS_API;
      const access_token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImU4ZTcwM2Q1LTJiZWUtNDUxYy1hYWVkLTQ2ZjkyMTQyMmRlNCIsInVzZXJuYW1lIjoiZHJhZGFwIiwiZW1haWwiOiI5QGdtYWlsLmNvbSIsImlhdCI6MTcxNDc5ODQyMCwiZXhwIjoxNzE0Nzk5MDIwfQ.hAUYPJ6ODjeAK8GmoGBOwXRRHu0FL1IeXZIQsK_5gKg";

      const response = await axios.post(`${apiUrl}/login`, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
          access_api: access_api,
        },
        withCredentials: true,
      });

      console.log(response);

     const allCookies = document.cookie;
     console.log("cookies", allCookies);

      // signIn({
      //   token: response.data.token,
      //   expiresIn: 3600,
      //   tokenType: "Bearer",
      //   authState: { email: formData.email },
      // });
      // navigate("/dashboard");
    } catch (error) {
      setError("User tidak ditemukan atau email salah");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CoverLayout
      title="Welcome back"
      description="Enter your email and password to sign in"
      image={curved9}
    >
      <SoftBox onSubmit={handleSubmit} component="form" role="form">
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Email
            </SoftTypography>
          </SoftBox>
          <SoftInput
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </SoftBox>
        <SoftBox mb={2}>
          <SoftBox mb={1} ml={0.5}>
            <SoftTypography component="label" variant="caption" fontWeight="bold">
              Password
            </SoftTypography>
          </SoftBox>
          <SoftInput
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </SoftBox>
        <SoftBox mt={4} mb={1}>
          <SoftButton variant="gradient" color="info" type="submit" fullWidth>
            sign in
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </CoverLayout>
  );
}

export default SignIn;

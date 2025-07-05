import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './Form.css';

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Minimum 6 characters").required("Password is required"),
  });

  // const handleSubmit = async (values, { setSubmitting }) => {
  //   try {
  //     const res = await API.post("/auth/login", values);
  //     localStorage.setItem("user", JSON.stringify(res.data.user)); 
  //     login(res.data);
  //     navigate("/dashboard");
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Login failed");
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (values, { setSubmitting }) => {
  try {
    const res = await API.post("/auth/login", values);
    const user = res.data.user;

    // Save user in localStorage
    localStorage.setItem("user", JSON.stringify(user)); 

    // Call login context method
    login(res.data);

    // Redirect based on email
    if (user.email === "mariakamboh@gmail.com") {
      navigate("/admin");
    } else {
      navigate("/dashboard");
    }
  } catch (err) {
    alert(err.response?.data?.message || "Login failed");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <Field className="auth-input" name="email" placeholder="Email" />
            <ErrorMessage name="email" component="div" className="error" />

            <Field className="auth-input" name="password" placeholder="Password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button className="auth-button" type="submit">Login</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;

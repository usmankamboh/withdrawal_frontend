import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import './Form.css';

const Register = () => {
  const navigate = useNavigate();

  const initialValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object({
  name: Yup.string()
    .matches(/^[A-Za-z ]+$/, "Name can only contain letters and spaces")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

 const handleSubmit = async (values, { setSubmitting }) => {
  console.log("Trying to register:", values); // 👈 add this

  try {
    const res = await API.post("/auth/register", values);
    console.log("Success:", res.data); // 👈 add this
    alert("Registered successfully! Now login.");
    navigate("/login");
  } catch (err) {
    console.error("Error:", err); // 👈 full error
    alert(err.response?.data?.message || "Registration failed");
  } finally {
    setSubmitting(false);
  }
};
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
          <Form>
            <Field className="auth-input" name="name" placeholder="Name" />
            <ErrorMessage name="name" component="div" className="error" />

            <Field className="auth-input" name="email" placeholder="Email" type="email" />
            <ErrorMessage name="email" component="div" className="error" />

            <Field className="auth-input" name="password" placeholder="Password" type="password" />
            <ErrorMessage name="password" component="div" className="error" />

            <button className="auth-button" type="submit">Register</button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Register;

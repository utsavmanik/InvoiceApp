import axios from "axios";
import { Form, Formik, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";

const SignUpForm = () => {
  const navigate = useNavigate();
  const [successMsg,setSuccessMsg]=useState()
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = (values) =>
    Yup.object({
      email: Yup.string().required("Email is required").email("Invalid Email"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password should be 6 characters long"),
    });
  const onSubmit = async (values) => {
    //const {confirmPassword,...data}=values fetching email & password in data to post in api,
    //but our form has no confirm password we can use values directly
    const response = await axios
      .post("http://127.0.0.1:8000/api/user/signup/", values)
      .catch((err) => {
        if (err && err.response) console.log("Error:", err);
      });
      if (response && response.data)
        setSuccessMsg(response.data.msg)

    /*  fetch('http://127.0.0.1:8000/api/user/signup/', {
      method: 'POST',
      body: JSON.stringify(userdetails),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => navigate('/')) */
  };
  return (
    <div className="container">
      <div className="row">
        <div className="wrapper">
          <h1>Registration</h1>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnMount
          >
            {(formik) => {
              return (
                
                <Form>
                     <span>
                     {successMsg?<small className="text-danger">{successMsg}</small>:""}
                    </span>
                  <div className="form-group">
                    <label htmlFor="">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                    ></Field>
                    <ErrorMessage name="email">
                      {(errorMessage) => (
                        <small className="text-danger">{errorMessage}</small>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="form-group">
                    <label htmlFor="">Password</label>
                    <Field
                      type="text"
                      name="password"
                      className="form-control"
                    ></Field>
                    <ErrorMessage name="password">
                      {(errorMessage) => (
                        <small className="text-danger">{errorMessage}</small>
                      )}
                    </ErrorMessage>
                  </div>
                  <input
                    type="submit"
                    className="btn btn-warning"
                    disabled={!formik.isValid}
                  />
                </Form>
              );
            }}
          </Formik>
          <p className="text-center">
            Existing User?<Link to="/">Click Here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignUpForm;

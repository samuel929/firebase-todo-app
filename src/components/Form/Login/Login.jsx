import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { Form, Button, Divider, Header } from "semantic-ui-react";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import { auth } from "../../../util/firebase";
import { signInWithEmailAndPassword ,signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { setUser} from "../../../slices/userSlice";
import { useDispatch } from "react-redux";
import { provider } from "../../../util/firebase";

// Define validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
    )
    .required("Password is required"),
});

// Define the form component
const Login = () => {
    const [isLoading,setIsLoading] =useState(false);
  const history = useNavigate();
  const dispatch = useDispatch()
  const initialValues = {
    email: "",
    password:""
  };

  // Define form submission handler
  const onSubmit = async (values) => {
  setIsLoading(true);
 await signInWithEmailAndPassword(auth, values.email, values.password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    dispatch(setUser(user));
    toast.success("User successffuly Logged in");
    history('/');
  })
  .catch((error) => {
    toast.error("Failed to login user");
  }).finally(()=>{
    setIsLoading(false)
  })
  };

  const signInWithGoogle= () =>{
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      dispatch(setUser(user));
      toast.success("User successffuly Logged in");
      history('/');
      // IdP data available using getAdditionalUserInfo(result)
    }).catch((error) => {
      // Handle Errors here.
      toast.error("Failed to login user");
      // ...
    });
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {({ errors, setFieldValue, handleSubmit, touched }) => (
        <div className="flex-center-container" style={{  paddingTop: "150px"}}>
        
        <Form
        onSubmit={handleSubmit}
        >
            <div style={{textAlign:'center'}}>
            <Header as='h1'>Welcome Back TaskMaster</Header>

            </div>
        <Button onClick={()=>signInWithGoogle()} className="google-button">
         <FcGoogle size={30}/>
         <p style={{position:"relative",left:"13%", top:"5px"}}>Log in with Google</p>
         </Button>
         <div>
         <Divider horizontal>

       <p> OR LOGIN WITH EMAIL</p>

    </Divider>
         </div>
          <Form.Field>
            <Form.Input
              placeholder="Email"
              name="email"
              label='Email'
              className="input-login"
              onChange={(event) => {
                setFieldValue("email",event.target.value)
              }}
            />
            {errors.email && touched.email ? 
             (
             <div>
                <p className="error-form">{errors.email}</p>
             </div>
             ) : null
           }
          </Form.Field>
          <Form.Field>
            <Form.Input
            placeholder="Password" 
            type="password"
            name="password"
            label='Password'
            className="input-login"
            onChange={(e)=>{
                setFieldValue("password",e.target.value)
            }}
            />
             {errors.password && touched.password ? 
             (
             <div>
                <p className="error-form">{errors.password}</p>
             </div>
             ) : null
           }
          </Form.Field>
          <div className="forgot-password-container">
          <Link className="login-register-link-color" to="/reset">Forgot password</Link>
          </div>
          <div className="flex-center-container">
          <Button 
          loading={isLoading}
          className="button-login" type="submit">Submit</Button>

          </div>
          <Divider/>
          <p className="already-have-account-text">Don't have an account yet?  <Link className="login-register-link-color" to="/register">Sign up</Link></p>
        </Form>
        </div>
      )}
    </Formik>
  );
};

export default Login;

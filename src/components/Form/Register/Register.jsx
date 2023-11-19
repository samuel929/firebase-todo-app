
import React,{useState} from "react";
import { Formik,} from "formik";
import * as Yup from "yup";
import { Form, Button, Divider, Header } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword, updateProfile  } from "firebase/auth";
import { auth } from "../../../util/firebase";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
// Define validation schema using Yup
const validationSchema = Yup.object({
  username:Yup.string().required("Username is required"),
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
const Register = () => {
  const [loading,setIsLoading] = useState(false);
  const history = useNavigate();
  const initialValues = {
    username:"",
    email: "",
    password:""
  };

  // Define form submission handler
  const onSubmit = async (values) => {
    setIsLoading(true);
  await createUserWithEmailAndPassword(auth, values.email, values.password)
   .then((userCredential) => {
    // Signed up 
    updateProfile(userCredential.user, {
        displayName: values.username,
    });
    history('/login');
    toast.success("User successfully created.");
  })
  .catch((error) => {
    toast.error("Failed to create user.");
  }).finally(()=>{
    setIsLoading(false);
  })

  };

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
            <Header as='h1'>Welcome To TaskMaster</Header>
            <Header as='h1'>Register</Header>
            </div>
          <Form.Field>
          <Form.Input
              placeholder="Username"
              name="username"
              label='Username'
              className="input-login"
              onChange={(event) => {
                setFieldValue("username",event.target.value)
              }}
            />
            {errors.username && touched.username ? 
             (
             <div>
                <p className="error-form">{errors.username}</p>
             </div>
             ) : null
           }
          </Form.Field>
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

          <div className="flex-center-container">
          <Button 
          loading={loading}
          className="button-login" type="submit">Submit</Button>

          </div>
          <Divider/>
          <p className="already-have-account-text">Already have an account? <Link className="login-register-link-color" to="/login"> Login</Link></p>
        </Form>
        </div>
      )}
    </Formik>
  );
};

export default Register;
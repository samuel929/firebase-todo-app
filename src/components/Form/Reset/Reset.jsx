import React,{useState} from 'react'
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../../../util/firebase';
import { Form, Button, Divider, Header } from "semantic-ui-react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Reset() {
    const [isLoading,setIsLoading] =useState(false);
    const history = useNavigate();
    const validationSchema = Yup.object({
        email: Yup.string()
          .email("Invalid email address")
          .required("Email is required")
      });
    const initialValues = {
      email:''
    }

    const onSubmit = async (values) => {
      setIsLoading(true);
      sendPasswordResetEmail(auth, values.email)
      .then(() => {
        // Password reset email sent!
        toast.success("Password reset email sent!");
        history("/login");
      })
      .catch((error) => {
        toast.error("Email failed to send.");
      }).finally(()=>{
       setIsLoading(false)
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
          <Header as='h1'>Reset Password</Header>

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

        <div className="flex-center-container">
        <Button 
        loading={isLoading}
        className="button-login" type="submit">Submit</Button>
        </div>
      </Form>
      </div>
    )}
  </Formik>
  )
}

export default Reset
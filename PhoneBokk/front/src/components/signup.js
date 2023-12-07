import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './signup.css'
import { Container } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Link ,useHistory } from 'react-router-dom/cjs/react-router-dom';
import * as Yup from "yup";
// import { useState } from 'react';


const SignupSchema = Yup.object().shape({
  fname: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('please enter first name'),
  lname: Yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('please enter Last name'),
  contact: Yup.number()
    .required('please enter Contact number'),
  uname: Yup.string()
    .required('please enter Username'),
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('No password provided.')
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    
  });

function Signup() {
  const history = useHistory()
  return (
    <>
      <div className="signup">
        <Container>

          <Formik
            initialValues={{
              fname: '',
              lname: '',
              uname: '',
              contact: '',
              email: '',
              password: ''
            }}
            validationSchema={SignupSchema}
            onSubmit={async (values,action) => {
              // console.log(values);
              axios.post('http://localhost:3001/user/signup', values)
                .then((res) => {
                  console.log(res);
                  history.push('/')
                  action.resetForm()
                })
                .catch((error) => {
                  console.log(error);
                })

            }}
          >
            <Form>
              <div className="form text-center">
                <div>
                  <label className='me-3' htmlFor="fname">First Name</label>
                  <Field id="fname" name="fname" placeholder="First name" />
                  <ErrorMessage name='fname' />
                </div>

                <div>
                  <label className='me-3' htmlFor="lname">Last Name</label>
                  <Field id="lname" name="lname" placeholder="Last name" />
                  <ErrorMessage name='lname' />
                </div>

                <div>
                  <label className='me-3' htmlFor="contact">Contact</label>
                  <Field id="contact" name="contact" placeholder="contact" />
                  <ErrorMessage name='contact' />
                </div>

                <div>
                  <label className='me-3' htmlFor="uname">Username</label>
                  <Field id="uname" name="uname" placeholder="Username" />
                  <ErrorMessage name='uname' />
                </div>

                <div>
                  <label className='me-3' htmlFor="email">Email</label>
                  <Field
                    id="email"
                    name="email"
                    placeholder="email ID"
                    type="email"
                  />
                  <ErrorMessage name='email' />
                </div>

                <div>
                  <label className='me-3' htmlFor="password">Password</label>
                  <Field id="password" type='password' name="password" placeholder="password" />
                  <ErrorMessage name='password' />
                </div>

                <div>
                <button className='mt-5' type="submit">Submit</button>
                </div>

                <div className='mt-5 new'>
                  <p>Already have account? <Link to='/'>Signin!</Link> </p>
                </div>

              </div>

            </Form>
          </Formik>
        </Container>
      </div>
    </>
  )
}

export default Signup
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './signin.css'
import { Container } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import { Link , useHistory} from 'react-router-dom/cjs/react-router-dom.min';
import * as Yup from "yup";
import axios from 'axios';


const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Required'),
  password: Yup.string()
    .required('No password provided.')
  });

function Signin() {
  const history = useHistory()

  return (
    <>
      <div className="signin">
        <Container>
          
            <Formik
              initialValues={{
                email: '',
                password : ''
              }}
              validationSchema={SigninSchema}
              onSubmit={async (values,action) => {
                console.log(values);
                axios.post('http://localhost:3001/user/signin', values)
                .then((res) => {
                  // console.log(res);
                  localStorage.setItem('token' , res.data.token)
                  history.push('/contact')
                  action.resetForm()
                })
                .catch((error) => {
                  console.log(error);
                })

              }}
            >
              <Form>
              <div className="Sform text-center">
                <div>
                <label className='me-3' htmlFor="email">Email :</label>
                <Field
                className='ms-5'
                  id="email"
                  name="email"
                  placeholder="email ID"
                  type="email"
                />
                <ErrorMessage name='email' />
                </div>
                <div>
                <label className='me-3' htmlFor="password">Password :</label>
                <Field className='ms-3' type='password' id="password"  name="password" placeholder="password" />
                <ErrorMessage name='password' />
                </div>

                <div>
                <button className='mt-5' type="submit">Signin</button>
                </div>
                <div className='mt-5 new'>
                  <p>New Register? <Link to= '/signup'>Signup</Link> </p>
                </div>
          </div>

              </Form>
            </Formik>
        </Container>
      </div>
    </>
  )
}

export default Signin
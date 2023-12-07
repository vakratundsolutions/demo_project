import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import './contact.css'
import { Container } from 'react-bootstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from "yup";
import axios from 'axios';



const contactSchema = Yup.object().shape({
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
  city: Yup.string()
    .required('please enter Cityname'),
  country: Yup.string()
    .required('please enter countryname')
});

function Contact() {
  const [data, setData] = useState([])
  const [initialValues, setInitialValues] = useState({
    fname: '', lname: '', city: '', contact: '',
    country: ''
  })

  const getData = () => {
    let token = localStorage.getItem('token')
    axios.get('http://localhost:3001/phonebook/allcontact', {
      headers: { authorization: token }
    })
      .then((res) => {
        console.log(res);
        setData(res.data.data)
      })
      .catch((error) => {
        console.log(error);
      })
  }
  useEffect(() => {
    getData()
  }, [])

  const updateHadler = (id) => {
    console.log(id);
    setInitialValues(data[id])  
  }
  const deleteHandler = (id) => {
    // const id = data.id
    const token = localStorage.getItem('token')
    axios.delete(`http://localhost:3001/phonebook/deletecontact/${id}`, {
      headers: { authorization: token }
    })
      .then((res) => {
        console.log(res);
        getData()

      })
      .catch((error) => {
        console.log(error);
      })
  }

  return (
    <>
      <div className="signup">
        <Container>
          <Formik
            initialValues={initialValues}
            validationSchema={contactSchema}
            enableReinitialize
            onSubmit={async (values, action) => {
              console.log(values);
              if (initialValues && initialValues._id) {
                const token = localStorage.getItem('token')
                // console.log(token);
                axios.put(`http://localhost:3001/phonebook/editcontact/${initialValues._id}`, values, {
                  headers: { authorization: token }
                })
                
                .then((res) => {
                  // console.log(res);
                  getData()
                  action.resetForm()
                  setInitialValues({
                    fname: '', lname: '', city: '', contact: '',
                    country: ''
                  })
                })
                .catch((error) => {
                  console.log(error);
                })
                
              }else{
                const token = localStorage.getItem('token')
              axios.post('http://localhost:3001/phonebook/create', values, {
                headers: { authorization: token }
              })
                .then((res) => {
                  console.log(res);
                  getData()
                  // action.resetForm()
                })
                .catch((error) => {
                  console.log(error);
                })
              }
              action.resetForm()
          }}
          > 
            <Form>
              <div className="Cform text-center">
                <div>
                  <label className='me-3' htmlFor="fname">First Name</label>
                  <Field className='ms-5' id="fname" name="fname" placeholder="First name" />
                  <ErrorMessage name='fname' />
                </div>
                <div>
                  <label className='me-3' htmlFor="lname">Last Name</label>
                  <Field className='ms-5' id="lname" name="lname" placeholder="Last name" />
                  <ErrorMessage name='lname' />
                </div>
                <div>
                  <label className='me-3' htmlFor="contact">Contact</label>
                  <Field className='ms-5' id="contact" name="contact" placeholder="contact" />
                  <ErrorMessage name='contact' />
                </div>
                <div>
                  <label className='me-3' htmlFor="uname">City</label>
                  <Field className='ms-5' id="city" name="city" placeholder="Username" />
                  <ErrorMessage name='city' />
                </div>
                <div>
                  <label className='me-3' htmlFor="country">Country</label>
                  <Field className='ms-4' id="country" name="country" placeholder="country" />
                  <ErrorMessage name='country' />
                </div>
                <div>
                  <button className='mt-5' type="submit">Submit</button>
                </div>
              </div>

            </Form>
          </Formik>
        </Container>

      </div>
      <div className="data">
        <table border={2}>
          <tr>
            <th>No.</th>
            <th>FistName</th>
            <th>LastName</th>
            <th>Contact</th>
            <th>City</th>
            <th>Country</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
          {
            data.map((el, id) => {
              return <tr>
                <td>{id + 1}</td>
                <td>{el.fname}</td>
                <td>{el.lname}</td>
                <td>{el.contact}</td>
                <td>{el.city}</td>
                <td>{el.country}</td>
                <td><button onClick={() => updateHadler(id)}>Edit</button></td>
                <td><button onClick={() => deleteHandler(el._id)}>Delete</button></td>
              </tr>
            })
          }
        </table>
      </div>
    </>
  )
}

export default Contact


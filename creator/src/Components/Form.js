import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as yup from "yup";

yup.object().shape({
    name: yup
      .string()
      .required("name is required")
      .min(3, "name must be 3 character"),
    email: yup
      .string()
      .email("must be a valid email address")
      .required("email is required"),
  });




export default function Form(props) {
    const [users, setUsers] = useState([])
    const [formState, setFormState] = useState({
    
        name: '',
        email: '',
        password: '',
        terms: false,


    });
    const getUsers = () => {
        axios
        .get('https://reqres.in/api/users')
        .then((res) =>{
            console.log(res);
            setUsers(res.data.data);
        })
        .catch((error) => {
            debugger;
            console.log(error)
            alert('Oops! We have a problem.')
        });
    };

    const postNewUser = (newUser) => {
    axios
    .post('https://reqres.in/api/users', newUser)
    .then((res) => {
      setFormState({

        name: '',
        email: '',
        password: '',
        terms: false,


    });
    setUsers({
        name: formState.name,
        email: formState.email,
        password: formState.password,
    })
    })
    .catch((err) => {
      console.log(err);
    });
}


useEffect(() => {
    getUsers();
}, []);

    const formSubmit = e => {
        e.preventDefault();              
        console.log('Form Submitted!');
        postNewUser()
    

    };

    const inputChange = e => {
    const value = e.target.type === 'checkbox' ? e.target.checked: e.target.value;
    setFormState({ ...formState, [e.target.name]: value });
    };



    return (
        <div>
        <form className='form-container' onSubmit={formSubmit}>
            <label>
                Name
                <input 
                type='text' 
                name='name' 
                placeholder='name'
                value={formState.name}
                onChange={inputChange}/>
            </label>
            <label>
                Email
                <input 
                type='email' 
                name='email' 
                placeholder='Email' 
                value={formState.email}
                onChange={inputChange}/>
            </label>
            <label>
                Password
                <input 
                type='password' 
                name='password' 
                placeholder='Password'
                value={formState.password}
                onChange={inputChange}/>
            </label>
            <label>
                I have read the Terms and Conditions
                <input 
                type='checkbox' 
                name='terms'
                checked={formState.terms}
                onChange={inputChange} />
            </label>
            <button>Submit</button>
        </form>
        <div>
            <h3>Received Response:</h3>
        </div>
        <div style={{ color: 'cyan'}}>
            <div>
                <strong>Name: <span style={{ color: '#121212'}}>{users.name}</span></strong>
            </div>
            <div>
                <strong>Email: <span style={{ color: '#121212'}}>{users.email}</span></strong>
            </div>
            <div>
                <strong>Password: <span style={{ color: '#121212'}}>{users.password}</span></strong>
            </div>
            <div>
                <strong>Did user agree to TOS?: <span style={{ color: '#121212'}}>{users .terms}</span></strong>
            </div>
        </div>
        </div>
    );
}
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";

const endpoint = "http://localhost:3005"

const EditProduct = () => {
    const [name, setName] = useState('')
    const [lastName, setlastName] = useState('')
    const [address, setAddress] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [status, setStatus] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()


const update = (e) => {
    e.preventDefault()
    await axios.put(`${endpoint}${id}`, {
        name: name, 
        lastName: lastName,
        address: address,
        phone: phone,
        email: email,
        status: status

    })
    navigate('/')

}

    useEffect( () =>{
        const getUsersById = async => {
           const response = axios.get(`${endpoint}${id}`)
        }

    }, [] )
    return (
        <div>
            edit
        </div>
    )
};


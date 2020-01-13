import React, { Component } from 'react';
import './../App.css'
import axios from 'axios';
import { Table, Button, Modal, ModalBody, Form, FormGroup, Label, Input } from 'reactstrap';

const URL = "http://localhost:3000/users/";


export default class Employee extends Component {
    constructor(props) {
        super(props)
        this.state = {
            empdata: [],
            name: '',
            email: '',
            age:'',
            isOpen: false,
            isEdit: false
        }
       
    }

    // Loading employee data
    componentDidMount() {
        axios.get(URL)
            .then(res => { this.setState({ empdata: res.data }) })
            .catch(err => { console.log(err) })
    }

    // Adding user to table
    addUSer(e) {
        e.preventDefault();
        if (this.state.name === '' || this.state.email === '' || this.state.age==='') {
            alert("Please enter the data");
            return false;
        }
        axios.post(URL, {
            name: this.state.name,
            email: this.state.email,
            age:this.state.age
        })
            .then(() => { return axios.get(URL) })
            .then(res => this.setState({ empdata: res.data, name: '', email: '', age:'',isOpen: false, isEdit: false }))
            .catch(err => { console.log(err) })

    }

    // handling name and email
    handleName(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    // handling Modal
    handleToggle() {
        this.setState({ isOpen: !this.state.isOpen })
    }

    editUSer(item) {
        axios.put(`http://localhost:3000/users/${item.id}`, {
            name: item.name,
            email: item.email,
            age:item.age
        })
            .then(() => { return axios.get(URL) })
            .then(res => this.setState({ empdata: res.data, name: item.name, email: item.email,age:item.age, isOpen: !this.state.isOpen, isEdit: !this.state.isEdit }))
            .catch(err => { console.log(err) })
    }

    // deleting user from table
    deleteUser(id) {
        axios.delete(`${URL}${id}`)
            .then(() => { return axios.get(URL) })
            .then(res => this.setState({ empdata: res.data }))
            .catch(err => { console.log(err) })
    }



    render() {
        const { empdata, isOpen, name, age,email, isEdit } = this.state;
        return (
            <div className="App">
                <Button color="primary" onClick={this.handleToggle.bind(this)}>Add User</Button> <br />
                <Modal isOpen={isOpen} toggle={this.handleToggle.bind(this)}>
                    <ModalBody>
                        <Form>  
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input type="text" name="name" placeholder="Enter your Name" value={name} onChange={this.handleName.bind(this)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="age">Age</Label>
                                <Input type="number" name="age" placeholder="Enter your Age" value={age} onChange={this.handleName.bind(this)} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="email">Email</Label>
                                <Input type="email" name="email" placeholder="Enter your Mail ID" value={email} onChange={this.handleName.bind(this)} />
                            </FormGroup>
                        </Form>
                        <Button color="primary" onClick={this.addUSer.bind(this)}>{isEdit === false ? 'Add' : 'Update'}</Button>
                        <Button className="ml-3" color="danger" onClick={this.handleToggle.bind(this)} >Cancel</Button>
                    </ModalBody>
                </Modal>
                <br />
                <h4>Employee List </h4>
                <Table striped responsive> 
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Email</th>
                            <th>Edit / Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empdata.map((item, i) => {
                            return (
                                <tr key={item.id}>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.name}</td>
                                    <td>{item.age}</td>
                                    <td>{item.email}</td>
                                    <td>
                                        <Button className="mr-3" color="warning" onClick={this.editUSer.bind(this,item)}>Edit</Button>
                                        <Button color="danger" onClick={this.deleteUser.bind(this,item.id)}>Delete</Button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
            </div>
        )
    }
}

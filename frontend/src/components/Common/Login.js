import React, {Component} from 'react';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import  './login.css';

 

export default class Login extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }

        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.addUser = this.addUser.bind(this);
    }

    onChangeEmail(event){
        this.setState({ email: event.target.value })
    }

    onChangePassword(event){
        this.setState({ password: event.target.value })
    }

    addUser(event) {
        event.preventDefault();
        const userAdd = {
            email: this.state.email,
            password: this.state.password
            // type: this.state.type
        }
        console.log(userAdd)
        axios.post('http://localhost:4000/user/login', userAdd)
        .then(res => { 
            var temper = bcrypt.compareSync(userAdd.password,res.data.password);
            console.log(res);
            if (res.data.email===userAdd.email && temper) {
                alert("hii");
                console.log(res.data);
                localStorage.setItem('user_type', res.data.type);
                localStorage.setItem('user_name', res.data.name);
                localStorage.setItem('user_id',res.data._id);
                localStorage.setItem('isloggedin',true);
                localStorage.setItem('user_email', res.data.email);
                if(res.data.type == 'applicant'){
                    const temp = {
                        applicant_ka_email: res.data.email
                    };
                    axios.post('http://localhost:4000/applicant/get_an_applicant_by_email', temp).then((res) => {
                    console.log(res.data, 'is the data');    
                    localStorage.setItem('user_image', res.data.image);
                        console.log("this is the image we wanted ", localStorage.getItem('user_image'));
                        window.location = '/';

                    }).catch(err => {
                        console.log(res);
                        console.log(err);
                    });
                } else {
                    window.location = '/';
                }
                // this.props.history.push("/");
            }
            else {
                alert("Invalid Password")
            }  
        })
        .catch(err => { 
            alert("user not found");
            console.log(err) 
        });
    }
    

    render() {
        return (
             < div className="login">
                <div className="quote"> Login Page</div>  
                <form onSubmit={this.addUser} method="user">
                <div className="hero-text">
               
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label text-left">Email: </label>
                        <div className="col-sm-9" style={{marginLeft:"10px"}}>
                            <input type="text" className="form-control" onChange={this.onChangeEmail} name="name" value={this.state.email}/>
                        </div>
                    </div>
                    <div className="form-group row" >
                        <label className="col-sm-2 col-form-label text-left">Password: </label>
                        <div className="col-sm-9" style={{marginLeft:"10px"}}>
                            <input type="password" className="form-control" onChange={this.onChangePassword} name="password" value={this.state.password}/>
                        </div>
                    </div>
                    <hr/>
                    <div style={{marginLeft: "140px"}} className="row">
                        <button type="submit" className="btn btn-warning" style={{marginLeft: "0px"}}>Login</button>
                    </div>
                    <div ><br></br>
                    <Link to="/register" className="nav-link" style={{color:"black"}}>Don't have a account? SignUp</Link>  
                    </div>
                    </div>
                </form>
                </div>
              
        )
    }
}
import React, {Component} from 'react';
import axios from 'axios';
// import TextField from 'material-ui/TextField';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import Paper from 'material-ui/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export default class Register extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            emailerrortext: '',
            confirmPasswordErrorText: '',
            type: '',
            date:null
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangetype = this.onChangetype.bind(this);
    }
    
    validateEmail(e) {
        // regex from http://stackoverflow.com/questions/46155/validate-email-address-in-javascript
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(e);
    } 

    onChangeEmail(event){
        var errortext=''
        if(!this.validateEmail(event.target.value)){
            errortext="email not excepted"
        }
        this.setState({ emailerrortext: errortext , email: event.target.value })
    }

    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangePassword(event){
        this.setState({ password: event.target.value });
    }

    onChangeConfirmPassword(event){
        var errortext = ''
        if(event.target.value != this.state.password){
            errortext = 'password are not matched'
        }
        this.state({ confirmPassword: event.target.value , confirmPasswordErrorText: errortext });
    }

    onChangetype(event){
        this.setState({ type: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();
        if((this.state.confirmPasswordErrorText=='' && this.state.emailerrortext=='') && (this.state.password.length>=6)){   
            const newUser = {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                type: this.state.type,
                date: Date.now()
            }
            if(this.state.type === "recruiter"){
                console.log("lololol");
                axios.post('http://localhost:4000/router/recruiter/add', newUser)
                .then(res => {alert("Created\t" + res.data.name);console.log(res.data)
                })
                .catch(err => { 
                    console.log(err) 
                });
            }
            else{
                axios.post('http://localhost:4000/router/applicant/add', newUser)
                .then(res => {alert("Created\t" + res.data.name);console.log(res.data)
                })
                .catch(err => { 
                    console.log(err) 
                });
            }
            axios.post('http://localhost:4000/router/user/add', newUser)
        }
        else if(this.state.password.length<6){
            alert("password length should be atleast 6");console.log("short password");
        }
        else{
            alert("email format is wrong");console.log("email format is wrong");
        }
        this.setState({
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            // emailerrortext: '',
            // confirmPasswordErrorText: '',
            type: '',
            date:null
        });
    }

    render() {
        return (
            <Container  component="main" maxWidth="xs">
                <CssBaseline /> 
                <div className="form-group"/>
                {/* </div>                */}
                <div style={{paddingLeft:170}}>              
                    <Avatar />                    
                    {/* </Avatar>  */}
                </div>
                <div>
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Username: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.name}
                                onChange={this.onChangeUsername}
                                />
                        </div>
                        <div className="form-group">
                            <label>Email: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.email}
                                onChange={this.onChangeEmail}
                                />  
                        </div>
                        <div className="form-group">
                            <label>Password: </label>
                            <input type="text" 
                                className="form-control" 
                                value={this.state.password}
                                onChange={this.onChangePassword}
                                />  
                        </div>
                        <div className="form-group">
                            <label>Type</label>
                            <div className="form-group">
                                <p>(don't be lazy and do not think applicant is selected so you dont have to select that.)</p>
                                {/* <br></br> */}
                                <select className="form-control"  onChange={this.onChangetype} value={this.state.type}>
                                    <option value="0">pick type</option>
                                    <option value="applicant">applicant</option>
                                    <option value="recruiter">recruiter</option>
                                </select>
                            </div>
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Register" className="btn btn-primary"/>
                        </div>
                    </form>
                </div>
            </Container>
        )
    }
}
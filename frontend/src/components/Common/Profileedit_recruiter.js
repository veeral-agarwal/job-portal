import React, {Component} from 'react';
import axios from 'axios';
// import React, {Component} from 'react';
// import axios from 'axios';
import bcrypt from 'bcryptjs';
// import TextField from 'material-ui/TextField';
// import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
// import Paper from 'material-ui/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


export default class Profileedit_recruiter extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
         
            bio:'',
            contact_number:'',
            name:''
        }
        // this.onChangetitle = this.onChangetitle.bind(this);
        // this.onChangemax_applications = this.onChangemax_applications.bind(this);
        // this.onChangemax_positions = this.onChangemax_positions.bind(this);
        // this.onChangedeadline_of_application = this.onChangedeadline_of_application.bind(this);
        // this.onChangerequired_skills = this.onChangerequired_skills.bind(this);
        // this.onChangetype_of_job = this.onChangetype_of_job.bind(this);
        // this.onChangeduration = this.onChangeduration.bind(this);
        // this.onChangesalary_per_month = this.onChangesalary_per_month.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangebio = this.onChangebio.bind(this);
        this.onChangecontact_number = this.onChangecontact_number.bind(this);
        this.onChangename = this.onChangename.bind(this);
    }
    
    onChangebio(event) {
        this.setState({ bio: event.target.value });
    }

    onChangecontact_number(event) {
        this.setState({ contact_number: event.target.value });
    }

    onChangename(event){
        this.setState({name : event.target.value});
    }

    // onChangemax_positions(event) {
    //     this.setState({ max_positions: event.target.value });
    // }

    // onChangedeadline_of_application(event) {
    //     this.setState({ deadline_of_application: event.target.value });
    // }

    // onChangerequired_skills(event) {
    //     this.setState({ required_skills: event.target.value });
    // }   

    // onChangetype_of_job(event) {
    //     this.setState({ type_of_job: event.target.value });
    // }

    // onChangeduration(event) {
    //     this.setState({ duration: event.target.value });
    // }

    // onChangesalary_per_month(event) {
    //     this.setState({ salary_per_month: event.target.value });
    // }
    componentDidMount()
    {   
        console.log(localStorage)
        var mail=localStorage.getItem("user_email")
        console.log(mail)
        axios.post('http://localhost:4000/recruiter/get_a_recruiter_by_email',{"email":mail})
        .then(res => {this.setState({user:res.data})
        console.log(this.state.user)
        this.setState({name:this.state.user.name})
        this.setState({email:this.state.user.email})
        this.setState({bio:this.state.user.bio})
        this.setState({contact_number:this.state.user.contact_number})
    })
    };

    onSubmit(e) {
        e.preventDefault();

        const newrec = {
            // title: this.state.title,
            // max_applications: this.state.max_applications,
            // max_positions:  this.state.max_positions,
            // deadline_of_application: Date(this.state.deadline_of_application),
            // required_skills: this.state.required_skills,
            // type_of_job: this.state.type_of_job,
            // duration: this.state.duration,
            // salary_per_month: this.state.salary_per_month,
            // name_recruiter: localStorage.getItem('user_name'),
            // email_recruiter: localStorage.getItem('user_email'),
            // date_of_posting: Date.now()
            bio: this.state.bio,
            contact_number: this.state.contact_number,
            email : localStorage.getItem("user_email"),
            name: this.state.name,
        }

        // console.log(newJob);
        console.log(localStorage.getItem('user_type'));
        console.log(localStorage.getItem('isloggedin'));
        if(localStorage.getItem('user_type') !== 'recruiter' || localStorage.getItem('isloggedin') !== 'true'){
            alert("please login first");
            this.props.history.push("/");
            window.location.reload();
        }       
        else{
            if(this.state.contact_number.length === 10 && this.state.bio.split(' ').length < 251){
                axios.post('http://localhost:4000/recruiter/edit_recruiter_profile',newrec)
                .then(res => {
                    alert("profile successfully edited");
                    console.log(res.data)
                })
                .catch(function(error) {
                    console.log(error);
                })
                axios.post('http://localhost:4000/user/updateuser',newrec)
                .then(res => {
                    
                    console.log(res.data)
                    localStorage.setItem('user_name', this.state.name);
                    console.log(localStorage)
                })
                .catch(function(error) {
                    console.log(error);
                })
            }
            else{
                alert("number format is wrong or bio is too big (keep it under 251 words)")
            }
        }
        this.setState({
            // title: '',
            // name_recrutier: '',
            // email_recruiter: '',
            // max_applications: '',
            // max_positions: '',
            // deadline_of_application: '', 
            // required_skills: '',
            // type_of_job: 'full_time',
            // duration: '0',
            // salary_per_month: '',
            // date_of_posting: Date.now()
            bio: '',
            contact_number: '',
            name:'',
        });
    }

    render() {
        return (
            <div>
                <h1>you can edit your profile here</h1>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangename}
                               />
                    </div>
                    <div className="form-group">
                        <label>update bio: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.bio}
                               onChange={this.onChangebio}
                               />
                    </div>
                    
                    <div className="form-group">
                        <label>update contact number: </label>
                        <input type="number" 
                               className="form-control" 
                               value={this.state.contact_number}
                               onChange={this.onChangecontact_number}
                               />  
                    </div>

                    {/* <div className="form-group">
                        <label>update name: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.name}
                               onChange={this.onChangename}
                               />  
                    </div> */}

                    <div className="form-group">
                        <input type="submit" value="update" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
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


export default class Edit_job extends React.Component {
    
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            name_recrutier: '',
            email_recruiter: '',
            max_applications: '',
            max_positions: '',
            deadline_of_application: '', 
            required_skills: '',
            type_of_job: 'full_time',
            duration: '0',
            salary_per_month: '',
            date_of_posting: Date.now()
        }
        this.onChangetitle = this.onChangetitle.bind(this);
        this.onChangemax_applications = this.onChangemax_applications.bind(this);
        this.onChangemax_positions = this.onChangemax_positions.bind(this);
        this.onChangedeadline_of_application = this.onChangedeadline_of_application.bind(this);
        this.onChangerequired_skills = this.onChangerequired_skills.bind(this);
        this.onChangetype_of_job = this.onChangetype_of_job.bind(this);
        this.onChangeduration = this.onChangeduration.bind(this);
        this.onChangesalary_per_month = this.onChangesalary_per_month.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onChangetitle(event) {
        this.setState({ title: event.target.value });
    }

    onChangemax_applications(event) {
        this.setState({ max_applications: event.target.value });
    }

    onChangemax_positions(event) {
        this.setState({ max_positions: event.target.value });
    }

    onChangedeadline_of_application(event) {
        this.setState({ deadline_of_application: event.target.value });
    }

    onChangerequired_skills(event) {
        this.setState({ required_skills: event.target.value });
    }   

    onChangetype_of_job(event) {
        this.setState({ type_of_job: event.target.value });
    }

    onChangeduration(event) {
        this.setState({ duration: event.target.value });
    }

    onChangesalary_per_month(event) {
        this.setState({ salary_per_month: event.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newJob = {
            title: this.state.title,
            max_applications: this.state.max_applications,
            max_positions:  this.state.max_positions,
            deadline_of_application: Date(this.state.deadline_of_application),
            required_skills: this.state.required_skills,
            type_of_job: this.state.type_of_job,
            duration: this.state.duration,
            salary_per_month: this.state.salary_per_month,
            name_recruiter: localStorage.getItem('user_name'),
            email_recruiter: localStorage.getItem('user_email'),
            date_of_posting: Date.now()
        }

        console.log(newJob);
        console.log(localStorage.getItem('user_type'));
        console.log(localStorage.getItem('isloggedin'));
        if(localStorage.getItem('user_type') !== 'recruiter' || localStorage.getItem('isloggedin') !== 'true'){
            alert("please login first");
            this.props.history.push("/");
            window.location.reload();
        }
        else{
            axios.post('http://localhost:4000/job/job/edit',newJob)
            .then(res => {
                alert("job successfully edited");
                console.log(res.data)
            })
            .catch(function(error) {
                console.log(error);
            })
        }
        this.setState({
            title: '',
            name_recrutier: '',
            email_recruiter: '',
            max_applications: '',
            max_positions: '',
            deadline_of_application: '', 
            required_skills: '',
            type_of_job: 'full_time',
            duration: '0',
            salary_per_month: '',
            date_of_posting: Date.now()
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>    
                    <div className="form-group">
                        <label>maximum number of positions: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.max_positions}
                               onChange={this.onChangemax_positions}
                               />  
                    </div>
                    <div className="form-group">
                        <label>maximum number of applications you want: </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.max_applications}
                               onChange={this.onChangemax_applications}
                               />  
                    </div>

                    <div className="form-group">
                        <label>deadline of application: </label>
                        <input type="datetime-local" 
                               className="form-control" 
                               value={this.state.deadline_of_application}
                               onChange={this.onChangedeadline_of_application}
                               />
                    </div>

                    <div className="form-group">
                        <label>skills required: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.required_skills}
                               onChange={this.onChangerequired_skills}
                               />
                    </div>

                    <div className="form-group">
                        <label>Type of job:</label>
                        <div className="form-group">
                            <select className="form-control"  onChange={this.onChangetype_of_job} value={this.state.type_of_job}>
                                <option value="full_time">full time</option>
                                <option value="part_time">part time</option>
                                <option value="work_from_home">work from home</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>duration: </label>
                        <div className="form-group">
                            <select className="form-control"  onChange={this.onChangeduration} value={this.state.duration}>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label>salary (in interger): </label>
                        <input type="number" min="1"
                               className="form-control" 
                               value={this.state.salary_per_month}
                               onChange={this.onChangesalary_per_month}
                               />  
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Add listing" className="btn btn-primary"/>
                    </div>
                </form>
            </div>
        )
    }
}
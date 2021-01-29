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
            // title: '',
            // name_recrutier: '',
            // email_recruiter: '',
            // max_applications: '',
            // max_positions: '',
            // deadline_of_application: '', //take input as string (day month year hour minutes).
            // required_skills: '',
            // type_of_job: 'full_time',
            // duration: '0',
            // salary_per_month: '',
            // date_of_posting: Date.now()
            list_of_languages:'',
            education: [],
            institution:'',
            startyear:'',
            endyear:'',
            image:'',
            cv:'',
            // contact_number:'',
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
        this.onChangelist_of_languages = this.onChangelist_of_languages.bind(this);
        this.onChangeimage = this.onChangeimage.bind(this);
        this.onChangecv = this.onChangecv.bind(this);
        this.onChangeinstitution = this.onChangeinstitution.bind(this);
        this.onChangestartyear = this.onChangestartyear.bind(this);
        this.onChangeendyear = this.onChangeendyear.bind(this);
        this.onSubmitEdu = this.onSubmitEdu.bind(this);
        this.onChangename = this.onChangename.bind(this);
    }
    
    onChangelist_of_languages(event) {
        this.setState({ list_of_languages: event.target.value });
    }

    onChangeimage(event) {
        this.setState({ image: event.target.value });
    }

    onChangecv(event){
        this.setState({cv : event.target.value});
    }

    onChangestartyear(event){
        this.setState({startyear : event.target.value});
    }

    onChangeinstitution(event){
        this.setState({institution : event.target.value});
    }

    onChangeendyear(event){
        this.setState({endyear : event.target.value});
    }

    onChangename(event){
        this.setState({name: event.target.value});
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

    onSubmit(e) {
        e.preventDefault();
        console.log("lol")
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
            // bio: this.state.bio,
            // contact_number: this.state.contact_number,
            // email : localStorage.getItem("user_email"),
            // name: this.state.name,
            list_of_languages:this.state.list_of_languages,
            education: this.state.education,
            // institution:'',
            // startyear:'',
            // endyear:'',
            email: localStorage.getItem('user_email'),
            image:this.state.image,
            cv:this.state.cv,
            // contact_number:'',
            name:this.state.name
        }

        // console.log(newJob);
        console.log(localStorage.getItem('user_type'));
        console.log(localStorage.getItem('isloggedin'));
        if(localStorage.getItem('user_type') !== 'applicant' || localStorage.getItem('isloggedin') !== 'true'){
            alert("please login first");
            this.props.history.push("/");
            window.location.reload();
        }       
        else{
            console.log(newrec);
            // if(this.state.contact_number.length === 10 && this.state.bio.split(' ').length < 251){
                axios.post('http://localhost:4000/router/edit_applicant_profile',newrec)
                .then(res => {
                    alert("profile successfully edited");
                    console.log(res.data)
                })
                .catch(function(error) {
                    console.log(error);
                })
            // }
            // else{
            //     alert("number format is wrong or bio is too big (keep it under 251 words)")
            // }
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
            // bio: '',
            // contact_number: '',
            // name:'',
            list_of_languages:'',
            education: [],
            institution:'',
            startyear:'',
            endyear:'',
            image:'',
            cv:'',
            // contact_number:'',
            name:''
        });
    }

    onSubmitEdu(e){
        e.preventDefault();
        const obj = {
            institution: this.state.institution,
            startyear: this.state.startyear,
            endyear: this.state.endyear
        }

        if(this.state.institution === '' || this.state.startyear === ''){
            alert("you cannot leave institution and startyear feild empty.")
        }
        else{
            let e1 = this.state.education;
            e1.push(obj);
            this.setState({
            education: e1,
            institution: '',
            startyear: '',
            endyear: ''
        });
        }
        
    }

    render() {
        return (
            <div>
                <div className="form-group">
                    <label>name : </label>
                    <input type="text" 
                        className="form-control" 
                        value={this.state.name}
                        onChange={this.onChangename}
                    />
                    <label>languages that you are comfortable in : </label>
                    <input type="text" 
                        className="form-control" 
                        value={this.state.list_of_languages}
                        onChange={this.onChangelist_of_languages}
                    />
                    <form onSubmit={this.onSubmit} >
                        <div className="form-group">
                            <h3>add education</h3>
                            <label>Institution: </label>
                            <input type="text" 
                               className="form-control" 
                               value={this.state.institution}
                               onChange={this.onChangeinstitution}
                            />  
                            <label>Start Year: </label>
                            <input type="text" 
                            className="form-control" 
                            value={this.state.startyear}
                            onChange={this.onChangestartyear}
                            />
                            <label>End Year: </label>
                            <input type="text" 
                               className="form-control" 
                               value={this.state.endyear}
                               onChange={this.onChangeendyear}
                            />
                            <div className="form-group">
                            <div className="form-group">
                                <input type="submit" value="ADD" className="btn btn-primary" onClick={this.onSubmitEdu}/>
                            </div>
                            <label>Select profile photo:</label>
                            {/* <br></br>
                            <br></br> */}
                                <input
                                    type="file"
                                    onChange={this.onChangeimage}
                                    // value={this.state.image}
                                    id="image"
                                    name="image"
                                ></input>
                            </div>
                            <div className="form-group">
                            <label>upload cv</label>
                            {/* <br></br>
                            <br></br> */}
                                <input
                                    type="file"
                                    onChange={this.onChangecv}
                                    // value={this.state.image}
                                    id="file"
                                    name="file"
                                ></input>
                            </div>
                            <div className="form-group">
                                <input type="submit" value="update profile" className="btn btn-primary"/>
                            </div>
                            
                        </div>
                    </form>
                </div>

            </div>
        )
    }
}
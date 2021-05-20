import React, {Component} from 'react';
import axios from 'axios';
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
            type: 'applicant',
            date:null,
            bio_recruiter:'',
            contact_number:'',
            list_of_languages:'',
            education:[],
            institution:'',
            startyear:'',
            endyear:'',
            image:'',
            cv:'',
            success:0
        }

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChangetype = this.onChangetype.bind(this);
        this.onChangecontactnumber = this.onChangecontactnumber.bind(this);
        this.onChangebio_recruiter = this.onChangebio_recruiter.bind(this);
        this.onChangelist_of_languages = this.onChangelist_of_languages.bind(this);

        this.onChangeEndyear = this.onChangeEndyear.bind(this);
        this.onChangeInstitution = this.onChangeInstitution.bind(this);
        this.onChangeStartyear = this.onChangeStartyear.bind(this);

        this.onSubmitEdu = this.onSubmitEdu.bind(this);

        this.onChangeimage = this.onChangeimage.bind(this);
        this.onChangecv = this.onChangecv.bind(this);
    }
    
    validateEmail(e) {
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

    onChangelist_of_languages(event){
        this.setState({list_of_languages: event.target.value});
    }

    onChangeUsername(event) {
        this.setState({ name: event.target.value });
    }

    onChangecontactnumber(event){
        this.setState({contact_number: event.target.value});
    }

    onChangebio_recruiter(event){
        this.setState({bio_recruiter: event.target.value});
    }

    onChangePassword(event){
        this.setState({ password: event.target.value });
    }

    onChangeStartyear(event){
        this.setState({startyear: event.target.value});
    }

    onChangeInstitution(event){
        this.setState({institution: event.target.value});
    }

    onChangeEndyear(event){
        this.setState({endyear: event.target.value});
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

    onSubmit(event) {
        event.preventDefault();
        const userAdd = {
            email: this.state.email,
            password: this.state.password
        }
        console.log(userAdd)
        axios.get('http://localhost:4000/user/user', userAdd)
        .then(res => { 
            var tmpflag = 0
            var temp = "none";
            console.log(res);
            for(var i=0;i<res["data"].length;i++)
            {
                if(res["data"][i]["email"] === userAdd["email"])
                {
                    tmpflag = 1;
                    temp = res["data"][i]["type"];
                    break;
                }
            }
            if(tmpflag)
            {
                console.log("already registered");
                alert("already registered");
            }
            else
            {
                if((this.state.confirmPasswordErrorText=='' && this.state.emailerrortext=='') && (this.state.password.length>=6)){   
                    const rounds = 1;
                    console.log(this.state.password);
                    const hash = bcrypt.hashSync(this.state.password,rounds);
                    const newUser = {
                        name: this.state.name,
                        email: this.state.email,
                        password: hash,
                        type: this.state.type,
                        date: Date.now(),
                        bio_recruiter: this.state.bio_recruiter,
                        contact_number: this.state.contact_number,
                        list_of_languages: this.state.list_of_languages,
                        education: this.state.education,
                        cv: this.state.cv,
                        image: this.state.image, 
                    }
                    console.log(this.state.password);
                    console.log(hash);
                    console.log(newUser);
                    if(this.state.type === "recruiter"){
                        if(this.state.bio_recruiter.split(' ').length < 251 && this.state.contact_number.length === 10){
                            console.log("lololol");
                            axios.post('http://localhost:4000/recruiter/recruiter/add', newUser)
                            .then(res => {alert("Created recruiter\t" + res.data.name);console.log(res.data)
                            this.setState({success:1})
                            console.log("sucess updated")
                            })
                            .catch(err => { 
                                console.log(err) 
                            });
                        }
                        else{
                            alert("contact number length is short or bio is too long keep it under 250 words");
                        }
                    }
                    else if(this.state.type === "applicant"){
                        if(this.state.list_of_languages !== ''){
                            axios.post('http://localhost:4000/applicant/applicant/add', newUser)
                            .then(res => {alert("Created applicant\t" + res.data.name);console.log(res.data)
                            this.setState({success:1})
                            console.log("sucess updated")
                            })
                            .catch(err => { 
                                console.log(err) 
                            });
                        }
                        else{
                            alert("fill all components");
                        }
                    }
                    axios.post('http://localhost:4000/user/register', newUser)
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
                    type: 'applicant',
                    date:null,
                    bio_recruiter:'',
                    contact_number:'',
                    list_of_languages:'',
                    image:'',
                    cv:'',
                    education:[]
                }); 
            }
        })
        .catch(err => { 
            console.log(err) 
        });
    }

    onChangeimage = e => {
		const vivi = new FileReader();
		vivi.onload = function() {
			this.setState({ image: e.target.files[0] });
		}.bind(this);
		vivi.readAsDataURL(e.target.files[0]);
	};

    onChangecv = e => {
		const vivi = new FileReader();
		vivi.onload = function() {
			this.setState({ cv: vivi.result });
		}.bind(this);
        vivi.readAsDataURL(e.target.files[0]);
	};

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
        let divi = null;
        if(this.state.type === "applicant"){
            divi = 
            <div>
                <div className="form-group">
                    <label>languages that you are comfortable in : </label>
                    <input type="text" 
                        className="form-control" 
                        value={this.state.list_of_languages}
                        onChange={this.onChangelist_of_languages}
                    />
                    <form>
                        <div className="form-group">
                            <h3>add education</h3>
                            <label>Institution: </label>
                            <input type="text" 
                               className="form-control" 
                               value={this.state.institution}
                               onChange={this.onChangeInstitution}
                            />  
                            <label>Start Year: </label>
                            <input type="text" 
                            className="form-control" 
                            value={this.state.startyear}
                            onChange={this.onChangeStartyear}
                            />
                            <label>End Year: </label>
                            <input type="text" 
                               className="form-control" 
                               value={this.state.endyear}
                               onChange={this.onChangeEndyear}
                            />
                            <div className="form-group">
                            <div className="form-group">
                                <input type="submit" value="ADD" className="btn btn-primary" onClick={this.onSubmitEdu}/>
                            </div>
                            {/* <label>Select profile photo:</label> */}
                            {/* <br></br>
                            <br></br> */}
                                {/* <input
                                    type="file"
                                    onChange={this.onChangeimage}
                                    // value={this.state.image}
                                    id="image"
                                    name="image"
                                ></input> */}
                            </div>
                            <div className="form-group">
                            {/* <label>upload cv</label> */}
                            {/* <br></br>
                            <br></br> */}
                                {/* <input
                                    type="file"
                                    onChange={this.onChangecv}
                                    // value={this.state.image}
                                    id="file"
                                    name="file"
                                ></input> */}
                            </div>
                            
                        </div>
                    </form>
                </div>

            </div>
        }
        else{
            divi =
            <div> 
                <div className="form-group">
                    <label>contact number: </label>
                    <input type="number" 
                        className="form-control" 
                        value={this.state.contact_number}
                        onChange={this.onChangecontactnumber}
                        />  
                </div>
                <div className="form-group">
                <label>bio: </label>
                <input type="text" 
                    className="form-control" 
                    value={this.state.bio_recruiter}
                    onChange={this.onChangebio_recruiter}
                    />  
                </div>
            </div>
        }
        return (
            this.state.success == 1 ? window.location.href='/login' :
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
                                {/* <p>(don't be lazy and do not think applicant is selected so you dont have to select that.)</p> */}
                                {/* <br></br> */}
                                <select className="form-control"  onChange={this.onChangetype} value={this.state.type}>
                                    {/* <option value="0">pick type</option> */}
                                    <option value="applicant">applicant</option>
                                    <option value="recruiter">recruiter</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            {divi}
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
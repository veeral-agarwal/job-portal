import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/esm/Button';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";


export default class Rate_applicant extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            applied_jobs:[],
            job:[],
            currentjob:[],
            idid:'',
            value:0,
            sop:'',
            lololol:false,
            status:'not applied',
            applicant_data:null,
            rating:5,
        }
        // this.apply_job = this.apply_job.bind(this);
        this.onChangerating = this.onChangerating.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChangerating(event){
        this.setState({rating: event.target.rating});
    }

    componentDidMount(){
        console.log("ko")
        const chunk = { 
            email: this.props.match.params.applicant_email,
            // applicant_email: localStorage.getItem("user_email"),
            // recruiter_email: 
        }
        // console.log(chunk.id)
        axios.post('http://localhost:4000/router/opop',chunk)
        .then(res => {
            console.log("jii")
            var temper = 0;
            // for(var i = 0 ; i<res["data"].length ; i++){
            //     if(res["data"][i]["job_id"] === this.props.match.params.id && res["data"][i]["applicant_email"] === localStorage.getItem("user_email") &&  res["data"][i]["status"] === "applied"){
            //         this.setState({lololol: true});
            //         console.log(this.state.lololol)
            //         break;
            //     }
            //     else{
            //         temper = 0;
            //         console.log("lop")
            //     }
            // }
            // var rat = res.data;
            // console.log(rat.status)
            // if(res.data.status === "applied")
            // this.setState({lololol:true});
            // console.log(this.state.lololol)
        })
        .catch(err => {
            console.log(err);
        });
        // axios.post('http://localhost:4000/router/get_a_job_by_id', chunk)
        // .then(res => {
        //     console.log(res.data);
        //     this.setState({job: res.data});
            
        //     this.setState({lololol: true});
        // })
        // .catch(err =>
        //     {
        //         // if(err.response.data.message)
        //         // alert(err.response.data.message);
        //         console.log(err)
        // });

        // getting the data of this applicant
        // const applicant_ka_data = {
        //     applicant_ka_email: localStorage.getItem("user_email")
        // }
        // axios.post('http://localhost:4000/router/get_an_applicant_by_email', applicant_ka_data)
        // .then(res => {
        //     console.log(res.data);
        //     this.setState({applicant_data: res.data});
            
        //     this.setState({lololol: true});
        // })
        // .catch(err =>
        //     {
        //         // if(err.response.data.message)
        //         // alert(err.response.data.message);
        //         console.log(err)
        // });

    }    
    
    async onSubmit(e){
        e.preventDefault();
        console.log(this.props.match.params.id)        
        const chunk = {
            id: this.props.match.params.id
        }
        
            // console.log(temper)
            // if(temper === 0){
                
                // axios.post('http://localhost:4000/router/get_a_job_by_id', chunk)
                //     .then(res => {
                //         console.log(res.data);
                //         this.setState({job: res.data});
                        
                //         this.setState({lololol: true});
                //     })
                //     .catch(err =>
                //         {
                //             // if(err.response.data.message)
                //             // alert(err.response.data.message);
                //             console.log(err)
                //         });
            var veer = true;

            // if(this.state.sop.split(' ').length>250){
            //     window.alert("word limit crossed");
            //     veer = false;
            // }
            // else if(veer && this.state.sop === ''){
            //     window.alert("enter statement of purpose");
            // }
            // else if(this.state.applicant_data.application_count >20){
            //     alert("max application limit reached");
            // }
            {

                


                const yoyo = {
                    // sop: this.state.sop,
                    // email_recruiter: this.state.job.email_recruiter,
                    // name_recruiter: this.state.job.name_recruiter,
                    // deadline_of_application: this.state.job.deadline_of_application,
                    // job_salary_per_month: this.state.job.salary_per_month,
                    // status_of_job:this.state.job.status,
                    // job_id: this.state.job._id,
                    // applicant_email: localStorage.getItem("user_email"),
                    // status: "applied",
                    // job_title: this.state.job.title,
                    // name_applicant:localStorage.getItem("user_name"),
                    // skills: this.state.applicant_data.list_of_languages,
                    // education: this.state.applicant_data.education,
                    // job_type:this.state.job.type_of_job,
                    // rating: this.state.applicant_data.rating,
                    email : this.props.match.params.applicant_email,
                }
                console.log(yoyo);
                await axios.post('http://localhost:4000/router/rate_an_applicant', yoyo)
                    .then(res => {
                        console.log(res.data);
                        // this.setState({jobs: res.data});
                        
                    })
                    .catch(err =>
                        {
                            // if(err.response.data.message)
                            // alert(err.response.data.message);
                            console.log(err)
                        });
                
                
                // await axios.post('http://localhost:4000/router/increment_application_count', {email: localStorage.getItem("user_email")})
                // .then(res => {
                //     console.log(res.data);
                //     // this.setState({jobs: res.data});
                    
                // })
                // .catch(err =>
                //     {
                //         // if(err.response.data.message)
                //         // alert(err.response.data.message);
                //         console.log(err)
                //     });

                    this.setState({
                        rating:5
                    });
                    this.props.history.push('/job-listings');
            }
    }

    // apply_job(e){
    //     const datadata = {
    //         applicant_email: localStorage.getItem('user_email'),
    //         recruiter_email: this.state.job.email_recruiter,
    //         job_id: this.props.match.params.id,

    //     }
    //     const u = this.props.match.params.yoyo;
    //     console.log(u)
    // }

    // componentDidMount() {
    //     const u = this.props.match.params.yoyo;
    //     console.log(u)
    // }

    render() {

        return (
            
            <div>
                {/* {
                    const kaha_jana = {
                        pathname: "/search_job"
                    }
                } */}
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>rate: </label>
                        <select className="form-control"  onChange={this.onChangerating} value={this.state.rating}>
                            {/* <option value="0">pick type</option> */}
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>

                    <div className="form-group">
                        {  <input  type="submit" value="add" className="btn btn-primary"  /> }
                    </div>
                </form>
                <div className="form-group">
                    <p>hii</p>

                </div>
            </div>
        )


    }
}

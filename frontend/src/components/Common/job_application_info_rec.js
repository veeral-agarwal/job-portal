import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/esm/Button';
import { BrowserRouter as Router, Route, Link} from "react-router-dom";


export default class Job_application_info extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            applied_jobs:[],
            applications:[],
            currentjob:[],
            idid:'',
            value:0,
            sop:'',
            lololol:false,
            status:'not applied'
        }
        this.sortbyratinginc = this.sortbyratinginc.bind(this);
        this.sortbyratingdec = this.sortbyratingdec.bind(this);
        this.sortbydoadec = this.sortbydoadec.bind(this);
        this.sortbydoainc = this.sortbydoainc.bind(this);
        this.sortbynamedec = this.sortbynamedec.bind(this);
        this.sortbynameinc = this.sortbynameinc.bind(this);
        
        this.shortlist = this.shortlist.bind(this);
        this.accept = this.accept.bind(this);
        this.reject = this.reject.bind(this);
    }

    onChangesop(event){
        this.setState({sop: event.target.value});
    }

    componentDidMount(){
        if(localStorage.getItem('user_type') !== "recruiter" && localStorage.getItem("isloggedin") !== true){
            alert("please log in");
        }
        else{
            console.log("ko")
            const chunk = { 
                id: this.props.match.params.id,
                email_recruiter: localStorage.getItem("user_email"), 
            }
            console.log(chunk.id)
            axios.post('http://localhost:4000/application/all_my_non-rejected_applications_of_perticular_job',chunk)
            .then(res => {
                console.log(res.data)
                var temper = 0;
                this.setState({applications: res.data});            
            })
            .catch(err => {
                console.log(err);
            });
        }
    }    
    
    async reject(id , mail ){
        axios.post('http://localhost:4000/application/reject_an_application',{id:id})
        .then(res => {
            console.log(res.data)
        })
        .catch(err => {
            console.log(err);
        });
        axios.post('http://localhost:4000/application/decrement_application_count', {email: mail})
        .then(res => {
            console.log(res.data);
        })
        .catch(err =>
            {
                console.log(err)
            });
        window.location.reload();
    }

    accept(id){
        axios.post('http://localhost:4000/application/accept_an_application',{id:id })
        .then(res => {
            console.log(res.data)            
        })
        .catch(err => {
            console.log(err);
        });
        window.location.reload();
    }

    shortlist(id){
        axios.post('http://localhost:4000/application/shortlist_an_application',{id:id})
        .then(res => {
            console.log(res.data)            
        })
        .catch(err => {
            console.log(err);
        });
        window.location.reload();
    }

    async onSubmit(e){
        e.preventDefault();
        console.log(this.props.match.params.id)        
        const chunk = {
            id: this.props.match.params.id
        }
            var veer = true;

            // if(this.state.sop.split(' ').length>250){
            //     window.alert("word limit crossed");
            //     veer = false;
            // }
            // else if(veer && this.state.sop === ''){
            //     window.alert("enter statement of purpose");
            // }
            // else{
            //     const yoyo = {
            //         sop: this.state.sop,
            //         email_recruiter: this.state.job.email_recruiter,
            //         name_recruiter: this.state.job.name_recruiter,
            //         deadline_of_application: this.state.job.deadline_of_application,
            //         job_salary_per_month: this.state.job.salary_per_month,
            //         status_of_job:this.state.job.status,
            //         job_id: this.state.job._id,
            //         applicant_email: localStorage.getItem("user_email"),
            //         status: "applied",
            //         job_title: this.state.job.title
            //     }
            //     console.log(yoyo);
            //     await axios.post('http://localhost:4000/router/addapplication', yoyo)
            //         .then(res => {
            //             console.log(res.data);
            //             // this.setState({jobs: res.data});
                        
            //         })
            //         .catch(err =>
            //             {
            //                 // if(err.response.data.message)
            //                 // alert(err.response.data.message);
            //                 console.log(err)
            //             });

            //         this.setState({
            //             sop:''
            //         });
            //         this.props.history.push('/search_job');
            // }
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

    sortbydoadec = () => {
        let applications = this.state.applications, n = applications.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = applications[j].date_of_application;
                var y = applications[j+1].date_of_application;
                if(x < y)
                {
                    var temper = applications[j];
                    applications[j] = applications[j+1];
                    applications[j+1] = temper;
                }
            }
        }
        this.setState({applications: applications});
    }

    sortbydoainc = () => {
        let applications = this.state.applications, n = applications.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = applications[j].date_of_application;
                var y = applications[j+1].date_of_application;
                if(x > y)
                {
                    var temper = applications[j];
                    applications[j] = applications[j+1];
                    applications[j+1] = temper;
                }
            }
        }
        this.setState({applications: applications});
    }

    sortbynamedec = () => {
        let applications = this.state.applications, n = applications.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = applications[j].name_applicant;
                var y = applications[j+1].name_applicant;
                if(x < y)
                {
                    var temper = applications[j];
                    applications[j] = applications[j+1];
                    applications[j+1] = temper;
                }
            }
        }
        this.setState({applications: applications});
    }

    sortbynameinc = () => {
        let applications = this.state.applications, n = applications.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = applications[j].name_applicant;
                var y = applications[j+1].name_applicant;
                if(x > y)
                {
                    var temper = applications[j];
                    applications[j] = applications[j+1];
                    applications[j+1] = temper;
                }
            }
        }
        this.setState({applications: applications});
    }

    sortbyratingdec = () =>{
        let applications = this.state.applications, n = applications.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = applications[j].applicant_rating;
                var y = applications[j+1].applicant_rating;
                if(x < y)
                {
                    var temper = applications[j];
                    applications[j] = applications[j+1];
                    applications[j+1] = temper;
                }
            }
        }
        this.setState({applications: applications});
    }

    sortbyratinginc = () =>{
        let applications = this.state.applications, n = applications.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = applications[j].applicant_rating;
                var y = applications[j+1].applicant_rating;
                if(x > y)
                {
                    var temper = applications[j];
                    applications[j] = applications[j+1];
                    applications[j+1] = temper;
                }
            }
        }
        this.setState({applications: applications});
    }

    render() {
        return (
            <div>
                <Button variant="info" onClick={this.sortbynameinc} >name increasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbynamedec} >name decreasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbydoainc} >date of application increasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbydoadec} >date of application decreasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbyratinginc} >rating increasing</Button>&nbsp; 
                <Button variant="info" onClick={this.sortbyratingdec} >rating decreasing</Button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>applicant's name</th>
                            <th>skills of applicant</th>
                            <th>date of application</th>
                            <th>education</th>
                            <th>statement of purpose</th>
                            <th>stage of application</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.applications.map((application, i) => {
                            let divi = null;
                            if(application.status === "applied"){
                                divi = 
                                <div>
                                    <td><Button style = {{backgroundColor:'yellow'}} onClick={() => {this.shortlist(application._id)}} >shortlist</Button></td>
                                    <td><Button onClick={() => {this.reject(application._id , application.applicant_email)}} >reject</Button></td>
                                </div>
                            }
                            else if(application.status === "shortlisted"){
                                divi = 
                                <div>   
                                    <td><Button style = {{backgroundColor:'red'}} onClick={() => {this.accept(application._id)} }>accept</Button></td>
                                    <td><Button onClick={() => {this.reject(application._id, application.applicant_email)}} >reject</Button></td>
                                </div>
                            }
                            else if(application.status === "accepted"){
                                divi = 
                                <div>
                                    <td><Button disabled>accepted</Button></td>
                                </div>
                            }
                            var yoyo = null;
                            {
                                console.log(application.education_applicant)
                                application.education_applicant.map((xx,j) => {
                                    var yoyoyo = 
                                    <div>
                                        <p>{xx[j]}</p><br></br>
                                    </div>
                                })
                            }
                            return (
                                <tr key={i} >
                                    <td>{application.name_applicant}</td>
                                    <td>{application.skills_applicant} </td>
                                    <td>{application.date_of_application}</td>
                                    <td>
                                        {yoyo}
                                    </td>
                                    <td>{application.sop}</td>
                                    <td>{application.status}</td>
                                    <td>{divi}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}

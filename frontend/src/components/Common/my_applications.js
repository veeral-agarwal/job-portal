import React, {Component} from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'

export default class My_applications extends Component {
    
    constructor(props) {
        super(props);
        // this.deletejob = this.deletejob.bind(this)
        this.state = {
            listings: []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('user_type') === "applicant" && localStorage.getItem('isloggedin') === "true" ){
            let email = localStorage.getItem('user_email');
            const data_rec = {
                email_rec: email
            };
            axios.post('http://localhost:4000/application/all_my_applications', data_rec)
            .then(response => {
                console.log(response.data)
                this.setState({listings: response.data});
            })
            .catch(function(error) {
                // if(error.response.data.message)
                // alert(error.response.data.message);
                console.log(error);
            })
        }
        else{
            alert("login first");
            this.props.history.push("/");
            window.location.reload();
        }
    }


    rate_recruiter(id) {
        
    }

    rate_recruiter = this.rate_recrutier;

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>job title</th>
                            <th>date of joining</th>
                            <th>salary per month</th>
                            <th>status of job</th>
                            <th>rate</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((application, i) => {
                            var vivi = null;
                            if(application.status === "accepted"){
                                vivi = <td> <Button variant="danger" disabled onClick={() => {this.rate_recrutier() }}>rate</Button></td>
                            }
                            return (
                                <tr key={i} rate_recrutier = {this.rate_recruiter}>
                                    <td>{application.job_title}</td>
                                    <td>{application.date_of_joining} </td>
                                    <td>{application.job_salary_per_month}</td>
                                    <td>{application.status}</td>
                                    {/* <td> <Button variant="danger" onClick={() => {this.rate_recrutier() }}>rate</Button></td> */}
                                    {vivi}
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
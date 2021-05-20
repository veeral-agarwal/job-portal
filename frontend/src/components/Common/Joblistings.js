import React, {Component} from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";


export default class Joblistings extends Component {
    
    constructor(props) {
        super(props);
        // this.deletejob = this.deletejob.bind(this)
        this.state = {
            listings: []
        }
    }

    componentDidMount() {
        if(localStorage.getItem('user_type') === "recruiter" && localStorage.getItem('isloggedin') === "true" ){
            let email = localStorage.getItem('user_email');
            const data_rec = {
                email_rec: email
            };
            axios.post('http://localhost:4000/job/job/view', data_rec)
            .then(response => {
                console.log(response.data)
                this.setState({listings: response.data});
            })
            .catch(function(error) {
                console.log(error);
            })
        }
        else{
            alert("login first");
            this.props.history.push("/");
            window.location.reload();
        }
    }


    deletejob(id) {
        axios.post('http://localhost:4000/job/job/delete',{'id': id})
        .then(response => { 
            console.log(response.data)
        });
        this.setState({
          listings: this.state.listings.filter(el => el._id !== id)
        })
    }

    deletejob = this.deletejob;

    render() {
        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>title</th>
                            <th>date of posting</th>
                            <th>number of applicants</th>
                            <th>maximum number of positions</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((job, i) => {
                            const kaha_jana = {
                                pathname: "/job-listings/"+job._id
                            }
                            const jana_kaha = {
                                pathname: "/edit-job/"+job._id
                            }
                            return (
                                <tr key={i} >
                                    <td>{job.title}</td>
                                    <td>{job.date_of_posting} </td>
                                    <td>{job.max_applications}</td>
                                    <td>{job.max_positions}</td>
                                    <td> <Button variant="danger" onClick={() => {this.deletejob(job._id) }}>Delete</Button></td>
                                    <td>    <Link  to={kaha_jana} ><Button style = {{backgroundColor:'red'}} variant="contained" >view</Button></Link></td>
                                    <td>    <Link  to={jana_kaha} ><Button style = {{backgroundColor:'yellow'}} variant="contained" >edit</Button></Link>
                                    </td>
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
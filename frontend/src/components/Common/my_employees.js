import React, {Component} from 'react';
import axios from 'axios';
// import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button'
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
export default class My_employees extends Component {
    
    constructor(props) {
        super(props);
        // this.deletejob = this.deletejob.bind(this)
        this.state = {
            listings: []
        }
        this.sortbynamedec = this.sortbynamedec.bind(this);
        this.sortbynameinc = this.sortbynameinc.bind(this);
        this.sortbydojdec = this.sortbydojdec.bind(this);
        this.sortbydojinc = this.sortbydojinc.bind(this);
        this.sortbyratingdec = this.sortbyratingdec.bind(this);
        this.sortbyratinginc = this.sortbyratinginc.bind(this);
        this.sortbytitledec = this.sortbytitledec.bind(this);
        this.sortbytitleinc = this.sortbytitleinc.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('user_type') === "recruiter" && localStorage.getItem('isloggedin') === "true" ){
            let email = localStorage.getItem('user_email');
            const data_rec = {
                email_rec: email
            };
            axios.post('http://localhost:4000/application/all_my_employees', data_rec)
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


    rate_applicant(id) {

    }

    rate_applicant = this.rate_applicant;

    sortbynamedec = () => {
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = listings[j].name_applicant;
                var y = listings[j+1].name_applicant;
                if(x < y)
                {
                    var temper = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temper;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbynameinc = () => {
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = listings[j].name_applicant;
                var y = listings[j+1].name_applicant;
                if(x > y)
                {
                    var temper = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temper;
                }
            }
        }
        this.setState({listings: listings});
    }
    
    sortbytitledec = () => {
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = listings[j].job_title;
                var y = listings[j+1].job_title;
                if(x < y)
                {
                    var temper = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temper;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbytitleinc = () => {
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = listings[j].job_title;
                var y = listings[j+1].job_title;
                if(x > y)
                {
                    var temper = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temper;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbydojdec = () => {
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = (listings[j].date_of_joining);
                var y = (listings[j+1].date_of_joining);
                // var d1 = x.getTime();
                // let d2 = y.getTime();
                if(x<y)
                {
                    var temper = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temper;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbydojinc = () => {
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = listings[j].date_of_joining;
                var y = listings[j+1].date_of_joining;
                if(x > y)
                {
                    var temper = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temper;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbyratingdec = () => {
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = listings[j].applicant_rating;
                var y = listings[j+1].applicant_rating;
                if(x < y)
                {
                    var temper = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temper;
                }
            }
        }
        this.setState({listings: listings});
    }

    sortbyratinginc = () => {
        let listings = this.state.listings, n = listings.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = listings[j].applicant_rating;
                var y = listings[j+1].applicant_rating;
                if(x > y)
                {
                    var temper = listings[j];
                    listings[j] = listings[j+1];
                    listings[j+1] = temper;
                }
            }
        }
        this.setState({listings: listings});
    }

    render() {
        return (
            <div>
                <Button variant="info" onClick={this.sortbynameinc} >name increasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbynamedec} >name decreasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbytitleinc} >job title increasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbytitledec} >job title decreasing</Button>&nbsp; <br></br><br></br>
                <Button variant="info" onClick={this.sortbydojinc} >date of joining increasing</Button>&nbsp; 
                <Button variant="info" onClick={this.sortbydojdec} >date of joining decreasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbyratinginc} >rating increasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbyratingdec} >rating decreasing</Button>&nbsp;
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>applicant name</th>
                            <th>date of joining</th>
                            <th>job type</th>
                            <th>job title</th>
                            {/* <th>date of posting</th> */}
                            <th>applicant's rating</th>
                            <th>rate</th>
                        </tr>
                    </thead>
                    <tbody>
                    { 
                        this.state.listings.map((application, i) => {
                            const kaha_jana = {
                                pathname: "/my-employees/"+application.applicant_email,
                            }
                            var vivi = null;
                            // if(application.status === "accepted"){
                                vivi = <td> <Link to={kaha_jana} ><Button  variant="danger" onClick={() => { }}>rate</Button></Link></td>
                            // }
                            return (
                                <tr key={i} rate_recrutier = {this.rate_recruiter}>
                                    <td>{application.name_applicant}</td>
                                    <td>{application.date_of_joining} </td>
                                    <td>{application.job_type}</td>
                                    <td>{application.job_title}</td>
                                    {/* <td>{application.date_of_joining}</td> */}
                                    <td>{application.applicant_rating}</td>
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
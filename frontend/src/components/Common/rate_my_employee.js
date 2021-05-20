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
            email: this.props.match.params.id,
            // applicant_email: localStorage.getItem("user_email"),
            // recruiter_email: 
        }
        console.log(this.props.match.params)
        console.log(chunk)
        axios.post('http://localhost:4000/router/opop',chunk)  //this is unused
        .then(res => {
            console.log("jii")
            var temper = 0;

        })
        .catch(err => {
            console.log(err);
        });
        
    }    
    
    async onSubmit(e){
        e.preventDefault();
        console.log(this.props.match.params.id)        
        const chunk = {
            id: this.props.match.params.id
        }
        
            var veer = true;

            {

                


                const yoyo = {

                    email : this.props.match.params.id,
                    value : this.state.rating
                }
                console.log(yoyo);

                var temp = {
                    applicant_ka_email : this.props.match.params.id,
                }

                await axios.post('http://localhost:4000/Applicant/get_an_applicant_by_email', temp) //no such route found
                .then(res => {
                    console.log(res.data);
                    var ratecount = res.data.rate_count
                    var rate = res.data.rating
                    var newrating = (rate*ratecount+this.state.rating)/(ratecount+1)
                    ratecount+=1
                    var doupdate = {
                        email:this.props.match.params.id,
                        rate_count:ratecount,
                        rating:newrating
                    }
                    this.setState({
                        rating:newrating
                    });
                    axios.post('http://localhost:4000/Applicant/rate_an_applicant', doupdate) //no such route found
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
                    // this.setState({jobs: res.data});
                    
                })
                .catch(err =>
                    {
                        // if(err.response.data.message)
                        // alert(err.response.data.message);
                        console.log(err)
                    });



                
                
              
                    // this.setState({
                    //     rating:newrating
                    // });
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

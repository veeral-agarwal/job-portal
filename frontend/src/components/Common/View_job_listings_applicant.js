import React, {Component} from 'react';
import axios from 'axios';
// import CustomerNavbar from "./user-navbar.component"
import { BrowserRouter as Router, Route, Link} from "react-router-dom";
import Button from 'react-bootstrap/Button'


export default class View_job_listings_applicant extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            jobs: [],
            job_type: 'full_time',
            job_salary: '',
            job_duration: '',
            salary_lower:'',
            salary_upper:'',
            applied_jobs:[]
        }
        this.onChangeSearch = this.onChangeSearch.bind(this);
        this.sortbyratinginc = this.sortbyratinginc.bind(this);
        this.sortbyratingdec = this.sortbyratingdec.bind(this);
        this.sortbydurationdec = this.sortbydurationdec.bind(this);
        this.sortbydurationinc = this.sortbydurationinc.bind(this);
        this.onchangedurationfilter = this.onchangedurationfilter.bind(this);
        this.onSubmitdurationfilter = this.onSubmitdurationfilter.bind(this);

        this.sortbysalarydec = this.sortbysalarydec.bind(this);
        this.sortbysalaryinc = this.sortbysalaryinc.bind(this);
        this.onChangejobtypefilter = this.onChangejobtypefilter.bind(this);
        this.onSubmitjobtypefilter = this.onSubmitjobtypefilter.bind(this);

        this.onchangesalarylower = this.onchangesalarylower.bind(this);
        this.onchangesalaryupper = this.onchangesalaryupper.bind(this);
        this.onSubmitsalaryrange = this.onSubmitsalaryrange.bind(this);
    }

    componentDidMount() {
        if(localStorage.getItem('user_type') === "applicant" && localStorage.getItem('isloggedin') === "true" ){
            let email = localStorage.getItem('user_email');
            const data_rec = {
                email_rec: email
            };
            axios.get('http://localhost:4000/job/job/view_for_applicant', data_rec)
            .then(response => {
                console.log(response.data)
                this.setState({jobs: response.data});
                console.log(this.state.jobs);
            })
            .catch(function(error) {
                console.log(error);
            })
            const newval = {
                applicant_email: localStorage.getItem("user_email")
            }
            axios.post("http://localhost:4000/application/all_applied_jobs",newval)
             .then(response =>{
                this.setState({applied_jobs: response.data});
             })
             .catch(function(error) {
               window.alert("post error")
           })
        }
        else{
            alert("login first");
            console.log("lul");
            this.props.history.push("/");
            window.location.reload();
        }
    }
    
    onChangeSearch(event) {
        this.setState({ search: event.target.value });
        console.log(event.target.value)
    }

    onChangejobtypefilter(event){
        this.setState({job_type: event.target.value});
    }

    onChangeType(event) {
        this.setState({ type: event.target.value });
    }

    onchangesalarylower(event){
        this.setState({salary_lower:event.target.value});
    }

    onchangesalaryupper(event){
        this.setState({salary_upper:event.target.value});
    }

    onchangedurationfilter(event){
        this.setState({job_duration: event.target.value});
    }

    onSubmitsalaryrange(e){
        e.preventDefault();
        const salaryminmax = {
            min: this.state.salary_lower,
            max: this.state.salary_upper
        }
        console.log(salaryminmax);
        axios.post('http://localhost:4000/router/salaryfilter', salaryminmax)
             .then(res => {
                console.log(res.data);
                this.setState({jobs: res.data});
                
            })
             .catch(err =>
                {
                    console.log(err)
                });

        this.setState({
            salary_lower : '',
            salary_upper: ''
        });
    }

    onSubmitjobtypefilter(e){
        e.preventDefault();
        console.log(this.state.job_type)
        const jobtypefilter = {
            job_ka_type: this.state.job_type
        }
        console.log(jobtypefilter);
        axios.post('http://localhost:4000/router/job_type_filter', jobtypefilter)
             .then(res => {
                console.log(res.data);
                this.setState({jobs: res.data});

            })
             .catch(err =>
                {
                    console.log(err)
                });

        this.setState({
            job_type : 'full_time',
        });

    }

    onSubmitdurationfilter(e){
        e.preventDefault();
        const dur = {
            job_duration: this.state.job_duration,
        }
        console.log(dur);
        axios.post('http://localhost:4000/router/job/filterbyduration', dur)
             .then(res => {
                console.log(res.data);
                this.setState({jobs: res.data});

            })
             .catch(err =>
                {
                    console.log(err)
                });

        this.setState({
            search : '',
        });
    }

    sortbydurationdec = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = jobs[j].duration;
                var y = jobs[j+1].duration;
                if(x < y)
                {
                    var temper = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temper;
                }
            }
        }
        this.setState({jobs: jobs});
    }

    sortbydurationinc = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = jobs[j].duration;
                var y = jobs[j+1].duration;
                if(x > y)
                {
                    var temper = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temper;
                }
            }
        }
        this.setState({jobs: jobs});
    }

    sortbyratingdec = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = jobs[j].rating;
                var y = jobs[j+1].rating;
                if(x < y)
                {
                    var temper = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temper;
                }
            }
        }
        this.setState({jobs: jobs});
    }

    sortbyratinginc = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i =0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = jobs[j].rating;
                var y = jobs[j+1].rating;
                if(x > y)
                {
                    var temper = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temper;
                }
            }
        }
        this.setState({jobs: jobs});
    }    

    sortbysalarydec = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = jobs[j].salary_per_month;
                var y = jobs[j+1].salary_per_month;
                if(x < y)
                {
                    var temper = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temper;
                }
            }
        }
        this.setState({jobs: jobs});
    }

    sortbysalaryinc = () =>{
        let jobs = this.state.jobs, n = jobs.length;
        for(var i=0; i < n-1; i++)
        {
            for(var j=0; j < n-1; j++)
            {
                var x = jobs[j].salary_per_month;
                var y = jobs[j+1].salary_per_month;
                if(x > y)
                {
                    var temper = jobs[j];
                    jobs[j] = jobs[j+1];
                    jobs[j+1] = temper;
                }
            }
        }
        this.setState({jobs: jobs});
    }



    render() {
        const { jobs} = this.state;
        return (
            <div>
                <p>consider 0 in duration as indefinite.</p>
                {/* <form onSubmit={}> */}
                    <div className="form-group">
                        <label>job title: </label>
                        <input type="text" 
                               className="form-control" 
                               value={this.state.search}
                               onChange={this.onChangeSearch}
                               />  
                    </div>

                    {/* <div className="form-group">
                        <input type="submit" value="Search" className="btn btn-primary"/>
                    </div> */}
                {/* </form> */}
                <form onSubmit={this.onSubmitjobtypefilter}>
                    <div className="form-group">
                        <label>job type: </label>
                        {/* <div className="form-group"> */}
                         
                            <select className="form-control"  onChange={this.onChangejobtypefilter} value={this.state.job_type}>
                                {/* <option value="0">pick type</option> */}
                                <option value="full_time">full time</option>
                                <option value="part_time">part time</option>
                                <option value="work_from_home">work from home</option>
                            </select>
                        {/* </div>   */}
                    </div>

                    <div className="form-group">
                        <input type="submit" value="apply filter" className="btn btn-primary"/>
                    </div>
                </form>

                <form onSubmit={this.onSubmitsalaryrange}>
                    <div className="form-group">
                        <label>range: </label>
                        <br></br>
                            <label>lower limit</label>
                            <input  type="number"
                                    className="form-control"
                                    value={this.state.salary_lower}
                                    onChange={this.onchangesalarylower}
                                    />
                            <label>upper limit</label>
                            <input  type="number"
                                    className="form-control"
                                    value={this.state.salary_upper}
                                    onChange={this.onchangesalaryupper}
                                    />
                        {/* </div>   */}
                    </div>

                    <div className="form-group">
                        <input type="submit" value="apply filter" className="btn btn-primary"/>
                    </div>
                </form>
                
                <form onSubmit={this.onSubmitdurationfilter}>
                    <div className="form-group" onChange={this.onchangedurationfilter} value={this.state.job_duration} >
                        <label>duration filter</label>
                        <select>
                            {/* <option value="0">0  </option> */}
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                        </select>&nbsp;&nbsp;&nbsp;&nbsp;   
                    {/* </div>

                    <div className="form-group"> */}
                        <input type="submit" value="apply" className="btn btn-primary"/>
                    </div>
                </form>
                <Button variant="info" onClick={this.sortbysalaryinc} >salary increasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbysalarydec} >salary decreasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbydurationinc} >duration increasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbydurationdec} >duration decreasing</Button>&nbsp;
                <Button variant="info" onClick={this.sortbyratinginc} >rating increasing</Button>&nbsp; 
                <Button variant="info" onClick={this.sortbyratingdec} >rating decreasing</Button>
                <br></br>
                <br></br>

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>job title</th>
                            <th>salary</th>
                            {/* <th>positions left</th> */}
                            <th>recruiter</th>
                            <th>email of recruiter</th>
                            <th>Rating</th>
                            <th>duration</th>
                            <th>maximum applications</th>
                            <th>maximum positions</th>
                            {/* <th>number of positions filled</th> */}
                            <th>date of posting</th>
                            <th>deadline of application</th>
                            <th>required skills</th>
                            <th>type of job</th>
                        </tr>
                    </thead>
                    <tbody>
                    {

                        this.state.jobs.map((job, i) => {
                            const kaha_jana = {
                                pathname: "/job_apply/"+job._id,
                                // job: job,
                                // yoyo: "yoyo"
                            }
                            // console.log(i);
                            var array=[...this.state.applied_jobs]
                                        let mark=false;
                                        // console.log(array.length)
                                        for(var j=0;j<array.length;j++)
                                        {
                                            if(array[j].job_id===job._id)
                                            {
                                                mark=true
                                            }
                                            // console.log(array[j].job_id,job._id)
                                        }
                                        var www = null;
                                        if(mark){
                                            www = 
                                            <Button  style = {{color:'red'}}  color="primary" disabled>Applied</Button>
                                        }
                                        else{
                                            if(job.number_of_positions_filled >= job.max_applications + job.max_applications){
                                                www =  <Button  style = {{color:'black'}}  color="primary" disabled>full</Button>
                                            }
                                            else{
                                                www = 
                                                <Link to={kaha_jana}> <Button style = {{backgroundColor:'red'}} variant="contained" onClick={()=>{
                                                    console.log(i)
 
                                                    
                                                     
                                                 }}>apply</Button></Link>
                                            }

                                        }
                                        // console.log(i,mark)
                                        // console.log(job.status)

                            let x = 0, rating =0;
                    
                            //rating = product
                            const wow = new Date(Date.now());
                            const wowow = new Date(job.deadline_of_application);
                            if(job.title.includes(this.state.search) || this.state.search === '' ){
                                return (
                                    <tr key={i}>
                                        <td>{job.title}</td>
                                        <td>{job.salary_per_month} </td>
                                        <td>{job.name_recruiter}</td>
                                        <td>{job.email_recruiter}</td>
                                        <td>{job.rating}</td>
                                        <td>{job.duration}</td>
                                        <td>{job.max_applications}</td>
                                        <td>{job.max_positions}</td>
                                        <td>{job.date_of_posting}</td>
                                        <td>{job.deadline_of_application}</td>
                                        <td>{job.required_skills}</td>
                                        <td>{job.type_of_job}</td>
                                        <td>
                                            {www}</td>
                                    </tr>
                                )
                            }
                        })
                    }
                    </tbody>
                </table>
            </div>
        )
    }
}
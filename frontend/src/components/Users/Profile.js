import React, {Component} from 'react';
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';


import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';

class Profile extends Component {
    
    constructor(props) {
        super(props);
        this.state = {users: [],sortName:true};
        // this.sortClicked = this.sortClicked.bind(this);
        // this.renderIcon = this.renderIcon.bind(this);
        // this.sortChange = this.sortChange.bind(this);
    }

    render() {
        return (
            <div>
                <Grid item xs={12} md={12} lg={12}>
                    <Paper>
                            
                    </Paper>               
                </Grid>                
            </div>
        )
    }
}

export default Profile;
import React, { useState } from 'react';
import axios from 'axios';
import FormControl from '@material-ui/core/FormControl';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles(theme => ({
    form: {
        width: '50%',
    },
    button: {
        outline: 'none !important',
    },
}));

function Issue() {
    const classes = useStyles();
    const [email, setEmail] = useState("");
    const [issue, setIssue] = useState("");
    const [success, setSuccess] = useState(false);

    const handleSubmit = (evt) => {
        if (email === "" || issue === "") {
            alert(`Please fill out the form completely`)
        } else {
            axios.post(`http://localhost:8080/api/v1/issue`, { email: email, issue: issue })
                .then(res => {
                    if (res.status === 200) {
                        setSuccess(true);
                        timer();
                    }
                })
        }
    }

    const timer = () => {
        setTimeout(function() { setSuccess(false) }, 5000);
    };

    return (
        <React.Fragment>
        <FormControl className={classes.form}>
            <TextField
                label="Email"
                error={email === ""}
                helperText={email === "" ? 'Required field' : 'We will never share your email'}
                value={email} onChange={e => setEmail(e.target.value)}
            />
            <TextField
                label="Issue"
                error={issue === ""}
                helperText={issue === "" ? 'Required field' : 'Describe your issue'}
                multiline
                value={issue} onChange={e => setIssue(e.target.value)}
            />
            <br></br>
            <Button className={classes.button} variant="contained" onClick={handleSubmit}>Submit</Button>
            
        </FormControl>
        <br></br>  <br></br>  <br></br>  <br></br>  <br></br>
        {success &&
            <Alert variant="filled" severity="success">
                Successfully posted issue!
            </Alert>
        }           
        </React.Fragment>      
    );
}

export default Issue;
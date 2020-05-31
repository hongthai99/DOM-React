import React,{useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
//import axois from 'axois'
import M from 'materialize-css'


const Register = () => {
    const history = useHistory()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const PostRegister = () => {
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html:"Enter correct email", classes:"red"})
            return
        }
        fetch("/register",{
            method: "post",
            headers:{
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res => res.json())
        .then( data => {
            if(data.error){
                M.toast({html: data.error, classes:"red"})
            }
            else{
                M.toast({html: data.message, classes:"green"})
                history.push('/login')
            }
        }).catch(err => {
            console.log(err)
        })
    }

    return(
        <div className="mycard">
          <div className="card auth-card">
            <h3>DOM</h3>
            <input type="text" 
                   placeholder="Name" 
                   value={name}
                   onChange={(event) => setName(event.target.value)}/>
            <input type="text" 
                   placeholder="Email" 
                   value={email}
                   onChange={(event) => setEmail(event.target.value)}/>
            <input type="password"
                   placeholder="Password" 
                   value={password}
                   onChange={(event) => setPassword(event.target.value)}/>
            <button className="btn waves-effect waves-light grey"
                    onClick = {() => PostRegister()}>
                Register
            </button>
            <br/>
            <Link to="/login">
                <h10>
                    Already have an account ?
                </h10>
            </Link>
          </div>
        </div>
        
    )
}

export default Register;
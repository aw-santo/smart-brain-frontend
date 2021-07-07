import React from 'react'

class Signin extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ signInEmail : event.target.value});
    }
    onPasswordChange = (event) => {
        this.setState({ signInPassword : event.target.value});
    }

    onSubmitSignIn = () => {
        // console.log(this.state);
        fetch('https://glacial-falls-60378.herokuapp.com/signin', {
            method : 'post',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.signInEmail,
                password: this.state.signInPassword
            })
        })
        .then(Response => Response.json())
        .then(user => {
            if(user.id){
                console.log("success"); 
                this.props.loadUser(user);        
                this.props.onRouteChange('home');
            }
            else{
                console.log("err")
                // alert("Invalid credentials!");
            }
        });
        
    }
    render(){
        const { onRouteChange } = this.props;
        return (
            <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center" style={{background: 'radial-gradient(rgba(247, 246, 242, 0.3) 0%, rgba(102, 101, 99, 0.2) 100%)'}}>
                <main className="pa4 black-300">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                            <legend className="f1 fw6 ph0 mh0">Sign In</legend>
                            <div className="mt3 tl">
                                <label className="db fw6 lh-copy f5" htmlFor="email-address">Email</label>
                                <input autoComplete='on' onChange={this.onEmailChange} className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" required/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f5 tl" htmlFor="password">Password</label>
                                <input autoComplete='on' onChange={this.onPasswordChange} className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" required/>
                            </div>
                        </fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Sign in" onClick={this.onSubmitSignIn}/>
                        </div>
                        <div className="lh-copy mt3">
                            <p className="f6 link dim black db pointer" onClick={() => onRouteChange('register')}>Register</p>
                        </div>
                    </div>
                </main>
            </article>
        );
    }
}

export default Signin

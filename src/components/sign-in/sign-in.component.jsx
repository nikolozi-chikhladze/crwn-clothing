import React, { Component } from 'react'
import CustomButton from '../custom-button/custom-button.component';
import FormInput from '../form-input/form-input.component';

import {googleSignInStart, emailSignInStart} from '../../redux/user/user.actions'
import { connect } from 'react-redux'

import './sign-in.styles.scss';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();
        const {emailSignInStart} = this.props;
        const {email, password} = this.state;

        emailSignInStart(email, password);
    }

    handleChange = event => {
        const {value, name} = event.target;

        this.setState({[name]: value});
    }

    render() {
        const {googleSignInStart} = this.props;
        return (
            <div className='sign-in'>
                <h2 className="title">I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form action="#" onSubmit={this.handleSubmit}>
                    <FormInput 
                        id="email"
                        name="email"
                        type="email"
                        label="Email"
                        value={this.state.email}
                        handleChange={this.handleChange}
                        required
                    />
                    <FormInput 
                        id="password"
                        name="password"
                        type="password"
                        label="Password"
                        value={this.state.password}
                        handleChange={this.handleChange}
                        required
                    />

                    <div className="buttons">
                        <CustomButton 
                            type="submit"
                        >Sign In</CustomButton>
                        <CustomButton 
                            type="button"
                            onClick={googleSignInStart}
                            isGoogleSignIn
                        >Sign In With Google</CustomButton>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart()),
    emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password})),
})


export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
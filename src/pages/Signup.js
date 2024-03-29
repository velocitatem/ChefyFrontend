import React, { useState } from 'react'
import $ from 'jquery'
import { GoogleLogin, GoogleLogout } from 'react-google-login';
import API from '../components/Api.js'
const clientId = "578407191336-ulb3kvlgu35i2h9dco9786br14s9feqm.apps.googleusercontent.com";



function authUser(data) {

    var settings = {
        "url": API + "/api/login/auth",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json"
        },
        "data": JSON.stringify({ "id": 0, "email": data.email, "password": data.password }),
    };

    $.ajax(settings).done(function (response) {
        console.log("auth :" + response);
        if (response != undefined) {
            localStorage.setItem("user", JSON.stringify(response));
            window.location.pathname = "/account";
        }
        else {
            var settings = {
                "url": API + "/api/registration/new",
                "method": "POST",
                "timeout": 0,
                "headers": {
                    "Content-Type": "application/json"
                },
                "data": JSON.stringify({ "id": 0, "name": data.name, "email": data.email, "password": data.password, "about": "from web", "hash": "string" }),
            };

            $.ajax(settings).done(function (response) {
                if (response == true) {
                    window.location.pathname = "/account"
                    localStorage.setItem("user", settings.data);
                }
            });
        }
    });

}



function Signup() {


    const [loading, setLoading] = useState('Loading...');
    const [user, setUser] = useState(null);

    const handleLoginSuccess = (response) => {
        console.log("Login Success ", response);
        setUser(response.profileObj);
        localStorage.setItem("google-user", JSON.stringify(response.profileObj));
        window.location.pathname = "/google-auth"
        setLoading();
    }

    const handleLoginFailure = error => {
        console.log("Login Failure ", error);
        setLoading();
    }

    const handleLogoutSuccess = (response) => {
        console.log("Logout Success ", response);
        setUser(null);
    }

    const handleLogoutFailure = error => {
        console.log("Logout Failure ", error);
    }


    const handleRequest = () => {
        setLoading("Loading...");
    }

    const handleAutoLoadFinished = () => {
        setLoading();
    }


    function create() {
        var name = $("#name")[0].value
        var email = $("#email")[0].value
        var pass = $("#password")[0].value

        console.log(name, email, pass)

        var data = {
            "id": 0,
            "name": name,
            "email": email,
            "password": pass,
            "about": "web user",
            "hash": "string"
        }


        authUser(data);
    }






    return (
        <>
            <div class="text-3xl py-8 text-center text-white">Sign-up</div>
            <div class="my-10 text-white">
                <center>
                    <div class=" items-center justify-center">
                        <div class="g-signin2 py-4" data-onsuccess="onSignIn"><GoogleLogin clientId={clientId} buttonText={loading} onSuccess={handleLoginSuccess} onFailure={handleLoginFailure} onRequest={handleRequest} onAutoLoadFinished={handleAutoLoadFinished} isSignedIn={true} /></div>
                        <h3 class="text-xl">Or you can sign up with your email</h3>
                        <div class="text-center m-1">
                            <div><input id="name" type="name" class="text-black p-1 m-3 border-b border-green-200 text-center" placeholder="Name"></input></div>
                            <div><input id="email" type="email" class="text-black p-1 m-3 border-b border-green-200 text-center" placeholder="Email"></input></div>
                            <div><input id="password" type="password" class="text-black p-1 m-3 border-b border-green-200 text-center" placeholder="Password"></input></div>
                            <button onClick={create} class="rounded border border-green-400 p-4 m-4">Sign-up</button>
                        </div>
                    </div>
                </center>
            </div>
        </>

    )
}

export default Signup;

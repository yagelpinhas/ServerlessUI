import React, { useContext } from "react";
import ReactDOM from 'react-dom'
import LoginForm from "../LoginForm";
import {render,cleanup, getByTestId, getByText,fireEvent, screen , getByRole} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';

import renderer from "react-test-renderer"
import {expect, jest, test} from '@jest/globals';
import '@testing-library/jest-dom'
import {CredentialsContext, CredentialsProvider} from '../../CredentialsContext/CredentialsContext'


afterEach(cleanup)

it("renders login",()=>{
    const loginForm = render(<CredentialsProvider>
        <LoginForm />
    </CredentialsProvider>)
    const childElement = loginForm.getAllByText("Login")
    expect(childElement).toBeTruthy();
    expect(childElement[0]).toBeInTheDocument();
    
})

it("renders Username",()=>{
    const loginForm = render(<CredentialsProvider>
        <LoginForm />
    </CredentialsProvider>)
    const childElement = loginForm.getAllByText("username")
    expect(childElement).toBeTruthy();
    expect(childElement[0]).toBeInTheDocument();
})

it("renders Password",()=>{
    const loginForm = render(<CredentialsProvider>
        <LoginForm />
    </CredentialsProvider>)
    const childElement = loginForm.getAllByText("password")
    expect(childElement).toBeTruthy();
    expect(childElement[0]).toBeInTheDocument();
})

it("default vaules",()=>{
    const {getByTestId} = render(<CredentialsProvider>
        <LoginForm />
    </CredentialsProvider>);
    const username = getByTestId("login-username-id");
    const password = getByTestId("login-password-id")
    expect(username.value).toBe("")
    expect(password.value).toBe("")
})

it("inputs act normal",()=>{

    const {getByTestId} = render(<CredentialsProvider>
        <LoginForm />
    </CredentialsProvider>);
    const username = getByTestId("login-username-id");
    const password = getByTestId("login-password-id");
    fireEvent.change(username,{target:{value:"adir"}})
    fireEvent.change(password,{target:{value:"24121995"}})
    expect(username.value).toBe("adir");
    expect(password.value).toBe("24121995");
})


it("clicks without error",async ()=>{
    const {getByTestId} = render(<CredentialsProvider>
        <LoginForm />
    </CredentialsProvider>);
    const username = getByTestId("login-username-id");
    const password = getByTestId("login-password-id");
    const loginButton=getByTestId("login-button-id")
    fireEvent.change(username,{target:{value:"adir"}})
    fireEvent.change(password,{target:{value:"24121995"}})
    fireEvent.click(loginButton)
})

it("empty fields",async ()=>{
    const {getByTestId}= render(<CredentialsProvider>
        <LoginForm />
    </CredentialsProvider>);
    const username = getByTestId("login-username-id");
    const password = getByTestId("login-password-id");
    const loginButton=getByTestId("login-button-id")
    fireEvent.change(username,{target:{value:""}})
    fireEvent.change(password,{target:{value:""}})
    fireEvent.click(loginButton)
    expect(await screen.findByText("one of the fields is missing.")).toBeInTheDocument();
})


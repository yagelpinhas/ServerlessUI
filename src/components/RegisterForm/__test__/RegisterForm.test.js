import React from "react";
import ReactDOM from 'react-dom'
import RegisterForm from "../RegisterForm";
import {render,cleanup, getByTestId, getByText, fireEvent, screen} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';

import renderer from "react-test-renderer"
import {expect, jest, test} from '@jest/globals';
import '@testing-library/jest-dom'

afterEach(cleanup)
it("renders register",()=>{
    const registerForm = render(<RegisterForm data-testid="register-form"> </RegisterForm>,{wrapper: MemoryRouter} )
    const childElement = registerForm.getAllByText("Register")
    expect(childElement).toBeTruthy();
    expect(childElement[0]).toBeInTheDocument();
})

it("renders Username",()=>{
    const registerForm = render(<RegisterForm data-testid="register-form"> </RegisterForm>,{wrapper: MemoryRouter} )
    const childElement = registerForm.getAllByText("username")
    expect(childElement).toBeTruthy();
    expect(childElement[0]).toBeInTheDocument();
})

it("renders Password",()=>{
    const registerForm = render(<RegisterForm data-testid="register-form"> </RegisterForm>,{wrapper: MemoryRouter} )
    const childElement = registerForm.getAllByText("password")
    expect(childElement).toBeTruthy();
    expect(childElement[0]).toBeInTheDocument();
})

it("default vaules",()=>{
    const {getByTestId} = render(< RegisterForm/>);
    const username = getByTestId("register-username-id");
    const password = getByTestId("register-password-id")
    expect(username.value).toBe("")
    expect(password.value).toBe("")
})

it("inputs act normal",()=>{
    const {getByTestId} = render(< RegisterForm/>);
    const username = getByTestId("register-username-id");
    const password = getByTestId("register-password-id");
    fireEvent.change(username,{target:{value:"adir"}})
    fireEvent.change(password,{target:{value:"24121995"}})
    expect(username.value).toBe("adir");
    expect(password.value).toBe("24121995");
})

it("clicks without error",async ()=>{
    const {getByTestId} = render(< RegisterForm/>);
    const username = getByTestId("register-username-id");
    const password = getByTestId("register-password-id");
    const registerButton=getByTestId("register-button-id")
    fireEvent.change(username,{target:{value:"tamtam"}})
    fireEvent.change(password,{target:{value:"24121995"}})
    fireEvent.click(registerButton)
})

it("empty fields",async ()=>{
    const {getByTestId}= render(
        <RegisterForm />);
    const username = getByTestId("register-username-id");
    const password = getByTestId("register-password-id");
    const registerButton=getByTestId("register-button-id")
    fireEvent.change(username,{target:{value:""}})
    fireEvent.change(password,{target:{value:""}})
    fireEvent.click(registerButton)
    expect(await screen.findByText("one of the fields is missing.")).toBeInTheDocument();
})






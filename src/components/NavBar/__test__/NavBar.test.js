import React from "react";
import ReactDOM from "react-dom";
import NavBar from "../NavBar";
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom'
import {
  render,
  cleanup,
  getByTestId,
  getByText,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { shallow } from 'enzyme'
import renderer from "react-test-renderer";
import { expect, jest, test } from "@jest/globals";
import "@testing-library/jest-dom";
import {CredentialsContext, CredentialsProvider} from '../../CredentialsContext/CredentialsContext'
import { createContext,useState, useEffect } from "react";
import { wrap } from "module";


afterEach(cleanup);
it("renders register", () => {
  const navBar = render(
    <NavBar data-testid="navbarid" disable>
      {" "}
    </NavBar>,
    { wrapper: MemoryRouter }
  );
  const childElement = navBar.getAllByText("Register");
  expect(childElement).toBeTruthy();
});

it("renders login", () => {
  const navBar = render(
    <NavBar data-testid="navbarid" disable>
      {" "}
    </NavBar>,
    { wrapper: MemoryRouter }
  );
  const childElement = navBar.getAllByText("Login");
  expect(childElement).toBeTruthy();
});


it("renders Log Out", () => {
  const isLoggedIn =true
  const navBar = render(<Router>
    <CredentialsContext.Provider
    value={{isLoggedIn:true}}
    >
      <NavBar></NavBar>  
      </CredentialsContext.Provider>
   </Router>)

  const childElement = navBar.getAllByText("Log Out")
  expect(childElement).toBeTruthy();
  expect(childElement[0]).toBeInTheDocument();
  
});
it("renders Create Item", () => {
  const isLoggedIn =true
  const navBar = render(<Router>
    <CredentialsContext.Provider
    value={{isLoggedIn:true}}
    >
      <NavBar></NavBar>  
      </CredentialsContext.Provider>
   </Router>)

  const childElement = navBar.getAllByText("Create Message")
  expect(childElement).toBeTruthy();
  expect(childElement[0]).toBeInTheDocument();
});

it("renders Hello", () => {
  const isLoggedIn =true
  const navBar = render(<Router>
    <CredentialsContext.Provider
    value={{isLoggedIn:true, nameOfUser:"Tali"}}
    >
      <NavBar></NavBar>  
      </CredentialsContext.Provider>
   </Router>)

  const childElement = navBar.getAllByText("Hello Tali !")
  expect(childElement).toBeTruthy();
  expect(childElement[0]).toBeInTheDocument();
  
});



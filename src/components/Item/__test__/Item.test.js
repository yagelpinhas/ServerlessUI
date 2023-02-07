import React from "react";
import ReactDOM from "react-dom";
import Item from "../Item";
import ItemsForm from "../../ItemsForm/ItemsForm";
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

it("test in item", () => {
    /*
    const itemsForm = render(<Router>
      <CredentialsContext.Provider
      value={{isLoggedIn:true , nameOfUser: "tommy", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbW15In0.LjwKsFftokBDvRsdOvUfioM4TdY_QGQfQEMd79IXnaE"}}
      >
        <ItemsForm>
          <Item itemName="tommyitem1"></Item>
        </ItemsForm>
        </CredentialsContext.Provider>
     </Router>)
  
    const childElement = itemsForm.getAllByText("tommyitem1")
    expect(childElement).toBeTruthy();
    expect(childElement[0]).toBeInTheDocument();
    */
  });
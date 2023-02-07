import React from "react";
import ReactDOM from "react-dom";
import ItemsForm from "../ItemsForm";
import { BrowserRouter as Router, Route,Routes, Link } from 'react-router-dom'
import {
  render,
  cleanup,
  getByTestId,
  getByText,
  screen,
  within,
  waitFor
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { shallow } from 'enzyme'
import renderer from "react-test-renderer";
import { expect, jest, test } from "@jest/globals";
import "@testing-library/jest-dom";
import {CredentialsContext, CredentialsProvider} from '../../CredentialsContext/CredentialsContext'
import { createContext,useState, useEffect } from "react";
import { wrap } from "module";
import { act } from "react-dom/test-utils";
import { wait } from "@testing-library/user-event/dist/utils";
import Item from "../../Item/Item";
import axiosMock from 'axios'
jest.mock('axios')

describe('itemsForms test',()=>{
    beforeEach(() => {
        // fetchMock.resetMocks()
      })
    it("renders items for user", async () => {
        const fakeUsers = {
            "Items": [{"content":"tommycontent1","itemid":"dhsufgdfss","username":"tommy","item":"tommyitem1"}],
            "LastEvaluatedKey": "blabla"
        }
          axiosMock.get.mockResolvedValueOnce({
            data: fakeUsers
          })
    
        let itemsForm = render(<Router>
                <CredentialsContext.Provider
                
    
                value={{isLoggedIn:true , nameOfUser: "tommy", token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRvbW15In0.LjwKsFftokBDvRsdOvUfioM4TdY_QGQfQEMd79IXnaE"}}
                >
                  <ItemsForm></ItemsForm>
                  </CredentialsContext.Provider>
               </Router>)
        expect(axiosMock.get).toHaveBeenCalledTimes(1)
        expect(await screen.findByText("tommyitem1")).toBeInTheDocument()
    
        
      });
})


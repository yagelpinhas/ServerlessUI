import React from "react";
import ReactDOM from 'react-dom'
import CreateMessageForm from "../CreateMessageForm";
import {render,cleanup, getByTestId, getByText, fireEvent} from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom';
import renderer from "react-test-renderer"
import {expect, jest, test} from '@jest/globals';
import '@testing-library/jest-dom'

afterEach(cleanup)
it("renders Create Message",()=>{
    const createMessageForm = render(<CreateMessageForm></CreateMessageForm>,{wrapper: MemoryRouter} )
    const childElement = createMessageForm.getAllByText("Create Message")
    expect(childElement).toBeTruthy();
    expect(childElement[0]).toBeInTheDocument();
})

it("renders Item",()=>{
    const createMessageForm = render(<CreateMessageForm></CreateMessageForm>,{wrapper: MemoryRouter} )
    const childElement = createMessageForm.getAllByText("item")
    expect(childElement).toBeTruthy();
    expect(childElement[0]).toBeInTheDocument();
})

it("renders Content",()=>{
    const createMessageForm = render(<CreateMessageForm></CreateMessageForm>,{wrapper: MemoryRouter} )
    const childElement = createMessageForm.getAllByText("content")
    expect(childElement).toBeTruthy();
    expect(childElement[0]).toBeInTheDocument();
})

it("default vaules",()=>{
    const {getByTestId} = render(< CreateMessageForm/>);
    const item = getByTestId("create-message-form-item-id");
    const content = getByTestId("create-message-form-content-id")
    expect(item.value).toBe("")
    expect(content.value).toBe("")
})

it("inputs act normal",()=>{
    const {getByTestId} = render(< CreateMessageForm/>);
    const item = getByTestId("create-message-form-item-id");
    const content = getByTestId("create-message-form-content-id")
    fireEvent.change(item,{target:{value:"adiritem"}})
    fireEvent.change(content,{target:{value:"adircontent"}})
    expect(item.value).toBe("adiritem");
    expect(content.value).toBe("adircontent");
})

it("clicks without error",()=>{
    const {getByTestId} = render(< CreateMessageForm/>);
    const item = getByTestId("create-message-form-item-id");
    const content = getByTestId("create-message-form-content-id")
    const createMessageButton=getByTestId("create-message-button-id")
    fireEvent.change(item,{target:{value:"adiritem"}})
    fireEvent.change(content,{target:{value:"adircontent"}})
    fireEvent.click(createMessageButton)
})






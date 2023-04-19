import userEvent from '@testing-library/user-event'
import { BrowserRouter, MemoryRouter } from "react-router-dom"
import { render, screen, waitFor} from "@testing-library/react"
import React from "react";
import "@testing-library/jest-dom";
import RouteSwitch from "./RouteSwitch"
import SignUp from "./Components/SignUp"
import Login from "./Components/Login"
import Feed from "./Components/Feed"
import Sidebar from "./Components/Sidebar"
import Tweetbox from "./Components/Tweetbox"
import RightWidgets from './Components/RightWidgets';

describe("Test Sign Up", () => {
  it("Displays form correctly", () => {
    render(<SignUp/>)
    const title = screen.getByText("Create your account")
    expect(title).toBeInTheDocument()
    const name = screen.getByPlaceholderText("Name")
    expect(name).toBeInTheDocument() 
    const username = screen.getByPlaceholderText("Username")
    expect(username).toBeInTheDocument()
    const email = screen.getByPlaceholderText("Email")
    expect(email).toBeInTheDocument()
    const password = screen.getByPlaceholderText("Password")
    expect(password).toBeInTheDocument() 
    const confirmPassword = screen.getByPlaceholderText("Confirm Password")
    expect(confirmPassword).toBeInTheDocument() 
  })
  it("Doesnt't submit when fields left blank", async () => {
    render(<SignUp/>)
    const signUpBtn = screen.getByRole("button")
    const heading = screen.getByText("Create your account")
    userEvent.click(signUpBtn)
    expect(heading).toBeInTheDocument()

  })
  it("Doesn't submit if passwords don't match", async () => {
    render(<SignUp/>)
    const name = screen.getByPlaceholderText("Name") 
    const username = screen.getByPlaceholderText("Username")
    const email = screen.getByPlaceholderText("Email")
    const password = screen.getByPlaceholderText("Password") 
    const confirmPassword = screen.getByPlaceholderText("Confirm Password")
    const header = screen.getByText("Create your account")
    userEvent.type(name, "Test")
    userEvent.type(username, "testUser")
    userEvent.type(email, "testUser@email.com")
    userEvent.type(password, "password")
    userEvent.type(confirmPassword, "password123")
    const signUpBtn = screen.getByRole("button")
    userEvent.click(signUpBtn)
    expect(header).toBeInTheDocument()

  })
  it("Redirects to login page after signing up", async () => {
    const submitMock = jest.fn()
    render(<SignUp submitMock={submitMock}/>)
    const name = await screen.findByPlaceholderText("Name") 
    const username = await screen.findByPlaceholderText("Username")
    const email = await screen.findByPlaceholderText("Email")
    const password = await screen.findByPlaceholderText("Password") 
    const confirmPassword = await screen.findByPlaceholderText("Confirm Password")
    userEvent.type(name, "Test")
    userEvent.type(username, "testUser")
    userEvent.type(email, "testUser@email.com")
    userEvent.type(password, "password")
    userEvent.type(confirmPassword, "password")
    const signUpBtn = screen.getByRole("button")
    userEvent.click(signUpBtn)
    expect(submitMock).toHaveBeenCalled()
  })
})

describe("Test Login", () => {
  it("Logs in correctly with valid details", () => {
    const submitMock = jest.fn()
    render(<Login submitMock={submitMock}/>)
    const email = screen.getByPlaceholderText("Email")
    const password = screen.getByPlaceholderText("Password")
    userEvent.type(email, "test@email.com")
    userEvent.type(password, "password")
    const signInBtn = screen.getByTestId("email-sign-in")
    userEvent.click(signInBtn)
    expect(submitMock).toHaveBeenCalled()
  })
  it("Doesn't log in with invalid details", () => {
    render(<Login/>)
    const email = screen.getByPlaceholderText("Email")
    const password = screen.getByPlaceholderText("Password")
    const header = screen.getByText("Sign in to Twitter")
    userEvent.type(email, "test@email.com")
    userEvent.type(password, "password123")
    const signInBtn = screen.getByTestId("email-sign-in")
    userEvent.click(signInBtn)
    expect(header).toBeInTheDocument()
    
  })
})  

describe("Test dashboard", () => {
  it("Displays sidebar", () => {
    render(<BrowserRouter><Sidebar currentUser={{uid: "A178JjYQz4VwMHcNXojXIJpbGLm1"}}/></BrowserRouter>)
    const sidebarItems = screen.getAllByTestId("sidebar-icon")
    expect(sidebarItems).toHaveLength(8)

  })
  it("Displays tweetbox", () => {
    render(<Tweetbox currentUser={{uid: "A178JjYQz4VwMHcNXojXIJpbGLm1"}}/>)
    const tweetboxIcons = screen.getAllByTestId("tweetbox-icon")
    expect(tweetboxIcons).toHaveLength(6)
    const tweetBtn = screen.getByRole("button")
    expect(tweetBtn).toBeInTheDocument()
  })
  it("Displays right hand widgets", () => {
    render(<RightWidgets/>)
    const search = screen.getByTestId("search")
    expect(search).toBeInTheDocument()
    const trendingItems = screen.getAllByTestId("trending-item")
    expect(trendingItems).toHaveLength(5)
  })
})

describe("Test Tweets", () => {
  it("Doesn't tweet with blank tweetbox", () => {
    const tweetMock = jest.fn()
    render(<Tweetbox currentUser={{uid: "A178JjYQz4VwMHcNXojXIJpbGLm1"}}tweetMock={tweetMock}/>)
    const tweetBtn = screen.getByRole("button")
    userEvent.click(tweetBtn)
    expect(tweetMock).toHaveBeenCalledTimes(0)
  })
  it("Tweets correctly", () => {
    const tweetMock = jest.fn()
    render(<Tweetbox currentUser={{uid: "A178JjYQz4VwMHcNXojXIJpbGLm1"}}tweetMock={tweetMock}/>)
    const input = screen.getByTestId("input")
    userEvent.type(input, "test tweet")
    const tweetBtn = screen.getByRole("button")
    userEvent.click(tweetBtn)
    expect(tweetMock).toHaveBeenCalledTimes(1)
  })
})


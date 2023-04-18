import userEvent from '@testing-library/user-event'
import { MemoryRouter } from "react-router-dom"
import { render, screen, getByText, getAllByRole } from "@testing-library/react"
import React from "react";
import "@testing-library/jest-dom";
import RouteSwitch from "./RouteSwitch"

describe("Test Sign Up", () => {
  it("Displays form correctly", async () => {
    render(<MemoryRouter><RouteSwitch/></MemoryRouter>)
    const signUpBtn = screen.getByRole("link")
    console.log(signUpBtn.textContent)
    await userEvent.click(signUpBtn)
    const title = screen.getByText("Create your account")
    expect(title).toBeInTheDocument()
    const inputs = screen.getByRole("input")
    expect(inputs).toHaveLength(5) 

  })
  it("Doesnt't submit when fields left blank", () => {

  })
  it("Doesn't submit if passwords don't match", () => {

  })
  it("Redirects to login page after signing up", () => {

  })
})

describe("Test Login", () => {
  it("Logs in correctly with valid details", () => {
    // render(<RouteSwitch/>)
    // const email = screen.getByPlaceholderText("Email")
    // const password = screen.getByPlaceholderText("Password")
    // await userEvent.type(email, "oweneaves1@outlook.com")
    // await userEvent.type(password, "Boggle11")
    // const signInBtn = screen.getByTestId("email-sign-in")
    // await userEvent.click(signInBtn)
    // const home = screen.getByText("Home")
    // expect(home).toBeInTheDocument()

  })
  it("Doesn't log in with invalid details", () => {

  })
})  

describe("Test dashboard", () => {
  it("Displays sidebar", () => {

  })
  it("Displays tweetbox", () => {

  })
  it("Displays right hand widgets", () => {

  })
})

describe("Test Tweets", () => {
  it("Doesn't tweet with blank tweetbox", () => {

  })
  it("Tweets correctly", () => {

  })
  it("Displays old tweets from database", () => {

  })
})

describe("Test tweet page", () => {
  it("Renders tweet page correctly", () => {

  })
  it("adds comment to tweet", () => {

  })
})

describe("Test like functionality", () => {
  it("Likes an unliked tweet", () => {

  })
  it("Unlikes a liked tweet", () => {

  })
})

describe("Test retweet functionality", () => {
  it("Retweets when button clicked", () => {

  })
  it ("Renders old retweets from database", () => {

  })
})

describe("Test user pages", () => {
  it("Own user page displays correctly", () => {

  })
  it("Other user page displays correctly", () => {

  })
})
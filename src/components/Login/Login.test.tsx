import configureMockStore from "redux-mock-store"
import thunk from "redux-thunk"
import { Provider } from "react-redux"
import { BrowserRouter, Redirect } from "react-router-dom"
import React from "react"
import Login from "./Login"
import { create } from "react-test-renderer"
import { LoginFormValuesType, LoginReduxForm } from "./LoginForm"

const mockStore = configureMockStore([thunk])


const login = (store: any) => create(
    <BrowserRouter>
        <Provider store={store}>
            <Login/>
        </Provider>
    </BrowserRouter>,
).root.findByType(Login)

const formData: LoginFormValuesType = {
    rememberMe: true,
    email: "email",
    password: "password",
}

describe("Authorized", () => {
    it("User authorized", () => {
        const store = mockStore({ auth: { isAuth: true } })

        const loginChildName = login(store).findByType(Redirect)
        expect(loginChildName).toBeTruthy()
    })

    it("User not authorized", () => {
        const store = mockStore({ auth: { isAuth: false } })

        const loginChildName = login(store).findByType("div")
        expect(loginChildName).toBeTruthy()
    })

    it("User not authorized and go auth", () => {
        let store = mockStore({ auth: { isAuth: false } })
        const loginChildNameDiv = login(store).findByType("div")
        expect(loginChildNameDiv).toBeTruthy()

        login(store).findByType("div").findByType(LoginReduxForm).props.onSubmit(formData)

        store = mockStore({ auth: { isAuth: true } })
        const loginChildNameRedirect = login(store).findByType(Redirect)
        expect(loginChildNameRedirect).toBeTruthy()
    })
})
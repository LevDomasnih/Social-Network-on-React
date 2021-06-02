import { create } from "react-test-renderer"
import User, { UserPropsType } from "./User"
import { BrowserRouter } from "react-router-dom"
import React, { ReactNode } from "react"


const initialState: UserPropsType = {
    user: {
        followed: true,
        photos: {
            small: '',
            large: ''
        },
        status: 'UserStatus',
        name: 'User',
        id: 5
    },
    followingInProgress: [1, 2, 3, 4, 5],
    unfollowUsers: () => {},
    followUsers: () => {},
}

const renderWithRedux = (node: ReactNode) => create(
    <BrowserRouter>
        {node}
    </BrowserRouter>,
)

describe('User test', () => {
    test('Follow', () => {
        const component = renderWithRedux(<User {...initialState} />)
        const element = component.root.findByType("button")
        expect(element.props.children).toBe('Unfollow')
    })

    test('Unfollow', () => {
        initialState.user.followed = false
        const component = renderWithRedux(<User {...initialState} />)
        const element = component.root.findByType("button")
        expect(element.props.children).toBe('Follow')
    })
})
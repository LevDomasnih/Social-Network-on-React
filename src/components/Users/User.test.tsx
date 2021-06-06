import {create} from "react-test-renderer"
import User, {UserPropsType} from "./User"
import {BrowserRouter} from "react-router-dom"
import React, {ReactNode} from "react"
import {Button} from "antd";


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
    followingInProgress: [5],
    unfollowUsers: () => {
    },
    followUsers: () => {
    },
}

const renderWithRedux = (node: ReactNode) => create(
    <BrowserRouter>
        {node}
    </BrowserRouter>,
)

beforeAll(() => {
    window.matchMedia = window.matchMedia || function () {
        return {
            matches: false,
            addListener: function () {
            },
            removeListener: function () {
            }
        };
    };
});

describe('User test', () => {
    test('Follow', () => {
        const component = renderWithRedux(<User {...initialState} />)
        const element = component.root.findByType(Button)
        expect(element.props.children).toBe('Unfollow')
    })

    test('Unfollow', () => {
        initialState.user.followed = false
        const component = renderWithRedux(<User {...initialState} />)
        const element = component.root.findByType(Button)
        expect(element.props.children).toBe('Follow')
    })
})
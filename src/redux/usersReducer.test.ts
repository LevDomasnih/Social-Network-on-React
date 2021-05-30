import usersReducer, { actions, usersStateType } from "./usersReducer"

let state: usersStateType

beforeEach(() => {
    state = {
        users: [
            {
                id: 0,
                name: "User0",
                followed: false,
                status: "status0",
                photos: {
                    small: null,
                    large: null,
                },
            },
            {
                id: 1,
                name: "User1",
                followed: false,
                status: "status1",
                photos: {
                    small: null,
                    large: null,
                },
            },
            {
                id: 2,
                name: "User2",
                followed: false,
                status: "status2",
                photos: {
                    small: null,
                    large: null,
                },
            },
            {
                id: 3,
                name: "User3",
                followed: true,
                status: "status3",
                photos: {
                    small: null,
                    large: null,
                },
            },
        ],
        pageSize: 10,
        totalUsersCount: 0,
        currentPage: 1,
        isFetching: true,
        followingInProgress: [],
        filter: {
            term: '',
            friend: null
        }
    }
})


describe("usersReducer test", () => {
    test("follow success", () => {

        const newState = usersReducer(state, actions.follow(1))

        expect(newState.users[0].followed).toBeFalsy()
        expect(newState.users[1].followed).toBeTruthy()
    })

    test("unfollow success", () => {

        const newState = usersReducer(state, actions.unfollow(3))

        expect(newState.users[2].followed).toBeFalsy()
        expect(newState.users[3].followed).toBeFalsy()
    })

})
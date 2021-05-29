import {actions, followUsers, unfollowUsers} from "./usersReducer"
import { usersAPI } from "../API/usersAPI"
import { ResponseType, ResultCodesEnum } from "../API/api"

jest.mock("../API/usersAPI")
const userAPIMock = usersAPI as jest.Mocked<typeof usersAPI>

const dispatchMock = jest.fn()
const getStateMock = jest.fn()

beforeEach(() => {
    dispatchMock.mockClear()
    getStateMock.mockClear()
    userAPIMock.followUsers.mockClear()
    userAPIMock.unfollowUsers.mockClear()
})

const resultSuccess: ResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodesEnum.Success,
}

const resultError: ResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodesEnum.Error,
}

describe('follow-unfollow success', () => {

    test("follow success", async () => {
        userAPIMock.followUsers.mockReturnValue(Promise.resolve(resultSuccess))

        const thunk = await followUsers(1)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow(1))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
    })

    test("unfollow success", async () => {
        userAPIMock.unfollowUsers.mockReturnValue(Promise.resolve(resultSuccess))

        const thunk = await unfollowUsers(1)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(3)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow(1))
        expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.toggleFollowingProgress(false, 1))
    })

})

describe('follow-unfollow error', () => {

    test("follow error", async () => {
        userAPIMock.followUsers.mockReturnValue(Promise.resolve(resultError))

        const thunk = await followUsers(1)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(2)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowingProgress(false, 1))
    })

    test("unfollow error", async () => {
        userAPIMock.unfollowUsers.mockReturnValue(Promise.resolve(resultError))

        const thunk = await unfollowUsers(1)

        await thunk(dispatchMock, getStateMock, {})

        expect(dispatchMock).toBeCalledTimes(2)
        expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.toggleFollowingProgress(true, 1))
        expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.toggleFollowingProgress(false, 1))
    })

})


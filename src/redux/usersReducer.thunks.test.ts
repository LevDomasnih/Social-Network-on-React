import { followUsers } from "./usersReducer"
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

const result: ResponseType = {
    data: {},
    messages: [],
    resultCode: ResultCodesEnum.Success,
}

userAPIMock.followUsers.mockReturnValue(Promise.resolve(result))

test("follow success", async () => {
    const thunk = await followUsers(2)

    await thunk(dispatchMock, getStateMock, {})

    expect(dispatchMock).toBeCalledTimes(3)
})


// TODO ref, not work :(
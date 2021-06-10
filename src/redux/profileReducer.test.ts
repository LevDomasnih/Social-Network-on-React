import profileReducer, {actions} from "./profileReducer";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 105},
        {id: 2, message: "It's my first post", likesCount: 10},
        {id: 3, message: "Lol", likesCount: 5000},
        {id: 4, message: "Kek", likesCount: 9400},
    ],
    ownProfile: null,
    profile: null,
    status: '',
}

test('length of posts should be incremented', () => {
    // 1. test data
    let action = actions.addPost("Hello!!!!");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(5);
});

test('message of new post should be correct', () => {
    // 1. test data
    let action = actions.addPost("New Test");

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts[0].message).toBe("New Test");
});

test('after deleting length of messages should be decrement', () => {
    // 1. test data
    let action = actions.deletePost(1);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(3);
});

test(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    // 1. test data
    let action = actions.deletePost(1000);

    // 2. action
    let newState = profileReducer(state, action);

    // 3. expectation
    expect(newState.posts.length).toBe(4);
});

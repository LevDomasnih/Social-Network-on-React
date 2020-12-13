import {rerenderEntireTree} from "../render";

let state = {

    profilePage: {
        posts: [
            {id: 1, message: 'Hi, how are you?', likesCount: 105},
            {id: 2, message: "It's my first post", likesCount: 10},
            {id: 3, message: "Lol", likesCount: 5000},
            {id: 4, message: "Kek", likesCount: 9400},
        ],
        newPostText: '',
    },
    dialogsPage: {
        messages: [
            {id: 1, message: 'Hi'},
            {id: 2, message: 'How are you?'},
            {id: 3, message: "I'm fine"},
        ],
        dialogs: [
            {
                id: 1,
                name: "Andrey",
                avatar: "https://lh3.googleusercontent.com/proxy/UzqaLo7HhTVxipOG77A1RoGgCgrbkJmwTfxEXBzul8I87SMJKrGZm0aH2PspTL6gUXmEZfywpDrSE0hEdUg7TH9ELWwtASu2JVEa402EJY3ODje5QMqtUd9DouYpQzgP1cW3FHql58FbxAxZzacI1cGzlsUQWRrZLhDzj5k"
            },
            {
                id: 2,
                name: "Valera",
                avatar: "https://pm1.narvii.com/6805/09a1ecaf3a8662e0fb7d482e13d9b865088486f2v2_hq.jpg"
            },
            {
                id: 3,
                name: "Svetha",
                avatar: "https://tiktok-wiki.ru/wp-content/uploads/2020/05/avatarki-dlya-tik-toka1.jpg"
            },
            {id: 4, name: "Leva", avatar: "https://f1.upet.com/A_r2u6uZhnxA_x.jpg"},
            {
                id: 5,
                name: "Kris",
                avatar: "https://avatars.mds.yandex.net/get-zen_doc/3420563/pub_5f0081e091f42b3b785b61a4_5f0082848694a157aa179dd0/scale_1200"
            },
            {
                id: 6,
                name: "Sasha",
                avatar: "https://static10.tgstat.ru/channels/_0/de/deeb9f0e7b43dc6d67f4628356c274d7.jpg"
            },
        ],
    },


    sidebar:
        {
            friends: [
                {
                    id: 1,
                    name: "Andrey",
                    avatar: "https://lh3.googleusercontent.com/proxy/UzqaLo7HhTVxipOG77A1RoGgCgrbkJmwTfxEXBzul8I87SMJKrGZm0aH2PspTL6gUXmEZfywpDrSE0hEdUg7TH9ELWwtASu2JVEa402EJY3ODje5QMqtUd9DouYpQzgP1cW3FHql58FbxAxZzacI1cGzlsUQWRrZLhDzj5k"
                },
                {
                    id: 2,
                    name: "Valera",
                    avatar: "https://pm1.narvii.com/6805/09a1ecaf3a8662e0fb7d482e13d9b865088486f2v2_hq.jpg"
                },
                {
                    id: 3,
                    name: "Svetha",
                    avatar: "https://tiktok-wiki.ru/wp-content/uploads/2020/05/avatarki-dlya-tik-toka1.jpg"
                },
            ]
        }
}
window.state = state

export const addPost = () => {
    if(state.profilePage.newPostText === '') return;
    let newPost = {
        id: 5,
        message: state.profilePage.newPostText,
        likesCount: 0,
    }
    state.profilePage.posts.push(newPost);
    state.profilePage.newPostText = '';
    rerenderEntireTree(state);
}

export const updateNewPostText = (newText) => {
    state.profilePage.newPostText = newText;
    rerenderEntireTree(state);
}



export default state;
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let dialogs = [
    {id: 1, name: "Andrey"},
    {id: 2, name: "Valera"},
    {id: 3, name: "Svetha"},
    {id: 4, name: "Leva"},
    {id: 5, name: "Kris"},
    {id: 6, name: "Sasha"},
];

let messages = [
    {id: 1, message: 'Hi'},
    {id: 2, message: 'How are you?'},
    {id: 3, message: "I'm fine"},
];

let posts = [
    {id: 1, message: 'Hi, how are you?', likesCount: 105},
    {id: 2, message: "It's my first post", likesCount: 10},
    {id: 3, message: "Lol", likesCount: 5000},
    {id: 4, message: "Kek", likesCount: 9500},
];

ReactDOM.render(
  <React.StrictMode>
    <App dialogs={dialogs} messages={messages} posts={posts} />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

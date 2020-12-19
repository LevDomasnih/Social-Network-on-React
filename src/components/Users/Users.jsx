import React from 'react';
import classes from './user.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/userPhoto.jpg'

const Users = (props) => {
    const getUsers = () => {
        if (props.users.length === 0) {

            axios.get("https://social-network.samuraijs.com/api/1.0/users").then(response => {
                debugger;
                props.setUsers(response.data.items);
            })
        }
    }
        // props.setUsers([
        //     {
        //         id: 1,
        //         photoUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQyddo-97z_upyrInLR38dIrT__x3Ov1lijg&usqp=CAU",
        //         followed: false,
        //         fullName: 'Lev',
        //         status: 'Programmer =)))',
        //         location: {city: 'Prague', country: 'Czech'}
        //     },
        //     {
        //         id: 2,
        //         photoUrl: "https://pm1.narvii.com/6805/09a1ecaf3a8662e0fb7d482e13d9b865088486f2v2_hq.jpg",
        //         followed: true,
        //         fullName: 'Kris',
        //         status: 'DESIGNER ',
        //         location: {city: 'Prague', country: 'Czech'}
        //     },
        //     {
        //         id: 3,
        //         photoUrl: "https://tiktok-wiki.ru/wp-content/uploads/2020/05/avatarki-dlya-tik-toka1.jpg",
        //         followed: true,
        //         fullName: 'Sasha',
        //         status: 'LOOOOOOOL',
        //         location: {city: 'Tver', country: 'Russia'}
        //     },
        //     {
        //         id: 4,
        //         photoUrl: "https://avatars.mds.yandex.net/get-zen_doc/3420563/pub_5f0081e091f42b3b785b61a4_5f0082848694a157aa179dd0/scale_1200",
        //         followed: false,
        //         fullName: 'Yaroslav',
        //         status: 'AUUUUFFF',
        //         location: {city: 'Moscow', country: 'Russia'}
        //     },
        //     {
        //         id: 5,
        //         photoUrl: "https://static10.tgstat.ru/channels/_0/de/deeb9f0e7b43dc6d67f4628356c274d7.jpg",
        //         followed: true,
        //         fullName: 'Andrew',
        //         status: 'Hi everyone ',
        //         location: {city: 'Perm', country: 'Russia'}
        //     },
        // ])

    return (
        <div>
            <button onClick={getUsers}>GET USERS</button>
            {props.users.map((u) => (
                    <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small !=null ? u.photos.small : userPhoto} className={classes.userPhoto}/>
                        </div>
                        <div>
                            { u.followed
                                ? <button onClick={ () => { props.changeFollow(u.id) } }>Unfollow</button>
                                : <button onClick={ () => { props.changeFollow(u.id) } }>Follow</button>
                            }
                        </div>
                    </span>
                        <span>
                        <span>
                            <div>{u.name}</div>
                            <div>{u.status}</div>
                        </span>
                        <span>
                            <div>{"u.location.city"}</div>
                            <div>{"u.location.country"}</div>
                        </span>
                    </span>
                    </div>
                )
            )}
        </div>
    );
}

export default Users;
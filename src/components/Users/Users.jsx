import React from 'react';
import classes from './user.module.css';
import * as axios from 'axios';
import userPhoto from '../../assets/images/userPhoto.jpg'

class Users extends React.Component {
    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`)
            .then(response => {
            // debugger;
            this.props.setUsers(response.data.items);
            this.props.setTotalUsersCount(response.data.totalCount)
        })
    }

    onPageChanged = (page) => {
        this.props.setCurrentPage(page);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${this.props.pageSize}`)
            .then(response => {
                // debugger;
                this.props.setUsers(response.data.items);
            })
    }


    render() {
        // debugger;
        let pagesCount = Math.ceil(this.props.totalUsersCount / this.props.pageSize);

        let pages = [];
        for (let i=1; i <= pagesCount; i++) {
            pages.push(i);
        }

        return (
            <div>
                <div>
                    {
                        pages.map((p) => {
                            return <span onClick={ (e) => {this.onPageChanged(p)}} className={this.props.currentPage === p && classes.selectedPage}>{p}</span>
                        })
                    }
                </div>
                {this.props.users.map((u) => (
                        <div key={u.id}>
                    <span>
                        <div>
                            <img src={u.photos.small != null ? u.photos.small : userPhoto}
                                 className={classes.userPhoto}/>
                        </div>
                        <div>
                            {u.followed
                                ? <button onClick={() => {
                                    this.props.changeFollow(u.id)
                                }}>Unfollow</button>
                                : <button onClick={() => {
                                    this.props.changeFollow(u.id)
                                }}>Follow</button>
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
}

export default Users;
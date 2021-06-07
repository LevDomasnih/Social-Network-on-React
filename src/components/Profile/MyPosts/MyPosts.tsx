import React, {FC, useState} from 'react';
import Post from "./Post/Post";
import {PostType} from "../../../types/types";
import {PostFormValuesType} from "./AddNewPostForm";
import {Avatar, Button, Comment, Form, Input, List} from 'antd';
import moment from 'moment';
import {useSelector} from "react-redux";
import {getUserProfile} from "../../../redux/profileReducer";
import {AppStateType} from "../../../redux/reduxStore";

const {TextArea} = Input;

type PropsType = {
    addPost: (values: string) => void
    posts: Array<PostType>
}

interface PersonProps {
    author: string
    avatar: string
    content: React.ReactElement
    datetime: string,
}

type EditorType = {
    onChange: (e: { target: HTMLTextAreaElement }) => void
    onSubmit: () => void
    submitting: boolean
    value: string
}

type CommentListType = {
    comments: Array<PersonProps>
}

const MyPosts: React.FC<PropsType> = React.memo(({addPost, posts}) => {

    // const postsElements = posts.map((p) => <Post message={p.message} likesCount={p.likesCount}
    //                                              key={p.id}/>);
    // const addNewPost = (values: PostFormValuesType) => {
    //     addPost(values.newPost)
    // };

    const fullName = useSelector((state: AppStateType) => state.profilePage.profile?.fullName)
    const photo = useSelector((state: AppStateType) => state.profilePage.profile?.photos.small)

    const [comments, setComments] = useState<Array<PersonProps> | []>([])
    const [value, setValue] = useState('')
    const [submitting, setSubmitting] = useState(false)



    const handleSubmit = () => {
        if (!value) {
            return;
        }

        setSubmitting(true)

        setTimeout(() => {
            setSubmitting(false)
            setComments((prev) => [
                {
                    author: fullName || '',
                    avatar: photo || '',
                    content: <p>{value}</p>,
                    datetime: moment().fromNow(),
                },
                ...prev,

            ])
        }, 1000);
        setValue('')
    }

    const handleChange = (e: { target: HTMLTextAreaElement }) => {
        setValue(e.target.value)
    };

    return (
        <>
            <Comment
                avatar={
                    <Avatar
                        src={photo || ''}
                        alt={fullName}
                    />
                }
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                    />
                }
            />
            {comments.length > 0 && <CommentList comments={comments}/>}
        </>
    );
});

export default MyPosts;

const CommentList: FC<CommentListType> = ({comments}) => (
    <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment {...props} />}
    />
);

const Editor: FC<EditorType> = ({onChange, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);
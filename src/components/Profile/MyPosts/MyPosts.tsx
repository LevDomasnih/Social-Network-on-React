import React, {createElement, FC, useState} from 'react';
import {Avatar, Button, Comment, Form, Input, List, Tooltip} from 'antd';
import moment from 'moment';
import {useSelector} from "react-redux";
import {AppStateType} from "../../../redux/reduxStore";
import {DislikeOutlined, LikeOutlined, DislikeFilled, LikeFilled, UserOutlined} from '@ant-design/icons';

const {TextArea} = Input;

type PropsType = {
    isOwner: boolean
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
    isDisabled?: boolean
    text: string
}

type CommentListType = {
    comments: Array<PersonProps>
}

const MyPosts: React.FC<PropsType> = React.memo(({isOwner}) => {

    // const postsElements = posts.map((p) => <Post message={p.message} likesCount={p.likesCount}
    //                                              key={p.id}/>);
    // const addNewPost = (values: PostFormValuesType) => {
    //     addPost(values.newPost)
    // };

    const fullName = useSelector((state: AppStateType) => state.profilePage.profile?.fullName)
    const photo = useSelector((state: AppStateType) => isOwner ? state.profilePage.ownProfile?.photos.small : state.profilePage.profile?.photos.small)

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
                        src={photo}
                        icon={<UserOutlined />}
                        alt={fullName}
                    />
                }
                content={
                    <Editor
                        onChange={handleChange}
                        onSubmit={handleSubmit}
                        submitting={submitting}
                        value={value}
                        text={'Add comment'}
                    />
                }
            />
            {comments.length > 0 && <CommentList comments={comments}/>}
        </>
    );
});

export default MyPosts;

const CommentList: FC<CommentListType> = ({comments}) => {

    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState<'liked' | 'disliked' | null>(null);

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
          <span className="comment-action">{likes}</span>
      </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
          <span className="comment-action">{dislikes}</span>
      </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    return (
        <List
        dataSource={comments}
        header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
        itemLayout="horizontal"
        renderItem={props => <Comment actions={actions} {...props} />}
    />
    )
};

export const Editor: FC<EditorType> = ({onChange, onSubmit, submitting, value, isDisabled = false, text}) => (
    <>
        <Form.Item>
            <TextArea rows={2} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} disabled={isDisabled} type="primary">
                {text}
            </Button>
        </Form.Item>
    </>
);
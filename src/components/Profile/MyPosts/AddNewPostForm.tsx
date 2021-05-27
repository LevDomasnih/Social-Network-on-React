import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetStringKeys, Input, Textarea} from "../../common/FormsControls/FormsControls";
import {maxLengthCreator, required} from "../../../utils/validators/validators";
import React from "react";

export type PostFormValuesType = {
    newPost: string
}

type PropsType = {

}

type PostFormValuesTypeKeys = GetStringKeys<PostFormValuesType>

const maxLength = maxLengthCreator(10);

const AddNewPostForm: React.FC<InjectedFormProps<PostFormValuesType, PropsType> & PropsType> = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<PostFormValuesTypeKeys>('Enter you post...', 'newPost', [required, maxLength], Textarea)}
            <div>
                <button>Add Post</button>
            </div>
        </form>
    );
};

export const AddNewPostFormRedux = reduxForm<PostFormValuesType, PropsType>({
    form: 'profileAddNewPostForm'
})(AddNewPostForm);
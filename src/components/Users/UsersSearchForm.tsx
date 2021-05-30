import {FilterType} from "../../redux/usersReducer";
import React, {FC} from "react";
import {Field, Form, Formik, FormikHelpers} from "formik";

const usersSearchFromValidate = (values: any) => {
    const errors = {}
    return errors
}

type FormType = {
    term: string
    friend: "true" | "false" | "null"
}

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm: FC<UsersSearchFormPropsType> = ({onFilterChanged}) => {

    const submit = ({friend, term}: FormType, {setSubmitting}: FormikHelpers<any>) => {
        const filter: FilterType = {
            term: term,
            friend: friend === "null" ? null : friend == "true"
        }
        onFilterChanged(filter)
        setSubmitting(false)
    }

    return (
        <div>
            <Formik
                initialValues={{term: "", friend: "null"}}
                validate={usersSearchFromValidate}
                onSubmit={submit}
            >
                {({isSubmitting}) => (
                    <Form>
                        <Field type="text" name="term"/>
                        <Field name="friend" as={"select"}>
                            <option value={"null"}>All</option>
                            <option value={"true"}>Followed</option>
                            <option value={"false"}>Unfollowed</option>
                        </Field>

                        <button type="submit" disabled={isSubmitting}>
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}
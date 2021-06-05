import {FilterType} from "../../redux/usersReducer";
import React, {FC} from "react";
import {Form, Input, Select} from 'antd';
import {useHistory} from "react-router-dom";
import queryString from "querystring";
import {QueryParamsType} from "./Users";

const {Option} = Select;

interface FieldData {
    name: string | number | (string | number)[];
    value?: any;
    touched?: boolean;
    validating?: boolean;
    errors?: string[];
}

type UsersSearchFormPropsType = {
    onFilterChanged: (filter: FilterType) => void
}
export const UsersSearchForm: FC<UsersSearchFormPropsType> = ({onFilterChanged}) => {

    const history = useHistory()
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

    const handleChange: (field: Array<FieldData>, fields: Array<FieldData>) => void = (_, form) => {
        const term: string = form[0].value
        const friend: string = form[1].value
        const filter: FilterType = {
            term: term,
            friend: friend === "all" ? null : friend == "true"
        }
        onFilterChanged(filter)
    }

    return (
        <div>
            <Form onFieldsChange={handleChange}>
                <Input.Group compact>
                    <Form.Item
                        name='term'
                        noStyle
                        rules={[{required: true, message: 'Street is required'}]}
                        initialValue={parsed.term}
                    >
                        <Input style={{width: '75%'}} placeholder="Search"/>
                    </Form.Item>
                    <Form.Item
                        name='friend'
                        noStyle
                        rules={[{required: true}]}
                        initialValue={parsed.friend || 'all'}
                    >
                        <Select placeholder="All">
                            <Option value="all">All</Option>
                            <Option value="true">Followed</Option>
                            <Option value="false">Unfollowed</Option>
                        </Select>
                    </Form.Item>
                </Input.Group>
            </Form>
        </div>
    )
}
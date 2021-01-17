import React, {useState, useEffect} from 'react';


const ProfileStatusWithHooks = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect( () => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus(status)
    }

    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            <b>Status: </b>
            {!editMode &&
            <span>
                <span onDoubleClick={ activateEditMode } >{props.status || 'No status'}</span>
            </span>
            }
            {editMode &&
            <span>
                <input onChange={ onStatusChange }
                       onBlur={ deactivateEditMode }
                       autoFocus={true} value={status}
                />
            </span>
            }
        </div>
    )

};

export default ProfileStatusWithHooks;
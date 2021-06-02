import React, {ChangeEvent, useEffect, useState} from 'react';
//TODO BAG ?
type PropsType = {
    updateStatus?: (newStatus: string) => void
    status: string
    isOwner: boolean
}

const ProfileStatusWithHooks: React.FC<PropsType> = (props) => {
    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        if (!props.isOwner) return
        setEditMode(true);
    }

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateStatus?.(status)
    }

    const onStatusChange = (e: ChangeEvent<HTMLInputElement>) => {
        setStatus(e.currentTarget.value);
    }

    return (
        <div>
            <b>Status: </b>
            {!editMode ?
                <span onDoubleClick={activateEditMode}>{props.status || 'No status'}</span> :
                <input onChange={onStatusChange}
                       onBlur={deactivateEditMode}
                       autoFocus={true} value={status}
                />
            }
        </div>
    )

};

export default ProfileStatusWithHooks;
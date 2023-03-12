import axios from 'axios';
import React, { useEffect, useState } from 'react';

function GroupList() {
    const [groups, setGroups] = useState([])
    const [groupName, setGroupName] = useState("")
    const [userName, setUserName] = useState("")
    useEffect(() => {
        getAllGroups()
    }, [])
    const getAllGroups = () => {
        axios.get("https://localhost:3000/api/groups/groups").then((response) => {
            if (response.data.statusCode === 200) {
                setGroups(response.data?.groups)
            }
        })
    }
    const handleCreateGroup = () => {
        axios.post("/", {name : groupName, members : userName})
    }
    const handleGroupName = (e) => {
setGroupName(e.target.value)
    }
    const handleUserName = (e) => {
        setUserName(e.target.value)
    }
    return (
        <>
            <div>
                <button onClick={handleCreateGroup}>Create Group</button>
                <label

                    htmlFor="Groupname">Groupname:</label>
                <input

                    type="text"
                    id="groupname"
                    value={groupName}
                    onChange={(e) => handleGroupName}
                />
                <label

                    htmlFor="Username">Username:</label>
                <input

                    type="text"
                    id="username"
                    value={userName}
                    onChange={(e) => handleUserName}
                />

            </div>

            <ul>
                {groups.map(group => (
                    <li key={group.id}>
                        {group.name}
                    </li>
                ))}
            </ul>
        </>
    );
}

export default GroupList;
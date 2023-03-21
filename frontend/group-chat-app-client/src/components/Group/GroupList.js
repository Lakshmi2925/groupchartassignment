import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {v4 as uuidv4} from "uuid"
import { useNavigate } from 'react-router-dom';
function GroupList() {
    const [groups, setGroups] = useState([])
    const [groupName, setGroupName] = useState("")
    const [userName, setUserName] = useState("")
    const navigate = useNavigate();
    useEffect(() => {
        getAllGroups()
    }, [])
    const getAllGroups = () => {
        axios.get("http://localhost:3000/api/groups/groups").then((response) => {
            if (response.data.statusCode === 200) {
                setGroups(response.data?.groups)
            }
        })
    }
    const handleCreateGroup = () => {
        let body = {
            name: groupName,
            description: "This is for python developers",
            users: [
                uuidv4,
                
            ],
            messages: [
                uuidv4,
                
            ]
        }
        axios.post("http://localhost:3000/api/groups/", body).then((response) => {
            if (response.status === 200){
                navigate('/chat');
            }
        })
    }
    const handleGroupName = (e) => {
        // alert(e.target.value)
        console.log(e.target.value, "eeeee>>>>>>>>>>>>>");
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
                    name='Group Name'
                    type="text"
                    // id="groupname"
                    value={groupName}
                    onChange={handleGroupName}
                />
                <label

                    htmlFor="Username">Username:</label>
                <input
                    name='User Name'
                    type="text"
                    // id="username"
                    value={userName}
                    onChange={handleUserName}
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
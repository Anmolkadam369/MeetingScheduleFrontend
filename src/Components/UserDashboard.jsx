import React, { useState, useEffect } from 'react';
import { useSelector ,useDispatch } from 'react-redux';
import { logout as logoutAction } from '../redux/actions';
import { useNavigate } from 'react-router-dom';

const UserDashoard = () => {
    const dispatch = useDispatch(); 
    const navigate = useNavigate();
    const userData = useSelector((state) => state.userData);
    console.log(userData);
    let token = userData.token;
    let userId = userData.userId;
    console.log(token, userId);
    const [showBox, setShowBox] = useState(false);
    const [showMeetings, setShowMeetings] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const [allusersData, setAllUsersData] = useState([]);
    const [allMeetingData, setAllMeetingData] = useState([]);

    const [showEditModal, setShowEditModal] = useState(false);
    const [editMeetingId, setEditMeetingId] = useState('');
    const [defaultScreen, setDefaultScreen] = useState(true);

    console.log(allMeetingData)

    const [editFormData, setEditFormData] = useState({
        title: "",
        time: "",
        date: "",
        meetWith: ""
    });

    const [formData, setFormData] = useState({
        title: "",
        time: "",
        date: "",
        meetWith: ""

    })
    console.log(formData)
    useEffect(() => {

        fetch(`http://localhost:3001/users/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status === true) {
                    const allData = result.data;
                    setAllUsersData(allData);
                    setErrorMessage('')
                } else {
                    setErrorMessage('Failed to fetch UserData data');
                }
            })
            .catch((error) => {
                console.error('error', error);
            });

            fetch(`http://localhost:3001/meetings/${userId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((response) => response.json())
                .then((result) => {
                    if (result.status === true) {
                        const allData = result.data;
                        setAllMeetingData(allData);
                        setErrorMessage('')
                    }
                    if (result.status === false) {
                        console.log("data deleted ")
                        setAllMeetingData([])
                    }
                })
                .catch((error) => {
                    console.error('error', error);
                });

    }, [userId, token]);

    const meetingSchedule = () => {
        console.log("some")
        fetch(`http://localhost:3001/scheduleMeeting/${userId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("result ", result)
                if (result.status === true) {
                    console.log("meeting scheduled")
                    setFormData({
                        title: '',
                        time: '',
                        date: '',
                        meetWith: '',
                    });
                    setErrorMessage('');
                    setSuccessMessage("Meeting Scheduled !!!");
                }
                else {
                    setErrorMessage('Meeting is Already Scheduled');
                    setSuccessMessage('');
                }
            })
            .catch((error) => {
                console.error('error', error);
            });
    }

    const myMeeting = () => {
        setShowMeetings(true);
        setShowBox(false);
        setShowEditModal(false);
        setDefaultScreen(false)


        fetch(`http://localhost:3001/meetings/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.status === true) {
                    const allData = result.data;
                    setAllMeetingData(allData);
                    setErrorMessage('')
                }
                if (result.status === false) {
                    console.log("data deleted ")
                    setAllMeetingData([])
                }
            })
            .catch((error) => {
                console.error('error', error);
            });

    }

    const EditMeeting =  (meetingId) => {
        fetch(`http://localhost:3001/updateMeet/${userId}/${meetingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(editFormData),
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("result ", result)
                if (result.status === true) {
                    console.log("meeting schedule Updated")
                    setEditFormData({
                        title: '',
                        time: '',
                        date: '',
                        meetWith: '',
                    });
                    setErrorMessage('');
                    setSuccessMessage("Meeting schedule Updated !!!");
                }
                else {
                    setErrorMessage('Meeting is Already Scheduled');
                    setSuccessMessage('');
                }
            })
            .catch((error) => {
                console.error('error', error);
            });
    }

    const deleteMeet = (meetingId) => {
        console.log("meeting", meetingId);
        fetch(`http://localhost:3001/meetings/${userId}/${meetingId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then((response) => response.json())
            .then((result) => {
                console.log("result", result);
                if (result.status === true) {
                    setErrorMessage('');
                    setSuccessMessage("Meeting Deleted !!!");
                    setAllMeetingData((prevData) =>
                        prevData.filter((meet) => meet._id !== meetingId)
                    );
                } else {
                    setSuccessMessage('');
                }
            })
            .catch((error) => {
                console.error("error", error);
            });
    };

    const AddMeeting = () => {
        setShowBox(true);
        setShowMeetings(false);
        setShowEditModal(false);
        setDefaultScreen(false)

    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
        console.log(name, value);
        setErrorMessage('');
        setSuccessMessage('');
    }

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        
        setEditFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const openEditModal = (meetingId, meet) => {
        setShowEditModal(true);
        setShowMeetings(false);
        setDefaultScreen(false);

        setShowBox(false);
        setEditMeetingId(meetingId);
        setEditFormData({
            title: meet.title,
            meetWith: meet.meetWith,
            time: meet.time,
            date: meet.date,
        });
    };

    const logout = ()=>{
        console.log("logout")
        dispatch(logoutAction());
        navigate('/');
    }

    const closeEditModal = () => {
        setShowEditModal(false);
        setShowMeetings(true);
        setEditMeetingId('');
        setEditFormData({
            time: '',
            date: '',
        });
    };



    return (
        <div>
            <div className='flex'>

                <div className='ml-20 mt-20 w-1/5 flex flex-col h-screen m-3 border-blue-100 rounded-md border-2 shadow-xl'>
                    <button className='m-10 ml-10 p-3 text-center rounded-md rouded-md border-2 border-green-200  shadow-xl text-xl font-bold' onClick={AddMeeting} >Add Meeting + </button>
                    <button className='m-10 ml-10 p-3 text-center rounded-md rouded-md border-2 border-green-200  shadow-xl text-xl font-bold' onClick={myMeeting} >My Meetings </button>
                    <button className='m-10 ml-10 p-3 text-center rounded-md rouded-md border-2 border-green-200  shadow-xl text-xl font-bold'onClick={logout} >Logout </button>

                </div>


                <div className='m-3 border-blue-100 rounded-md ml-20 mt-20'>
                    <div className="flex justify-center ml-20 h-screen">
                        
                    { defaultScreen && (
                                <div className="m-5 w-full  rounded-md  shadow-lg ">
                                    {allMeetingData.map((meet) => (
                                        <div key={meet._id} className="p-3 bg-white border-2 border-blue-200  shadow-xl m-5 rounded-md  w-full">
                                            <div className='flex'>
                                                <div>
                                                    <p className="text-2xl font-extrabold mb-2 text-blue-600">Meet Title: {meet.title}</p>
                                                    <p className="text-lg font-bold mb-2">Meet Organized By: {meet.conductedBy}</p>
                                                    <p className="text-lg font-bold mb-2">Meet with: {meet.meetWith}</p>
                                                    <p className="text-lg font-bold mb-2">Meet Date: {meet.date}</p>
                                                    <p className="text-lg font-bold mb-2">Meet Time: {meet.time}</p>
                                                </div>
                                                <button
                                                    className="mt-20 ml-20 h-10 w-1/6 text-white border-2 rounded-full bg-green-600"
                                                    onClick={() => openEditModal(meet._id, meet)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className='w-1/6 h-10 mt-20 ml-10 rounded-full bg-red-500 border-2 text-white'
                                                    onClick={() => deleteMeet(meet._id)}
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                        {showBox && (
                            <div className='p-3 bg-white  m-5 text-center rounded-md'>
                                <div>{errorMessage && (
                                    <div className="mt-10 mb-10 text-red-500 font-bold text-center">{errorMessage}</div>
                                )}</div>
                                <div>{successMessage && (
                                    <div className="mt-10 mb-10 text-green-500 font-bold text-center">{successMessage}</div>
                                )}</div>
                                <div className='border-2 border-blue-200 rounded-md shadow-xl'>
                                    <p className='font-bold text-2xl mt-5 mb-5 text-blue-600 underline shadow-lg p-3 bg-white rounded-md'>  Add Meeting</p>
                                    <hr />
                                    <input type="text"
                                        name="title"
                                        value={formData.title}
                                        className='mt-10 box-content h-1 w-1/2 p-4 border-2 border-black rounded-md '
                                        placeholder='Meeting Title'
                                        onChange={handleInputChange}
                                    />

                                    <input type="time"
                                        name="time"
                                        value={formData.time}
                                        className='mt-5 box-content h-1 w-1/2 p-4 border-2 border-black rounded-md'
                                        placeholder='Meeting Time'
                                        onChange={handleInputChange}
                                    />
                                    <input
                                        type="date"
                                        name="date"
                                        value={formData.date}
                                        className='mt-5 box-content h-1 w-1/2 p-4 border-2 border-black rounded-md'
                                        placeholder='Meeting Date'
                                        onChange={handleInputChange}
                                    />
                                    <div>
                                        <select
                                            className='mt-5 box-content h-1 w-1/2 p-4 border-2 border-black rounded-md '
                                            name="meetWith"
                                            value={formData.meetWith}
                                            onChange={handleInputChange}
                                        >
                                            <option value="" >Select an email</option>
                                            {allusersData.map((user) =>
                                                user._id !== userId ? (
                                                    <option key={user._id} value={user.email}>
                                                        {user.email}
                                                    </option>
                                                ) : null
                                            )}
                                        </select>

                                        <div>
                                            {formData.meetWith && (
                                                <div className="font-bold font-xl mt-3 box-content h-1  p-4 border-2 rounded-md mb-20">
                                                    Selected Email: {formData.meetWith}
                                                </div>
                                            )}
                                        </div>


                                    </div>

                                    <button className='box-content w-1/2 p-4 border-2 rounded-md mb-10 text-center font-bold bg-green-500' onClick={meetingSchedule}>
                                        Add Meeting
                                    </button>
                                </div>
                                <p className='mt-10 text-red-500 '>( Meeting time is 1 hour Default )</p>
                            </div>

                        )}

                        <div className=" min-h-screen">
                            {showMeetings && (
                                <div className="m-5 w-full  rounded-md  shadow-lg ">
                                    {allMeetingData.map((meet) => (
                                        <div key={meet._id} className="p-3 bg-white border-2 border-blue-200  shadow-xl m-5 rounded-md  w-full">
                                            <div className='flex'>
                                                <div>
                                                    <p className="text-2xl font-extrabold mb-2 text-blue-600">Meet Title: {meet.title}</p>
                                                    <p className="text-lg font-bold mb-2">Meet Organized By: {meet.conductedBy}</p>
                                                    <p className="text-lg font-bold mb-2">Meet with: {meet.meetWith}</p>
                                                    <p className="text-lg font-bold mb-2">Meet Date: {meet.date}</p>
                                                    <p className="text-lg font-bold mb-2">Meet Time: {meet.time}</p>
                                                </div>
                                                <button
                                                    className="mt-20 ml-20 h-10 w-1/6 text-white border-2 rounded-full bg-green-600"
                                                    onClick={() => openEditModal(meet._id, meet)}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    className='w-1/6 h-10 mt-20 ml-10 rounded-full bg-red-500 border-2 text-white'
                                                    onClick={() => deleteMeet(meet._id)}
                                                >
                                                    Delete
                                                </button>

                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {showEditModal && (
                                <div className='p-3 bg-white  m-5 text-center rounded-md'>
                                <div>{errorMessage && (
                                    <div className="mt-10 mb-10 text-red-500 font-bold text-center">{errorMessage}</div>
                                )}</div>
                                <div>{successMessage && (
                                    <div className="mt-10 mb-10 text-green-500 font-bold text-center">{successMessage}</div>
                                )}</div>
                                    <div className='border-2 border-blue-200 rounded-md shadow-xl'>
                                        <p className='font-bold text-2xl mt-5 mb-5 text-blue-600 underline shadow-lg p-3 bg-white rounded-md'>  Edit Meeting</p>
                                        <hr />
                                        <input type="text"
                                            name="title"
                                            value={editFormData.title}
                                            className='mt-10 box-content h-1 w-1/2 p-4 border-2 border-black rounded-md '
                                            placeholder='Meeting Title'
                                            onChange={handleEditInputChange}
                                            disabled
                                        />
                                        <input
                                            type="text"
                                            name="meetWith"
                                            value={editFormData.meetWith}
                                            className='mt-5 box-content h-1 w-1/2 p-4 border-2 border-black rounded-md'
                                            placeholder='Meeting With'
                                            onChange={handleEditInputChange}
                                            disabled
                                        />
                                        <input type="time"
                                            name="time"
                                            value={editFormData.time}
                                            className='mt-5 box-content h-1 w-1/2 p-4 border-2 border-black rounded-md'
                                            placeholder='Meeting Time'
                                            onChange={handleEditInputChange}
                                        />
                                        <input
                                            type="date"
                                            name="date"
                                            value={editFormData.date}
                                            className='mt-5 box-content h-1 w-1/2 p-4 border-2 border-black rounded-md'
                                            placeholder='Meeting Date'
                                            onChange={handleEditInputChange}
                                        />
                                        <div className="flex justify-center mt-20">

                                            <button className='mr-10 box-content w-1/5 p-2 border-2 rounded-md mb-10 text-center font-bold bg-green-500' onClick={() => EditMeeting(editMeetingId)}>
                                                Save
                                            </button>
                                            <button className='box-content w-1/5 p-2 border-2 rounded-md mb-10 text-center font-bold bg-green-500' onClick={closeEditModal}>
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                    <p className='mt-10 text-red-500 '>( Meeting time is 1 hour Default )</p>
                                </div>

                            )}
                        </div>
                    </div>
                </div>





            </div>
        </div>


    )

}
export default UserDashoard;

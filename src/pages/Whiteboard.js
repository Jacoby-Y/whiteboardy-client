import React, { useState, useEffect, useContext } from 'react';
import Canvas from '../components/Canvas';
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { AppContext } from '../contexts/AppContext';
import UserApi from "../api/User";


function Whiteboard() {
    const { setId, id, setAlert, user } = useContext(AppContext);
    const params = useParams();
    const navigate = useNavigate();
    const boardID = params.id;

    console.log(`Loading board id: ${boardID}`);

    useEffect(() => {
        // (async () => {
        //     // const found = await UserApi.hasWhiteboard(boardID);

        // })();
        if (!boardID) { //  || (!found && !user.host)
            console.log("Ain't no board!");
            setAlert({ theme: "danger", text: "Can't find whitebaord!" });
            navigate("/hub");
            return;
        }

        setId(boardID);
    }, []);

    useEffect(() => {
        console.log(id);
    }, [id])

    return (
        <div id="canvas-wrapper" className="flex-column">
            {id
                ? <Canvas width={700} height={500} />
                : <>hi</>}
            {/* <Navigate to="/hub" /> */}
        </div>
    );
}

export default Whiteboard;
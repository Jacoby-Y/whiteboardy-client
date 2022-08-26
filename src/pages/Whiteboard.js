import React, { useState, useEffect, useContext } from 'react';
import Canvas from '../Components/Canvas';
import { useParams, useNavigate } from "react-router-dom";
import { AppContext } from '../contexts/AppContext';


function Whiteboard() {
    const { setId } = useContext(AppContext);
    const params = useParams();
    const navigate = useNavigate();
    const boardID = params.id;

    if (!boardID) {
        // Set error: "No whiteboard available with that ID!"
        navigate("/")
    }

    useEffect(() => {
        setId(boardID);
    });

    return (
        <div id="canvas-wrapper">
            <Canvas width={700} height={500} />
        </div>
    );
}

export default Whiteboard;
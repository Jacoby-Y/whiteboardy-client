import { useState, useEffect, useContext } from 'react';
import { useOnDraw } from './Hooks';
import { io } from 'socket.io-client';
import { AppContext } from '../contexts/AppContext';
import { useNavigate } from 'react-router-dom'

//#region | Helper Closures/Functions
const removeDups = (list = [[]]) => {
    if (list.length <= 1) return list;
    const result = [];
    for (let i = 0; i < list.length; i++) {
        const [x1, y1] = list[i];
        if (list[i + 1] == undefined) {
            result.push([x1, y1]);
            continue;
        }
        const [x2, y2] = list[i + 1];
        if (x1 == x2 && y1 == y2) {
            result.push([x1, y1])
            i++
        }
    }
    return result
}

const iota = ((num = 0, lines = [], max = 50) => {
    return (line, fix = false) => {

        if (fix) {
            num = 0;
            const fixed = removeDups(lines.flat());
            lines = [];
            return fixed;
        }

        lines.push(line);
        const fixed = removeDups(lines.flat());
        num = (num + 1) % max
        if (num == 0) {
            lines = [lines.at(-1)];
            return fixed
        }
    }
})();

const drawConfig = ((width = 5, color = "black") => {
    return (args = null) => {
        if (args === null) return ({ width, color })
        args.width && (width = args.width)
        if (args.color) {
            color = args.color
            _canvas().style.borderColor = color
        }

    }
})();

const _canvas = () => document.querySelector("canvas");
/** @returns {CanvasRenderingContext2D} */
const _ctx = () => _canvas().getContext("2d");

const dataUrl = ((data = "") => {
    return (new_data = null) => {
        if (new_data === null) return data;
        data = new_data;
        return new_data;
    }
})();

const white_bg = (() => {
    const urlh = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAArwAAAH0CAYAAADfWf7fAAAb1ElEQVR4Xu3WQQ0AMAwDsZU/6HUajJPLIE4fmfvuOAIECBAgQIAAAQJRgTF4o82KRYAAAQIECBAg8AUMXo9AgAABAgQIECCQFjB40";

    const urlp1 = "/UKR4AAAQIECBAgYPD6AQIECBAgQIAAgbSAwZuuVzgCBAgQIECAAAGD1w8QIECAAAECBAikBQzedL3CESBAgAABAgQIGLx+gAABAgQIECBAIC1g8KbrFY4AAQIECBAgQMDg9QMECBAgQIAAAQJpAYM3Xa9wBAgQIECAAAECBq8fIECAAAECBAgQSAsYvOl6hSNAgAABAgQIEDB4";
    const urlp2 = "/QABAgQIECBAgEBawOBN1yscAQIECBAgQICAwesHCBAgQIAAAQIE0gIGb7pe4QgQIECAAAECBAxeP0CAAAECBAgQIJAWMHjT9QpHgAABAgQIECBg8PoBAgQIECBAgACBtIDBm65XOAIECBAgQIAAAYPXDxAgQIAAAQIECKQFDN50vcIRIECAAAECBAgYvH6AAAECBAgQIEAgLWDwpusVjgABAgQIECBAwOD1AwQIECBAgAABAmkBgzddr3AECBAgQIAAAQIGrx8gQIAAAQIECBBICxi86XqFI0CAAAECBAgQMHj9AAECBAgQIECAQFrA4E3XKxwBAgQIECBAgIDB6wcIECBAgAABAgTSAgZvul7hCBAgQIAAAQIEDF4";
    const urlp3 = "/QIAAAQIECBAgkBYweNP1CkeAAAECBAgQIGDw+gECBAgQIECAAIG0gMGbrlc4AgQIECBAgAABg9cPECBAgAABAgQIpAUM3nS9whEgQIAAAQIECBi8foAAAQIECBAgQCAtYPCm6xWOAAECBAgQIEDA4PUDBAgQIECAAAECaQGDN12vcAQIECBAgAABAgavHyBAgAABAgQIEEgLGLzpeoUjQIAAAQIECBAweP0AAQIECBAgQIBAWsDgTdcrHAECBAgQIECAgMHrBwgQIECAAAECBNICBm+6XuEIECBAgAABAgQMXj9AgAABAgQIECCQFjB40";

    return urlh + (urlp1 + urlp2 + urlp3).repeat(10) + urlp1 + urlp2;
})();

const distance = (x1, y1, x2, y2)=>{
    let y = x2 - x1;
    let x = y2 - y1;
    return Math.sqrt(x * x + y * y);
}
//#endregion

const ConfigBtn = (params) => {

    const setConfig = () => {
        drawConfig({ color: params.color, width: params.width })
    }

    return (
        <b className="color-wrapper" onClick={setConfig}>
            {params.width
                ? <b className="width-set" style={{ width: `${params.width + (params.width % 2)}px`, height: `${params.width + (params.width % 2)}px` }}></b>
                : <b className="color-set" style={{ backgroundColor: params.color }}></b>
            }
        </b>
    );
}

const Canvas = ({
    width,
    height
}) => {
    const { id, setId, user, setAlert } = useContext(AppContext);
    const [users, setUsers] = useState(1);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    //#region | Canvas Shtuff
    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx);
        // if (iota() == 0) emitDrawing();
    }

    /** @param {CanvasRenderingContext2D} ctx */
    function drawLine(
        start,
        end,
        ctx
    ) {

        const { width, color } = drawConfig();

        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, Math.floor(width / 2), 0, 2 * Math.PI);
        ctx.fill();

        emitDrawing([[Math.round(start.x), Math.round(start.y)], [Math.round(end.x), Math.round(end.y)]]);
        dataUrl(ctx.canvas.toDataURL());
    }

    /** @param {CanvasRenderingContext2D} ctx */
    function drawLines(ctx, points = [[]]) {
        if (points.length <= 1) return;

        const { width, color } = drawConfig();

        ctx.beginPath();

        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.fillStyle = color;

        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            const [x, y] = points[i];
            const [x2, y2] = points[i-1];
            if (distance(x2, y2, x, y) > width/2)
                ctx.lineTo(x-1, y-1);
        }
        ctx.stroke();

        for (let i = 0; i < points.length; i++) {
            const [x, y] = points[i];
            ctx.beginPath();
            ctx.arc(x-1, y-1, Math.floor(width / 2), 0, 2 * Math.PI);
            ctx.fill();
        }
    }

    const loadImg = (dataUrl) => {
        const img = new Image();
        img.onload = function () {
            _ctx().drawImage(this, 0, 0);
            setAlert({ theme: "success", text: "Connected!" })
            setLoading(false);
        }
        img.src = dataUrl;
    }
    //#endregion

    //#region | Socket io 
    function emitDrawing(data, bypass) {
        if (bypass && Array.isArray(data) && data.length > 1) {
            socket.emit("emit-points", { id, data, ...drawConfig() });
            return;
        }
        //  || data.flat(2).find((xy) => xy < 0) != undefined
        if (!data || !Array.isArray(data)) return
        const points = iota(data);
        // console.log(points);
        if (!points) return;
        drawLines(points);
        socket.emit("emit-points", { id, data: points, ...drawConfig() });
    }

    const [socket, setSocket] = useState(null);

    // Setup socket
    useEffect(() => {
        // const s = io("ws://whiteboardy-server.herokuapp.com");
        const url = window.location.hostname == "localhost" ? "http://localhost:8866/" : "/";
        const s = io();
        console.log(s);
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, []);

    useEffect(() => {
        if (socket == null) return;
        if (user.host) {
            socket.emit("open", { id });
            setLoading(false);
        } else {
            setLoading(true);
        }

        const getPoints = ({ data, color, width }) => {
            const global = drawConfig();
            drawConfig({ color, width });
            console.log(`Temp: ${color}`);
            drawLines(_ctx(), data);
            drawConfig(global);
            console.log(`Global: ${global.color}`);
        }

        const mouseup = () => {
            emitDrawing(iota(0, true), true);
        }
        window.addEventListener("mouseup", mouseup);

        socket.on(`get-points:${id}`, getPoints);

        socket.on(`closed:${id}`, closeSesh);

        socket.on(`get-drawing:${id}`, ({ data, users }) => {
            setUsers(users);
            loadImg(data);
        });

        if (user.host) {
            console.log("You're host!");
            socket.on(`get-drawing:${id}:host`, () => {
                console.log("Giving data to new user...");
                setUsers(users + 1);
                socket.emit("drawing-relay", { id, data: _canvas().toDataURL(), users });
            });
        } else {
            console.log("Getting data from host...");
            socket.emit("drawing-request", { id });
        }

        window.onbeforeunload = closeSesh;

        return () => {
            window.removeEventListener("mouseup", mouseup);
            console.log("Closing... ");
        }
    }, [socket]);

    const closeSesh = () => {
        console.log("Cleaning up session...");
        if (user.host) socket.emit("close-whiteboard", { id });
        else setAlert({ theme: "info", text: "Session closed by host" })
        socket.disconnect();
        navigate("/hub");
        drawConfig({ width: 5, color: "black" })
    }

    //#endregion

    return (<>
        {loading &&
            <div className="spinner-border" role="status" id="canvas-loading">
                <span className="visually-hidden">Loading...</span>
            </div>
        }
        <div id="colors-wrapper">
            {/* <h6>{users}</h6> */}
            {/* <b className="color-wrapper" onClick={() => drawConfig({ color: "black" })}><b className="color-set" style={{ backgroundColor: "black" }}></b></b> */}
            {/* <b className="color-wrapper" onClick={() => drawConfig({ color: "red" })}><b className="color-set" style={{ backgroundColor: "red" }}></b></b> */}
            <ConfigBtn color="black" />
            <ConfigBtn color="white" />
            <ConfigBtn color="#F44336" />
            <ConfigBtn color="#F86434" />
            <ConfigBtn color="#FFC107" />
            <ConfigBtn color="#4CAF50" />
            <ConfigBtn color="#03A9F4" />
            <ConfigBtn color="#3F51B5" />
            {/* <ConfigBtn color="#673AB7" /> */}
            <hr />
            <ConfigBtn width={5} />
            <ConfigBtn width={10} />
            <ConfigBtn width={20} />
            <ConfigBtn width={25} />
            <ConfigBtn width={30} />
        </div>
        <canvas
            width={width}
            height={height}
            onMouseDown={onCanvasMouseDown}
            style={canvasStyle}
            ref={setCanvasRef}
        />
        <button className="btn btn-outline-danger" style={{ position: "absolute", top: "1rem", right: "1rem" }} onClick={closeSesh}>
            {user.host ? "Close Session" : "Leave"}
        </button>
    </>);

}

export default Canvas;

const canvasStyle = {
    border: "3px solid black"
}
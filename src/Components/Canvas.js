import { useState, useEffect, useContext } from 'react';
import { useOnDraw } from './Hooks';
import { io } from 'socket.io-client';
import { AppContext } from '../contexts/AppContext';

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

const _canvas = () => document.querySelector("canvas");
/** @returns {CanvasRenderingContext2D} */
const _ctx = () => _canvas().getContext("2d");

const dataUrl = ((data = "") => {
    return (new_data = null) => {
        if (new_data === null) return data;
        data = new_data;
        return new_data;
    }
})()

const Canvas = ({
    width,
    height
}) => {
    const { id, user } = useContext(AppContext);

    //#region | Canvas Shtuff
    const {
        setCanvasRef,
        onCanvasMouseDown
    } = useOnDraw(onDraw);

    function onDraw(ctx, point, prevPoint) {
        drawLine(prevPoint, point, ctx, '#000000', 5);
        // if (iota() == 0) emitDrawing();
    }

    /** @param {CanvasRenderingContext2D} ctx */
    function drawLine(
        start,
        end,
        ctx,
        color,
        width
    ) {
        start = start ?? end;
        ctx.beginPath();
        ctx.lineWidth = width;
        ctx.strokeStyle = color;
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(start.x, start.y, 2, 0, 2 * Math.PI);
        ctx.fill();

        emitDrawing([[Math.round(start.x), Math.round(start.y)], [Math.round(end.x), Math.round(end.y)]]);
        dataUrl(ctx.canvas.toDataURL());
    }
    /** @param {CanvasRenderingContext2D} ctx */
    function drawLines(ctx, points = [[]]) {
        if (points.length <= 1) return;

        ctx.beginPath();
        ctx.lineWidth = 5;
        ctx.moveTo(points[0][0], points[0][1]);
        for (let i = 1; i < points.length; i++) {
            const [x, y] = points[i];
            ctx.lineTo(x, y);
        }
        ctx.stroke();
    }
    //#endregion

    //#region | Socket io 
    function emitDrawing(data, bypass) {
        if (bypass && Array.isArray(data) && data.length > 1) {
            socket.emit("emit-points", { id, data });
            return;
        }
        if (!data || !Array.isArray(data) || data.flat(2).find((xy) => xy < 0) != undefined) return
        const points = iota(data);
        if (!points) return;
        socket.emit("emit-points", { id, data: points });
    }

    const [socket, setSocket] = useState(null);

    // Setup socket
    useEffect(() => {
        const s = io("http://localhost:8866");
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, []);

    useEffect(() => {
        if (socket == null) return;

        const getPoints = (points) => {
            // console.log(points);
            drawLines(_ctx(), points);
        }

        const mouseup = () => {
            emitDrawing(iota(0, true), true);
        }
        window.addEventListener("mouseup", mouseup);

        socket.on(`get-points:${id}`, getPoints);

        socket.on(`get-drawing:${id}`, (data) => {
            const img = new Image();
            img.onload = function () {
                _ctx().drawImage(this, 0, 0);
            }
            img.src = data;
        })

        if (user.host) {
            console.log("You're host!");
            socket.on(`get-drawing:${id}:host`, () => {
                console.log("Giving data to new user...");
                socket.emit("drawing-relay", { id, data: _canvas().toDataURL() });
            });
        } else {
            console.log("Getting data from host...");
            socket.emit("drawing-request", { id });
        }

        return () => {
            socket.disconnect();
            window.removeEventListener("mouseup", mouseup);
        }
    }, [socket]);
    //#endregion

    return (
        <canvas
            width={width}
            height={height}
            onMouseDown={onCanvasMouseDown}
            style={canvasStyle}
            ref={setCanvasRef}
        />
    );

}

export default Canvas;

const canvasStyle = {
    border: "1px solid black"
}
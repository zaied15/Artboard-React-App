import React, { useEffect, useRef, useState } from "react";

const colors = ["red", "green", "yellow", "black", "blue"];

const CanvasTwo = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth - 60;
    canvas.height = 400;

    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
    nativeEvent.preventDefault();
  };
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    contextRef.current.strokeStyle = selectedColor;
    nativeEvent.preventDefault();
  };
  const stopDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const download = async () => {
    const image = canvasRef.current.toDataURL("image/png");
    const blob = await (await fetch(image)).blob();
    const blobURL = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobURL;
    link.download = "image.png";
    link.click();
  };

  const clear = () => {
    contextRef.current.clearRect(
      0,
      0,
      contextRef.current.canvas.width,
      contextRef.current.canvas.height
    );
  };

  return (
    <div className="mt-3">
      <canvas
        width={window.innerWidth - 60}
        height={400}
        className="border-black border-2 mx-auto"
        ref={canvasRef}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      ></canvas>
      <div className="mt-3 ml-7">
        <select
          className="select select-bordered border-red-400 w-lg max-w-xs"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color}
            </option>
          ))}
        </select>
        <button className="btn-error btn ml-3" onClick={clear}>
          Clear
        </button>
        <button className="btn btn-success ml-3" onClick={download}>
          Download
        </button>
      </div>
    </div>
  );
};

export default CanvasTwo;

import React, { useRef, useState, useCallback, useEffect } from "react";
import {
  Stage,
  Layer,
  Line,
  Image as KonvaImage,
  Transformer,
  Arrow,
  Circle,
  Text,
} from "react-konva";
import useImage from "../components/useImage";
import {
  FaPen,
  FaEraser,
  FaArrowsAlt,
  FaArrowRight,
  FaCircle,
  FaTextHeight,
} from "react-icons/fa";

const ScribbleCanvas = ({ imageUrl, setImageData }) => {
  const [lines, setLines] = useState([]);
  const [arrows, setArrows] = useState([]);
  const [circles, setCircles] = useState([]);
  const [texts, setTexts] = useState([]);
  const isDrawing = useRef(false);
  const [imageSrc, setImageSrc] = useState(imageUrl);
  const [image] = useImage(imageSrc);
  const stageRef = useRef(null);
  const [stageSize, setStageSize] = useState({ width: 800, height: 600 });
  const [imageProps, setImageProps] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotation: 0,
    scaleX: 1,
    scaleY: 1,
  });
  const transformerRef = useRef(null);
  const imageRef = useRef(null);
  const [isDrawingMode, setIsDrawingMode] = useState(true); // State to toggle between drawing and moving modes
  const [tool, setTool] = useState("pen"); // State to track the selected tool (pen, eraser, arrow, circle, or text)
  const [textInput, setTextInput] = useState(""); // State for text input

  useEffect(() => {
    if (image) {
      const updateCanvasSize = () => {
        const canvasWidth = window.innerWidth * 0.4;
        const canvasHeight = window.innerHeight * 0.8;
        const imageAspectRatio = image.width / image.height;
        const canvasAspectRatio = canvasWidth / canvasHeight;

        let width, height;
        if (canvasAspectRatio > imageAspectRatio) {
          height = canvasHeight;
          width = height * imageAspectRatio;
        } else {
          width = canvasWidth;
          height = width / imageAspectRatio;
        }

        const x = (canvasWidth - width) / 2;
        const y = (canvasHeight - height) / 2;

        setStageSize({ width: canvasWidth, height: canvasHeight });
        setImageProps((prevProps) => ({
          ...prevProps,
          x,
          y,
          width,
          height,
        }));
      };

      updateCanvasSize();
      window.addEventListener("resize", updateCanvasSize);

      return () => window.removeEventListener("resize", updateCanvasSize);
    }
  }, [image]);

  const handleMouseDown = useCallback(
    (e) => {
      if (!isDrawingMode) return;
      isDrawing.current = true;
      const pos = e.target.getStage().getPointerPosition();
      if (tool === "arrow") {
        setArrows((prevArrows) => [
          ...prevArrows,
          { points: [pos.x, pos.y, pos.x, pos.y], draggable: true },
        ]);
      } else if (tool === "circle") {
        setCircles((prevCircles) => [
          ...prevCircles,
          { x: pos.x, y: pos.y, radius: 0, draggable: true },
        ]);
      } else if (tool === "eraser") {
        // Do nothing on mousedown for eraser
      } else if (tool === "text") {
        setTexts((prevTexts) => [
          ...prevTexts,
          { x: pos.x, y: pos.y, text: textInput, draggable: true },
        ]);
        setTextInput(""); // Clear input after placing text
      } else {
        setLines((prevLines) => [
          ...prevLines,
          { tool, points: [pos.x, pos.y] },
        ]);
      }
    },
    [isDrawingMode, tool, textInput]
  );

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDrawing.current || !isDrawingMode) return;
      const stage = e.target.getStage();
      const point = stage.getPointerPosition();
      if (tool === "arrow") {
        setArrows((prevArrows) => {
          const lastArrow = prevArrows[prevArrows.length - 1];
          lastArrow.points = [
            lastArrow.points[0],
            lastArrow.points[1],
            point.x,
            point.y,
          ];
          return [...prevArrows.slice(0, -1), lastArrow];
        });
      } else if (tool === "circle") {
        setCircles((prevCircles) => {
          const lastCircle = prevCircles[prevCircles.length - 1];
          const dx = point.x - lastCircle.x;
          const dy = point.y - lastCircle.y;
          const radius = Math.sqrt(dx * dx + dy * dy);
          lastCircle.radius = radius;
          return [...prevCircles.slice(0, -1), lastCircle];
        });
      } else if (tool === "eraser") {
        // Erase lines, arrows, and circles
        setLines((prevLines) =>
          prevLines.filter((line) => !isPointNearLine(point, line.points, 20))
        );
        setArrows((prevArrows) =>
          prevArrows.filter(
            (arrow) => !isPointNearLine(point, arrow.points, 20)
          )
        );
        setCircles((prevCircles) =>
          prevCircles.filter((circle) => !isPointInCircle(point, circle, 20))
        );
        setTexts((prevTexts) =>
          prevTexts.filter((text) => !isPointNearText(point, text, 20))
        );
      } else {
        setLines((prevLines) => {
          const lastLine = prevLines[prevLines.length - 1];
          lastLine.points = lastLine.points.concat([point.x, point.y]);
          return [...prevLines.slice(0, -1), lastLine];
        });
      }
    },
    [isDrawingMode, tool]
  );

  const handleMouseUp = useCallback(() => {
    isDrawing.current = false;
  }, []);

  useEffect(() => {
    if (setImageData && stageRef.current) {
      const uri = stageRef.current.toDataURL();
      setImageData(uri);
    }
  }, [lines, arrows, circles, texts, setImageData]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageSrc(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleTransformEnd = (e) => {
    const node = imageRef.current;
    const scaleX = node.scaleX();
    const scaleY = node.scaleY();

    // reset scale on the node, and keep track of it in the state
    node.scaleX(1);
    node.scaleY(1);

    setImageProps((prevProps) => ({
      ...prevProps,
      x: node.x(),
      y: node.y(),
      width: Math.max(5, node.width() * scaleX),
      height: Math.max(node.height() * scaleY),
      rotation: node.rotation(),
    }));
  };

  useEffect(() => {
    if (transformerRef.current && imageRef.current) {
      transformerRef.current.nodes([imageRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [imageProps]);

  // Helper functions for eraser logic
  const isPointNearLine = (point, linePoints, threshold) => {
    for (let i = 0; i < linePoints.length - 2; i += 2) {
      const x1 = linePoints[i];
      const y1 = linePoints[i + 1];
      const x2 = linePoints[i + 2];
      const y2 = linePoints[i + 3];
      const distance = pointLineDistance(
        point,
        { x: x1, y: y1 },
        { x: x2, y: y2 }
      );
      if (distance < threshold) return true;
    }
    return false;
  };

  const pointLineDistance = (point, lineStart, lineEnd) => {
    const dx = lineEnd.x - lineStart.x;
    const dy = lineEnd.y - lineStart.y;
    const lengthSquared = dx * dx + dy * dy;
    const t =
      ((point.x - lineStart.x) * dx + (point.y - lineStart.y) * dy) /
      lengthSquared;
    const clampedT = Math.max(0, Math.min(1, t));
    const closestPoint = {
      x: lineStart.x + clampedT * dx,
      y: lineStart.y + clampedT * dy,
    };
    const distance = Math.sqrt(
      (point.x - closestPoint.x) ** 2 + (point.y - closestPoint.y) ** 2
    );
    return distance;
  };

  const isPointInCircle = (point, circle, threshold) => {
    const dx = point.x - circle.x;
    const dy = point.y - circle.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance < circle.radius + threshold;
  };

  const isPointNearText = (point, text, threshold) => {
    const textWidth = text.text.length * 12; // Assuming average width per character is 12 pixels
    const textHeight = 16; // Assuming font size of 16 pixels
    const textRect = {
      x: text.x,
      y: text.y,
      width: textWidth,
      height: textHeight,
    };
    return (
      point.x >= textRect.x - threshold &&
      point.x <= textRect.x + textRect.width + threshold &&
      point.y >= textRect.y - threshold &&
      point.y <= textRect.y + textRect.height + threshold
    );
  };

  return (
    <div className="scribble-container">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-2"
      />
      <div className="flex space-x-2 mb-2">
        <button
          onClick={() => setIsDrawingMode(!isDrawingMode)}
          className={`p-2 rounded ${
            isDrawingMode ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaArrowsAlt />
        </button>
        <button
          onClick={() => setTool("pen")}
          className={`p-2 rounded ${
            tool === "pen" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaPen />
        </button>
        <button
          onClick={() => setTool("eraser")}
          className={`p-2 rounded ${
            tool === "eraser" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaEraser />
        </button>
        <button
          onClick={() => setTool("arrow")}
          className={`p-2 rounded ${
            tool === "arrow" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaArrowRight />
        </button>
        <button
          onClick={() => setTool("circle")}
          className={`p-2 rounded ${
            tool === "circle" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaCircle />
        </button>
        <button
          onClick={() => setTool("text")}
          className={`p-2 rounded ${
            tool === "text" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          <FaTextHeight />
        </button>
      </div>
      {tool === "text" && (
        <input
          type="text"
          placeholder="Enter text"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
          className="mb-2 p-1 border rounded"
        />
      )}
      <Stage
        ref={stageRef}
        width={stageSize.width}
        height={stageSize.height}
        className="scribble-stage border border-gray-300"
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
        onMouseup={handleMouseUp}
      >
        <Layer>
          {image && (
            <React.Fragment>
              <KonvaImage
                image={image}
                x={imageProps.x}
                y={imageProps.y}
                width={imageProps.width}
                height={imageProps.height}
                rotation={imageProps.rotation}
                scaleX={imageProps.scaleX}
                scaleY={imageProps.scaleY}
                draggable={!isDrawingMode}
                ref={imageRef}
                onTransformEnd={handleTransformEnd}
                onDragEnd={handleTransformEnd}
              />
              {!isDrawingMode && (
                <Transformer
                  ref={transformerRef}
                  boundBoxFunc={(oldBox, newBox) => {
                    // limit resize
                    if (newBox.width < 5 || newBox.height < 5) {
                      return oldBox;
                    }
                    return newBox;
                  }}
                />
              )}
            </React.Fragment>
          )}
        </Layer>
        <Layer>
          {lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke={line.tool === "eraser" ? "white" : "black"}
              strokeWidth={line.tool === "eraser" ? 20 : 5} // Increase eraser size
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === "eraser" ? "destination-out" : "source-over"
              }
            />
          ))}
          {arrows.map((arrow, i) => (
            <Arrow
              key={i}
              points={arrow.points}
              stroke="black"
              strokeWidth={5}
              pointerLength={10}
              pointerWidth={10}
              lineCap="round"
              lineJoin="round"
              draggable
              onDragEnd={(e) => {
                const newArrows = [...arrows];
                newArrows[i] = {
                  ...newArrows[i],
                  points: [
                    e.target.x(),
                    e.target.y(),
                    e.target.x() +
                      (newArrows[i].points[2] - newArrows[i].points[0]),
                    e.target.y() +
                      (newArrows[i].points[3] - newArrows[i].points[1]),
                  ],
                };
                setArrows(newArrows);
              }}
            />
          ))}
          {circles.map((circle, i) => (
            <Circle
              key={i}
              x={circle.x}
              y={circle.y}
              radius={circle.radius}
              stroke="black"
              strokeWidth={5}
              draggable
              onDragEnd={(e) => {
                const newCircles = [...circles];
                newCircles[i] = {
                  ...newCircles[i],
                  x: e.target.x(),
                  y: e.target.y(),
                };
                setCircles(newCircles);
              }}
            />
          ))}
          {texts.map((text, i) => (
            <Text
              key={i}
              x={text.x}
              y={text.y}
              text={text.text}
              fontSize={16}
              fill="black"
              draggable
              onDragEnd={(e) => {
                const newTexts = [...texts];
                newTexts[i] = {
                  ...newTexts[i],
                  x: e.target.x(),
                  y: e.target.y(),
                };
                setTexts(newTexts);
              }}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default ScribbleCanvas;

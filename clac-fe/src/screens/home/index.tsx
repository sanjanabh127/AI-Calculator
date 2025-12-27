import { ColorSwatch, Group, Slider } from "@mantine/core";
import { Button } from "@/components/ui/button";
import { useEffect, useRef, useState } from "react";

/* 🎨 Color palette */
const SWATCHES = [
  "#ffffff",
  "#ee3333",
  "#e64980",
  "#be4bdb",
  "#893200",
  "#228be6",
  "#3333ee",
  "#40c057",
  "#00aa00",
  "#fab005",
  "#fd7e14",
];

const API_URL = import.meta.env.VITE_API_URL; // 👈 from .env.local

export default function Home() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [drawing, setDrawing] = useState(false);
  const [color, setColor] = useState("#ffffff");
  const [brushSize, setBrushSize] = useState(4);
  const [isEraser, setIsEraser] = useState(false);
  const [result, setResult] = useState<string>("");

  /* 🖤 Initialize black canvas */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  /* ✏️ Drawing handlers */
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!drawing) return;

    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = brushSize;
    ctx.strokeStyle = isEraser ? "black" : color;

    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => setDrawing(false);

  /* ♻️ Reset canvas */
  const resetCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setResult("");
  };

  /* 🧮 Calculate */
  const calculate = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      const response = await fetch(`${API_URL}/calculate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: canvas.toDataURL("image/png"),
          dict_of_vars: {},
        }),
      });

      if (!response.ok) {
        throw new Error("Backend error");
      }

      const data = await response.json();

      // Backend returns STRING
      if (typeof data === "string") {
        setResult(data);
      } else {
        setResult("Error");
      }
    } catch (error) {
      console.error(error);
      setResult("Error");
    }
  };

  return (
    <>
      {/* 🎛 Controls */}
      <div className="fixed top-4 left-4 z-50 bg-black/70 p-4 rounded-lg space-y-3">
        <Group>
          {SWATCHES.map((swatch) => (
            <ColorSwatch
              key={swatch}
              color={swatch}
              onClick={() => {
                setColor(swatch);
                setIsEraser(false);
              }}
              style={{
                border:
                  color === swatch ? "3px solid white" : "2px solid transparent",
                transform: color === swatch ? "scale(1.15)" : "scale(1)",
                cursor: "pointer",
              }}
            />
          ))}
        </Group>

        <Slider
          min={1}
          max={20}
          value={brushSize}
          onChange={setBrushSize}
        />

        <Group>
          <Button onClick={() => setIsEraser(!isEraser)}>
            {isEraser ? "Brush" : "Eraser"}
          </Button>
          <Button onClick={resetCanvas}>Reset</Button>
          <Button onClick={calculate}>Calculate</Button>
        </Group>
      </div>

      {/* 🎨 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
      />

      {/* 🧾 Result */}
      {result && (
        <div className="fixed top-6 right-6 text-white text-3xl font-bold">
          = {result}
        </div>
      )}
    </>
  );
}

# ✍️ AI Handwritten Calculator (Full-Stack)

![Python](https://img.shields.io/badge/Python-3.10%2B-blue?logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-009688?logo=fastapi)
![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)
![Mantine](https://img.shields.io/badge/Mantine-UI-339AF0)

---

##  Overview

**AI Handwritten Calculator** is a full-stack application that allows users to **draw handwritten mathematical expressions** on a canvas and compute the result using **AI vision models**.

The project combines a modern **React + TypeScript frontend** with a **FastAPI backend** powered by **Google Gemini Vision**.

---

## ✨ Features

###  Frontend (React ,  TypeScript ,  Mantine UI ,  HTML , Canvas API)
- Freehand drawing canvas
- Color palette
- Brush size control
- Eraser mode (non-destructive)
- Reset canvas
- Calculate button
- Result display overlay

###  Backend ( Python , FastAPI , Uvicorn , Pillow (PIL) , google-genai (Gemini API))
- FastAPI REST API
- Base64 image decoding
- AI-based handwritten math recognition
- Modular backend architecture
- CORS enabled

---

Frontend is maintained as a separate React project.

##  How It Works

1. User draws a math expression on the canvas  
2. Canvas image is converted to Base64  
3. Image is sent to backend `/calculate` endpoint  
4. Gemini Vision model interprets the handwriting  
5. Final numeric result is returned  
6. Result is rendered on the UI  

---

## 🔑 Environment Setup (Backend)

### Create Virtual Environment
```bash
python -m venv venv
venv\Scripts\activate

```
## Overview 
![img_alt](https://github.com/sanjanabh127/AI-Calculator/blob/4bc991598f1943a8cefe02a370346ce58074c240/Images/Screenshot%202025-12-27%20123831.png)
![img_alt](https://github.com/sanjanabh127/AI-Calculator/blob/4bc991598f1943a8cefe02a370346ce58074c240/Images/Screenshot%202025-12-27%20123942.png)


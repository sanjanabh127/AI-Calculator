from google import genai
from google.genai import types
import base64
from PIL import Image
import io
import os

API_KEY = os.getenv("GEMINI_API_KEY")

if not API_KEY:
    raise RuntimeError("❌ GEMINI_API_KEY not found. Check .env loading.")

client = genai.Client(api_key=API_KEY)

def analyze_image(image_base64: str, dict_of_vars=None):
    image_bytes = base64.b64decode(image_base64.split(",")[1])
    image = Image.open(io.BytesIO(image_bytes))

    prompt = """
    You are a calculator.
    Read the handwritten math expression and return ONLY the final numeric result.
    """

    response = client.models.generate_content(
        model="models/gemini-1.5-flash",  # ✅ CORRECT MODEL ID
        contents=[
            prompt,
            types.Part.from_image(image)
        ]
    )

    return response.text.strip()

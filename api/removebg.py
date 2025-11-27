from rembg import remove
from fastapi import FastAPI, Request
from fastapi.responses import Response

app = FastAPI()

@app.post("/api/removebg")
async def remove_bg(req: Request):
    img_bytes = await req.body()
    if not img_bytes:
        return {"error": "No image provided"}

    output = remove(img_bytes)
    return Response(content=output, media_type="image/png")

import base64
from distutils.command.upload import upload
import string
from fastapi import FastAPI, File, UploadFile, HTTPException,Depends
from typing import Union
from sqlalchemy.orm import Session
import crud
import model
import schemas
import database
from datetime import date


SessionLocal = database.SessionLocal
engine = database.engine

model.Base.metadata.create_all(bind=engine)

app = FastAPI()
# Dependency


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}


@app.post("/files/")
async def create_file(file: bytes | None = File(default=None)):
    if not file:
        return{"message": "No file sent"}
    else:
        return {"File_size": len(file)}

# upload image
@app.post("/uploadfile/")
async def create_uplaod_file(file: UploadFile | None = None,db:Session = Depends(get_db)):
    if not file:
        return{"message": "No upload file sent"}
    else:
        data_file = await file.read()
        file_bytes = base64.b64encode(data_file)
        gallery ={"image": file_bytes,"timestamp":date.today(),"name":file.filename}
        db_image = crud.create_image(db=db ,image=gallery)
        if db_image is None:
            raise HTTPException(status_code= 400, detail="File could not be saved")
        return{"filename": file.filename}

@app.post('/gallery/upload')
async def gallery_upload(file: schemas.GalleryCreate ,db:Session = Depends(get_db)):
    if not file:
        return{"message": "No upload file sent"}
    else:
       
        db_image = crud.create_image(db=db ,image=file)
        if db_image is None:
            raise HTTPException(status_code= 400, detail="File could not be saved")
        return db_image

# Get Method for single image 
@app.get('/gallery')
async def get_one_image(db:Session = Depends(get_db)):
    return crud.get_all_images(db=db)

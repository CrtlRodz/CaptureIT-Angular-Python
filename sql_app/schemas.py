from pydantic import BaseModel


class GalleryBase(BaseModel):
    name: str
    timestamp: str
    image: str


class GalleryCreate(GalleryBase):
    pass


class Gallery(GalleryBase):
    id: int

    class Config:
        orm_mode = True


    
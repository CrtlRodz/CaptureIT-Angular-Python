from sqlalchemy.orm import Session
import model
import schemas


def get_image(db: Session, id: int):
    return db.query(model.Gallery).filter(model.Gallery.id == id).first()


def get_all_images(db: Session, skip: int = 0, limit=100):
    return db.query(model.Gallery).offset(skip).limit(limit).all()


def create_image(db: Session, image: schemas.GalleryCreate):
    db_gallery = model.Gallery(image = image.image,timestamp =image.timestamp,name=image.name)
    db.add(db_gallery)
    db.commit()
    db.refresh(db_gallery)
    return db_gallery

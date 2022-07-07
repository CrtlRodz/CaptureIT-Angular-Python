from email.mime import image
from operator import index
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from database import Base


class Gallery(Base):
    __tablename__ = "gallery"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    timestamp = Column(String)
    image = Column(String)

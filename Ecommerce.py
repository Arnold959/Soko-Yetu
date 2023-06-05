from sqlalchemy import String, Column, Integer, create_engine, ForeignKey
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'user'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    sales = relationship("Sales", backref="user")
    reviews = relationship("Review", backref="user")

class Product(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    price = Column(Integer, nullable=False)
    description = Column(String(50))
    category_id = Column(Integer, ForeignKey("category.id"))
    stock = Column(Integer)
    image_url = Column(String)
    reviews = relationship("Review", backref="product")
    sales = relationship("Sales", backref="product")
  
class Review(Base):
    __tablename__ = 'review'
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("product.id"))
    user_id = Column(Integer, ForeignKey("user.id")) 
    rating = Column(Integer)
    comment = Column(String)
    user = relationship("User", backref="reviews")
    product = relationship("Product", backref="reviews")

class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    products = relationship("Product", backref="category")

class Sales(Base):
    __tablename__ = 'sales'
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("product.id"))
    user_id = Column(Integer, ForeignKey("user.id")) 
    quantity = Column(Integer)
    price = Column(Integer)
    sales_user = relationship("User", backref="sales")
    product = relationship("Product", backref="sales")

engine = create_engine('sqlite:///database.db')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

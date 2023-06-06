from sqlalchemy import String, Column, Integer, create_engine, ForeignKey,text
from sqlalchemy.orm import declarative_base, sessionmaker, relationship

Base = declarative_base()

class User(Base):
    __tablename__ = 'users'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    sales = relationship("Sales", backref="sales_user")
    user_reviews = relationship("Review", backref="reviews_user")

class Product(Base):
    __tablename__ = 'product'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    price = Column(Integer, nullable=False)
    description = Column(String(50))
    category_id = Column(Integer, ForeignKey("category.id"))
    stock = Column(Integer)
    image_url = Column(String)
    reviews = relationship("Review", backref="reviews_product")
    sales = relationship("Sales", backref="salers_product")
    category = relationship("Category", backref="categorys_products")
  
class Review(Base):
    __tablename__ = 'review'
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("product.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    rating = Column(Integer)
    comment = Column(String)
    user = relationship("User", backref="users_reviews")
    product = relationship("Product", backref="products_reviews")

class Category(Base):
    __tablename__ = 'category'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    products = relationship("Product", backref="products_category")

class Sales(Base):
    __tablename__ = 'sales'
    id = Column(Integer, primary_key=True)
    product_id = Column(Integer, ForeignKey("product.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    quantity = Column(Integer)
    price = Column(Integer)
    user = relationship("User", backref="user_sales")
    product = relationship("Product", backref="products_sales")

engine = create_engine('sqlite:///database.db')
Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()
session.execute(text("DROP TABLE IF EXISTS user"))
session.commit()

# commodity1 = Product(
#     id=1,
#     name="Laptop",
#     price=50000,
#     description="A laptop",
#     category_id=1,
#     stock=3,
#     image_url=""
# )

# review1 = Review(
#     id=1,
#     product_id=1,
#     user_id=1,
#     rating=5,
#     comment="Very satisfying"
# )
# sales1 = Sales(
#     id=1,
#     product_id = 1,
#     user_id = 1,
#     quantity = 1,
#     price = 50000
    
# )
# users1 = User(
#     id=1,
#     name="Arnold"
# )
# category1 = Category(
#     id=1,
#     name = "Electronics"
# )


# session.add(commodity1)
# session.add(review1)
# session.add(sales1)
# session.add(users1)
# session.add(category1)

# session.commit()


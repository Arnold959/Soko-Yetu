from fastapi import FastAPI
from pydantic import BaseModel
from Ecommerce import Product, Sales, Review, Category, User, session
from typing import List, Optional

app = FastAPI()


class ReviewSchema(BaseModel):
    id: int
    product_id: int
    user_id: int
    rating: int
    comment: str

    class Config:
        orm_mode = True


class ProductSchema(BaseModel):
    id: int
    name: str
    price: int
    description: str
    category_id: int
    stock: int
    image_url: str
    reviews: List[ReviewSchema]

class ProductPostSchema(BaseModel):
    id: int
    name: str
    price: int
    description: str
    category_id: int
    stock: int
    image_url: str

    class Config:
        orm_mode = True
               
        


class SalesSchema(BaseModel):
    id: int
    product_id: int
    user_id: int
    quantity: int
    price: int

    class Config:
        orm_mode = True


class UsersSchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class CategorySchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True


class UpdatedProductSchema(BaseModel):
    id: Optional[int] = None
    name: Optional[str] = None
    price: Optional[int] = None
    description: Optional[str] = None
    category_id: Optional[int] = None
    stock: Optional[int] = None
    image_url: Optional[str] = None
    reviews: Optional[str] = None

    class Config:
        orm_mode = True


@app.get('/products')
def get_all_products() -> List[ProductSchema]:
    products = session.query(Product).all()
    return products


@app.get('/users')
def get_all_users() -> List[UsersSchema]:
    users = session.query(User).all()
    return users


@app.get('/categories')
def get_all_categories() -> List[CategorySchema]:
    categories = session.query(Category).all()
    return categories


@app.get('/reviews')
def get_all_reviews() -> List[ReviewSchema]:
    reviews = session.query(Review).all()
    return reviews


@app.get('/sales')
def get_all_sales() -> List[SalesSchema]:
    sales = session.query(Sales).all()
    return sales


@app.get('/products/{id}')
def get_single_product(id: int) -> ProductSchema:
    product = session.query(Product).filter_by(id=id).first()
    return product


@app.get('/users/{id}')
def get_single_user(id: int) -> UsersSchema:
    user = session.query(User).filter_by(id=id).first()
    return user


@app.get('/categories/{id}')
def get_single_category(id: int) -> CategorySchema:
    category = session.query(Category).filter_by(id=id).first()
    return category


@app.get('/reviews/{id}')
def get_single_review(id: int) -> ReviewSchema:
    review = session.query(Review).filter_by(id=id).first()
    return review


@app.get('/sales/{id}')
def get_single_sales(id: int) -> SalesSchema:
    sales = session.query(Sales).filter_by(id=id).first()
    return sales





@app.post('/product')
def add_product(payload : ProductPostSchema):
  product = Product(**dict(payload))
  session.add(product)
  session.commit()
  
  return product


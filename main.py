from fastapi import FastAPI
from pydantic import BaseModel
from Ecommerce import Product,Sales,Review,Category,User,session
from typing import List,Optional

app = FastAPI()
class EcommerceSchema(BaseModel):
  id:int
  name:str
  price:int
  description:str
  category_id:int
  stock:int
  image_url:str
  reviews:str
  class Config:
    orm_mode = True
class UpdatedEccomerceSchema(BaseModel):
  id:Optional[int] = None
  name:Optional[str]  = None
  price:Optional[int] = None
  description:Optional[str] = None
  category_id:Optional[int] = None
  stock:Optional[int] = None
  image_url:Optional[str] = None
  reviews:Optional[str] = None
  class Config:
    orm_mode = True
  

@app.get('/')
def get_all_products()->List[EcommerceSchema]:
  ecommerces = session.query(Product).all()
  return ecommerces
@app.get('/products{id}')
def get_single_product(id:int) ->EcommerceSchema:
  singleproduct = session.query(Product).filter_by(id=id).first()
  return singleproduct
@app.post('/add_product')
def add_product(product:EcommerceSchema) ->EcommerceSchema:
  goods = Product(**dict(product))
  session.add(goods)
  session.commit()
  return goods


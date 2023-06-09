from fastapi import FastAPI
from pydantic import BaseModel
from Ecommerce import Product, Sales, Review, Category, User, session
from typing import List, Optional
from fastapi import HTTPException



app = FastAPI()

from fastapi.middleware.cors import CORSMiddleware


origins = [
    "http://localhost.tiangolo.com",
    "https://localhost.tiangolo.com",
    "http://localhost",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




class ReviewSchema(BaseModel):
    id: int
    product_id: int
    user_id: int
    rating: int
    comment: str

    class Config:
        orm_mode = True

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


class UserSchema(BaseModel):
    id: int
    name: str
    phone_number: int
    email_address:str
    password: str
    

    class Config:
        orm_mode = True
        

class CategorySchema(BaseModel):
    id: int
    name: str

    class Config:
        orm_mode = True

class UpdatedCategorySchema(BaseModel):
    id: Optional[int]= None
    name: Optional[str] = None

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
    

    class Config:
        orm_mode = True

class UpdatedUserSchema(BaseModel):
    id:Optional[int]  = None
    name:Optional[str] = None
    phone_number: Optional[int] = None
    email_address:Optional[str] = None
    password : Optional[str] = None
    class Config:
        orm_mode = True


@app.get('/products')
def get_products() -> List[ProductPostSchema]:
    products = session.query(Product).all()
    return products


@app.get('/users')
def get_all_users() -> List[UserSchema]:
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
def get_single_product(id: int) -> ProductPostSchema:
    product = session.query(Product).filter_by(id=id).first()
    return product


@app.get('/users/{id}')
def get_single_user(id: int) -> UserSchema:
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


@app.post('/add_user')
def add_user(user: UserSchema) -> UserSchema:
    use =User(**dict(user))
    session.add(use)
    session.commit()

    return user



@app.post('/product')
def add_product(payload: ProductPostSchema):
    product = Product(
        name=payload.name,
        price=payload.price,
        description=payload.description,
        category_id=payload.category_id,
        stock=payload.stock,
        image_url=payload.image_url
    )
    session.add(product)
    session.commit()

    return product

@app.post('/categories')
def add_category(category: CategorySchema)-> CategorySchema:
    my_category= Category(**dict(category))
    session.add (my_category)
    session.commit ()
    return my_category

@app.post('/reviews')
def add_review(review:ReviewSchema) ->ReviewSchema:
    reviewer = Review(**dict(review))
    session.add(reviewer)
    session.commit()
    return reviewer

@app.post('/sales')
def add_sales(sales:SalesSchema) ->SalesSchema:
    mySales = Sales(**dict(sales))
    session.add(mySales)
    session.commit()
    return mySales


@app.patch('/users/update/{id}')
def update_user(id: int, payload: UpdatedUserSchema) -> UserSchema:
    userer = session.query(User).get(id)
    if not userer:
        raise HTTPException(status_code=404, detail="User not found")

    for key, value in payload.dict(exclude_unset=True).items():
        setattr(userer, key, value)

    session.commit()
    return userer


@app.patch('/products/update/{id}')
def updating_products(id:int,payload:UpdatedProductSchema) ->ProductPostSchema:
    updated_product = session.query(Product).filter_by(id=id).first()
    for key,value in payload.dict(exclude_unset = True).items():
        setattr(updated_product,key,value)
        session.commit()
        return updated_product
    
@app.patch('/categories/update/{id}')
def updating_categories(id:int,payload:UpdatedCategorySchema) ->CategorySchema:
    updated_category = session.query(Category).filter_by(id=id).first()
    for key,value in payload.dict(exclude_unset = True).items():
        setattr(updated_category,key,value)
        session.commit()
        return updated_category
    


@app.put('/add_users/{user_id}')
def update_user(user_id: int, payload: UpdatedUserSchema) -> UserSchema:
    existing_user = session.query(User).filter_by(id=user_id).first()
    if existing_user is None:
        return {"error": "This user you are looking for has not been found"}
    
    for key, value in payload.dict(exclude_unset=True).items():
        setattr(existing_user, key, value)
    
    session.commit()
    return existing_user
@app.put('/add_products/{product_id}')
def update_product(product_id: int, payload: UpdatedProductSchema) -> ProductPostSchema:
    existing_product = session.query(Product).filter_by(id=product_id).first()
    if existing_product is None:
        return {"error": "This product you are looking for has not been found"}
    
    for key, value in payload.dict(exclude_unset=True).items():
        setattr(existing_product, key, value)
    
    session.commit()
    return existing_product
    
@app.delete('/product/delete{id}')
def delete_product(id:int) ->None:
    good = session.query(Product).filter_by(id=id).first()
    session.delete(good)
    session.commit()
    return {"detail":f"Product with the id {id} has been deleted succesfully"}

@app.delete('/sales/delete{id}')
def delete_sales(id:int) ->None:
    sold = session.query(Sales).filter_by(id=id).first()
    session.delete(sold)
    session.commit()
    return {"detail":f"Sales with the id {id} has been deleted succesfully"}

@app.delete('/reviews/{id}')
def delete_review(id: int):
    existing_review = session.query(Review).filter_by(id=id).first()
    if not existing_review:
        return {"error": "Review not found"}, 404
    session.delete(existing_review)
    session.commit()
    return {"message": "Review deleted successfully"}

@app.delete('/categories/{id}')
def delete_category(id: int) -> None:
    existing_category = session.query(Category).filter_by(id=id).first()
    if not existing_category:
        return {"error": "Category not found"}, 404
    session.delete(existing_category)
    session.commit()
    return {"message": "Category deleted successfully"}



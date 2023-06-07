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



    


@app.patch('/users/{id}')
def update_user(id: int, user: UsersSchema):
    existing_user = session.query(User).filter_by(id=id).first()
    if not existing_user:
        return {"error": "User not found"}, 404
    for field in user.dict().keys():
        setattr(existing_user, field, user.dict()[field])
    session.commit()
    return existing_user


@app.patch('/products/{id}')
def update_product(id: int, product: ProductPostSchema):
    existing_product = session.query(Product).filter_by(id=id).first()
    if not existing_product:
        return {"error": "Product not found"}, 404
    for field in product.dict().keys():
        setattr(existing_product, field, product.dict()[field])
    session.commit()
    return existing_product

@app.patch('/sales/{id}')
def update_sales(id: int, sales: SalesSchema):
    existing_sales = session.query(Sales).filter_by(id=id).first()
    if not existing_sales:
        return {"error": "Sales not found"}, 404
    for field in sales.dict().keys():
        setattr(existing_sales, field, sales.dict()[field])
    session.commit()
    return existing_sales

@app.patch('/reviews/{id}')
def update_review(id: int, review: ReviewSchema):
    existing_review = session.query(Review).filter_by(id=id).first()
    if not existing_review:
        return {"error": "Review not found"}, 404
    for field in review.dict().keys():
        setattr(existing_review, field, review.dict()[field])
    session.commit()
    return existing_review

@app.patch('/categories/{id}')
def update_category(id: int, category: CategorySchema):
    existing_category = session.query(Category).filter_by(id=id).first()
    if not existing_category:
        return {"error": "Category not found"}, 404
    for field in category.dict().keys():
        setattr(existing_category, field, category.dict()[field])
    session.commit()
    return existing_category

@app.put('/users/{id}')
def replace_user(id: int, user: UsersSchema):
    existing_user = session.query(User).filter_by(id=id).first()
    if not existing_user:
        return {"error": "User not found"}, 404
    for field in user.dict().keys():
        setattr(existing_user, field, user.dict()[field])
    session.commit()
    return existing_user

@app.put('/products/{id}')
def replace_product(id: int, product: ProductPostSchema):
    existing_product = session.query(Product).filter_by(id=id).first()
    if not existing_product:
        return {"error": "Product not found"}, 404
    for field in product.dict().keys():
        setattr(existing_product, field, product.dict()[field])
    session.commit()
    return existing_product

@app.put('/sales/{id}')
def replace_sales(id: int, sales: SalesSchema):
    existing_sales = session.query(Sales).filter_by(id=id).first()
    if not existing_sales:
        return {"error": "Sales not found"}, 404
    for field in sales.dict().keys():
        setattr(existing_sales, field, sales.dict()[field])
    session.commit()
    return existing_sales

@app.put('/reviews/{id}')
def replace_review(id: int, review: ReviewSchema):
    existing_review = session.query(Review).filter_by(id=id).first()
    if not existing_review:
        return {"error": "Review not found"}, 404
    for field in review.dict().keys():
        setattr(existing_review, field, review.dict()[field])
    session.commit()
    return existing_review

@app.put('/categories/{id}')
def replace_category(id: int, category: CategorySchema):
    existing_category = session.query(Category).filter_by(id=id).first()
    if not existing_category:
        return {"error": "Category not found"}, 404
    for field in category.dict().keys():
        setattr(existing_category, field, category.dict()[field])
    session.commit()
    return existing_category

@app.delete('/users/{id}')
def delete_user(id: int):
    existing_user = session.query(User).filter_by(id=id).first()
    if not existing_user:
        return {"error": "User not found"}, 404
    session.delete(existing_user)
    session.commit()
    return {"message": "User deleted successfully"}

@app.delete('/product/delete{id}')
def delete_product(id:int) ->None:
    good = session.query(Product).filter_by(id=id).first()
    session.delete(good)
    session.commit()
    return {"detail":f"Product with the id {id} has been deleted succesfully"}




# @app.delete('/products/{id}')
# def delete_product(id: int):
#     existing_product = session.query(Product).filter_by(id=id).first()
#     if not existing_product:
#         return {"error": "Product not found"}, 404
#     session.delete(existing_product)
#     session.commit()
#     return {"message": "Product deleted successfully"}

@app.delete('/sales/{id}')
def delete_sales(id: int):
    existing_sales = session.query(Sales).filter_by(id=id).first()
    if not existing_sales:
        return {"error": "Sales not found"}, 404
    session.delete(existing_sales)
    session.commit()
    return {"message": "Sales deleted successfully"}

@app.delete('/reviews/{id}')
def delete_review(id: int):
    existing_review = session.query(Review).filter_by(id=id).first()
    if not existing_review:
        return {"error": "Review not found"}, 404
    session.delete(existing_review)
    session.commit()
    return {"message": "Review deleted successfully"}


from fastapi import APIRouter
from .auth import router as auth_router

api_router_v1 = APIRouter(prefix="/v1")
api_router_default=APIRouter(prefix="")

api_router_v1.include_router(auth_router)







api_router =APIRouter(prefix="/api")

api_router.include_router(api_router_v1)
api_router.include_router(api_router_default)
from fastapi import APIRouter
# from .auth import router as auth_router
from .test_user import router as test_user

api_router_test = APIRouter(prefix="/test")

api_router_test.include_router(test_user)







api_router =APIRouter(prefix="/api")

api_router.include_router(api_router_test)

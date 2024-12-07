from pydantic import BaseModel
from typing import List, Optional


class PlatformResult(BaseModel):
    platform: str
    status: str
    url: Optional[str] = None


class UsernameRequest(BaseModel):
    username: str


class UsernameResponse(BaseModel):
    username:str
    results: List[PlatformResult]

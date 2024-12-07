from pydantic import BaseModel, EmailStr

class EmailRequest(BaseModel):
    email: EmailStr
    tool: str

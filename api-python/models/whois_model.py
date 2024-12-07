from pydantic import BaseModel

class DomainRequest(BaseModel):
    domain: str
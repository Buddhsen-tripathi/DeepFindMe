from fastapi import APIRouter, Depends, HTTPException
from services.whois_service import fetch_whois_data
from models.whois_model import DomainRequest

router = APIRouter()

@router.post("/whois")
async def get_whois(domain_request: DomainRequest):
    try:
        result = await fetch_whois_data(domain_request.domain)
        return {"domain": domain_request.domain, "whois_data": result}
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error fetching WHOIS data: {str(e)}")

from fastapi import APIRouter, HTTPException
from services.notify_service import notify
from models.notify_model import EmailRequest

router = APIRouter()

@router.post("/notify")
async def create_email(email_request: EmailRequest):
    """
    Add a new email to the reminders list for a specific API.
    """
    try:
        result = await notify(email_request.email, email_request.tool)
        return {"message": "Reminder added successfully!"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
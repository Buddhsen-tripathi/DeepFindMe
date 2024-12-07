from fastapi import APIRouter, HTTPException
from services.username_search_service import search_usernames
from models.username_search_model import UsernameRequest, UsernameResponse

router = APIRouter()

@router.post("/username-search")
async def username_search(request: UsernameRequest):
    """
    API endpoint to search for usernames using sherlock-project.
    :param payload: JSON payload containing the username to search.
    :return: Search results for the username.
    """
    try:
        # Call the service function
        service_results = search_usernames(request.username)

        # Extract results from the dictionary and pass to the response model
        if "error" in service_results:
            raise HTTPException(status_code=500, detail=service_results["error"])

        # Return results matching the response model
        return {"username": request.username, "results": service_results["results"]}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
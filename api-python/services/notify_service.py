from core.config import SupabaseConfig

supabase = SupabaseConfig.get_supabase_client()

async def notify(email: str, tool: str):
    """
    Add an email to the 'emails' table for a specific API reminder.
    """
    try:
        response = supabase.table("emails").insert({
            "email": email,
            "tool": tool
        }).execute()
        return response.data
    except Exception as e:
        raise Exception(f"Failed to add email: {str(e)}")

from supabase import create_client
import os
from dotenv import load_dotenv

load_dotenv()

class SupabaseConfig:
    SUPABASE_URL = os.getenv("SUPABASE_URL")
    SUPABASE_KEY = os.getenv("SUPABASE_KEY")

    @staticmethod
    def get_supabase_client():
        return create_client(SupabaseConfig.SUPABASE_URL, SupabaseConfig.SUPABASE_KEY)
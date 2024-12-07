import whois

async def fetch_whois_data(domain: str):
    """
    Fetch WHOIS records for the given domain.
    :param domain: Domain name
    :return: WHOIS records
    """
    try:
        whois_data = whois.whois(domain)
        if whois_data is None:
            raise Exception("WHOIS data not found")
        return whois_data
    except Exception as e:
        raise Exception(f"Failed to fetch WHOIS data: {str(e)}")

export type CountryCode = 
    | "US" | "GB" | "CA" | "AU" | "DE" 
    | "FR" | "JP" | "CN" | "IN" | "BR" 
    | "RU" | "IT" | "ES" | "MX" | "KR" 
    | "NL" | "CH" | "SE" | "NO" | "DK" 
    | "FI" | "NZ" | "ZA" | "AE" | "SG" 
    | "IL" | "PL" | "AR" | "BE" | "IE";

export type CountryName = 
    | "United States" | "United Kingdom" | "Canada" | "Australia" | "Germany" 
    | "France" | "Japan" | "China" | "India" | "Brazil" 
    | "Russia" | "Italy" | "Spain" | "Mexico" | "South Korea" 
    | "Netherlands" | "Switzerland" | "Sweden" | "Norway" | "Denmark" 
    | "Finland" | "New Zealand" | "South Africa" | "United Arab Emirates" | "Singapore" 
    | "Israel" | "Poland" | "Argentina" | "Belgium" | "Ireland";

export const countryCodes: Record<CountryName, CountryCode> = {
    "United States": "US",
    "United Kingdom": "GB",
    "Canada": "CA",
    "Australia": "AU",
    "Germany": "DE",
    "France": "FR",
    "Japan": "JP",
    "China": "CN",
    "India": "IN",
    "Brazil": "BR",
    "Russia": "RU",
    "Italy": "IT",
    "Spain": "ES",
    "Mexico": "MX",
    "South Korea": "KR",
    "Netherlands": "NL",
    "Switzerland": "CH",
    "Sweden": "SE",
    "Norway": "NO",
    "Denmark": "DK",
    "Finland": "FI",
    "New Zealand": "NZ",
    "South Africa": "ZA",
    "United Arab Emirates": "AE",
    "Singapore": "SG",
    "Israel": "IL",
    "Poland": "PL",
    "Argentina": "AR",
    "Belgium": "BE",
    "Ireland": "IE"
};
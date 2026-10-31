# elizabethdavidson.com DNS records (Wix zone, captured 2026-10-30)

Source: Todd's screenshot of Wix → Domains → Manage DNS Records, with full TXT values
from a public lookup (8.8.8.8). On launch day, recreate the **email records** in the
Netlify DNS zone *before* switching nameservers at GoDaddy. The website records are replaced.

## Recreate exactly (email: Google Workspace)

| Type | Host | Value | Notes |
|---|---|---|---|
| MX | @ | `smtp.google.com` priority 10 | Gmail delivery |
| TXT | @ | `v=spf1 include:_spf.google.com -all` | SPF |
| TXT | @ | `google-site-verification=DLOEd4g1VslUoKOl3nksaVG3uIC_mTLxR-pcGJLMfo4` | Google ownership proof |
| TXT | _dmarc | `v=DMARC1; p=none; fo=1` | DMARC |
| TXT | google._domainkey | `v=DKIM1; k=rsa; p=MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4RApJTeCQLeTj6Egk+hqC23RnESDYvIZRqpKF1VyxcgDFC9DTWoFrrTYhuK6zl806jBg2KO1y0usCYmXKO3KLrL7g89O7UaYV81MRqYIzrockP5A/A1V8Tdw2zUmaN0jEki3oXDEao1oDnFnNMwxknIBcrrxo8rYfdqMSDKXqzqIEeb+NzXAfRsne8lhAelv1UOiIJAFULsOHMOrgscyWPhpIqsBGBWMyezciASARdCxOzvDyLvl5PRF7TkZQOBU4yBIO4o0ZvhvFQvOG+hW+eH+bZ8QdtF1oZ7OhhwZo0xsVvaylgGxP2z6DdLHJNbyMqWM4ySBKxMozaYM286/twIDAQAB` | DKIM signing |

## Replaced by Netlify (website)

| Type | Host | Wix value |
|---|---|---|
| A | @ | 185.230.63.107, 185.230.63.186, 185.230.63.171 |
| CNAME | www | cdn3.wixdns.net |

Netlify DNS creates its own apex/www records when the domain is added to the site.

## Complete

The whole Wix page has been captured: SRV is empty, MX is the single `smtp.google.com` (10),
"Other MX records" is empty, and NS is ns14/ns15.wixdns.net (Wix's; these are what change at GoDaddy).
Nothing else needs copying.

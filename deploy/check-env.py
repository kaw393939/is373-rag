"""Validate nonsecret deployment settings before an operator runs Compose."""
import re
import sys
from pathlib import Path

def validate(text: str, expected: str) -> dict[str, str]:
    if expected not in ('dev', 'prod'):
        raise ValueError('expected environment must be dev or prod')
    values = {}
    for line in text.splitlines():
        line = line.strip()
        if not line or line.startswith('#'):
            continue
        key, sep, value = line.partition('=')
        if not sep or key in values or not re.fullmatch(r'[A-Z_]+', key):
            raise ValueError('invalid or duplicate environment key')
        if not value or any(c.isspace() for c in value) or any(x in value for x in ('REPLACE_', 'CONFIRMED_', '$', '`', '"', "'")):
            raise ValueError(f'{key} must contain a concrete, unquoted value')
        values[key] = value
    allowed = {'DEPLOY_ENV', 'APP_HOST', 'APP_IMAGE', 'TRAEFIK_NETWORK', 'TRAEFIK_HTTPS_ENTRYPOINT', 'TRAEFIK_TLS_RESOLVER'}
    required = allowed | ({'DEV_ACCESS_MIDDLEWARE'} if expected == 'dev' else set())
    if set(values) != required:
        raise ValueError('missing or unexpected settings; do not place secrets in this file')
    hosts = {'dev': 'dev-rag.keithwilliams.org', 'prod': 'rag.keithwilliams.org'}
    if values['DEPLOY_ENV'] != expected or values['APP_HOST'] != hosts[expected]:
        raise ValueError('environment and hostname do not match')
    if not re.fullmatch(r'docker\.io/[a-z0-9][a-z0-9_-]*/is373-rag@sha256:[a-f0-9]{64}', values['APP_IMAGE']):
        raise ValueError('APP_IMAGE must use the approved repository and immutable sha256 digest')
    for key in ('TRAEFIK_NETWORK', 'TRAEFIK_HTTPS_ENTRYPOINT', 'TRAEFIK_TLS_RESOLVER'):
        if not re.fullmatch(r'[A-Za-z0-9_.-]+', values[key]):
            raise ValueError(f'invalid {key}')
    if expected == 'dev' and not re.fullmatch(r'[A-Za-z0-9_.-]+@(file|docker)', values['DEV_ACCESS_MIDDLEWARE']):
        raise ValueError('development requires a verified access middleware with provider suffix')
    return values

if __name__ == '__main__':
    try:
        if len(sys.argv) != 3:
            raise ValueError('usage: python3 deploy/check-env.py /path/to/deploy.env dev|prod')
        settings = validate(Path(sys.argv[1]).read_text(), sys.argv[2])
    except (OSError, ValueError) as exc:
        sys.exit(str(exc))
    print(f"Validated settings for {settings['DEPLOY_ENV']} / {settings['APP_HOST']}; live proxy, image and authorization are NOT verified.")

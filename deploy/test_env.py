import importlib.util
import unittest
from pathlib import Path
spec = importlib.util.spec_from_file_location('check_env', Path(__file__).with_name('check-env.py'))
module = importlib.util.module_from_spec(spec)
spec.loader.exec_module(module)

class EnvironmentTests(unittest.TestCase):
    def fixture(self, stage='dev'):
        return '\n'.join([f'DEPLOY_ENV={stage}', f'APP_HOST={"dev-rag" if stage=="dev" else "rag"}.keithwilliams.org', 'APP_IMAGE=docker.io/example/is373-rag@sha256:'+'a'*64, 'TRAEFIK_NETWORK=web', 'TRAEFIK_HTTPS_ENTRYPOINT=websecure', 'TRAEFIK_TLS_RESOLVER=le'] + (['DEV_ACCESS_MIDDLEWARE=private-preview@file'] if stage=='dev' else []))
    def test_dev(self): module.validate(self.fixture(), 'dev')
    def test_prod(self): module.validate(self.fixture('prod'), 'prod')
    def test_wrong_host(self):
        with self.assertRaises(ValueError): module.validate(self.fixture().replace('dev-rag.', 'rag.'), 'dev')
    def test_underscore(self):
        with self.assertRaises(ValueError): module.validate(self.fixture().replace('dev-rag.', 'dev_rag.'), 'dev')
    def test_mutable_tag(self):
        with self.assertRaises(ValueError): module.validate(self.fixture().replace('@sha256:'+'a'*64, ':latest'), 'dev')
    def test_missing_access(self):
        with self.assertRaises(ValueError): module.validate(self.fixture().split('DEV_ACCESS_')[0], 'dev')
    def test_duplicate(self):
        with self.assertRaises(ValueError): module.validate(self.fixture()+'\nDEPLOY_ENV=dev', 'dev')
    def test_unexpected_secret(self):
        with self.assertRaises(ValueError): module.validate(self.fixture()+'\nAPI_KEY=fixture', 'dev')
    def test_placeholders(self):
        with self.assertRaises(ValueError): module.validate(Path(__file__).with_name('dev.env.example').read_text(), 'dev')

if __name__ == '__main__': unittest.main(verbosity=2)

# import ed25519;
import requests as r;

class Ident:
    def __init__(self):
        self.url = 'http://localhost:6006';
        self.headers = {
            'public-key-header': 'abc'
        };

    def get(self):
        s = 'hello'
        ret = r.get(f'{self.url}/{s}', headers=self.headers).text;
        return ret;

    # Auth
    def put(self, data):
        s = 'hello'
        ret = r.put(f'{self.url}/{s}', data = data).text;
        return ret

    def post(self):
        s = 'hello'
        ret = r.post(f'{self.url}/{s}').text;

# main
def main():
    i = Ident();
    print(i.get())
    
main();

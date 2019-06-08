import ed25519;
import requests as r;

class Ident:
    def __init__(self):
        self.url = 'http://localhost:6006';

    def get(self):
        s = 'hello'
        ret = r.get(f'{self.url}/{s}').text;
        assert ret == s

    # Auth
    def put(self, data):
        s = 'hello'
        ret = r.put(f'{self.url}/{s}', data = data).text;
        return ret

    def post(self):
        s = 'hello'
        ret = r.post(f'{self.url}/{s}').text;
        assert ret == s;

def test_login():
    kh = b'a9710e8218b12a30fade0e89c9522409283db4cba6a9e7b543d5445134da045b3fa4293dde72f370852759bf31004c39041ed43022f60fd1694df0053b1a7b24';
    ph = b'3fa4293dde72f370852759bf31004c39041ed43022f60fd1694df0053b1a7b24';

    s = ed25519.SigningKey(kh, encoding='hex');
    p = ed25519.VerifyingKey(ph, encoding='hex');

    i = Ident();
    ret = i.put(data = {
        'public': p.to_bytes().hex()
    });

    print(ret);
    # print(s.to_bytes().hex());
    # print(p.to_bytes().hex());
    
# main
def main():
    test_login();
    
main();

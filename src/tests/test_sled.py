import json;
import requests as r;

headers = {
    "content-type": "application/json"
};

# insert author
def test_insert_author():
    data = {
        "id": "1",
        "method": "x",
        "jsonrpc": "2.0",
        "params": {
            "db": "test_db",
            "tree": "test_tree",
            "key": "test_key",
            "value": "test_value"
        }
    };

    res = r.post('http://localhost:3030', data=json.dumps(data), headers=headers);
    print(res.text);

test_insert_author();

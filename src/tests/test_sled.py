import json;
import requests as r;

headers = {
    "content-type": "application/json"
};

# insert author
class SledSets:
    def test_insert_kv():
        data = {
            "id": "1",
            "method": "x",
            "jsonrpc": "2.0",
            "params": {
                "db": "test_db",
                "key": "test_key",
                "value": "test_value"
            }
        };

        res = r.post('http://localhost:3030', data=json.dumps(data), headers=headers);
        print(res.text);
        
    def test_insert_kv_in_tree():
        data = {
            "id": "1",
            "method": "x",
            "jsonrpc": "2.0",
            "params": {
                "db": "test_db",
                "tree": "test_tree",
                "key": "test_key_in_tree",
                "value": "test_value_in_tree"
            }
        };

        res = r.post('http://localhost:3030', data=json.dumps(data), headers=headers);
        print(res.text);

# st = SledSets;
# st.test_insert_kv();
# st.test_insert_kv_in_tree();
# st.test_insert_value();

class TestGets:
    def test_get_key():
        data = {
            "id": "1",
            "method": "x",
            "jsonrpc": "2.0",
            "params": {
                "db": "test_db",
                "key": "test_key",
            }
        };

        res = r.post('http://localhost:3030', data=json.dumps(data), headers=headers);
        print(res.text);

    def test_get_key_in_tree():
        data = {
            "id": "1",
            "method": "x",
            "jsonrpc": "2.0",
            "params": {
                "db": "test_db",
                "tree": "test_tree",
                "key": "test_key_in_tree",
            }
        };

        res = r.post('http://localhost:3030', data=json.dumps(data), headers=headers);
        print(res.text);

# tg = TestGets;
# tg.test_get_key();
# tg.test_get_key_in_tree();

class TestBatch:
    def test_batch_db():
        data = {
            "id": "1",
            "method": "x",
            "jsonrpc": "2.0",
            "params": {
                "db": "test_db",
                "batch": "true"
            }
        };

        res = r.post('http://localhost:3030', data=json.dumps(data), headers=headers);
        print(json.loads(res.text).get('result'));

    def test_batch_db_in_tree():
        data = {
            "id": "1",
            "method": "x",
            "jsonrpc": "2.0",
            "params": {
                "db": "test_db",
                "tree": "test_tree",
                "batch": "true"
            }
        };

        res = r.post('http://localhost:3030', data=json.dumps(data), headers=headers);
        print(json.loads(res.text).get('result'));

tb = TestBatch;
tb.test_batch_db();
tb.test_batch_db_in_tree();

use jsonrpc_core::*;
use jsonrpc_http_server::*;
use sled::Db;
use serde_json::Map;

fn main() {
    let mut io = IoHandler::new();
    io.add_method("x", |p: Params| {
        let d: Map<String, Value> = p.parse().unwrap();
        let db = d.get("db").unwrap().as_str().unwrap();
        let t = Db::start_default(db).unwrap();
        
        let _key = d.get("key");
        let value =  d.get("value");

        let key: String;
        if _key.is_some() {
            key = _key.unwrap().as_str().unwrap().to_string();
        } else {
            key = String::from_utf8(
                (t.len() + 1).to_be_bytes().to_vec()
            ).unwrap();
        }
        
        t.flush().unwrap();
        if value.is_some() {
            match t.set(
                key.as_bytes(),
                value.unwrap().as_str().unwrap().as_bytes()
            ).is_ok() {
                true => Ok(Value::String("OK".to_string())),
                false => Ok(Value::String("ERROR".to_string()))
            }
        } else {
            let data = t.get(key.as_bytes()).unwrap();

            match data.is_some() {
                true => {
                    Ok(Value::String(
                        String::from_utf8(data.unwrap().to_vec()
                        ).unwrap()))
                },
                false => {
                    Ok(Value::String("Err".to_string()))
                }
            }
        }
    });

    println!("server start at 3030...");
    let _server = ServerBuilder::new(io)
	.start_http(&"127.0.0.1:3030".parse().unwrap())
	.expect("Unable to start RPC server");

    _server.wait();    
}

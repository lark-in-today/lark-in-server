use ws::listen;

fn main() {
    listen("127.0.0.1:3012", |out| {
        move |msg: ws::Message| {
            let m = msg.into_text().unwrap();
            println!("{:?}", m);
            let ret = ws::Message::text(String::from("hello"));
            out.send(ret)
        }
    }).unwrap()
}

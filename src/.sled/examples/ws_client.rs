use ws::{connect, CloseCode};

fn main() {
    connect("ws://127.0.0.1:3012", |out| {
        out.send("Setllo WebSocket").unwrap();

        move |msg| {
            println!("Got message: {}", msg);
            out.close(CloseCode::Normal)
        }
    }).unwrap()
}

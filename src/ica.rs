use std::time::Instant;

use rust_socketio::asynchronous::{Client, ClientBuilder};
use rust_socketio::{async_any_callback, async_callback};
use rust_socketio::{Event, Payload, TransportType};

mod handlers;

pub async fn start_ica() {
    let socketio_start_time = Instant::now();

    let socket = match ClientBuilder::new("TODO")
        .transport_type(rust_socketio::TransportType::Websocket)
        .on_any(async_any_callback!(handlers::any_event))
        .on("requireAuth", async_callback!(handlers::sign_callback))
        .connect()
        .await
    {
        Ok(socket) => socket,
        Err(err) => panic!("Failed to connect to server: {}", err),
    };
}

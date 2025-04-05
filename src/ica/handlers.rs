use colored::Colorize;
use rust_socketio::asynchronous::Client;
use rust_socketio::{Event, Payload};
use serde_json::json;
use tracing::{event, info, span, Level};

/// 所有
pub async fn any_event(event: Event, payload: Payload, _client: Client) {
    let handled = vec![
        // 真正处理过的
        "authSucceed",
        "authFailed",
        "authRequired",
        "requireAuth",
        "onlineData",
        "addMessage",
        "deleteMessage",
        "setAllRooms",
        "setMessages",
        "handleRequest", // 处理验证消息 (加入请求之类的)
        // 也许以后会用到
        "messageSuccess",
        "messageFailed",
        "setAllChatGroups",
        // 忽略的
        "notify",       // 提醒?
        "setShutUp",    // 禁言
        "syncRead",     // 同步已读
        "closeLoading", // 发送消息/加载新聊天 有一个 loading
        "renewMessage", // 我也不确定到底是啥事件
        "requestSetup", // 需要登录
        "updateRoom",   // 更新房间
    ];
    match &event {
        Event::Custom(event_name) => {
            if handled.contains(&event_name.as_str()) {
                // return;
            }
        }
        Event::Message => {
            if let Payload::Text(values) = payload {
                if let Some(value) = values.first() {
                    if handled.contains(&value.as_str().unwrap()) {
                        return;
                    }
                    event!(Level::INFO, "收到消息 {}", value.to_string().yellow());
                }
            }
            // return;
        }
        _ => (),
    }
    // match payload {
    //     Payload::Binary(ref data) => {
    //         println!("event: {} |{:?}", event, data)
    //     }
    //     Payload::Text(ref data) => {
    //         print!("event: {}", event.as_str().purple());
    //         for value in data {
    //             println!("|{}", value);
    //         }
    //     }
    //     _ => (),
    // }
}


// pub async fn connect_callback(payload: Payload, _client: Client) {
//     if let Payload::Text(values) = payload {
//         if let Some(value) = values.first() {
//             match value.as_str() {
//                 Some("authSucceed") => {
//                     event!(Level::INFO, "{}", "已经登录到 icalingua!".green())
//                 }
//                 Some("authFailed") => {
//                     event!(Level::ERROR, "{}", "登录到 icalingua 失败!".red());
//                     panic!("登录失败")
//                 }
//                 Some("authRequired") => {
//                     event!(Level::INFO, "{}", "需要登录到 icalingua!".yellow())
//                 }
//                 Some(msg) => {
//                     event!(Level::INFO, "{}{}", "未知消息".yellow(), msg);
//                 }
//                 _ => (),
//             }
//         }
//     }
// }

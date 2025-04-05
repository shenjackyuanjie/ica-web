use std::fmt::Display;
use std::path::Path;


use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Config {
    pub ica: IcaConfig,
    pub serve: ServeConfig,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct IcaConfig {
    /// ica-bridge 的 ip
    pub host_ip: String,
    /// 私钥, 用于签名
    pub private_key: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ServeConfig {
    /// 服务的 ip
    pub host_ip: String,
    /// 服务的端口
    pub port: u16,
    /// 服务的路径
    pub path: String,
}

#[derive(Debug)]
pub enum ConfigError {
    IoError(std::io::Error),
    ParseError(toml::de::Error),
}

impl std::error::Error for ConfigError {}

impl From<std::io::Error> for ConfigError {
    fn from(value: std::io::Error) -> Self {
        Self::IoError(value)
    }
}

impl From<toml::de::Error> for ConfigError {
    fn from(value: toml::de::Error) -> Self {
        Self::ParseError(value)
    }
}

impl Display for ConfigError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            Self::IoError(e) => write!(f, "IoErr while loading config: {e}"),
            Self::ParseError(e) => write!(f, "config parse faild: {e}"),
        }
    }
}

pub fn load_config_from_path(path: &Path) -> Result<Config, ConfigError> {
    let content = std::fs::read_to_string(path)?;
    Ok(toml::from_str(&content)?)
}

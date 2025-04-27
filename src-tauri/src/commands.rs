use crate::models::Project;
use reqwest::header::{HeaderMap, HeaderValue, CONTENT_TYPE};

const BACKEND_URL: &str = "http://desktop-58b969b.local:3000";
const API_KEY_HEADER: &str = "X-API-Key";

// --- Placeholder API Keys ---
#[cfg(any(target_os = "windows", target_os = "linux", target_os = "macos"))]
const DESKTOP_API_KEY: &str = "8Mu4c3dLLdE7mbGoqk865sHQNQjxWb9Y";

#[cfg(target_os = "android")]
const ANDROID_API_KEY: &str = "ZMz3W8suyiC4LPgkeAgGUjAhsbd35iux";

// --- Helper to get API Key based on OS ---
fn get_api_key() -> &'static str {
    #[cfg(target_os = "windows")]
    {
        DESKTOP_API_KEY
    }
    #[cfg(target_os = "linux")]
    {
        DESKTOP_API_KEY
    }
    #[cfg(target_os = "macos")]
    {
        DESKTOP_API_KEY
    }
    #[cfg(target_os = "android")]
    {
        ANDROID_API_KEY
    }
    #[cfg(not(any(
        target_os = "windows",
        target_os = "android",
        target_os = "linux",
        target_os = "macos"
    )))]
    {
        // Fallback or error handling needed for unsupported OS
        ""
    }
}

// --- Generic Fetch Function ---
async fn fetch_list<T: serde::de::DeserializeOwned>(endpoint: &str) -> Result<Vec<T>, String> {
    let client = reqwest::Client::new();
    let url = format!("{}{}", BACKEND_URL, endpoint);
    let api_key = get_api_key();

    if api_key.is_empty() {
        return Err("API Key not configured for this platform.".to_string());
    }

    let mut headers = HeaderMap::new();
    headers.insert(
        API_KEY_HEADER,
        HeaderValue::from_str(api_key).map_err(|e| e.to_string())?,
    );
    headers.insert(CONTENT_TYPE, HeaderValue::from_static("application/json"));

    let response = client
        .get(&url)
        .headers(headers)
        .send()
        .await
        .map_err(|e| format!("Network request failed: {}", e))?;

    if !response.status().is_success() {
        let status = response.status();
        let error_text = response
            .text()
            .await
            .unwrap_or_else(|_| "Could not read error body".to_string());
        return Err(format!(
            "API request failed with status {}: {}",
            status, error_text
        ));
    }

    response
        .json::<Vec<T>>()
        .await
        .map_err(|e| format!("Failed to parse JSON response: {}", e))
}

// --- Resource-specific Commands ---

#[tauri::command]
pub async fn list_projects() -> Result<Vec<Project>, String> {
    fetch_list::<Project>("/projects").await
}

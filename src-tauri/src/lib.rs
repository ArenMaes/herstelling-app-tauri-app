mod commands;
mod models;

#[tauri::command]
fn get_os_name() -> String {
    #[cfg(target_os = "windows")]
    {
        "Windows".to_string()
    }
    #[cfg(target_os = "android")]
    {
        "Android".to_string()
    }
    #[cfg(target_os = "linux")]
    {
        "Linux".to_string()
    }
    #[cfg(target_os = "macos")]
    {
        "macOS".to_string()
    }
    #[cfg(not(any(
        target_os = "windows",
        target_os = "android",
        target_os = "linux",
        target_os = "macos"
    )))]
    {
        "Unknown".to_string()
    }
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_os_name,
            commands::list_projects
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

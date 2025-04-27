import { createSignal, onMount } from "solid-js";
import { invoke } from "@tauri-apps/api/core";

function OsName() {
    const [osName, setOsName] = createSignal("Loading...");

    onMount(async () => {
        try {
            const name = await invoke<string>("get_os_name");
            setOsName(name);
        } catch (err) {
            setOsName("Failed to get OS");
            console.error(err);
        }
    });

    return (
        <div>
            <p>Operating System: {osName()}</p>
        </div>
    );
}

export default OsName;

import { useState } from "react";

function App() {
    const [status, setStatus] = useState("未読み込み");

    async function handleLoadData() {
        try {
            setStatus("読み込み中...");

            const data = await window.electronAPI.loadFusionData();

            console.log(data);
            setStatus("読み込み成功！");
        } catch (error) {
            console.error(error);
            setStatus("読み込み失敗");
        }
    }

    return (
        <main>
            <h1>Sky Shard Optimizer</h1>

            <button onClick={handleLoadData}>
                Fusionデータを読み込む
            </button>

            <p>状態：{status}</p>
        </main>
    );
}

export default App;
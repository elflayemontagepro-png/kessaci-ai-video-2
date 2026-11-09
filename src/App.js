export default class App {
    static main() {
        const app = document.getElementById("app");

        app.innerHTML = `
            <div class="container">
                <h1>🎬 KESSACI AI VIDÉO 2.0</h1>
                <p>Bienvenue dans votre studio de création IA.</p>

                <textarea
                    id="prompt"
                    placeholder="Décris la vidéo que tu souhaites créer..."
                ></textarea>

                <button id="create">
                    Créer ma vidéo
                </button>

                <p id="status">
                    Studio prêt.
                </p>
            </div>
        `;

        document.getElementById("create").onclick = () => {
            const prompt = document.getElementById("prompt").value.trim();

            document.getElementById("status").textContent =
                prompt ? "Votre demande est prête pour le moteur IA." :
                "Écris d'abord une description.";
        };
    }
}

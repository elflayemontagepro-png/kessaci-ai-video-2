
export default class App {
    static main() {
        const app = document.getElementById("app");

        app.innerHTML = `
            <div class="container">
                <h1>🎬 KESSACI AI VIDÉO 2.0</h1>

                <p>Bienvenue dans votre studio de création IA.</p>

                <h3>✍️ Décris ta vidéo</h3>

                <textarea
                    id="prompt"
                    placeholder="Exemple : Un magnifique coucher de soleil sur Alger, avec une musique émouvante..."
                ></textarea>

                <h3>⏱️ Durée de la vidéo</h3>

                <select id="duration">
                    <option value="5 secondes">5 secondes</option>
                    <option value="10 secondes">10 secondes</option>
                    <option value="15 secondes">15 secondes</option>
                    <option value="30 secondes">30 secondes</option>
                </select>

                <h3>📱 Format de la vidéo</h3>

                <select id="format">
                    <option value="TikTok vertical">TikTok vertical</option>
                    <option value="YouTube horizontal">YouTube horizontal</option>
                    <option value="Carré">Carré</option>
                </select>

                <br><br>

                <button id="create">
                    🎥 Préparer ma vidéo
                </button>

                <p id="status">Studio prêt.</p>
            </div>
        `;

        document.getElementById("create").onclick = () => {
            const prompt = document.getElementById("prompt").value.trim();
            const duration = document.getElementById("duration").value;
            const format = document.getElementById("format").value;
            const status = document.getElementById("status");

            if (!prompt) {
                status.textContent = "⚠️ Décris d'abord ta vidéo.";
                return;
            }

            status.textContent =
                "✅ Description préparée ! Durée : " +
                duration + " | Format : " + format +
                ". Le moteur IA vidéo n'est pas encore connecté.";
        };
    }
}


export default class App {
    static main() {
        const app = document.getElementById("app");

        app.innerHTML = `
            <div class="container">
                <h1>🎬 KESSACI AI VIDÉO 2.0</h1>
                <p>Votre studio gratuit de création vidéo intelligente</p>

                <section class="panel">
                    <h2>✨ Créer une vidéo</h2>

                    <label for="projectTitle">Nom du projet</label>
                    <input id="projectTitle" placeholder="Ma vidéo">

                    <label for="prompt">Décris ta vidéo</label>
                    <textarea id="prompt" rows="5"
                        placeholder="Exemple : Alger au coucher du soleil..."></textarea>

                    <label for="duration">Durée</label>
                    <select id="duration">
                        <option>5 secondes</option>
                        <option>10 secondes</option>
                        <option>15 secondes</option>
                        <option>30 secondes</option>
                    </select>

                    <label for="format">Format</label>
                    <select id="format">
                        <option value="9:16">Vertical 9:16 — TikTok</option>
                        <option value="16:9">Horizontal 16:9 — YouTube</option>
                        <option value="1:1">Carré 1:1</option>
                    </select>

                    <label for="style">Style visuel</label>
                    <select id="style">
                        <option>Cinématographique</option>
                        <option>Documentaire</option>
                        <option>Clip musical</option>
                        <option>Animation artistique</option>
                        <option>Fantastique</option>
                    </select>

                    <label for="photo">Importer une photo</label>
                    <input id="photo" type="file" accept="image/*">
                    <div id="photoPreview"></div>

                    <label for="music">Importer une musique</label>
                    <input id="music" type="file" accept="audio/*">
                    <p id="musicName">Aucune musique sélectionnée.</p>

                    <button class="gold-button" id="prepareVideo">
                        🎬 Préparer ma vidéo
                    </button>

                    <div id="result" hidden>
                        <h3>Votre demande vidéo</h3>
                        <textarea id="generatedPrompt" rows="7" readonly></textarea>
                        <button id="copyPrompt">📋 Copier la demande</button>
                    </div>

                    <button id="saveProject">
                        💾 Enregistrer mon projet
                    </button>

                    <p id="status" role="status">Studio prêt.</p>
                </section>

                <section class="panel">
                    <h2>📁 Mes projets</h2>
                    <div id="projectList"></div>
                </section>

                <section class="panel">
                    <h2>❓ Aide</h2>
                    <p>1. Décris ta vidéo.</p>
                    <p>2. Choisis la durée, le format et le style.</p>
                    <p>3. Ajoute une photo ou une musique.</p>
                    <p>4. Prépare ta demande et enregistre ton projet.</p>
                    <p>La génération réelle nécessitera ensuite la connexion
                    d'un moteur d'intelligence artificielle.</p>
                </section>

                <footer>
                    KESSACI AI VIDÉO 2.0 · Version gratuite
                </footer>
            </div>
        `;

        const $ = id => document.getElementById(id);
        let preparedPrompt = "";

        $("photo").addEventListener("change", () => {
            const file = $("photo").files[0];
            $("photoPreview").innerHTML = "";

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                $("status").textContent = "Choisis une image valide.";
                return;
            }

            const img = document.createElement("img");
            img.src = URL.createObjectURL(file);
            img.alt = "Aperçu de la photo";
            img.style.maxWidth = "100%";
            img.style.maxHeight = "250px";
            img.style.marginTop = "15px";
            img.style.borderRadius = "12px";

            $("photoPreview").appendChild(img);
            $("status").textContent = "Photo sélectionnée.";
        });

        $("music").addEventListener("change", () => {
            const file = $("music").files[0];
            $("musicName").textContent = file
                ? "Musique : " + file.name
                : "Aucune musique sélectionnée.";
        });

        $("prepareVideo").addEventListener("click", () => {
            const description = $("prompt").value.trim();

            if (!description) {
                $("status").textContent =
                    "⚠️ Décris d'abord la vidéo que tu souhaites créer.";
                return;
            }

            const photo = $("photo").files[0];
            const music = $("music").files[0];

            preparedPrompt =
                "Créer une vidéo avec les caractéristiques suivantes :\n\n" +
                "Description : " + description + "\n" +
                "Durée : " + $("duration").value + "\n" +
                "Format : " + $("format").value + "\n" +
                "Style : " + $("style").value + "\n" +
                "Photo sélectionnée : " + (photo ? photo.name : "Non") + "\n" +
                "Musique sélectionnée : " + (music ? music.name : "Non") +
                "\n\nQualité visuelle soignée, images cohérentes et rendu cinématographique.";

            $("generatedPrompt").value = preparedPrompt;
            $("result").hidden = false;

            $("status").textContent =
                "✅ Demande vidéo préparée. La génération IA sera activée après connexion du moteur vidéo.";
        });

        $("copyPrompt").addEventListener("click", async () => {
            try {
                await navigator.clipboard.writeText(preparedPrompt);
                $("status").textContent = "✅ Demande copiée.";
            } catch (error) {
                $("generatedPrompt").select();
                $("status").textContent =
                    "Sélectionne le texte et copie-le manuellement.";
            }
        });

        $("saveProject").addEventListener("click", () => {
            const description = $("prompt").value.trim();

            if (!description) {
                $("status").textContent =
                    "⚠️ Écris une description avant d'enregistrer.";
                return;
            }

            let projects = [];

            try {
                projects = JSON.parse(
                    localStorage.getItem("kessaciProjects") || "[]"
                );
            } catch (error) {
                projects = [];
            }

            projects.push({
                id: Date.now(),
                title: $("projectTitle").value.trim() || "Projet sans titre",
                prompt: description,
                generatedPrompt: preparedPrompt,
                duration: $("duration").value,
                format: $("format").value,
                style: $("style").value,
                date: new Date().toLocaleDateString("fr-FR")
            });

            localStorage.setItem(
                "kessaciProjects",
                JSON.stringify(projects)
            );

            $("status").textContent =
                "✅ Projet enregistré sur ce téléphone.";

            showProjects();
        });

        function showProjects() {
            let projects = [];

            try {
                projects = JSON.parse(
                    localStorage.getItem("kessaciProjects") || "[]"
                );
            } catch (error) {
                projects = [];
            }

            const list = $("projectList");
            list.innerHTML = "";

            if (!projects.length) {
                list.textContent = "Aucun projet enregistré.";
                return;
            }

            projects.forEach(project => {
                const card = document.createElement("article");
                const title = document.createElement("h3");
                const description = document.createElement("p");
                const details = document.createElement("p");
                const remove = document.createElement("button");

                title.textContent = project.title;
                description.textContent = project.prompt;
                details.textContent =
                    project.date + " · " + project.duration +
                    " · Format " + project.format;

                remove.textContent = "Supprimer";

                remove.addEventListener("click", () => {
                    const updated = projects.filter(
                        item => item.id !== project.id
                    );

                    localStorage.setItem(
                        "kessaciProjects",
                        JSON.stringify(updated)
                    );

                    showProjects();
                });

                card.append(title, description, details, remove);
                list.appendChild(card);
            });
        }

        showProjects();
    }
}

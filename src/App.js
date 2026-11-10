

export default class App {
    static main() {
        const app = document.getElementById("app");

        app.innerHTML = `
            <div class="studio">
                <header class="topbar">
                    <div>
                        <h1>🎬 KESSACI AI VIDÉO 2.0</h1>
                        <p>Votre studio de création intelligent</p>
                    </div>
                    <span class="studio-status">● STUDIO PRÊT</span>
                </header>

                <nav class="studio-nav">
                    <button data-page="creation">🎥 Création</button>
                    <button data-page="projects">📁 Mes projets</button>
                    <button data-page="help">❓ Aide</button>
                </nav>

                <main id="workspace"></main>

                <footer>
                    KESSACI AI VIDÉO 2.0 · Version gratuite
                </footer>
            </div>
        `;

        const workspace = document.getElementById("workspace");

        const showCreation = () => {
            workspace.innerHTML = `
                <section class="panel">
                    <h2>✨ Créer une nouvelle vidéo</h2>
                    <label for="projectTitle">Nom du projet</label>
                    <input id="projectTitle" placeholder="Ma vidéo sur l'Algérie">

                    <label for="prompt">Décris la vidéo que tu souhaites créer</label>
                    <textarea id="prompt" rows="5"
                        placeholder="Exemple : Alger au coucher du soleil, une ambiance cinématographique..."></textarea>

                    <label for="duration">Durée souhaitée</label>
                    <select id="duration">
                        <option>5 secondes</option>
                        <option>10 secondes</option>
                        <option>15 secondes</option>
                        <option>30 secondes</option>
                    </select>

                    <label for="format">Format vidéo</label>
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

                    <button class="gold-button" id="saveProject">
                        💾 Enregistrer mon projet
                    </button>

                    <p id="status" role="status">
                        Ton studio est prêt.
                    </p>
                </section>
            `;

            const photo = document.getElementById("photo");
            const preview = document.getElementById("photoPreview");

            photo.addEventListener("change", () => {
                preview.innerHTML = "";
                const file = photo.files[0];

                if (!file) return;

                if (!file.type.startsWith("image/")) {
                    document.getElementById("status").textContent =
                        "Choisis un fichier image valide.";
                    return;
                }

                const image = document.createElement("img");
                image.alt = "Aperçu de la photo sélectionnée";
                image.className = "photo-preview";
                image.src = URL.createObjectURL(file);
                preview.appendChild(image);
            });

            document.getElementById("music").addEventListener("change", (event) => {
                const file = event.target.files[0];
                document.getElementById("musicName").textContent =
                    file ? "Musique : " + file.name : "Aucune musique sélectionnée.";
            });

            document.getElementById("saveProject").addEventListener("click", () => {
                const title = document.getElementById("projectTitle").value.trim();
                const prompt = document.getElementById("prompt").value.trim();
                const status = document.getElementById("status");

                if (!prompt) {
                    status.textContent = "⚠️ Décris d'abord ta vidéo.";
                    return;
                }

                const projects = JSON.parse(
                    localStorage.getItem("kessaciProjects") || "[]"
                );

                projects.push({
                    id: Date.now(),
                    title: title || "Projet sans titre",
                    prompt,
                    duration: document.getElementById("duration").value,
                    format: document.getElementById("format").value,
                    style: document.getElementById("style").value,
                    date: new Date().toLocaleDateString("fr-FR")
                });

                localStorage.setItem("kessaciProjects", JSON.stringify(projects));
                status.textContent = "✅ Projet enregistré sur ce téléphone.";
            });
        };

        const showProjects = () => {
            const projects = JSON.parse(
                localStorage.getItem("kessaciProjects") || "[]"
            );

            workspace.innerHTML = `
                <section class="panel">
                    <h2>📁 Mes projets</h2>
                    <div id="projectList"></div>
                </section>
            `;

            const list = document.getElementById("projectList");

            if (!projects.length) {
                list.textContent = "Aucun projet enregistré pour le moment.";
                return;
            }

            projects.forEach(project => {
                const card = document.createElement("article");
                card.className = "project-card";

                const title = document.createElement("h3");
                title.textContent = project.title;

                const description = document.createElement("p");
                description.textContent = project.prompt;

                const details = document.createElement("p");
                details.textContent =
                    project.date + " · " + project.duration +
                    " · Format " + project.format;

                const remove = document.createElement("button");
                remove.textContent = "Supprimer";
                remove.addEventListener("click", () => {
                    const updated = projects.filter(item => item.id !== project.id);
                    localStorage.setItem("kessaciProjects", JSON.stringify(updated));
                    showProjects();
                });

                card.append(title, description, details, remove);
                list.appendChild(card);
            });
        };

        const showHelp = () => {
            workspace.innerHTML = `
                <section class="panel">
                    <h2>❓ Aide et fonctionnement</h2>
                    <p>1. Décris ta vidéo.</p>
                    <p>2. Choisis sa durée et son format.</p>
                    <p>3. Ajoute une photo et une musique si tu le souhaites.</p>
                    <p>4. Enregistre ton projet pour le retrouver plus tard.</p>
                    <p><strong>Prochaine évolution :</strong> connexion d'un moteur
                    de génération vidéo par intelligence artificielle.</p>
                    <p>Les projets sont enregistrés dans le stockage local
                    de ton navigateur. Pense à ne pas effacer ses données.</p>
                </section>
            `;
        };

        document.querySelectorAll(".studio-nav button").forEach(button => {
            button.addEventListener("click", () => {
                if (button.dataset.page === "creation") showCreation();
                if (button.dataset.page === "projects") showProjects();
                if (button.dataset.page === "help") showHelp();
            });
        });

        showCreation();
    }
}

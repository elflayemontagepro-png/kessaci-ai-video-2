
export default class App {
    static main() {
        const app = document.getElementById("app");
        if (!app) return;

        const API_BASE =
            "https://kessaci-video-api.elflayemontagepro.workers.dev";

        app.innerHTML = `
            <div class="container">
                <h1>🎬 KESSACI AI VIDEO STUDIO 2.0</h1>
                <p>Votre studio de création vidéo intelligente</p>

                <section class="panel">
                    <h2>✨ Créer un projet vidéo</h2>

                    <label for="projectTitle">Nom du projet</label>
                    <input id="projectTitle" placeholder="Mon projet vidéo">

                    <label for="prompt">Description de la vidéo</label>
                    <textarea id="prompt" rows="5"
                        placeholder="Décris précisément la vidéo souhaitée..."></textarea>

                    <label for="duration">Durée totale du projet</label>
                    <select id="duration">
                        <option value="30">30 secondes</option>
                        <option value="60">1 minute</option>
                        <option value="120">2 minutes</option>
                        <option value="300">5 minutes</option>
                        <option value="600">10 minutes</option>
                        <option value="900">15 minutes</option>
                        <option value="1200">20 minutes</option>
                        <option value="1800" selected>30 minutes</option>
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
                        <option>Réaliste</option>
                    </select>

                    <label for="photo">Importer une photo</label>
                    <input id="photo" type="file" accept="image/*">
                    <div id="photoPreview"></div>

                    <label for="music">Importer une musique</label>
                    <input id="music" type="file" accept="audio/*">
                    <p id="musicName">Aucune musique sélectionnée.</p>

                    <button class="gold-button" id="prepareVideo">
                        🎬 Préparer mon projet
                    </button>

                    <button class="gold-button" id="generateVideo">
                        🚀 Générer la vidéo
                    </button>

                    <div id="videoOutput"></div>

                    <div id="result" hidden>
                        <h3>✅ Projet préparé</h3>
                        <p id="projectSummary"></p>
                        <textarea id="generatedPrompt" rows="8" readonly></textarea>

                        <button id="copyPrompt">📋 Copier la demande générale</button>
                        <button id="downloadPlan">📥 Télécharger le plan complet</button>
                    </div>

                    <button id="saveProject">💾 Enregistrer mon projet</button>
                    <p id="status" role="status">Studio prêt.</p>
                </section>

                <section class="panel">
                    <h2>🎵 Studio de création musicale</h2>

                    <label for="musicType">Type de création</label>
                    <select id="musicType">
                        <option value="instrumental">Musique instrumentale</option>
                        <option value="song">Chanson avec voix</option>
                    </select>

                    <label for="musicTitle">Titre de la musique ou chanson</label>
                    <input id="musicTitle" placeholder="Titre de ma création">

                    <label for="musicGenre">Style musical</label>
                    <select id="musicGenre">
                        <option>Raï algérien moderne</option>
                        <option>Raï traditionnel</option>
                        <option>Chaâbi algérien</option>
                        <option>Kabyle</option>
                        <option>Amazigh</option>
                        <option>Andalou</option>
                        <option>Gnawa</option>
                        <option>Musique arabe orientale</option>
                        <option>Musique africaine</option>
                        <option>Afrobeat</option>
                        <option>Flamenco</option>
                        <option>Musique indienne</option>
                        <option>Musique turque</option>
                        <option>Musique latino</option>
                        <option>Salsa</option>
                        <option>Reggae</option>
                        <option>Pop</option>
                        <option>Rock</option>
                        <option>Hard rock</option>
                        <option>Rap</option>
                        <option>Hip-hop</option>
                        <option>R&B</option>
                        <option>Jazz</option>
                        <option>Blues</option>
                        <option>Funk</option>
                        <option>Country</option>
                        <option>Classique</option>
                        <option>Orchestral</option>
                        <option>Musique de film</option>
                        <option>Électronique</option>
                        <option>House</option>
                        <option>Techno</option>
                        <option>Trance</option>
                        <option>Ambient</option>
                        <option>Acoustique</option>
                        <option>Musique du monde</option>
                    </select>

                    <label for="musicMood">Ambiance</label>
                    <select id="musicMood">
                        <option>Émouvante</option>
                        <option>Puissante</option>
                        <option>Triste</option>
                        <option>Joy euse</option>
                        <option>Énergique</option>
                        <option>Romantique</option>
                        <option>Épique</option>
                        <option>Révoltée</option>
                        <option>Espoir et liberté</option>
                        <option>Festive</option>
                        <option>Calme</option>
                        <option>Mélancolique</option>
                    </select>

                    <label for="instruments">Instruments souhaités</label>
                    <input id="instruments"
                        placeholder="Flûte, mandoline, violon, guitare, derbouka...">

                    <label for="musicDescription">Description musicale</label>
                    <textarea id="musicDescription" rows="3"
                        placeholder="Décris la musique que tu souhaites créer..."></textarea>

                    <div id="songFields">
                        <h3>🎤 Paramètres de la chanson</h3>

                        <label for="songLanguage">Langue de la chanson</label>
                        <select id="songLanguage">
                            <option>Français</option>
                            <option>Arabe</option>
                            <option>Darija algérienne</option>
                            <option>Kabyle</option>
                            <option>Tamazight</option>
                            <option>Anglais</option>
                            <option>Espagnol</option>
                            <option>Turc</option>
                            <option>Hindi</option>
                            <option>Italien</option>
                            <option>Portugais</option>
                            <option>Multilingue</option>
                        </select>

                        <label for="voice">Type de voix</label>
                        <select id="voice">
                            <option>Voix masculine grave et chaleureuse</option>
                            <option>Voix masculine puissante</option>
                            <option>Voix masculine douce</option>
                            <option>Voix féminine douce</option>
                            <option>Voix féminine puissante</option>
                            <option>Duo homme et femme</option>
                            <option>Chœur</option>
                            <option>Rap parlé</option>
                        </select>

                        <label for="lyrics">Paroles de la chanson</label>
                        <textarea id="lyrics" rows="7"
                            placeholder="Écris tes paroles ici, ou décris le sujet de la chanson..."></textarea>
                    </div>

                    <button class="gold-button" id="generateMusic">
                        🎵 Créer une musique instrumentale
                    </button>

                    <button class="gold-button" id="generateSong">
                        🎤 Créer une chanson avec voix
                    </button>

                    <div id="musicOutput"></div>
                </section>

                <section class="panel" id="segmentsPanel" hidden>
                    <h2>🎞️ Découpage automatique</h2>
                    <p id="segmentSummary"></p>
                    <div id="segmentList"></div>
                </section>

                <section class="panel">
                    <h2>📁 Mes projets enregistrés</h2>
                    <div id="projectList"></div>
                </section>

                <section class="panel">
                    <h2>❓ Comment utiliser le studio</h2>
                    <p>1. Donne un nom à ton projet.</p>
                    <p>2. Décris la vidéo que tu souhaites créer.</p>
                    <p>3. Choisis une durée allant jusqu'à 30 minutes.</p>
                    <p>4. Choisis le format et le style visuel.</p>
                    <p>5. Prépare ton projet : il sera découpé en séquences de 10 secondes.</p>
                    <p>6. Appuie sur Générer la vidéo pour envoyer ta demande au moteur connecté.</p>
                    <p>7. Utilise le studio musical pour créer une musique ou une chanson.</p>
                    <p><strong>Important :</strong> les moteurs vidéo et musicaux doivent être configurés sur le serveur pour produire les fichiers.</p>
                </section>

                <footer>
                    KESSACI AI VIDEO STUDIO 2.0 · Studio de création
                </footer>
            </div>
        `;

        const $ = id => document.getElementById(id);

        let preparedPrompt = "";
        let preparedSegments = [];
        let photoUrl = null;

        const SEGMENT_SECONDS = 10;

        function getProjects() {
            try {
                const data = JSON.parse(
                    localStorage.getItem("kessaciProjects") || "[]"
                );
                return Array.isArray(data) ? data : [];
            } catch (error) {
                return [];
            }
        }

        function setProjects(projects) {
            try {
                localStorage.setItem(
                    "kessaciProjects",
                    JSON.stringify(projects)
                );
                return true;
            } catch (error) {
                $("status").textContent =
                    "❌ Espace de stockage insuffisant sur ce téléphone.";
                return false;
            }
        }

        function formatDuration(seconds) {
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;

            if (minutes === 0) return remainingSeconds + " secondes";

            if (remainingSeconds === 0) {
                return minutes + (minutes === 1 ? " minute" : " minutes");
            }

            return minutes + " min " + remainingSeconds + " s";
        }

        function downloadText(filename, content) {
            const blob = new Blob(
                [content],
                { type: "text/plain;charset=utf-8" }
            );

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();

            setTimeout(() => URL.revokeObjectURL(url), 1000);
        }

        async function copyText(content, textarea) {
            try {
                if (navigator.clipboard && window.isSecureContext) {
                    await navigator.clipboard.writeText(content);
                } else {
                    textarea.focus();
                    textarea.select();

                    if (!document.execCommand("copy")) {
                        throw new Error("Copie impossible");
                    }
                }

                $("status").textContent = "✅ Texte copié.";
            } catch (error) {
                textarea.focus();
                textarea.select();
                $("status").textContent =
                    "Sélectionne le texte puis choisis Copier.";
            }
        }

        function buildSegments(description, totalSeconds, format, style) {
            const total = Math.ceil(totalSeconds / SEGMENT_SECONDS);
            const segments = [];

            for (let i = 0; i < total; i++) {
                const start = i * SEGMENT_SECONDS;
                const end = Math.min(start + SEGMENT_SECONDS, totalSeconds);

                const number = i + 1;

                const segmentPrompt =
                    "KESSACI AI VIDEO STUDIO 2.0\n\n" +
                    "Séquence : " + number + " sur " + total + "\n" +
                    "Durée : " + (end - start) + " secondes\n" +
                    "Position : " + formatDuration(start) + " à " +
                    formatDuration(end) + "\n\n" +
                    "Description générale :\n" + description + "\n\n" +
                    "Style visuel : " + style + "\n" +
                    "Format : " + format + "\n\n" +
                    "Consignes : créer uniquement cette séquence. " +
                    "Respecter le sujet, les personnages, les lieux et " +
                    "la cohérence visuelle avec les séquences précédentes. " +
                    "Prévoir une transition naturelle vers la séquence suivante.";

                segments.push({
                    number,
                    start,
                    end,
                    duration: end - start,
                    prompt: segmentPrompt
                });
            }

            return segments;
        }

        function renderSegments(segments) {
            const list = $("segmentList");
            list.innerHTML = "";

            const fragment = document.createDocumentFragment();

            segments.forEach(segment => {
                const card = document.createElement("article");
                const heading = document.createElement("h3");
                const timing = document.createElement("p");
                const description = document.createElement("p");
                const copyButton = document.createElement("button");

                heading.textContent = "🎬 Séquence " + segment.number;

                timing.textContent =
                    formatDuration(segment.start) + " → " +
                    formatDuration(segment.end) + " · " +
                    segment.duration + " secondes";

                description.textContent =
                    "Demande de génération prête à être envoyée au moteur vidéo.";

                copyButton.textContent = "📋 Copier cette séquence";

                copyButton.addEventListener("click", () => {
                    copyText(segment.prompt, $("generatedPrompt"));
                });

                card.append(
                    heading,
                    timing,
                    description,
                    copyButton
                );

                fragment.appendChild(card);
            });

            list.appendChild(fragment);
            $("segmentsPanel").hidden = false;

            $("segmentSummary").textContent =
                segments.length + " séquences préparées. Durée totale : " +
                formatDuration(segments.reduce(
                    (sum, item) => sum + item.duration, 0
                )) + ".";
        }

        function prepareProject() {
            const description = $("prompt").value.trim();

            if (!description) {
                $("status").textContent =
                    "⚠️ Écris d'abord une description.";
                return false;
            }

            const duration = Number($("duration").value);
            const format = $("format").value;
            const style = $("style").value;

            if (!Number.isFinite(duration) || duration <= 0) {
                $("status").textContent = "⚠️ Choisis une durée valide.";
                return false;
            }

            preparedSegments = buildSegments(
                description, duration, format, style
            );

            preparedPrompt =
                "KESSACI AI VIDEO STUDIO 2.0\n\n" +
                "Projet : " +
                ($("projectTitle").value.trim() || "Projet sans titre") +
                "\nDescription : " + description +
                "\nDurée totale : " + formatDuration(duration) +
                "\nNombre de séquences : " + preparedSegments.length +
                "\nDurée par séquence : maximum 10 secondes" +
                "\nFormat : " + format +
                "\nStyle : " + style +
                "\n\nLe projet est organisé en séquences indépendantes.";

            $("generatedPrompt").value = preparedPrompt;

            $("projectSummary").textContent =
                "Durée : " + formatDuration(duration) +
                " · " + preparedSegments.length +
                " séquences de 10 secondes maximum.";

            $("result").hidden = false;
            renderSegments(preparedSegments);

            $("status").textContent =
                "✅ Projet préparé. Les séquences sont prêtes pour le moteur vidéo.";

            return true;
        }

        function getMediaUrl(data) {
            if (!data || typeof data !== "object") return "";

            const keys = [
                "video_url",
                "audio_url",
                "download_url",
                "output_url",
                "result_url",
                "url"
            ];

            for (const key of keys) {
                if (typeof data[key] === "string" &&
                    /^https?:\/\//i.test(data[key])) {
                    return data[key];
                }
            }

            if (data.result && typeof data.result === "object") {
                return getMediaUrl(data.result);
            }

            if (data.output && typeof data.output === "object") {
                return getMediaUrl(data.output);
            }

            return "";
        }

        function displayMedia(container, data, type) {
            container.innerHTML = "";

            const url = getMediaUrl(data);

            if (!url) {
                const message = document.createElement("p");
                message.textContent =
                    "Le serveur a répondu, mais aucun lien de fichier n'a été fourni. Réponse : " +
            
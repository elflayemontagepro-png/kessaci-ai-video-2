
export default class App {
    static main() {
        const app = document.getElementById("app");

        if (!app) return;

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

                    <div id="result" hidden>
                        <h3>✅ Projet préparé</h3>
                        <p id="projectSummary"></p>
                        <textarea id="generatedPrompt" rows="8" readonly></textarea>

                        <button id="copyPrompt">📋 Copier la demande générale</button>
                        <button id="downloadPlan">📥 Télécharger le plan complet</button>
                    </div>

                    <button id="saveProject">
                        💾 Enregistrer mon projet
                    </button>

                    <p id="status" role="status">Studio prêt.</p>
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
                    <p>6. Télécharge le plan de production ou enregistre ton projet.</p>
                    <p><strong>Attention :</strong> la génération réelle des séquences et leur assemblage en MP4 seront activés après connexion d'un moteur vidéo compatible.</p>
                </section>

                <footer>
                    KESSACI AI VIDEO STUDIO 2.0 · Version gratuite
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

            if (minutes === 0) {
                return remainingSeconds + " secondes";
            }

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

                    const copied = document.execCommand("copy");

                    if (!copied) {
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
                const end = Math.min(
                    start + SEGMENT_SECONDS,
                    totalSeconds
                );

                const number = i + 1;

                const segmentPrompt =
                    "KESSACI AI VIDEO STUDIO 2.0\n\n" +
                    "Séquence : " + number + " sur " + total + "\n" +
                    "Durée de cette séquence : " +
                    (end - start) + " secondes\n" +
                    "Position dans le projet : " +
                    formatDuration(start) + " à " +
                    formatDuration(end) + "\n\n" +
                    "Description générale :\n" + description + "\n\n" +
                    "Style visuel : " + style + "\n" +
                    "Format : " + format + "\n\n" +
                    "Consignes : créer uniquement cette séquence de la vidéo. " +
                    "Respecter le sujet, les personnages, les lieux et " +
                    "la cohérence visuelle avec les séquences précédentes. " +
                    "Prévoir une transition naturelle vers la séquence suivante. " +
                    "Ne pas modifier le thème principal du projet.";

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

                heading.textContent =
                    "🎬 Séquence " + segment.number;

                timing.textContent =
                    formatDuration(segment.start) + " → " +
                    formatDuration(segment.end) +
                    " · " + segment.duration + " secondes";

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
                segments.length + " séquences préparées. " +
                "Durée totale : " +
                formatDuration(segments.reduce(
                    (sum, item) => sum + item.duration,
                    0
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
                $("status").textContent =
                    "⚠️ Choisis une durée valide.";
                return false;
            }

            preparedSegments = buildSegments(
                description,
                duration,
                format,
                style
            );

            preparedPrompt =
                "KESSACI AI VIDEO STUDIO 2.0\n\n" +
                "Projet : " +
                ($("projectTitle").value.trim() || "Projet sans titre") +
                "\n" +
                "Description : " + description + "\n" +
                "Durée totale : " + formatDuration(duration) + "\n" +
                "Nombre de séquences : " +
                preparedSegments.length + "\n" +
                "Durée par séquence : maximum 10 secondes\n" +
                "Format : " + format + "\n" +
                "Style : " + style + "\n\n" +
                "Le projet est organisé en séquences indépendantes " +
                "pour faciliter la génération et le montage final.";

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

        $("photo").addEventListener("change", () => {
            const file = $("photo").files[0];
            $("photoPreview").innerHTML = "";

            if (photoUrl) {
                URL.revokeObjectURL(photoUrl);
                photoUrl = null;
            }

            if (!file) return;

            if (!file.type.startsWith("image/")) {
                $("status").textContent =
                    "⚠️ Choisis une image valide.";
                return;
            }

            photoUrl = URL.createObjectURL(file);

            const img = document.createElement("img");
            img.src = photoUrl;
            img.alt = "Aperçu de la photo";
            img.style.maxWidth = "100%";
            img.style.maxHeight = "250px";
            img.style.marginTop = "15px";
            img.style.borderRadius = "12px";

            $("photoPreview").appendChild(img);
            $("status").textContent = "✅ Photo sélectionnée.";
        });

        $("music").addEventListener("change", () => {
            const file = $("music").files[0];

            $("musicName").textContent = file
                ? "Musique sélectionnée : " + file.name
                : "Aucune musique sélectionnée.";
        });

        $("prepareVideo").addEventListener("click", prepareProject);

        $("copyPrompt").addEventListener("click", () => {
            copyText(preparedPrompt, $("generatedPrompt"));
        });

        $("downloadPlan").addEventListener("click", () => {
            if (!preparedSegments.length) {
                $("status").textContent =
                    "⚠️ Prépare d'abord ton projet.";
                return;
            }

            const content = [
                preparedPrompt,
                "\n\n================================",
                "PLAN DES SÉQUENCES",
                "================================\n",
                ...preparedSegments.map(segment =>
                    "\n\n-------------------------------\n" +
                    "SÉQUENCE " + segment.number + "\n" +
                    "Durée : " + segment.duration + " secondes\n" +
                    "Position : " + formatDuration(segment.start) +
                    " à " + formatDuration(segment.end) +
                    "\n\n" + segment.prompt
                )
            ].join("");

            downloadText(
                "kessaci-plan-video.txt",
                content
            );

            $("status").textContent =
                "✅ Plan de production téléchargé.";
        });

        $("saveProject").addEventListener("click", () => {
            const description = $("prompt").value.trim();

            if (!description) {
                $("status").textContent =
                    "⚠️ Écris une description avant d'enregistrer.";
                return;
            }

            if (!preparedSegments.length) {
                const ready = prepareProject();
                if (!ready) return;
            }

            const projects = getProjects();

            const project = {
                id: Date.now(),
                title: $("projectTitle").value.trim() ||
                    "Projet sans titre",
                prompt: description,
                generatedPrompt: preparedPrompt,
                duration: Number($("duration").value),
                format: $("format").value,
                style: $("style").value,
                segments: preparedSegments,
                date: new Date().toLocaleDateString("fr-FR")
            };

            projects.push(project);

            if (setProjects(projects)) {
                $("status").textContent =
                    "✅ Projet enregistré sur ce téléphone.";
                showProjects();
            }
        });

        function showProjects() {
            const projects = getProjects();
            const list = $("projectList");

            list.innerHTML = "";

            if (!projects.length) {
                list.textContent = "Aucun projet enregistré.";
                return;
            }

            const fragment = document.createDocumentFragment();

            projects.forEach(project => {
                const card = document.createElement("article");
                const title = document.createElement("h3");
                const description = document.createElement("p");
                const details = document.createElement("p");
                const openButton = document.createElement("button");
                const removeButton = document.createElement("button");

                title.textContent = project.title;
                description.textContent = project.prompt;

                const duration = Number(project.duration) || 0;
                const count = Array.isArray(project.segments)
                    ? project.segments.length
                    : Math.ceil(duration / SEGMENT_SECONDS);

                details.textContent =
                    project.date + " · " +
                    formatDuration(duration) + " · " +
                    count + " séquences · Format " +
                    project.format;

                openButton.textContent = "📂 Ouvrir le projet";

                openButton.addEventListener("click", () => {
                    $("projectTitle").value = project.title;
                    $("prompt").value = project.prompt;
                    $("duration").value = String(duration);
                    $("format").value = project.format;
                    $("style").value = project.style;

                    preparedPrompt = project.generatedPrompt || "";
                    preparedSegments = Array.isArray(project.segments)
                        ? project.segments
                        : buildSegments(
                            project.prompt,
                            duration,
                            project.format,
                            project.style
                        );

                    $("generatedPrompt").value = preparedPrompt;
                    $("projectSummary").textContent =
                        "Durée : " + formatDuration(duration) +
                        " · " + preparedSegments.length +
                        " séquences.";

                    $("result").hidden = false;
                    renderSegments(preparedSegments);

                    $("status").textContent =
                        "✅ Projet chargé.";
                    window.scrollTo(0, 0);
                });

                removeButton.textContent = "🗑️ Supprimer";

                removeButton.addEventListener("click", () => {
                    const updated = getProjects().filter(
                        item => item.id !== project.id
                    );


                    if (setProjects(updated)) {
                        $("status").textContent =
                            "Projet supprimé.";
                        showProjects();
                    }
                });

                card.append(
                    title,
                    description,
                    details,
                    openButton,
                    removeButton
                );

                fragment.appendChild(card);
            });

            list.appendChild(fragment);
        }

        showProjects();
    }
}

                        $("status").textContent =
                            "Projet supprimé.";
                          showProjects();
                    }
                });

                card.append(
                    title,
                    description,
                    details,
                    openButton,
                    removeButton
                );

                fragment.appendChild(card);
            });

            list.appendChild(fragment);
        }

        showProjects();
    }
    }                      showPro
                                                showProjects();
                    }
                });

                card.append(
                    title,
                    description,
                    details,
                    openButton,
                    removeButton
                );

                fragment.appendChild(card);
            });

            list.appendChild(fragment);
        }

        showProjects();
                    }
                });

                card.append(
                    title,
                    description,
                    details,
                    openButton,
                    removeButton
                );

                fragment.appendChild(card);
            });

            list.appendChild(fragment);
        }

        showProjects();
    }
}
    }
}

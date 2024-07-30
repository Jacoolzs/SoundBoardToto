document.addEventListener('DOMContentLoaded', function() {
    const addSoundButton = document.getElementById('add-sound');
    const modal = document.getElementById('modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const saveSoundButton = document.getElementById('save-sound');
    const soundBoard = document.getElementById('soundboard');
    const searchInput = document.getElementById('search-sound');
    
    // Sonidos predefinidos
    const predefinedSounds = [
        { name: 'Among us roll reveal earrape', url: 'sounds/Among us roll reveal earrape.mp3' },
        { name: 'Aww Sound Effect', url: 'sounds/Aww Sound Effect.mp3' },
        { name: 'Bing bing bang!!', url: 'sounds/Bing bing bang.mp3' },
        { name: 'bromita sonido', url: 'sounds/bromita sonido.mp3' },
        { name: 'Cancion del gta 4', url: 'sounds/Cancion del gta 4.mp3' },
        { name: 'cartoon running sound effect', url: 'sounds/cartoon running sound effect.mp3' },
        { name: 'Diarrea - efecto de sonido (shitpost)', url: 'sounds/Diarrea - efecto de sonido (shitpost).mp3' },
        { name: 'Discord Connect', url: 'sounds/Discord Connect.mp3' },
        { name: 'Discord Desconectarse', url: 'sounds/Discord Desconectarse.mp3' },
        { name: 'Discord Notificación', url: 'sounds/Discord Notificación.mp3' },
        { name: 'Efecto de sonido escribiendo en teclado pc', url: 'sounds/Efecto de sonido escribiendo en teclado pc.mp3' },
        { name: 'EGreat Grey Wolf Sif Dark Souls', url: 'sounds/EGreat Grey Wolf Sif Dark Souls.mp3' },
        { name: 'Empanadas', url: 'sounds/Empanadas.mp3' },
        { name: 'FNAF ambiente 1', url: 'sounds/FNAF ambiente 1.mp3' },
        { name: 'FNAF ambiente 2', url: 'sounds/FNAF ambiente 2.mp3' },
        { name: 'Gimme Gimme', url: 'sounds/Gimme Gimme (Tiene copyright).mp3' },
        { name: 'Hello Hello FNAF', url: 'sounds/Hello Hello FNAF.mp3' },
        { name: 'Impact sound shitpost', url: 'sounds/Impact sound shitpost.mp3' },
        { name: 'Jijija', url: 'sounds/Jijija.mp3' },
        { name: 'john roblox laugh full', url: 'sounds/john roblox laugh full.mp3' },
        { name: 'Kanye West - Wolves', url: 'sounds/Kanye West - Wolves (Tiene copyright).mp3' },
        { name: 'La Cumbia Del Tilin Remix', url: 'sounds/La Cumbia Del Tilin Remix.mp3' },
        { name: 'los voy a matar', url: 'sounds/los voy a matar.mp3' },
        { name: 'Microsoft Windows 95 sonido de inicio', url: 'sounds/Microsoft Windows 95 sonido de inicio.mp3' },
        { name: 'Microsoft Windows XP Error', url: 'sounds/Microsoft Windows XP Error.mp3' },
        { name: 'Minecraft Lever Sound Effect', url: 'sounds/Minecraft Lever Sound Effect.mp3' },
        { name: 'Moai sound', url: 'sounds/Moai sound.mp3' },
        { name: 'música perturbadora', url: 'sounds/música perturbadora.mp3' },
        { name: 'Mutahar laughing meme Indian guy', url: 'sounds/Mutahar laughing meme Indian guy.mp3' },
        { name: 'NOOO coscu', url: 'sounds/NOOO coscu.mp3' },
        { name: 'Old Spice Silbido - Efecto de sonido', url: 'sounds/Old Spice Silbido - Efecto de sonido.mp3' },
        { name: 'OMFG - Hello (audio pobre)', url: 'sounds/OMFG - Hello (audio pobre).mp3' },
        { name: 'Persona hablando con sonidos saturados', url: 'sounds/Persona hablando con sonidos saturados.mp3' },
        { name: 'Pop sound effect', url: 'sounds/Pop sound effect.mp3' },
        { name: 'Poppy Playtime Theme', url: 'sounds/Poppy Playtime Theme.mp3' },
        { name: 'Practice mode geometry dash', url: 'sounds/Practice mode geometry dash.mp3' },
        { name: 'que onda memomounstro estamos aquí reviviendo la grasa sonido', url: 'sounds/que onda memomounstro estamos aquí reviviendo la grasa sonido.mp3' },
        { name: 'QUIÉN COÑO ES FEDE', url: 'sounds/QUIÉN COÑO ES FEDE.mp3' },
        { name: 'Risa de ibai', url: 'sounds/Risa de ibai.mp3' },
        { name: 'Roblox - sonido perturbador', url: 'sounds/Roblox - sonido perturbador.mp3' },
        { name: 'Scream shitpost', url: 'sounds/Scream shitpost.mp3' },
        { name: 'shabada gooba like a meebo', url: 'sounds/shabada gooba like a meebo.mp3' },
        { name: 'Sonido de perturbación-incomodidad', url: 'sounds/Sonido de perturbación-incomodidad.mp3' },
        { name: 'SpongeBob Music Hawaiian', url: 'sounds/SpongeBob Music Hawaiian.mp3' },
        { name: 'Sr pelo Screaming', url: 'sounds/Sr pelo Screaming.mp3' },
        { name: 'Stone Grind Drag', url: 'sounds/Stone Grind Drag.mp3' },
        { name: 'Super mario world', url: 'sounds/Super mario world.mp3' },
        { name: 'Taca a Xereca pra Min', url: 'sounds/Taca a Xereca pra Min.mp3' },
        { name: 'wenamechainsama', url: 'sounds/wenamechainsama (Tiene copyright).mp3' },
        { name: 'Windows 11 Startup Sound', url: 'sounds/Windows 11 Startup Sound.mp3' }
    ];

    // Cargar sonidos del almacenamiento local si existen
    let userSounds = JSON.parse(localStorage.getItem('sounds')) || [];

    // Fusionar sonidos predefinidos y sonidos del usuario
    let sounds = [...predefinedSounds, ...userSounds];

    addSoundButton.onclick = function() {
        modal.style.display = 'block';
    }

    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    saveSoundButton.onclick = function() {
        const soundName = document.getElementById('sound-name').value;
        const soundFile = document.getElementById('sound-file').files[0];

        if (soundName && soundFile) {
            const soundUrl = URL.createObjectURL(soundFile);
            const newSound = { name: soundName, url: soundUrl };
            userSounds.push(newSound);
            localStorage.setItem('sounds', JSON.stringify(userSounds));
            sounds.push(newSound);
            renderSounds();
            modal.style.display = 'none';
        } else {
            alert('Por favor, completa todos los campos.');
        }
    }

    function renderSounds() {
        soundBoard.innerHTML = '';
        sounds.forEach((sound, index) => {
            const soundDiv = document.createElement('div');
            soundDiv.className = 'sound';
            soundDiv.innerHTML = `
                <p>${sound.name}</p>
                <audio src="${sound.url}" controls></audio>
                <button onclick="deleteSound(${index})">Eliminar</button>
            `;
            soundBoard.appendChild(soundDiv);
        });
    }

    window.deleteSound = function(index) {
        if (index < predefinedSounds.length) {
            // Si se intenta eliminar un sonido predefinido, no hacer nada
            return;
        }
        // Ajustar el índice para la matriz userSounds
        userSounds.splice(index - predefinedSounds.length, 1);
        localStorage.setItem('sounds', JSON.stringify(userSounds));
        sounds.splice(index, 1);
        renderSounds();
    }

    function filterSounds() {
        const query = searchInput.value.toLowerCase();
        const filteredSounds = sounds.filter(sound => sound.name.toLowerCase().includes(query));
        soundBoard.innerHTML = '';
        filteredSounds.forEach((sound, index) => {
            const soundDiv = document.createElement('div');
            soundDiv.className = 'sound';
            soundDiv.innerHTML = `
                <p>${sound.name}</p>
                <audio src="${sound.url}" controls></audio>
                <button onclick="deleteSound(${index})">Eliminar</button>
            `;
            soundBoard.appendChild(soundDiv);
        });
    }

    searchInput.addEventListener('input', filterSounds);

    renderSounds();
});

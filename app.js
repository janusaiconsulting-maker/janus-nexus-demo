// Janus Nexus MVP - Logic Core
const SUPABASE_URL = 'https://rrqsktuzvjviyoojvyth.supabase.co';
const SUPABASE_KEY = 'sb_publishable_CrS69GmgA8kWZbC2ul5v0Q_Et3BHV_s';

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

document.getElementById('saveBtn').addEventListener('click', async () => {
    const input = document.getElementById('ideaInput');
    const idea = input.value.trim();
    
    if (!idea) return;

    try {
        const { data, error } = await supabase
            .from('ideas')
            .insert([{ title: idea, status: 'New' }])
            .select();

        if (error) throw error;

        input.value = '';
        fetchIdeas();
        alert('¡Idea volada a la nube! ✨');
    } catch (err) {
        console.error(err);
        alert('Error al sincronizar con la nube.');
    }
});

async function fetchIdeas() {
    const list = document.getElementById('ideasList');
    try {
        const { data, error } = await supabase
            .from('ideas')
            .order('created_at', { ascending: false });

        if (error) throw error;

        list.innerHTML = data.length ? '' : '<p>Sin ideas aún.</p>';
        data.forEach(item => {
            const div = document.createElement('div');
            div.className = 'idea-item';
            div.innerHTML = `<strong>${item.title}</strong><br><small>${new Date(item.created_at).toLocaleString()}</small>`;
            list.appendChild(div);
        });
    } catch (err) {
        list.innerHTML = '<p>Error al cargar el cerebro.</p>';
    }
}

// Initial Load
fetchIdeas();

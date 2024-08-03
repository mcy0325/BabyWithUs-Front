document.getElementById('babyInfo').addEventListener('click', function() {
    toggleContent('yellow-info');
});

document.getElementById('momInfo').addEventListener('click', function() {
    toggleContent('pink-info');
});

document.getElementById('dadInfo').addEventListener('click', function() {
    toggleContent('blue-info');
});

function toggleContent(infoClass) {
    const infos = document.querySelectorAll('.info');
    infos.forEach(info => {
        if (info.classList.contains(infoClass)) {
            info.style.display = info.style.display === 'block' ? 'none' : 'block';
            info.classList.toggle('expanded');
        } else {
            info.style.display = 'none';
        }
    });
}

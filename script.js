const updateClock = () => {
    document.getElementById('clock').textContent = new Date().toLocaleTimeString();
};
setInterval(updateClock, 1000);
updateClock();

const updateDate = () => {
    document.getElementById('Date').textContent = new Date().toLocaleDateString();
};
setInterval(updateDate, 1000);
updateDate();


const clientId = '';

function fetchUnsplashBackground() {
    const unsplashUrl = `https://api.unsplash.com/photos/random?client_id=${clientId}&orientation=landscape`;

    fetch(unsplashUrl)
        .then(response => response.json())
        .then(data => {
            if (data && data.urls && data.urls.regular) {
                document.body.style.backgroundImage = `url('${data.urls.regular}')`;
            }
        })
        .catch(error => {
            console.error('Error fetching Unsplash image:', error);
            document.body.style.backgroundImage = `url('bg1.jfif')`;
        });
}

fetchUnsplashBackground();


let count = 0;
let topZ = 100;

function openWindow(title, path = 'about:blank') {
    count++;
    topZ++;

    let win = document.createElement('div');
    win.style.cssText = ` 
        position: absolute; 
        width: 500px; 
        height: 350px; 
        background: #fff; 
        border-radius: 8px; 
        box-shadow: 0 8px 24px rgba(0,0,0,0.3); 
        display: flex; 
        flex-direction: column; 
        overflow: hidden; 
        z-index: ${topZ}; 
        top: ${70 + (count % 6) * 20}px; 
        left: ${90 + (count % 6) * 20}px; 
    `;

    win.onmousedown = () => win.style.zIndex = ++topZ;

    win.innerHTML = ` 
        <div class="window-header" style="height: 38px; background: rgba(30, 30, 30, 0.95); border-bottom: 1px solid rgba(255, 255, 255, 0.08); display: flex; align-items: center; justify-content: space-between; padding: 0 14px; user-select: none; cursor: move; flex-shrink: 0; z-index: 2;"> 
            <div style="display: flex; gap: 8px; align-items: center;">
                <div class="close-btn" style="width: 12px; height: 12px; background: #ff5f56; border-radius: 50%; cursor: pointer; border: 0.5px solid rgba(0,0,0,0.2);"></div> 
                <div style="width: 12px; height: 12px; background: #ffbd2e; border-radius: 50%; border: 0.5px solid rgba(0,0,0,0.2);"></div> 
                <div style="width: 12px; height: 12px; background: #27c93f; border-radius: 50%; border: 0.5px solid rgba(0,0,0,0.2);"></div> 
            </div>
            <span style="font-size: 13px; font-weight: 500; color: #cccccc; letter-spacing: 0.3px; position: absolute; left: 50%; transform: translateX(-50%); font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">${title}</span> 
            <div style="width: 52px;"></div>
        </div> 
        <div style="flex: 1; position: relative;"> 
            <iframe src="${path}" style="width: 100%; height: 100%; border: none; background: #fff;"></iframe> 
        </div> 
    `;

    win.querySelector('.close-btn').onclick = (e) => {
        e.stopPropagation();
        win.remove();
    };

    let header = win.querySelector('.window-header');
    let iframe = win.querySelector('iframe');

    header.onmousedown = (e) => {
        if (e.target.classList.contains('close-btn') || (e.target.tagName === 'DIV' && e.target !== header && !e.target.hasAttribute('style'))) return;
        let shiftX = e.clientX - win.getBoundingClientRect().left;
        let shiftY = e.clientY - win.getBoundingClientRect().top;

        iframe.style.pointerEvents = 'none';

        function moveAt(pageX, pageY) {
            win.style.left = pageX - shiftX + 'px';
            win.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(e) {
            moveAt(e.pageX, e.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        document.onmouseup = () => {
            document.removeEventListener('mousemove', onMouseMove);
            document.onmouseup = null;
            iframe.style.pointerEvents = 'auto';
        };
    };

    document.body.appendChild(win);
}


function closeBadge() {
    const badge = document.getElementById('rating-reminder');
    if (badge) badge.style.display = 'none';
}
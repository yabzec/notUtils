const pupils = [document.getElementById('eye-left'), document.getElementById('eye-right')];
const eyelids = document.querySelectorAll('.eyelid');
let idleInterval = null;
let isMouseInside = true;

function setEyeSpeed(speed) {
    pupils.forEach(pupil => {
        if (pupil) pupil.style.transition = speed === 'none' ? 'none' : `transform ${speed}`;
    });
}

function trackMouse(e) {
    const updates = pupils.map(pupil => {
        if (!pupil) return null;

        const rect = pupil.parentElement.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - eyeCenterX;
        const deltaY = e.clientY - eyeCenterY;
        const angle = Math.atan2(deltaY, deltaX);
        const maxDistance = 8;

        const moveX = Math.cos(angle) * maxDistance;
        const moveY = Math.sin(angle) * maxDistance;

        return { pupil, x: moveX, y: moveY };
    });

    updates.forEach(update => {
        if (update) {
            update.pupil.style.transform = `translate(${update.x}px, ${update.y}px)`;
        }
    });
}

function lookAroundRandomly() {
    if (isMouseInside) return;

    const maxDistance = 7;
    const randomAngle = Math.random() * Math.PI * 2;
    const randomDist = Math.random() * maxDistance;
    const moveX = Math.cos(randomAngle) * randomDist;
    const moveY = Math.sin(randomAngle) * randomDist;

    let speed;
    if (Math.random() > 0.3) {
        speed = (Math.random() * 0.1 + 0.1).toFixed(2) + 's'; // Veloce
    } else {
        speed = (Math.random() * 0.4 + 0.4).toFixed(2) + 's'; // Lento
    }

    setEyeSpeed(speed);

    pupils.forEach(pupil => {
        if(!pupil) return;
        pupil.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });

    const nextMoveTime = Math.random() * 2000 + 500;
    idleInterval = setTimeout(lookAroundRandomly, nextMoveTime);
}

function blinkEyes() {
    eyelids.forEach(lid => lid.classList.add('closed'));

    setTimeout(() => {
        eyelids.forEach(lid => lid.classList.remove('closed'));
    }, 150);

    const nextBlinkTime = Math.random() * 4000 + 1000;
    setTimeout(blinkEyes, nextBlinkTime);
}

document.addEventListener('mousemove', (e) => {
    if (!isMouseInside) {
        isMouseInside = true;
        clearTimeout(idleInterval);
        setEyeSpeed('none');
    }
    trackMouse(e);
});

document.addEventListener('mouseleave', () => {
    isMouseInside = false;
    idleInterval = setTimeout(lookAroundRandomly, 1000);
});

document.addEventListener('mouseenter', () => {
    isMouseInside = true;
    clearTimeout(idleInterval);
    setEyeSpeed('none');
});

blinkEyes();
setEyeSpeed('none');

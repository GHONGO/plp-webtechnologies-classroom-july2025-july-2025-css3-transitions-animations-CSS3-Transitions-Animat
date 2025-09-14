// These variables are in the global scope and can be accessed from anywhere
const animationBoxes = document.querySelectorAll('.animation-box');
const interactiveBox = document.getElementById('interactive-box');
let animationState = {
    allAnimationsRunning: true,
    boxColors: ['#4cb5ae', '#4a6fa5', '#166088'] // Default colors
};

/**
 * Toggles animation play state for a specific element
 * @param {string} targetId - The ID of the animation card to toggle
 * @returns {boolean} - The new animation state (true for running, false for paused)
 */
function toggleAnimation(targetId) {
    const box = document.querySelector(`#${targetId} .animation-box`);
    const isPaused = box.classList.contains('paused');
    
    if (isPaused) {
        box.classList.remove('paused');
        box.classList.add('running');
        return true;
    } else {
        box.classList.remove('running');
        box.classList.add('paused');
        return false;
    }
}

/**
 * Changes the color of an animation box
 * @param {string} targetId - The ID of the animation card
 * @returns {string} - The new color applied to the box
 */
function changeColor(targetId) {
    const box = document.querySelector(`#${targetId} .animation-box`);
    const colors = ['#4cb5ae', '#ff6b6b', '#ffd166', '#06d6a0', '#118ab2'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    box.style.backgroundColor = randomColor;
    return randomColor;
}

/**
 * Applies a selected animation to the interactive box
 * @param {string} animationName - The name of the animation to apply
 * @returns {boolean} - Success status of the operation
 */
function applyBoxAnimation(animationName) {
    // First remove any existing animation classes
    const animationClasses = ['bounce', 'shake', 'flip', 'swing'];
    interactiveBox.classList.remove(...animationClasses);
    
    // Apply the new animation
    interactiveBox.classList.add(animationName);
    
    return true;
}

/**
 * Calculates total animation time based on duration and delay
 * @param {number} duration - Animation duration in milliseconds
 * @param {number} delay - Animation delay in milliseconds
 * @returns {number} - Total time in milliseconds
 */
function calculateTotalTime(duration, delay) {
    return duration + delay;
}

/**
 * Toggles all animations on the page
 * @param {boolean} shouldRun - Whether animations should run or be paused
 * @returns {boolean} - The new state of all animations
 */
function toggleAllAnimations(shouldRun) {
    animationBoxes.forEach(box => {
        if (shouldRun) {
            box.classList.remove('paused');
            box.classList.add('running');
        } else {
            box.classList.remove('running');
            box.classList.add('paused');
        }
    });
    
    animationState.allAnimationsRunning = shouldRun;
    return shouldRun;
}

/**
 * Resets all animations to their initial state
 * @returns {boolean} - Success status of the operation
 */
function resetAllAnimations() {
    animationBoxes.forEach(box => {
        box.classList.remove('paused', 'running');
        box.style.animation = '';
        box.style.backgroundColor = '';
    });
    
    interactiveBox.classList.remove('bounce', 'shake', 'flip', 'swing');
    animationState.allAnimationsRunning = true;
    
    return true;
}

// Add click event to all toggle buttons
document.querySelectorAll('.toggle-animation').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const newState = toggleAnimation(targetId);
        console.log(`Animation for ${targetId} is now ${newState ? 'running' : 'paused'}`);
    });
});

// Add click event to all color change buttons
document.querySelectorAll('.change-color').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const newColor = changeColor(targetId);
        console.log(`Changed color of ${targetId} to ${newColor}`);
    });
});

// Add click event to animation boxes for interactive effects
animationBoxes.forEach(box => {
    box.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
    });
});

// Control buttons for all animations
document.getElementById('start-all').addEventListener('click', function() {
    const newState = toggleAllAnimations(true);
    console.log(`All animations ${newState ? 'started' : 'paused'}`);
});

document.getElementById('stop-all').addEventListener('click', function() {
    const newState = toggleAllAnimations(false);
    console.log(`All animations ${newState ? 'started' : 'paused'}`);
});

document.getElementById('reset-all').addEventListener('click', function() {
    const success = resetAllAnimations();
    if (success) {
        console.log('All animations reset');
    }
});

// Interactive demo controls
document.getElementById('apply-animation').addEventListener('click', function() {
    const animationSelect = document.getElementById('animation-select');
    const selectedAnimation = animationSelect.value;
    const success = applyBoxAnimation(selectedAnimation);
    
    if (success) {
        console.log(`Applied ${selectedAnimation} animation to interactive box`);
    }
});

// Animation calculator
document.getElementById('calculate-timing').addEventListener('click', function() {
    const duration = parseInt(document.getElementById('duration-input').value) || 0;
    const delay = parseInt(document.getElementById('delay-input').value) || 0;
    const totalTime = calculateTotalTime(duration, delay);
    
    document.getElementById('timing-result').textContent = `Total time: ${totalTime}ms`;
    console.log(`Calculated total animation time: ${totalTime}ms`);
});

// Log initial state to console
console.log('Interactive Web Page initialized');
console.log('Global animation state:', animationState);
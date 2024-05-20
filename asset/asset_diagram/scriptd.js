const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let unit = 40; // Adjust unit distance
let points = []; // Array to store points
let colors = ['blue', 'green', 'red', 'orange', 'purple']; // Array of colors
let zoomFactor = 1; // Initial zoom factor

// Function to draw the complex number on canvas
function drawComplexNumber(complex, color = 'blue') {
    const x = Math.round(canvas.width / 2 + complex.real * unit * zoomFactor);
    const y = Math.round(canvas.height / 2 - complex.imag * unit * zoomFactor);

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    ctx.fillText(`${Math.round(complex.real)}, ${Math.round(complex.imag)}`, x + 5, y - 5);
}

// Function to add a complex number based on user input
function addComplexNumber() {
    const real = parseInt(document.getElementById('real').value);
    const imaginary = parseInt(document.getElementById('imaginary').value);
    const complex = { real, imag: imaginary };
    const color = colors[points.length % colors.length]; // Get color based on points length
    drawComplexNumber(complex, color);
    points.push(complex); // Add the point to the array
    if (points.length > 1) {
        drawLine(points[points.length - 2], points[points.length - 1]); // Draw line between last two points
    }
    document.getElementById('real').value = 0;
    document.getElementById('imaginary').value = 0;
}

// Function to draw a line between two points
function drawLine(start, end) {
    ctx.beginPath();
    const startX = Math.round(canvas.width / 2 + start.real * unit * zoomFactor);
    const startY = Math.round(canvas.height / 2 - start.imag * unit * zoomFactor);
    const endX = Math.round(canvas.width / 2 + end.real * unit * zoomFactor);
    const endY = Math.round(canvas.height / 2 - end.imag * unit * zoomFactor);
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = 'red'; // Line color
    ctx.stroke();
}

// Function to zoom out
function zoomOut() {
    zoomFactor *= 0.9; // Reduce zoom factor
    redraw();
}

// Function to zoom in
function zoomIn() {
    zoomFactor /= 0.9; // Increase zoom factor
    redraw();
}

// Function to redraw the diagram
function redraw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawAxes();
    points.forEach((point, index) => {
        const color = colors[index % colors.length];
        drawComplexNumber(point, color);
    });
    for (let i = 0; i < points.length - 1; i++) {
        drawLine(points[i], points[i + 1]);
    }
}

// Draw axes and labels
function drawAxes() {
    // Draw x-axis
    ctx.beginPath();
    ctx.moveTo(0, Math.round(canvas.height / 2));
    ctx.lineTo(canvas.width, Math.round(canvas.height / 2));
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.fillStyle = 'black';
    ctx.font = '12px Arial';
    for (let i = 1; i * unit * zoomFactor < canvas.width / 2; i++) {
        ctx.fillText(i, Math.round(canvas.width / 2 + i * unit * zoomFactor), Math.round(canvas.height / 2 + 12));
        ctx.fillText(-i, Math.round(canvas.width / 2 - i * unit * zoomFactor), Math.round(canvas.height / 2 + 12));
    }
    // Draw y-axis
    ctx.beginPath();
    ctx.moveTo(Math.round(canvas.width / 2), 0);
    ctx.lineTo(Math.round(canvas.width / 2), canvas.height);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    for (let i = 1; i * unit * zoomFactor < canvas.height / 2; i++) {
        ctx.fillText(i, Math.round(canvas.width / 2 + 5), Math.round(canvas.height / 2 - i * unit * zoomFactor));
        ctx.fillText(-i, Math.round(canvas.width / 2 + 5), Math.round(canvas.height / 2 + i * unit * zoomFactor));
    }
}

// Initial draw
drawAxes();

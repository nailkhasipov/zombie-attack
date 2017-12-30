const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth * 2;
canvas.height = window.innerHeight * 2;
canvas.style.width = window.innerWidth + 'px';
canvas.style.height = window.innerHeight + 'px';
canvas.getContext('2d').scale(2,2);

const ctx = canvas.getContext('2d');

export {canvas, ctx};
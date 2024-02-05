---
layout: main
---

<script src='/-/ocanvas-2.9.1.js'></script>

<div class='position-fixed top-0 start-0 vh-100 vw-100 z-0'>
    <canvas id='particle_space'>
    </canvas>
</div>

<script>
// settings & swarm parameters
p = [
    ['point speed', [1, 1000, 300]], // <-- min, max, default
    ['point focus', [1, 20, 7]], 
    ['point momentum', [.001, 1, .7]],
    ['social pressure', [.00001, .2, .01]],
    ['noise', [1, 30, 10]],
]

s = {
    'num_nodes': 150,
    'node_size': 4,
    'node_fill_color': 'rgba(255,255,255,.8)',
    // 'canvas_background': '#ececec'
    'point speed': p[0][1][2],
    'point focus': p[1][1][2],
    'point momentum': p[2][1][2],
    'social pressure': p[3][1][2],
    'noise': p[4][1][2],
};

const arrMean = arr => arr.reduce((a,b) => a + b, 0) / arr.length

// __Initial Setup__
var canvas = document.getElementById('particle_space');
// canvas.width  = window.innerWidth;
// canvas.height = window.innerHeight; 

var ctx = canvas.getContext('2d');
ctx.lineWidth = 2;
ctx.canvas.width  = window.innerWidth;
ctx.canvas.height = window.innerHeight;

o_canvas = oCanvas.create({
  canvas: "#particle_space",
  background: s['canvas_background'],
});

build()

x = window.innerWidth / 2
y = window.innerHeight / 2

// this is where the mathgic happens
function update_node_loc(nodes) {
  for (let n in nodes) {

    momentums_x[n] = .5 * (x - nodes[n].x) * Math.exp(s['point focus'] * -Math.abs(Math.sqrt((x - nodes[n].x)**2 + (y - nodes[n].y)**2))/s['point speed']) + (s['point momentum'] * momentums_x[n]) + (s['social pressure'] * (x - arrMean(node_positions_x)))// + (.0075 * (node_positions_x[n] - arrMean(node_positions_x)))
    momentums_y[n] = .5 * (y - nodes[n].y) * Math.exp(s['point focus'] * -Math.abs(Math.sqrt((x - nodes[n].x)**2 + (y - nodes[n].y)**2))/s['point speed']) + (s['point momentum'] * momentums_y[n]) + (s['social pressure'] * (y - arrMean(node_positions_y)))// + (.0075 * (node_positions_y[n] - arrMean(node_positions_y)))
    // i wonder what "social momentum" would look like (beyond just individual point momentum)

    node_positions_x[n] = node_positions_x[n] + momentums_x[n] + (Math.random() * s['noise']) - (Math.random() * s['noise'])
    node_positions_y[n] = node_positions_y[n] + momentums_y[n] + (Math.random() * s['noise']) - (Math.random() * s['noise'])

    nodes[n].x = node_positions_x[n]
    nodes[n].y = node_positions_y[n]

  }
  o_canvas.redraw()
}

// this is a fun add on
function scatter(nodes) {
  for (let n in nodes) {
    node_positions_x[n] =  node_positions_x[n] + (Math.random() * 100) - (Math.random() * 100)
    node_positions_y[n] =  node_positions_y[n] + (Math.random() * 100) - (Math.random() * 100)
    
    nodes[n].x = node_positions_x[n] 
    nodes[n].y = node_positions_y[n] 
  }
  o_canvas.redraw()
}


// update stuff
window.setInterval(function(){ // <-- from: https://stackoverflow.com/questions/2170923/whats-the-easiest-way-to-call-a-function-every-5-seconds-in-jquery
  update_node_loc(nodes)
}, 50)

o_canvas.bind("click tap", function () {
  scatter(nodes);
});

o_canvas.bind("touchmove tap", function () {
  x = o_canvas.touch.x
  y = o_canvas.touch.y
})

document.addEventListener('mousemove', function (event) {
  x = event.clientX;
  y = event.clientY;
});


function resize_ocanvas() {
  o_canvas.width = window.innerWidth;
  o_canvas.height = window.innerHeight;
};

window.addEventListener('resize', resize_ocanvas, false);

function build() {

  nodes = []
  momentums_x = []
  momentums_y = []
  node_positions_x = []
  node_positions_y = []
  for (i=0; i < s['num_nodes']; i++) {
    pos_x = window.innerWidth / 2 + Math.random() * 600 - Math.random() * 600
    pos_y = window.innerHeight / 2 + Math.random() * 600 - Math.random() * 600

    var node = o_canvas.display.arc({
      x: pos_x,
      y: pos_y,
      radius: s['node_size'],
      start: 360,
      fill: s['node_fill_color'],
    })

    nodes = [...nodes, node] // <-- add node to nodes list
    node_positions_x = [...node_positions_x, pos_x]
    node_positions_y = [...node_positions_y, pos_y]

    momentums_x = [...momentums_x, 0]
    momentums_y = [...momentums_y, 0]
    o_canvas.addChild(node);
  }
}

function destroy() {
  for (node of nodes) {
    o_canvas.removeChild(node)
  }
}
</script>

<!-- settings panel -->
<button class="btn bg-transparent position-fixed top-0 end-0 z-3 m-3" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasSwarmControls" aria-controls="offcanvasSwarmControls">
    <i class="bi bi-sliders text-white fs-3 rounded-3 p-3 hovercard"></i>
</button>
<div class="offcanvas offcanvas-end bg-dark text-white h-100" style='--bs-bg-opacity: .5; min-width: 300px' tabindex="-1" id="offcanvasSwarmControls" aria-labelledby="offcanvasSwarmControlsLabel" data-bs-scroll="true">
    <div class="offcanvas-header">
        <button type="button" class="btn-close btn-close-white ms-auto p-4" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body pb-4 col-12 col-md-10 mx-auto h-100 overflow-y-auto">
        <div class='w-100 d-flex flex-column px-3 justify-content-center' id='offcanvasSwarmControlsPanel'>
            <div id='resetButton' class='btn bg-dark text-white rounded-3 mx-3 mb-5'>reset swarm</div>
            <!-- settings go here -->
        </div>
        <div class='px-2 w-100 text-left py-4'>Built using the very useful <a href='https://ocanvas.org/' target='blank'>oCanvas</a> library</div>
    </div>
</div>

<script>
// settings panel
const panelContainer = document.getElementById('offcanvasSwarmControlsPanel');

// Settings Sliders:
document.getElementById('resetButton').onclick = function () {
  destroy()
  build()
}


// add sliders
for (param of p) {
    paramDiv = document.createElement('div')
    paramDiv.classList.add('mx-auto')

    label = document.createElement('p')
    label.innerHTML = param[0]
    label.classList.add('mt-3')
    paramDiv.appendChild(label)

    slider = document.createElement('input')
    slider.type = 'range'
    slider.min = param[1][0]
    slider.max = param[1][1]
    slider.value = s[param[0]]
    slider.step = (param[1][1] - param[1][0]) / 100
    slider.parameterID = param[0]
    slider.oninput = function () {
        s[this.parameterID] = this.value
    }
    slider.classList.add('mb-3')
    paramDiv.appendChild(slider)

    panelContainer.appendChild(paramDiv)
}

</script>






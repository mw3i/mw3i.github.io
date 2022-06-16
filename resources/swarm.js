
function swarm() {

    htmlcanvas = document.createElement('canvas')
    htmlcanvas.id = 'particle_space'
    htmlcanvas.style = 'position:absolute; left:0px; top:10px;'
    document.body.appendChild(htmlcanvas)

    // settings & swarm parameters
    p = [
        ['point speed', [1, 1000, 500]], // <-- min, max, default
        ['point focus', [1, 20, 7]], 
        ['point momentum', [.001, 1, .1]],
        ['social pressure', [.001, .2, .01]],
        ['noise', [1, 30, 10]],
    ]

    s = {
        'num_nodes': 100,
        'node_size': 5,
        'node_fill_color': 'rgba(0,0,0,.5)',
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
    ctx.canvas.width  = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight - 20;

    var o_canvas = oCanvas.create({
      canvas: "#particle_space",
      background: s['canvas_background'],
    });

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

    o_canvas.bind("mousemove", function () {
      x = o_canvas.mouse.x
      y = o_canvas.mouse.y
    })


    function resize_ocanvas() {
      o_canvas.width = window.innerWidth - 20;
      o_canvas.height = window.innerHeight - 20;
    };

    window.addEventListener('resize', resize_ocanvas, false);


    // Settings Sliders:
    settingsparent = document.createElement('div')
    settingsparent.id = 'settingsparent'
    settingsparent.style = 'background-color: rgba(200,200,200,0); text-align: center; margin: 0px; width: auto; height: 100%; position: absolute; right: 0px; top: 0px; display: flex; align-items: center;'


    opensettings = document.createElement('button')
    opensettings.onclick = function () {
      let sd = document.getElementById('settingsdiv')
      if (sd.style.display == 'none') {
        sd.style.display = 'block'
      } else if (sd.style.display == 'block') {
        sd.style.display = 'none'
      }
      console.log('pressed')
    }
    opensettings.style = 'margin-right: 20px; font-size: 30px; color: white; font-weight: bold; white; background: black; outline: none; border-width: 0px;  border-radius: 100%; width: 60px; height: 60px;'
    opensettings.innerHTML = '<'
    settingsparent.appendChild(opensettings)

    settingsdiv = document.createElement('div')
    settingsdiv.id = 'settingsdiv'
    settingsdiv.style = 'background-color: rgba(0,0,0,.1); text-align: center; margin: 0px; width: 20vw; height: 100%; right: 0px; top: 0px; overflow: scroll; display: none; transition: opacity 1s ease-out;'

    for (param of p) {
        label = document.createElement('p')
        label.innerHTML = param[0]
        if (param == p[0]) {label.style = 'padding-top: 35%;'} else {label.style = 'padding-top: 15%;'}
        settingsdiv.appendChild(label)

        slider = document.createElement('input')
        slider.type = 'range'
        slider.min = param[1][0]
        slider.max = param[1][1]
        slider.value = s[param[0]]
        console.log(s[param[0]])
        slider.step = (param[1][1] - param[1][0]) / 100
        slider.parameterID = param[0]
        slider.oninput = function () {
            s[this.parameterID] = this.value
        }
        settingsdiv.appendChild(slider)

    }
    settingsparent.appendChild(settingsdiv)

    document.body.appendChild(settingsparent)

}

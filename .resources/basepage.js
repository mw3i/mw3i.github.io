
function basepage(title, preamble, links) {

    // create sidebox
    sidebox = document.createElement('div')
    sidebox.id = 'sidebox'
    sidebox.style = 'background-color: rgba(200,200,200,0); text-align: center; margin: 0px; width: 20vw; height: auto; position: absolute;'


    // add text to sidebox
    sidebox.innerHTML += '<h1>' + title + '</h1>'
    sidebox.innerHTML += '<p>' + preamble + '</p>'


    document.body.appendChild(sidebox)

    // create bottombox
    bottombox = document.createElement('div')
    bottombox.id = 'bottombox'
    bottombox.style = 'background-color: rgba(0,0,0,0); text-align: center; margin: 0px; width: 95vw; height: 8vh; bottom: 8vh; position: absolute;'


    for (l of links) {
      lnkref = document.createElement('a')
      lnkref.href = l[1]
      lnk = document.createElement('div')
      lnk.style = 'background-color: rgba(0,0,0,0); margin: 0px; text-align: center; width: auto; height: auto; padding: 20px; bottom: 0px;  float: left;'
      lnk.onmouseover = function () {this.style.backgroundColor = 'rgba(0,0,0,.2)'}
      lnk.onmouseout = function () {this.style.backgroundColor = 'rgba(0,0,0,0)'}
      lnk.innerHTML = '<p style="vertical-align: middle;"><a style = "color: rgba(0,0,0,.7); ; font-size: 25px; font-weight: bold;">' + l[0] + '</a></p>'
      lnkref.appendChild(lnk)
      bottombox.appendChild(lnkref)
    }

    for (l of [['home', 'https://mwetzel7r.github.io'],['cv', '.resources/cv.html'],['github','https://github.com/mwetzel7r']].reverse()) {
      lnkref = document.createElement('a')
      lnkref.href = l[1]
      lnk = document.createElement('div')
      lnk.style = 'background-color: rgba(0,0,0,0); margin: 0px; text-align: center; width: auto; height: auto; padding: 20px; bottom: 0px;  float: right;'
      lnk.onmouseover = function () {this.style.backgroundColor = 'rgba(0,0,0,.2)'}
      lnk.onmouseout = function () {this.style.backgroundColor = 'rgba(0,0,0,0)'}
      lnk.innerHTML = '<p style="vertical-align: middle;"><a style = "color: rgba(0,0,0,.7); ; font-size: 25px; font-weight: bold;">' + l[0] + '</a></p>'
      lnkref.appendChild(lnk)
      bottombox.appendChild(lnkref)
    }

    document.body.appendChild(bottombox)










    // htmlcanvas = document.createElement('canvas')
    // htmlcanvas.id = 'nodenavigator'
    // htmlcanvas.style = 'position: absolute; right: 0; margin: 10px;'
    // document.body.appendChild(htmlcanvas)

    // var ctx = htmlcanvas.getContext('2d');
    // ctx.canvas.width  = window.innerWidth * .8;
    // ctx.canvas.height = window.innerHeight * .9;



    // // __Initial Setup__
    // var space = oCanvas.create({
    //   canvas: "#nodenavigator",
    //   background: 'rgba(50,0,200,.3)',
    // });
    // w = space.width
    // h = space.height

    // coords = [0,0]
    // nodes = []
    // for (l of links) {
    //   let node = {
    //     obj: space.display.ellipse({
    //       origin: {x: 'center', y: 'center'},
    //       align: 'center',
    //       radius: 50,
    //       start: 360,
    //       fill: 'rgba(0,0,0,.4)',
    //     }),
    //     set_coords: function () {
    //       this.obj.x = w/2 + coords[0]
    //       this.obj.y = h/2 + coords[1]
    //     }
    //   }
    //   node.set_coords() 

    //   node.obj.addChild(
    //     space.display.text({
    //         x: 0,
    //         y: 0,
    //         origin: {x: 'center', y: 'center'},
    //         text: l[0],
    //         fill: 'rgb(255,255,255)',
    //     })
    //   )

    //   node.obj.bind('click tap', function () {
    //     window.location = l[1]
    //   })

    //   node.obj.bind('mouseenter', function () {
    //     node.obj.fill = 'rgba(0,0,0,.7)'
    //     space.redraw()
    //   })

    //   node.obj.bind('mouseleave', function () {
    //     node.obj.fill = 'rgba(0,0,0,.4)'
    //     space.redraw()
    //   })

    //   space.addChild(node.obj)
    //   nodes.push(node)

    //   coords[0] += 100
    //   coords[1] += 100
    // }



    // window.addEventListener('resize', function () {
    //     space.width = window.innerWidth * .8;
    //     space.height = window.innerHeight * .9;
    //     for (n of nodes) {
    //       n.set_coords()
    //     }
    // })




}
require=function s(c,r,a){function l(o,e){if(!r[o]){if(!c[o]){var t="function"==typeof require&&require;if(!e&&t)return t(o,!0);if(h)return h(o,!0);var i=new Error("Cannot find module '"+o+"'");throw i.code="MODULE_NOT_FOUND",i}var n=r[o]={exports:{}};c[o][0].call(n.exports,function(e){var t=c[o][1][e];return l(t||e)},n,n.exports,s,c,r,a)}return r[o].exports}for(var h="function"==typeof require&&require,e=0;e<a.length;e++)l(a[e]);return l}({Bullet:[function(e,t,o){"use strict";cc._RF.push(t,"bd07dWfWENEjasZeb5tvq5z","Bullet"),cc.Class({extends:cc.Component,properties:{speed:2e3,targetX:0,targetY:0,idBullet:0,shooter:{default:null,type:cc.Node},damage:0},onLoad:function(){},onCollisionEnter:function(e,t){"Kit"!=e.node.name&&"Ammo"!=e.node.name&&this.node.destroy()},update:function(e){var t=Math.atan2(this.targetX,this.targetY);this.node.x+=this.speed*e*Math.sin(t),this.node.y+=this.speed*e*Math.cos(t)}}),cc._RF.pop()},{}],CameraControl:[function(e,t,o){"use strict";cc._RF.push(t,"25fa9oEi19GRoWsA924p5dD","CameraControl"),cc.Class({extends:cc.Component,properties:{target:{default:null,type:cc.Node},camera:cc.Camera,anim:cc.Animation,jumpZoom:!1,centerAtStart:!1,smoothFollow:!1,followX:{default:0,visible:function(){return this.smoothFollow}},followY:{default:0,visible:function(){return this.smoothFollow}},minFollowDist:{default:0,visible:function(){return this.smoothFollow}},followRatio:{default:0,visible:function(){return this.smoothFollow}},overview:!1,overviewTargets:{default:[],type:[cc.Node],visible:function(){return this.overview}},overviewMargin:{default:0,visible:function(){return this.overview}},speedZoom:!1,zoomInSpeed:{default:0,visible:function(){return this.speedZoom}},zoomOutSpeed:{default:0,visible:function(){return this.speedZoom}},canShake:!1,shakeDuration:{default:0,visible:function(){return this.canShake}},pointerPan:!1,pointerXMult:{default:0,visible:function(){return this.pointerPan}},pointerYMult:{default:0,visible:function(){return this.pointerPan}},useBoundaries:!1,topBound:{default:0,visible:function(){return this.useBoundaries}},bottomBound:{default:0,visible:function(){return this.useBoundaries}},leftBound:{default:0,visible:function(){return this.useBoundaries}},rightBound:{default:0,visible:function(){return this.useBoundaries}}},onLoad:function(){this.startFollow=!1;var e=cc.find("Canvas").getComponent(cc.Canvas);this.visibleSize=cc.view.getVisibleSize(),this.initZoomRatio=this.camera.zoomRatio,this.previousPos=this.node.position,this.pointerPan&&(this.overview=!1,this.speedZoom=!1,e.node.on("mousemove",this.onMouseMove,this),e.node.on("touchmove",this.onTouchMove,this),this.pointerPos=null),this.overview&&(this.jumpZoom=!1,this.speedZoom=!1),this.speedZoom&&(this.jumpZoom=!1)},onEnable:function(){cc.director.getPhysicsManager().attachDebugDrawToCamera(this.camera)},onDisable:function(){cc.director.getPhysicsManager().detachDebugDrawFromCamera(this.camera)},lateUpdate:function(e){var t=void 0;t=(this.overview,this.target.position),this.smoothFollow?((Math.abs(t.x-this.node.x)>=this.followX||Math.abs(t.y-this.node.y)>=this.followY)&&(this.startFollow=!0),this.startFollow&&(this.node.position=this.node.position.lerp(t,this.followRatio),cc.pDistance(t,this.node.position)<=this.minFollowDist&&(this.startFollow=!1))):this.node.position=t,this.previousPos=t},getOverviewTargetsMidpoint:function(){for(var e=cc.p(0,0),t=99999,o=99999,i=-99999,n=-99999,s=0;s<this.overviewTargets.length;++s){var c=this.overviewTargets[s];i=c.x>i?c.x:i,t=c.x<t?c.x:t,n=c.y>n?c.y:n,o=c.y<o?c.y:o}i+=this.overviewMargin,t-=this.overviewMargin,n+=this.overviewMargin,o-=this.overviewMargin;var r=Math.abs(i-t),a=Math.abs(n-o);e=cc.p(t+r/2,o+a/2);var l=Math.max(r/this.visibleSize.width,a/this.visibleSize.height);return this.camera.zoomRatio=1/l,e},shakeCamera:function(){this.canShake&&(this.anim.play("shake"),this.scheduleOnce(this.stopShake.bind(this),this.shakeDuration))},stopShake:function(){this.anim.stop(),this.camera.node.position=cc.p(0,0)},onMouseMove:function(e){this.pointerPos=e.getLocation()},onTouchMove:function(e){this.pointerPos=e.getLocation()}}),cc._RF.pop()},{}],HeroControl:[function(e,t,o){"use strict";cc._RF.push(t,"f71dcKFhDRAspNw3w6SBhQq","HeroControl");var i=e("./StompHandler.js"),n=e("./RestController.js");cc.Class({extends:cc.Component,properties:{speed:cc.v2(0,0),maxSpeed:cc.v2(400,400),drag:1e3,direction:0,directiony:0,jumpSpeed:0,health:0,ammo:0,bullet:{default:null,type:cc.Node},loadedPlayers:{default:[],type:[cc.Node]},healthBar:{default:null,type:cc.ProgressBar},ammoBar:{default:null,type:cc.Label},usernameLabel:{default:null,type:cc.Label},muerte:{default:null,type:cc.Node}},onLoad:function(){this.room=cc.find("form").getComponent("MenuController").room,this.username=cc.find("form").getComponent("MenuController").username,this.id=cc.find("form").getComponent("MenuController").id,this.isDead=!1,this.health=100,this.ammo=100,this.stompClient=null,this.pi=3.141516,this.players=null,this.usernameLabel.string=this.username,cc.director.getCollisionManager().enabled=!0,cc.director.getCollisionManager().enabledDebugDraw=!1,cc.find("Camera").on(cc.Node.EventType.TOUCH_START,this.onTouchBegan,this),this.position=this.node.position,this.rotation=this.node.rotation,this.addBullet=this.addBulletToScene,this.connectAndSubscribe(),cc.eventManager.addListener({event:cc.EventListener.KEYBOARD,onKeyPressed:this.onKeyPressed.bind(this),onKeyReleased:this.onKeyReleased.bind(this)},this.node),cc.eventManager.addListener({event:cc.EventListener.MOUSE,onMouseMove:this.onMouseMove.bind(this)},this.node),this.collisionX=0,this.collisionY=0,this.prePosition=cc.v2(),this.preStep=cc.v2(),this.touchingNumber=0,this.loadAllPlayers()},onEnable:function(){cc.director.getCollisionManager().enabled=!0,cc.director.getCollisionManager().enabledDebugDraw=!1},onDisable:function(){cc.director.getCollisionManager().enabled=!1,cc.director.getCollisionManager().enabledDebugDraw=!1},onKeyPressed:function(e,t){if(!this.isDead)switch(e){case cc.KEY.a:case cc.KEY.left:this.direction=-1;break;case cc.KEY.d:case cc.KEY.right:this.direction=1;break;case cc.KEY.w:case cc.KEY.up:this.directiony=1;break;case cc.KEY.s:case cc.KEY.down:this.directiony=-1}},onKeyReleased:function(e,t){switch(e){case cc.KEY.a:case cc.KEY.left:case cc.KEY.d:case cc.KEY.right:this.direction=0;break;case cc.KEY.w:case cc.KEY.up:case cc.KEY.s:case cc.KEY.down:this.directiony=0}},onMouseMove:function(e){var t=Math.floor(e.getLocationX()),o=Math.floor(e.getLocationY()),i={x:t-this.node.position.x,y:o-this.node.position.y},n=Math.atan2(i.x,i.y);this.node.rotation=n*(180/this.pi)},onCollisionEnter:function(e,t){if("Bullet"==e.node.name)this.onShootBegan(e),this.node.color=cc.Color.RED;else if("Wall"==e.node.name||"p2"==e.node.name){this.touchingNumber++;var o=e.world.aabb,i=e.world.preAabb.clone(),n=t.world.aabb,s=t.world.preAabb.clone();s.x=n.x,i.x=o.x,console.log("col"),cc.Intersection.rectRect(s,i)&&(s.xMax>i.xMax?this.collisionX=-1:s.xMin<i.xMin&&(this.collisionX=1),e.touchingX=!0),s.y=n.y,i.y=o.y,cc.Intersection.rectRect(s,i)&&(s.yMax>i.yMax?this.collisionY=-1:s.yMin<i.yMin&&(this.collisionY=1),e.touchingY=!0)}else"Kit"==e.node.name?(70<=this.health?this.health=100:this.health+=50,this.healthBar.progress=this.health/100):"Ammo"==e.node.name?(this.ammo+=15,this.ammoBar.string=this.ammo):"Death"==e.node.name&&(this.ammo+=30,this.ammoBar.string=this.ammo,this.health+=40,this.healthBar.progress=this.health/100);this.node.color=cc.Color.WHITE},onCollisionExit:function(e){this.touchingNumber--,0===this.touchingNumber&&(this.node.color=cc.Color.WHITE),e.touchingX&&(this.collisionX=0,e.touchingX=!1),e.touchingY&&(e.touchingY=!1,this.collisionY=0)},update:function(e){0===this.direction?0<this.speed.x?(this.speed.x-=this.drag*e,this.speed.x<=0&&(this.speed.x=0)):this.speed.x<0&&(this.speed.x+=this.drag*e,0<=this.speed.x&&(this.speed.x=0)):(this.speed.x+=(0<this.direction?1:-1)*this.drag*e,Math.abs(this.speed.x)>this.maxSpeed.x&&(this.speed.x=0<this.speed.x?this.maxSpeed.x:-this.maxSpeed.x)),0===this.directiony?0<this.speed.y?(this.speed.y-=this.drag*e,this.speed.y<=0&&(this.speed.y=0)):this.speed.y<0&&(this.speed.y+=this.drag*e,0<=this.speed.y&&(this.speed.y=0)):(this.speed.y+=(0<this.directiony?1:-1)*this.drag*e,Math.abs(this.speed.y)>this.maxSpeed.y&&(this.speed.y=0<this.speed.y?this.maxSpeed.y:-this.maxSpeed.y)),0===this.speed.y&&0===this.speed.x||this.stompClient.send("/app/movement/"+this.room,{},JSON.stringify({id:this.id,position:this.node.position,rotation:this.node.rotation})),this.collisionY<0?0<this.speed.y&&(this.node.y+=this.speed.y*e):0<this.collisionY?this.speed.y<0&&(this.node.y+=this.speed.y*e):this.node.y+=this.speed.y*e,this.collisionX<0?0<this.speed.x&&(this.node.x+=this.speed.x*e):0<this.collisionX?this.speed.x<0&&(this.node.x+=this.speed.x*e):this.node.x+=this.speed.x*e},onTouchBegan:function(e){if(!this.isDead&&0<this.ammo){var t=e.touch.getLocation();this.stompClient.send("/app/newshot/"+this.room,{},JSON.stringify({idShooter:this.id,touchLocX:t.x,touchLocY:t.y,position:this.node.position})),this.ammo-=1,this.ammoBar.string=this.ammo}},onShootBegan:function(e){var t=this;this.health-=20,this.healthBar.progress=this.health/100;var o=e.node.getComponent("Bullet").idBullet;this.health<=0&&axios.put("/rooms/"+this.room+"/players/remove",{id:o}).then(function(){axios.get("/rooms/"+t.room+"/players").then(function(e){1==e.data.length&&t.stompClient.send("/app/winner/"+t.room,{},JSON.stringify({id:o}))}),t.stompClient.send("/app/newdeath/"+t.room,{},JSON.stringify({id:o}))}).catch(function(e){console.log(e)}),this.node.color=cc.Color.WHITE},die:function(){alert("You have died!"),this.isDead=!0,this.node.active=!1,cc.game.removePersistRootNode(cc.find("form")),cc.director.loadScene("menu",function(){console.log(cc.find("Player"))})},addBulletToScene:function(e,t,o){var i=e.touchLocX-e.position.x,n=e.touchLocY-e.position.y,s=Math.abs(i)+Math.abs(n),c=i/s,r=n/s,a=cc.director.getScene();(t=cc.instantiate(t)).x=e.position.x+110*c,t.y=e.position.y+110*r,t.getComponent("Bullet").targetX=i,t.getComponent("Bullet").targetY=n,t.getComponent("Bullet").idBullet=o,a.addChild(t),t.active=!0},registerInServer:function(){},connectAndSubscribe:function(){var o=this;(0,i.getStompClient)().then(function(e){o.stompClient=e,(0,i.subscribeTopic)(o.stompClient,"/topic/room-movement-"+o.room,function(e){var t=JSON.parse(e.body);o.loadedPlayers.forEach(function(e){t.id==e.id&&e.id!=o.id&&(e.position=t.position,e.rotation=t.rotation)})}),(0,i.subscribeTopic)(o.stompClient,"/topic/room-newshot-"+o.room,function(e){var t=JSON.parse(e.body);o.addBullet(t,o.bullet,o.id),console.log("bullet new shot")}),(0,i.subscribeTopic)(o.stompClient,"/topic/room-newdeath-"+o.room,function(e){var t=JSON.parse(e.body);t.id!=o.id?o.deletePlayer(t.id):o.die()}),(0,i.subscribeTopic)(o.stompClient,"/topic/room-winner-"+o.room,function(e){var t=JSON.parse(e.body);t.id!=o.id&&o.noticeWinner(t.id)})})},noticeWinner:function(e){alert("YOU HAVE WON"),this.node.active=!1,cc.game.removePersistRootNode(cc.find("form")),axios.delete("/rooms/"+this.room).then(function(){cc.director.loadScene("menu",function(){console.log("ya")})})},deletePlayer:function(t){var o=cc.instantiate(this.muerte);this.loadedPlayers=this.loadedPlayers.filter(function(e){return e.id==t&&(o.x=e.x,o.y=e.y,e.id==t&&e.destroy()),e.id!=t}),cc.director.getScene().addChild(o),o.active=!0},loadAllPlayers:function(){var i=this,e={onSuccess:function(e){var o=2;e.data.forEach(function(e){if(e.id!=i.id){var t=cc.instantiate(cc.find("p2"));i.loadedPlayers.push(t),cc.director.getScene().addChild(t),2==o?(t.x=i.position.x,t.y=i.position.y):3==o?(t.x=i.position.x+100*o,t.y=i.position.y):4==o?(t.x=i.position.x,t.y=i.position.y-50*o):(t.x=i.position.x+100*o,t.y=i.position.y+100*o),t.id=e.id,o++,t.active=!0}})},onFailed:function(e){console.log(e)}};(0,n.getRoomPlayers)(i.room,e)}}),cc._RF.pop()},{"./RestController.js":"RestController","./StompHandler.js":"StompHandler"}],LobbyController:[function(e,t,o){"use strict";cc._RF.push(t,"28badpxCedI2Ku8X1vwfm2A","LobbyController"),cc._RF.pop()},{}],MenuController:[function(e,t,o){"use strict";var i;cc._RF.push(t,"a1ef8J/8lpINZUa6MX6yCNY","MenuController");var n=e("./StompHandler.js"),s=e("./RestController.js");function c(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}cc.Class({extends:cc.Component,properties:(i={username:null,inputName:{default:null,type:cc.EditBox},inputRoom:{default:null,type:cc.EditBox},sendButton:{default:null,type:cc.Node}},c(i,"username",null),c(i,"room",null),c(i,"id",null),c(i,"stompClient",null),c(i,"player",{default:null,type:cc.Node}),i),onLoad:function(){cc.game.addPersistRootNode(this.node),this.id=Math.floor(1e7*Math.random())},EditBoxDidEndEditing:function(e){this.username=this.inputName.string,this.room=this.inputRoom.string},beginOrWait:function(){var t=this,e={onSuccess:function(e){3<=e.data.length?t.stompClient.send("/app/start/"+t.room,{},null):cc.director.loadScene("waitingScreen",function(){t.node.active=!1})},onFailed:function(e){console.log(e)}};(0,s.getRoomPlayers)(t.room,e)},loadScene:function(){var t=this,e={onSuccess:function(){t.beginOrWait()},onFailed:function(e){alert("Room "+t.room+" game has already start ")}};(0,s.joinRoom)(t.id,t.room,e)},joinThisRoom:function(){var e=this,t={onSuccess:function(){e.loadScene()},onFailed:function(e){console.log(e)}};(0,s.createRoom)(e.room,t)},createOrJoin:function(){var t=this,e={onSuccess:function(e){t.loadScene()},onFailed:function(e){t.joinThisRoom()}};(0,s.getRoomPlayers)(t.room,e)},buttonClicked:function(){var t=this;null==t.username||""==t.username?alert("Please enter a username"):null==t.room||""==t.room?alert("Please enter a room number"):(0,n.getStompClient)().then(function(e){t.stompClient=e,(0,n.subscribeTopic)(t.stompClient,"/topic/room-start-"+t.room,function(e){cc.director.loadScene("game",function(){t.node.active=!1})}),t.createOrJoin()})}});cc._RF.pop()},{"./RestController.js":"RestController","./StompHandler.js":"StompHandler"}],RestController:[function(e,t,o){"use strict";cc._RF.push(t,"baf50OhO5ZLb6ST/l6L4390","RestController"),Object.defineProperty(o,"__esModule",{value:!0}),o.getRoomPlayers=function(e,t){axios.get("/rooms/"+e+"/players").then(function(e){t.onSuccess(e)}).catch(function(e){t.onFailed(e)})},o.joinRoom=function(e,t,o){axios.put("/rooms/"+t+"/players",{id:e}).then(function(){o.onSuccess()}).catch(function(e){o.onFailed(e)})},o.createRoom=function(e,t){axios.post("/rooms",{id:e}).then(function(){t.onSuccess()}).catch(function(e){t.onFailed(e)})},o.deleteRoom=function(e,t){axios.delete("/rooms/"+e).then(function(){t.onSuccess()}).catch(function(e){t.onFailed(e)})},cc._RF.pop()},{}],StompHandler:[function(e,t,o){"use strict";cc._RF.push(t,"eae14bIRL9OxqlLQCYn6MCM","StompHandler"),Object.defineProperty(o,"__esModule",{value:!0}),o.getStompClient=function(){return new Promise(function(t){var e=new SockJS("/stompendpoint"),o=Stomp.over(e);o.connect("tkownfax","UJ4YP9jVSniRrhGMVLdMev0EOY6EphFa",function(e){t(o)},function(e){console.info("error: "+e)},"tkownfax")})},o.subscribeTopic=function(e,t,o){e.subscribe(t,o)},cc._RF.pop()},{}],follow:[function(e,t,o){"use strict";cc._RF.push(t,"feb39Ti3uNP2Kj06Qnzgcqk","follow"),cc.Class({extends:cc.Component,properties:{target:{default:null,type:cc.Node}},onLoad:function(){if(this.node.active=!cc.sys.isMobile,this.target){var e=cc.follow(this.target,cc.rect(155,0,2325,1450));this.node.runAction(e)}}}),cc._RF.pop()},{}],p2:[function(e,t,o){"use strict";cc._RF.push(t,"a0f8dX6Cs9IQ7TrI4DXVFrN","p2"),cc.Class({extends:cc.Component,properties:{id:null}}),cc._RF.pop()},{}],pickUp:[function(e,t,o){"use strict";cc._RF.push(t,"869e0WlQxtPb50nQM++ryWp","pickUp"),cc.Class({extends:cc.Component,properties:{},onLoad:function(){},onCollisionEnter:function(e,t){"Bullet"!=e.node.name&&this.node.destroy()}}),cc._RF.pop()},{}]},{},["Bullet","CameraControl","HeroControl","LobbyController","MenuController","RestController","StompHandler","follow","p2","pickUp"]);
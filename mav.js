
function round(x, n){return Math.round(x*n)/n || x}
function r100(x) {return round(x, 100)};
function v100(x) {return r100($(x).val())};

var fJ= JSON.parse, tJ= JSON.stringify;
//String.prototype.fJ= function() {return JSON.parse(this)} 
//Object.prototype.tJ= function() {return JSON.stringify(this)} 

// http://stackoverflow.com/questions/610406/javascript-equivalent-to-printf-string-format
String.prototype.sf0= function() {  //format 
    var newStr = this, i = 0;
    while (/%s/.test(newStr)) newStr = newStr.replace("%s", arguments[i++])
    return newStr;
}

String.prototype.sf0= function() {  //format 
   var th = this;
   var _r=function(p, s){return p.replace(/%s/, s);}
    return arguments.reduce(_r, th);
}
// 'a %s b %s'.sf(1, 'zz')


String.prototype.sf = function() {  //format 
    var formatted = this;
    for( var arg in arguments ) {
        formatted = formatted.replace(/%s/, arguments[arg]);
    }
    return formatted;
};


//<template id="note-template">
//	<div class="col-md-3 vid">
//	   {{header}}:<br/><textarea id="{{id}}"  rows="3" cols="45"></textarea>
//	</div>
//</template> 
//
//<note header="" id=""></>


Vue.component('note',{
    template: '#note-template',
    props: {header:{type: String, required: true}, id:{type: String, required: true}}
    })
	
Vue.component('vplayercontrols',{
    template: '#vPlayerControls-template',
    props: {ip: {
            type: String,
            required: true
        }}
	, methods: {
//		mounted: function(){$('.vpcontr').draggable()}
	}
	
    })
	
Vue.component('vplayer',{
    template: '#vPlayer-template',
    props: {ip: {
            type: String,
            required: true
        }
	, data: {
	    name: 'Vue.js'
	  }
    }

	, methods: {
	clkB : function (event) {var ip= this.ip
		     
		      pp[ip]=   new YT.Player('v' + ip, {
		      width: '100%', height: "100%",
		      playerVars: {'autoplay': 0, playlist: plt[ip].join()}, //'urAXN77X6zU'}, // 'M7lc1UVf-VE,taJ60kskkns,FG0fTKAqZ5g'
		      events: {
		       'onReady': onplaReady(ip), //onpla1Ready,
		       'onStateChange': onplaStateChange(ip) //onpla1StateChange
		      }
		     
		   });
	  } 
	} 
});




var vm = new Vue({
			el: '#app',
			data: {}
  
		});


    // 2. This code loads the IFrame pp[1] API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube pp[1])
    //    after the API code downloads.
    var time_update_interval, t1=0, t2=0, pp= {}; // pp - players
    
    plays= function(pla, speed) {
		    	if(pla.getPlayerState()==YT.PlayerState.PLAYING) {
		    		pla.pauseVideo()
		    	} else {pla.setPlaybackRate(speed).playVideo(); clearCanv()
	    	}};
    
    pshift= function(pla, dt, el) {pla.pauseVideo(); t=pla.getCurrentTime()+ dt; pla.seekTo(t); $(el).val(r100(t))}
    
    function onYouTubeIframeAPIReady() { // az debug hands-T
    	YTpp= YT.Player.prototype
    	
    	YTpp.go1Vid= function(vidId, t){ console.log('prototype.go1Vid: vidId,  t=' +vidId,  t); 
          var pla= this;
			 //var iOld= pla.getPlaylistIndex(), pll= pla.getPlaylist(), iNew=0;
             if(!pla.getPlaylist) return;
          
			 var pll= pla.getPlaylist()  // ,iOld= pla.getPlaylistIndex(),  iNew=0;
//			 for(iNew=0, l=pll.length; iNew<l; iNew++){if(pll[iNew]==vidId){break}}
//			 var d= iNew - iOld;

//			 if(d>0){for(var i=0; i <  d; i++){ pla= pla.nextVideo()     }}
//			 if(d<0){for(var i=0; i < -d; i++){ pla= pla.previousVideo() }}
//			 pla.seekTo(t);  
//			 setTimeout(function(){pla.pauseVideo().seekTo(t);}, 2000); 
			 
			// iNew= pll.indexOf(vidId)
			 pla= pla.playVideoAt( pll.indexOf(vidId) ).seekTo(t- .3) //.pauseVideo()
             setTimeout(function(){pla.pauseVideo().seekTo(t);}, 2000);
			 
			 //if (pla.getState() == YT.PlayerState.PLAYING) setTimeout(function(){pla.pauseVideo()}, 1000);  
			 
			 
//			 var timer= setInterval(function() {pla.pauseVideo().seekTo(t);
//			   if(player.getPlayerState()==YT.PlayerState.PAUSED) clearInterval(timer)
//			 }, 1000);
			 
			
			// nOK ? 
//			 function seek(){
//				 if(pla.getPlayerState()!=YT.PlayerState.PAUSED){
//					 pla.pauseVideo().seekTo(t) //; 
//				     setTimeout(seek, 1000)}
//			 }
//			 seek()
			 
			 //while(player.getPlayerState()==YT.PlayerState.PLAYING)
			 
			 
			 // $('#t' + ip).val(r100(t))

			 return pla;
      }
    	
        
    	YTpp.loadNpause= function(vidId, t){var p=this, currV=p.getVideoData().video_id;
    // 	   if(null !=currV) {if(currV != vidId){
     		   this.loadVideoById({videoId:vidId, suggestedQuality: 'large'}); 
     		   this.mute(); setTimeout(function(){p.goPause(t)}, 1000)
    // 	   }} else {p.goPause(t)}
     	} /// pp[2].loadNpause("5SZqiCggJN8", 8.88); pp[2].loadNpause("SgrO7Dprl6g", 11.11)
        

    	YTpp.goPause= function(t){ 
     	   return this.mute().playVideo().seekTo(t).pauseVideo().seekTo(t) 
   	   } /// var p= pp[1];  p.goPause(3); p.getPlayerState(); YT.PlayerState

        // 	  return function(){pla.mute();  pla.playVideo(); pla.seekTo(t); pla.pauseVideo(); pla.seekTo(t)}} // pla.playVideo();

    	YTpp.getIndex=  function(){return this.getIframe().id.substr(1)
        }  /// var p= pp[1];  var p= pp[2]; p.getIndex()    	
    	
    	initYTP=  function(ip){ return new YT.Player('v' + ip, {
		            width: '100%', height: "100%",
		            playerVars: {'autoplay': 0, playlist: plt[ip].join()}, // origin: 'null' ??
		            events: {
		             'onReady': onplaReady(ip), 
		             'onStateChange': onplaStateChange(ip) 
		            }
		         });
    	}

      pp[1]= initYTP(1)
      pp[2]= initYTP(2)

    }
    
    
    function onplaReady(i){ return function(event) {var pla= event.target;  //, i= pla.a.id.substr(1); // i  in 1:2
    	pla.setPlaybackQuality('medium');
    	pla.mute();
    	go2ev(0); 

        // Clear any old interval.
        if (time_update_interval != undefined) clearInterval(time_update_interval);

        // Start interval to update elapsed time display every second.
        time_update_interval = setInterval(updateTimerDisplay, 1000)
    }}


      function updateTimerDisplay(){
    	    // Update current time text display.
   	     if(pp[1].getCurrentTime) $('#t1').val(r100( pp[1].getCurrentTime() ));
	     if(pp[2].getCurrentTime) $('#t2').val(r100( pp[2].getCurrentTime() ));
       }
      

      function onplaStateChange(i){ return function(event) { 
    	  if (event.data == YT.PlayerState.PAUSED){updateTimerDisplay()
  	  }}


   }


  function formatTime(time){
      time = Math.round(time);

      var minutes = Math.floor(time / 60),
      seconds = time - minutes * 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      return minutes + ":" + seconds;
  }
  

 /// Handsontable Events 
  var evsHT, evsHT2, playlistsHT; 
  var playlists= [//{Id:"R", 	YTId:"GG4pgtfDpWY", 	Type:1, 	Info:"med", 	Comment:""}, 
               //    {Id:"R", 	YTId:"GG4pgtfDpWY", 	Type:2, 	Info:"med", 	Comment:""}, 
                   {Id:"AZ1", 	YTId:"TSDx6RK15es", 	Type:1, 	Info:"Med radius turns, at Palmer Field, by Alex Zolotovitski", 	Comment:""}, 
//                   {Id:"AZ2", 	YTId:"urAXN77X6zU", 	Type:1, 	Info:"3 runs on Outland 87 x 178, by Alex Zolotovitski", 	Comment:""}, 
                   {Id:"==", 	YTId:"", 	Type:"", 	Info:"", 	Comment:""}, 
//                   {Id:"Reilly", 	YTId:"t334XENKLFo", 	Type:2, 	Info:"Reilly Ski Training 2012.mov, by Reilly McGlashan", 	Comment:"32-bumps, 75-med back, 87-short, 129=med"}, 
////                   {Id:"Berger", 	YTId:"5SZqiCggJN8", 	Type:2, 	Info:"Imagination Richard Berger, by Dnalor Elraes", 	Comment:""}, 
//                   {Id:"BASI", 	YTId:"SgrO7Dprl6g", 	Type:2, 	Info:"BASI level 4 interpretation by Jon Ahlsén, by Jon Ahlsén", 	Comment:"22-short back, 33-med,71-bumps,114-med"}, 
//                   {Id:"CSIA", 	YTId:"aiSzmN82I4A", 	Type:2, 	Info:"Training demos for the level 4 CSIA 2013, by Javier Fuentes", 	Comment:""}, 
                   {Id:"PSIANW", 	YTId:"HrCfQR3qwi0", 	Type:2, 	Info:"LEVEL III - MEDIUM RADIUS TURNS, by BaileyPSIANW", 	Comment:""} 
//                   {Id:"JfB29", 	YTId:"r07Ea0TYkaA", 	Type:2, 	Info:"Jf Beaulieu: Video 29, by Jf Beaulieu", 	Comment:"1. Carving -"}, 
//                   {Id:"Landes", 	YTId:"ZoRsJYRmD5k", 	Type:2, 	Info:"Landes 1 Mogul Training Ski Instructor Academy 2013, by SIA Austria", 	Comment:"2. Bumps -"}, 
//                   {Id:"ReMog", 	YTId:"cIMfJKslkyo", 	Type:2, 	Info:"Reilly McGlashan Spring Mogul Skiing Niseko Japan 2016, by Reilly McGlashan", 	Comment:"3. Bumps -"}, 
//                   {Id:"Cats", 	YTId:"9Y0v2tpSP0s", 	Type:2, 	Info:"Cat skiing with Selkirk Powder @ Schweitzer Mountain, by Thomas Smiley", 	Comment:"4. Powder -"}, 
//                   {Id:"Powder", 	YTId:"vp4OgUjJx2M", 	Type:2, 	Info:"Powder 101 with CMH - Powder Intro with Roko, by skipurepowder", 	Comment:"5. Powder -"}, 
//                   {Id:"ReTu", 	YTId:"aJVhrraLRkw", 	Type:2, 	Info:"Reilly McGlashan - Long turn to short turn rhythm change, Hokkaido Technical Ski Championships 2016, by Reilly McGlashan", 	Comment:"6. Turn Variation -"}, 
//                   {Id:"JBa", 	YTId:"i-lgX65esDo", 	Type:2, 	Info:"Jonathan Ballou - Medium Turns, by Jonathan Ballou", 	Comment:""}, 
//                   {Id:"BB", 	YTId:"XpA9XXa7vAU", 	Type:2, 	Info:"JF Beaulieau & Jonthan Ballou TC August 2014, by Jonathan Ballou", 	Comment:""}, 
//                   {Id:"JfB3", 	YTId:"Us85e6y-NCE", 	Type:2, 	Info:"video 3: Expert skiing, various situations: Jf beaulieu training in Whistler, April, 2014, by Jf Beaulieu", 	Comment:""}, 
//                   {Id:"CPow", 	YTId:"fdaudGMBaO0", 	Type:2, 	Info:"Tips Up – How To Steer Your Skis Through Powder, by Canadian Ski Council", 	Comment:"Powder"},  
//   {Id:"BASIA", 	YTId:"YsIvjr1uH-4", 	Type:1, 	Info:"BASI Alpine  Level 4 Bumps.mpg, by OfficialBASI", 	Comment:""}, 
//   {Id:"SKIIN", 	YTId:"7tyY8A8hobc", 	Type:1, 	Info:"SKIING LEVEL 4 BASI ISTD, by admirallimos admirallimos", 	Comment:""}, 
//   {Id:"BASIL", 	YTId:"tG4g62wTZXg", 	Type:1, 	Info:"BASI Level 4 Criteria - Short turns, Long turns and Bumps, by Altitude Futures - Ski & Snowboard Instructor Courses", 	Comment:""}
                   ]; 

  var evData=[//{	Video1:"R", 	t1:4.31, 	Video2:"R", 	t2:4.89, 	Info:"R, apex", 	SSI:"small edge angle", 	BM:"banking	  outside arm too high and back", 	TD:"outside arm to knee after initiation" 	},
      {Video1:"AZ1", 	t1:4.31, 	Video2:"PSIANW", 	t2:4.89, 	Phase:"", 	SSI:"small edge angle", 	BM:"banking", 	TD:"outside arm too high and back" 	},
//      {Video1:"", 	t1:5.94, 	Video2:"", 	t2:5.82, 	Phase:"", 	SSI:"", 	BM:"outs arm low", 	TD:"poll in arms, parallel to ground" 	},
//      {Video1:"", 	t1:7.8, 	Video2:"", 	t2:6.75, 	Phase:"", 	SSI:"small edge angle", 	BM:"hips too high", 	TD:"more ang before apex; look at dir of travel" 	},
//      {Video1:"", 	t1:8.75, 	Video2:"", 	t2:8.08, 	Phase:"", 	SSI:"", 	BM:"", 	TD:"" 	},
//      {Video1:"", 	t1:4.49, 	Video2:"Reilly", 	t2:63.61, 	Phase:"", 	SSI:"", 	BM:"", 	TD:"" 	},
//      {Video1:"AZ2", 	t1:50.7, 	Video2:"", 	t2:69.74, 	Phase:"", 	SSI:"", 	BM:"", 	TD:"" 	},
////      {Video1:"", 	t1:50.7, 	Video2:"Berger", 	t2:413.83, 	Phase:"", 	SSI:"", 	BM:"", 	TD:"" 	}
//      {Video1:"", 	t1:50.7, 	Video2:"BASI", 	t2:65.14, 	Phase:"", 	SSI:"", 	BM:"", 	TD:"" 	},
      ]
//      {Video1:"BASIL", 	t1:83.25, 	Video2:"JBa", 	t2:2.65, 	Phase:"Long - Med turns", 	SSI:"", 	BM:"", 	TD:"" 	},
//      {Video1:"BASIL", 	t1:93.29, 	Video2:"JBa", 	t2:4.84, 	Phase:"Long - Med turns. 9oc", 	SSI:"", 	BM:"", 	TD:"" 	},
//      {Video1:"BASIL", 	t1:94.03, 	Video2:"JBa", 	t2:5.24, 	Phase:"Long - Med turns. trans to R", 	SSI:"", 	BM:"", 	TD:"" 	},
//      {Video1:"BASIL", 	t1:94.9, 	Video2:"JBa", 	t2:5.77, 	Phase:"Long - Med turns. 3 oc", 	SSI:"", 	BM:"", 	TD:"" 	},
//      {Video1:"BASIL", 	t1:96.07, 	Video2:"JBa", 	t2:6.54, 	Phase:"Long - Med turns. trans to left", 	SSI:"", 	BM:"", 	TD:"" 	},
//      {Video1:"BASIL", 	t1:129.26, 	Video2:"ReMog", 	t2:1.39, 	Phase:"Bumps, trans to R", 	SSI:"", 	BM:"", 	TD:"" 	},
//      {Video1:"BASIL", 	t1:129.78, 	Video2:"ReMog", 	t2:2.19, 	Phase:"Bumps, trans to L", 	SSI:"", 	BM:"", 	TD:"" 	},
//      {Video1:"BASIL", 	t1:28.3, 	Video2:"Reilly", 	t2:18.6, 	Phase:"Short", 	SSI:"", 	BM:"", 	TD:"" 	},
//      {Video1:"BASIL", 	t1:31.29, 	Video2:"Reilly", 	t2:18.7, 	Phase:"Short, 8 oc", 	SSI:"", 	BM:"", 	TD:"" 	}]; 



  var dbPL= TAFFY(playlists); console.log('dbPL = ', dbPL().get());
  var dbEv= TAFFY(evData); console.log('dbEv = ', dbEv().get());
  var dbVid= TAFFY(); dbVid.store("dbVid"); console.log('dbVid = ', dbVid().get()); // localStorage.dbVid
  var dbPhases= TAFFY(); dbPhases.store("dbPhases"); console.log('dbPhases = ', dbPhases().get()); // localStorage.dbVid
//  dbPL().remove()
//  dbVid().remove() ; localStorage.clear()
  

   var playlistsDict={}, playlistsDictY={}, plt={1:[], 2:[]}; // by Id; by YTId; by player type
   
   function fillPlaylistsDict(){
	     playlistsDict={}; playlistsDictY={}; plt= {1:[], 2:[]};
	     for(var i=0, l= playlists.length; i<l; i++){ var p= playlists[i];
		  	//if(p.Type>0) plt[p.Type].push(p.YTId); playlistsDict[p.Id]= p; playlistsDictY[p.YTId]= p
		  	if(p.Type==1 || p.Type==3) plt[1].push(p.YTId); playlistsDict[p.Id]= p; playlistsDictY[p.YTId]= p
		  	if(p.Type==2 || p.Type==3) plt[2].push(p.YTId); playlistsDict[p.Id]= p; playlistsDictY[p.YTId]= p
		  }
   }
   
   fillPlaylistsDict();

  
  var cl= console.log;
  var evData_Filled, selection, currEvent=0;
  var infoRich= true;

//function fullScreen(ip){
//	   $('#vp' + ip + ' iframe').detach().appendTo('body').css({position: 'absolute','top':0,'left':0, 'width': '100%','height':'100%','z-index':'120'});
//	   $('#vpcontr' + ip).detach().appendTo('body').css({position: 'absolute','top':0,'left':'30%', 'width': '30%','height':'50px','z-index':'140'});
//};
  
  //var scrcss= getComputedStyle($('#vp1 iframe')[0]), wi= scrcss.width, he= wi.replace('px','') * 9/16;

   
  function fullScreen(ip){
	  var wi= $('#vp1').width(), he= wi * 9/16;  console.log('fullScreen() ip=', ip, "  wi,he=", wi, he)
	  console.log("$('#fullscr'+ip).text()=", $('#fullscr'+ip).text())
	  
	  var p= pp[ip];
 	  console.log("fullScreen: p=", p)

	  var state= {i: p.getPlaylistIndex(), t: p.getCurrentTime()}  
 	  
      // var vp= $('#vp' + ip + ' iframe')
      var vp= $('#v' + ip)
 	  console.log("wi=", wi)
 	  console.log("vp.width()=", vp.width())
  
	  
	  if($('#fullscr'+ ip)[0].classList.value.indexOf("glyphicon-fullscreen")>=0){  //if($('#fullscr'+ip).text()=='FS'){
		   vp.appendTo('body')  // .detach()
                 .css({position: 'absolute'
			           , top: $(document).scrollTop()
			           , left: 0, 'width': '100%','height':'100%','z-index':'120'});
		   $('#vpcontr' + ip ).appendTo('body').css({position: 'absolute'
		      , top: vp.offset().top + vp.height() - 35  //'96%' // $('body iframe').height()	
		      , left: '30%'
		      , width: '30%', height:'50px','z-index':'99999'});

		   $('#fullscr'+ip).toggleClass('glyphicon-fullscreen glyphicon-resize-small') //$('#fullscr'+ip).text('fs')
	  } else{
			   var vp= $('body > iframe').appendTo($('#vp' + ip)).css({top:0
				   , left:0, width: wi, height: he, 'z-index': 8});
			   $('#vpcontr' + ip ).appendTo($('#vpcontr-contain' + ip)).css({position: 'absolute'
				    , top: 0, left:0, width: '100%', height:'50px'
					});
			   $('#fullscr'+ip).toggleClass('glyphicon-resize-small glyphicon-fullscreen') //$('#fullscr'+ip).text('FS')
		}
	  
 	 setTimeout(function(){	
		   p.playVideoAt(state.i).seekTo(state.t)
		   setTimeout(function(){p.seekTo(state.t)}, 2000)	 
	 }, 1000)	  
	};

  
//  $().ready(function(){ ////////////////////////////////////////////////////////////////////////////////
// $(function(){ ////////////////////////////////////////////////////////////////////////////////////////////
	  
//	  $('#vpcontr1').draggable();
//	  $('#vpcontr2').draggable();

	  positionCanvas= function (info){
		   setTimeout(function(){
			   var vof= $("#vplayers").offset(); //.position()
				console.log('positionCanvas '+ info +',  vof=', vof);
				$("#canvas").offset({top: vof.top + 50, left: vof.left +9});
				
				canvasOffset = $("#canvas").offset();
				offsetX = canvasOffset.left;
				offsetY = canvasOffset.top;
				
		   }, 50);
		}
	  
	function  createCanvas(){

	   var canvas = $('<canvas />').attr({
		        id: "canvas"
		        , Width: $("#vplayers").width()-8,
		          Height: $("#vplayers").height() -100
		   })
	    
	    $.each(['#f00', '#00f'], function() {
		      $('#erase').before("<button class='brush' style='width: 10px; height: 8px; background: " + 
			          this + ";' onclick='setColor(\""+ this +"\")'  ondblclick='setLwd(11-lwd)' ></button> ");
			});	
	   
	    $('#divcanvas').append( canvas );
	    
	    setTimeout(function(){positionCanvas('$().ready'); runCanvas()
	    		toggleCanv()
	    }, 1000)
	    
	} //createCanvas
	
	setTimeout(createCanvas, 3000);
	
	
	var isCanv= true
	toggleCanv= function(){
					isCanv= !isCanv; 
					$('#canv-tools').toggle(); 
					$('#canvas').css('z-index', isCanv ? 15 : 0)
					//$('#bt-draw').html(isCanv ? "X" :"Draw")
					$('#bt-draw').toggleClass('glyphicon-pencil glyphicon-remove-circle') //$('#fullscr'+ip).text('fs')
				}
	

	
	//setTimeout(toggleCanv, 4000);

	  evData_Filled= fillEvs();
	  
	  $('#v1').height(9./16 * $('#v1').width())
	  $('#v2').height(9./16 * $('#v2').width())

	// original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  function strip_tags(input, allowed) {
    var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
      commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;

    // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
    allowed = (((allowed || "") + "").toLowerCase().match(/<[a-z][a-z0-9]*>/g) || []).join('');

    return input.replace(commentsAndPhpTags, '').replace(tags, function ($0, $1) {
      return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
    });
  }  
	  

function render_YT_URL(ro, value, callback) {  // value is YT_Id or url
    if(value=== undefined || value==null || !value){return ''};
    
    var escaped = Handsontable.helper.stringify(value);
    
    escaped = strip_tags(escaped, '<em><b><strong><a><big>'); //be sure you only allow certain HTML tags to avoid XSS threats (you should also remove unwanted HTML attributes)
    

   // var yid= escaped.replace(/.*v=|.*youtu.be\/|&.*/g, ''), url= "http://www.youtube.com/watch?v="+ yid;
    var yid= escaped.replace(/.*v=([_0-9a-zA-Z\-]+).*/g, '$1')
      , url= "http://www.youtube.com/watch?v="+ yid;
    console.log('render_YT_URL: value=', value ,  'yid, url=', yid, url)
    
    
    // TODO: fix this block
    
    // checky yid in dbPL
    var rj= dbPL({YTId:yid}).get()[0]
    if( rj){ 
//    	alert('YT id '+ yid+' is dup in dbPL: '+ tJ(rj))  // is dup?
//    	return ''
	    	callback(ro, rj, value);
	    	return yid
    }
    
    // not dup in dbPL; check in dbVid
    rj= dbVid({yid:yid}).get()[0]
    if(rj != undefined && rj.status == 'gotAjax'){  // ready to use != 'sent2Ajax'
    	cl('render_YT_URL: '+ yid +' found in dbVid'); 
	    console.log('dbVid({yid:yid})=', rj)
	    
	    callback(ro, rj, value); 
	    return yid
    }    

    /// not in db
    var hlink= '<a href="%s" target="_blank">%s</a>'.sf(url, yid)
    
    cl('to ajax ', yid)
    
    // ??
    //    if( dbVid({yid:yid}).select('status') == 'sent2Ajax') {return;}
    //    if( dbVid({yid:yid}).select('status') == 'gotAjax') {return;}
    if( dbVid({yid:yid}).select('status') == 'sent2Ajax') {return yid}
    
    /// not in db, not sent2Ajax
    dbVid({yid:yid}).update({status: 'sent2Ajax'});
    
	$.ajax({
        url: 'http://query.yahooapis.com/v1/public/yql'
      , data: {
            q: "select * from json where url ='http://www.youtube.com/oembed?url="+ url + "&format=json'",
            format: "json"
        }
      , dataType: "jsonp"            		    //$.get({url: "https://www.youtube.com/watch?v="+ yid + '&format=json&callback=?'
	  , success: function(result){
    		  var res= result.query.results;
    		  if(res==null) return;
    		  
    		  var rj=res.json, tit= rj.title
              rj.yid=yid; 
              rj.tlink= '<a href="%s" target="_blank">%s</a>'.sf(url, tit)

              if(dbVid({yid:yid}).count()==0) dbVid.insert(rj);
              if(dbPL({YTId:yid}).count()==0){
            	 var e= {Id:hashId(tit), YTId:yid
                         , Type:2, Info: fNote(rj), Comment:''}
            	 dbPL.insert(e);
	             // in treatRj    playlists.push(e)
	      	  }
              
              
      
    		  //dbVid({yid:yid}).update({status: 'gotAjax'});
    		  dbVid({yid:yid}).update(function(){this.status= 'gotAjax'; return this});
    		  
    		// {"thumbnail_url": "https:\/\/i.ytimg.com\/vi\/iTc9QclQ_l0\/hqdefault.jpg"
//    			, "title": "[FUN]CARVING Passo Tonale 2012"
//    			, "author_url": "https:\/\/www.youtube.com\/user\/MarshallCZE"
//    			, "author_name": "Luk\u00e1\u0161 Mar\u0161\u00edk"
//    			, "html": "\u003ciframe width=\"480\" height=\"270\" src=\"https:\/\/www.youtube.com\/embed\/iTc9QclQ_l0?feature=oembed\" frameborder=\"0\" allowfullscreen\u003e\u003c\/iframe\u003e"
    	if(0){	  var w=  window.open("", "", "width=800,height=400");
               w.document.write('<html> %s, by <a href="%s">%s</a> <img src="%s" width="200px" heignt="100px"/> %s</html>'
            		            .sf(rj.title, rj.author_url, rj.author_name, rj.thumbnail_url, rj.html))	
    	}	  
    		//  console.log('ajax success: rj=', rj, ', tit=', tit);
    		  callback(rj);
    	    }
       });
    
    return yid;
  }  /// render_YT_URL	
	
  if(test=0){ render_YT_URL('https://www.youtube.com/watch?v=d1IXMk6uSAU', function(){alert(tit)})}
	
 //function hashId(title){ return title.replace(/\s+ /g, '').substr(0,5)}	
 //function hashId(title){ return title.replace(/\s*/g, '').substr(0,3)+ title.substr(3,99).replace(/[^A-Z0-9]/g, '')}	

  
function hashId(title){ 
	title= title || ''
	var ids= dbPL().select('Id')  // ids in PL
	 var h0= title.replace(/\s*/g, '').substr(0,2), h= h0, ss= '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''); ss[0]='';
	 for(var i=0; i<40;  h= h0 + ss[i++]){ 
		 if(ids.indexOf(h)==-1){ids.push(h); return h}
	 }
}
  
function fNote(rj) {return infoRich ? '<html><img src="%s" height="36px"/> %s, by <a href="%s">%s</a> </html>'
               .sf(rj.thumbnail_url, rj.tlink, rj.author_url, rj.author_name) 
		   : ' %s, by %s'.sf(rj.title, rj.author_name)
}


function treatRj(ro, rj, value) {
	// infoRich= $('#chri').prop('checked')
			
	// cl('PL_Id_Renderer: dbPL({YTId:yid})=', dbPL({YTId:yid}))	
	
	
	// should never be fired
	if( dbPL({YTId: rj.yid}).count() > 0){ // check dup
		alert(yid + ' is duplicate ' + tJ(dbPL({YTId:rj.yid}).get()[0])); 
		return
	} 
	
	/// no dup
	var e= {Id:hashId(rj.title), YTId:rj.yid
            , Type:2, Info: fNote(rj), Comment:''}
	dbPL.insert(e);
	
	//playlists[ro].Info= fNote(rj, infoRich)
	playlists[ro].rj= rj
	
	if(!playlists[ro].YTId || playlists[ro].YTId.length !=11) {  /// new yid
		playlists[ro].Id= hashId(rj.title);   //rj.title.replace(/\s+/g, '').substr(0,5);
		playlists[ro].YTId= rj.yid;
		playlists[ro].Type= 2;
		playlists[ro].Comment= value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' ') // for Rob's list parsing
     //   td.innerHTML= rj.title.replace(/ /g, '').substr(0,5);
	}
} 


//function YTId_Renderer(instance, td, row, col, prop, value, cellProperties) {
//    // console.log('YTId_Renderer: instance, td, row, col, prop, value, cellProperties:', instance, td, row, col, prop, value, cellProperties)
//	
//    var ro= row, th= this;
//    var yid= render_YT_URL(ro, value, function(rj){return treatRj(ro, rj, value)})
//		
//    if(prop=='YTId'){  td.innerHTML= yid;}
//    return td;
//}  /// YTId_Renderer	
 
	 
function PL_Id_Renderer(instance, td, row, col, prop, value, cellProperties) {
    console.log('PL_Id_Renderer: instance, td, row, col, prop, value, cellProperties:', instance, td, row, col, prop, value, cellProperties)
    
    if(prop=='Id'){
        if(value==null){ td.innerHTML= ""; return td;}
        if(value.length < 11){ td.innerHTML= value; return td;}
    }
    
    if(prop=='YTId' && (!value || value && value.length == 11 ) ){ td.innerHTML= value; return td;}  // do nothing

    
    //var ro=row, th= this;
    //var yid= render_YT_URL(ro, value, function(rj) {return treatRj(ro, rj, value)})
    render_YT_URL(row, value, treatRj)
    
  //  if(prop=='YTId'){  td.innerHTML= yid;}
	
  //  return td;

  //  if(/<a href/.test(td.innerHTML)) {console.log('skipped', row, col); return td;}
}  /// PL_Id_Renderer


function Video_Renderer1(instance, td, row, col, prop, value, cellProperties) {
//		    console.log('Video_Renderer1: instance, td, row, col, prop, value, cellProperties:'
//		    		, instance, td, row, col, prop, value, cellProperties)
			
		    if(value==null){ td.innerHTML= ""; return td;}
		   // if(value.length != 11){ td.innerHTML= value; return td;}
		    if(! /http/.test(value) && value.length != 11){ td.innerHTML= value; return td;}
		    
		    var ro=row, th= this;
		    var yid= render_YT_URL(value, function(rj){
				//alert(tit)s
		    	// infoRich= $('#chri').prop('checked')
		    	var note= infoRich ? '<html><img src="%s" height="36px"/> %s, by <a href="%s">%s</a> </html>'.sf(rj.thumbnail_url, rj.tlink, rj.author_url, rj.author_name) : ' %s, by %s'.sf(rj.title, rj.author_name)
		    	    			                         
		    	//var note= '<html> %s, by <a href="%s">%s</a>  </html>'.sf(rj.tlink, rj.author_url, rj.author_name);

		    	var pl_YTId= playlists.map(function(p){return p.YTId}), ro= pl_YTId.indexOf(yid), type= col <2 ? 1: 2;

                //evData[row].Index= evData.length; 
                evData[row]['yid'+type]= yid, 
		    	evData[row]['t'+type]=  evData[row]['t'+type] || 3 //sec
		    	evData[row].Phase= evData[row].Phase || ""
		    		
		    	if(ro<0) { ///  new video
		    		evData[row]['Video'+type]=  hashId(rj.title);  //rj.title.replace(/\s+/g, '').substr(0,5)
		    		playlists.push({ // new video
							    		Id: hashId(rj.title), //rj.title.replace(/\s+/g, '').substr(0,5),
										YTId: yid,
										Comment:value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' '),
										Type: type
							    	}) 
		    	} else {evData[row]['Video'+type]= playlists[ro].Id};
			})
			
		    return td;
		  }  /// Video_Renderer1	

function toggleRich() {infoRich= !infoRich;  playlistsHT.loadData(playlists)
}

	  
playlistsHT = new Handsontable($("#tbPlaylistsH")[0], {
		data: playlists,  //dbPL().get(), //
		minSpareRows: 1,
		height: 296,
	    colHeaders: function(j) {
	    			  return j==3 ? 'Info &nbsp;&nbsp;<button onclick="toggleRich() " title="toggle Info to Plain Text before copy the table Ctrl-A,Ctrl-C">Toggle Rich</button>'
            		              : 'Id YTId Type Info Comment'.split(" ")[j]
	    },
		rowHeaders: true,
		stretchH: 'all',
		columnSorting: true,
		contextMenu: true,
		//className: "htCenter htMiddle",
		readOnly: false,
		columns: [
		  {data: 'Id' , type: 'text'},     //renderer: PL_Id_Renderer},  // YTId_Renderer
		  {data: 'YTId' , type: 'text',  renderer: PL_Id_Renderer, width: 12}, //YTId_Renderer 4 },
		  {data: 'Type' , type: 'numeric', format: '0'},  //, width: 14
		 // {data: 'Info'  , renderer: "html"},  // , width: 1
		  {data: 'rj'  , renderer: fNote},  // , width: 1
		  {data: 'Comment'  , type: 'text'}
		] //,     minSpareRows: 1
        , autoWrapRow: false ///true
        , manualRowResize: true,
         manualColumnResize: true,
         contextMenu: ['row_above', 'row_below', 'remove_row','undo', 'redo','commentsAddEdit'],
		 comments: true,
		 cell: [
		      {row: 0               , col: 0, comment: 'You can paste youtube Id or links to this column'}
			, {row: playlists.length, col: 0, comment: 'You can paste youtube Id or links to this cell'}
			, {row: playlists.length, col: 1, comment: 'You can paste youtube Id or links to this cell'}
		 ]
	    , afterRender: function(){ fillPlaylistsDict(); evData_Filled= fillEvs() }
        , afterChangeBak: function(changes, source) {
            if(changes) if(source === 'alter'){
            	for(var i=0, l= changes.length; i<l; i++){
        			// console.log(changes)
        			var yid= changes[i][3].replace(/.*watch.v=/, '').replace(/&.*/, '')
        			var hlink= '<a href="https://www.youtube.com/watch?v=%s" target="_blank">%s</a>'.sf(yid, yid)

        			var ro= changes[i][0], th= this;
        			
        			playlists[ro].YTId= yid
        			
        			$.ajax({
        	            url: 'http://query.yahooapis.com/v1/public/yql',
        	                data: {
        	                	
// http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v=iTc9QclQ_l0&format=json
// {"thumbnail_url": "https:\/\/i.ytimg.com\/vi\/iTc9QclQ_l0\/hqdefault.jpg"
//	, "title": "[FUN]CARVING Passo Tonale 2012"
//	, "author_url": "https:\/\/www.youtube.com\/user\/MarshallCZE"
//	, "author_name": "Luk\u00e1\u0161 Mar\u0161\u00edk"
//	, "html": "\u003ciframe width=\"480\" height=\"270\" src=\"https:\/\/www.youtube.com\/embed\/iTc9QclQ_l0?feature=oembed\" frameborder=\"0\" allowfullscreen\u003e\u003c\/iframe\u003e"

        	                	
        	                	
        	                	q: "select * from json where url ='http://www.youtube.com/oembed?url=http://www.youtube.com/watch?v="+ yid + "&format=json'",
        	                    format: "json"
        	                },
        	                dataType: "jsonp"            		    //$.get({url: "https://www.youtube.com/watch?v="+ yid + '&format=json&callback=?'
        		    	  , success: function(result){
        		    		  console.log('result=', result)
        		    		  var tit= result.query.results.json.title;
        		    		  console.log('tit=', tit)
        		    		  //playlists[changes[i][0]].Info= result.getElementsByTagName("title");
        		    		  playlists[ro].Info= tit;
        		    		  //th.render();
        		    		  //playlistsHT.setDataAtCell(ro, 3, tit);
        		    		  th.setDataAtCell(ro, 1, yid); // hlink);
        		    		  //th.setDataAtCell(ro, 3, tit);
        		    		  th.setDataAtCell(ro, 3, '%s, by %s'.sf(tit, result.query.results.json.author_name));
        		    	  }});
        		}
        		//this.render();
        	}
        	
        }
	  });  
  
  evsHT= new Handsontable($("#tbEventsH")[0], {
		data: evData,  //dbEv().get(), //
		minSpareRows: 1,
		height: 196,

		//colHeaders: 'Index Video1 t1 Video2 t2 Phase SSI BM TD img'.split(" "),
		colHeaders: 'Video1 t1 Video2 t2 Phase SSI BM TD img'.split(" "),

		rowHeaders: true,
		stretchH: 'all',
		columnSorting: true,
		contextMenu: true,
	    manualRowResize: true,
	    manualColumnResize: true,
		
	    currentRowClassName: 'currentRow',
	    currentColClassName: 'currentCol',
	    
		//className: "htCenter htMiddle",
		readOnly: false,
		columns: [
	//	  {data: 'Index' , type: 'numeric', format: '0'}, // width: 13},
		  {data: 'Video1' , type: 'text' , renderer: Video_Renderer1
//zzz			  , editor: 'select'
//			  , selectOptions: playlists.filter(function(p){return p.Type==1}) .map(function(i){return i['Id']})
			}, //, width: 20}, 
		  {data: 't1' , type: 'numeric', format: '0.00'},  // renderer: function(){alert("ttt")}}, //, width: 14},
//		  {data: 'Video2', renderer: function(){alert("zzz")} //Video_Renderer1   , type: 'text'
		  {data: 'Video2' , type: 'text', renderer: Video_Renderer1  
//zzz			  , editor: 'select'
//			  , selectOptions: playlists.filter(function(p){return p.Type==2}) .map(function(i){return i.Id})
			}, //, width: 20}, 
		  {data: 't2' , type: 'numeric', format: '0.00'}, //, width: 14},
		  {data: 'Phase'  , type: 'text'},
		  {data: 'SSI'  , type: 'text'},
		  {data: 'BM'  , type: 'text', renderer: "html"}, // renderer: "html" for Phases 
		  {data: 'TD'  , type: 'text'}
		, {data: 'img'  }  // , renderer: imgRenderer}

		 ] //,     minSpareRows: 1
		, comments: true,
		 cell: [
			  {row: evData.length, col: 0, comment: 'You can paste youtube Id or links to this cell'}
			, {row: evData.length, col: 2, comment: 'You can paste youtube Id or links to this cell'}
		 ]
         , autoWrapRow: true
         
     //   , afterRender : function(){positionCanvas('evsHT afterRender');  }
         , afterRender : function(){evData_Filled= fillEvs()}
	  });	
  
//  function imgRenderer (instance, td, row, col, prop, value, cellProperties) {}  // dummy
//	  function imgRenderer (instance, td, row, col, prop, value, cellProperties) {
//	    var escaped = Handsontable.helper.stringify(value),
//	      img;
//
//	    if (escaped.indexOf('http') === 0) {
//	      img = document.createElement('IMG');
//	      img.src = value;
//
//	      Handsontable.Dom.addEvent(img, 'mousedown', function (e){
//	        e.preventDefault(); // prevent selection quirk
//	      });
//
//	      Handsontable.Dom.empty(td);
//	      td.appendChild(img);
//	    }
//	    else {
//	      // render as text
//	      Handsontable.renderers.TextRenderer.apply(this, arguments);
//	    }
//
//	    return td;
//	  }
  

  
  evsHT.updateSettings({
	  afterSelection: function (e) {selection = evsHT.getSelected(); console.log(selection)}
  })
  
    $('#tbEventsH table tbody').on('dblclick', 'tr', function(evt){
    	//var index= $($(this).find('td')[0]).text();
    	var index= $($(this).find('.rowHeader')[0]).text();
    	console.log('#tbEventsH table tbody index=', index)
    	go2ev(index-1)
	}) ;
  
  
//  $('.pp').resizable();  // .draggable()


//	  $('#tbSheetrock').sheetrock({
//		//  url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=0',
//		//  url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=676984390',
//		  url: 'https://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json',
//		  query: 'select A,B,C,D,E,F',  //  where C > " "',
//		  fetchSize:10
//		});
	  
//	 sr= sheetrock($('#tbSheetrock')[0], {
//		  url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=676984390',
//	//	  query: 'select A,B,C,D,E,F where C > " "',
//		  fetchSize:99676984390
//		});
  
  //v go2ev(0)
  
  $("#test0").click(function(){alert('$("#test").click')
	    $.getJSON("http://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json-in-script&callback=x"
	    		, function(re){console.log(re)})
	    
	    function x(result){ alert('x')
	    	console.log('result=', result)
	        $.each(result, function(i, field){
	            $("#testOut").append(field + " ");
	        });
	    };
	});
  
  
  $("#test").click(function(){alert('$("#test").click')

		//ID of the Google Spreadsheet
		  var spreadsheetID = "170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI";
		  
		  // Make sure it is public or set to Anyone with link can view 
		  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID + "/od6/public/values?alt=json";
		  
		  $.getJSON(url, function(data) {
		  
		   var entry = data.feed.entry;
		   console.log('entry =', entry )
		  
		   $(entry).each(function(){
		     // Column names are name, age, etc.
		     $('#testOut').prepend('<h4>'+this.gsx$playlists.$t+'</h4>'+this.gsx$points.$t);
		   });
		  
		  });
  
  })
  
  
function GSheetRange2_HTcells(spreadsheetID, r1, r2, c1, c2, cbfun, db){
    spreadsheetID= spreadsheetID || '170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI'
    db= db || 'MA'

    var GSheets= {MA:'od6', dbLog:'ojacmh6', dbPl:'o8ewx2k', dbPhases:'o26bz5o', dbVid:'oevm3xw', dbEv:'ouj8mhj'} 

    var urlc= "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID +'/'  + GSheets[db]
              + '/public/values?alt=json&min-row='+r1 + '&max-row='+r2 + '&min-col='+c1 + '&max-col='+c2 ;
    console.log('GSheetRange2_HTcells(spreadsheetID, r1, r2, c1, c2, cbfun): urlc =', urlc)
    $.getJSON(urlc, gcellsToArr(cbfun))
} 
			 
		  
function gcellsToArr(cbfun){ return function(data){ 
		   var entryc= data.feed.entry, res=[], header=[], rOld=-2;
		   console.log('gcellsToArr: entryc=', entryc )
		   
		   r1= parseInt(entryc[0].gs$cell.row);
		   c1= parseInt(entryc[0].gs$cell.col);
		   
		   for(i=0, l= entryc.length; i<l; i++){
			  var e= entryc[i].gs$cell, r= parseInt(e.row) - r1 - 1, c= parseInt(e.col)-c1;
			  console.log('gcellsToArr: i, r1, rOld, r, c, e.$t =', i, r1, rOld, r, c, e.$t )
		      if(r> rOld+1) {break}; rOld= r;

			  if(r== -1) {header[c]= e.$t} else {
				  if(res[r]== undefined){ if(c>0)break; res[r]= {} }; /// break on empty first col in the row
				  res[r][header[c]]= e.$t} 
		   }
		   
		   console.log('header =', header )
		   console.log('res =', res )
		   console.log('cbfun =', cbfun )
		   cbfun(res)
		   return res
}}	
  

function GSheet2_HT(){
	alert('GSheet2_HT()')
	  var spreadsheetID = "170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI";

	  GSheetRange2_HTcells(spreadsheetID, 4, 50, 11, 15, function(playls){console.log('plls10 =', plls)
		  playlistsHT.loadData(playls) 
	  });
	  
    GSheetRange2_HTcells(spreadsheetID, 4, 40, 1, 9, function(points){console.log('points =', pts)
  	  evsHT.loadData(points) 
    });
    
    
	  var urlph = 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=131568998/values?alt=json&min-row='+2 + '&max-row='+12 + '&min-col='+1 + '&max-col='+3 ;
	  console.log('GSheet2_HT: urlc =', urlph)
	  $.getJSON(urlc, function(res) {console.log('getPh', res)})
}

//$('#getG').click(GSheet2_HT)
$('#getG').click(function(){
	  alert('GSheet2_HT()')
	  var spreadsheetID = "170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI";

	  GSheetRange2_HTcells(spreadsheetID, 4, 20, 11, 15, function(plls){console.log('plls10 =', plls)
		  playlistsHT.loadData(plls) 

	  });
	  GSheetRange2_HTcells(spreadsheetID, 4, 20, 1, 9, function(pts){console.log('points =', pts)
		  evsHT.loadData(pts) 
	  });
	  
	  
	  ///  http://damolab.blogspot.com/2011/03/od6-and-finding-other-worksheet-ids.html
	  
	  // Get all lists descr: https://spreadsheets.google.com/feeds/worksheets/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/private/full
	  //  https://spreadsheets.google.com/feeds/cells/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json
	  // dbLog https://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/ojacmh6/private/full
	  // dbPl  https://spreadsheets.google.com/feeds/cells/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/o8ewx2k/public/values?alt=json
	  // dbPhases https://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/o26bz5o/private/full?alt=json
	  // dbVid https://spreadsheets.google.com/feeds/cells/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/oevm3xw/private/full
	  
	 var GSheets={dbLog:'ojacmh6', dbPl:'o8ewx2k', dbPhases:'o26bz5o', dbVid:'oevm3xw', dbEv:'ouj8mhj'} 
	  
	// https://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/131568998/public/full
	  //var urlph = 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=131568998/values?alt=json&min-row='+2 + '&max-row='+12 + '&min-col='+1 + '&max-col='+3 ;
	  //var urlph = 'https://spreadsheets.google.com/list/'+ spreadsheetID +'/' + GSheets.dbPhases + '/public/values?alt=json' ;
	 // var urlph = 'https://spreadsheets.google.com/list/'+ spreadsheetID +'/' + GSheets.dbPhases + '/public/values?alt=json' ;
	  var urlph = 'https://spreadsheets.google.com/feeds/list/'+ spreadsheetID +'/' + GSheets.dbPl + '/public/values?alt=json' ;
	  console.log('getGSpreadsheet2Handst2: urlph =', urlph)
	 // $.getJSON(urlph, function(res) {console.log('getPh:', res)})
	  
	  $.ajax({
        url: urlph,
            //data: { alt: "json" },
            dataType: "jsonp"            		    //$.get({url: "https://www.youtube.com/watch?v="+ yid + '&format=json&callback=?'
    	  , success: function(res){console.log('getPh:', res)}
	  })
})




  
//  })  /// on doc ready  ===================================================================================
  

function GSheetPh2dbHT(){
//	GSheet2db(0, "dbPhases", function(res){
//						dbPhases=TAFFY(res); dbPhases2evsHT(1)
//						//gcellsToArr(cbfun)
//		})
		
	GSheetRange2_HTcells(0, 1, 2, 5, 5, function(res){console.log('GSheetPh2dbHT: res =', res)
		    //playlistsHT.loadData(playls) 
			cl('GSheetPh2dbHT: fJ(res[0].dbPhases)', fJ(res[0].dbPhases))
				
			var dd= fJ(res[0].dbPhases), pp=[];
			dd.map(function(d){ pp.push({phase:d[0], t:d[1], yid:d[2]}) })
			dbPhases= TAFFY(pp); dbPhases2evsHT(1)
		  }, 'dbLog')
}

  
function GSheet2db(spreadsheetID, db, callback){
	spreadsheetID= spreadsheetID || '170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI'
	db= db || 'dbPl'
	var GSheets= {MA:'od6', dbLog:'ojacmh6', dbPl:'o8ewx2k', dbPhases:'o26bz5o', dbVid:'oevm3xw', dbEv:'ouj8mhj'} 

	$.ajax({
        url: 'https://spreadsheets.google.com/feeds/list/'+ spreadsheetID +'/' 
              + GSheets[db] + '/public/values?alt=json' 
        , dataType: "jsonp"            		    //$.get({url: "https://www.youtube.com/watch?v="+ yid + '&format=json&callback=?'
    	, success: function(res){	console.log('Gdoc2db: ', db, res)
			    		callback(res)
					}
    	, error: function(xhr, status, err){console.log('Gdoc2db: Err ', xhr, status, err)}
	})
}
// test: GDoc2db(0, dbPhases, 0)

function evsHT2dbPhases(){
    var db= TAFFY();
	
	for(i=0, l= evData.length; i<l; i++){var e= evData[i];
	console.log('evsHT2dbPhases: i,e=', i, e)

	 if(e.Phase) db.insert({yid:dbPL({Id:evData[i].Video2}).get()[0].YTId, phase:e.Phase, t:e.t2})
    }
	console.log('evsHT2dbPhases: db().get()=', db().get())
	console.log('evsHT2dbPhases: db().distinct()=', db().distinct("phase","t","yid") )
}


/// $('#btMatch').click(matchPhase)

function matchPhase(ph){
	  ph= ph || $('#inpPh').val();
	  //dbVid({phases:{has:phase.eq.$('#inpPh').val()}})
	  //dbPhases().insert({phase:$('#inpPh').val(), yid:vid2, t:$('#t2').val()}) 
	  
	  /// remove dups and phase==''
	  var un= dbPhases().distinct("phase","t","yid");  // order alphabetic
	  dbPhases().remove();
//	  for (var i=0, l=un.length; i<l;  i++) {u= un[i];...} 
	  un.map(function(u){ if(u[0] && u[1]*1) dbPhases.insert({phase:u[0], yid:u[2], t:u[1]}) })

	  console.log('matchPhase: remove dups: un, dbPhases', un, dbPhases().get())	  
	  
	  dbPhases({phase: ph}).each(function (p, recordnumber) {
		  evData.push({Video2:'http://www.youtube.com/watch?v='+p.yid, t2:p.t, Phase:$('#inpPh').val()}) //zz
		});
	  
//    var phs= dbPhases({phase:$('#inpPh').val()}).get()
//    phs.map(function(p){evData.push({Video2:p.yid, t2:p.t, Phase:$('#inpPh').val()}) })
	  evsHT.loadData(evData)	
}


function dbPhases2evsHT(all){
	//var db= dbPhases().join(dbPL, function (l, r) { return (l.yid === r.YTId); }); //get Id
	var db= dbPhases(); //get Id
	if(!all) db= db.join(dbPL, function (l, r) { return (l.yid === r.YTId); }); //get Id
	var dat= db.order('t').order('Id')//.get()

	//evData_Filled= dat;  //?? used by go2ev

	
	dat.each(function (p, recordnumber) {
		  //evData.push({Video2:'http://www.youtube.com/watch?v='+p.yid, t2:p.t, Phase:p.phase, SSI:p.yid, BM: d.Info}) //zz
		  $.extend(evData[recordnumber], {Video2:'http://www.youtube.com/watch?v='+p.yid
			     , t2:p.t, Phase:p.phase, SSI:p.yid, BM: p.Info}) //zz
		 // }
	});
	
	if(0){
		for(i=0, l= dat.length; i<l; i++){ var d= dat[i];
			evData[i].Video2= 'http://www.youtube.com/watch?v='+d.yid  // dat[i].Id; 
			evData[i].t2= d.t;
			evData[i].Phase= d.phase;
			evData[i].SSI= d.yid;
			evData[i].BM= d.Info;
		}
	}

	evsHT.loadData(evData)
		
//	console.log('get_dbPhases2evsHT: db.get()=', db.get())
//	console.log('get_dbPhases2evsHT: dat=', dat)
//
//	evsHT.updateSettings({
//		//data: dbPhases().order('t').order('yid').get()
//		data: dat
//		//colHeaders: 'Video1 t1 Video2 t2 Phase SSI BM TD img'.split(" "),
//
//		//, colHeaders: 'yid phase t'.split(" ")
//		, columns: [{data:'Id'},{data:'t'}, {data:'Id'},{data:'t'},{data:'phase'},{data:'yid'},{data:'Info', renderer: "html"}]
//	})
//	evsHT.loadData(dat)
}


  function x(result){alert('o.x')
	    	console.log('o.result=', result)
//	        $.each(result, function(i, field){
//	            $("#testOut").append(field + " ");
//	        });
	    };
  
//  var sr;
//  
//  var getSheetrock2Handst= function(){
//		var shr= sheetrock({
//			 // url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit?usp=sharing',   //url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit?usp=sharing',
//			  url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=676984390',   //url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit?usp=sharing',
//			  query: "select A,B,C,D,E,F where C > '' ",
//			  fetchSize:999,
//			  reset: true,
//			  callback: treatSheetrock
//		});
//	};
//
//var treatSheetrock = function(error, options, response) { alert('In treatSheetrock')
//		  if (!error) {  /*  Parse response.data, loop through response.rows, or do something with
//		      response.html.
//		    */
//			    console.log('response=', response)
//			    console.log('shr t.cols=', response.raw.table.cols)
//				console.log('shr t.rows=', response.raw.table.rows)
//				console.log('shr rows=', response.rows)
//				var r= response.rows, res=[];
//				var kk= r[0].cellsArray
//				for (i=1, l= r.length; i<l; i++){
//					res[i-1]= {};
//					for (ik=0; ik< kk.length; ik++ ){
//						res[i-1][kk[ik]]= r[i].cellsArray[ik];
//						//try{res[i][kk[ik]]= 1* res[i][kk[ik]]} finally {}
//					}
//					
//				}
//				
//				console.log('res=', res)
//				//evsHT.loadData(res) 
//				evData= res;
//				evsHT.loadData(evData) 
//				
//
//		  } else{alert('treatSheetrock error:' + error)}
//		};

		
	function fillEvs(){  /// fill empty cells in evData
		var evData_Filled=[];	
		for (var key in evData[0]) {
			if (evData[0].hasOwnProperty(key)) {
			  for (var i=0, l= evData.length; i<l; i++){ evData_Filled[i]= evData_Filled[i] || {};
			    evData_Filled[i][key]= evData[i][key];
			    if( i > 0  && (key=="Video1" || key=="Video2"||key=="t1" || key=="t2") 
			               && (evData_Filled[i][key]==null || evData_Filled[i][key]=='' ) 
			      ) evData_Filled[i][key]= evData_Filled[i-1][key];
			  }
			}
		}
		return evData_Filled;
	}


  function LoadPlaylists(){console.log(playlists); //alert(playlists)
  
  		fillPlaylistsDict()
  
  		var pl=[[], []]; // pl[0]=[]; pl[1]=[];
  		for(var i=0, l= playlists.length; i<l; i++) if(playlists[i].YTId > ''){
	  			var p=playlists[i], t= p.Type-1;
	  			if(t==0 || t==2) if(pl[0].indexOf(p.YTId) < 0) { pl[0].push(p.YTId) }
	  			if(t==1 || t==2) if(pl[1].indexOf(p.YTId) < 0) { pl[1].push(p.YTId) }
	  			//if(pl[t].indexOf(p.YTId) < 0) { pl[t].push(p.YTId) }
	  		}
  		console.log('pl=', pl);
//	    pp[1].loadPlaylist(pl[0]); setTimeout(function(){pp[1].pauseVideo().seekTo(0)}, 1000);
//		pp[2].loadPlaylist(pl[1]); setTimeout(function(){pp[2].pauseVideo().seekTo(0)}, 1000);
  
	    pp[1].cuePlaylist(pl[0]); 
		pp[2].cuePlaylist(pl[1]);
		
		fillEvs()
		
        evsHT.getCellMeta(evData.length-1, 0).comment= 'You can paste youtube Id or links to this cell';
        evsHT.getCellMeta(evData.length-1, 2).comment= 'You can paste youtube Id or links to this cell';
		evsHT.render();
		go2ev(0)
  }
  
  
   function go2ev(iEvent){  // i = row in table Events
	  iEvent= iEvent != undefined ? iEvent : selection == undefined ? 0: selection[0] 
	  
 	  var e= evData_Filled[iEvent];  console.log('go2ev:', iEvent, e); 

 	  if(	[e.Video1]){
	  	  console.log('playlistsDict[e.Video1].YTId:', playlistsDict[e.Video1].YTId); 
		  pp[1].go1Vid(playlistsDict[e.Video1].YTId, e.t1)
 	  } else {alert('playlistsDict [' + e.Video1 + '] does not exists')}
 	  
 	  if(playlistsDict[e.Video2]){
	  	  console.log('playlistsDict[e.Video2].YTId:', playlistsDict[e.Video2].YTId); 
		  pp[2].go1Vid(playlistsDict[e.Video2].YTId, e.t2)
 	  } else {alert('playlistsDict [' + e.Video2 + '] does not exists')}
 	  
      //evsHT.selectCell(iEvent, 0) 
      evsHT.selectCell(iEvent, 0, iEvent, evsHT.countCols()-1) 

 	  
	  $('#inpCurrPoint').val(iEvent+1)
	  $('#taSS').val(e.SSI)
	  $('#taBM').val(e.BM)
	  $('#taTD').val(e.TD)
  }
   

  function db2GSheet() {
      request= $.ajax({
          url: 'https://script.google.com/macros/s/AKfycbwUv4gQ7KqdZU4xcovE595iUGDWiewTteyuUqgAmll3Mf9iA6M/exec',
          type: 'post', 
          data: {dbPhases: tJ(dbPhases().distinct('phase', 't', 'yid'))
        	   , dbVid: tJ(dbVid().distinct( "author_name","author_url", "status","thumbnail_url", "title", "yid"))
        	   , dbEv: tJ(dbEv().distinct("BM","Phase","SSI","TD","Video1","Video2","t1","t2"))
        	   , dbPL: tJ(dbPL().distinct("Comment","Id","Type", "YTId"))  // "Info":"<html><img src=\"https://i.ytimg.com/vi/TSDx6RK15es/hqdefault.jpg\" height=\"36px\"/> <a href=\"http://www.youtube.com/watch?v=TSDx6RK15es\" target=\"_blank\">Med radius turns, at Palmer Field</a>, by <a href=\"https://www.youtube.com/channel/UCOe3pqY-gde3_Ac_u9-a_cA\">Alex  Zolotovitski</a> </html>"
          }, 
          success: function(e){console.log('Log to G-Sheets ajax success '+JSON.stringify(e))}, 
          error: function(e){console.log('Log to G-Sheets ajax fail '+ JSON.stringify(e))}
       });
}


  function LogCurrentPoint(){  // to evsHT
	  var vid1=pp[1].getVideoData().video_id, vid2=pp[2].getVideoData().video_id;
  	  evData.push({ //Index:evData.length+1,
  		 Video1: playlistsDictY[vid1].Id || vid1, 	t1: $('#t1').val()
  		, Video2: playlistsDictY[vid2].Id || vid2, 	t2: $('#t2').val()
  		, Phase:$('#inpPh').val(), SSI:$('#taSS').val(), BM:$('#taBM').val(), TD:$('#taTD').val()})
  		
	  evsHT.loadData(evData)
	  evsHT.scrollViewportTo(evsHT.countRows()-1, 4)
	  evsHT.selectCell(evsHT.countRows()-1, 4)
	  //$('#tbEventsH').handsontable('selectCell', evsHT.countRows()-1, 5, evsHT.countRows()-1, 5, scrollToSelection = true)
	  
 
 //	  dbVid({yid:vid1}).update(function(){
//			  this.phases= this.phases ||[];
//			  this.phases.push({t:$('#t1').val(), phase:$('#inpPh').val()}); return this
//		  })
//		  
//	  dbVid({yid:vid2}).update(function(){
//			  this.phases= this.phases ||[];
//			  this.phases.push({t:$('#t2').val(), phase:$('#inpPh').val()}); return this
//		  })
		  
	var u=	{phase:$('#inpPh').val(), yid:vid2, t:$('#t2').val()}  
	if(dbPhases(u).count()==0) { dbPhases.insert(u) 
		dbPhases.store("dbPhases")
	}
		  
	  console.log('LogCurrentPoint  dbVid=', dbVid().get())
	  console.log('LogCurrentPoint  dbPhases=', dbPhases().get())
	  
	  
	  //db2GooSheet()
	  
	  
	  // need it?
	  /*
       request= $.ajax({
          url: 'https://script.google.com/macros/s/AKfycbwUv4gQ7KqdZU4xcovE595iUGDWiewTteyuUqgAmll3Mf9iA6M/exec',
          type: 'post', // "post",
          //data: 'az=1,3,7&bb=4,5,8sd',
          //data: 'az=[1,3,7]&bb={"x":["4", "5", "8sd"], "y":["y4", "y5", "y8sd"]}',
          data: encodeURI('Video1='+ playlistsDictY[vid1].Id +'&t1='+ $('#t1').val() +
          '&Video2='+ playlistsDictY[vid2].Id +'&t2='+ $('#t2').val() +'&Note=' +   // Note-> Info?
          '&SSI='+  $('#taSS').val() +'&BM='+ $('#taBM').val() +'&TD='+ $('#taTD').val() +
          '&YTId1='+ vid1 +'&YTId2='+vid2),
          //data: 'az=23&bb=78',
          //data: JSON.stringify({a:12, b:37})
          success: function(e){console.log('Log to G-Sheets ajax success '+JSON.stringify(e))}, 
          error: function(e){console.log('Log to G-Sheets ajax fail '+ JSON.stringify(e))}
       });
	*/
  }
  
  
  function all_dbVid2PL() {
	  
	  dbVid().each(function (p, recordnumber) {
  		playlists.push({ // new video
    		Id: hashId(p.title), //rj.title.replace(/\s+/g, '').substr(0,5),
			YTId: p.yid,
			Comment:p.title,
			Type: 3
    	}) 
		  
	  })
	  playlistsHT.loadData(playlists)
	  $("html, body").animate({scrollTop: $('#tbPlaylistsH').offset().top-40} , 300)

}

  
  var zz;
  
  function test(){ alert('test')
	//  $.getJSON("http://cors.io/spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json", function(data) {
		$.getJSON("http://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json-in-script&callback=x")

  }
  
function toggleDev() {
	$("#for-developers").toggle(); 
	setTimeout(function(){$("html, body").animate({scrollTop: $(document).height()-$(window).height()}
		                                   , 500)
		       }
	, 100)
}
  
var	x= function(data) {
		  //first row "title" column
//			  console.log(data.feed.entry[0]['gsx$title']['$t']);
//			  zz= data.feed;
			  
			  zz= data;
		      console.log('zz=', zz)
		};
/*
 * 
 * setTimeout(function(){p.pauseVideo()}, 1000); p.nextVideo().nextVideo().seekTo(5);
 * 
 * 
 * http://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json-in-script&callback=x
 * 
 * https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/pubhtml
 * 
 * http://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json-in-script&callback=x

 * */

  
  
      

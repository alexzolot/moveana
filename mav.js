
function round(x, n){return Math.round(x*n)/n || x}
function r100(x) {return round(x, 100)};
function v100(x) {return r100($(x).val())};

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
    
    plays= function(pla, speed) {if(pla.getPlayerState()==1) {pla.pauseVideo()
    							 } else {pla.setPlaybackRate(speed).playVideo(); clearCanv()}};
    
    pshift= function(pla, dt, el) {pla.pauseVideo(); t=pla.getCurrentTime()+ dt; pla.seekTo(t); $(el).val(r100(t))}
    
    function onYouTubeIframeAPIReady() { // az debug hands-T
    	YTpp= YT.Player.prototype
    	
    	YTpp.go1Vid= function(vidId, t){ console.log('prototype.go1Vid: vidId,  t=' +vidId,  t); 
          var pla= this;
			 //var iOld= pla.getPlaylistIndex(), pll= pla.getPlaylist(), iNew=0;
             if(!pla.getPlaylist) return;
          
			 var iOld= pla.getPlaylistIndex(), pll= pla.getPlaylist(), iNew=0;
    			 for(iNew=0, l=pll.length; iNew<l; iNew++){if(pll[iNew]==vidId){break}}
    			 var d= iNew - iOld;
    			 
    			 if(d>0){for(var i=0; i <  d; i++){ pla= pla.nextVideo()     }}
    			 if(d<0){for(var i=0; i < -d; i++){ pla= pla.previousVideo() }}
    			 
    			 pla.seekTo(t);  
    			 //if (pla.getState() == YT.PlayerState.PLAYING) setTimeout(function(){pla.pauseVideo()}, 1000);  
    			 setTimeout(function(){pla.pauseVideo().seekTo(t);}, 2000); 
             	 // $('#t' + ip).val(r100(t))
    			 
    			 return pla;
      }
    	
        
    	YTpp.loadNpause= function(vidId, t){var p=this, currV=p.getVideoData().video_id;
    // 	   if(null !=currV) {if(currV != vidId){
     		   this.loadVideoById(vidId); this.mute(); setTimeout(function(){p.goPause(t)}, 1000)
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
		            playerVars: {'autoplay': 0, playlist: plt[ip].join()},
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
    	go2evs(0); 

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
  var evData=[//{Index:0, 	Video1:"R", 	t1:4.31, 	Video2:"R", 	t2:4.89, 	Info:"R, apex", 	SSI:"small edge angle", 	BM:"banking	  outside arm too high and back", 	TD:"outside arm to knee after initiation" 	},
              {Index:1, 	Video1:"AZ1", 	t1:4.31, 	Video2:"PSIANW", 	t2:4.89, 	Note:"", 	SSI:"small edge angle", 	BM:"banking", 	TD:"outside arm too high and back" 	},
              {Index:2, 	Video1:"", 	t1:5.94, 	Video2:"", 	t2:5.82, 	Note:"", 	SSI:"", 	BM:"outs arm low", 	TD:"poll in arms, parallel to ground" 	},
              {Index:3, 	Video1:"", 	t1:7.8, 	Video2:"", 	t2:6.75, 	Note:"", 	SSI:"small edge angle", 	BM:"hips too high", 	TD:"more ang before apex; look at dir of travel" 	},
              {Index:4, 	Video1:"", 	t1:8.75, 	Video2:"", 	t2:8.08, 	Note:"", 	SSI:"", 	BM:"", 	TD:"" 	},
              {Index:5, 	Video1:"", 	t1:4.49, 	Video2:"Reilly", 	t2:63.61, 	Note:"", 	SSI:"", 	BM:"", 	TD:"" 	},
              {Index:6, 	Video1:"AZ2", 	t1:50.7, 	Video2:"", 	t2:69.74, 	Note:"", 	SSI:"", 	BM:"", 	TD:"" 	},
              {Index:7, 	Video1:"", 	t1:50.7, 	Video2:"Berger", 	t2:413.83, 	Note:"", 	SSI:"", 	BM:"", 	TD:"" 	}]
//              {Index:8, 	Video1:"", 	t1:50.7, 	Video2:"BASI", 	t2:65.14, 	Note:"", 	SSI:"", 	BM:"", 	TD:"" 	},
//              {Index:9, 	Video1:"BASIL", 	t1:83.25, 	Video2:"JBa", 	t2:2.65, 	Note:"Long - Med turns", 	SSI:"", 	BM:"", 	TD:"" 	},
//              {Index:10, 	Video1:"BASIL", 	t1:93.29, 	Video2:"JBa", 	t2:4.84, 	Note:"Long - Med turns. 9oc", 	SSI:"", 	BM:"", 	TD:"" 	},
//              {Index:11, 	Video1:"BASIL", 	t1:94.03, 	Video2:"JBa", 	t2:5.24, 	Note:"Long - Med turns. trans to R", 	SSI:"", 	BM:"", 	TD:"" 	},
//              {Index:12, 	Video1:"BASIL", 	t1:94.9, 	Video2:"JBa", 	t2:5.77, 	Note:"Long - Med turns. 3 oc", 	SSI:"", 	BM:"", 	TD:"" 	},
//              {Index:13, 	Video1:"BASIL", 	t1:96.07, 	Video2:"JBa", 	t2:6.54, 	Note:"Long - Med turns. trans to left", 	SSI:"", 	BM:"", 	TD:"" 	},
//              {Index:14, 	Video1:"BASIL", 	t1:129.26, 	Video2:"ReMog", 	t2:1.39, 	Note:"Bumps, trans to R", 	SSI:"", 	BM:"", 	TD:"" 	},
//              {Index:15, 	Video1:"BASIL", 	t1:129.78, 	Video2:"ReMog", 	t2:2.19, 	Note:"Bumps, trans to L", 	SSI:"", 	BM:"", 	TD:"" 	},
//              {Index:16, 	Video1:"BASIL", 	t1:28.3, 	Video2:"Reilly", 	t2:18.6, 	Note:"Short", 	SSI:"", 	BM:"", 	TD:"" 	},
//              {Index:17, 	Video1:"BASIL", 	t1:31.29, 	Video2:"Reilly", 	t2:18.7, 	Note:"Short, 8 oc", 	SSI:"", 	BM:"", 	TD:"" 	}]; 

  var playlists= [//{Id:"R", 	YTId:"GG4pgtfDpWY", 	Type:1, 	Info:"med", 	Comment:""}, 
               //    {Id:"R", 	YTId:"GG4pgtfDpWY", 	Type:2, 	Info:"med", 	Comment:""}, 
                   {Id:"AZ1", 	YTId:"TSDx6RK15es", 	Type:1, 	Info:"Med radius turns, at Palmer Field, by Alex Zolotovitski", 	Comment:""}, 
                   {Id:"AZ2", 	YTId:"urAXN77X6zU", 	Type:1, 	Info:"3 runs on Outland 87 x 178, by Alex Zolotovitski", 	Comment:""}, 
                   {Id:"==", 	YTId:"", 	Type:"", 	Info:"", 	Comment:""}, 
                   {Id:"Reilly", 	YTId:"t334XENKLFo", 	Type:2, 	Info:"Reilly Ski Training 2012.mov, by Reilly McGlashan", 	Comment:"32-bumps, 75-med back, 87-short, 129=med"}, 
                   {Id:"Berger", 	YTId:"5SZqiCggJN8", 	Type:2, 	Info:"Imagination Richard Berger, by Dnalor Elraes", 	Comment:""}, 
                   {Id:"BASI", 	YTId:"SgrO7Dprl6g", 	Type:2, 	Info:"BASI level 4 interpretation by Jon Ahlsén, by Jon Ahlsén", 	Comment:"22-short back, 33-med,71-bumps,114-med"}, 
                   {Id:"CSIA", 	YTId:"aiSzmN82I4A", 	Type:2, 	Info:"Training demos for the level 4 CSIA 2013, by Javier Fuentes", 	Comment:""}, 
                   {Id:"PSIANW", 	YTId:"HrCfQR3qwi0", 	Type:2, 	Info:"LEVEL III - MEDIUM RADIUS TURNS, by BaileyPSIANW", 	Comment:""}] 
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
//   {Id:"BASIL", 	YTId:"tG4g62wTZXg", 	Type:1, 	Info:"BASI Level 4 Criteria - Short turns, Long turns and Bumps, by Altitude Futures - Ski & Snowboard Instructor Courses", 	Comment:""}]; 
  
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

  
  $().ready(function(){ ////////////////////////////////////////////////////////////////////////////////

	  positionCanvas= function (info){
		   setTimeout(function(){
			   var vof= $("#vplayers").offset(); //.position()
				console.log('positionCanvas '+ info +',  vof=', vof);
				$("#canvas").offset({top: vof.top + 50, left: vof.left +9});
//				$("#canvas").width($("#vplayers").width() -8);
//				$("#canvas").height($("#vplayers").height() -100);
				
				canvasOffset = $("#canvas").offset();
				offsetX = canvasOffset.left;
				offsetY = canvasOffset.top;
				
			//	$("#canvas").css({width:$("#vplayers").width(), height:$("#vplayers").height()})
				
				//ctx.scale(.9, 1.1);
				
				//$("#canvas_sketch").offset({top: vof.top+40, left:vof.left+3});
		   }, 50);
		}
	  
	function  createCanvas(){
	  
//	  $('#divcanvas').append('<canvas id="canvas"  width="' + $("#vplayers").width()-8 +
//			  '" height="' + $("#vplayers").height() -100 + 
//			  '" >Your browser does not support HTML5 Canvas.</canvas>'+
//			  ' <script>runCanvas(); positionCanvas("$().ready")</script>');
	  
//	  setTimeout(function(){runCanvas()}, 1000);
//	  setTimeout(function(){positionCanvas('$().ready') }, 2000);
	  //positionCanvas('$().ready');  // afterrender HT
	  
	    ///  http://jsfiddle.net/2Lr5h/
//	    var canvas = $('<canvas width="' + $("#vplayers").width()-8 +
//	            '" height="' + $("#vplayers").height() -100 + 
//	            '" />').attr({
	   var canvas = $('<canvas />').attr({
		        id: "canvas"
		        , Width: $("#vplayers").width()-8,
		          Height: $("#vplayers").height() -100
		   })
//		   .prop({ width: $("#vplayers").width()-8) , height:$("#vplayers").height() -100) });
	    
	    //var ctx = $(canvas)[0].getContext('2d');
	    
	    
// 	    $.each(['#f00', '#00f'], function() {
// 		      $('#erase').before("<a class='brush' href='#canvas' style='width: 10px; height: 10px; background: " + 
// 			          this + ";' onclick='setColor(\""+ this +"\")'  ondblclick='setLwd(9-lwd)'    ></a> ");
// 			});	
	    
	    $.each(['#f00', '#00f'], function() {
		      $('#erase').before("<button class='brush' style='width: 10px; height: 10px; background: " + 
			          this + ";' onclick='setColor(\""+ this +"\")'  ondblclick='setLwd(11-lwd)' ></button> ");
			});	
	   
	    $('#divcanvas').append( canvas );
	    
	    setTimeout(function(){positionCanvas('$().ready'); runCanvas()}, 1000)
	    
	} //createCanvas    
	
	var isCanv= true
	toggleCanv= function(){
				isCanv= !isCanv; 
				$('#canv-tools').toggle(); 
				//$('#canvas').css('z-index', 15- $('#canvas').css('z-index'))
				$('#canvas').css('z-index', isCanv ? 15 : 0)
				$('#bt-draw').html(isCanv ? "X" :"Draw")
		}
	

	
	setTimeout(createCanvas, 3000);
	

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
	  

function render_YT_URL(value, callback) {  // value is YT_Id or url
    var escaped = Handsontable.helper.stringify(value);
    
    escaped = strip_tags(escaped, '<em><b><strong><a><big>'); //be sure you only allow certain HTML tags to avoid XSS threats (you should also remove unwanted HTML attributes)
    
   // var yid= escaped.replace(/.*v=|.*youtu.be\/|&.*/g, ''), url= "http://www.youtube.com/watch?v="+ yid;
    var yid= escaped.replace(/.*v=([_0-9a-zA-Z\-]+).*/g, '$1'), url= "http://www.youtube.com/watch?v="+ yid;
    console.log('render_YT_URL: value,  yid, url=', value, yid, url)

    var hlink= '<a href="%s" target="_blank">%s</a>'.sf(url, yid)
   
	$.ajax({
        url: 'http://query.yahooapis.com/v1/public/yql',
            data: {
                q: "select * from json where url ='http://www.youtube.com/oembed?url="+ url + "&format=json'",
                format: "json"
            },
            dataType: "jsonp"            		    //$.get({url: "https://www.youtube.com/watch?v="+ yid + '&format=json&callback=?'
    	  , success: function(result){
    		  var res= result.query.results;
    		  if(res==null) return;
    		  
    		  var rj=res.json, tit= rj.title; rj.yid=yid; rj.tlink= '<a href="%s" target="_blank">%s</a>'.sf(url, tit)
    		  
    		// {"thumbnail_url": "https:\/\/i.ytimg.com\/vi\/iTc9QclQ_l0\/hqdefault.jpg"
//    			, "title": "[FUN]CARVING Passo Tonale 2012"
//    			, "author_url": "https:\/\/www.youtube.com\/user\/MarshallCZE"
//    			, "author_name": "Luk\u00e1\u0161 Mar\u0161\u00edk"
//    			, "html": "\u003ciframe width=\"480\" height=\"270\" src=\"https:\/\/www.youtube.com\/embed\/iTc9QclQ_l0?feature=oembed\" frameborder=\"0\" allowfullscreen\u003e\u003c\/iframe\u003e"
    	if(0){	  var w=  window.open("", "", "width=800,height=400");
               w.document.write('<html> %s, by <a href="%s">%s</a> <img src="%s" width="200px" heignt="100px"/> %s</html>'.sf(rj.title, rj.author_url, rj.author_name, rj.thumbnail_url, rj.html))	
    	}	  
    		  console.log('ajax: rj=', rj, ', tit=', tit);
    		  callback(rj);
    	    }
       });
    
    return yid;
  }  /// YTId_Renderer	
	
	if(test=0){ render_YT_URL('https://www.youtube.com/watch?v=d1IXMk6uSAU', function(){alert(tit)})}
	
	

	 function YTId_Renderer(instance, td, row, col, prop, value, cellProperties) {
	    console.log('YTId_Renderer: instance, td, row, col, prop, value, cellProperties:', instance, td, row, col, prop, value, cellProperties)
		
	    var ro=row, th= this;
	    var yid= render_YT_URL(value, function(rj){
			//alert(tit)
	    	// infoRich= $('#chri').prop('checked')
	    	var note= infoRich ? '<html><img src="%s" height="36px"/> %s, by <a href="%s">%s</a> </html>'.sf(rj.thumbnail_url, rj.tlink, rj.author_url, rj.author_name) : 
	    		                 ' %s, by %s'.sf(rj.title, rj.author_name)
	    	    			                         
	    	//var note= '<html> %s, by <a href="%s">%s</a>  </html>'.sf(rj.tlink, rj.author_url, rj.author_name);
			console.log('note=', note)
			playlists[ro].Info= note;
			if(!playlists[ro].Id) {
				playlists[ro].Id= rj.title.replace(/\s+/g, '').substr(0,5);
				playlists[ro].Comment= value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' ')
				playlists[ro].YTId= rj.yid;
			}
			//if(!playlists[ro].Comment && value.test('http')) {playlists[ro].Comment= value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' ')}
//			if(!playlists[ro].Comment && value.test('http')){playlists[ro].Comment= value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' ')}
	//?		playlists[ro].YTId= yid;
//			th.setDataAtCell(ro, 4, note); // hlink);
//			if(th.getDataAtCell(ro, 1)=='') {th.setDataAtCell(ro, 1, note.replace(/ /g, '').substr(0,5))}

			})
		
	     if(prop=='YTId'){  td.innerHTML= yid;}
	    return td;
	  }  /// YTId_Renderer	
	 
	 
	 function PL_Id_Renderer(instance, td, row, col, prop, value, cellProperties) {
		    console.log('PL_Id_Renderer: instance, td, row, col, prop, value, cellProperties:', instance, td, row, col, prop, value, cellProperties)
		    
		    if(value==null){ td.innerHTML= ""; return td;}
		    if(value.length < 10){ td.innerHTML= value; return td;}
		    
		    var ro=row, th= this;
		    var yid= render_YT_URL(value, function(rj){
				//alert(tit)
		    	// infoRich= $('#chri').prop('checked')
		    	var note= infoRich ? '<html><img src="%s" height="36px"/> %s, by <a href="%s">%s</a> </html>'.sf(rj.thumbnail_url, rj.tlink, rj.author_url, rj.author_name) : ' %s, by %s'.sf(rj.title, rj.author_name)
		    	    			                         
		    	//var note= '<html> %s, by <a href="%s">%s</a>  </html>'.sf(rj.tlink, rj.author_url, rj.author_name);
				console.log('note=', note)
				playlists[ro].Info= note;
				if(!playlists[ro].YTId) {
					playlists[ro].Id= rj.title.replace(/\s+/g, '').substr(0,5);
					playlists[ro].Comment= value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' ')
					playlists[ro].YTId= rj.yid;
		         //   td.innerHTML= rj.title.replace(/ /g, '').substr(0,5);
				}

			})
			
		    return td;

		    if(/<a href/.test(td.innerHTML)) {console.log('skipped', row, col); return td;}

		  }  /// YTId_Renderer	

	 function Video_Renderer1(instance, td, row, col, prop, value, cellProperties) {
		    console.log('Video_Renderer1: instance, td, row, col, prop, value, cellProperties:'
		    		, instance, td, row, col, prop, value, cellProperties)
			
		    if(value==null){ td.innerHTML= ""; return td;}
		    if(value.length < 10){ td.innerHTML= value; return td;}
		    
		    var ro=row, th= this;
		    var yid= render_YT_URL(value, function(rj){
				//alert(tit)s
		    	// infoRich= $('#chri').prop('checked')
		    	var note= infoRich ? '<html><img src="%s" height="36px"/> %s, by <a href="%s">%s</a> </html>'.sf(rj.thumbnail_url, rj.tlink, rj.author_url, rj.author_name) : ' %s, by %s'.sf(rj.title, rj.author_name)
		    	    			                         
		    	//var note= '<html> %s, by <a href="%s">%s</a>  </html>'.sf(rj.tlink, rj.author_url, rj.author_name);

		    	var pl_YTId= playlists.map(function(p){return p.YTId}), ro= pl_YTId.indexOf(yid), type= col <2 ? 1: 2;

                evData[row].Index= evData.length; 
                evData[row]['yid'+type]= yid, 
		    	evData[row]['t'+type]=3 //sec
		    	evData[row].Note=""
		    		
		    	if(ro<0) { ///  new video
		    		evData[row]['Video'+type]=  rj.title.replace(/\s+/g, '').substr(0,5)
		    		playlists.push({ // new video
							    		Id: rj.title.replace(/\s+/g, '').substr(0,5),
										YTId: yid,
										Comment:value.replace(/<a.*a>|http\S+/g, '').replace(/\s+/g, ' '),
										Type: type
							    	}) 
		    	} else {evData[row]['Video'+type]= playlists[ro].Id};
			})
			
		    return td;
		  }  /// Video_Renderer1	



	  
  playlistsHT = new Handsontable($("#tbPlaylistsH")[0], {
		data: playlists,
		//data: playlistsDictY,
		minSpareRows: 1,
		height: 296,
		//colHeaders: 'Id YTId Type Info Comment'.split(" "),
	    colHeaders: function (col) {
	        switch (col) {
            case 0:	                return 'Id';
            case 1:	                return 'YTId';
	            case 2:	                return '<span title="1 for Left video Player, 2 for right">Type<span>';
	            case 3:	                return 'Info &nbsp;&nbsp;<button onclick="infoRich= !infoRich; playlistsHT.loadData(playlists)" title="toggle Info to Plain Text before copy the table Ctrl-A,Ctrl-C">Toggle Rich</button>'; //http://jsfiddle.net/vECgN/15/   https://github.com/handsontable/handsontable/issues/1540
	            case 4:	                return 'Comment'
	            default:	            return '';
	        }
	    },
		rowHeaders: true,
		stretchH: 'all',
		columnSorting: true,
		contextMenu: true,
		//className: "htCenter htMiddle",
		readOnly: false,
		columns: [
		  {data: 'Id' , type: 'text', renderer: PL_Id_Renderer}, // YTId_Renderer
		  {data: 'YTId' , type: 'text', renderer: YTId_Renderer, width: 3}, // 4 },
		  {data: 'Type' , type: 'numeric', format: '0'}, // renderer: function(instance, td, row, col, prop, value, cellProperties){alert("zzz"); return td}},  //, width: 14
		  {data: 'Info'  , renderer: "html"},  // , width: 1
		  {data: 'Comment'  , type: 'text'}
		] //,     minSpareRows: 1
        , autoWrapRow: false ///true
        ,manualRowResize: true,
         manualColumnResize: true,
         contextMenu: ['row_above', 'row_below', 'remove_row','undo', 'redo','commentsAddEdit'],
		 comments: true,
		 cell: [
		      {row: 0, col: 0, comment: 'You can paste youtube Id or links to this column'}
			, {row: playlists.length, col: 0, comment: 'You can paste youtube Id or links to this cell'}
			, {row: playlists.length, col: 1, comment: 'You can paste youtube Id or links to this cell'}
		 ]
       // , afterRender : createCanvas // function(){positionCanvas('playlistsHT afterRender');  }
//nOK zzz        , afterRender : evsHT.loadData(evData) //updateSettings()  // // function(){positionCanvas('playlistsHT afterRender');  }
        , afterRender : function(){fillPlaylistsDict(); evData_Filled= fillEvs(); }  // LoadPlaylists()}

	    , afterChange: function(changes, source) {
        	//if(changes) if(1 || source === 'alter'){
            if(changes) if(source === 'alter'){
            	for(var i=0, l= changes.length; i<l; i++){
        			// console.log(changes)
        			var yid= changes[i][3].replace(/.*watch.v=/, '').replace(/&.*/, '')
        			var hlink= '<a href="https://www.youtube.com/watch?v=%s" target="_blank">%s</a>'.sf(yid, yid)

        			var ro= changes[i][0], th= this;
        			
        			playlists[ro].YTId= yid
        			//playlistsHT.setDataAtCell(ro, 1, yid);
        			
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
  
  evsHT = new Handsontable($("#tbEventsH")[0], {
		data: evData,
		minSpareRows: 1,
		height: 196,
		//colHeaders: 'Index Video1 t1 Video2 t2 Note SSI BM TD img'.split(" "),
		colHeaders: 'Video1 t1 Video2 t2 Note SSI BM TD img'.split(" "),
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
		  {data: 'Note'  , type: 'text'},
		  {data: 'SSI'  , type: 'text'},
		  {data: 'BM'  , type: 'text'},
		  {data: 'TD'  , type: 'text'}
		, {data: 'img'  }  // , renderer: imgRenderer}

		 ] //,     minSpareRows: 1
		, comments: true,
		 cell: [
			, {row: evData.length, col: 0, comment: 'You can paste youtube Id or links to this cell'}
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
//    , afterChange:  function (e) {		 evsHT.cell= [
//                                  				 {row: evData.length, col: 0, comment: 'You can paste youtube Id or links to this cell'}
//                                  				, {row: evData.length, col: 2, comment: 'You can paste youtube Id or links to this cell'}
//                                  			 ]}
  })
  
    $('#tbEventsH table tbody').on('dblclick', 'tr', function(evt){
    	//var index= $($(this).find('td')[0]).text();
    	var index= $($(this).find('.rowHeader')[0]).text();
    	console.log('#tbEventsH table tbody index=', index)
    	go2evs(index-1)
	}) ;



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
  
  //v go2evs(0)
  
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
  
  
function getGSheet(spreadsheetID, r1, r2, c1, c2, cbfun){
	  var urlc = "https://spreadsheets.google.com/feeds/cells/" + spreadsheetID + '/od6/public/values?alt=json&min-row='+r1 + '&max-row='+r2 + '&min-col='+c1 + '&max-col='+c2 ;
	  console.log('getGSheet(spreadsheetID, r1, r2, c1, c2, cbfun): urlc =', urlc)
	  $.getJSON(urlc, gcellsToArr(cbfun))
}			 
		  
function gcellsToArr(cbfun){ return function(data){ 
		   var entryc = data.feed.entry, res=[], header=[], rOld=-2;
		   console.log('entryc =', entryc )
		   
		   r1= parseInt(entryc[0].gs$cell.row);
		   c1= parseInt(entryc[0].gs$cell.col);
		   
		   for(i=0, l= entryc.length; i<l; i++){
			  var e= entryc[i].gs$cell, r= parseInt(e.row) - r1 - 1, c= parseInt(e.col)-c1;
			  console.log('i, r1, rOld, r, c, e.$t =', i, r1, rOld, r, c, e.$t )
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
  

function getGSpreadsheet2Handst(){
	alert('getGSpreadsheet2Handst()')
	  var spreadsheetID = "170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI";

	  getGSheet(spreadsheetID, 4, 50, 11, 15, function(playls){console.log('plls10 =', plls)
		  playlistsHT.loadData(playls) 

	  });
    getGSheet(spreadsheetID, 4, 40, 1, 9, function(points){console.log('points =', pts)
  	  evsHT.loadData(points) 
    });
}

//$('#getG').click(getGSpreadsheet2Handst)
$('#getG').click(function(){
	  alert('getGSpreadsheet2Handst()')
	  var spreadsheetID = "170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI";

	  getGSheet(spreadsheetID, 4, 20, 11, 15, function(plls){console.log('plls10 =', plls)
		  playlistsHT.loadData(plls) 

	  });
	  getGSheet(spreadsheetID, 4, 20, 1, 9, function(pts){console.log('points =', pts)
		  evsHT.loadData(pts) 
	  });
	
})

  
  })  /// on doc ready  ===================================================================================
  
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
  }
  
  
  function go2SelectedEvent(){currEvent=selection[0]; go2evs(currEvent)}
  	  
   function go2evs(iEvent){  // i = row in table Events
 	  var e= evData_Filled[iEvent];  console.log('go2evs:', iEvent, e); 
 	  if(playlistsDict[e.Video1]){
	  	  console.log('playlistsDict[e.Video1].YTId:', playlistsDict[e.Video1].YTId); 
		  pp[1].go1Vid(playlistsDict[e.Video1].YTId, e.t1)
 	  } else {alert('playlistsDict [' + e.Video1 + '] does not exists')}
 	  
 	  if(playlistsDict[e.Video2]){
	  	  console.log('playlistsDict[e.Video2].YTId:', playlistsDict[e.Video2].YTId); 
		  pp[2].go1Vid(playlistsDict[e.Video2].YTId, e.t2)
 	  } else {alert('playlistsDict [' + e.Video2 + '] does not exists')}
 	  
	  $('#inpCurrPoint').val(iEvent+1)
	  $('#taSS').val(e.SSI)
	  $('#taBM').val(e.BM)
	  $('#taTD').val(e.TD)
  }


  function LogCurrentPoint(){  // to evsHT
	  var vid1=pp[1].getVideoData().video_id, vid2=pp[2].getVideoData().video_id;
  	  evData.push({Index:evData.length+1
  		, Video1: playlistsDictY[vid1].Id || vid1, 	t1: $('#t1').val()
  		, Video2: playlistsDictY[vid2].Id || vid2, 	t2: $('#t2').val()
  		, Note:"logged", SSI:$('#taSS').val(), BM:$('#taBM').val(), TD:$('#taTD').val()})
	  evsHT.loadData(evData)
	  evsHT.scrollViewportTo(evsHT.countRows()-1, 5)
	  evsHT.selectCell(evsHT.countRows()-1, 5)
	  //$('#tbEventsH').handsontable('selectCell', evsHT.countRows()-1, 5, evsHT.countRows()-1, 5, scrollToSelection = true)
	  
 
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

  }
  
  var zz;
  
  function test(){ alert('test')
	//  $.getJSON("http://cors.io/spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json", function(data) {
		$.getJSON("http://spreadsheets.google.com/feeds/list/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/od6/public/values?alt=json-in-script&callback=x")

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

  
  
      
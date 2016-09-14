
function round(x, n){return Math.round(x*n)/n || x}
function r100(x) {return round(x, 100)};
function v100(x) {return r100($(x).val())};



    // 2. This code loads the IFrame pp[1] API code asynchronously.
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube pp[1])
    //    after the API code downloads.
    var time_update_interval, t1=0, t2=0, pp= {}; // pp - players
    
    plays= function(pla, speed) {if(pla.getPlayerState()==1) {pla.pauseVideo()} else {pla.setPlaybackRate(speed).playVideo()}};
    pshift= function(pla, dt, el) {pla.pauseVideo(); t=pla.getCurrentTime()+ dt; pla.seekTo(t); $(el).val(r100(t))}
    
    function onYouTubeIframeAPIReady() {
      pp[1]=   new YT.Player('v1', {
           //videoId: plt[1][0],  // 'TSDx6RK15es', 
           width: '100%', height: "100%",
           playerVars: {'autoplay': 0, playlist: plt[1].join()}, //'urAXN77X6zU'}, // 'M7lc1UVf-VE,taJ60kskkns,FG0fTKAqZ5g'
           events: {
            'onReady': onplaReady(1), //onpla1Ready,
            'onStateChange': onplaStateChange(1) //onpla1StateChange
           }
        });
        
      pp[2]=   new YT.Player( "v2", {
        	//videoId: plt[2][0],  //'t334XENKLFo',
            width: '100%',
        	playerVars:{'autoplay': 0, playlist: plt[2].join()}, // '5SZqiCggJN8,SgrO7Dprl6g'},
            events: {
            	'onReady': onplaReady(2), //this.mute,
                'onStateChange': onplaStateChange(2) //onpla2StateChange
            }
        });

      }
    
    function onplaReady(i){ return function(event) {var pla= event.target;  //, i= pla.a.id.substr(1); // i  in 1:2
    	pla.setPlaybackQuality('medium');
    	pla.mute();
    	go2evs(0); //pla.playVideo(); setTimeout(pla.pauseVideo, 100)
    	
    	//setTimeout(function(){go2evs(0)}, 500)

       // updateTimerDisplay();

        // Clear any old interval.
        if (time_update_interval != undefined) clearInterval(time_update_interval);

        // Start interval to update elapsed time display and
        // the elapsed part of the progress bar every second.
        time_update_interval = setInterval(updateTimerDisplay, 1000)
    }}


      
      function updateTimerDisplay(){
    	    // Update current time text display.
  	    $('#t1').val(r100( pp[1].getCurrentTime() ));
	    $('#t2').val(r100( pp[2].getCurrentTime() ));
      }
      
      function onpla2StateChange(event) {
          // event.target.playVideo();
    	  updateTimerDisplay()
        }
        

      

      // 5. The API calls this function when the pp[1]'s state changes.
      //    The function indicates that when playing a video (state=1),
      //    the pp[1] should play for six seconds and then stop.
//      var done = false;
      function onpla1StateChange(event) { var pla= event.target, i= pla.a.id.substr(1);
	     // if (event.data == YT.PlayerState.BUFFERING) pla.pauseVideo();
 	  if (event.data == YT.PlayerState.PAUSED){updateTimerDisplay()
  	  }

//     if (event.data == YT.PlayerState.PLAYING && !done) {
//       setTimeout(stopVideo, 6000);
//       done = true;
//     }
   }
      function onplaStateChange(i){ return function(event) { 
    	  if (event.data == YT.PlayerState.PAUSED){updateTimerDisplay()
  	  }}

//     if (event.data == YT.PlayerState.PLAYING && !done) {
//       setTimeout(stopVideo, 6000);
//       done = true;
//     }
   }


  function formatTime(time){
      time = Math.round(time);

      var minutes = Math.floor(time / 60),
      seconds = time - minutes * 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;

      return minutes + ":" + seconds;
  }
  


		  $(document).ready(function(){                                 // redundant?
			  $('#progress-bar').on('change', function (e) {
			      // Calculate the new time for the video.
			      // new time in seconds = total duration in seconds * ( value of range input / 100 )
			      var newTime = pp[1].getDuration() * (e.target.value / 100);
			      // Skip video to new time.
			      pp[1].seekTo(newTime);
			  });
		
			  $('#progress-bar').on('mouseup touchend', function (e) {
			      // Calculate the new time for the video.
			      // new time in seconds = total duration in seconds * ( value of range input / 100 )
			      var newTime = pp[1].getDuration() * (e.target.value / 100);
		
			      // Skip video to new time.
			      pp[1].seekTo(newTime);
			  });
		
		  })  
  
  
 /// Handsontable Events 
  var evsHT, evsHT2, playlistsHT; 
  var evData=[{Index:1, 	Video1:"AZ1", 	t1:4.31, 	Video2:"PSIANW", 	t2:4.89, 	Note:"R, apex"}, 
              {Index:2, 	Video1:"", 	t1:5.94, 	Video2:"", 	t2:5.82, 	Note:"to R, trans"}, 
              {Index:3, 	Video1:"", 	t1:7.8, 	Video2:"", 	t2:6.75, 	Note:"to L, 8 o'clock"}, 
              {Index:4, 	Video1:"", 	t1:8.75, 	Video2:"", 	t2:8.08, 	Note:"to L, trans"}, 
              {Index:5, 	Video1:"", 	t1:4.49, 	Video2:"Reilly", 	t2:63.61, 	Note:""}, 
              {Index:6, 	Video1:"AZ2", 	t1:50.7, 	Video2:"", 	t2:69.74, 	Note:""}, 
              {Index:7, 	Video1:"", 	t1:50.7, 	Video2:"Berger", 	t2:413.83, 	Note:""}, 
              {Index:8, 	Video1:"", 	t1:50.7, 	Video2:"BASI", 	t2:65.14, 	Note:""}]; 
   var playlists= [{Id:"AZ1", 	YTId:"TSDx6RK15es", 	Type:1, 	Note:"med", 	Time:""}, 
                  {Id:"AZ2", 	YTId:"urAXN77X6zU", 	Type:1, 	Note:"short, med", 	Time:""}, 
                  {Id:"===", 	YTId:"", 		Note:"", 	Time:""}, // Type:0, 
                  {Id:"Reilly", 	YTId:"t334XENKLFo", 	Type:2, 	Note:"Reilly Ski Training 2012", 	Time:"32-bumps, 75-med back, 87-short, 129=med"}, 
                  {Id:"Berger", 	YTId:"5SZqiCggJN8", 	Type:2, 	Note:"Imagination Richard Berger", 	Time:""}, 
                  {Id:"BASI", 	YTId:"SgrO7Dprl6g", 	Type:2, 	Note:"BASI level 4 interpretation by Jon Ahlsen", 	Time:"22-short back, 33-med,71-bumps,114-med"}, 
                  {Id:"CSIA", 	YTId:"aiSzmN82I4A", 	Type:2, 	Note:"level 4 CSIA 2013", 	Time:""}, 
                  {Id:"PSIANW", 	YTId:"HrCfQR3qwi0", 	Type:2, 	Note:"PSIA-NW- LEVEL III - MEDIUM RADIUS TURNS", 	Time:""} ];
  
   var playlistsDict={}, playlistsDictY={}, plt={1:[], 2:[]};
  for(i=0, l= playlists.length; i<l; i++){ var p= playlists[i];
  	if(p.Type>0) plt[p.Type].push(p.YTId); playlistsDict[p.Id]= p; playlistsDictY[p.YTId]= p
  }
  
  var cl= console.log;
  var evs, selection, currEvent=0;

  
  $().ready(function(){ ////////////////////////////////////////////////////////////////////////////////
	  evs= fillEvs();
	  
	  $('#v1').height(9./16 * $('#v1').width())
	  $('#v2').height(9./16 * $('#v2').width())
	  
//	  $(".pp").each(function() { this.height(9./16. * this.width()) })

  
	  
  playlistsHT = new Handsontable($("#tbPlaylistsH")[0], {
		data: playlists,
		height: 196,
		colHeaders: 'Id YTId Type Note Time'.split(" "),
		rowHeaders: false,
		stretchH: 'all',
		columnSorting: true,
		contextMenu: true,
		//className: "htCenter htMiddle",
		readOnly: false,
		columns: [
		  {data: 'Id' , type: 'text'}, 
		  {data: 'YTId' , type: 'text'},
		  {data: 'Type' , type: 'numeric', format: '0'},  //, width: 14
		  {data: 'Note'  , type: 'text'},
		  {data: 'Time'  , type: 'text'}
		] //,     minSpareRows: 1
        , autoWrapRow: true
	  });  
  
  evsHT = new Handsontable($("#tbEventsH")[0], {
		data: evData,
		height: 196,
		colHeaders: 'Index Video1 t1 Video2 t2 Note'.split(" "),
		rowHeaders: false,
		stretchH: 'all',
		columnSorting: true,
		contextMenu: true,
		
	    currentRowClassName: 'currentRow',
	    currentColClassName: 'currentCol',
	    
		//className: "htCenter htMiddle",
		readOnly: false,
		columns: [
		  {data: 'Index' , type: 'numeric', format: '0', width: 13},
		  {data: 'Video1' , type: 'text', width: 20}, 
		  {data: 't1' , type: 'numeric', format: '0.00', width: 14},
		  {data: 'Video2' , type: 'text', width: 20}, 
		  {data: 't2' , type: 'numeric', format: '0.00', width: 14},
		  {data: 'Note'  , type: 'text'}
		] //,     minSpareRows: 1
        , autoWrapRow: true
	  });	
  

  
  evsHT.updateSettings({
	  afterSelection: function (e) {selection = evsHT.getSelected(); console.log(selection)}
  })
  
//  evsHT2.updateSettings({
//	  afterSelection: function (e) {selection = evsHT2.getSelected(); console.log(selection)}
//  })
  
//	  $('#tbSheetrock').sheetrock({
//		//  url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=0',
//		  url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=676984390',
//	//	  query: 'select A,B,C,D,E,F where C > " "',
//		  fetchSize:99
//		});
	  
//	 sr= sheetrock($('#tbSheetrock')[0], {
//		  url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=676984390',
//	//	  query: 'select A,B,C,D,E,F where C > " "',
//		  fetchSize:99676984390
//		});
  
  go2evs(0)
  
  })  // on doc ready
  
  var sr;
  
  var getSheetrock2Handst= function(){
		var shr= sheetrock({
			 // url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit?usp=sharing',   //url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit?usp=sharing',
			  url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit#gid=676984390',   //url: 'https://docs.google.com/spreadsheets/d/170sfsB8VLSeWO1JU6dDMi9DNWgjwytfeb6fosZwN8SI/edit?usp=sharing',
			  query: "select A,B,C,D,E,F where C > '' ",
			  fetchSize:999,
			  reset: true,
			  callback: treatSheetrock
		});
	};

var treatSheetrock = function(error, options, response) { alert('In treatSheetrock')
		  if (!error) {  /*  Parse response.data, loop through response.rows, or do something with
		      response.html.
		    */
			    console.log('response=', response)
			    console.log('shr t.cols=', response.raw.table.cols)
				console.log('shr t.rows=', response.raw.table.rows)
				console.log('shr rows=', response.rows)
				var r= response.rows, res=[];
				var kk= r[0].cellsArray
				for (i=1, l= r.length; i<l; i++){
					res[i-1]= {};
					for (ik=0; ik< kk.length; ik++ ){
						res[i-1][kk[ik]]= r[i].cellsArray[ik];
						//try{res[i][kk[ik]]= 1* res[i][kk[ik]]} finally {}
					}
					
				}
				
				console.log('res=', res)
				//evsHT.loadData(res) 
				evData= res;
				evsHT.loadData(evData) 
				

		  } else{alert('treatSheetrock error:' + error)}
		};

		
	function fillEvs(){  /// fill empty cells in evData
		var evs=[];	
		for (var key in evData[0]) {
			if (evData[0].hasOwnProperty(key)) {
			  for (i=0, l= evData.length; i<l; i++){ evs[i]= evs[i] || {};
			    evs[i][key]= evData[i][key];
			    if((key=="Video1" || key=="Video2") && evs[i][key]=='' && i>0) evs[i][key]= evs[i-1][key];
			  }
			}
		}
		return evs;
	}



  function LoadPlaylists(){console.log(playlists); //alert(playlists)
  		var pl=[[], []]; // pl[0]=[]; pl[1]=[];
  		for(i=0, l= playlists.length; i<l; i++)if(playlists[i].YTId>''){pl[playlists[i].Type-1].push(playlists[i].YTId)}
  		console.log('pl=', pl);
	    pp[1].loadPlaylist(pl[0]); pp[1].pauseVideo();
		pp[2].loadPlaylist(pl[1]);   setTimeout(pp[2].pauseVideo, 1000);
  
  		//for(i=0, l= playlists.length; i<l; i++)if(playlists[i].YTId>''){if(playlists[i].Type==1){pp[1].cueVideoById(playlists[i].YTId)} else{pp[2].cueVideoById(playlists[i].YTId)}}
  }
  
  
  function go2SelectedEvent(){currEvent=selection[0]; go2evs(currEvent)}
  	  
   function go2evs(iEvent){  // i = row in table Events
 	  var e= evs[iEvent];  console.log('go2SelectedEvent:' + i, e); 
  	  console.log('playlistsDict[e.Video1].YTId:', playlistsDict[e.Video1].YTId); 
  	  console.log('playlistsDict[e.Video2].YTId:', playlistsDict[e.Video2].YTId); 
	  go1Vid(1)(playlistsDict[e.Video1].YTId, e.t1)
	  go1Vid(2)(playlistsDict[e.Video2].YTId, e.t2)
  }
   
  function go1Vid(ip){return function(vidId, t){ console.log('go1Vid:' +vidId, t); 
      pla=pp[ip];
      if(pla == undefined) {console.log('pla == undefined, ip=', ip, '  t=',t); return; }//alert
	 // if(null !=pla.getVideoData().video_id) {if(pla.getVideoData().video_id != vidId) {
		  if(1) {if(1) {
		  pla.loadVideoById(vidId); 
		  setTimeout(goPause1(pla, t), 1000)
		}} else { goPause1(pla, t)()}
	  
	  //{videoId:vidId}, startSeconds:1endSeconds:t,suggestedQuality:'auto' '720p'
	  //if(null==pla.getVideoData().video_id || (pla.getVideoData().video_id != vidId)) pla.loadVideoByUrl('https://youtu.be/' +vidId)
	  //nOK if(pla.getVideoData().video_id != vidId) pla.loadVideoByUrl('https://www.youtube.com/embed/' +vidId +'?enablejsapi=1&autoplay=0&start='+t-1+'&end='+t); //{videoId:vidId}, startSeconds:1endSeconds:t,suggestedQuality:'auto' '720p'
	  //if(pla.getVideoData().video_id != vidId) pla.loadVideoByUrl({mediaContentUrl:'https://www.youtube.com/watch?v=' +vidId}); //{videoId:vidId}, startSeconds:1endSeconds:t,suggestedQuality:'auto' '720p'
	  //  pla.mute(); pla.playVideo(); pla.seekTo(t); pla.pauseVideo(); //; setTimeout(pla.pauseVideo, 2000)

  	  $('#t' + ip).val(r100(t))
     // $('#progr' + ip).val(50)

  }}
  
  
  function goPause1(pla, t){
	  console.log('goPause1(pla, t): ', pla, t)
	  return function(){pla.mute();  pla.playVideo(); pla.seekTo(t); pla.pauseVideo(); pla.seekTo(t)}} // pla.playVideo();

  
  function LogCurrentPoint(){  // to evsHT
	  var vid1=pp[1].getVideoData().video_id, vid2=pp[2].getVideoData().video_id;
  	  evData.push({Index:evData.length+1
  		, Video1: playlistsDictY[vid1].Id || vid1, 	t1: $('#t1').val()
  		, Video2: playlistsDictY[vid2].Id || vid2, 	t2: $('#t2').val(), 	Note:"logged"})
	  evsHT.loadData(evData)
	  evsHT.scrollViewportTo(evsHT.countRows()-1, 5)
	  evsHT.selectCell(evsHT.countRows()-1, 5)
	  //$('#tbEventsH').handsontable('selectCell', evsHT.countRows()-1, 5, evsHT.countRows()-1, 5, scrollToSelection = true)
  }


  
  
      
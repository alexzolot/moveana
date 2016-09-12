
function round(x, n){return Math.round(x*n)/n || x}
function r100(x) {return round(x, 100)};
function v100(x) {return r100($(x).val())};



    // 2. This code loads the IFrame pla1 API code asynchronously.
    var tag = document.createElement('script');

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube pla1)
    //    after the API code downloads.
    var pla1, pla2, time_update_interval, t1=0, t2=0, pp=[{pl:pla1, i:1}, {pl:pla2, i:2}];
    
    plays= function(pla, speed) {if(pla.getPlayerState()==1) {pla.pauseVideo()} else {pla.setPlaybackRate(speed).playVideo()}};
    pshift= function(pla, dt, el) {pla.pauseVideo(); t=pla.getCurrentTime()+ dt; pla.seekTo(t); $(el).val(r100(t))}
    
    function onYouTubeIframeAPIReady() {
        pla1 = new YT.Player('v1', {
           videoId: 'TSDx6RK15es', 
           width: '100%',
           playerVars: {
		       playlist: 'urAXN77X6zU' // 'M7lc1UVf-VE,taJ60kskkns,FG0fTKAqZ5g'
		   },
          events: {
            'onReady': onplaReady, //onpla1Ready,
            'onStateChange': onpla1StateChange
          }
        });
        
        pla2 = new YT.Player( "v2", {
        	videoId: 't334XENKLFo',
            width: '100%',
        	playerVars:{playlist: '5SZqiCggJN8,SgrO7Dprl6g'},
            events: {
            	'onReady': onplaReady, //this.mute,
                'onStateChange': onpla2StateChange
            }
        });

      }
    
    function onplaReady(event) {var pla= event.target, i= pla.a.id.substr(1); // i  in 1:2
    	pla.mute; pla.pauseVideo()
    	$('#t' + i).val(r100(pla.getCurrentTime()))
        $('#progr' + i).val(50)
    }

    // 4. The API will call this function when the video pla1 is ready.
      function onpla1Ready(event) {
    	  event.target.pauseVideo();// event.target.playVideo();
        //  function initialize(){

              // Update the controls on load
              updateTimerDisplay();
              updateProgressBar();

              // Clear any old interval.
              if (time_update_interval != undefined) clearInterval(time_update_interval);

              // Start interval to update elapsed time display and
              // the elapsed part of the progress bar every second.
              time_update_interval = setInterval(function () {
                  updateTimerDisplay();
                  updateProgressBar();
              }, 1000)

       //   }
      }
      
      function onpla2StateChange(event) {
          // event.target.playVideo();
          $('#t2').val(r100(pla2.getCurrentTime()))
          $('#progr2').val(50)
        
        }
        

      

      // 5. The API calls this function when the pla1's state changes.
      //    The function indicates that when playing a video (state=1),
      //    the pla1 should play for six seconds and then stop.
//      var done = false;
      function onpla1StateChange(event) {
    	  if (event.data == YT.PlayerState.PAUSED){
    		 $('#t1').val(r100(pla1.getCurrentTime()))
    		 $('#progr1').val(50)
     	  }

//        if (event.data == YT.PlayerState.PLAYING && !done) {
//          setTimeout(stopVideo, 6000);
//          done = true;
//        }
      }

  // This function is called by initialize()
  function updateTimerDisplay(){
      // Update current time text display.
      $('#current-time').text(formatTime( pla1.getCurrentTime() ));
      $('#duration').text(formatTime( pla1.getDuration() ));
  }

  function formatTime(time){
      time = Math.round(time);

      var minutes = Math.floor(time / 60),
      seconds = time - minutes * 60;

      seconds = seconds < 10 ? '0' + seconds : seconds;

      return minutes + ":" + seconds;
  }
  
//This function is called by initialize()
  function updateProgressBar(){
      // Update the value of our progress bar accordingly.
      $('#progress-bar').val((pla1.getCurrentTime() / pla1.getDuration()) * 100);
  }



  $(document).ready(function(){
  	

	  $('#progress-bar').on('change', function (e) {

	      // Calculate the new time for the video.
	      // new time in seconds = total duration in seconds * ( value of range input / 100 )
	      var newTime = pla1.getDuration() * (e.target.value / 100);

	      // Skip video to new time.
	      pla1.seekTo(newTime);

	  });

	  $('#progress-bar').on('mouseup touchend', function (e) {

	      // Calculate the new time for the video.
	      // new time in seconds = total duration in seconds * ( value of range input / 100 )
	      var newTime = pla1.getDuration() * (e.target.value / 100);

	      // Skip video to new time.
	      pla1.seekTo(newTime);

	  });




  })  
  
  
 /// Handsontable Events 
  var evsHT, evsHT2, playlistsHT; 
  var evData=[{Index:1, 	Video1:"AZ1", 	t1:4.49, 	Video2:"Reilly", 	t2:63.61, 	Note:""}, 
              {Index:2, 	Video1:"", 	t1:5.99, 	Video2:"", 	t2:64.16, 	Note:""}, 
              {Index:3, 	Video1:"", 	t1:7.94, 	Video2:"", 	t2:68.29, 	Note:""}, 
              {Index:4, 	Video1:"AZ2", 	t1:50.7, 	Video2:"", 	t2:69.74, 	Note:""}, 
              {Index:5, 	Video1:"", 	t1:50.7, 	Video2:"Berger", 	t2:413.83, 	Note:""}, 
              {Index:6, 	Video1:"", 	t1:50.7, 	Video2:"BASI", 	t2:65.14, 	Note:""}]; 
   var playlists= [{Id:"AZ1", 	YTId:"TSDx6RK15es", 	Type:1, 	Note:"med", 	Time:""}, 
                  {Id:"AZ2", 	YTId:"urAXN77X6zU", 	Type:1, 	Note:"short, med", 	Time:""}, 
                  {Id:"===", 	YTId:"", 	Type:0, 	Note:"", 	Time:""}, 
                  {Id:"Reilly", 	YTId:"t334XENKLFo", 	Type:2, 	Note:"Reilly Ski Training 2012", 	Time:"32-bumps, 75-med back, 87-short, 129=med"}, 
                  {Id:"Berger", 	YTId:"5SZqiCggJN8", 	Type:2, 	Note:"Imagination Richard Berger", 	Time:""}, 
                  {Id:"BASI", 	YTId:"SgrO7Dprl6g", 	Type:2, 	Note:"BASI level 4 interpretation by Jon Ahlsen", 	Time:"22-short back, 33-med,71-bumps,114-med"}, 
                  {Id:"CSIA", 	YTId:"aiSzmN82I4A", 	Type:2, 	Note:"level 4 CSIA 2013", 	Time:""}, 
                  {Id:"PSIANW", 	YTId:"HrCfQR3qwi0", 	Type:2, 	Note:"PSIA-NW- LEVEL III - MEDIUM RADIUS TURNS", 	Time:""} ];
  var playlistsDict={};
  for(i=0, l= playlists.length; i<l; i++){ var p=playlists[i]
	  playlistsDict[p.Id]= p
  }
  
  var cl= console.log;
  var evs, selection;

  
  $().ready(function(){
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
		  {data: 'Type' , type: 'numeric', format: '0'},
		  {data: 'Note'  , type: 'text'},
		  {data: 'Time'  , type: 'text'}
		] //,     minSpareRows: 1
	  });  
  
  evsHT = new Handsontable($("#tbEventsH")[0], {
		data: evData,
		height: 196,
		colHeaders: 'Index Video1 t1 Video2 t2 Note'.split(" "),
		rowHeaders: false,
		stretchH: 'all',
		columnSorting: true,
		contextMenu: true,
		//className: "htCenter htMiddle",
		readOnly: false,
		columns: [
		  {data: 'Index' , type: 'numeric', format: '0'},
		  {data: 'Video1' , type: 'text'}, 
		  {data: 't1' , type: 'numeric', format: '0.00'},
		  {data: 'Video2' , type: 'text'}, 
		  {data: 't2' , type: 'numeric', format: '0.00'},
		  {data: 'Note'  , type: 'text'}
		] //,     minSpareRows: 1
	  });	
  
  evs= fillEvs();


//  evsHT2 = new Handsontable($("#tbEventsH2")[0], {
//		data: evs,
//		height: 196,
//		colHeaders: 'Index Video1 t1 Video2 t2 Note'.split(" "),
//		rowHeaders: false,
//		stretchH: 'all',
//		columnSorting: true,
//		contextMenu: true,
//		//className: "htCenter htMiddle",
//		readOnly: false,
//		columns: [
//		  {data: 'Index' , type: 'numeric', format: '0'},
//		  {data: 'Video1' , type: 'text'}, 
//		  {data: 't1' , type: 'numeric', format: '0.00'},
//		  {data: 'Video2' , type: 'text'}, 
//		  {data: 't2' , type: 'numeric', format: '0.00'},
//		  {data: 'Note'  , type: 'text'}
//		] //,     minSpareRows: 1
//	  });	
  
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

		
function fillEvs(){
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
	    pla1.loadPlaylist(pl[0]); pla1.pauseVideo();
		pla2.loadPlaylist(pl[1]);   setTimeout(pla2.pauseVideo, 1000);
  
  		//for(i=0, l= playlists.length; i<l; i++)if(playlists[i].YTId>''){if(playlists[i].Type==1){pla1.cueVideoById(playlists[i].YTId)} else{pla2.cueVideoById(playlists[i].YTId)}}
  }
  
  function goVid(pla, vidId, t){ console.log('goVid:' +vidId, t); 
	  if(pla.getVideoData().video_id != vidId) pla.loadVideoById(vidId); //{videoId:vidId}, startSeconds:1endSeconds:t,suggestedQuality:'auto' '720p'
	  pla.pauseVideo(); pla.mute(); pla.seekTo(t); pla.pauseVideo(); //; setTimeout(pla.pauseVideo, 2000)
	  $('#t' + pla.a.id.substr(1)).val(t)
	  }
  
  function Go2SelectedPoint(){
  	  var i= selection[0], e= evs[i];  console.log('Go2SelectedPoint:' + i, e); 
  	  console.log('playlistsDict[e.Video1].YTId:', playlistsDict[e.Video1].YTId); 
  	  console.log('playlistsDict[e.Video2].YTId:', playlistsDict[e.Video2].YTId); 
//	  pla1.loadVideoById(playlistsDict[e.Video1].YTId); setTimeout(pla1.pauseVideo, 1000);
//	  pla1.seekTo(e.t1);
//	  pla2.loadVideoById(playlistsDict[e.Video2].YTId); setTimeout(pla2.pauseVideo, 1000);
//	  pla2.seekTo(e.t2);
	  goVid(pla1, playlistsDict[e.Video1].YTId, e.t1)
	  goVid(pla2, playlistsDict[e.Video2].YTId, e.t2)
	  //alert(evData)
  }
  
  function LogCurrentPoint(){
  	  evData.push({Index:evData.length+1
  		, Video1:pla1.getVideoData().video_id, 	t1:r100($('#t1').val())
  		, Video2:pla2.getVideoData().video_id, 	t2:r100(pla2.getCurrentTime()), 	Note:"logged"})
	  evsHT.loadData()
  }


  
  
      
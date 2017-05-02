javascript:
  var y='', s= window.getSelection(); 
  try{ console.log('111111s. s=', s);
	s= s.getRangeAt(0).cloneContents(); console.log('s=', s, 's.textContent=', s.textContent);
    s.querySelectorAll('*').forEach(function(v){var h=v.href || '', t=v.textContent; 
        if(t) {t=t.trim().replace(/More|Move to top|Move to bottom|Add \/ edit notes|Set as playlist thumbnail|\s+/g,' '); 
               if(y.indexOf(t) < 0) y+= ' ' +  t.replace(/\s+|http.*/,' ')
        };
        if(h && /youtube.*v=/.test(h)){h= h.replace(/&(index|list)=.*/,''); 
           if(y.indexOf(h) <0) y+= ' ' + h
        } ;
      });
    y= y.replace(/\s+/g,' ').replace(/Play next|Play now|More|Move to top|Move to bottom|Add \/ edit notes|Set as playlist thumbnail|\s+/g,' '); 
    console.log('111111. y=', y);
  } catch(err) {console.log('111111. err=', err);};
  
  if(y=='') try {
	  var hr= location.href;
	  if(/youtube.*v=/.test(hr)){ y= hr; 
		  yt=_yt_www.sF(); 
		  if(yt) { y= y +'&time=' + yt.getCurrentTime();
		  } 
	  }
	  console.log('22222. y=', y);

	  alert(y)
  } catch(err) {console.log('22222. err=', err);};  y= encodeURIComponent(y);

  root='http://moveana.s3-website-us-east-1.amazonaws.com';
  root='http://localhost:8000/mav.htm';
open(root + '?keep=0&type=3&yt=' + y).focus()
x_headers={ 
    'X-AVOSCloud-Application-Id': '646jkpu7sub1uwi8oraqlcm65wmbjyjvy8y48ib6v5jfp0k2',
    'X-AVOSCloud-Application-Key': 're2xgrdfjiocgqdwa86j1ovz50b0jtg2scckv7xfqvf9vq18',
    'Content-Type': 'application/json',
    };
av_url='https://cn.avoscloud.com/1.1/classes/Mark'
console.log($);
function av_save(object){
	$.ajax({
		type:'POST',
		url:av_url,
		headers:x_headers ,
		data:JSON.stringify(object),
		dataType:'json',
		success:function(data){
			console.log(data);
			$('#mark_status').text('mark success');
		}
	});
}
function av_query(where){
	$.ajax({
		type:'GET',
		url:av_url,
		headers:x_headers,
		data:'where='+JSON.stringify(where),
		contentType:'json',
		beforeSend:function(){

		},
		success:function(data){
			console.log(data);
			var marks=data.results;
			for(var i=0;i<marks.length;i++){
				var mark=marks[i];
				append_mark(mark.line_no,mark.content);
			}
			$('#mark_status').text('read marks success');
		},
		error:function(){
			$('#mark_status').text('read marks error');
			console.log(error);
		}
	});
}

function append_mark(line_no,content){
	$('#LC'+line_no).after('<td class="markc"><p>'+content+'</p></td>');
}

function main(){
	$('head').append(
		'<style>'+
		'.markc{z-index:1000;position:absolute;right:-30%;width:30%;height:100px;color:red;overflow-y:scroll;word-break: break-word;border: 1px solid;}'+
		'</style>');
	$('body').append('<div id="mark_status" style="position:fixed;right:20px;top:20px;background:#eee;">Loading</div>');
	var path=window.location.href.split('#')[0];
	$('.blob-num').click(function(){
		var line_no=parseInt($(this).attr('data-line-number'));
		var content = prompt("Please enter your mark", "");
		if(content!=null){
			var mark={path:path,line_no:line_no,content:content}
			append_mark(line_no,content);
			av_save(mark);
		}
	});
	av_query({path:path})
}
//console.log(document.title);
main();
// document.body.innerHTML+='<script src="http://127.0.0.1:7777/js/marker.js"></script>'
//sc=document.createElement('script');sc.src='http://127.0.0.1:7777/js/marker.js';document.body.appendChild(sc);
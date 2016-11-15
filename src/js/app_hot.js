import $ from 'jquery';
import platform from './device';

let body = $("#bodyonline");
if(platform.isDesktop){
	body.addClass('desktop');
}else{
	body.addClass('mobile');
}

import * as load from './loadImg';
import Config from './config';
import story from './hotUpdate';
import reveal from './reveal';

// import fn from 'views/article.jade!'
// import '../css/app.css!';
let loaded_count = 0,
	loaded_len = 0,
	headHeight = 0;
let config = new Config();
let data ,html ;

var $mainStory = $("#main-article");
$mainStory.empty();

config.getData().then(function succss(data) {
	// data  = JSON.parse(data);
	$mainStory.append(article(data));

	let grayHeader = $("#header-image");
	let headTitle = $('.headeronetitle');
	let colorHeader =  $(".chapter02");
	let slideContainer =  $(".slideContainer");
	let divideLine = $('.divide');
	let fadeInEles = $('.fade-in');
	let beftorloadedImages = [grayHeader,colorHeader];

	loaded_len = beftorloadedImages.length,
	slideContainer.reveal();

	for(let i=0; i < beftorloadedImages.length ; i++){
		let src_color = beftorloadedImages[i].css('background-image');
		if(src_color.indexOf('url') == -1){
			loaded_len -= 1; 
			continue;
		}else{
			let url_color = src_color.match(/\((.*?)\)/)[1].replace(/('|")/g,'');
			console.log(url_color)
			let img = new Image();
			img.src = url_color;

			if (img.complete) {
				checkLoaded();
			}else{
				img.onload = function() {
				    checkLoaded();
				}
			}
		}	
	}

	load.loadImgs('.preload', function(){
		console.log('====images loaded======');
	});

	function checkLoaded() {
		loaded_count ++;
		console.log(loaded_len)
		if(loaded_count >= loaded_len){
			console.log('---background-image---loaded----');
			startIntroAni();
			// load.loadImgs('.preload0', startIntroAni);
		}
	}
	function startIntroAni() {
		colorHeader.addClass("loaded");
		fadeInEles.addClass("ani");
	}
})

export function init() {
    console.log('-----init-------');
}
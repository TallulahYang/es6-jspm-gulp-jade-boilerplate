import platform from './device';
import $ from 'jquery';

let body = $("#bodyonline");
if(platform.isDesktop){
	body.addClass('desktop');
}else{
	body.addClass('mobile');
}

import * as load from './loadImg';
import reveal from './reveal';

let grayHeader = $("#header-image");
let headTitle = $('.headeronetitle');
let colorHeader =  $(".chapter02");
let slideContainer =  $(".slideContainer");
let divideLine = $('.divide');
let fadeInEles = $('.fade-in');
let beftorloadedImages = [grayHeader,colorHeader];
let loaded_count = 0,
	loaded_len = beftorloadedImages.length,
	headHeight = 0;

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
	// headHeight = headTitle.outerHeight();
	// if(loaded_len==1){
	// 	// just has one color header and no gray
	// 	colorHeader.css('position','relative');
	// 	colorHeader.css('height', headHeight + 'px');	
	// 	setTimeout(function() { 
	// 		colorHeader.css('position','absolute');
	// 		headTitle.css('position','relative');
	// 	}, 1500);

	// }else{
		colorHeader.addClass("loaded");
		// colorHeader.animate({height:"100%"}, 1200 , 'linear' ,function() {
		// 	divideLine.addClass("hide"); 
		// });
	// }
	fadeInEles.addClass("ani");
}

load.loadImgs('.preload', function(){
	console.log('====others images loaded========');
	// $('.slideContainer').reveal();
});

export function init() {
    console.log('-----init-------');
}
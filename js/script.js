

$(function () {
  $('body').fadeIn(100)

  const mySwiper = new Swiper('.swiper-container', { /* varからconstへ変更した */
    // Optional parameters
    loop: true,  //ループ可能（ループモードを有効に）
    slidesPerView: 3,  //スライドを2つ（分）表示

    autoplay: {
      delay: 10000, /* ページ送り速度4000で４秒 */
    },

    pagination: {  //ページネーションを表示
      el: '.swiper-pagination',
      clickable: true,  //アイコンをクリックすると対応するスライドに移動
    },
    navigation: {  //ナビゲーションボタンを表示
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  })

  // masonry//
  var $container = $('#container');      // 並び替える要素を内包するブロック要素
  $container.imagesLoaded(function () {
    var min_width = 100;
    ww = $(window).width();
    var cw = 86;
    if (ww < 1441) { cw = 86; } //幅により columnWidth を変更 
    if (ww < 1367) { cw = 80; }
    if (ww < 1113) { cw = 86; }   
    if (ww < 1025) { cw = 80; }
    if (ww < 897) { cw = 70; }
    if (ww < 835) { cw = 68; }
    if (ww < 769) { cw = 63; }
    if (ww < 737) { cw = 60; }
    if (ww < 668) { cw = 55; }
    if (ww < 415) { cw = 45; }
    if (ww < 376) { cw = 25; }

    
    
    $('#container').masonry({
      itemSelector: '.item',
      columnWidth: cw,
      isAnimated: true,
      isFitWidth: true,
      isRTL: false,
      isResizable: true
    });
  });
  // masonry end//

  //--- infinitescroll ---//
  $(window).load(function() {
		$('#drawer-navigation').fadeIn(1000); 
    });

    $container.infinitescroll({
      navSelector: '.navigation',    // 次ページへのリンクを内包する要素
      nextSelector: '.navigation a',  // 次ページへのリンク要素
      itemSelector: '.wrapper',  //表示要素指定
      animate: true, //アニメーション処理
      extraScrollPx: - 0, //ページ読み込み後に移動する距離（px）
      bufferPx: 10,//次コンテンツタイミング指定
      pixelsFromNavToBottom: 500, // スクロール位置が、ページ下端からどれくらい距離で読み込みを開始するか 大きくすると早く読み込み開始
      loading: {
        // finishedMsg: 'All Loaded',   // 読み込み終了後に表示される文字列
        // finished: undefined,
        img: 'img.sam/ajax-loader.gif',  // ローディング画像
      },
    },
    
    function (newElements) {
      var $newElems = $(newElements);
      $(newElements).hide().delay(30).fadeIn(1500); /* fadeinは表示されるまでの時間 1000から変更 */
      $newElems.imagesLoaded(function () {
        $container.masonry('appended', $newElems, true);
      });
    });
  });
  //--- infinitescroll end---//
  
  
  // fancybox//
  //消すと連続で移動できない
  (function ($, F) {
    F.transitions.resizeIn = function () {
      var previous = F.previous,
      current = F.current,
      startPos = previous.wrap.stop(true).position(),
      endPos = $.extend({ opacity: 1 }, current.pos);
      startPos.width = previous.wrap.width();
      startPos.height = previous.wrap.height();
      previous.wrap.stop(true).trigger('onReset').remove();
      delete endPos.position;
      current.inner.hide();
      current.wrap.css(startPos).animate(endPos, {
        duration: current.nextSpeed,
        easing: current.nextEasing,
        step: F.transitions.step,
        complete: function () {
          F._afterZoomIn();
          current.inner.fadeIn("fast");
        }
      });
    };
  }(jQuery, jQuery.fancybox));
  // 消すと拡大後の移動できない
  jQuery(function ($) {
    $(".item").fancybox({
      nextMethod: 'resizeIn',
      nextSpeed: 250,
      prevMethod: false
    });
  });
  // fancybox//



  // ローディングアニメーション //
  //消すとロード時レイアウト一瞬崩れる
  $(function () {
    var h = $(window).height();
    $('#wrap').css('display', 'none');
    $('#loader-bg ,#loader').height(h).css('display', 'block');
  });
  //ローディングアニメーション 全ての読み込みが完了したら実行//
  $(window).load(function () {
    $('#loader-bg').delay(900).fadeOut(800);
    $('#loader').delay(600).fadeOut(300);
    $('#wrap').css('display', 'block');
  });
  //10秒たったら強制的にロード画面を非表示
  $(function () {
    setTimeout('stopload()', 4000);
  });
  function stopload() {
    $('#wrap').css('display', 'block');
    $('#loader-bg').delay(900).fadeOut(800);
    $('#loader').delay(600).fadeOut(300);
  }
  // ローディングアニメーション end//

  // 上に戻るスピード設定//
  jQuery(document).ready(function () {
    var offset = 100;
    var duration = 500;
    jQuery(window).scroll(function () {
      if (jQuery(this).scrollTop() > offset) {
        jQuery('#pagetop').fadeIn(duration);
      } else {
        jQuery('#pagetop').fadeOut(duration);
      }
    });
    
    jQuery('#pagetop').click(function (event) {
      event.preventDefault();
      jQuery('html, body').animate({ scrollTop: 0 }, duration);
      return false;
    })
  });
  // 上に戻るスピード設定 end//
  
  $(function () {
    $('#layer_board_area').layerBoard({
      delayTime: 200,		//表示までの待ち時間
      fadeTime: 500,		//表示開始から表示しきるまでの時間
      alpha: 0.8,		//背景レイヤーの透明度
      limitMin: 1,		//何分経過後に再度表示するか/分（0で再表示なし）
      easing: 'linear',		//イージング
      limitCookie: 0,	//cookie保存期間/日（0で開くたび毎回表示される）
      countCookie: 1000	//何回目のアクセスまで適用するか(cookie保存期間でリセット)
    });
  })
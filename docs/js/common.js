'use strict';

//Main JQuery
$(function(){

    nav();
    mobileLogo();
    mobileTable();

    //Navigation
    function nav() {
        var navMenuArr = [];
        $('.nav__item a').each(function(){
            navMenuArr.push(this);
        });

        navMenuArr.forEach(function(el, i, ar){
            $(ar[0]).addClass('nav__focused');
            $('.content__item').eq(0).css('display', 'table');

            $(el).focus(function(){
                $(ar).removeClass('nav__focused');
                $(ar[i]).addClass('nav__focused');
                $('.content__item').css('display', 'none');
                $('.content__item').eq(i).css('display', 'table');
            });
        });
    }

    //Logo, works first
    function mobileLogo() {
        //cl%2 Click even
        if($(window).width() <= 1150 || cl%2 ) {
            var logo = $('.sidebar__logo').text().slice(0, 1);
            $('.sidebar__logo').text(logo).css('text-align','center');
        } else {
            $('.sidebar__logo').text('Company').css('text-align','left');
        }
    }
    
    //Custom Table
    function mobileTable() {

        if(window.matchMedia("(max-width: 950px)").matches) {

            if($('[data-th]').length == 0) {
                
                var thArr = [], 
                    thArrAll = [],
                    tdArr = [],
                    th = $('.table__thead th'),
                    td = $('.table__tbody tr td'),
                    thTd = $('<th></th>'),
                    tr = $('.table__tbody > tr'),
                    tdArr = [];

                $('.table__thead').css('display', 'none');
                thTd.attr('data-th','').css('text-align', 'center');
                tr.find('td').wrap('<tr></tr>').before(thTd);
                tr.wrapInner('<td></td>');

                $(th).each(function() {
                    thArr.push($(this).text());
                });
                
                $('[data-th = ""]').each(function(){
                    tdArr.push($(this));
                    $(this).css({'font-family': "lato-bold-webfont", 'text-transform': 'uppercase', 
                                'font-size': '12px'});
                    $(this).parent().css({'display':'flex', 'justify-content':'space-between',
                                        'align-items': 'center','border-bottom': '1px solid #e8e8e8'});
                });

                var count = tdArr.length / thArr.length;
                for(var c = 1; c < count + 1; c++) {
                    thArr.forEach(function(el, i){
                    thArrAll.push(el);
                    });
                }

                    tdArr.forEach(function(data, j){
                        $(tdArr[j]).text(thArrAll[j]);
                });

                td.each(function(){
                    if(td.text()) {
                        td.css({'text-align': 'center'});
                    }
                });
            } 
        } else {
            $('.table__thead').css('display', 'table-header-group');
            $('[data-th]').parent().unwrap();
            $('[data-th]').unwrap().remove();
        }
    }

    //Sidebar Start Position
    function sidebarStartPosAnim() {
        $('.sidebar').animate({'width': '31.4rem'}, 'slow');
        $('.topbar').animate({'margin-left': '31.4rem'}, 'slow')
                    .css({'width':'calc(100% - 31.4rem - 6rem)', 'max-width': 'calc(1052px - 6rem)'});
        $('.content').animate({'margin-left': '31.4rem'}, 'slow')
                     .css({'width':'calc(100% - 31.4rem)', 'max-width': '1052px'});
        $('.user__photo').css('margin-right', '2.1rem');
        $('.dashboard__header').css({'text-align': 'left', 'padding': '2rem 4.5rem 2rem 2.2rem'});
    }

    function sidebarStartPosFade() {
        $('.user__about').show();
        $('.sidebar__h2').show();
        $('.dashboard__header span').show();
        $('.dashboard__header').removeClass('after-hide');
        $('.links__item span').show();
    }

    //Sidebar Second Position
    function sidebarSecondPos() {
        $('.user__about').hide();
        $('.sidebar__h2').hide();
        $('.dashboard__header span').hide();
        $('.dashboard__header').addClass('after-hide');
        $('.dashboard__items').hide();
        $('.links__item span').hide();

        $('.topbar').animate({'margin-left': '12rem'}, 'slow')
                    .css({'width':'calc(100% - 12rem - 6rem)', 'max-width': 'calc(1247px - 6rem)'});
        $('.content').animate({'margin-left': '12rem'}, 'slow')
                     .css({'width':'calc(100% - 12rem)', 'max-width': '1247px'});
        $('.sidebar').animate({'width': '12rem'}, 'slow');
        $('.user__photo').css('margin-right', '0');
        $('.dashboard__header').css({'text-align': 'center', 'padding': '2rem 4rem 2rem calc(4rem - 8px)'});
    }

    //Custom Select Library
    $('select').each(function() {
        var $this = $(this), numberOfOptions = $(this).children('option').length;
    
        $this.addClass('select-hidden'); 
        $this.wrap('<div class="select"></div>');
        $this.after('<div class="select-styled"></div>');

        var $styledSelect = $this.next('div.select-styled');
        $styledSelect.text($this.children('option').eq(0).text());
    
        var $list = $('<ul />', {
            'class': 'select-options'
        }).insertAfter($styledSelect);
    
        for (var i = 0; i < numberOfOptions; i++) {
            $('<li />', {
                text: $this.children('option').eq(i).text(),
                rel: $this.children('option').eq(i).val()
            }).appendTo($list);
        }
    
        var $listItems = $list.children('li');
    
        $styledSelect.click(function(e) {
            e.stopPropagation();
            $('div.select-styled.active').not(this).each(function(){
                $(this).removeClass('active').next('ul.select-options').hide();
            });
            $(this).toggleClass('active').next('ul.select-options').toggle();
        });
    
        $listItems.click(function(e) {
            e.stopPropagation();
            $styledSelect.text($(this).text()).removeClass('active');
            $this.val($(this).attr('rel'));
            $list.hide();
        });
    
        $(document).click(function() {
            $styledSelect.removeClass('active');
            $list.hide();
        });

    }); 

    //Hover Sidebar
    $('.sidebar').hover(function() {
        mobileLogo();

        if (window.matchMedia("(min-width: 769px)").matches && $('.sidebar').attr('data-toggle') !== undefined) {
            sidebarStartPosAnim();
            sidebarStartPosFade();
        }
        }, function() {
        if (window.matchMedia("(min-width: 769px)").matches && $('.sidebar').attr('data-toggle') !== undefined) {
            sidebarSecondPos();
            mobileLogo();
        }
    });

    //Window resize Table
    $(window).on('resize', function() {

        mobileLogo();
        mobileTable();

        if (window.matchMedia("(min-width: 769px)").matches) {
            $('.content').css('padding-top', 'calc(80px + 2.3rem)');
            $('.topbar').show();
            if($('.sidebar').attr('data-toggle') == undefined) {
                sidebarStartPosFade();
                cl = 0;
            }
        } 
        else {
            $('.dashboard__items').hide();
            $('.sidebar').removeAttr('data-toggle');
            $('.sidebar').removeAttr('style');
            $('.topbar').removeAttr('style');
            $('.content').removeAttr('style');
            $('.dashboard__header').removeAttr('style');
        }
    });

    //Toggle icon
    var cl = 0; //Click Counter
    $('.topbar__icon').click(function() {
        cl++;
        mobileLogo();
        
        if(cl%2) {
            $('.sidebar').attr('data-toggle','');
        } else {
            $('.sidebar').removeAttr('data-toggle','');
        }

        if($('.sidebar').attr('data-toggle') !== undefined){
            sidebarSecondPos();
        } else {
            sidebarStartPosAnim();
            sidebarStartPosFade();
        }
    });

    //Toggle Dashboard
    var tD = 0;
    $('.dashboard__header').on('click' ,function() {
        $(this).next().slideToggle();
        if (window.matchMedia("(max-width: 768px)").matches) {
            $('.topbar').slideToggle();
            if( tD == 0) {
                $('.content').animate({'padding-top':'237px'});
                tD = 1;
            } else {
                $('.content').animate({'padding-top':'160px'});
                tD = 0;
            }
        }        
    });  
    
    //Select Dashboard
    $('.dashboard__item').on('click' ,function() {
        tD = 0;
        $(this).parent().hide();
        $('.dashboard__header span').text($(this).text());

        if(window.matchMedia("(max-width: 768px)").matches) {
            $('.content').animate({'padding-top':'160px'});
            $('.topbar').toggle();
        }
    });

});



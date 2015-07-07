/**
 * Created by Administrator on 2015/3/25.
 */
(function($) {
    var EventsList = function(element, options) {
        var $main = $('#wrapper');
        var $list = $main.find('#events-app');
        var $pullDown = $main.find('#pull-down');
        var $pullDownLabel = $main.find('#pull-down-label');
        var $pullUp = $main.find('#pull-up');
        var topOffset = -$pullDown.outerHeight();

        this.compiler = Handlebars.compile($('#tpi-app-item').html());
        this.prev = this.next = this.start = options.params.start;
        this.total = null;

        this.getURL = function(params) {
            var queries = ['callback=?'];
            for (var key in  params) {
                if (key !== 'start') {
                    queries.push(key + '=' + params[key]);
                }
            }
            queries.push('start=');
            return options.api + '?' + queries.join('&');
        };

        this.renderList = function(start, type) {
            var _this = this;
            var $el = $pullDown;

            if (type === 'load') {
                $el = $pullUp;
            }

            $.getJSON(this.URL + start).then(function(data) {
                console.log(data);
                _this.total = data.total;
                var html = _this.compiler(data.events);
                if (type === 'refresh') {
                    $list.children('li').first().before(html);
                } else if (type === 'load') {
                    $list.append(html);
                } else {
                    $list.html(html);
                }

                // refresh iScroll
                setTimeout(function() {
                    _this.iScroll.refresh();
                }, 100);
            }, function() {
                console.log('Error...')
            }).always(function() {
                _this.resetLoading($el);
                if (type !== 'load') {
                    _this.iScroll.scrollTo(0, topOffset, 800, $.AMUI.iScroll.utils.circular);
                }
            });
        };

        this.setLoading = function($el) {
            $el.addClass('loading');
        };

        this.resetLoading = function($el) {
            $el.removeClass('loading');
        };

        this.init = function() {
            var myScroll = this.iScroll = new $.AMUI.iScroll('#wrapper', {});
            // myScroll.scrollTo(0, topOffset);
            var _this = this;
            var pullFormTop = false;
            var pullStart;

            this.URL = this.getURL(options.params);
            this.renderList(options.params.start);

            myScroll.on('scrollStart', function() {
                if (this.y >= topOffset) {
                    pullFormTop = true;
                }

                pullStart = this.y;
                // console.log(this);
            });

            myScroll.on('scrollEnd', function() {
                if (pullFormTop && this.directionY === -1) {
                    _this.handlePullDown();
                }
                pullFormTop = false;

                // pull up to load more
                if (pullStart === this.y && (this.directionY === 1)) {
                    _this.handlePullUp();
                }
            });
        };

        this.handlePullDown = function() {
            console.log('handle pull down');
            if (this.prev > 0) {
                this.setLoading($pullDown);
                this.prev -= options.params.count;
                this.renderList(this.prev, 'refresh');
            } else {
                console.log('别刷了，没有了');
            }
        };

        this.handlePullUp = function() {
            console.log('handle pull up');
            if (this.next < this.total) {
                this.setLoading($pullUp);
                this.next += options.params.count;
                this.renderList(this.next, 'load');
            } else {
                console.log(this.next);
                // this.iScroll.scrollTo(0, topOffset);
            }
        }
    };

    $(function() {
        var app = new EventsList(null, {
            api: 'https://api.douban.com/v2/event/app',
            params: {
                start: 100,
                type: 'music',
                count: 10,
                loc: 'beijing'
            }
        });
        app.init();
    });

    document.addEventListener('touchmove', function(e) {
        e.preventDefault();
    }, false);
})(window.jQuery);
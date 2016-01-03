define(['jquery'], function ($) {

    String.prototype.trimEnd = function(c) {
        if (c)
            return this.replace(new RegExp(c.escapeRegExp() + "*$"), '');
        return this.replace(/\s+$/, '');
    };
    String.prototype.trimStart = function(c) {
        if (c)
            return this.replace(new RegExp("^" + c.escapeRegExp() + "*"), '');
        return this.replace(/^\s+/, '');
    };

    String.prototype.escapeRegExp = function() {
        return this.replace(/[.*+?^${}()|[\]\/\\]/g, "\\$0");
    };

    return {
        capitalizeFirstLetter: function(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        },

        getUrlEncodedKey: function(key, query) {
            if (!query)
                query = window.location.search;
            var re = new RegExp("[?|&]" + key + "=(.*?)&");
            var matches = re.exec(query + "&");
            if (!matches || matches.length < 2)
                return "";
            return decodeURIComponent(matches[1].replace("+", " "));
        },

        setUrlEncodedKey: function(key, value, query) {

            query = query || window.location.search;
            var q = query + "&";
            var re = new RegExp("[?|&]" + key + "=.*?&");
            if (!re.test(q))
                q += key + "=" + encodeURI(value);
            else
                q = q.replace(re, "&" + key + "=" + encodeURIComponent(value) + "&");
            q = q.trimStart("&").trimEnd("&");
            return q[0]=="?" ? q : q = "?" + q;
        },

        createCookie: function(name, value, days) {
            var expires;
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                expires = "; expires=" + date.toGMTString();
            } else {
                expires = "";
            }
            document.cookie = name + "=" + value + expires + "; path=/";
        },

        getCookie: function(c_name) {
            if (document.cookie.length > 0) {
                c_start = document.cookie.indexOf(c_name + "=");
                if (c_start != -1) {
                    c_start = c_start + c_name.length + 1;
                    c_end = document.cookie.indexOf(";", c_start);
                    if (c_end == -1) {
                        c_end = document.cookie.length;
                    }
                    return unescape(document.cookie.substring(c_start, c_end));
                }
            }
            return '';
        }
    }
});


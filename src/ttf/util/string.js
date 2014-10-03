/**
 * @file string.js
 * @author mengke01
 * @date 
 * @description
 * string������
 * 
 * see svg2ttf @ github
 */

define(
    function(require) {


        var string = {
            
            /**
             * ת����utf8���ֽ�����
             * 
             * @param {string} str �ַ���
             * @return {Array.<byte>} �ֽ�����
             */
            toUTF8Bytes: function(str) {
                // ��unicode����ת����js�ڲ�����
                str = decodeURIComponent(encodeURIComponent(str).replace(/%00([\x00-\x7f])/g, '$1'));
                var byteArray = [];
                for (var i = 0; i < str.length; i++) {
                    if (str.charCodeAt(i) <= 0x7F) {
                        byteArray.push(str.charCodeAt(i));
                    }
                    else {
                        var h = encodeURIComponent(str.charAt(i)).slice(1).split('%');
                        for (var j = 0; j < h.length; j++) {
                            byteArray.push(parseInt(h[j], 16));
                        }
                    }
                }
                return byteArray;
            },

            /**
             * ת����usc2���ֽ�����
             * 
             * @param {string} str �ַ���
             * @return {Array.<byte>} �ֽ�����
             */
            toUCS2Bytes: function(str) {
                str = decodeURIComponent(encodeURIComponent(str).replace(/%00([\x00-\x7f])/g, '$1'));
                // Code is taken here:
                // http://stackoverflow.com/questions/6226189/how-to-convert-a-string-to-bytearray
                var byteArray = [];
                var ch;

                for (var i = 0; i < str.length; ++i) {
                    ch = str.charCodeAt(i);
                    byteArray.push(ch >> 8);
                    byteArray.push(ch & 0xFF);
                }

                return byteArray;
            },
            
            /**
             * ��ȡ pascal string
             * 
             * @param {Array.<byte>} byteArray byte����
             * @return {Array.<string>} ��ȡ����ַ�������
             */
            readPascalString: function (byteArray) {
                var strArray = [];
                var i = 0;
                var l = byteArray.length;
                while(i < l) {
                    var strLength = byteArray[i++];
                    var str = '';
                    while(strLength-- > 0 && i < l) {
                        str += String.fromCharCode(byteArray[i++]);
                    }
                    strArray.push(str);
                }
                return strArray;
            },

            /**
             * ��ȡpascal string �ֽ�����
             * 
             * @return {Array.<byte>} byteArray byte����
             */
            getPascalStringBytes: function(str) {
                var bytes = [];
                var length = str ? (str.length < 256 ? str.length : 255) : 0;
                bytes.push(length);
                for (var i = 0; i < length; i ++) {
                    var c = str.charCodeAt(i);
                    bytes.push(c < 128 ? c : 42); //non-ASCII characters are substituted with '*'
                }
              return bytes;
            }

        };

        return string;
    }
);
namespace WebAtoms {
    export class AtomUI {

        static parseValue(val:any):any {
            var n:any;
            if (/^[0-9]+$/.test(val)) {
                n = parseInt(val, 10);
                if (!isNaN(n)) {
                    val = n;
                }
                return val;
            }
            if (/^[0-9]+\.[0-9]+/gi.test(val)) {
                n = parseFloat(val);
                if (!isNaN(n)) {
                    val = n;
                }
                return val;
            }

            if (/true/.test(val)) {
                val = true;
                return val;
            }
            if (/false/.test(val)) {
                val = false;
                return val;
            }
            return val;
        }

        static parseUrl(url:string):any {
            var r:any = {};

            var plist:string[] = url.split("&");


            for(var token of plist) {
                var p:string[] = token.split("=");
                var key:string = p[0];
                var val:string = p[1];
                if (val) {
                    val = decodeURIComponent(val);
                }
                val = AtomUI.parseValue(val);
                r[key] = val;
            }
            return r;
        }
    }
}
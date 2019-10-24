class load_typescript {
    constructor(config) {
        this._ts_config = config;
        this._ts_config.target =
            this._ts_config.target || this._check_version();

        this._res_file();
    }
    _(id) {
        return document.querySelector("#" + id);
    }
    _ajax(method, url) {
        return new Promise((resolve, reject) => {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4 && this.status == 200) {
                    resolve(`${this.responseText}`);
                }
            };
            xhttp.open(method, url, true);
            xhttp.send();
        });
    }
    _res_file() {
        for (let i of this._ts_config.ts_file) {
            let link_url = this._ts_config.fetch_url + "?q=" + i;

            let _ts_file = this._ajax("POST", link_url);

            _ts_file.then((file) => {
                let transpile_js = this._compile(file);

                this._update_dom(transpile_js.outputText);
            });
        }
    }
    _compile(source) {
        let _result = ts.transpileModule(source, {
            compilerOptions: {
                module: ts.ModuleKind.CommonJS,
                target: this._ts_config.target
            }
        });
        return _result;
    }
    _update_dom(transpile_js) {
        let id = this._(this._ts_config.inject_id);

        let scri = document.createElement("script");

        scri.type = "text/javascript";
        scri.innerHTML = transpile_js;

        id.appendChild(scri);
    }
    _check_version() {
        let target = "";

        let test_script = `return () => {
            class Test {
                constructor(){

                }
                get() {
                    return () => true
                }
            }
            let T = new Test()

            let ret = T.get()

            return ret()
        }`;

        try {
            let y = new Function(test_script);
            let flag = y();

            if (flag() == true) {
                target = "es6";
            }
        } catch (err) {
            target = "es5";
        }

        return target;
    }
}

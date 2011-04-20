
(function() {;
    var namespace = this;
    namespace = namespace.Fargo = namespace.Fargo || {};
    if (typeof exports === "object") {
        exports.Fargo = this.Fargo;
    }
})();

Fargo.Scheme = new JS.Module("Fargo.Scheme", {
    root: "program",
    __consume__program: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.program = this._nodeCache.program || {};
        var cached = this._nodeCache.program[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        var index2 = this._offset;
        address1 = this.__consume__shebang();
        if (address1) {
        } else {
            this._offset = index2;
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("", this._offset, []);
            this._offset += 0;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address2 = null;
            var remaining0 = 0;
            var index3 = this._offset;
            var elements1 = [];
            var text1 = "";
            var address3 = true;
            while (address3) {
                address3 = this.__consume__cell();
                if (address3) {
                    elements1.push(address3);
                    text1 += address3.textValue;
                    remaining0 -= 1;
                }
            }
            if (remaining0 <= 0) {
                this._offset = index3;
                var klass1 = this.klass.SyntaxNode;
                address2 = new klass1(text1, this._offset, elements1);
                this._offset += text1.length;
            } else {
                address2 = null;
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
            } else {
                elements0 = null;
                this._offset = index1;
            }
        } else {
            elements0 = null;
            this._offset = index1;
        }
        if (elements0) {
            this._offset = index1;
            var klass2 = null;
            if (Fargo.Scheme.Program instanceof Function) {
                klass2 = Fargo.Scheme.Program;
            } else {
                klass2 = this.klass.SyntaxNode;
            }
            address0 = new klass2(text0, this._offset, elements0, labelled0);
            if (!(Fargo.Scheme.Program instanceof Function)) {
                address0.extend(Fargo.Scheme.Program);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.program[index0] = address0;
    },
    __consume__shebang: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.shebang = this._nodeCache.shebang || {};
        var cached = this._nodeCache.shebang[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        var remaining0 = 0;
        var index2 = this._offset;
        var elements1 = [];
        var text1 = "";
        var address2 = true;
        while (address2) {
            address2 = this.__consume__space();
            if (address2) {
                elements1.push(address2);
                text1 += address2.textValue;
                remaining0 -= 1;
            }
        }
        if (remaining0 <= 0) {
            this._offset = index2;
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0(text1, this._offset, elements1);
            this._offset += text1.length;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address3 = null;
            if (this._input.substring(this._offset, this._offset + 2) === "#!") {
                var klass1 = this.klass.SyntaxNode;
                address3 = new klass1("#!", this._offset, []);
                this._offset += 2;
            } else {
                address3 = null;
            }
            if (address3) {
                elements0.push(address3);
                text0 += address3.textValue;
                var address4 = null;
                var remaining1 = 0;
                var index3 = this._offset;
                var elements2 = [];
                var text2 = "";
                var address5 = true;
                while (address5) {
                    var index4 = this._offset;
                    var elements3 = [];
                    var labelled1 = {};
                    var text3 = "";
                    var address6 = null;
                    var index5 = this._offset;
                    var temp0 = this._input.substring(this._offset, this._offset + 1);
                    var match0 = null;
                    if (match0 = temp0.match(/^[\n\r]/)) {
                        var klass2 = this.klass.SyntaxNode;
                        address6 = new klass2(match0[0], this._offset, []);
                        this._offset += 1;
                    } else {
                        address6 = null;
                    }
                    this._offset = index5;
                    if (!(address6)) {
                        var klass3 = this.klass.SyntaxNode;
                        address6 = new klass3("", this._offset, []);
                        this._offset += 0;
                    } else {
                        address6 = null;
                    }
                    if (address6) {
                        elements3.push(address6);
                        text3 += address6.textValue;
                        var address7 = null;
                        var temp1 = this._input.substring(this._offset, this._offset + 1);
                        if (temp1 === "") {
                            address7 = null;
                        } else {
                            var klass4 = this.klass.SyntaxNode;
                            address7 = new klass4(temp1, this._offset, []);
                            this._offset += 1;
                        }
                        if (address7) {
                            elements3.push(address7);
                            text3 += address7.textValue;
                        } else {
                            elements3 = null;
                            this._offset = index4;
                        }
                    } else {
                        elements3 = null;
                        this._offset = index4;
                    }
                    if (elements3) {
                        this._offset = index4;
                        var klass5 = this.klass.SyntaxNode;
                        address5 = new klass5(text3, this._offset, elements3, labelled1);
                        this._offset += text3.length;
                    } else {
                        address5 = null;
                    }
                    if (address5) {
                        elements2.push(address5);
                        text2 += address5.textValue;
                        remaining1 -= 1;
                    }
                }
                if (remaining1 <= 0) {
                    this._offset = index3;
                    var klass6 = this.klass.SyntaxNode;
                    address4 = new klass6(text2, this._offset, elements2);
                    this._offset += text2.length;
                } else {
                    address4 = null;
                }
                if (address4) {
                    elements0.push(address4);
                    text0 += address4.textValue;
                } else {
                    elements0 = null;
                    this._offset = index1;
                }
            } else {
                elements0 = null;
                this._offset = index1;
            }
        } else {
            elements0 = null;
            this._offset = index1;
        }
        if (elements0) {
            this._offset = index1;
            var klass7 = this.klass.SyntaxNode;
            address0 = new klass7(text0, this._offset, elements0, labelled0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.shebang[index0] = address0;
    },
    __consume__cell: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.cell = this._nodeCache.cell || {};
        var cached = this._nodeCache.cell[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var index2 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        address1 = this.__consume__ignore();
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            labelled0.ignore = address1;
            var address2 = null;
            address2 = this.__consume__quote();
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                labelled0.quote = address2;
                var address3 = null;
                address3 = this.__consume__cell();
                if (address3) {
                    elements0.push(address3);
                    text0 += address3.textValue;
                    labelled0.cell = address3;
                } else {
                    elements0 = null;
                    this._offset = index2;
                }
            } else {
                elements0 = null;
                this._offset = index2;
            }
        } else {
            elements0 = null;
            this._offset = index2;
        }
        if (elements0) {
            this._offset = index2;
            var klass0 = this.klass.SyntaxNode;
            address0 = new klass0(text0, this._offset, elements0, labelled0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        if (address0) {
        } else {
            this._offset = index1;
            var index3 = this._offset;
            var elements1 = [];
            var labelled1 = {};
            var text1 = "";
            var address4 = null;
            address4 = this.__consume__ignore();
            if (address4) {
                elements1.push(address4);
                text1 += address4.textValue;
                labelled1.ignore = address4;
                var address5 = null;
                var index4 = this._offset;
                address5 = this.__consume__list();
                if (address5) {
                } else {
                    this._offset = index4;
                    address5 = this.__consume__vector();
                    if (address5) {
                    } else {
                        this._offset = index4;
                        address5 = this.__consume__atom();
                        if (address5) {
                        } else {
                            this._offset = index4;
                        }
                    }
                }
                if (address5) {
                    elements1.push(address5);
                    text1 += address5.textValue;
                    var address6 = null;
                    address6 = this.__consume__ignore();
                    if (address6) {
                        elements1.push(address6);
                        text1 += address6.textValue;
                        labelled1.ignore = address6;
                    } else {
                        elements1 = null;
                        this._offset = index3;
                    }
                } else {
                    elements1 = null;
                    this._offset = index3;
                }
            } else {
                elements1 = null;
                this._offset = index3;
            }
            if (elements1) {
                this._offset = index3;
                var klass1 = null;
                if (Fargo.Scheme.Cell instanceof Function) {
                    klass1 = Fargo.Scheme.Cell;
                } else {
                    klass1 = this.klass.SyntaxNode;
                }
                address0 = new klass1(text1, this._offset, elements1, labelled1);
                if (!(Fargo.Scheme.Cell instanceof Function)) {
                    address0.extend(Fargo.Scheme.Cell);
                }
                this._offset += text1.length;
            } else {
                address0 = null;
            }
            if (address0) {
            } else {
                this._offset = index1;
            }
        }
        return this._nodeCache.cell[index0] = address0;
    },
    __consume__quote: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.quote = this._nodeCache.quote || {};
        var cached = this._nodeCache.quote[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        if (this._input.substring(this._offset, this._offset + 1) === "'") {
            var klass0 = this.klass.SyntaxNode;
            address0 = new klass0("'", this._offset, []);
            this._offset += 1;
        } else {
            address0 = null;
        }
        if (address0) {
        } else {
            this._offset = index1;
            if (this._input.substring(this._offset, this._offset + 1) === "`") {
                var klass1 = this.klass.SyntaxNode;
                address0 = new klass1("`", this._offset, []);
                this._offset += 1;
            } else {
                address0 = null;
            }
            if (address0) {
            } else {
                this._offset = index1;
                if (this._input.substring(this._offset, this._offset + 2) === ",@") {
                    var klass2 = this.klass.SyntaxNode;
                    address0 = new klass2(",@", this._offset, []);
                    this._offset += 2;
                } else {
                    address0 = null;
                }
                if (address0) {
                } else {
                    this._offset = index1;
                    if (this._input.substring(this._offset, this._offset + 1) === ",") {
                        var klass3 = this.klass.SyntaxNode;
                        address0 = new klass3(",", this._offset, []);
                        this._offset += 1;
                    } else {
                        address0 = null;
                    }
                    if (address0) {
                    } else {
                        this._offset = index1;
                    }
                }
            }
        }
        return this._nodeCache.quote[index0] = address0;
    },
    __consume__list: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.list = this._nodeCache.list || {};
        var cached = this._nodeCache.list[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 1) === "(") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("(", this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address2 = null;
            address2 = this.__consume__cells();
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                labelled0.cells = address2;
                var address3 = null;
                if (this._input.substring(this._offset, this._offset + 1) === ")") {
                    var klass1 = this.klass.SyntaxNode;
                    address3 = new klass1(")", this._offset, []);
                    this._offset += 1;
                } else {
                    address3 = null;
                }
                if (address3) {
                    elements0.push(address3);
                    text0 += address3.textValue;
                } else {
                    elements0 = null;
                    this._offset = index1;
                }
            } else {
                elements0 = null;
                this._offset = index1;
            }
        } else {
            elements0 = null;
            this._offset = index1;
        }
        if (elements0) {
            this._offset = index1;
            var klass2 = null;
            if (Fargo.Scheme.List instanceof Function) {
                klass2 = Fargo.Scheme.List;
            } else {
                klass2 = this.klass.SyntaxNode;
            }
            address0 = new klass2(text0, this._offset, elements0, labelled0);
            if (!(Fargo.Scheme.List instanceof Function)) {
                address0.extend(Fargo.Scheme.List);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.list[index0] = address0;
    },
    __consume__cells: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.cells = this._nodeCache.cells || {};
        var cached = this._nodeCache.cells[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var index2 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        var remaining0 = 1;
        var index3 = this._offset;
        var elements1 = [];
        var text1 = "";
        var address2 = true;
        while (address2) {
            address2 = this.__consume__cell();
            if (address2) {
                elements1.push(address2);
                text1 += address2.textValue;
                remaining0 -= 1;
            }
        }
        if (remaining0 <= 0) {
            this._offset = index3;
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0(text1, this._offset, elements1);
            this._offset += text1.length;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address3 = null;
            if (this._input.substring(this._offset, this._offset + 1) === ".") {
                var klass1 = this.klass.SyntaxNode;
                address3 = new klass1(".", this._offset, []);
                this._offset += 1;
            } else {
                address3 = null;
            }
            if (address3) {
                elements0.push(address3);
                text0 += address3.textValue;
                var address4 = null;
                address4 = this.__consume__space();
                if (address4) {
                    elements0.push(address4);
                    text0 += address4.textValue;
                    labelled0.space = address4;
                    var address5 = null;
                    address5 = this.__consume__cell();
                    if (address5) {
                        elements0.push(address5);
                        text0 += address5.textValue;
                        labelled0.cell = address5;
                    } else {
                        elements0 = null;
                        this._offset = index2;
                    }
                } else {
                    elements0 = null;
                    this._offset = index2;
                }
            } else {
                elements0 = null;
                this._offset = index2;
            }
        } else {
            elements0 = null;
            this._offset = index2;
        }
        if (elements0) {
            this._offset = index2;
            var klass2 = this.klass.SyntaxNode;
            address0 = new klass2(text0, this._offset, elements0, labelled0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        if (address0) {
        } else {
            this._offset = index1;
            var remaining1 = 0;
            var index4 = this._offset;
            var elements2 = [];
            var text2 = "";
            var address6 = true;
            while (address6) {
                address6 = this.__consume__cell();
                if (address6) {
                    elements2.push(address6);
                    text2 += address6.textValue;
                    remaining1 -= 1;
                }
            }
            if (remaining1 <= 0) {
                this._offset = index4;
                var klass3 = this.klass.SyntaxNode;
                address0 = new klass3(text2, this._offset, elements2);
                this._offset += text2.length;
            } else {
                address0 = null;
            }
            if (address0) {
            } else {
                this._offset = index1;
            }
        }
        return this._nodeCache.cells[index0] = address0;
    },
    __consume__vector: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.vector = this._nodeCache.vector || {};
        var cached = this._nodeCache.vector[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 2) === "#(") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("#(", this._offset, []);
            this._offset += 2;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address2 = null;
            var remaining0 = 0;
            var index2 = this._offset;
            var elements1 = [];
            var text1 = "";
            var address3 = true;
            while (address3) {
                address3 = this.__consume__cell();
                if (address3) {
                    elements1.push(address3);
                    text1 += address3.textValue;
                    remaining0 -= 1;
                }
            }
            if (remaining0 <= 0) {
                this._offset = index2;
                var klass1 = this.klass.SyntaxNode;
                address2 = new klass1(text1, this._offset, elements1);
                this._offset += text1.length;
            } else {
                address2 = null;
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                var address4 = null;
                if (this._input.substring(this._offset, this._offset + 1) === ")") {
                    var klass2 = this.klass.SyntaxNode;
                    address4 = new klass2(")", this._offset, []);
                    this._offset += 1;
                } else {
                    address4 = null;
                }
                if (address4) {
                    elements0.push(address4);
                    text0 += address4.textValue;
                } else {
                    elements0 = null;
                    this._offset = index1;
                }
            } else {
                elements0 = null;
                this._offset = index1;
            }
        } else {
            elements0 = null;
            this._offset = index1;
        }
        if (elements0) {
            this._offset = index1;
            var klass3 = this.klass.SyntaxNode;
            address0 = new klass3(text0, this._offset, elements0, labelled0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.vector[index0] = address0;
    },
    __consume__atom: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.atom = this._nodeCache.atom || {};
        var cached = this._nodeCache.atom[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        address0 = this.__consume__datum();
        if (address0) {
        } else {
            this._offset = index1;
            address0 = this.__consume__symbol();
            if (address0) {
            } else {
                this._offset = index1;
            }
        }
        return this._nodeCache.atom[index0] = address0;
    },
    __consume__datum: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.datum = this._nodeCache.datum || {};
        var cached = this._nodeCache.datum[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        var index2 = this._offset;
        address1 = this.__consume__boolean();
        if (address1) {
        } else {
            this._offset = index2;
            address1 = this.__consume__number();
            if (address1) {
            } else {
                this._offset = index2;
                address1 = this.__consume__character();
                if (address1) {
                } else {
                    this._offset = index2;
                    address1 = this.__consume__string();
                    if (address1) {
                    } else {
                        this._offset = index2;
                    }
                }
            }
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address2 = null;
            var index3 = this._offset;
            var index4 = this._offset;
            var elements1 = [];
            var labelled1 = {};
            var text1 = "";
            var address3 = null;
            var index5 = this._offset;
            address3 = this.__consume__reserved();
            this._offset = index5;
            if (!(address3)) {
                var klass0 = this.klass.SyntaxNode;
                address3 = new klass0("", this._offset, []);
                this._offset += 0;
            } else {
                address3 = null;
            }
            if (address3) {
                elements1.push(address3);
                text1 += address3.textValue;
                var address4 = null;
                var temp0 = this._input.substring(this._offset, this._offset + 1);
                if (temp0 === "") {
                    address4 = null;
                } else {
                    var klass1 = this.klass.SyntaxNode;
                    address4 = new klass1(temp0, this._offset, []);
                    this._offset += 1;
                }
                if (address4) {
                    elements1.push(address4);
                    text1 += address4.textValue;
                } else {
                    elements1 = null;
                    this._offset = index4;
                }
            } else {
                elements1 = null;
                this._offset = index4;
            }
            if (elements1) {
                this._offset = index4;
                var klass2 = this.klass.SyntaxNode;
                address2 = new klass2(text1, this._offset, elements1, labelled1);
                this._offset += text1.length;
            } else {
                address2 = null;
            }
            this._offset = index3;
            if (!(address2)) {
                var klass3 = this.klass.SyntaxNode;
                address2 = new klass3("", this._offset, []);
                this._offset += 0;
            } else {
                address2 = null;
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
            } else {
                elements0 = null;
                this._offset = index1;
            }
        } else {
            elements0 = null;
            this._offset = index1;
        }
        if (elements0) {
            this._offset = index1;
            var klass4 = null;
            if (Fargo.Scheme.Datum instanceof Function) {
                klass4 = Fargo.Scheme.Datum;
            } else {
                klass4 = this.klass.SyntaxNode;
            }
            address0 = new klass4(text0, this._offset, elements0, labelled0);
            if (!(Fargo.Scheme.Datum instanceof Function)) {
                address0.extend(Fargo.Scheme.Datum);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.datum[index0] = address0;
    },
    __consume__boolean: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.boolean = this._nodeCache.boolean || {};
        var cached = this._nodeCache.boolean[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 1) === "#") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("#", this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address2 = null;
            var temp0 = this._input.substring(this._offset, this._offset + 1);
            var match0 = null;
            if (match0 = temp0.match(/^[tf]/)) {
                var klass1 = this.klass.SyntaxNode;
                address2 = new klass1(match0[0], this._offset, []);
                this._offset += 1;
            } else {
                address2 = null;
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
            } else {
                elements0 = null;
                this._offset = index1;
            }
        } else {
            elements0 = null;
            this._offset = index1;
        }
        if (elements0) {
            this._offset = index1;
            var klass2 = null;
            if (Fargo.Scheme.Boolean instanceof Function) {
                klass2 = Fargo.Scheme.Boolean;
            } else {
                klass2 = this.klass.SyntaxNode;
            }
            address0 = new klass2(text0, this._offset, elements0, labelled0);
            if (!(Fargo.Scheme.Boolean instanceof Function)) {
                address0.extend(Fargo.Scheme.Boolean);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.boolean[index0] = address0;
    },
    __consume__number: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.number = this._nodeCache.number || {};
        var cached = this._nodeCache.number[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        var index2 = this._offset;
        if (this._input.substring(this._offset, this._offset + 1) === "-") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("-", this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
        }
        if (address1) {
        } else {
            this._offset = index2;
            var klass1 = this.klass.SyntaxNode;
            address1 = new klass1("", this._offset, []);
            this._offset += 0;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address2 = null;
            var index3 = this._offset;
            if (this._input.substring(this._offset, this._offset + 1) === "0") {
                var klass2 = this.klass.SyntaxNode;
                address2 = new klass2("0", this._offset, []);
                this._offset += 1;
            } else {
                address2 = null;
            }
            if (address2) {
            } else {
                this._offset = index3;
                var index4 = this._offset;
                var elements1 = [];
                var labelled1 = {};
                var text1 = "";
                var address3 = null;
                var temp0 = this._input.substring(this._offset, this._offset + 1);
                var match0 = null;
                if (match0 = temp0.match(/^[1-9]/)) {
                    var klass3 = this.klass.SyntaxNode;
                    address3 = new klass3(match0[0], this._offset, []);
                    this._offset += 1;
                } else {
                    address3 = null;
                }
                if (address3) {
                    elements1.push(address3);
                    text1 += address3.textValue;
                    var address4 = null;
                    var remaining0 = 0;
                    var index5 = this._offset;
                    var elements2 = [];
                    var text2 = "";
                    var address5 = true;
                    while (address5) {
                        var temp1 = this._input.substring(this._offset, this._offset + 1);
                        var match1 = null;
                        if (match1 = temp1.match(/^[0-9]/)) {
                            var klass4 = this.klass.SyntaxNode;
                            address5 = new klass4(match1[0], this._offset, []);
                            this._offset += 1;
                        } else {
                            address5 = null;
                        }
                        if (address5) {
                            elements2.push(address5);
                            text2 += address5.textValue;
                            remaining0 -= 1;
                        }
                    }
                    if (remaining0 <= 0) {
                        this._offset = index5;
                        var klass5 = this.klass.SyntaxNode;
                        address4 = new klass5(text2, this._offset, elements2);
                        this._offset += text2.length;
                    } else {
                        address4 = null;
                    }
                    if (address4) {
                        elements1.push(address4);
                        text1 += address4.textValue;
                    } else {
                        elements1 = null;
                        this._offset = index4;
                    }
                } else {
                    elements1 = null;
                    this._offset = index4;
                }
                if (elements1) {
                    this._offset = index4;
                    var klass6 = this.klass.SyntaxNode;
                    address2 = new klass6(text1, this._offset, elements1, labelled1);
                    this._offset += text1.length;
                } else {
                    address2 = null;
                }
                if (address2) {
                } else {
                    this._offset = index3;
                }
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                var address6 = null;
                var index6 = this._offset;
                var index7 = this._offset;
                var elements3 = [];
                var labelled2 = {};
                var text3 = "";
                var address7 = null;
                if (this._input.substring(this._offset, this._offset + 1) === ".") {
                    var klass7 = this.klass.SyntaxNode;
                    address7 = new klass7(".", this._offset, []);
                    this._offset += 1;
                } else {
                    address7 = null;
                }
                if (address7) {
                    elements3.push(address7);
                    text3 += address7.textValue;
                    var address8 = null;
                    var remaining1 = 1;
                    var index8 = this._offset;
                    var elements4 = [];
                    var text4 = "";
                    var address9 = true;
                    while (address9) {
                        var temp2 = this._input.substring(this._offset, this._offset + 1);
                        var match2 = null;
                        if (match2 = temp2.match(/^[0-9]/)) {
                            var klass8 = this.klass.SyntaxNode;
                            address9 = new klass8(match2[0], this._offset, []);
                            this._offset += 1;
                        } else {
                            address9 = null;
                        }
                        if (address9) {
                            elements4.push(address9);
                            text4 += address9.textValue;
                            remaining1 -= 1;
                        }
                    }
                    if (remaining1 <= 0) {
                        this._offset = index8;
                        var klass9 = this.klass.SyntaxNode;
                        address8 = new klass9(text4, this._offset, elements4);
                        this._offset += text4.length;
                    } else {
                        address8 = null;
                    }
                    if (address8) {
                        elements3.push(address8);
                        text3 += address8.textValue;
                    } else {
                        elements3 = null;
                        this._offset = index7;
                    }
                } else {
                    elements3 = null;
                    this._offset = index7;
                }
                if (elements3) {
                    this._offset = index7;
                    var klass10 = this.klass.SyntaxNode;
                    address6 = new klass10(text3, this._offset, elements3, labelled2);
                    this._offset += text3.length;
                } else {
                    address6 = null;
                }
                if (address6) {
                } else {
                    this._offset = index6;
                    var klass11 = this.klass.SyntaxNode;
                    address6 = new klass11("", this._offset, []);
                    this._offset += 0;
                }
                if (address6) {
                    elements0.push(address6);
                    text0 += address6.textValue;
                } else {
                    elements0 = null;
                    this._offset = index1;
                }
            } else {
                elements0 = null;
                this._offset = index1;
            }
        } else {
            elements0 = null;
            this._offset = index1;
        }
        if (elements0) {
            this._offset = index1;
            var klass12 = null;
            if (Fargo.Scheme.Number instanceof Function) {
                klass12 = Fargo.Scheme.Number;
            } else {
                klass12 = this.klass.SyntaxNode;
            }
            address0 = new klass12(text0, this._offset, elements0, labelled0);
            if (!(Fargo.Scheme.Number instanceof Function)) {
                address0.extend(Fargo.Scheme.Number);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.number[index0] = address0;
    },
    __consume__character: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.character = this._nodeCache.character || {};
        var cached = this._nodeCache.character[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 2) === "#\\") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("#\\", this._offset, []);
            this._offset += 2;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address2 = null;
            var index2 = this._offset;
            address2 = this.__consume__symbol();
            if (address2) {
            } else {
                this._offset = index2;
                var temp0 = this._input.substring(this._offset, this._offset + 1);
                if (temp0 === "") {
                    address2 = null;
                } else {
                    var klass1 = this.klass.SyntaxNode;
                    address2 = new klass1(temp0, this._offset, []);
                    this._offset += 1;
                }
                if (address2) {
                } else {
                    this._offset = index2;
                }
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                labelled0.glyph = address2;
            } else {
                elements0 = null;
                this._offset = index1;
            }
        } else {
            elements0 = null;
            this._offset = index1;
        }
        if (elements0) {
            this._offset = index1;
            var klass2 = this.klass.SyntaxNode;
            address0 = new klass2(text0, this._offset, elements0, labelled0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.character[index0] = address0;
    },
    __consume__string: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.string = this._nodeCache.string || {};
        var cached = this._nodeCache.string[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 1) === "\"") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0("\"", this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address2 = null;
            var remaining0 = 0;
            var index2 = this._offset;
            var elements1 = [];
            var text1 = "";
            var address3 = true;
            while (address3) {
                var index3 = this._offset;
                if (this._input.substring(this._offset, this._offset + 2) === "\\\"") {
                    var klass1 = this.klass.SyntaxNode;
                    address3 = new klass1("\\\"", this._offset, []);
                    this._offset += 2;
                } else {
                    address3 = null;
                }
                if (address3) {
                } else {
                    this._offset = index3;
                    var temp0 = this._input.substring(this._offset, this._offset + 1);
                    var match0 = null;
                    if (match0 = temp0.match(/^[^"]/)) {
                        var klass2 = this.klass.SyntaxNode;
                        address3 = new klass2(match0[0], this._offset, []);
                        this._offset += 1;
                    } else {
                        address3 = null;
                    }
                    if (address3) {
                    } else {
                        this._offset = index3;
                    }
                }
                if (address3) {
                    elements1.push(address3);
                    text1 += address3.textValue;
                    remaining0 -= 1;
                }
            }
            if (remaining0 <= 0) {
                this._offset = index2;
                var klass3 = this.klass.SyntaxNode;
                address2 = new klass3(text1, this._offset, elements1);
                this._offset += text1.length;
            } else {
                address2 = null;
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
                var address4 = null;
                if (this._input.substring(this._offset, this._offset + 1) === "\"") {
                    var klass4 = this.klass.SyntaxNode;
                    address4 = new klass4("\"", this._offset, []);
                    this._offset += 1;
                } else {
                    address4 = null;
                }
                if (address4) {
                    elements0.push(address4);
                    text0 += address4.textValue;
                } else {
                    elements0 = null;
                    this._offset = index1;
                }
            } else {
                elements0 = null;
                this._offset = index1;
            }
        } else {
            elements0 = null;
            this._offset = index1;
        }
        if (elements0) {
            this._offset = index1;
            var klass5 = null;
            if (Fargo.Scheme.String instanceof Function) {
                klass5 = Fargo.Scheme.String;
            } else {
                klass5 = this.klass.SyntaxNode;
            }
            address0 = new klass5(text0, this._offset, elements0, labelled0);
            if (!(Fargo.Scheme.String instanceof Function)) {
                address0.extend(Fargo.Scheme.String);
            }
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.string[index0] = address0;
    },
    __consume__symbol: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.symbol = this._nodeCache.symbol || {};
        var cached = this._nodeCache.symbol[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var index2 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        var index3 = this._offset;
        var elements1 = [];
        var labelled1 = {};
        var text1 = "";
        var address2 = null;
        var index4 = this._offset;
        address2 = this.__consume__delimiter();
        this._offset = index4;
        if (!(address2)) {
            var klass0 = this.klass.SyntaxNode;
            address2 = new klass0("", this._offset, []);
            this._offset += 0;
        } else {
            address2 = null;
        }
        if (address2) {
            elements1.push(address2);
            text1 += address2.textValue;
            var address3 = null;
            var temp0 = this._input.substring(this._offset, this._offset + 1);
            if (temp0 === "") {
                address3 = null;
            } else {
                var klass1 = this.klass.SyntaxNode;
                address3 = new klass1(temp0, this._offset, []);
                this._offset += 1;
            }
            if (address3) {
                elements1.push(address3);
                text1 += address3.textValue;
            } else {
                elements1 = null;
                this._offset = index3;
            }
        } else {
            elements1 = null;
            this._offset = index3;
        }
        if (elements1) {
            this._offset = index3;
            var klass2 = this.klass.SyntaxNode;
            address1 = new klass2(text1, this._offset, elements1, labelled1);
            this._offset += text1.length;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address4 = null;
            var remaining0 = 1;
            var index5 = this._offset;
            var elements2 = [];
            var text2 = "";
            var address5 = true;
            while (address5) {
                var index6 = this._offset;
                var elements3 = [];
                var labelled2 = {};
                var text3 = "";
                var address6 = null;
                var index7 = this._offset;
                address6 = this.__consume__delimiter();
                this._offset = index7;
                if (!(address6)) {
                    var klass3 = this.klass.SyntaxNode;
                    address6 = new klass3("", this._offset, []);
                    this._offset += 0;
                } else {
                    address6 = null;
                }
                if (address6) {
                    elements3.push(address6);
                    text3 += address6.textValue;
                    var address7 = null;
                    var temp1 = this._input.substring(this._offset, this._offset + 1);
                    if (temp1 === "") {
                        address7 = null;
                    } else {
                        var klass4 = this.klass.SyntaxNode;
                        address7 = new klass4(temp1, this._offset, []);
                        this._offset += 1;
                    }
                    if (address7) {
                        elements3.push(address7);
                        text3 += address7.textValue;
                    } else {
                        elements3 = null;
                        this._offset = index6;
                    }
                } else {
                    elements3 = null;
                    this._offset = index6;
                }
                if (elements3) {
                    this._offset = index6;
                    var klass5 = this.klass.SyntaxNode;
                    address5 = new klass5(text3, this._offset, elements3, labelled2);
                    this._offset += text3.length;
                } else {
                    address5 = null;
                }
                if (address5) {
                    elements2.push(address5);
                    text2 += address5.textValue;
                    remaining0 -= 1;
                }
            }
            if (remaining0 <= 0) {
                this._offset = index5;
                var klass6 = this.klass.SyntaxNode;
                address4 = new klass6(text2, this._offset, elements2);
                this._offset += text2.length;
            } else {
                address4 = null;
            }
            if (address4) {
                elements0.push(address4);
                text0 += address4.textValue;
            } else {
                elements0 = null;
                this._offset = index2;
            }
        } else {
            elements0 = null;
            this._offset = index2;
        }
        if (elements0) {
            this._offset = index2;
            var klass7 = this.klass.SyntaxNode;
            address0 = new klass7(text0, this._offset, elements0, labelled0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        if (address0) {
            if (!(Fargo.Scheme.Symbol instanceof Function)) {
                address0.extend(Fargo.Scheme.Symbol);
            }
        } else {
            this._offset = index1;
            var index8 = this._offset;
            var elements4 = [];
            var labelled3 = {};
            var text4 = "";
            var address8 = null;
            var index9 = this._offset;
            address8 = this.__consume__reserved();
            this._offset = index9;
            if (!(address8)) {
                var klass8 = this.klass.SyntaxNode;
                address8 = new klass8("", this._offset, []);
                this._offset += 0;
            } else {
                address8 = null;
            }
            if (address8) {
                elements4.push(address8);
                text4 += address8.textValue;
                var address9 = null;
                var temp2 = this._input.substring(this._offset, this._offset + 1);
                if (temp2 === "") {
                    address9 = null;
                } else {
                    var klass9 = this.klass.SyntaxNode;
                    address9 = new klass9(temp2, this._offset, []);
                    this._offset += 1;
                }
                if (address9) {
                    elements4.push(address9);
                    text4 += address9.textValue;
                } else {
                    elements4 = null;
                    this._offset = index8;
                }
            } else {
                elements4 = null;
                this._offset = index8;
            }
            if (elements4) {
                this._offset = index8;
                var klass10 = this.klass.SyntaxNode;
                address0 = new klass10(text4, this._offset, elements4, labelled3);
                this._offset += text4.length;
            } else {
                address0 = null;
            }
            if (address0) {
                if (!(Fargo.Scheme.Symbol instanceof Function)) {
                    address0.extend(Fargo.Scheme.Symbol);
                }
            } else {
                this._offset = index1;
            }
        }
        return this._nodeCache.symbol[index0] = address0;
    },
    __consume__reserved: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.reserved = this._nodeCache.reserved || {};
        var cached = this._nodeCache.reserved[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        if (this._input.substring(this._offset, this._offset + 1) === ".") {
            var klass0 = this.klass.SyntaxNode;
            address0 = new klass0(".", this._offset, []);
            this._offset += 1;
        } else {
            address0 = null;
        }
        if (address0) {
        } else {
            this._offset = index1;
            address0 = this.__consume__delimiter();
            if (address0) {
            } else {
                this._offset = index1;
            }
        }
        return this._nodeCache.reserved[index0] = address0;
    },
    __consume__delimiter: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.delimiter = this._nodeCache.delimiter || {};
        var cached = this._nodeCache.delimiter[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        address0 = this.__consume__quote();
        if (address0) {
        } else {
            this._offset = index1;
            if (this._input.substring(this._offset, this._offset + 1) === "#") {
                var klass0 = this.klass.SyntaxNode;
                address0 = new klass0("#", this._offset, []);
                this._offset += 1;
            } else {
                address0 = null;
            }
            if (address0) {
            } else {
                this._offset = index1;
                var temp0 = this._input.substring(this._offset, this._offset + 1);
                var match0 = null;
                if (match0 = temp0.match(/^[()]/)) {
                    var klass1 = this.klass.SyntaxNode;
                    address0 = new klass1(match0[0], this._offset, []);
                    this._offset += 1;
                } else {
                    address0 = null;
                }
                if (address0) {
                } else {
                    this._offset = index1;
                    address0 = this.__consume__space();
                    if (address0) {
                    } else {
                        this._offset = index1;
                    }
                }
            }
        }
        return this._nodeCache.delimiter[index0] = address0;
    },
    __consume__space: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.space = this._nodeCache.space || {};
        var cached = this._nodeCache.space[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var temp0 = this._input.substring(this._offset, this._offset + 1);
        var match0 = null;
        if (match0 = temp0.match(/^[\s\n\r\t]/)) {
            var klass0 = this.klass.SyntaxNode;
            address0 = new klass0(match0[0], this._offset, []);
            this._offset += 1;
        } else {
            address0 = null;
        }
        return this._nodeCache.space[index0] = address0;
    },
    __consume__ignore: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.ignore = this._nodeCache.ignore || {};
        var cached = this._nodeCache.ignore[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        var remaining0 = 0;
        var index2 = this._offset;
        var elements1 = [];
        var text1 = "";
        var address2 = true;
        while (address2) {
            address2 = this.__consume__space();
            if (address2) {
                elements1.push(address2);
                text1 += address2.textValue;
                remaining0 -= 1;
            }
        }
        if (remaining0 <= 0) {
            this._offset = index2;
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0(text1, this._offset, elements1);
            this._offset += text1.length;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address3 = null;
            var index3 = this._offset;
            var index4 = this._offset;
            var elements2 = [];
            var labelled1 = {};
            var text2 = "";
            var address4 = null;
            address4 = this.__consume__comment();
            if (address4) {
                elements2.push(address4);
                text2 += address4.textValue;
                labelled1.comment = address4;
                var address5 = null;
                address5 = this.__consume__ignore();
                if (address5) {
                    elements2.push(address5);
                    text2 += address5.textValue;
                    labelled1.ignore = address5;
                } else {
                    elements2 = null;
                    this._offset = index4;
                }
            } else {
                elements2 = null;
                this._offset = index4;
            }
            if (elements2) {
                this._offset = index4;
                var klass1 = this.klass.SyntaxNode;
                address3 = new klass1(text2, this._offset, elements2, labelled1);
                this._offset += text2.length;
            } else {
                address3 = null;
            }
            if (address3) {
            } else {
                this._offset = index3;
                var klass2 = this.klass.SyntaxNode;
                address3 = new klass2("", this._offset, []);
                this._offset += 0;
            }
            if (address3) {
                elements0.push(address3);
                text0 += address3.textValue;
            } else {
                elements0 = null;
                this._offset = index1;
            }
        } else {
            elements0 = null;
            this._offset = index1;
        }
        if (elements0) {
            this._offset = index1;
            var klass3 = this.klass.SyntaxNode;
            address0 = new klass3(text0, this._offset, elements0, labelled0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.ignore[index0] = address0;
    },
    __consume__comment: function(input) {
        var address0 = null;
        var index0 = this._offset;
        this._nodeCache.comment = this._nodeCache.comment || {};
        var cached = this._nodeCache.comment[index0];
        if (cached) {
            this._offset += cached.textValue.length;
            return cached;
        }
        var index1 = this._offset;
        var elements0 = [];
        var labelled0 = {};
        var text0 = "";
        var address1 = null;
        if (this._input.substring(this._offset, this._offset + 1) === ";") {
            var klass0 = this.klass.SyntaxNode;
            address1 = new klass0(";", this._offset, []);
            this._offset += 1;
        } else {
            address1 = null;
        }
        if (address1) {
            elements0.push(address1);
            text0 += address1.textValue;
            var address2 = null;
            var remaining0 = 0;
            var index2 = this._offset;
            var elements1 = [];
            var text1 = "";
            var address3 = true;
            while (address3) {
                var index3 = this._offset;
                var elements2 = [];
                var labelled1 = {};
                var text2 = "";
                var address4 = null;
                var index4 = this._offset;
                var temp0 = this._input.substring(this._offset, this._offset + 1);
                var match0 = null;
                if (match0 = temp0.match(/^[\n\r]/)) {
                    var klass1 = this.klass.SyntaxNode;
                    address4 = new klass1(match0[0], this._offset, []);
                    this._offset += 1;
                } else {
                    address4 = null;
                }
                this._offset = index4;
                if (!(address4)) {
                    var klass2 = this.klass.SyntaxNode;
                    address4 = new klass2("", this._offset, []);
                    this._offset += 0;
                } else {
                    address4 = null;
                }
                if (address4) {
                    elements2.push(address4);
                    text2 += address4.textValue;
                    var address5 = null;
                    var temp1 = this._input.substring(this._offset, this._offset + 1);
                    if (temp1 === "") {
                        address5 = null;
                    } else {
                        var klass3 = this.klass.SyntaxNode;
                        address5 = new klass3(temp1, this._offset, []);
                        this._offset += 1;
                    }
                    if (address5) {
                        elements2.push(address5);
                        text2 += address5.textValue;
                    } else {
                        elements2 = null;
                        this._offset = index3;
                    }
                } else {
                    elements2 = null;
                    this._offset = index3;
                }
                if (elements2) {
                    this._offset = index3;
                    var klass4 = this.klass.SyntaxNode;
                    address3 = new klass4(text2, this._offset, elements2, labelled1);
                    this._offset += text2.length;
                } else {
                    address3 = null;
                }
                if (address3) {
                    elements1.push(address3);
                    text1 += address3.textValue;
                    remaining0 -= 1;
                }
            }
            if (remaining0 <= 0) {
                this._offset = index2;
                var klass5 = this.klass.SyntaxNode;
                address2 = new klass5(text1, this._offset, elements1);
                this._offset += text1.length;
            } else {
                address2 = null;
            }
            if (address2) {
                elements0.push(address2);
                text0 += address2.textValue;
            } else {
                elements0 = null;
                this._offset = index1;
            }
        } else {
            elements0 = null;
            this._offset = index1;
        }
        if (elements0) {
            this._offset = index1;
            var klass6 = this.klass.SyntaxNode;
            address0 = new klass6(text0, this._offset, elements0, labelled0);
            this._offset += text0.length;
        } else {
            address0 = null;
        }
        return this._nodeCache.comment[index0] = address0;
    }
});

Fargo.SchemeParser = new JS.Class("Fargo.SchemeParser", {
    include: Fargo.Scheme,
    initialize: function(input) {
        this._input = input;
        this._offset = 0;
        this._nodeCache = {};
    },
    parse: function() {
        var result = this["__consume__" + this.root]();
        return this._offset === this._input.length ? result : null;
    },
    extend: {
        parse: function(input) {
            var parser = new this(input);
            return parser.parse();
        }
    }
});

Fargo.SchemeParser.SyntaxNode = new JS.Class("Fargo.SchemeParser.SyntaxNode", {
    include: JS.Enumerable,
    initialize: function(textValue, offset, elements, properties) {
        this.textValue = textValue;
        this.offset    = offset;
        this.elements  = elements || [];
        if (!properties) return;
        for (var key in properties) this[key] = properties[key];
    },
    forEach: function(block, context) {
        for (var i = 0, n = this.elements.length; i < n; i++)
            block.call(context, this.elements[i], i);
    }
});

/**
 * @license Use of this source code is governed by an MIT-style license that
 * can be found in the LICENSE file at https://github.com/cartant/memoize-resolver
 */
/*tslint:disable:no-unused-expression*/

import { expect } from "chai";
import { createResolver } from "./resolver";

describe("createResolver", () => {

    it("should resolve Objects", () => {
        const a = {};
        const b = {};
        const resolver = createResolver();
        expect(resolver(a)).to.be.a("string");
        expect(resolver(a)).to.equal(resolver(a));
        expect(resolver(a)).to.not.equal(resolver(b));
    });

    it("should resolve Arrays", () => {
        const a = [] as unknown[];
        const b = [] as unknown[];
        const resolver = createResolver();
        expect(resolver(a)).to.be.a("string");
        expect(resolver(a)).to.equal(resolver(a));
        expect(resolver(a)).to.not.equal(resolver(b));
    });

    it("should resolve Functions", () => {
        const a = () => {};
        const b = () => {};
        const resolver = createResolver();
        expect(resolver(a)).to.be.a("string");
        expect(resolver(a)).to.equal(resolver(a));
        expect(resolver(a)).to.not.equal(resolver(b));
    });

    it("should resolve Dates", () => {
        const now = Date.now();
        const a = new Date(now);
        const b = new Date(now);
        const resolver = createResolver();
        expect(resolver(a)).to.be.a("string");
        expect(resolver(a)).to.equal(resolver(a));
        expect(resolver(a)).to.not.equal(resolver(b));
    });

    it("should stringify simple values", () => {
        const resolver = createResolver();
        expect(resolver(0)).to.equal("0");
        expect(resolver("zero")).to.equal(`"zero"`);
        expect(resolver(false)).to.equal("false");
        expect(resolver(null)).to.equal("null");
        expect(resolver(undefined)).to.equal("");
    });

    it("should support multiple arguments", () => {
        const a = {};
        const b = {};
        const c = {};
        const resolver = createResolver();
        expect(resolver(a, b)).to.equal(resolver(a, b));
        expect(resolver(a, b)).to.not.equal(resolver(b, c));
    });

    it("should support a selector", () => {
        const a = {};
        const b = {};
        const c = { value: a };
        const d = { value: a };
        const e = { value: b };
        const resolver = createResolver(([arg]) => [(arg as any)["value"]]);
        expect(resolver(c)).to.equal(resolver(d));
        expect(resolver(c)).to.not.equal(resolver(e));
    });
});

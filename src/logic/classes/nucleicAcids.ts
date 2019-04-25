import util from '../util';
import l from '../logger';

namespace NA {
    export enum NAtype { //determines type of NA so differing rules can be applied
        DNA = 1,
        RNA = 2,
    }

    export enum base { //represents each base, easily extensible to support e.g. hachimoji dna, alt-cytosines, etc.
        A = 1,
        T,
        C,
        G,
        U,
    }

    export function isBaseSequence(x: string[] | base[]): x is base[] {
        //type guard for bases
        return typeof x[0] !== 'string';
    }

    class nucleicAcid {
        //private base class to be used in creating specific NAs. since all NAs share this basic core of behavior and won't generally override, the inheritance shouldn't get too brittle
        rawSeq: string[];
        seq: base[];
        type: NAtype;
        codons: base[][];
        constructor(seq: string | string[] | NA.base[]) {
            if (typeof seq === 'string') {
                this.rawSeq = seq.toUpperCase().split('');
                l.info('string sequence used to construct NA');
            } else if (Array.isArray(seq) && isBaseSequence(seq)) {
                this.seq = seq;
                this.rawSeq = null;
                l.info('string array sequence used to construct NA');
            } else if (Array.isArray(seq)) {
                this.rawSeq = seq;
                l.info('base sequence used to construct NA');
            } else {
                this.rawSeq = null;
                l.error('Invalid sequence!', new TypeError());
            }
            if (this.rawSeq) {
                let baseSeq = [];
                for (let i = 0; i < this.rawSeq.length; i++) {
                    let baseString = this.rawSeq[i];
                    l.info('basestring is: ' + baseString.codePointAt(0));
                    let baseEnumVal: base = (() => {
                        switch (baseString) {
                            case 'A':
                                return NA.base.A;
                            case 'T':
                                return NA.base.T;
                            case 'C':
                                return NA.base.C;
                            case 'G':
                                return NA.base.G;
                            case 'U':
                                return NA.base.U;
                        }
                    })();
                    if (!baseEnumVal) {
                        l.info('Invalid base or improper sequence format!');
                    }
                    l.info('string base converted to enum base');
                    baseSeq.push(baseEnumVal);
                }
                this.seq = baseSeq;
            }
            this.codons = this.detectCodons(this.seq);
        }

        detectCodons(seq: base[]): base[][] {
            let codons = [];
            l.info(`Sequence length: ${seq.length}`);
            for (let i = 0; i < seq.length; i = i + 3) {
                if (seq[i + 2]) {
                    codons.push([seq[i], seq[i + 1], seq[i + 2]]);
                    l.info(`${seq[i]}${seq[i + 1]}${seq[i + 2]}Codon added to codon list`);
                }
            }
            return codons;
        }
    }

    export class DNA extends nucleicAcid {
        constructor(seq: string | string[] | base[]) {
            super(seq);
        }
    }

    export class RNA extends nucleicAcid {
        constructor(seq: string | string[] | base[]) {
            super(seq);
        }
    }

    export function getRandomBase(NA: NAtype): base {
        let newBase = util.getRandomInt(0, 3);
        switch (newBase) {
            case 0:
                return base.A;
            case 1:
                if (NA === NAtype.DNA) {
                    return base.T;
                } else if (NA === NAtype.RNA) {
                    return base.U;
                }
            case 2:
                return base.G;
            case 3:
                return base.C;
        }
        if (NA !== NAtype.DNA && NA !== NAtype.RNA) {
            console.error('Invalid random base type!');
        }
    }
}

export default NA;

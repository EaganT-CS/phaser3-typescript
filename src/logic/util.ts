import NA from './classes/nucleicAcids';

namespace util {
    export function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }

    export function sanitizeFASTA(rawSeq: string): string {
        return rawSeq.replace(/[\r\n]/g, '');
    }
    function baseToString(base: NA.base): string {
        let str = NA.base[base];
        return str;
    }
    export function seqToString(seq: NA.base[]): string {
        let strArr = seq.map((base,i) => {
            if (i%3 === 0) {
                let str = '|'+baseToString(base)
                return str
            }
            return baseToString(base);
        });
        let str = strArr.toString().replace(/,/g, '');
        return str;
    }
    export function codonsToSeq (codons: NA.base[][]):NA.base[] {
        let seq = [];
        codons.forEach((codon) => {seq.push(...codon)})
        return seq;
    }
}
export default util;

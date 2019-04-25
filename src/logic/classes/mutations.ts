import NA from './nucleicAcids';
import util from '../util';

class Mutation {
    static substitution(DNA: NA.DNA, site: number, base: NA.base): NA.base[] {
        //this bears no relation to the physical mechanics, prob wanna replace it
        let newSeq = DNA.seq;
        if (!base) {
            newSeq[site] = NA.getRandomBase(NA.NAtype.DNA);
        } else {
            newSeq[site] = base;
        }
        return newSeq;
    }
    static insertion(DNA: NA.DNA, site: number, base: NA.base[]): NA.base[] {
        let newSeq = DNA.seq;
        if (!base) {
            base = [NA.getRandomBase(NA.NAtype.DNA)]; //might add the ability to insert more than 1 base if that exists so might as well just do array support now
        }
        if (!site) {
            site = util.getRandomInt(0, newSeq.length + 1);
        }
        if (site !== newSeq.length) {
            let before = newSeq.slice(0, site);
            let after = newSeq.slice(site, newSeq.length);
            newSeq = [...before, ...base, ...after];
        } else {
            newSeq.push(...base);
        }
        return newSeq;
    }
    static deletion(DNA, site) {
        let newSeq = DNA.seq;
        if (!site || site === 'random') {
            site = util.getRandomInt(0, newSeq.length);
        }
        let before = newSeq.slice(0, site);
        let after = newSeq(site + 1);
        newSeq = [...before, ...after];
        return newSeq;
    }
}

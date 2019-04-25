import NA from './classes/nucleicAcids';
import l from './logger'
import util from './util'
namespace synthesis {
    export function transcribe(gene: NA.DNA): NA.RNA {
        let START = gene.codons.findIndex(codon => { //this is a terrible hack, why are we scanning for a future AUG??? that's a START for translation not transcription. well whatevs it can stay for now
            let str = codon.toString().replace(/,/g, '')
            l.info(str)
            return str === '213';
        });
        let transcriptionUnit = gene.codons.slice(START);
        let DNAComplement = transcriptionUnit.map(baseArray => {return baseArray.map((base) => {
            if (base === NA.base.A) {
                return NA.base.T;
            } else if (base === NA.base.T) {
                return NA.base.A;
            } else if (base === NA.base.C) {
                return NA.base.G;
            } else if (base === NA.base.G) {
                return NA.base.C;
            }
        })})
        let RNAComplement = DNAComplement.map(baseArray => { return baseArray.map((base) => {
            if (base === NA.base.T) {
                return NA.base.U;
            } else return base;
        })});
        let RNA = new NA.RNA(util.codonsToSeq(RNAComplement));
        return RNA;
    }

    export function translate(gene: NA.RNA): protein.aminos[] {
        let aminos = gene.codons.map(codon => {
            switch (codon.toString().replace(/,/g, '')) {
                case 'UUU':
                case 'UUC':
                    return protein.aminos.phe;
                case 'UUA':
                case 'UUG':
                case 'CUU':
                case 'CUC':
                case 'CUA':
                case 'CUG':
                    return protein.aminos.leu;
                case 'AUU':
                case 'AUC':
                case 'AUA':
                    return protein.aminos.ile;
                case 'AUG':
                    return protein.aminos.met;
                case 'GUU':
                case 'GUC':
                case 'GUA':
                case 'GUG':
                    return protein.aminos.val;
                case 'UCU':
                case 'UCC':
                case 'UCA':
                case 'UCG':
                case 'AGU':
                case 'AGC':
                    return protein.aminos.ser;
                case 'CCU':
                case 'CCC':
                case 'CCA':
                case 'CCG':
                    return protein.aminos.pro;
                case 'ACU':
                case 'ACC':
                case 'ACA':
                case 'ACG':
                    return protein.aminos.thr;
                case 'GCU':
                case 'GCC':
                case 'GCA':
                case 'GCG':
                    return protein.aminos.ala;
                case 'UAU':
                case 'UAC':
                    return protein.aminos.tyr;
                case 'CAU':
                case 'CAC':
                    return protein.aminos.his;
                case 'CAA':
                case 'CAG':
                    return protein.aminos.gln;
                case 'AAU':
                case 'AAC':
                    return protein.aminos.asn;
                case 'AAA':
                case 'AAG':
                    return protein.aminos.lys;
                case 'GAU':
                case 'GAC':
                    return protein.aminos.asp;
                case 'GAA':
                case 'GAG':
                    return protein.aminos.glu;
                case 'UGU':
                case 'UGC':
                    return protein.aminos.cys;
                case 'UGG':
                    return protein.aminos.trp;
                case 'CGU':
                case 'CGC':
                case 'CGA':
                case 'CGG':
                case 'AGA':
                case 'AGG':
                    return protein.aminos.arg;
                case 'GGU':
                case 'GGC':
                case 'GGA':
                case 'GGG':
                    return protein.aminos.gly;
                case 'UAA':
                case 'UAG':
                case 'UGA':
                    return protein.aminos.STOP;
            }
        });
        let STOP = aminos.findIndex(acid => {
            return acid === protein.aminos.STOP;
        });
        let producedAminos = aminos.slice(0, STOP);
        return producedAminos;
    }
}

export default synthesis;

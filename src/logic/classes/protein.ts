namespace protein {
    export enum aminos {
        phe,
        leu,
        ile,
        met,
        val,
        ser,
        pro,
        thr,
        ala,
        tyr,
        his,
        gln,
        asn,
        lys,
        asp,
        glu,
        cys,
        trp,
        arg,
        gly,
        STOP,
    }

    interface ProteinInterface {
        seq: string[];
    }

    class Protein implements ProteinInterface {
        constructor(public seq: string[]) {}
    }
}

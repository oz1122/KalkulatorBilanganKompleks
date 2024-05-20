class KalkulatorBilanganKompleks {
    constructor(real1, imag1, real2, imag2, real3, imag3, operasi1, operasi2) {
        this.bil1 = new Complex(real1, imag1);
        this.bil2 = new Complex(real2, imag2);
        this.bil3 = new Complex(real3, imag3);
        this.operasi1 = operasi1;
        this.operasi2 = operasi2;
    }

    operasiKompleks(bil1, bil2, operasi) {
        switch (operasi) {
            case 'tambah':
                return bil1.add(bil2);
            case 'kurang':
                return bil1.subtract(bil2);
            case 'kali':
                return bil1.multiply(bil2); 
            case 'bagi':
                return bil1.divide(bil2);
            default:
                throw new Error("Operasi tidak dikenali");
        }
    }

    hitung() {
        let hasil = this.operasiKompleks(this.bil1, this.bil2, this.operasi1);
        hasil = this.operasiKompleks(hasil, this.bil3, this.operasi2);
        return hasil;
    }

    tampilkanHasil() {
        try {
            const hasil = this.hitung();
            return `Hasil operasi: ${hasil}`;
        } catch (error) {
            return error.message;
        }
    }
}

class Complex {
    constructor(real, imag) {
        this.real = real;
        this.imag = imag;
    }

    add(other) {
        return new Complex(this.real + other.real, this.imag + other.imag);
    }

    subtract(other) {
        return new Complex(this.real - other.real, this.imag - other.imag);
    }

    multiply(other) {
        return new Complex(
            this.real * other.real - this.imag * other.imag,
            this.real * other.imag + this.imag * other.real
        );
    }

    divide(other) {
        const denominator = other.real * other.real + other.imag * other.imag;
        if (denominator === 0) {
            throw new Error("Pembagian dengan nol tidak diperbolehkan");
        }
        return new Complex(
            (this.real * other.real + this.imag * other.imag) / denominator,
            (this.imag * other.real - this.real * other.imag) / denominator
        );
    }

    toString() {
        return `${this.real} + ${this.imag}i`;
    }
}

function hitung() {
    const real1 = parseFloat(document.getElementById('real1').value);
    const imag1 = parseFloat(document.getElementById('imag1').value);
    const real2 = parseFloat(document.getElementById('real2').value);
    const imag2 = parseFloat(document.getElementById('imag2').value);
    const real3 = parseFloat(document.getElementById('real3').value);
    const imag3 = parseFloat(document.getElementById('imag3').value);
    const operasi1 = document.getElementById('operasi1').value;
    const operasi2 = document.getElementById('operasi2').value;

    const kalkulator = new KalkulatorBilanganKompleks(real1, imag1, real2, imag2, real3, imag3, operasi1, operasi2);
    const hasil = kalkulator.tampilkanHasil();

    document.getElementById('hasil').innerText = hasil;
}

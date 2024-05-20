class KalkulatorBilanganKompleks {
    constructor(real1, imag1, real2, imag2) {
        this.bil1 = new Complex(real1, imag1);
        this.bil2 = new Complex(real2, imag2);
    }

    tambah() {
        return this.bil1.add(this.bil2);
    }

    kurang() {
        return this.bil1.subtract(this.bil2);
    }

    kali() {
        return this.bil1.multiply(this.bil2);
    }

    bagi() {
        try {
            return this.bil1.divide(this.bil2);
        } catch (error) {
            return "Pembagian dengan nol tidak diperbolehkan";
        }
    }

    tampilkanHasil(operasi) {
        switch (operasi) {
            case 'tambah':
                return `Hasil penjumlahan: ${this.tambah()}`;
            case 'kurang':
                return `Hasil pengurangan: ${this.kurang()}`;
            case 'kali':
                return `Hasil perkalian: ${this.kali()}`;
            case 'bagi':
                return `Hasil pembagian: ${this.bagi()}`;
            default:
                return "Operasi tidak dikenali";
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
            throw new Error("Pembagian dengan nol");
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
    const operasi = document.getElementById('operasi').value;

    const kalkulator = new KalkulatorBilanganKompleks(real1, imag1, real2, imag2);
    const hasil = kalkulator.tampilkanHasil(operasi);

    document.getElementById('hasil').innerText = hasil;
}

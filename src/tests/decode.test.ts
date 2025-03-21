import {decode} from "../Components/convert"

// Basic decoding tests for hexadecimal numbers
test("Decode hexadecimal numbers", () => {

    // Test 1
    expect(decode("0x00128293")).toEqual(["addi t0, t0, 1", "I-Type"]);

    // Test 2
    expect(decode("0x41de0f33")).toEqual(["sub t5, t3, t4", "R-Type"]);

    // Test 3
    expect(decode("0x008ea023")).toEqual(["sw s0, 0(t4)", "S-Type"]);

    // Test 4
    expect(decode("0x00c007ef")).toEqual(["jal a5, 12", "UJ-Type"]);

    // Test 5
    expect(decode("0x0c44ea37")).toEqual(["lui s4, 50254", "U-Type"]);

});

// Basic decoding tests for binary numbers
test("Decode binary numbers", () => {

    // Test 1
    expect(decode("0b00000000010010100010111000000011")).toEqual(["lw t3, 4(s4)", "I-Type"]);

    // Test 2
    expect(decode("0b00000000000111110111001010110011")).toEqual(["and t0, t5, ra", "R-Type"]);

    // Test 3
    expect(decode("0b00000000100011110000010001100111")).toEqual(["jalr s0, 8(t5)", "I-Type"]);

    // Test 4
    expect(decode("0b00000001111000101101011001100011")).toEqual(["bge t0, t5, 12", "SB-Type"]);

    // Test 5
    expect(decode("0b00000101010101000100101110010111")).toEqual(["auipc s7, 21828", "U-Type"]);

})

// Intermediate decoding tests for hexadecimal numbers
test("Intermediate decoding hex numbers", () => {

    // Test 1
    expect(decode("0x4072d2b3")).toEqual(["sra t0, t0, t2", "R-Type"]);

    // Test 2
    expect(decode("0x404ed393")).toEqual(["srai t2, t4, 4", "I-Type"]);

    // Test 3
    expect(decode("0x00845393")).toEqual(["srli t2, s0, 8", "I-Type"]);

    // Test 4
    expect(decode("0x00ae1f33")).toEqual(["sll t5, t3, a0", "R-Type"]);

    // Test 5
    expect(decode("0x008a3eb3")).toEqual(["sltu t4, s4, s0", "R-Type"]);
})
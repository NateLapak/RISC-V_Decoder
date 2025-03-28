import {encode} from "../Components/convert"

// Basic encoding test for hexadecimal numbers
test("Encode instructions to hexadecimal numbers", () => {

    // Test 1
    expect(encode("addi t0, t0, 1")).toEqual("0x00128293");

    // Test 2
    expect(encode("sub t5, t3, t4")).toEqual("0x41de0f33");

    // Test 3
    expect(encode("sw s0, 0(t4)")).toEqual("0x008ea023");

    // Test 4
    expect(encode("jal a5, 12")).toEqual("0x00c007ef");

    // Test 5
    expect(encode("lui s4, 50254")).toEqual("0x0c44ea37");

    // Test 6
    expect(encode("lw t3, 4(s4)")).toEqual("0x004a2e03");

    // Test 7
    expect(encode("and t0, t5, ra")).toEqual("0x001f72b3");

    // Test 8
    expect(encode("jalr s0, 8(t5)")).toEqual("0x008f0467");

    // Test 9
    expect(encode("bge t0, t5, 12")).toEqual("0x01e2d663");

    // Test 10
    expect(encode("auipc s7, 21828")).toEqual("0x05544b97");

})

// More encoding tests
// Intermediate decoding tests for hexadecimal numbers. 
test("Intermediate decoding hex numbers", () => {

    // Test 1
    expect(encode("sra t0, t0, t2")).toEqual("0x4072d2b3");

    // Test 2
    expect(encode("srai t2, t4, 4")).toEqual("0x404ed393");

    // Test 3
    expect(encode("srli t2, s0, 8")).toEqual("0x00845393");

    // Test 4
    expect(encode("sll t5, t3, a0")).toEqual("0x00ae1f33");

    // Test 5
    expect(encode("sltu t4, s4, s0")).toEqual("0x008a3eb3");
})

// More advanced binary numbers
test("Binary decoding numbers", () => {

    expect(encode("slli t0, t4, 8")).toEqual("0x008E9293");

    expect(encode("ecall")).toEqual("0x00000073");

    expect(encode("ebreak")).toEqual("0x00100073");

    expect(encode("bge a0, s5, -4")).toEqual("0xFF555EE3")

    expect(encode("lb s5, -8(t0)")).toEqual("0xFF828A83")

})

// Test csr instructions
test("Csr instructions", () => {

    expect(encode("csrrs t0, mtvec, t1")).toEqual("0x305322f3")
    
    expect(encode("csrrc a0, mstatus, t2")).toEqual("0x3003b573")

    expect(encode("csrrs a0, mepc, a0")).toEqual("0x341a6573")

    expect(encode("csrrw t0, mcause, t2")).toEqual("0x342392f3")

    expect(encode("csrrc s0, mie, s5")).toEqual("0x304e7473")

})

// Test instructions with a negative immediate
test("Negative immediates", () => {

    expect(encode("addi t0, t0, -22")).toEqual("0xfea28293")

    expect(encode("bge t2, t4, -6")).toEqual("0xffd3dde3")
    
    expect(encode("lb t4, -12(t0)")).toEqual("0xff428e83")
})


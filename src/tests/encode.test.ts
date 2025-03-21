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

